'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Wallet, Search, ArrowDownRight, ArrowUpRight, CheckCircle2, XCircle, Clock, Filter, Loader2, User } from 'lucide-react';

export default function AdminWallet() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, [statusFilter]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/transactions?search=${search}`;
      if (statusFilter !== 'all') url += `&status=${statusFilter}`;
      const response = await fetch(url);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/transactions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchTransactions();
      } else {
        const err = await response.json();
        alert(err.error || 'Failed to update transaction');
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight neon-text">Wallet Management</h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Audit user deposits and manage transaction statuses.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-6 py-3 rounded-xl bg-foreground/5 border border-foreground/10 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary transition-all"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <GlassCard className="mb-8">
        <form onSubmit={(e) => { e.preventDefault(); fetchTransactions(); }} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Reference ID or username..." 
            className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-all font-bold uppercase tracking-tight"
          />
        </form>
      </GlassCard>

      <GlassCard>
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Auditing Ledger...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] border-b border-foreground/5 font-bold">
                  <th className="pb-4">Transaction</th>
                  <th className="pb-4">User Details</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {transactions.map((tx) => (
                  <tr key={tx._id} className="group hover:bg-foreground/[0.02] transition-colors">
                    <td className="py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          tx.type === 'deposit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {tx.type === 'deposit' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-black text-foreground uppercase tracking-tighter text-sm">
                            {tx.type === 'deposit' ? 'Wallet Top-up' : 'Diamond Purchase'}
                          </div>
                          <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                            REF: {tx.referenceId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary border border-primary/20">
                          {tx.userId?.name?.[0] || 'U'}
                        </div>
                        <div>
                          <div className="font-bold text-xs">{tx.userId?.name || 'Unknown User'}</div>
                          <div className="text-[9px] text-muted-foreground">{tx.userId?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="font-black text-white text-base tabular-nums">
                        ${tx.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        tx.status === 'completed' ? 'text-green-500 border-green-500/20 bg-green-500/5' :
                        tx.status === 'failed' ? 'text-red-500 border-red-500/20 bg-red-500/5' :
                        'text-yellow-500 border-yellow-500/20 bg-yellow-500/5 shadow-[0_0_10px_rgba(234,179,8,0.1)]'
                      }`}>
                        {tx.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                        {tx.status === 'failed' && <XCircle className="w-3 h-3" />}
                        {tx.status === 'pending' && <Clock className="w-3 h-3 animate-pulse" />}
                        {tx.status}
                      </div>
                    </td>
                    <td className="py-5 text-right">
                      {tx.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleStatusUpdate(tx._id, 'completed')}
                            className="px-4 py-2 bg-green-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-green-500/20 hover:scale-105 transition-all"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(tx._id, 'failed')}
                            className="px-4 py-2 bg-red-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:scale-105 transition-all"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </>
  );
}
