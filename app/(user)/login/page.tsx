'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import { Globe, Mail, Lock, ArrowRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/providers/LanguageProvider';
import TelegramWidget from '@/components/auth/TelegramWidget';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onTelegramAuth = async (user: any) => {
    const result = await signIn('credentials', {
      redirect: false,
      auth_type: 'telegram',
      telegram_data: JSON.stringify(user),
    });

    if (result?.error) {
      alert(result.error);
    } else {
      const session = await getSession();
      if (session?.user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  };

  React.useEffect(() => {
    // @ts-ignore
    window.onTelegramAuth = onTelegramAuth;
  }, []);

  const onSubmit = async (data: any) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      alert(result.error);
    } else {
      const session = await getSession();
      if (session?.user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">{t('loginTitle')}</h1>
          <p className="text-muted-foreground">{t('loginSubtitle')}</p>
        </div>

        <GlassCard className="!p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-muted-foreground">{t('password')}</label>
                <Link href="#" className="text-xs text-primary hover:underline">{t('forgotPassword')}</Link>
              </div>
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-primary text-black font-black uppercase hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all flex items-center justify-center gap-2"
            >
              {t('logInBtn')} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-foreground/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground">{t('orContinue')}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => signIn('google', { callbackUrl: '/auth-success' })}
              className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/5 hover:border-primary/30 transition-all text-sm font-bold group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <div className="relative group overflow-hidden rounded-xl border border-foreground/10 flex items-center justify-center bg-foreground/[0.02] hover:bg-foreground/5 hover:border-primary/30 transition-all">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <Send className="w-4 h-4 text-[#0088cc] mr-2" />
                <span className="text-sm font-bold">Telegram</span>
              </div>
              <div className="opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center p-2 h-[46px] w-full z-10">
                {/* 
                  Note: The data-telegram-login should be the bot username.
                  We load the script dynamically to ensure it works with Next.js navigation.
                */}
                <TelegramWidget botName={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'MochiTopupBot'} onAuth={onTelegramAuth} />
              </div>
            </div>
          </div>
        </GlassCard>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          {t('noAccount')} <Link href="/register" className="text-primary font-bold hover:underline">{t('createOne')}</Link>
        </p>
      </div>
    </div>
  );
}
