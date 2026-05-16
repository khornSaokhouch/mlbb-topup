'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { ShoppingCart, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, ExternalLink, Bell } from 'lucide-react';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { useSession } from 'next-auth/react';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { data: session } = useSession();

  const stats = [
    { label: t('revenue'), value: '$12,450.00', icon: DollarSign, trend: '+12.5%', isUp: true },
    { label: t('newOrders'), value: '145', icon: ShoppingCart, trend: '+5.2%', isUp: true },
    { label: t('users'), value: '1,280', icon: Users, trend: '+8.1%', isUp: true },
    { label: t('providerStatus'), value: 'ONLINE', icon: TrendingUp, trend: '98.5% Success', isUp: true },
  ];

  const recentOrders = [
    { id: 'MOCHI-9981', user: 'Hean', product: '1050 Diamonds', amount: '$18.00', status: 'completed' },
    { id: 'MOCHI-9980', user: 'Sophea', product: '344 Diamonds', amount: '$6.00', status: 'processing' },
    { id: 'MOCHI-9979', user: 'Dara', product: '86 Diamonds', amount: '$1.50', status: 'completed' },
    { id: 'MOCHI-9978', user: 'Bona', product: '2195 Diamonds', amount: '$36.00', status: 'failed' },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight neon-text">{t('adminOverview')}</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">
            {t('welcomeBackAccount')}, <span className="text-primary">{session?.user?.name || 'Admin'}</span>
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 rounded-xl glass border border-foreground/10 text-[10px] font-black uppercase tracking-widest hover:bg-foreground/5 transition-all active:scale-95">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={i} className="group hover:neon-border transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-foreground/5 border border-foreground/10 rounded-xl group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className={`flex items-center text-[10px] font-black uppercase tracking-tighter ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend} {stat.isUp ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : <ArrowDownRight className="w-3 h-3 ml-0.5" />}
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1 font-bold">{stat.label}</div>
              <div className="text-2xl font-black tabular-nums">{stat.value}</div>
            </GlassCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black uppercase tracking-tight">{t('liveOrders')}</h2>
              <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1">
                View All <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] border-b border-foreground/5 font-bold">
                    <th className="pb-4">Order ID</th>
                    <th className="pb-4">User</th>
                    <th className="pb-4">Product</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/5">
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="group hover:bg-foreground/[0.02] transition-colors">
                      <td className="py-5 font-black text-foreground uppercase tracking-tighter">{order.id}</td>
                      <td className="py-5 text-sm text-muted-foreground">{order.user}</td>
                      <td className="py-5 text-sm text-muted-foreground">{order.product}</td>
                      <td className="py-5 font-black text-primary tabular-nums">{order.amount}</td>
                      <td className="py-5 text-right">
                        <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase border ${
                          order.status === 'completed' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 
                          order.status === 'processing' ? 'text-blue-500 border-blue-500/20 bg-blue-500/5' :
                          'text-red-500 border-red-500/20 bg-red-500/5'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-8">
          <GlassCard>
            <h2 className="text-xl font-black uppercase tracking-tight mb-6">{t('providerStatus')}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-foreground/5 border border-foreground/10 group hover:neon-border transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-tight">Smile.One API</span>
                </div>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-foreground/5 border border-foreground/10 group hover:neon-border transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                  <span className="text-xs font-black uppercase tracking-tight">ABA KHQR</span>
                </div>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Online</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-foreground/5 border border-foreground/10 group hover:neon-border transition-all opacity-50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
                  <span className="text-xs font-black uppercase tracking-tight">G2Bulk API</span>
                </div>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Disabled</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" /> Notifications
            </h2>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-2xl">
                <div className="font-black text-xs uppercase tracking-tight text-foreground mb-1">New Order #ORD-9981</div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">2 minutes ago</div>
              </div>
              <div className="p-4 border-l-4 border-secondary bg-secondary/5 rounded-r-2xl">
                <div className="font-black text-xs uppercase tracking-tight text-foreground mb-1">Low Balance: ABA Wallet</div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">15 minutes ago</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
