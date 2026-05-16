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

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

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
        router.push('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">Log in to your account to manage your top-ups.</p>
        </div>

        <GlassCard className="!p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
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
                <label className="block text-sm font-medium text-muted-foreground">Password</label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
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
              Log In <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-foreground/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => signIn('google')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-foreground/10 hover:bg-foreground/5 transition-all text-sm font-bold"
            >
              <Globe className="w-4 h-4" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-foreground/10 hover:bg-foreground/5 transition-all text-sm font-bold">
              <Send className="w-4 h-4 text-[#0088cc]" /> Telegram
            </button>
          </div>
        </GlassCard>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Don&apos;t have an account? <Link href="/register" className="text-primary font-bold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
