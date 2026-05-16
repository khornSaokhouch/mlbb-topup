import type { Metadata } from "next";
import { Geist, Geist_Mono, Battambang } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import FloatingContact from "@/components/ui/FloatingContact";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const battambang = Battambang({
  weight: ["400", "700"],
  subsets: ["khmer"],
  variable: "--font-battambang",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: "Mochi Topup - Premium Multi-Game Top-Up",
  description: "Fast, secure, and reliable top-up service for MLBB, PUBG Mobile, Free Fire, and Honor of Kings in Cambodia.",
  openGraph: {
    title: "Mochi Topup",
    description: "Fast, secure, and reliable gaming top-up service.",
    images: ["/logo/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${battambang.variable} antialiased gradient-bg min-h-screen flex flex-col`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
        <FloatingContact />
      </body>
    </html>
  );
}
