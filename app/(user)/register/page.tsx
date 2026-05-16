'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import GlassCard from '@/components/ui/GlassCard';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/providers/LanguageProvider';

const registerSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    // Mimic registration API call
    console.log('Registering:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Account created! Please log in.');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">{t('registerTitle')}</h1>
          <p className="text-muted-foreground">{t('registerSubtitle')}</p>
        </div>

        <GlassCard className="!p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  {...register('name')}
                  placeholder={t('fullName')}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all"
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">{t('emailAddress')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all"
                />
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">{t('confirmPassword')}</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  {...register('confirmPassword')}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all"
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message as string}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-primary text-black font-black uppercase hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all flex items-center justify-center gap-2"
            >
              {t('signUpBtn')} <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </GlassCard>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          {t('alreadyHaveAccount')} <Link href="/login" className="text-primary font-bold hover:underline">{t('login')}</Link>
        </p>
      </div>
    </div>
  );
}
