'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SeminarsManager from './SeminarsManager';
import GalleryManager from './GalleryManager';
import RegistrationsManager from './RegistrationsManager';

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'seminars'; // default to seminars

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      {tab === 'seminars' && <SeminarsManager />}
      {tab === 'gallery' && <GalleryManager />}
      {tab === 'registrations' && <RegistrationsManager />}
    </div>
  );
}