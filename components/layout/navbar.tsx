"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { Code2, Menu, UserCircle } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Resources', href: '/resources' },
  { name: 'Hall of Fame', href: '/hall-of-fame' },
  { name: 'Our Team', href: '/team' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Leaderboard', href: '/leaderboard' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "glassmorphic px-4 mx-4 mt-2 rounded-xl h-16 shadow-lg"
          : "bg-transparent px-4 h-20"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-8 w-8 text-primary" />
          <span className="font-montserrat font-bold text-xl">TechBytes</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md transition-colors hover:text-primary",
                pathname === link.href ? "text-primary font-medium" : "text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          
          <Link href="/signin">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <UserCircle className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[80%] sm:w-[350px] glassmorphic border border-muted/30">
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-3 py-2 text-lg rounded-md transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary font-medium" : "text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  href="/signin" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-lg rounded-md transition-colors hover:text-primary"
                >
                  Sign In
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}