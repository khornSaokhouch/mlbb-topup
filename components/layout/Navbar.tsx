'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { useTheme } from 'next-themes';
import { Sun, Moon, Globe, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { t, lang, setLang } = useTranslation();
  const { theme, setTheme } = useTheme();
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
            <Link href="/" className="flex items-center">
              <img 
                src="/logo/logo.png" 
                alt="Diamonds Topup Logo" 
                className="h-12 w-12 rounded-full object-cover border border-primary/20 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
              />
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
            <Link 
              href="/login"
              className="px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all font-semibold text-sm"
            >
              {t('login')}
            </Link>
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
              <div className="flex items-center justify-between px-3 py-4 border-t border-border mt-2">
                <button onClick={toggleLang} className="flex items-center space-x-3 text-sm font-medium p-2 rounded-xl bg-foreground/5 border border-border">
                  <img 
                    src={`/lang/${lang === 'en' ? 'km.png' : 'en.png'}`} 
                    alt="flag" 
                    className="w-6 h-6 rounded-full object-cover shadow-sm"
                  />
                  <span>{lang === 'en' ? 'English' : 'ខ្មែរ'}</span>
                </button>
                <Link href="/login" className="text-primary font-bold" onClick={() => setIsOpen(false)}>
                  {t('login')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
