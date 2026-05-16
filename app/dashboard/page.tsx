'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { User, Wallet, History, Settings, ExternalLink, CreditCard, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserDashboard() {
  const accountStats = [
    { label: 'Total Orders', value: '12', icon: History, color: 'text-primary' },
    { label: 'Wallet Balance', value: '$25.40', icon: Wallet, color: 'text-green-500' },
    { label: 'Saved Game IDs', value: '3', icon: User, color: 'text-blue-500' },
  ];

  const recentOrders = [
    { id: 'DTU-5542', date: '2024-05-15', product: '344 Diamonds', amount: '$6.00', status: 'completed' },
    { id: 'DTU-5541', date: '2024-05-12', product: '172 Diamonds', amount: '$3.00', status: 'completed' },
    { id: 'DTU-5540', date: '2024-05-10', product: '86 Diamonds', amount: '$1.50', status: 'failed' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">User Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, <span className="text-foreground font-bold">Hean</span></p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 rounded-xl bg-primary text-black font-bold flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all">
            <Plus className="w-5 h-5" /> Top Up Wallet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {accountStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={i} className="flex items-center gap-6">
              <div className={`p-4 rounded-2xl bg-foreground/5 border border-foreground/10 ${stat.color}`}>
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-2xl font-black">{stat.value}</div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard title="Recent Orders">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                View All <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-muted-foreground uppercase border-b border-foreground/5">
                    <th className="pb-4 font-medium">Order ID</th>
                    <th className="pb-4 font-medium">Product</th>
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Amount</th>
                    <th className="pb-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/5">
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="group hover:bg-foreground/[0.02] transition-all">
                      <td className="py-5 font-bold text-foreground uppercase">{order.id}</td>
                      <td className="py-5 text-muted-foreground">{order.product}</td>
                      <td className="py-5 text-muted-foreground">{order.date}</td>
                      <td className="py-5 font-bold text-primary">{order.amount}</td>
                      <td className="py-5 text-right">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase border ${
                          order.status === 'completed' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 'text-red-500 border-red-500/20 bg-red-500/5'
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

        {/* Saved IDs and Settings */}
        <div className="space-y-6">
          <GlassCard>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Saved Game IDs
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-foreground/5 border border-foreground/10 flex justify-between items-center group hover:neon-border transition-all cursor-pointer">
                <div>
                  <div className="font-bold">MLBB Main</div>
                  <div className="text-xs text-muted-foreground">12345678 (1234)</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all">
                  <CreditCard className="w-4 h-4 text-primary group-hover:text-black" />
                </div>
              </div>
              <button className="w-full py-3 rounded-xl border border-dashed border-foreground/20 text-muted-foreground text-sm font-bold hover:border-primary hover:text-primary transition-all">
                + Add New Account
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-bold mb-6">Security & Settings</h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-foreground/5 flex items-center justify-between group transition-all">
                <span className="text-sm font-medium">Update Profile</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-foreground/5 flex items-center justify-between group transition-all">
                <span className="text-sm font-medium">Change Password</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-foreground/5 flex items-center justify-between group transition-all">
                <span className="text-sm font-medium">Two-Factor Authentication</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all" />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);
