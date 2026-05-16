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
    heroSubtitle: 'Instant delivery, official partners, and 24/7 support. Join thousands of gamers who trust us for their diamond needs.',
    featured: 'Featured Packages',
    faq: 'Frequently Asked Questions',
    userId: 'User ID',
    zoneId: 'Zone ID',
    check: 'Check Player',
    buyNow: 'Buy Now',
    loginTitle: 'Welcome Back',
    loginSubtitle: 'Log in to your account to manage your top-ups.',
    emailAddress: 'Email Address',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    logInBtn: 'Log In',
    orContinue: 'Or continue with',
    noAccount: "Don't have an account?",
    createOne: 'Create one',
    registerTitle: 'Create Account',
    registerSubtitle: 'Join thousands of gamers getting instant top-ups.',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    signUpBtn: 'Sign Up',
    alreadyHaveAccount: 'Already have an account?',
    welcomeBackAccount: 'Welcome back',
    totalOrders: 'Total Orders',
    walletBalance: 'Wallet Balance',
    savedGameIds: 'Saved Game IDs',
    recentOrders: 'Recent Orders',
    status: 'Status',
    date: 'Date',
    amount: 'Amount',
    viewAll: 'View All',
    securitySettings: 'Security & Settings',
    updateProfile: 'Update Profile',
    changePassword: 'Change Password',
    adminOverview: 'Admin Overview',
    revenue: 'Total Revenue',
    newOrders: 'New Orders',
    users: 'Total Users',
    providerStatus: 'Provider Status',
    liveOrders: 'Live Orders',
    // New Friendly Keys
    popularGames: 'Select Your Game',
    popularGamesDesc: 'Choose your favorite game below to get started with your top-up.',
    step1Verify: 'Step 1: Verify Account',
    step1Desc: 'Enter your ID digits to identify your profile.',
    step2Package: 'Step 2: Choose Package',
    step3Payment: 'Step 3: Select Payment',
    verifyBtn: 'Verify Account',
    verifiedBtn: 'Account Verified',
    paymentSecure: 'Your payment is secure and encrypted.',
    instantDelivery: 'Items will be delivered instantly after payment.',
    totalPayable: 'Total Payable',
    confirmOrder: 'Confirm Order',
    back: 'Back to Home',
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
    loginTitle: 'សូមស្វាគមន៍ត្រឡប់មកវិញ',
    loginSubtitle: 'ចូលទៅគណនីរបស់អ្នកដើម្បីគ្រប់គ្រងការបញ្ចូលទឹកប្រាក់។',
    emailAddress: 'អាសយដ្ឋានអ៊ីមែល',
    password: 'លេខសម្ងាត់',
    forgotPassword: 'ភ្លេចលេខសម្ងាត់?',
    logInBtn: 'ចូល',
    orContinue: 'ឬបន្តជាមួយ',
    noAccount: 'មិនទាន់មានគណនីមែនទេ?',
    createOne: 'បង្កើតមួយ',
    registerTitle: 'បង្កើតគណនី',
    registerSubtitle: 'ចូលរួមជាមួយអ្នកលេងរាប់ពាន់នាក់ដើម្បីទទួលបានការបញ្ចូលទឹកប្រាក់ភ្លាមៗ។',
    fullName: 'ឈ្មោះ​ពេញ',
    confirmPassword: 'បញ្ជាក់លេខសម្ងាត់',
    signUpBtn: 'ចុះឈ្មោះ',
    alreadyHaveAccount: 'មានគណនីរួចហើយមែនទេ?',
    welcomeBackAccount: 'សូមស្វាគមន៍ត្រឡប់មកវិញ',
    totalOrders: 'ការបញ្ជាទិញសរុប',
    walletBalance: 'សមតុល្យកាបូប',
    savedGameIds: 'លេខសម្គាល់ហ្គេមដែលបានរក្សាទុក',
    recentOrders: 'ការបញ្ជាទិញថ្មីៗ',
    status: 'ស្ថានភាព',
    date: 'កាលបរិច្ឆេទ',
    amount: 'ចំនួនទឹកប្រាក់',
    viewAll: 'មើលទាំងអស់',
    securitySettings: 'សន្តិសុខ និងការកំណត់',
    updateProfile: 'ធ្វើបច្ចុប្បន្នភាពប្រវត្តិរូប',
    changePassword: 'ប្តូរលេខសម្ងាត់',
    adminOverview: 'ទិដ្ឋភាពទូទៅនៃអ្នកគ្រប់គ្រង',
    revenue: 'ចំណូលសរុប',
    newOrders: 'ការបញ្ជាទិញថ្មី',
    users: 'អ្នកប្រើប្រាស់សរុប',
    providerStatus: 'ស្ថានភាពអ្នកផ្គត់ផ្គង់',
    liveOrders: 'ការបញ្ជាទិញបច្ចុប្បន្ន',
    // New Friendly Keys (Khmer)
    popularGames: 'សូមជ្រើសរើសហ្គេមរបស់អ្នក',
    popularGamesDesc: 'ជ្រើសរើសហ្គេមដែលអ្នកចូលចិត្តដើម្បីចាប់ផ្តើមការបញ្ចូលទឹកប្រាក់។',
    step1Verify: 'ជំហានទី ១: ផ្ទៀងផ្ទាត់គណនី',
    step1Desc: 'សូមបញ្ចូលលេខសម្គាល់របស់អ្នកដើម្បីស្វែងរកគណនី។',
    step2Package: 'ជំហានទី ២: ជ្រើសរើសកញ្ចប់',
    step3Payment: 'ជំហានទី ៣: ជ្រើសរើសវិធីបង់ប្រាក់',
    verifyBtn: 'ផ្ទៀងផ្ទាត់គណនី',
    verifiedBtn: 'គណនីត្រូវបានផ្ទៀងផ្ទាត់',
    paymentSecure: 'ការបង់ប្រាក់របស់អ្នកមានសុវត្ថិភាព និងត្រូវបានការពារ។',
    instantDelivery: 'ទំនិញនឹងត្រូវបានផ្តល់ជូនភ្លាមៗបន្ទាប់ពីការបង់ប្រាក់។',
    totalPayable: 'ទឹកប្រាក់សរុបត្រូវបង់',
    confirmOrder: 'បញ្ជាក់ការបញ្ជាទិញ',
    back: 'ត្រឡប់ទៅទំព័រដើម',
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
