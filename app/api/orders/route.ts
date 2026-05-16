import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    
    await dbConnect();
    
    // Generate a premium order ID
    const orderId = `MOCHI-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const order = await Order.create({
      ...body,
      orderId,
      userId: session?.user?.id,
      paymentStatus: 'pending',
      orderStatus: 'pending',
    });
    
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    
    await dbConnect();
    
    if (orderId) {
      const order = await Order.findOne({ orderId }).populate('productId');
      if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      return NextResponse.json(order);
    }
    
    // If user is authenticated, show their orders. If admin, show all.
    let query = {};
    if (session?.user?.role !== 'admin') {
      if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      query = { userId: session.user.id };
    }

    const orders = await Order.find(query).sort({ createdAt: -1 }).limit(20);
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { orderId, paymentStatus, orderStatus } = body;
    
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }
    
    await dbConnect();
    
    const order = await Order.findOneAndUpdate(
      { orderId },
      { $set: { paymentStatus, orderStatus } },
      { new: true }
    );
    
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    await dbConnect();
    const order = await Order.findOneAndDelete({ orderId });

    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
