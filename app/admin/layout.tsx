"use client";

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart4, 
  Calendar, 
  ChevronDown,
  Code2, 
  FileText, 
  Landmark, 
  Layers, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  Settings, 
  Trophy, 
  Users
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Events',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    title: 'Resources',
    href: '/admin/resources',
    icon: FileText,
  },
  {
    title: 'Hall of Fame',
    href: '/admin/hall-of-fame',
    icon: Trophy,
  },
  {
    title: 'Team',
    href: '/admin/team',
    icon: Users,
  },
  {
    title: 'Blogs',
    href: '/admin/blogs',
    icon: Layers,
  },
  {
    title: 'Leaderboard',
    href: '/admin/leaderboard',
    icon: BarChart4,
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-card/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex gap-6 md:gap-10">
            <Link href="/admin" className="hidden md:flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-montserrat font-bold inline-block">TechBytes Admin</span>
            </Link>
            
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0 sm:max-w-xs">
                <Link href="/admin" className="flex items-center gap-2 mb-8">
                  <Code2 className="h-6 w-6 text-primary" />
                  <span className="font-montserrat font-bold">TechBytes Admin</span>
                </Link>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8">
                  <div className="flex flex-col gap-2 pl-1 pr-4">
                    {adminNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href && "bg-accent text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@techbytes.org</span>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-border/40 bg-card/40 md:block">
          <ScrollArea className="py-8 h-[calc(100vh-4rem)]">
            <div className="space-y-1 px-4">
              {adminNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === item.href && "bg-accent text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </aside>
        
        <main className="flex flex-1 flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}