'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import GlassCard from '@/components/ui/GlassCard';
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, Clock, ShieldCheck, Loader2, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WalletPage() {
  const { data: session, status } = useSession();
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalDeposits: 0, totalSpent: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchWalletData();
    }
  }, [status]);

  const fetchWalletData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/wallet/history');
      const data = await response.json();
      if (data.transactions) {
        setTransactions(data.transactions);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') return null;
  if (status === 'unauthenticated' || !session) {
    if (typeof window !== 'undefined') window.location.href = '/login';
    return null;
  }

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) < 1) return;
    setIsGeneratingQR(true);
    setQrCode(null);
    try {
      const response = await fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: depositAmount }),
      });
      const data = await response.json();
      if (data.success) {
        setQrCode(data.qr_image);
      } else {
        alert(data.error || 'Failed to generate QR');
      }
    } catch (error) {
      console.error('Deposit error:', error);
      alert('An unexpected error occurred');
    } finally {
      setIsGeneratingQR(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full pointer-events-none z-0 opacity-50" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight neon-text">My Wallet</h1>
            <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold mt-1">Manage your funds and transaction history</p>
          </div>
          <button 
            onClick={() => setIsDepositModalOpen(true)}
            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-primary text-black font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> Deposit Money
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <GlassCard className="md:col-span-2 !p-8 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Wallet className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Available Balance</div>
              <div className="text-6xl font-black text-white tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                ${(session.user as any).walletBalance?.toFixed(2) || '0.00'}
              </div>
              <div className="mt-8 flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Secure Wallet
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <Clock className="w-3.5 h-3.5 text-secondary" /> Instant Top-up
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="!p-8 flex flex-col justify-center border-white/5">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Quick Stats</div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Deposits</span>
                <span className="text-sm font-black text-green-500">${stats.totalDeposits.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Spent</span>
                <span className="text-sm font-black text-red-500">${stats.totalSpent.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                <span className="text-xs font-black text-foreground uppercase tracking-wider">Orders</span>
                <span className="text-sm font-black text-primary">{stats.totalOrders}</span>
              </div>
            </div>
          </GlassCard>
        </div>

        <GlassCard>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black uppercase tracking-tight">Recent Activity</h2>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View All History</button>
          </div>
          <div className="space-y-4">
            {loading ? (
               <div className="py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Synchronising transactions...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">No transactions found</p>
              </div>
            ) : transactions.map((tx) => (
              <div key={tx._id} className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    tx.type === 'deposit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {tx.type === 'deposit' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-sm font-black uppercase tracking-tight text-foreground truncate max-w-[150px] sm:max-w-none">
                      {tx.type === 'deposit' ? 'Wallet Top-up' : tx.description || 'Diamond Purchase'}
                    </div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {new Date(tx.createdAt).toLocaleDateString()} • {tx.referenceId}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-black tabular-nums ${
                    tx.type === 'deposit' ? 'text-green-500' : 'text-white'
                  }`}>
                    {tx.type === 'deposit' ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </div>
                  <div className={`text-[9px] font-black uppercase tracking-tighter ${
                    tx.status === 'completed' ? 'text-primary/60' : 'text-yellow-500/60'
                  }`}>
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <AnimatePresence>
        {isDepositModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDepositModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md"
            >
              <GlassCard className="!p-8 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black uppercase tracking-tight">Deposit Funds</h2>
                  <button onClick={() => setIsDepositModalOpen(false)} className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {!qrCode ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount to Deposit (USD)</label>
                      <input 
                        type="number" 
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="Min. $1.00"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-2xl font-black text-white focus:outline-none focus:border-primary transition-all tabular-nums"
                      />
                    </div>
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest leading-relaxed">
                      Note: Deposits are processed via Bakong KHQR. Funds will be added to your wallet instantly after payment.
                    </div>
                    <button 
                      onClick={handleDeposit}
                      disabled={!depositAmount || parseFloat(depositAmount) < 1 || isGeneratingQR}
                      className="w-full py-5 rounded-2xl bg-primary text-black font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {isGeneratingQR ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Generate KHQR <QrCode className="w-5 h-5" /></>}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-6 py-4">
                    <div className="relative p-6 bg-white rounded-3xl group">
                      <img src={qrCode || ''} alt="Bakong QR" className="w-64 h-64 object-contain text-black font-bold flex items-center justify-center text-center" />
                      {!qrCode && (
                        <div className="absolute inset-0 flex items-center justify-center text-black font-black uppercase tracking-tighter text-sm">
                          Generating QR...
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/5 animate-pulse rounded-3xl -z-10" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-primary mb-1 uppercase tracking-tighter">Scan to Pay ${parseFloat(depositAmount).toFixed(2)}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Waiting for payment confirmation...</div>
                    </div>
                    <button 
                      onClick={() => { setQrCode(null); setIsDepositModalOpen(false); }}
                      className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors underline"
                    >
                      I've made the payment
                    </button>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const X = ({ className, onClick }: any) => (
  <svg onClick={onClick} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
