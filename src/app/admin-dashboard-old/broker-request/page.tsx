import JoinBrokerApplicationsAdmin from '@/components/join-broker-network/joinNetwork';
import MasterProtectedRoute from '@/utils/masterProtectedRoute';
import ProtectedRoute from '@/utils/ProtectedRoute';

export default function Page() {
  return(
    <MasterProtectedRoute>
     <JoinBrokerApplicationsAdmin />
     </MasterProtectedRoute>
    );
}