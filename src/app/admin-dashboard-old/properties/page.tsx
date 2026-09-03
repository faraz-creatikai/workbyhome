// app/dashboard/properties/page.tsx
import AdminPropertiesPage from '@/components/property-admin/properties';
import MasterProtectedRoute from '@/utils/masterProtectedRoute';
import ProtectedRoute from '@/utils/ProtectedRoute';

export default function Page() {
  return (
    <MasterProtectedRoute>
  <AdminPropertiesPage />
  </MasterProtectedRoute>
);
}