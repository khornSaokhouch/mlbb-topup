import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    const { md5, orderId } = await req.json();

    if (!md5) {
      return NextResponse.json({ error: 'MD5 is required' }, { status: 400 });
    }

    const token = process.env.BAKONG_API_TOKEN;
    const baseUrl = process.env.BAKONG_BASE_URL || 'https://api-bakong.nbc.gov.kh';

    // Call Bakong NBC API to check transaction
    const response = await fetch(`${baseUrl}/v1/check_transaction_by_md5`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ md5 }),
    });

    const result = await response.json();
    console.log('Bakong MD5 Check Result:', JSON.stringify(result, null, 2));

    // responseCode 0 means success in Bakong standards
    const isSuccess = result.responseCode === 0 || result.responseCode === '0' || result.responseCode === '00';

    if (isSuccess && orderId) {
      await dbConnect();
      // Update order status to paid
      await Order.findOneAndUpdate(
        { orderId: orderId },
        { 
          paymentStatus: 'paid',
          updatedAt: new Date()
        }
      );
    }

    return NextResponse.json({
      success: isSuccess,
      status: isSuccess ? 'success' : 'pending',
      raw: result
    });

  } catch (error: any) {
    console.error('Bakong MD5 Check Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
