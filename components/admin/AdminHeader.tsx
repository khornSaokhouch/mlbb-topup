'use client';

import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';

const AdminHeader = () => {
  const { data: session } = useSession();

  return (
    <header className="h-20 glass border-b border-foreground/10 fixed top-0 right-0 left-0 md:left-64 z-40 transition-all flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-grow max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Quick search..." 
            className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 rounded-xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-all text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_#00e5ff]" />
        </button>

        <div className="h-10 w-px bg-foreground/10 hidden sm:block" />

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold truncate max-w-[150px]">{session?.user?.name || 'Admin'}</div>
            <div className="text-[10px] text-primary uppercase font-black tracking-widest">Administrator</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center text-primary font-bold shadow-sm">
            {session?.user?.name?.[0] || <User className="w-5 h-5" />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
