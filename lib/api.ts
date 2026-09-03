// lib/api.ts - API client functions
// this is only used for broker ,join the network page is a as like register page and this is all intigration is only for that page it is used for admin(componenet/join-broker-network/joinNetwork.tsx) and clientnetwork.ts page
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchApplications(params?: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.set('status', params.status);
  if (params?.search) queryParams.set('search', params.search);
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  
  const res = await fetch(`${API_URL}/api/broker-applications?${queryParams}`);
  if (!res.ok) throw new Error('Failed to fetch applications');
  return res.json();
}

export async function fetchApplication(id: string) {
  const res = await fetch(`${API_URL}/api/broker-applications/${id}`);
  if (!res.ok) throw new Error('Failed to fetch application');
  return res.json();
}

export async function createApplication(formData: FormData) {
  const res = await fetch(`${API_URL}/api/broker-applications`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create application');
  }
  return res.json();
}

export async function updateApplicationStatus(
  id: string, 
  status: 'approved' | 'rejected', 
  rejectionReason?: string
) {
  const res = await fetch(`${API_URL}/api/broker-applications/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, rejectionReason, reviewedBy: 'Admin' })
  });
  if (!res.ok) throw new Error('Failed to update application');
  return res.json();
}

export async function deleteApplication(id: string) {
  const res = await fetch(`${API_URL}/api/broker-applications/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete application');
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API_URL}/api/broker-applications/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}