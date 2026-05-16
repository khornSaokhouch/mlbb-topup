import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const server = searchParams.get('server');

  if (!id) {
    return NextResponse.json({ error: 'Missing player ID' }, { status: 400 });
  }

  // --- Attempt 1: Smile.one Merchant Check (Verified Working) ---
  try {
    const formData = new URLSearchParams();
    formData.append('user_id', id);
    formData.append('zone_id', server ?? '');
    formData.append('pid', '25'); // Official MLBB PID on Smile.one merchant portal
    formData.append('checkrole', '1');

    const res = await fetch('https://www.smile.one/merchant/mobilelegends/checkrole', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Referer': 'https://www.smile.one/merchant/mobilelegends',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData.toString(),
      signal: AbortSignal.timeout(6000),
    });

    if (res.ok) {
      const data = await res.json();
      // Response: {"code":200,"username":"...","zone":1,...}
      if (data?.code === 200 && data?.username) {
        // Remove emoji formatting if present and decode
        const nickname = decodeURIComponent(data.username).replace(/\+/g, ' ');
        return NextResponse.json({ success: true, nickname });
      }
    }
  } catch (error) {
    console.error('Smile.one Detail:', error);
  }

  // --- Attempt 2: Moonton official ---
  try {
    const res = await fetch('https://order-sg.moonton.com/order/verifiy-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role_id: id, zone_id: server ?? '' }),
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.data?.role_name) return NextResponse.json({ success: true, nickname: data.data.role_name });
    }
  } catch {}

  // --- Fallback: Dev mock ONLY if the ID matches the common test account ---
  // This allows the user to see real names for actual IDs but still allows testing.
  if (process.env.NODE_ENV === 'development' && (id === '12345678' || id === '87654321')) {
    return NextResponse.json({ 
      success: true, 
      nickname: `Test_Player`,
      mock: true
    });
  }

  return NextResponse.json(
    { error: 'Could not verify ID. Please check and try again.' },
    { status: 404 }
  );
}
