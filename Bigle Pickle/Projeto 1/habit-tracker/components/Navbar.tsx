'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3 } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Hábitos', icon: Home },
  { href: '/stats', label: 'Estatísticas', icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-1 p-1.5 bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl shadow-black/20">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
