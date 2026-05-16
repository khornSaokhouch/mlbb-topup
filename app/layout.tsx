import type { Metadata } from "next";
import { Geist, Geist_Mono, Battambang } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


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
  title: "DiamondTopUp - Premium MLBB Diamond Top-Up",
  description: "Fast, secure, and reliable MLBB diamond top-up service in Cambodia.",
  openGraph: {
    title: "DiamondTopUp",
    description: "Fast, secure, and reliable MLBB diamond top-up service.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${battambang.variable} antialiased gradient-bg min-h-screen flex flex-col`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <LanguageProvider>
              <main className="flex-grow">
                {children}
              </main>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
