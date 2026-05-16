'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Clock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-primary fill-primary/20" />,
      title: "Instant Delivery",
      description: "Diamonds sent in seconds",
      color: "from-primary/20",
      activeColor: "group-hover:text-primary"
    },
    {
      icon: <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-secondary fill-secondary/20" />,
      title: "Secure Payment",
      description: "Encrypted & verified",
      color: "from-secondary/20",
      activeColor: "group-hover:text-secondary"
    },
    {
      icon: <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-accent fill-accent/20" />,
      title: "24/7 Support",
      description: "Available anytime",
      color: "from-accent/20",
      activeColor: "group-hover:text-accent"
    }
  ];

  // Double for seamless loop
  const loopFeatures = [...features, ...features, ...features, ...features];

  return (
    <section className="relative w-full py-16 overflow-hidden">
      <div className="flex select-none">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-6 sm:gap-10 whitespace-nowrap"
        >
          {loopFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[240px] sm:w-[320px] p-8 rounded-3xl bg-card/40 border border-border relative group overflow-hidden flex flex-col items-center text-center backdrop-blur-xl shadow-sm"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} to-transparent opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              
              <div className="relative mb-5">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  {feature.icon}
                </div>
              </div>

              <div className="relative">
                <h3 className={`font-bold text-lg sm:text-xl text-foreground mb-2 ${feature.activeColor} transition-colors`}>
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-normal max-w-[240px]">
                  {feature.description}
                </p>
              </div>

              {/* Polish line */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Features;
