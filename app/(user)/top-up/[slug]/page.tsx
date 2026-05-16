'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useParams, notFound } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from '@/components/providers/LanguageProvider';
import GlassCard from '@/components/ui/GlassCard';
import ProductCard from '@/components/home/ProductCard';
import { ProviderService } from '@/services/provider.service';
import { GAMES_CONFIG } from '@/config/games';
import { Loader2, CheckCircle2, AlertCircle, CreditCard, Landmark, QrCode, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

function TopUpContent() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const { t } = useTranslation();
  
  const gameConfig = GAMES_CONFIG[slug as string];
  if (!gameConfig) notFound();

  const [isValidating, setIsValidating] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>('khqr');
  const [isProcessing, setIsProcessing] = useState(false);

  // Dynamic Schema based on fields
  const schemaShape: any = {};
  gameConfig.fields.forEach(field => {
    schemaShape[field.name] = z.string().min(3, `${field.label} is too short`);
  });
  const topUpSchema = z.object(schemaShape);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(topUpSchema),
  });

  useEffect(() => {
    if (productId) {
      const product = gameConfig.products.find(p => p.id === productId);
      if (product) setSelectedProduct(product);
    }
  }, [productId, gameConfig]);

  const onSubmit = async (data: any) => {
    setIsValidating(true);
    setError(null);
    setNickname(null);
    try {
      // Pass all form data to validation
      const result = await ProviderService.validatePlayer(data.userId || data.playerId, data.zoneId || '');
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
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameUserId: watch('userId') || watch('playerId'),
          gameZoneId: watch('zoneId') || '',
          gameNickname: nickname,
          productId: selectedProduct.id,
          productName: `${selectedProduct.amount} ${gameConfig.currencyName}`,
          amount: selectedProduct.price,
          paymentMethod: selectedPayment,
        }),
      });

      if (response.ok) {
        const order = await response.json();
        const { useRouter } = await import('next/navigation');
        window.location.href = `/payment?orderId=${order.orderId}`;
      } else {
        const err = await response.json();
        alert(err.error || 'Failed to create order');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { id: 'khqr', name: 'Bakong KHQR', image: '/payments/bakong.png', color: 'text-red-500' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Dynamic Background Glows */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/20 blur-[150px] rounded-full pointer-events-none z-0 opacity-50" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary/10 blur-[150px] rounded-full pointer-events-none z-0 opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-12 transition-all font-bold group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t('back')}
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <div className="relative w-32 h-32 rounded-[2.2rem] overflow-hidden border-2 border-white/10 glass-dark shadow-2xl">
              <img src={gameConfig.image} alt={gameConfig.name} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-2">
              {gameConfig.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">Official Partner</span>
              <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-[10px]">Instant Fulfillment</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            
            {/* Step 1: Account Info */}
            <div className="relative group">
              <GlassCard className="!p-10 border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
                <div className="relative z-10 flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)] text-black font-black">01</div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">{t('step1Verify')}</h2>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6 -mt-4 ml-14">{t('step1Desc')}</p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {gameConfig.fields.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{field.label}</label>
                        <input
                          {...register(field.name as any)}
                          placeholder={field.placeholder}
                          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all font-bold tabular-nums placeholder:text-muted-foreground/30 shadow-inner"
                        />
                        {errors[field.name] && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wide mt-1 animate-pulse">{errors[field.name]?.message as string}</p>}
                      </div>
                    ))}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isValidating}
                    className="group relative px-10 py-4 rounded-2xl bg-primary text-black font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all disabled:opacity-50 overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center gap-2">
                       {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : nickname ? <CheckCircle2 className="w-4 h-4" /> : <Loader2 className="w-4 h-4" />}
                       {nickname ? t('verifiedBtn') : t('verifyBtn')}
                    </div>
                  </button>
                </form>

                <AnimatePresence>
                  {nickname && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Verified Identity</div>
                          <div className="text-xl font-black uppercase">{nickname}</div>
                        </div>
                      </div>
                      <div className="hidden sm:block text-[8px] font-black uppercase tracking-widest py-1 px-2 rounded-full border border-primary/40 text-primary">Status: Valid</div>
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-8 p-6 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-500 flex items-center gap-4"
                    >
                      <AlertCircle className="w-6 h-6" />
                      <span className="font-black uppercase tracking-tight">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </div>

            {/* Step 2: Select Package */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(112,0,255,0.4)] text-black font-black">02</div>
                <h2 className="text-2xl font-black uppercase tracking-tight">{t('step2Package')}</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {gameConfig.products.map((p) => (
                  <ProductCard 
                    key={p.id}
                    amount={p.amount!}
                    price={p.price}
                    bonus={p.bonus}
                    currencyName={gameConfig.currencyName}
                    image={gameConfig.currencyImage}
                    selected={selectedProduct?.id === p.id}
                    onSelect={() => setSelectedProduct(p)}
                    className={selectedProduct?.id === p.id 
                      ? '!border-primary/60 !bg-primary/10 shadow-[0_0_40px_rgba(0,229,255,0.2)] scale-[1.05] z-10 transition-all duration-300' 
                      : 'hover:scale-[1.02] transition-all duration-300 backdrop-blur-md bg-white/[0.02] border-white/5'}
                  />
                ))}
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(255,0,200,0.4)] text-black font-black">03</div>
                <h2 className="text-2xl font-black uppercase tracking-tight">{t('step3Payment')}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {paymentMethods.map((method) => {
                  const Icon = (method as any).icon;
                  const isActive = selectedPayment === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`group p-6 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all relative overflow-hidden ${
                        isActive 
                        ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,229,255,0.2)]' 
                        : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10'
                      }`}
                    >
                      {isActive && <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-l-[20px] border-t-primary border-l-transparent" />}
                      <div className={`p-2 rounded-2xl bg-white/5 transition-transform group-hover:scale-110 ${isActive ? 'shadow-inner' : ''}`}>
                        {method.image ? (
                          <img src={method.image} alt={method.name} className="w-12 h-12 object-contain" />
                        ) : (
                          <Icon className={`w-8 h-8 ${method.color}`} />
                        )}
                      </div>
                      <span className={`font-black uppercase tracking-widest text-[10px] ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{method.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 via-primary/5 to-secondary/20 rounded-[2.5rem] blur opacity-75" />
                <GlassCard className="!p-10 border-white/10 relative overflow-hidden bg-black/60 backdrop-blur-3xl">
                  <h2 className="text-2xl font-black uppercase tracking-tighter border-b border-white/5 pb-6 mb-8 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    Checkout
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center group/item">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target Game</span>
                      <span className="text-sm font-black uppercase group-hover:text-primary transition-colors">{gameConfig.name}</span>
                    </div>
                    <div className="flex justify-between items-center group/item">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Player ID</span>
                      <span className="text-sm font-black">{watch('userId')?.toString() || watch('playerId')?.toString() || '---'}</span>
                    </div>
                    {nickname && (
                      <div className="flex justify-between items-center group/item">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nickname</span>
                        <span className="text-sm font-black text-primary">{nickname}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center group/item">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Package</span>
                      <span className="text-sm font-black">{selectedProduct ? `${selectedProduct.amount} ${gameConfig.currencyName}` : '---'}</span>
                    </div>
                    <div className="flex justify-between items-center group/item">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Method</span>
                      <span className="text-sm font-black uppercase text-primary/80">{selectedPayment || '---'}</span>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/5">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <div className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">{t('totalPayable')}</div>
                        <div className="text-4xl font-black text-white tabular-nums">${selectedProduct ? selectedProduct.price.toFixed(2) : '0.00'}</div>
                      </div>
                      <div className="text-[9px] font-black uppercase text-primary/60 border border-primary/20 px-2 py-1 rounded">USD Only</div>
                    </div>
                    
                    <button
                      onClick={handleCheckout}
                      disabled={!nickname || !selectedProduct || !selectedPayment || isProcessing}
                      className="group relative w-full py-5 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(0,229,255,0.4)] hover:bg-primary transition-all duration-500 disabled:opacity-20 disabled:grayscale overflow-hidden"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : t('confirmOrder')}
                        <CheckCircle2 className="w-5 h-5 group-hover:scale-125 transition-transform" />
                      </div>
                    </button>
                    <p className="text-center text-[8px] font-bold uppercase tracking-widest text-muted-foreground mt-4 opacity-40">{t('instantDelivery')}</p>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DynamicTopUpPage() {
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
