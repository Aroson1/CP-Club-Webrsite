import './globals.css';
import type { Metadata } from 'next';
import { montserrat, ibmPlexMono } from './fonts';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'TechBytes - University Coding Club',
  description: 'Join our coding club to learn, build, and grow with fellow tech enthusiasts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${ibmPlexMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}