'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, DollarSign, Gem, Tag, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  product?: any;
  loading?: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSubmit, product, loading }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (product) {
      reset(product);
    } else {
      reset({
        name: '',
        diamonds: '',
        bonusDiamonds: 0,
        price: '',
        category: 'MLBB',
        isActive: true
      });
    }
  }, [product, reset, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass-dark border border-white/10 p-10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">
                    {product ? 'Edit Package' : 'New Package'}
                  </h2>
                  <p className="text-muted-foreground text-sm font-medium">Configure diamond tier and pricing details.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 hover:bg-white/5 rounded-2xl transition-colors text-muted-foreground hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Package Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                       <Package className="w-3 h-3 text-primary" /> Display Name
                    </label>
                    <input
                      {...register('name', { required: true })}
                      placeholder="e.g. 86 Diamonds + 9 Bonus"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all font-bold placeholder:text-muted-foreground/30 shadow-inner"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                       <Tag className="w-3 h-3 text-secondary" /> Category
                    </label>
                    <select
                      {...register('category')}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all font-bold shadow-inner appearance-none"
                    >
                      <option value="MLBB">Mobile Legends</option>
                      <option value="PUBG">PUBG Mobile</option>
                      <option value="FREEFIRE">Free Fire</option>
                    </select>
                  </div>

                  {/* Base Diamonds */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                       <Gem className="w-3 h-3 text-primary" /> Base Amount
                    </label>
                    <input
                      type="number"
                      {...register('diamonds', { required: true, valueAsNumber: true })}
                      placeholder="86"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all font-bold tabular-nums shadow-inner"
                    />
                  </div>

                  {/* Bonus Diamonds */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                       <Plus className="w-3 h-3 text-green-500" /> Bonus Items
                    </label>
                    <input
                      type="number"
                      {...register('bonusDiamonds', { valueAsNumber: true })}
                      placeholder="9"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all font-bold tabular-nums shadow-inner"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                       <DollarSign className="w-3 h-3 text-secondary" /> Price (USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('price', { required: true, valueAsNumber: true })}
                      placeholder="1.50"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all font-bold tabular-nums shadow-inner"
                    />
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Status</label>
                    <div className="flex items-center gap-4 h-[60px]">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          {...register('isActive')}
                          className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 transition-all"
                        />
                        <span className="text-sm font-bold group-hover:text-primary transition-colors">Active & Visible</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all active:scale-95"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-5 rounded-[1.5rem] bg-primary text-black font-black uppercase text-xs tracking-widest hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : null}
                    {product ? 'Update Package' : 'Create Package'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
