// app/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LayoutDashboard, Calendar, Image, Users, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Suspense } from 'react';

function SidebarContent({ pathname }: { pathname: string }) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, tab: null },
    { name: 'Seminars', href: '/admin/dashboard?tab=seminars', icon: Calendar, tab: 'seminars' },
    { name: 'Gallery', href: '/admin/dashboard?tab=gallery', icon: Image, tab: 'gallery' },
    { name: 'Registrations', href: '/admin/dashboard?tab=registrations', icon: Users, tab: 'registrations' },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.tab === null) {
      // Dashboard active only when on /admin/dashboard and no tab param
      return pathname === '/admin/dashboard' && !currentTab;
    } else {
      // Others active when tab matches
      return currentTab === item.tab;
    }
  };

  return (
    <aside className="w-64 bg-gray-800 p-4 flex flex-col">
      <div className="text-xl font-bold mb-6">CLP Admin</div>
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded transition ${
              isActive(item) ? 'bg-green-600' : 'hover:bg-gray-700'
            }`}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 w-full mt-auto"
      >
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
}

export default function AdminSidebar({ pathname }: { pathname: string }) {
  return (
    <Suspense fallback={<div className="w-64 bg-gray-800 p-4">Loading...</div>}>
      <SidebarContent pathname={pathname} />
    </Suspense>
  );
}