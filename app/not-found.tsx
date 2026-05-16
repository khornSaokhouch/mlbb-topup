'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Ghost } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 relative overflow-hidden pt-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] animate-pulse" />
        
        <div className="text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-foreground/5 border border-foreground/10 mb-8 relative group">
              <Ghost className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h1 className="text-8xl md:text-9xl font-black mb-4 tracking-tighter bg-gradient-to-b from-foreground to-foreground/30 bg-clip-text text-transparent">
              404
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground uppercase tracking-widest">
              Lost in the <span className="text-primary">Jungle?</span>
            </h2>
            
            <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg">
              The page you are looking for might have been moved, deleted, or simply vanished into the void.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-black font-black uppercase flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all active:scale-95"
              >
                <Home className="w-5 h-5" /> Return Home
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass border border-foreground/10 text-foreground font-black uppercase flex items-center justify-center gap-3 hover:bg-foreground/5 transition-all active:scale-95"
              >
                <ArrowLeft className="w-5 h-5" /> Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
