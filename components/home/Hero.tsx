'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { Zap, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-12 pb-10 lg:pt-20 lg:pb-16 overflow-hidden">
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
            <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20 neon-border">
              Global Gaming Top-Up Platform
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="max-w-xl mx-auto text-base text-muted-foreground mb-8">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#games"
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
