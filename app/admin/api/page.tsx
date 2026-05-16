'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Database, Key, Globe, RefreshCcw, Save, AlertCircle } from 'lucide-react';

export default function AdminAPI() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tight">API Settings</h1>
        <p className="text-muted-foreground">Configure external providers and reseller integration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wide">Diamond Reseller API</h2>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">API Endpoint</label>
              <input 
                type="text" 
                defaultValue="https://api.smile.one/v1/topup"
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">API Key</label>
              <input 
                type="password" 
                defaultValue="••••••••••••••••"
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-yellow-500 text-xs">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Verify your connection status before saving.</span>
              </div>
              <button type="button" className="font-bold hover:underline flex items-center gap-1">
                <RefreshCcw className="w-3 h-3" /> Test
              </button>
            </div>
            <button type="button" className="w-full py-4 rounded-xl bg-primary text-black font-black uppercase hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
              <Save className="w-5 h-5" /> Save Configuration
            </button>
          </form>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Globe className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wide">Webhooks & Callbacks</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Payment Notification URL</label>
              <div className="p-4 rounded-xl bg-background border border-foreground/10 font-mono text-xs text-muted-foreground truncate">
                https://diamond-topup.com/api/webhooks/payment
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Order Callback URL</label>
              <div className="p-4 rounded-xl bg-background border border-foreground/10 font-mono text-xs text-muted-foreground truncate">
                https://diamond-topup.com/api/webhooks/orders
              </div>
            </div>
            <div className="pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-12 h-6 bg-foreground/10 rounded-full relative transition-all group-hover:bg-foreground/20">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-foreground/30 rounded-full transition-all" />
                </div>
                <span className="text-sm font-medium">Enable Automatic Fulfillment</span>
              </label>
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
