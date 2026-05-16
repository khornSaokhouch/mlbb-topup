import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/Transaction';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const userId = (session.user as any).id;

    // Fetch transactions
    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);

    // Calculate stats
    const allTransactions = await Transaction.find({ userId, status: 'completed' });
    const totalDeposits = allTransactions
      .filter(tx => tx.type === 'deposit')
      .reduce((sum, tx) => sum + tx.amount, 0);
    const totalSpent = allTransactions
      .filter(tx => tx.type === 'purchase')
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const totalOrders = allTransactions.filter(tx => tx.type === 'purchase').length;

    return NextResponse.json({
      transactions,
      stats: {
        totalDeposits,
        totalSpent,
        totalOrders
      }
    });
  } catch (error: any) {
    console.error('Fetch wallet history error:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}
