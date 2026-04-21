"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2 } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Hábitos', icon: Home },
    { href: '/stats', label: 'Estatísticas', icon: BarChart2 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-5xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-bold text-xs">G3</span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">Habit Tracker</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="hidden xs:block">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
