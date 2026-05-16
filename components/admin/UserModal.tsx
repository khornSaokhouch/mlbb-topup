'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Shield, Wallet, Save, Loader2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSave: (userId: string, data: any) => Promise<void>;
}

const UserModal = ({ isOpen, onClose, user, onSave }: UserModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    walletBalance: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
        walletBalance: user.walletBalance || 0,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(user._id, formData);
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg"
          >
            <GlassCard className="!p-8 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Edit User Account</h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">User Identity</label>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-all font-bold"
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-all font-bold"
                        placeholder="Email Address"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Access Role</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-all font-bold appearance-none uppercase"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Wallet Balance ($)</label>
                    <div className="relative">
                      <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="number"
                        step="0.01"
                        value={formData.walletBalance}
                        onChange={(e) => setFormData({ ...formData, walletBalance: parseFloat(e.target.value) })}
                        className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-all font-bold tabular-nums"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-primary text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-5 h-5" /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserModal;
