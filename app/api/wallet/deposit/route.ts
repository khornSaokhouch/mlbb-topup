import { NextResponse } from 'next/server';
import { BakongService } from '@/services/bakong.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = process.env.BAKONG_API_TOKEN;
    const accountId = process.env.BAKONG_ACCOUNT_ID;
    const relayUrl = process.env.API_GENERATE_QR_BAKONG || 'https://api.bakongrelay.com/v1/generate_khqr_image';

    if (!token || !accountId) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { amount } = await req.json();
    if (!amount || parseFloat(amount) <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const referenceId = `DEP-${nanoid(8).toUpperCase()}`;

    // 1. Create Pending Transaction
    await dbConnect();
    const transaction = await Transaction.create({
      userId: (session.user as any).id,
      type: 'deposit',
      amount: parseFloat(amount),
      status: 'pending',
      paymentMethod: 'bakong',
      referenceId: referenceId,
      description: 'Wallet Deposit via Bakong KHQR',
    });

    // 2. Generate KHQR String
    const khqrString = BakongService.generateKhqrString({
      bankAccount: accountId,
      merchantName: process.env.BAKONG_MERCHANT_NAME || 'Khorn Saokhouch',
      merchantCity: process.env.BAKONG_MERCHANT_CITY || 'PHNOM PENH',
      amount: parseFloat(amount),
      currency: 'USD',
      billNumber: referenceId,
    });

    const md5 = BakongService.getMd5(khqrString);

    // 3. Request Image from Relay API
    const response = await fetch(relayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        qr: khqrString,
        source: 'https://raw.githubusercontent.com/bsthen/bakong-khqr/main/bakong_khqr/template.png'
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Relay API failed' }, { status: 500 });
    }

    const result = await response.json();
    
    return NextResponse.json({
      success: true,
      qr_image: result.data?.image || result.image || result.qr_image,
      referenceId: referenceId,
      md5: md5
    });

  } catch (error: any) {
    console.error('Wallet Deposit Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
