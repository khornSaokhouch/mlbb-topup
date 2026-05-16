'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

const FloatingContact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-[60]"
    >
      <a 
        href="https://t.me/Khouch04" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#0088cc] rounded-full shadow-[0_0_20px_rgba(0,136,204,0.4)] hover:shadow-[0_0_30px_rgba(0,136,204,0.6)] transition-all active:scale-95"
      >
        <Send className="w-7 h-7 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-card/80 backdrop-blur-md border border-border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl">
            Contact on Telegram
          </div>
        </div>

        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full bg-[#0088cc] animate-ping opacity-20 pointer-events-none" />
      </a>
    </motion.div>
  );
};

export default FloatingContact;
