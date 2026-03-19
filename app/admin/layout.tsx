// app/admin/layout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import AdminSidebar from './AdminSidebar'; // we'll create this

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <AdminSidebar pathname={pathname} />
      <main className="flex-1 overflow-auto p-6 bg-gray-900">
        {children}
      </main>
    </div>
  );
}