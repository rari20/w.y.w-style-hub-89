import AdminLayout from '@/components/AdminLayout';
import { useLocation } from 'react-router-dom';

export default function AdminPlaceholder() {
  const location = useLocation();
  const name = location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Page';

  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-2xl font-display capitalize">{name}</h1>
        <p className="text-sm text-muted-foreground font-body mt-2">This section is under development.</p>
      </div>
    </AdminLayout>
  );
}
