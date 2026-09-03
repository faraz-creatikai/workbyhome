import RequirementsPage from '@/components/getRequirement/requirement';
import MasterProtectedRoute from '@/utils/masterProtectedRoute';
import ProtectedRoute from '@/utils/ProtectedRoute';

export default function Page() {
  return (
  <MasterProtectedRoute>
  <RequirementsPage />
   </MasterProtectedRoute>)
}