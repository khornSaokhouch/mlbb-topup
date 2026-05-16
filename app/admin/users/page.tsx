'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Users, Search, Mail, Shield, Wallet, MoreVertical, UserPlus, Edit2, Trash2, Loader2, ArrowLeft } from 'lucide-react';
import UserModal from '@/components/admin/UserModal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Link from 'next/link';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users?search=${search}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user: any) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUser = async (userId: string, data: any) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setIsDeleteModalOpen(false);
        fetchUsers();
      } else {
        const err = await response.json();
        alert(err.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight neon-text">User Management</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Manage customer accounts, roles, and wallet balances.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-grow md:flex-none px-6 py-3 rounded-xl bg-foreground/5 border border-foreground/10 text-[10px] font-black uppercase tracking-widest hover:bg-foreground/10 transition-all flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4 text-primary" /> Export Users
          </button>
        </div>
      </div>

      <GlassCard className="mb-8">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..." 
            className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-all font-bold"
          />
        </form>
      </GlassCard>

      <GlassCard>
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Syncing accounts...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] border-b border-foreground/5 font-bold">
                  <th className="pb-4">User Identity</th>
                  <th className="pb-4">Security Level</th>
                  <th className="pb-4">Wallet Balance</th>
                  <th className="pb-4">Registration</th>
                  <th className="pb-4 text-right">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {users.map((user, i) => (
                  <tr key={i} className="group hover:bg-foreground/[0.02] transition-colors">
                    <td className="py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-primary font-black text-xl shadow-inner group-hover:scale-110 transition-transform">
                          {user.name[0]}
                        </div>
                        <div>
                          <div className="font-black text-foreground uppercase tracking-tight">{user.name}</div>
                          <div className="text-[10px] text-muted-foreground font-bold flex items-center gap-1.5 mt-0.5">
                            <Mail className="w-3 h-3 text-primary/60" /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase border tracking-widest ${
                        user.role === 'admin' 
                        ? 'text-primary border-primary/20 bg-primary/10 shadow-[0_0_15px_rgba(0,229,255,0.1)]' 
                        : 'text-muted-foreground border-foreground/10 bg-foreground/5'
                      }`}>
                        <Shield className="w-3.5 h-3.5" /> {user.role}
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-2 font-black text-white text-lg tabular-nums">
                        <Wallet className="w-4 h-4 text-primary shadow-[0_0_10px_rgba(0,229,255,0.4)]" /> 
                        ${user.walletBalance?.toFixed(2) || '0.00'}
                      </div>
                    </td>
                    <td className="py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(user)}
                          className="p-2.5 bg-primary/10 text-primary border border-primary/20 rounded-xl hover:bg-primary hover:text-black transition-all"
                          title="Edit User"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(user)}
                          className="p-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>

      <UserModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User Account?"
        message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone and will permanently remove all associated data.`}
      />
    </>
  );
}
