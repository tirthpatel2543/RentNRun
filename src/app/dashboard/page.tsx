
import { redirect } from 'next/navigation';

export default function DashboardRootPage() {
  // By default, redirect to the admin dashboard.
  // In a real app with authentication, you would check the user's role here.
  redirect('/dashboard/admin');
}
