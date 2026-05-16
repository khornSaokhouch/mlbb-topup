'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { Zap, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[50%] bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20 neon-border">
              #1 MLBB Top-Up Platform
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/top-up/mlbb"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-black font-bold text-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] transition-all transform hover:scale-105"
              >
                {t('buyNow')}
              </Link>
              <Link
                href="/tracking"
                className="w-full sm:w-auto px-8 py-4 rounded-full glass border border-foreground/10 text-foreground font-bold text-lg hover:bg-foreground/5 transition-all"
              >
                {t('tracking')}
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center mb-4 border border-foreground/10">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Instant Delivery</h3>
              <p className="text-muted-foreground text-sm">Diamonds are sent to your ID within seconds.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center mb-4 border border-foreground/10">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
              <p className="text-muted-foreground text-sm">Encrypted and verified payment methods.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center mb-4 border border-foreground/10">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">Our team is always here to help you.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
