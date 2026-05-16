'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Users, Package, Settings, LogOut, FileText, Database, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { useSession, signOut } from 'next-auth/react';

const AdminSidebar = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { data: session } = useSession();

  const menuItems = [
    { name: 'Statistics', icon: LayoutDashboard, href: '/admin' },
    { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { name: 'Products', icon: Package, href: '/admin/products' },
    { name: 'Users', icon: Users, href: '/admin/users' },
    { name: 'Wallet', icon: Wallet, href: '/admin/wallet' },
    { name: 'API Settings', icon: Database, href: '/admin/api' },
    { name: 'Logs', icon: FileText, href: '/admin/logs' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-background/80 backdrop-blur-3xl border-r border-foreground/5 hidden md:flex flex-col h-screen fixed left-0 top-0 z-[60] shadow-[10px_0_40px_rgba(0,0,0,0.4)] no-scrollbar">
      <div className="p-10 border-b border-foreground/5 flex items-center justify-center">
        <h2 className="text-2xl font-black bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent neon-text tracking-tighter">
          MOCHI<span className="text-foreground/90">ADMIN</span>
        </h2>
      </div>

      <div className="flex-grow py-8 px-4 space-y-2 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all relative group ${
                isActive 
                ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'group-hover:text-primary transition-colors'}`} />
              {item.name}
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-black rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </div>
      
      <div className="p-6 border-t border-foreground/10">
        <div className="mb-6 p-4 rounded-xl bg-foreground/5 border border-foreground/10 group hover:neon-border transition-all">
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-bold">Logged in as</div>
          <div className="text-sm font-black truncate text-primary">{session?.user?.name || 'Admin'}</div>
        </div>
        <button 
          onClick={() => signOut()}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-red-500 bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)] active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          {t('logout')}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
