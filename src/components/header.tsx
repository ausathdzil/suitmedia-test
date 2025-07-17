'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'Work',
    href: '/work',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Ideas',
    href: '/ideas',
  },
  {
    label: 'Career',
    href: '/career',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full bg-primary p-4 text-primary-foreground transition-transform',
        isVisible ? 'translate-y-0' : '-translate-y-full',
        lastScrollY > 100 && 'bg-primary/80'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/">
          <Image
            alt="Site Logo"
            className="brightness-0 invert"
            height={48}
            src="/site-logo.png"
            width={120}
          />
        </Link>
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                className={cn(
                  'decoration-4 underline-offset-12 hover:underline',
                  pathname === item.href && 'underline'
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
