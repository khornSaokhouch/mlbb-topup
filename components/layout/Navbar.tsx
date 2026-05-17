'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { useTheme } from 'next-themes';
import { useSession, signOut } from 'next-auth/react';
import { Sun, Moon, Globe, Menu, X, User, Wallet, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { t, lang, setLang } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'km' : 'en');
  };

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('topup'), href: '/top-up/mlbb' },
    { name: t('tracking'), href: '/tracking' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/60 backdrop-blur-xl border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <img 
                src="/logo/logo.png" 
                alt="Mochi Topup Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border border-primary/20 shadow-[0_0_15px_rgba(0,229,255,0.3)] group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-xs sm:text-sm font-black tracking-tighter bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent uppercase">
                Mochi <span className="text-foreground">Topup</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {session && (
              <Link 
                href="/wallet"
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 hover:border-primary/50 transition-all group shadow-inner"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Wallet className="w-4 h-4 text-primary group-hover:text-black transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Balance</span>
                  <span className="text-sm font-black text-foreground tabular-nums leading-none">
                    ${(session.user as any).walletBalance?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform ml-1">
                  <span className="text-primary font-black text-xs">+</span>
                </div>
              </Link>
            )}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-foreground/5 transition-all border border-border group"
              title={lang === 'en' ? 'English' : 'ខ្មែរ'}
            >
              <img 
                src={`/lang/${lang}.png`} 
                alt={lang} 
                className="w-6 h-6 rounded-full object-cover shadow-sm group-hover:scale-110 transition-transform"
              />
              <span className="text-xs font-bold uppercase">{lang}</span>
            </button>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
            >
              {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            </button>
            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="flex items-center gap-2 group">
                  <div className="hidden lg:flex flex-col items-end mr-1">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Welcome</span>
                    <span className="text-sm font-bold text-foreground leading-none">{session.user?.name?.split(' ')[0]}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-primary/20 p-0.5 overflow-hidden group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                    <img src={session.user?.image || '/logo/logo.png'} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  </div>
                </Link>
              </div>
            ) : (
              <Link 
                href="/login"
                className="px-6 py-2 rounded-full bg-primary text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all font-black uppercase tracking-widest text-[10px]"
              >
                {t('login')}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
             <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-foreground/5"
            >
              {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/20 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {session && (
                <div className="px-3 py-4 border-t border-border mt-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Total Balance</span>
                      <span className="text-xl font-black text-primary tabular-nums">
                        ${(session.user as any).walletBalance?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                    <Link 
                      href="/wallet" 
                      onClick={() => setIsOpen(false)}
                      className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                    >
                      <Plus className="w-5 h-5 text-black" />
                    </Link>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between px-3 py-4 border-t border-border">
                <button onClick={toggleLang} className="flex items-center space-x-3 text-sm font-medium p-2 rounded-xl bg-foreground/5 border border-border">
                  <img 
                    src={`/lang/${lang}.png`} 
                    alt="flag" 
                    className="w-6 h-6 rounded-full object-cover shadow-sm"
                  />
                  <span className="uppercase">{lang}</span>
                </button>
                {session ? (
                  <button 
                    onClick={() => { signOut(); setIsOpen(false); }}
                    className="text-red-500 font-black uppercase tracking-widest text-[10px]"
                  >
                    Logout
                  </button>
                ) : (
                  <Link href="/login" className="text-primary font-black uppercase tracking-widest text-[10px]" onClick={() => setIsOpen(false)}>
                    {t('login')}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
