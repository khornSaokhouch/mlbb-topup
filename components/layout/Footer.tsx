'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { Globe, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-card/40 backdrop-blur-lg border-t border-border pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block mb-4">
              <img 
                src="/logo/logo.png" 
                alt="Diamonds Topup Logo" 
                className="h-16 w-16 rounded-full object-cover border border-primary/20 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for official gaming top-ups in Cambodia. Safe, secure, and instant delivery guaranteed 24/7.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 bg-foreground/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-foreground/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-foreground/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-bold mb-6">{t('topup')}</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/top-up/mlbb" className="hover:text-primary transition-colors">Mobile Legends</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Free Fire</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">PUBG Mobile</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Valorant</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-foreground font-bold mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/tracking" className="hover:text-primary transition-colors">{t('tracking')}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t('faq')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+855 12 345 678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@mlbbtopup.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Phnom Penh, Cambodia</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-foreground/10 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DiamondTopUp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
