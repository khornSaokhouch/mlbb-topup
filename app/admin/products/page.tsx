'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Package, Plus, Search, Edit3, Trash2, Eye } from 'lucide-react';

export default function AdminProducts() {
  const products = [
    { name: '86 Diamonds', diamonds: 86, bonus: 9, price: '$1.50', status: 'Active', category: 'MLBB' },
    { name: '172 Diamonds', diamonds: 172, bonus: 18, price: '$3.00', status: 'Active', category: 'MLBB' },
    { name: '344 Diamonds', diamonds: 344, bonus: 37, price: '$6.00', status: 'Active', category: 'MLBB' },
    { name: '706 Diamonds', diamonds: 706, bonus: 84, price: '$12.00', status: 'Out of Stock', category: 'MLBB' },
    { name: '1050 Diamonds', diamonds: 1050, bonus: 134, price: '$18.00', status: 'Active', category: 'MLBB' },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Product Catalog</h1>
          <p className="text-muted-foreground">Manage diamond packages and pricing tiers.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-grow md:flex-none px-6 py-3 rounded-xl bg-primary text-black font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/20 transition-all">
            <Plus className="w-5 h-5" /> Add New Package
          </button>
        </div>
      </div>

      <GlassCard className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <GlassCard key={i} className="group hover:neon-border transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-foreground/5 rounded-lg text-muted-foreground hover:text-foreground transition-all">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-red-500/10 rounded-lg text-muted-foreground hover:text-red-500 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-bold truncate">{product.name}</h3>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">{product.category}</div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-black text-primary">{product.price}</div>
                <div className="text-xs text-muted-foreground">{product.diamonds} + {product.bonus} Bonus</div>
              </div>
              <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase border ${
                product.status === 'Active' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5'
              }`}>
                {product.status}
              </span>
            </div>
          </GlassCard>
        ))}
        
        <button className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-foreground/10 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all min-h-[220px]">
          <Plus className="w-10 h-10 mb-4 opacity-50 transition-all" />
          <span className="font-bold uppercase tracking-widest text-xs">Add New Package</span>
        </button>
      </div>
    </>
  );
}
