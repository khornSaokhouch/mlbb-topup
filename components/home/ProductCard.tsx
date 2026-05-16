'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { useTranslation } from '@/components/providers/LanguageProvider';
import { Package } from 'lucide-react';

interface ProductCardProps {
  diamonds: number;
  bonus?: number;
  price: number;
  onSelect?: () => void;
  className?: string;
}

const ProductCard = ({ diamonds, bonus, price, onSelect, className = '' }: ProductCardProps) => {
  return (
    <GlassCard 
      onClick={onSelect}
      className={`flex flex-col items-center text-center !p-4 cursor-pointer hover:neon-border transition-all active:scale-95 ${className}`}
    >
      <div className="w-16 h-16 mb-4 flex items-center justify-center bg-primary/10 rounded-full">
        <Package className="w-8 h-8 text-primary" />
      </div>
      
      <div className="mb-4">
        <h4 className="text-xl font-bold flex items-center justify-center gap-2">
          {diamonds} <span className="text-xs text-primary">Diamonds</span>
        </h4>
        {bonus && (
          <p className="text-xs text-secondary font-bold">+{bonus} Bonus</p>
        )}
      </div>

      <div className="mt-auto w-full">
        <div className="text-lg font-black mb-3 text-foreground">${price.toFixed(2)}</div>
        <div 
          className="w-full py-2 rounded-lg bg-foreground/5 border border-foreground/10 text-xs font-bold hover:bg-primary hover:text-black transition-all"
        >
          Select
        </div>
      </div>
    </GlassCard>
  );
};

export default ProductCard;
