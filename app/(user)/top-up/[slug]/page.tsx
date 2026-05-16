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
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    alert('Order placed successfully! Redirecting to payment...');
  };

  const paymentMethods = [
    { id: 'aba', name: 'ABA Pay', icon: Landmark, color: 'text-blue-500' },
    { id: 'khqr', name: 'Bakong KHQR', icon: QrCode, color: 'text-red-500' },
    { id: 'stripe', name: 'Credit Card', icon: CreditCard, color: 'text-purple-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Games
      </Link>

      <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-primary/20 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
          <img src={gameConfig.image} alt={gameConfig.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight">{gameConfig.name}</h1>
          <p className="text-muted-foreground">Premium Top-Up Service • Instant Delivery</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Step 1: Account Information */}
          <GlassCard className="!p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center text-sm font-black">1</span>
              Account Information
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gameConfig.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">{field.label}</label>
                    <input
                      {...register(field.name as any)}
                      placeholder={field.placeholder}
                      className="w-full bg-background/20 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all backdrop-blur-md"
                    />
                    {errors[field.name] && <p className="text-xs text-red-500 mt-1">{errors[field.name]?.message as string}</p>}
                  </div>
                ))}
              </div>
              
              <button
                type="submit"
                disabled={isValidating}
                className="w-full sm:w-auto px-10 py-3 rounded-xl bg-primary text-black font-bold hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Verify ID
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
              Select {gameConfig.currencyName}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                    ? '!border-primary !bg-primary/10 shadow-[0_0_25px_rgba(0,229,255,0.4)] scale-[1.02] ring-1 ring-primary' 
                    : 'border-border hover:border-primary/50'}
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
                      : 'border-border hover:border-primary/50 bg-background/20 backdrop-blur-md'
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
              <h2 className="text-xl font-bold border-b border-border pb-4">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Game</span>
                  <span className="text-foreground font-bold">{gameConfig.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Player</span>
                  <span className="text-foreground font-bold">{nickname || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Product</span>
                  <span className="text-foreground font-bold">{selectedProduct ? `${selectedProduct.amount} ${gameConfig.currencyName}` : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment</span>
                  <span className="text-foreground font-bold uppercase">{selectedPayment || '-'}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
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
