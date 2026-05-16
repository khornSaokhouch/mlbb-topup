'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Settings, User, Bell, Shield, Palette, Save, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function AdminSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Configure global platform behavior and appearance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard>
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" /> Appearance & Theme
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => setTheme('light')}
                className={`p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  theme === 'light' ? 'border-primary bg-primary/5' : 'border-foreground/10 hover:bg-foreground/5'
                }`}
              >
                <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                  <Sun className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Light Mode</div>
                  <div className="text-xs text-muted-foreground">Clean & High Contrast</div>
                </div>
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  theme === 'dark' ? 'border-primary bg-primary/5' : 'border-foreground/10 hover:bg-foreground/5'
                }`}
              >
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Moon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Dark Mode</div>
                  <div className="text-xs text-muted-foreground">Premium & Neon Glow</div>
                </div>
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Shield className="w-5 h-5 text-secondary" /> Security Policies
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                <div>
                  <div className="font-bold text-sm">Two-Factor Authentication</div>
                  <div className="text-xs text-muted-foreground">Require 2FA for all admin accounts</div>
                </div>
                <div className="w-12 h-6 bg-primary/20 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full shadow-[0_0_8px_#00e5ff]" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                <div>
                  <div className="font-bold text-sm">Automatic Session Timeout</div>
                  <div className="text-xs text-muted-foreground">Log out users after 30 mins of inactivity</div>
                </div>
                <div className="w-12 h-6 bg-foreground/10 rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-foreground/30 rounded-full" />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-8">
          <GlassCard>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-yellow-500" /> Notifications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                <span className="text-sm font-medium">New Order Emails</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                <span className="text-sm font-medium">Provider Status Alerts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span className="text-sm font-medium">Weekly Revenue Report</span>
              </label>
            </div>
          </GlassCard>

          <button className="w-full py-4 rounded-xl bg-primary text-black font-black uppercase hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> Save All Settings
          </button>
        </div>
      </div>
    </>
  );
}
