'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { Package, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  amount: number;
  bonus?: number;
  price: number;
  currencyName?: string;
  image?: string;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}

const ProductCard = ({ amount, bonus, price, currencyName = 'Diamonds', image, selected, onSelect, className = '' }: ProductCardProps) => {
  return (
    <GlassCard 
      onClick={onSelect}
      className={`relative flex flex-col items-center text-center !p-4 cursor-pointer hover:neon-border transition-all active:scale-95 ${className}`}
    >
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-2 right-2 z-10"
          >
            <div className="bg-primary rounded-full p-0.5 shadow-[0_0_10px_rgba(0,229,255,0.5)]">
              <CheckCircle2 className="w-4 h-4 text-black" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`w-16 h-16 mb-4 flex items-center justify-center rounded-xl overflow-hidden ${!image ? 'bg-primary/10' : ''}`}>
        {image ? (
          <img src={image} alt={currencyName} className="w-12 h-12 object-contain drop-shadow-lg" />
        ) : (
          <Package className="w-8 h-8 text-primary" />
        )}
      </div>
      
      <div className="mb-4">
        <h4 className="text-xl font-bold flex items-center justify-center gap-2">
          {amount} <span className="text-xs text-primary">{currencyName}</span>
        </h4>
        {bonus ? (
          <p className="text-xs text-secondary font-bold">+{bonus} Bonus</p>
        ) : (
          <p className="text-xs opacity-0">Hidden</p>
        )}
      </div>

      <div className="mt-auto w-full">
        <div className="text-lg font-black mb-3 text-foreground">${price.toFixed(2)}</div>
        <div 
          className="w-full py-2 rounded-lg bg-foreground/5 border border-border text-xs font-bold hover:bg-primary hover:text-black transition-all"
        >
          Select
        </div>
      </div>
    </GlassCard>
  );
};

export default ProductCard;
