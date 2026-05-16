'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'km';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    topup: 'Top Up',
    tracking: 'Tracking',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    logout: 'Logout',
    heroTitle: 'Level Up Your Gaming Experience',
    heroSubtitle: 'Instant MLBB Diamond Top-Up. Fast, Secure, and Reliable.',
    featured: 'Featured Packages',
    faq: 'Frequently Asked Questions',
    userId: 'User ID',
    zoneId: 'Zone ID',
    check: 'Check Player',
    buyNow: 'Buy Now',
  },
  km: {
    home: 'ទំព័រដើម',
    topup: 'បញ្ចូលទឹកប្រាក់',
    tracking: 'តាមដានការបញ្ជាទិញ',
    login: 'ចូលគណនី',
    register: 'ចុះឈ្មោះ',
    dashboard: 'ផ្ទាំងគ្រប់គ្រង',
    logout: 'ចាកចេញ',
    heroTitle: 'លើកកម្ពស់បទពិសោធន៍លេងហ្គេមរបស់អ្នក',
    heroSubtitle: 'បញ្ចូលពេជ្រ MLBB ភ្លាមៗ។ រហ័ស សុវត្ថិភាព និងគួរឱ្យទុកចិត្ត។',
    featured: 'កញ្ចប់ពេញនិយម',
    faq: 'សំណួរដែលគេសួរញឹកញាប់',
    userId: 'លេខសម្គាល់អ្នកប្រើប្រាស់',
    zoneId: 'លេខសម្គាល់តំបន់ (Zone ID)',
    check: 'ពិនិត្យអ្នកលេង',
    buyNow: 'ទិញឥឡូវនេះ',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved) setLang(saved);
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: string) => {
    return (translations[lang] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      <div className={lang === 'km' ? 'font-battambang' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
};
