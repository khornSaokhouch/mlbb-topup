import { NextResponse } from 'next/server';
import { BakongService } from '@/services/bakong.service';

export async function POST(req: Request) {
  try {
    const token = process.env.BAKONG_API_TOKEN;
    const accountId = process.env.BAKONG_ACCOUNT_ID;
    const relayUrl = process.env.API_GENERATE_QR_BAKONG || 'https://api.bakongrelay.com/v1/generate_khqr_image';

    if (!token || !accountId) {
      return NextResponse.json({ error: 'Server configuration error: Missing Bakong credentials' }, { status: 500 });
    }

    const { amount, orderId, description } = await req.json();
    
    // 1. Generate KHQR String Locally
    const khqrString = BakongService.generateKhqrString({
      bankAccount: accountId,
      merchantName: process.env.BAKONG_MERCHANT_NAME || 'Khorn Saokhouch',
      merchantCity: process.env.BAKONG_MERCHANT_CITY || 'PHNOM PENH',
      amount: parseFloat(amount),
      currency: 'USD',
      billNumber: orderId,
    });

    const md5 = BakongService.getMd5(khqrString);

    // 2. Clear previous generate_khqr switch and use generate_khqr_image as per user's PHP
    const finalRelayUrl = relayUrl.includes('generate_khqr_image') ? relayUrl : 'https://api.bakongrelay.com/v1/generate_khqr_image';

    console.log('Generated KHQR String:', khqrString);
    console.log('Relay URL:', finalRelayUrl);

    // 3. Request Image from Relay API
    const response = await fetch(finalRelayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        qr: khqrString,
        source: 'https://raw.githubusercontent.com/bsthen/bakong-khqr/main/bakong_khqr/template.png' // Default template
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Relay API Error:', errorText);
      return NextResponse.json({ error: 'Relay API failed', detail: errorText }, { status: 500 });
    }

    const result = await response.json();
    
    // Return both the image and the MD5 for verification
    return NextResponse.json({
      success: true,
      data: {
        qr_string: khqrString,
        qr_image: result.data?.image || result.image || result.qr_image,
        md5: md5,
        amount: parseFloat(amount),
        order_id: orderId
      }
    });

  } catch (error: any) {
    console.error('Bakong Proxy Internal Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
