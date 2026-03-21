// app/admin/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white relative">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 bg-gray-800 p-4 flex flex-col z-30 transition-transform duration-300 ${
          isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold">CLP Admin</div>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} className="p-1">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <AdminSidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="mb-4 p-2 bg-gray-800 rounded-md"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        {children}
      </main>
    </div>
  );
}