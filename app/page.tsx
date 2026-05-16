'use client';

import Hero from '@/components/home/Hero';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import GameCard from '@/components/home/GameCard';
import Features from '@/components/home/Features';
import { useTranslation } from '@/components/providers/LanguageProvider';

export default function Home() {
  const { t } = useTranslation();
  const games = [
    { 
      id: 'mlbb', 
      name: 'Mobile Legends', 
      image: '/game/mlbb.png', 
      slug: 'mlbb' 
    },
    { 
      id: 'pubg', 
      name: 'PUBG Mobile', 
      image: '/game/pubg.png', 
      slug: 'pubg' 
    },
    { 
      id: 'freefire', 
      name: 'Free Fire', 
      image: '/game/freefire.png', 
      slug: 'freefire' 
    },
    { 
      id: 'honorofkings', 
      name: 'Honor of Kings', 
      image: '/game/hok.png', 
      slug: 'hok' 
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        
        <section id="games" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-0 scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">{t('popularGames')}</h2>
                <p className="text-muted-foreground text-sm">{t('popularGamesDesc')}</p>
              </div>
              <div className="hidden sm:block">
                <div className="h-1 w-20 bg-primary/50 relative">
                  <div className="absolute top-0 left-0 h-full w-10 bg-primary shadow-[0_0_10px_#00e5ff]" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
              {games.map((game) => (
                <GameCard key={game.id} {...game} />
              ))}
            </div>
          </motion.div>
        </section>

        <Features />
      </main>
      <Footer />
    </div>
  );
}
