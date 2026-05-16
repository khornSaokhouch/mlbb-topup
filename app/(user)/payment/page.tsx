'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import { QrCode, Clock, Loader2, CheckCircle2, ShieldCheck, Landmark, CreditCard, QrCode as QrIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function PaymentContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [order, setOrder] = useState<any>(null);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [md5, setMd5] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [status, setStatus] = useState<'pending' | 'verifying' | 'success' | 'error'>('pending');
  const [loading, setLoading] = useState(true);

  // Fetch order data and QR
  useEffect(() => {
    const fetchData = async () => {
      if (!orderId) return;
      try {
        // Fetch Order
        const res = await fetch(`/api/orders?orderId=${orderId}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
          if (data.paymentStatus === 'paid') setStatus('success');

          // Fetch QR if its a QR based payment
          if (data.paymentMethod === 'khqr' || data.paymentMethod === 'aba') {
            const qrRes = await fetch('/api/payments/bakong', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                amount: data.amount,
                orderId: data.orderId,
                description: `Payment for ${data.productName} - ID: ${data.gameUserId}`
              })
            });
            if (qrRes.ok) {
              const qrData = await qrRes.json();
              // Bakong Proxy returns { success: true, data: { qr_image: "base64...", md5: "..." } }
              const imageData = qrData.data?.qr_image;
              setQrImage(imageData ? (imageData.startsWith('data:image') ? imageData : `data:image/png;base64,${imageData}`) : null);
              setMd5(qrData.data?.md5);
            }
          }
        }
      } catch (err) {
        console.error('Fetch data error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [orderId]);

  // Handle auto-polling for payment status
  useEffect(() => {
    if (!md5 || status === 'success' || status === 'error') return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/payments/bakong/check-md5', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ md5, orderId })
        });
        if (res.ok) {
          const checkData = await res.json();
          if (checkData.success) {
            setStatus('success');
            clearInterval(interval);
          }
        }
      } catch (err) {
        console.error('Stop polling error:', err);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [md5, status, orderId]);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0 || status === 'success') return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePaid = async () => {
    setStatus('verifying');
    try {
      // Simulate verifying with the provider
      const response = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.orderId,
          paymentStatus: 'paid',
          orderStatus: 'processing',
        }),
      });

      if (response.ok) {
        setTimeout(() => setStatus('success'), 2000);
      } else {
        setStatus('pending');
        alert('Verification failed. Please try again or contact support.');
      }
    } catch (err) {
      setStatus('pending');
      alert('Verification error. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="text-red-500 mb-4 font-bold text-xl uppercase tracking-widest">Order Not Found</div>
        <p className="text-muted-foreground mb-8">The order you are looking for does not exist or has expired.</p>
        <button onClick={() => window.location.href = '/'} className="px-8 py-3 bg-primary text-black font-black rounded-xl uppercase">Return Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <AnimatePresence mode="wait">
        {status !== 'success' ? (
          <motion.div
            key="payment"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">Complete Payment</h1>
              <p className="text-muted-foreground">Scan to pay for Order <span className="text-foreground font-bold">#{order.orderId}</span></p>
            </div>

            <GlassCard className="!p-10 flex flex-col items-center">
              <div className="mb-8 flex items-center gap-4 px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500">
                <Clock className="w-5 h-5 animate-pulse" />
                <span className="font-bold text-lg">{formatTime(timeLeft)}</span>
              </div>

              <div className="relative p-6 bg-white rounded-3xl mb-8 group overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                {qrImage ? (
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={qrImage} 
                    alt="Payment QR" 
                    className="w-56 h-56 relative z-10 object-contain" 
                  />
                ) : (
                  <div className="w-56 h-56 flex flex-col items-center justify-center gap-3 relative z-10">
                    <Loader2 className="w-8 h-8 text-black animate-spin" />
                    <span className="text-[10px] text-black font-black uppercase tracking-widest text-center">Generating<br/>KHQR...</span>
                  </div>
                )}
              </div>

              <div className="w-full space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-foreground/5 border border-foreground/10 rounded-xl">
                  <div className="text-sm text-muted-foreground uppercase tracking-widest">Total Amount</div>
                  <div className="text-2xl font-black text-primary">${order.amount.toFixed(2)}</div>
                </div>
                <div className="p-4 bg-foreground/5 border border-foreground/10 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-bold uppercase tracking-tight">
                      {order.paymentMethod === 'aba' ? 'ABA Pay Secure' : 
                       order.paymentMethod === 'khqr' ? 'Bakong KHQR Secure' : 'Secure Card Payment'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {order.paymentMethod === 'aba' && <Landmark className="w-5 h-5 text-blue-500" />}
                    {order.paymentMethod === 'khqr' && <QrIcon className="w-5 h-5 text-red-500" />}
                    {order.paymentMethod === 'stripe' && <CreditCard className="w-5 h-5 text-purple-500" />}
                  </div>
                </div>
              </div>

              {status === 'pending' ? (
                <button
                  onClick={handlePaid}
                  className="w-full py-4 rounded-xl bg-primary text-black font-black uppercase hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] active:scale-[0.98] transition-all"
                >
                  I HAVE PAID
                </button>
              ) : (
                <div className="flex items-center justify-center gap-3 py-4 text-primary font-black uppercase tracking-widest">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Verifying...
                </div>
              )}
            </GlassCard>

            <div className="text-center">
              <button onClick={() => window.history.back()} className="text-muted-foreground text-sm hover:text-foreground transition-colors uppercase font-bold tracking-widest">Cancel Order</button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
              <CheckCircle2 className="w-12 h-12 text-black" />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight">Payment Received!</h1>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Your <span className="text-foreground font-bold">{order.productName}</span> are being sent to <span className="text-foreground font-bold">{order.gameNickname || order.gameUserId}</span>.
            </p>
            
            <GlassCard className="max-w-md mx-auto !p-8">
              <div className="space-y-4 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Player Info</span>
                  <span className="font-bold">{order.gameUserId} ({order.gameZoneId})</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Nickname</span>
                  <span className="font-bold text-primary">{order.gameNickname || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Items</span>
                  <span className="font-bold">{order.productName}</span>
                </div>
                <div className="flex justify-between text-sm pt-4 border-t border-border">
                  <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Order ID</span>
                  <span className="font-black text-foreground uppercase tracking-tighter">#{order.orderId}</span>
                </div>
              </div>
            </GlassCard>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button 
                onClick={() => window.location.href = `/tracking?id=${order.orderId}`}
                className="px-10 py-3 rounded-xl bg-primary text-black font-black uppercase hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
              >
                Track Order
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-10 py-3 rounded-xl glass border border-white/10 text-foreground font-black uppercase hover:bg-white/5 transition-all"
              >
                Return Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
