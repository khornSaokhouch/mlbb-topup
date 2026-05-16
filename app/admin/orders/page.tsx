'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { ShoppingCart, Search, Filter, Download, MoreHorizontal, Loader2, ArrowUpRight, Trash2 } from 'lucide-react';
import { useTranslation } from '@/components/providers/LanguageProvider';
import ConfirmModal from '@/components/ui/ConfirmModal';

export default function AdminOrders() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; orderId: string | null }>({
    isOpen: false,
    orderId: null
  });

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Fetch orders error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const confirmDelete = async () => {
    const orderId = deleteModal.orderId;
    if (!orderId) return;
    
    try {
      const res = await fetch(`/api/orders?orderId=${orderId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setOrders(prev => prev.filter(o => o.orderId !== orderId));
        setDeleteModal({ isOpen: false, orderId: null });
      } else {
        alert('Failed to delete order');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('An error occurred while deleting');
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight neon-text">Orders Management</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Monitor and manage all live customer transactions.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-grow md:flex-none px-6 py-2.5 rounded-xl bg-primary text-black font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all active:scale-95">
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
              className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-medium"
            />
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-xl bg-foreground/5 border border-foreground/10 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:neon-border transition-all">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] border-b border-foreground/5 font-bold">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">User Info</th>
                <th className="pb-4">Product</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">{t('status')}</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-muted-foreground">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                    <span className="text-[10px] uppercase font-black tracking-widest">Loading orders from database...</span>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-muted-foreground">
                    <span className="text-[10px] uppercase font-black tracking-widest">No orders found.</span>
                  </td>
                </tr>
              ) : (
                orders.map((order, i) => (
                  <tr key={i} className="group hover:bg-foreground/[0.02] transition-colors">
                    <td className="py-5">
                      <div className="font-black text-foreground uppercase tracking-tighter tabular-nums">#{order.orderId}</div>
                      <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="font-bold text-sm tracking-tight">{order.gameNickname || 'Unknown'}</div>
                      <div className="text-[10px] text-muted-foreground font-medium tabular-nums">{order.gameUserId} ({order.gameZoneId})</div>
                    </td>
                    <td className="py-5 text-sm text-muted-foreground">{order.productName || 'Custom Diamonds'}</td>
                    <td className="py-5 font-black text-primary tabular-nums">${order.amount?.toFixed(2) || '0.00'}</td>
                    <td className="py-5">
                      <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase border ${
                        order.paymentStatus === 'paid' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 
                        order.paymentStatus === 'pending' ? 'text-blue-500 border-blue-500/20 bg-blue-500/5' :
                        'text-red-500 border-red-500/20 bg-red-500/5'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setDeleteModal({ isOpen: true, orderId: order.orderId })}
                          className="p-2 hover:bg-red-500/10 rounded-xl transition-all group-hover:neon-border text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-foreground/5 rounded-xl transition-all group-hover:neon-border">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        title="Delete Order?"
        message={`Are you sure you want to permanently delete order #${deleteModal.orderId}? This action cannot be undone.`}
        confirmLabel="Delete Order"
        cancelLabel="Discard"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, orderId: null })}
      />
    </>
  );
}
