'use client';

import { Suspense } from 'react';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Suspense fallback={<div className="w-64 bg-gray-800 p-4">Loading...</div>}>
        <AdminSidebar />
      </Suspense>
      <main className="flex-1 overflow-auto p-6 bg-gray-900">
        {children}
      </main>
    </div>
  );
}