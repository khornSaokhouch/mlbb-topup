'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Package, Plus, Search, Edit3, Trash2, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import ProductModal from '@/components/admin/ProductModal';
import ConfirmModal from '@/components/ui/ConfirmModal';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; productId: string | null }>({
    isOpen: false,
    productId: null
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Fetch products error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product: any = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const url = selectedProduct 
        ? `/api/products?id=${selectedProduct._id}` 
        : '/api/products';
      const method = selectedProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        await fetchProducts();
        setIsModalOpen(false);
      } else {
        alert('Operation failed');
      }
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteModal.productId) return;
    try {
      const res = await fetch(`/api/products?id=${deleteModal.productId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p._id !== deleteModal.productId));
        setDeleteModal({ isOpen: false, productId: null });
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight italic">Product Catalog</h1>
          <p className="text-muted-foreground">Manage diamond packages and pricing tiers in real-time.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-8 py-4 rounded-2xl bg-primary text-black font-black uppercase text-xs tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" /> Add New Package
        </button>
      </div>

      <GlassCard className="mb-10 !p-6">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all font-medium"
          />
        </div>
      </GlassCard>

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 glass-dark rounded-[2.5rem] border border-white/5">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="font-bold text-muted-foreground animate-pulse">Syncing catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 glass-dark rounded-[2.5rem] border border-white/5 text-center">
            <Package className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-xl font-bold uppercase tracking-tight mb-2">No Products Found</h3>
            <p className="text-muted-foreground max-w-xs mx-auto">Try adjusting your search filters or add a new package.</p>
          </div>
        ) : (
          <div className="overflow-hidden glass-dark rounded-[2.5rem] border border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                  <th className="px-8 py-6">Product Information</th>
                  <th className="px-8 py-6">Tier Details</th>
                  <th className="px-8 py-6">Pricing</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/5 flex items-center justify-center group-hover:neon-border transition-all">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-black text-white group-hover:text-primary transition-colors">{product.name}</div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{product.diamonds} Diamonds</span>
                        <span className="text-[10px] text-green-500 font-bold uppercase tracking-wide">+{product.bonusDiamonds} Bonus</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-lg font-black text-white flex items-center gap-1">
                        <span className="text-xs text-primary/60">$</span>
                        {product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                        product.isActive 
                        ? 'border-green-500/20 bg-green-500/5 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.1)]' 
                        : 'border-white/10 bg-white/5 text-muted-foreground'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${product.isActive ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : 'bg-muted-foreground'}`} />
                        {product.isActive ? 'Active' : 'Draft'}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(product)}
                          className="p-3 hover:bg-primary/10 rounded-xl transition-all text-muted-foreground hover:text-primary active:scale-95"
                          title="Edit Details"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setDeleteModal({ isOpen: true, productId: product._id })}
                          className="p-3 hover:bg-red-500/10 rounded-xl transition-all text-muted-foreground hover:text-red-500 active:scale-95"
                          title="Delete Package"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        product={selectedProduct}
        loading={isSubmitting}
      />

      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        title="Delete Package?"
        message="Are you sure you want to permanently remove this diamond package? This action will affect the customer top-up flow immediately."
        confirmLabel="Confirm Delete"
        cancelLabel="Keep Package"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, productId: null })}
      />
    </>
  );
}
