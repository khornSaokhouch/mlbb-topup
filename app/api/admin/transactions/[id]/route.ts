import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await req.json();
    
    await dbConnect();
    const transaction = await Transaction.findById(id);
    
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // Prevents re-processing a completed/failed transaction
    if (transaction.status !== 'pending' && status !== transaction.status) {
       return NextResponse.json({ error: 'Cannot change status of non-pending transaction' }, { status: 400 });
    }

    const oldStatus = transaction.status;
    transaction.status = status;
    await transaction.save();

    // If status changed to completed AND it's a deposit, increment user balance
    if (oldStatus === 'pending' && status === 'completed' && transaction.type === 'deposit') {
      await User.findByIdAndUpdate(transaction.userId, {
        $inc: { walletBalance: transaction.amount }
      });
    }

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}
