"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Box, ClipboardList, BookOpen, LogOut } from 'lucide-react';

const nav = [
  { name: 'Dashboard',               icon: LayoutDashboard, href: '/mfg-dashboard' },
  { name: 'Products',                icon: Box,             href: '/mfg-dashboard/products' },
  { name: 'All Orders',              icon: ClipboardList,   href: '/mfg-dashboard/orders' },
  { name: 'Bill of Materials',       icon: BookOpen,        href: '/mfg-dashboard/bom' },
];

export default function MfgSidebar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-64 bg-slate-900/60 dark:bg-slate-950/65 border-r border-slate-200 dark:border-slate-800/80 h-full text-slate-700 dark:text-slate-300 backdrop-blur-md">
      <div className="flex flex-col items-center justify-center h-20 border-b border-slate-200 dark:border-slate-850 px-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-wider">
          Smart<span className="text-violet-500">ERP</span>
        </h1>
        <span className="text-xs text-violet-600 dark:text-violet-400 mt-0.5 font-medium">Manufacturing Portal</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all group ${active ? 'bg-violet-500/20 text-violet-600 dark:text-violet-300' : 'hover:bg-slate-200/50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white'}`}>
                <item.icon className={`mr-3 h-5 w-5 ${active ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400 group-hover:text-violet-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-200 dark:border-slate-850">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm">MM</div>
          <div className="ml-3">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Manufacturing Manager</p>
            <p className="text-xs text-slate-500">mfg@smarterp.com</p>
          </div>
        </div>
        <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); window.location.href = '/'; }}
          className="w-full text-left text-xs font-semibold text-rose-500 hover:text-rose-400 flex items-center gap-1">
          <LogOut className="h-3 w-3" /> Sign Out
        </button>
      </div>
    </div>
  );
}
