'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, Calendar, Image, Users, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'seminars';

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, tab: null },
    { name: 'Seminars', href: '/admin/dashboard?tab=seminars', icon: Calendar, tab: 'seminars' },
    { name: 'Gallery', href: '/admin/dashboard?tab=gallery', icon: Image, tab: 'gallery' },
    { name: 'Registrations', href: '/admin/dashboard?tab=registrations', icon: Users, tab: 'registrations' },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.tab === null) {
      return pathname === item.href && !searchParams.get('tab');
    }
    return pathname === '/admin/dashboard' && currentTab === item.tab;
  };

  return (
    <aside className="w-64 bg-gray-800 p-4">
      <div className="text-xl font-bold mb-6">CLP Admin</div>
      <nav className="space-y-2">
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
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 w-full mt-6"
      >
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
}