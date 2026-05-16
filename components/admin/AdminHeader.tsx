'use client';

import React from 'react';
import { Bell, Search, User, Menu, Globe } from 'lucide-react';
import { useSession } from 'next-auth/react';

const AdminHeader = () => {
  const { data: session } = useSession();

  return (
    <header className="h-24 bg-background/50 backdrop-blur-2xl border-b border-foreground/5 fixed top-0 right-0 left-0 md:left-64 z-40 transition-all flex items-center justify-between px-10">
      <div className="flex items-center gap-6 flex-grow max-w-2xl">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Quick search commands..." 
            className="w-full bg-foreground/[0.03] border border-foreground/5 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:bg-foreground/[0.05] transition-all font-medium placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <button className="p-3 rounded-2xl bg-foreground/5 border border-foreground/5 hover:bg-foreground/10 transition-all text-muted-foreground hover:text-primary relative active:scale-95">
            <Globe className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-2xl bg-foreground/5 border border-foreground/5 hover:bg-foreground/10 transition-all text-muted-foreground hover:text-primary relative active:scale-95">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full shadow-[0_0_12px_#00e5ff]" />
          </button>
        </div>

        <div className="h-10 w-px bg-foreground/5 hidden sm:block" />

        <div className="flex items-center gap-4 pl-2 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-black tracking-tight group-hover:text-primary transition-colors uppercase ">{session?.user?.name || 'Main Admin'}</div>
            <div className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.2em] opacity-60">Administrator</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/50 to-secondary border border-primary/20 flex items-center justify-center text-black font-black shadow-[0_0_20px_rgba(0,229,255,0.2)] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all">
            {session?.user?.name?.[0].toUpperCase() || 'M'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
