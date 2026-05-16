'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { ShoppingCart, Search, Filter, Download, MoreHorizontal } from 'lucide-react';

export default function AdminOrders() {
  const orders = [
    { id: 'ORD-9981', user: 'Hean', product: '1050 Diamonds', amount: '$18.00', status: 'completed', date: '2024-05-16 14:20' },
    { id: 'ORD-9980', user: 'Sophea', product: '344 Diamonds', amount: '$6.00', status: 'processing', date: '2024-05-16 12:45' },
    { id: 'ORD-9979', user: 'Dara', product: '86 Diamonds', amount: '$1.50', status: 'completed', date: '2024-05-15 18:30' },
    { id: 'ORD-9978', user: 'Bona', product: '2195 Diamonds', amount: '$36.00', status: 'failed', date: '2024-05-15 10:15' },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Orders Management</h1>
          <p className="text-muted-foreground">Monitor and manage all customer transactions.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-grow md:flex-none px-4 py-2 rounded-lg bg-primary text-black font-bold flex items-center justify-center gap-2 shadow-lg">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <GlassCard className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by Order ID or User..." 
              className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 text-sm font-bold flex items-center gap-2 hover:bg-foreground/10 transition-all">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-muted-foreground uppercase border-b border-foreground/5">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">User</th>
                <th className="pb-4">Product</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5">
              {orders.map((order, i) => (
                <tr key={i} className="group hover:bg-foreground/[0.02] transition-colors">
                  <td className="py-5 font-bold text-foreground uppercase">{order.id}</td>
                  <td className="py-5 text-muted-foreground font-medium">{order.user}</td>
                  <td className="py-5 text-muted-foreground">{order.product}</td>
                  <td className="py-5 font-bold text-primary">{order.amount}</td>
                  <td className="py-5 text-xs text-muted-foreground">{order.date}</td>
                  <td className="py-5">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${
                      order.status === 'completed' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 
                      order.status === 'processing' ? 'text-blue-500 border-blue-500/20 bg-blue-500/5' :
                      'text-red-500 border-red-500/20 bg-red-500/5'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-5 text-right">
                    <button className="p-2 hover:bg-foreground/5 rounded-lg transition-all">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );
}
