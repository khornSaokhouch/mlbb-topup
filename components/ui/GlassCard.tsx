'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  title?: string;
  onClick?: () => void;
}

const GlassCard = ({ children, className = '', hover = true, title, onClick }: GlassCardProps) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -5, boxShadow: '0 10px 30px -10px rgba(0, 229, 255, 0.2)' } : {}}
      className={`glass rounded-2xl p-6 relative overflow-hidden group ${className}`}
    >
      {/* Background glow effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500" />
      
      <div className="relative z-10">
        {title && <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">{title}</h3>}
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
