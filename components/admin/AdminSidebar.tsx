'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Users, Package, Settings, LogOut, FileText, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Statistics', icon: LayoutDashboard, href: '/admin' },
    { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { name: 'Products', icon: Package, href: '/admin/products' },
    { name: 'Users', icon: Users, href: '/admin/users' },
    { name: 'API Settings', icon: Database, href: '/admin/api' },
    { name: 'Logs', icon: FileText, href: '/admin/logs' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <aside className="w-64 glass border-r border-foreground/10 hidden md:flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-8 border-b border-foreground/10">
        <h2 className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent neon-text">
          ADMIN<span className="text-foreground">PANEL</span>
        </h2>
      </div>

      <div className="flex-grow py-8 px-4 space-y-2 overflow-y-auto">
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
        <div className="mb-6 p-4 rounded-xl bg-foreground/5 border border-foreground/10">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Logged in as</div>
          <div className="text-sm font-bold truncate">Admin User</div>
        </div>
        <button className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-red-500 bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all shadow-sm">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
