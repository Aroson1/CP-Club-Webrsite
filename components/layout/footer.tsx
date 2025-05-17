import Link from 'next/link';
import { Code2, Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Resources', href: '/resources' },
  { name: 'Hall of Fame', href: '/hall-of-fame' },
  { name: 'Our Team', href: '/team' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Leaderboard', href: '/leaderboard' },
];

const contactInfo = [
  { label: 'Email', value: 'techbytes@university.edu' },
  { label: 'Location', value: 'CS Building, Room 2104' },
  { label: 'Meeting Times', value: 'Wednesdays 6-8 PM' },
];

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="font-montserrat font-bold text-xl">TechBytes</span>
            </div>
            <p className="text-muted-foreground mt-2 max-w-md">
              Building the next generation of developers through collaboration, 
              innovation, and community.
            </p>
          </div>

          <div>
            <h3 className="font-montserrat font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label} className="text-muted-foreground">
                  <span className="font-medium text-foreground">{item.label}:</span> {item.value}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="font-montserrat font-medium text-lg mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span className="sr-only">{link.name}</span>
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-muted/50" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TechBytes Coding Club. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}