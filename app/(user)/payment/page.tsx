'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { QrCode, Clock, Loader2, CheckCircle2, ShieldCheck, Copy, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PaymentPage() {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [status, setStatus] = useState<'pending' | 'verifying' | 'success'>('pending');

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const simulateVerification = () => {
    setStatus('verifying');
    setTimeout(() => {
      setStatus('success');
    }, 3000);
  };

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
              <p className="text-muted-foreground">Scan the QR code below to complete your order #DTU-5542</p>
            </div>

            <GlassCard className="!p-10 flex flex-col items-center">
              <div className="mb-8 flex items-center gap-4 px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500">
                <Clock className="w-5 h-5 animate-pulse" />
                <span className="font-bold text-lg">{formatTime(timeLeft)}</span>
              </div>

              <div className="relative p-6 bg-white rounded-3xl mb-8 group overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <QrCode className="w-48 h-48 text-black relative z-10" />
              </div>

              <div className="w-full space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-foreground/5 border border-foreground/10 rounded-xl">
                  <div className="text-sm text-muted-foreground">Total Amount</div>
                  <div className="text-2xl font-black text-primary">$6.00</div>
                </div>
                <div className="p-4 bg-foreground/5 border border-foreground/10 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-bold">Secure KHQR Payment</span>
                  </div>
                  <button className="text-xs text-primary font-bold hover:underline">How to pay?</button>
                </div>
              </div>

              {status === 'pending' ? (
                <button
                  onClick={simulateVerification}
                  className="w-full py-4 rounded-xl bg-primary text-black font-black uppercase hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] transition-all"
                >
                  I HAVE PAID
                </button>
              ) : (
                <div className="flex items-center justify-center gap-3 py-4 text-primary font-bold">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Verifying Payment...
                </div>
              )}
            </GlassCard>

            <div className="text-center">
              <button className="text-muted-foreground text-sm hover:text-foreground transition-colors">Cancel Order</button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <CheckCircle2 className="w-12 h-12 text-black" />
            </div>
            <h1 className="text-4xl font-black uppercase">Payment Successful!</h1>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Your diamonds are being processed and will be sent to your account shortly.
            </p>
            
            <GlassCard className="max-w-md mx-auto !p-6">
              <div className="space-y-4 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Player ID</span>
                  <span className="font-bold">12345678 (1234)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Diamonds</span>
                  <span className="font-bold">344 + 37 Bonus</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-bold text-primary">#DTU-5542</span>
                </div>
              </div>
            </GlassCard>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="px-8 py-3 rounded-xl bg-primary text-black font-bold">View Order</button>
              <button className="px-8 py-3 rounded-xl glass border border-foreground/10 text-foreground font-bold">Return Home</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
