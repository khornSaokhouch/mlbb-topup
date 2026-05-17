'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import SpinGame from '@/components/ui/SpinGame';
const FloatingContact = () => {
  const [showGame, setShowGame] = React.useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-4">
        {/* Spin Game Button */}
        <motion.button 
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          onClick={() => setShowGame(true)}
          className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all active:scale-95"
        >
          <img src="/logo/logo.png" className="w-8 h-8 rounded-full animate-spin-slow" alt="Spin" />
          
          <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-card/80 backdrop-blur-md border border-border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl">
              Lucky Spin Game
            </div>
          </div>

          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white text-[10px] font-black text-white animate-bounce">
            HOT
          </div>
        </motion.button>

        {/* Telegram Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <a 
            href="https://t.me/Khouch04" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-14 h-14 bg-[#0088cc] rounded-full shadow-[0_0_20px_rgba(0,136,204,0.4)] hover:shadow-[0_0_30px_rgba(0,136,204,0.6)] transition-all active:scale-95"
          >
            <Send className="w-7 h-7 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            
            <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-card/80 backdrop-blur-md border border-border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl">
                Contact on Telegram
              </div>
            </div>

            <div className="absolute inset-0 rounded-full bg-[#0088cc] animate-ping opacity-20 pointer-events-none" />
          </a>
        </motion.div>
      </div>

      <SpinGame isOpen={showGame} onClose={() => setShowGame(false)} />
    </>
  );
};

export default FloatingContact;
