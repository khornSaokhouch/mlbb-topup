'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import GlassCard from '@/components/ui/GlassCard';
import { User, Mail, Wallet, History, Shield, LogOut, Settings, Globe, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) return null;

  const user = session.user as any;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="text-center p-8">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-primary/20 p-1 overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                <img 
                  src={user?.image || '/logo/logo.png'} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-lg">
                <Settings className="w-4 h-4 text-black" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-foreground mb-1">{user?.name}</h2>
            <p className="text-muted-foreground text-sm mb-6 uppercase tracking-widest font-bold">
              {user?.role === 'admin' ? 'Administrator' : 'Premium Member'}
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => signOut()}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold text-sm"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> Security Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Email Status</span>
                <span className="text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded text-[10px] uppercase">Verified</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">2FA</span>
                <span className="text-muted-foreground font-bold">Disabled</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Login Method</span>
                <div className="flex items-center gap-1.5">
                  {user?.email?.includes('@telegram.com') ? (
                    <><Send className="w-3 h-3 text-[#0088cc]" /> <span className="font-bold">Telegram</span></>
                  ) : (
                    <><svg className="w-3 h-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> <span className="font-bold">Google</span></>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col">
                  <span className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-4">Total Balance</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-3xl font-black text-foreground tabular-nums">${user?.walletBalance?.toFixed(2) || '0.00'}</span>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter mt-1">Available for top-up</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-8 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col h-full">
                  <span className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-4">Account ID</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center">
                      <User className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-lg font-black text-foreground truncate max-w-[180px] block">{user?.email}</span>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter mt-1">Registered email</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Transactions Area */}
          <GlassCard className="p-8 min-h-[400px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                <History className="w-6 h-6 text-primary" /> Recent History
              </h3>
            </div>

            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
              <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
                <History className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest">No recent transactions</p>
              <p className="text-xs mt-2">Your recent purchases and deposits will appear here.</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
