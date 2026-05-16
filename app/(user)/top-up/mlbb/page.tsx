'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from '@/components/providers/LanguageProvider';
import GlassCard from '@/components/ui/GlassCard';
import ProductCard from '@/components/home/ProductCard';
import { ProviderService } from '@/services/provider.service';
import { Loader2, CheckCircle2, AlertCircle, CreditCard, Landmark, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const topUpSchema = z.object({
  userId: z.string().min(5, 'User ID is too short'),
  zoneId: z.string().min(3, 'Zone ID is too short'),
});

const products = [
  { id: '1', diamonds: 86, bonus: 9, price: 1.50 },
  { id: '2', diamonds: 172, bonus: 18, price: 3.00 },
  { id: '3', diamonds: 257, bonus: 28, price: 4.50 },
  { id: '4', diamonds: 344, bonus: 37, price: 6.00 },
  { id: '5', diamonds: 706, bonus: 84, price: 12.00 },
  { id: '6', diamonds: 1050, bonus: 134, price: 18.00 },
];

const paymentMethods = [
  { id: 'aba', name: 'ABA Pay', icon: Landmark, color: 'text-blue-500' },
  { id: 'khqr', name: 'Bakong KHQR', icon: QrCode, color: 'text-red-500' },
  { id: 'stripe', name: 'Credit Card', icon: CreditCard, color: 'text-purple-500' },
];

function TopUpContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const { t } = useTranslation();
  const [isValidating, setIsValidating] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(topUpSchema),
  });

  useEffect(() => {
    if (productId) {
      const product = products.find(p => p.id === productId);
      if (product) setSelectedProduct(product);
    }
  }, [productId]);

  const onSubmit = async (data: any) => {
    setIsValidating(true);
    setError(null);
    setNickname(null);
    try {
      const result = await ProviderService.validatePlayer(data.userId, data.zoneId);
      if (result.success) {
        setNickname(result.nickname);
      }
    } catch (err: any) {
      setError(err.message || 'Player not found');
    } finally {
      setIsValidating(false);
    }
  };

  const handleCheckout = async () => {
    if (!nickname || !selectedProduct || !selectedPayment) return;
    
    setIsProcessing(true);
    // Mimic API call to create order
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    alert('Order placed successfully! Redirecting to payment...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Step 1 & 2: User ID and Package */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Step 1: User Info */}
          <GlassCard className="!p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center text-sm font-black">1</span>
              Account Information
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">{t('userId')}</label>
                  <input
                    {...register('userId')}
                    placeholder="Enter User ID"
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all"
                  />
                  {errors.userId && <p className="text-xs text-red-500 mt-1">{errors.userId.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">{t('zoneId')}</label>
                  <input
                    {...register('zoneId')}
                    placeholder="Zone ID"
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all"
                  />
                  {errors.zoneId && <p className="text-xs text-red-500 mt-1">{errors.zoneId.message as string}</p>}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isValidating}
                className="w-full sm:w-auto px-10 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold hover:bg-primary hover:text-black transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {t('check')}
              </button>
            </form>

            <AnimatePresence>
              {nickname && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-bold">Player Found: {nickname}</span>
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-bold">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          {/* Step 2: Select Package */}
          <GlassCard className="!p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center text-sm font-black">2</span>
              Select Diamonds
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {products.map((p) => (
                <ProductCard 
                  key={p.id}
                  {...p} 
                  onSelect={() => setSelectedProduct(p)}
                  className={selectedProduct?.id === p.id ? 'neon-border !bg-primary/5' : ''}
                />
              ))}
            </div>
          </GlassCard>

          {/* Step 3: Payment Method */}
          <GlassCard className="!p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center text-sm font-black">3</span>
              Select Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
                      selectedPayment === method.id 
                      ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                      : 'border-foreground/10 hover:border-foreground/30 bg-foreground/5'
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${method.color}`} />
                    <span className="font-bold text-sm">{method.name}</span>
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Sidebar: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <GlassCard className="!p-8 space-y-6">
              <h2 className="text-xl font-bold border-b border-foreground/10 pb-4">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Player</span>
                  <span className="text-foreground font-bold">{nickname || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Product</span>
                  <span className="text-foreground font-bold">{selectedProduct ? `${selectedProduct.diamonds} Diamonds` : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment</span>
                  <span className="text-foreground font-bold uppercase">{selectedPayment || '-'}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-foreground/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="text-2xl font-black text-primary">${selectedProduct ? selectedProduct.price.toFixed(2) : '0.00'}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={!nickname || !selectedProduct || !selectedPayment || isProcessing}
                  className="w-full py-4 rounded-xl bg-primary text-black font-black text-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'CONFIRM TOP-UP'}
                </button>
              </div>
            </GlassCard>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function TopUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    }>
      <TopUpContent />
    </Suspense>
  );
}
