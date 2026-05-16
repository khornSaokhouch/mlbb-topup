'use client';

import React, { useState } from 'react';
import { Search, Package, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { motion, AnimatePresence } from 'framer-motion';

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    processing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    completed: 'bg-green-500/10 text-green-500 border-green-500/20',
    failed: 'bg-red-500/10 text-red-500 border-red-500/20',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function TrackingPage() {
  const { t } = useTranslation();
  const [searchId, setSearchId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId) return;

    setIsSearching(true);
    // Mock API search
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setOrder({
      id: searchId.toUpperCase(),
      date: new Date().toLocaleDateString(),
      product: '344 Diamonds',
      amount: '$6.00',
      player: 'Gamer_1234',
      status: 'completed',
      timeline: [
        { label: 'Order Placed', time: '10:00 AM', status: 'completed' },
        { label: 'Payment Verified', time: '10:01 AM', status: 'completed' },
        { label: 'Processing Diamonds', time: '10:02 AM', status: 'completed' },
        { label: 'Success', time: '10:05 AM', status: 'completed' },
      ]
    });
    setIsSearching(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4 uppercase tracking-tight">Order Tracking</h1>
        <p className="text-muted-foreground">Enter your order ID or invoice number to track your top-up status.</p>
      </div>

      <GlassCard className="mb-12">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Example: DTU-123456"
              className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-4 text-foreground focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-8 py-4 rounded-xl bg-primary text-black font-black uppercase hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all disabled:opacity-50"
          >
            {isSearching ? 'Searching...' : 'Track Now'}
          </button>
        </form>
      </GlassCard>

      <AnimatePresence>
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <GlassCard>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Order ID</div>
                  <div className="text-2xl font-black text-primary">{order.id}</div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Status</div>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10 pt-10 border-t border-foreground/10">
                <div>
                  <div className="text-xs text-muted-foreground mb-2 uppercase">Date</div>
                  <div className="font-bold">{order.date}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-2 uppercase">Product</div>
                  <div className="font-bold">{order.product}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-2 uppercase">Player ID</div>
                  <div className="font-bold">{order.player}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-2 uppercase">Amount</div>
                  <div className="font-bold text-primary">{order.amount}</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard title="Order Progress">
              <h3 className="text-lg font-bold mb-8">Service Timeline</h3>
              <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-foreground/10">
                {order.timeline.map((step: any, index: number) => (
                  <div key={index} className="flex items-start gap-6 relative z-10">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      step.status === 'completed' ? 'bg-primary text-black shadow-[0_0_10px_rgba(0,229,255,0.5)]' : 'bg-foreground/5 text-muted-foreground border border-foreground/10'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-bold ${step.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</span>
                        <span className="text-xs text-muted-foreground">{step.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Task completed successfully.</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
