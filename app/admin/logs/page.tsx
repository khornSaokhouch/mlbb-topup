'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { FileText, Search, Filter, Terminal, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function AdminLogs() {
  const logs = [
    { type: 'order', message: 'Order #ORD-9981 completed', user: 'System', time: '2 mins ago', status: 'success' },
    { type: 'auth', message: 'New admin login from 192.168.1.1', user: 'Admin', time: '15 mins ago', status: 'info' },
    { type: 'api', message: 'API connection timeout (provider A)', user: 'System', time: '1 hour ago', status: 'error' },
    { type: 'user', message: 'User Hean updated profile', user: 'Hean', time: '3 hours ago', status: 'success' },
    { type: 'payment', message: 'ABA Payment received ($18.00)', user: 'System', time: '5 hours ago', status: 'success' },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">System Logs</h1>
          <p className="text-muted-foreground">Audit and monitor all system activities and transactions.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all">
            Clear All Logs
          </button>
        </div>
      </div>

      <GlassCard className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search logs by keyword..." 
            className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </GlassCard>

      <GlassCard>
        <div className="space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-6 p-4 rounded-xl hover:bg-foreground/5 transition-all text-sm group">
              <div className="flex items-center gap-4 w-40 flex-shrink-0">
                <div className={`p-2 rounded-lg ${
                  log.status === 'success' ? 'bg-green-500/10 text-green-500' :
                  log.status === 'error' ? 'bg-red-500/10 text-red-500' :
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  {log.status === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                   log.status === 'error' ? <AlertCircle className="w-4 h-4" /> :
                   <Clock className="w-4 h-4" />}
                </div>
                <div className="font-bold flex items-center gap-2">
                  <Terminal className="w-3 h-3 opacity-50" />
                  <span className="uppercase tracking-tighter text-[10px]">{log.type}</span>
                </div>
              </div>
              <div className="flex-grow text-muted-foreground group-hover:text-foreground transition-colors truncate">
                {log.message}
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-xs font-medium text-foreground">{log.user}</div>
                <div className="text-xs text-muted-foreground w-20 text-right">{log.time}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );
}
