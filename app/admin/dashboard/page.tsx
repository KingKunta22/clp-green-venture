// app/admin/dashboard/page.tsx
import { redirect } from 'next/navigation';

export default function DashboardRedirect() {
  redirect('/admin/dashboard/seminars');
}