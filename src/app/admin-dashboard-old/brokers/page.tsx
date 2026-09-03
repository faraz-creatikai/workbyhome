import BrokersPage from '@/components/explore-broker/exploreBroker';
import MasterProtectedRoute from '@/utils/masterProtectedRoute';
import ProtectedRoute from '@/utils/ProtectedRoute';

export default function Page() {
  return (
   <MasterProtectedRoute>
  <BrokersPage />
 </MasterProtectedRoute>
);
}