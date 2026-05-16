'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Users, Search, Mail, Shield, Wallet, MoreVertical, UserPlus } from 'lucide-react';

export default function AdminUsers() {
  const users = [
    { name: 'Hean', email: 'hean@example.com', role: 'user', balance: '$25.40', joined: '2024-05-10' },
    { name: 'Main Admin', email: 'admin@topup.com', role: 'admin', balance: '$0.00', joined: '2024-05-01' },
    { name: 'Sophea', email: 'sophea@example.com', role: 'user', balance: '$10.00', joined: '2024-05-12' },
    { name: 'Dara', email: 'dara@example.com', role: 'user', balance: '$0.00', joined: '2024-05-15' },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage customer accounts, roles, and wallet balances.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-grow md:flex-none px-6 py-3 rounded-xl bg-primary text-black font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/20 transition-all">
            <UserPlus className="w-5 h-5" /> Add New User
          </button>
        </div>
      </div>

      <GlassCard className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </GlassCard>

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-muted-foreground uppercase border-b border-foreground/5">
                <th className="pb-4">User</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Wallet</th>
                <th className="pb-4">Joined</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5">
              {users.map((user, i) => (
                <tr key={i} className="group hover:bg-foreground/[0.02] transition-colors">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-primary font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${
                      user.role === 'admin' ? 'text-primary border-primary/20 bg-primary/5' : 'text-muted-foreground border-foreground/10 bg-foreground/5'
                    }`}>
                      <Shield className="w-3 h-3" /> {user.role}
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                      <Wallet className="w-4 h-4 text-green-500" /> {user.balance}
                    </div>
                  </td>
                  <td className="py-5 text-xs text-muted-foreground">{user.joined}</td>
                  <td className="py-5 text-right">
                    <button className="p-2 hover:bg-foreground/5 rounded-lg transition-all">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
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
