// app/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Image, Users, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Seminars', href: '/admin/dashboard/seminars', icon: Calendar },
  { name: 'Gallery', href: '/admin/dashboard/gallery', icon: Image },
  { name: 'Registrations', href: '/admin/dashboard/registrations', icon: Users },
];

export default function AdminSidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === '/admin/dashboard';
    }
    return pathname.startsWith(href);
  };

  const handleClick = () => {
    if (closeSidebar) closeSidebar();
  };

  return (
    <nav className="space-y-2 flex-1">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={handleClick}
          className={`flex items-center gap-3 px-3 py-2 rounded transition ${
            isActive(item.href) ? 'bg-green-600' : 'hover:bg-gray-700'
          }`}
        >
          <item.icon size={20} />
          {item.name}
        </Link>
      ))}
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 w-full mt-auto"
      >
        <LogOut size={20} /> Logout
      </button>
    </nav>
  );
}