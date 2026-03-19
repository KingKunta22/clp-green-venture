// app/admin/layout.tsx
'use client';

import AdminSidebar from './AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 bg-gray-900">
        {children}
      </main>
    </div>
  );
}