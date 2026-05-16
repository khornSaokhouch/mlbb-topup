'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { ShoppingCart, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$12,450.00', icon: DollarSign, trend: '+12.5%', isUp: true },
    { label: 'New Orders', value: '145', icon: ShoppingCart, trend: '+5.2%', isUp: true },
    { label: 'Total Users', value: '1,280', icon: Users, trend: '+8.1%', isUp: true },
    { label: 'Active Provider', value: 'SMILE.ONE', icon: TrendingUp, trend: '98.5% Success', isUp: true },
  ];

  const recentOrders = [
    { id: 'ORD-9981', user: 'Hean', product: '1050 Diamonds', amount: '$18.00', status: 'completed' },
    { id: 'ORD-9980', user: 'Sophea', product: '344 Diamonds', amount: '$6.00', status: 'processing' },
    { id: 'ORD-9979', user: 'Dara', product: '86 Diamonds', amount: '$1.50', status: 'completed' },
    { id: 'ORD-9978', user: 'Bona', product: '2195 Diamonds', amount: '$36.00', status: 'failed' },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Admin Overview</h1>
          <p className="text-muted-foreground">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-lg glass border border-foreground/10 text-xs font-bold hover:bg-foreground/5 transition-all">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={i} className="!p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-foreground/5 border border-foreground/10 rounded-xl">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className={`flex items-center text-xs font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend} {stat.isUp ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                </div>
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-2xl font-black">{stat.value}</div>
            </GlassCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold uppercase tracking-wide">Live Orders</h2>
              <button className="text-primary text-xs font-bold hover:underline">View All Orders</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-muted-foreground uppercase border-b border-foreground/5">
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
                      <td className="py-5 font-bold text-foreground uppercase">{order.id}</td>
                      <td className="py-5 text-muted-foreground">{order.user}</td>
                      <td className="py-5 text-muted-foreground">{order.product}</td>
                      <td className="py-5 font-bold text-primary">{order.amount}</td>
                      <td className="py-5 text-right">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${
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
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Provider Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                  <span className="text-sm font-bold">Reseller API</span>
                </div>
                <span className="text-xs text-muted-foreground">Connected</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                  <span className="text-sm font-bold">ABA Payment</span>
                </div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_#eab308]" />
                  <span className="text-sm font-bold">Stripe</span>
                </div>
                <span className="text-xs text-muted-foreground">Slow</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">System Notifications</h2>
            <div className="space-y-4">
              <div className="p-3 border-l-2 border-primary bg-primary/5 text-xs">
                <div className="font-bold text-foreground mb-1">New Order #ORD-9981</div>
                <div className="text-muted-foreground">2 minutes ago</div>
              </div>
              <div className="p-3 border-l-2 border-secondary bg-secondary/5 text-xs">
                <div className="font-bold text-foreground mb-1">Wallet Deposit - Hean</div>
                <div className="text-muted-foreground">15 minutes ago</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
