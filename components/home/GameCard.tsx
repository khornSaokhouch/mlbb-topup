'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface GameCardProps {
  id: string;
  name: string;
  image: string;
  slug: string;
  className?: string;
  isHot?: boolean;
}

const GameCard = ({ id, name, image, slug, className = '', isHot = true }: GameCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <Link href={`/top-up/${slug}`} className="block group">
        <div className="relative rounded-2xl p-[1px] overflow-hidden bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 transition-all duration-500 group-hover:from-primary group-hover:to-secondary">
          <div className="relative w-full bg-card/50 backdrop-blur-md rounded-[calc(1rem-1px)] overflow-hidden flex flex-col border border-border">
            
            {/* Image Section */}
            <div className="relative w-full aspect-[4/5] overflow-hidden shrink-0">
              <Image 
                src={image} 
                alt={name} 
                fill 
                priority
                sizes="(max-width: 768px) 50vw, 240px"
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
              
              {/* Hot Badge */}
              {isHot && (
                <div className="absolute top-2 right-2 z-20">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded-full border border-orange-500/30">
                    <Flame className="w-2.5 h-2.5 text-orange-500 fill-orange-500" />
                    <span className="text-[7px] font-bold uppercase tracking-tighter text-orange-500">Hot</span>
                  </div>
                </div>
              )}

              {/* Content bottom of image */}
              <div className="absolute bottom-3 left-0 right-0 px-2 text-center">
                <h4 className="text-sm font-black text-foreground uppercase tracking-tight leading-tight line-clamp-2 drop-shadow-md">
                  {name}
                </h4>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="p-2 mt-auto">
              <div 
                className="w-full py-1.5 rounded-md bg-foreground/5 border border-border text-foreground text-[9px] font-bold uppercase tracking-widest text-center group-hover:bg-primary group-hover:text-black transition-all duration-300"
              >
                Top Up
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GameCard;
