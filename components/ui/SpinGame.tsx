'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SpinGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpinGame: React.FC<SpinGameProps> = ({ isOpen, onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  const rewards = [
    { label: '$0.10', color: '#FFD700', value: 0.1, weight: 2 },
    { label: '$0.50', color: '#C0C0C0', value: 0.5, weight: 2 },
    { label: '$1.00', color: '#CD7F32', value: 1.0, weight: 2 },
    { label: 'Try Again', color: '#333333', value: 0, weight: 40 },
    { label: '$0.05', color: '#4facfe', value: 0.05, weight: 2 },
    { label: '$5.00', color: '#f093fb', value: 5.0, weight: 10 },
    { label: 'Next Time', color: '#555555', value: 0, weight: 40 },
    { label: '$0.20', color: '#00e5ff', value: 0.2, weight: 2 },
  ];

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Calculate winning index based on weights
    const totalWeight = rewards.reduce((acc, curr) => acc + curr.weight, 0);
    let randomWeight = Math.random() * totalWeight;
    let winningIndex = 0;
    
    for (let i = 0; i < rewards.length; i++) {
      if (randomWeight < rewards[i].weight) {
        winningIndex = i;
        break;
      }
      randomWeight -= rewards[i].weight;
    }

    // Calculate rotation to land on the winning index
    const segmentAngle = 360 / rewards.length;
    const targetAngle = 360 - (winningIndex * segmentAngle + segmentAngle / 2);
    const extraRotations = 5 + Math.floor(Math.random() * 5);
    const spinDegrees = extraRotations * 360 + targetAngle;
    const duration = 5000;
    
    if (wheelRef.current) {
      wheelRef.current.style.transition = `transform ${duration}ms cubic-bezier(0.1, 0.7, 0.1, 1)`;
      wheelRef.current.style.transform = `rotate(${spinDegrees}deg)`;
    }
    
    setTimeout(() => {
      setIsSpinning(false);
      setResult(rewards[winningIndex].label);
      
      if (rewards[winningIndex].value > 0) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00e5ff', '#FFD700', '#f093fb']
        });
      }
    }, duration);
  };

  const reset = () => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = 'rotate(0deg)';
    }
    setResult(null);
  };

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-card border border-primary/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,229,255,0.2)] overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                Lucky <span className="text-primary">Spin</span>
              </h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Try your luck and win diamonds!</p>
            </div>
            
            <div className="relative flex justify-center mb-10">
              {/* Pointer */}
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-10">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-primary">
                  <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-primary mt-2" />
                </div>
              </div>
              
              {/* The Wheel */}
              <div className="relative w-64 h-64 rounded-full border-8 border-white/5 shadow-2xl overflow-hidden p-1 bg-white/5">
                <div 
                  ref={wheelRef}
                  className="w-full h-full rounded-full relative overflow-hidden transition-transform"
                  style={{ transform: 'rotate(0deg)' }}
                >
                  {rewards.map((reward, i) => (
                    <div 
                      key={i}
                      className="absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left"
                      style={{ 
                        transform: `rotate(${i * (360 / rewards.length)}deg) skewY(-${90 - 360 / rewards.length}deg)`,
                        backgroundColor: reward.color,
                        opacity: 0.8
                      }}
                    />
                  ))}
                  {rewards.map((reward, i) => (
                    <div 
                      key={`text-${i}`}
                      className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 origin-bottom text-[11px] font-black uppercase text-white drop-shadow-md flex items-start justify-center pt-6"
                      style={{ 
                        transform: `rotate(${i * (360 / rewards.length) + (360 / rewards.length) / 2}deg)`,
                        width: '40px'
                      }}
                    >
                      <span className="leading-tight">
                        {reward.label}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Center cap */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-4 border-primary z-20 flex items-center justify-center">
                  <Star className="w-3 h-3 text-primary fill-primary" />
                </div>
              </div>
            </div>
            
            <div className="text-center">
              {result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/30"
                >
                  <p className="text-xs uppercase tracking-widest font-black text-white mb-1">You won</p>
                  <p className="text-4xl font-black text-primary drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">{result}</p>
                </motion.div>
              ) : (
                <div className="h-[92px] mb-6 flex items-center justify-center text-xs font-bold uppercase tracking-widest opacity-30">
                  Spin the wheel to win!
                </div>
              )}
              
              <button
                onClick={spin}
                disabled={isSpinning}
                className="group relative w-full py-4 rounded-2xl bg-primary text-black font-black uppercase tracking-widest text-sm overflow-hidden transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Gift className="w-5 h-5" /> {isSpinning ? 'SPINNING...' : 'SPIN FOR $1.00'}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>
              
              <p className="text-[10px] text-muted-foreground mt-4 uppercase font-bold tracking-tighter">
                * Each spin costs $1.00 from your wallet balance.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SpinGame;
