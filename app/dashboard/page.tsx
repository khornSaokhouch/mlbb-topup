'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { User, Wallet, History, Settings, ExternalLink, CreditCard, Plus, LogOut, ChevronRight, Shield, ShoppingBag, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function UserProfile() {
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalSpent: 0, orderCount: 0 });

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Fetch orders
      const orderRes = await fetch('/api/orders');
      const orderData = await orderRes.json();
      if (Array.isArray(orderData)) {
        setOrders(orderData);
        const completedOrders = orderData.filter(o => o.paymentStatus === 'completed');
        setStats({
          totalSpent: completedOrders.reduce((sum, o) => sum + (o.price || 0), 0),
          orderCount: orderData.length
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') return null;
  if (!session) {
    if (typeof window !== 'undefined') window.location.href = '/login';
    return null;
  }

  const user = session.user as any;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative">
       <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary/10 blur-[150px] rounded-full pointer-events-none z-0 opacity-50" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-primary/20 shadow-[0_0_30px_rgba(0,229,255,0.2)] group-hover:scale-105 transition-transform duration-500">
                <img src={user?.image || '/logo/logo.png'} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-black shadow-lg">
                <Shield className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight neon-text mb-1">
                {user?.name || 'Gamer'}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                  {user?.role || 'User'}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Link 
              href="/wallet"
              className="flex-1 md:flex-none px-8 py-4 rounded-2xl bg-primary text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" /> Top Up Wallet
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <GlassCard className="group hover:neon-border transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 transition-transform">
                <Wallet className="w-8 h-8" />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1 font-bold">Wallet Balance</div>
                <div className="text-3xl font-black tabular-nums">${user?.walletBalance?.toFixed(2) || '0.00'}</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="group hover:neon-border transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1 font-bold">Total Orders</div>
                <div className="text-3xl font-black tabular-nums">{stats.orderCount}</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="group hover:neon-border transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 group-hover:scale-110 transition-transform">
                <CreditCard className="w-8 h-8" />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1 font-bold">Lifetime Value</div>
                <div className="text-3xl font-black tabular-nums">${stats.totalSpent.toFixed(2)}</div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <GlassCard>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black uppercase tracking-tight">Recent Activity</h2>
                <Link href="/orders" className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:underline">
                  View All Orders <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {loading ? (
                   <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Syncing Ledger...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-20 text-center">
                    <History className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">No recent orders yet</p>
                  </div>
                ) : orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="group flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center font-black text-xs text-primary border border-white/5">
                        #{order.orderId?.slice(-4)}
                      </div>
                      <div>
                        <div className="text-sm font-black uppercase tracking-tight text-foreground truncate max-w-[150px] sm:max-w-none">
                          Diamond Purchase
                        </div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          {new Date(order.createdAt).toLocaleDateString()} • {order.orderId}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-white tabular-nums">${(order.price || 0).toFixed(2)}</div>
                      <div className={`text-[9px] font-black uppercase tracking-tighter ${
                        order.paymentStatus === 'completed' ? 'text-green-500' : 'text-yellow-500'
                      }`}>
                        {order.paymentStatus}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="space-y-8">
             <GlassCard className="border-primary/10">
              <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" /> Settings
              </h2>
              <div className="space-y-3">
                <button className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between group transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest">Edit Profile</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all" />
                </button>
                <button className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between group transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest">Change Password</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all" />
                </button>
                <div className="h-px bg-white/5 my-3" />
                <button 
                  onClick={() => signOut()}
                  className="w-full text-left px-5 py-4 rounded-2xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 flex items-center justify-between group transition-all"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Sign Out</span>
                  <LogOut className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </GlassCard>

            <GlassCard className="bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/20">
              <h2 className="text-lg font-black uppercase tracking-tight mb-2">Need Help?</h2>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-6">Our support team is available 24/7</p>
              <button className="w-full py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:shadow-xl transition-all">
                Contact Support
              </button>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
