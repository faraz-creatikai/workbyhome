'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search, Plus, Edit3, Trash2, CheckCircle, AlertCircle, FileText,
  Layout, Settings, X, Upload, Download, Filter, BarChart3, Users,
  Shield, Zap, Eye, Loader2, Globe, Save, Menu, ChevronDown, ChevronUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import RequirementsPage from '@/components/getRequirement/requirement';
import AdminPropertiesPage from '@/components/property-admin/properties';
import DashboardPage from '@/components/dashboard-page/page';
import { useAuthLanding } from '@/context/AuthContextLanding';
import CandidatesPage from '@/components/explore-broker/exploreBroker';
import CandidateApplicationsAdmin from '@/components/join-broker-network/joinNetwork';
import CompaniesPage from '@/components/companies-page/page';
import { SiReactiveresume } from 'react-icons/si';
import ResumesAdminPage from '@/components/resumes/page';
// ── Types (untouched) ────────────────────────────────────────────────────────
interface SEOEntry {
  id: string;
  pageName: string;
  slug: string;
  url: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  seoScore: number;
  status: 'published' | 'draft';
  lastModified: string;
  indexable: boolean;
  createdAt?: string;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface Stats {
  avgScore: number;
  published: number;
  needsAttention: number;
  total: number;
  totalKeywords: number;
}

// ── API Functions (untouched) ────────────────────────────────────────────────
const api = {
  async getEntries(status?: string, search?: string): Promise<{ entries: SEOEntry[]; stats: Stats }> {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (search) params.append('search', search);
    const res = await fetch(`/api/seo?${params}`);
    if (!res.ok) throw new Error('Failed to fetch entries');
    return res.json();
  },
  async getEntry(id: string): Promise<SEOEntry> {
    const res = await fetch(`/api/seo/${id}`);
    if (!res.ok) throw new Error('Failed to fetch entry');
    return res.json();
  },
  async createEntry(data: Partial<SEOEntry>): Promise<SEOEntry> {
    const res = await fetch('/api/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed to create entry'); }
    return res.json();
  },
  async updateEntry(id: string, data: Partial<SEOEntry>): Promise<SEOEntry> {
    const res = await fetch(`/api/seo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed to update entry'); }
    return res.json();
  },
  async deleteEntry(id: string): Promise<void> {
    const res = await fetch(`/api/seo/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete entry');
  },
  async exportData(): Promise<SEOEntry[]> {
    const res = await fetch('/api/seo/export');
    if (!res.ok) throw new Error('Failed to export data');
    return res.json();
  },
  async importData(data: SEOEntry[]): Promise<{ message: string; count: number }> {
    const res = await fetch('/api/seo/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to import data');
    return res.json();
  },
};

// ── Utility Functions (untouched) ────────────────────────────────────────────
const generateSlug = (name: string) =>
  name.toLowerCase()
    .trim()
    .replace(/[^\w\s/-]/g, "") // ✅ allow slash
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");;

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
  if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  return 'Needs Work';
};

// ── SVG Icon components (untouched) ─────────────────────────────────────────
const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const TwitterIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ── Preview Panel (extracted to share between mobile & desktop) ──────────────
function PreviewPanel({
  formData,
  previewMode,
  setPreviewMode,
  calculatePreviewScore,
}: {
  formData: Partial<SEOEntry>;
  previewMode: 'google' | 'facebook' | 'twitter';
  setPreviewMode: (m: 'google' | 'facebook' | 'twitter') => void;
  calculatePreviewScore: (e: Partial<SEOEntry>) => number;
}) {
  const score = calculatePreviewScore(formData);
  return (
    <>
      <div>
        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Live Preview</h4>
        {/* Preview tabs */}
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {(['google', 'facebook', 'twitter'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setPreviewMode(mode)}
              className={`flex items-center cursor-pointer gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${previewMode === mode
                ? 'bg-[var(--color-primary-600)] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
            >
              {mode === 'google' && <Search className="w-3 h-3" />}
              {mode === 'facebook' && <FacebookIcon className="w-3 h-3" />}
              {mode === 'twitter' && <TwitterIcon className="w-3 h-3" />}
              {mode}
            </button>
          ))}
        </div>

        {previewMode === 'google' && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-800 font-medium">EstateAI</p>
                <p className="text-xs text-green-700 truncate">{formData.canonicalUrl || 'https://estateai.com'}{formData.url}</p>
              </div>
            </div>
            <h5 className="text-[#1a0dab] text-base font-medium mb-1 hover:underline cursor-pointer line-clamp-1">
              {formData.metaTitle || 'Page Title'}
            </h5>
            <p className="text-sm text-[#4d5156] line-clamp-2">
              {formData.metaDescription || 'Meta description will appear here...'}
            </p>
          </div>
        )}

        {previewMode === 'facebook' && (
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
            <div className="aspect-[1.91/1] bg-slate-100 flex items-center justify-center">
              {formData.ogImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={formData.ogImage} alt="OG" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <FacebookIcon className="w-10 h-10 text-slate-300 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">No image selected</p>
                </div>
              )}
            </div>
            <div className="p-3 bg-[#f0f2f5]">
              <p className="text-xs text-slate-500 uppercase mb-1">ESTATEAI.COM</p>
              <h5 className="text-sm font-semibold text-slate-900 line-clamp-1 mb-1">
                {formData.ogTitle || formData.metaTitle || 'Page Title'}
              </h5>
              <p className="text-xs text-slate-600 line-clamp-2">
                {formData.ogDescription || formData.metaDescription || 'Description will appear here...'}
              </p>
            </div>
          </div>
        )}

        {previewMode === 'twitter' && (
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
            <div className="aspect-[2/1] bg-slate-100 flex items-center justify-center">
              {formData.twitterImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={formData.twitterImage} alt="Twitter" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <TwitterIcon className="w-10 h-10 text-slate-300 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">No image selected</p>
                </div>
              )}
            </div>
            <div className="p-3">
              <h5 className="text-sm font-semibold text-slate-900 line-clamp-1 mb-1">
                {formData.twitterTitle || formData.metaTitle || 'Page Title'}
              </h5>
              <p className="text-xs text-slate-600 line-clamp-2 mb-2">
                {formData.twitterDescription || formData.metaDescription || 'Description will appear here...'}
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Globe className="w-3 h-3" /> estateai.com
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SEO Score */}
      <div className="bg-white rounded-xl p-4 border border-[var(--color-primary-100)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-700">SEO Score</span>
          <span className={`text-lg font-bold ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
            {score}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {score >= 80 ? 'Excellent! Your SEO is optimized.' :
            score >= 60 ? "Good, but there's room for improvement." :
              'Needs work. Check recommendations below.'}
        </p>
      </div>

      {/* Recommendations */}
      <div className="space-y-2">
        <h5 className="text-xs font-semibold text-slate-700 uppercase">Recommendations</h5>
        <div className="space-y-2">
          {(formData.metaTitle?.length || 0) < 50 && (
            <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Title is too short. Aim for 50-60 characters.</span>
            </div>
          )}
          {(formData.metaTitle?.length || 0) > 60 && (
            <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Title is too long. Keep it under 60 characters.</span>
            </div>
          )}
          {(formData.metaDescription?.length || 0) < 150 && (
            <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Description is too short. Aim for 150-160 characters.</span>
            </div>
          )}
          {(formData.metaDescription?.length || 0) > 160 && (
            <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Description is too long. Keep it under 160 characters.</span>
            </div>
          )}
          {!(formData.keywords || []).length && (
            <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Add keywords to improve search relevance.</span>
            </div>
          )}
          {(formData.metaTitle?.length || 0) >= 50 && (formData.metaTitle?.length || 0) <= 60 &&
            (formData.metaDescription?.length || 0) >= 150 && (formData.metaDescription?.length || 0) <= 160 &&
            (formData.keywords || []).length > 0 && (
              <div className="flex items-start gap-2 text-xs text-green-600 bg-green-50 p-2 rounded-lg">
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>All basic SEO fields are properly optimized!</span>
              </div>
            )}
        </div>
      </div>
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SEODashboard() {
  const [entries, setEntries] = useState<SEOEntry[]>([]);
  const [stats, setStats] = useState<Stats>({ avgScore: 0, published: 0, needsAttention: 0, total: 0, totalKeywords: 0 });
  const [brokerCount, setBrokerCount] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState<SEOEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const [previewMode, setPreviewMode] = useState<'google' | 'facebook' | 'twitter'>('google');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // Responsive-only state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [formData, setFormData] = useState<Partial<SEOEntry>>({});
  const [isDirty, setIsDirty] = useState(false);
  const { user, logout } = useAuthLanding();

  const router = useRouter();
  const handleLogout = async () => {
   await logout();            // clears cookie + sets context user to null, synchronously
 // router.push('/admin-login');
  router.refresh();
};
  // Close mobile sidebar on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsMobileSidebarOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getEntries(activeTab, searchQuery);
      setEntries(data.entries);
      setStats(data.stats);
    } catch (error: unknown) {
      showNotification((error as Error).message, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, searchQuery]);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => {
    const t = setTimeout(() => loadData(), 300);
    return () => clearTimeout(t);
  }, [searchQuery, loadData]);

  const showNotification = (message: string, type: Notification['type'] = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  };

  const handleCreate = () => {
    setIsCreateMode(true);
    setFormData({
      pageName: '', slug: '', url: '', metaTitle: '', metaDescription: '', keywords: [],
      canonicalUrl: '', ogTitle: '', ogDescription: '', ogImage: '', twitterTitle: '',
      twitterDescription: '', twitterImage: '', indexable: true, status: 'draft'
    });
    setIsModalOpen(true);
    setIsDirty(false);
    setIsPreviewOpen(false);
  };

  const handleEdit = async (entry: SEOEntry) => {
    setIsCreateMode(false);
    setSelectedEntry(entry);
    setFormData({ ...entry });
    setIsModalOpen(true);
    setIsDirty(false);
    setIsPreviewOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this SEO entry?')) return;
    try {
      await api.deleteEntry(id);
      showNotification('SEO entry deleted successfully');
      loadData();
    } catch (error: unknown) {
      showNotification((error as Error).message, 'error');
    }
  };

  const handleSave = async () => {
    if (!formData.pageName || !formData.metaTitle) {
      showNotification('Please fill in required fields', 'error');
      return;
    }
    setIsSaving(true);
    try {
      if (isCreateMode) {
        await api.createEntry({
          ...formData,
          slug: formData.slug || generateSlug(formData.pageName || ''),
          url: formData.url || `/${generateSlug(formData.pageName || '')}`,
        });
        showNotification('New SEO entry created successfully');
      } else {
        await api.updateEntry(selectedEntry!.id, formData);
        showNotification('SEO entry updated successfully');
      }
      setIsModalOpen(false);
      setIsDirty(false);
      loadData();
    } catch (error: unknown) {
      showNotification((error as Error).message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof SEOEntry, value: unknown) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'pageName' && isCreateMode && typeof value === 'string') {
        updated.slug = generateSlug(value);
        updated.url = `/${generateSlug(value)}`;
      }
      return updated;
    });
    setIsDirty(true);
  };

  const handleKeywordsChange = (value: string) => {
    setKeywordInput(value);

    const keywords = value
      .split(',')
      .map(k => k.trim())
      .filter(k => k);

    handleInputChange('keywords', keywords);
  };

  const handleExport = async () => {
    try {
      const data = await api.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `seo-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification('Data exported successfully');
    } catch (error: unknown) {
      showNotification((error as Error).message, 'error');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text()) as SEOEntry[];
      await api.importData(data);
      showNotification('Data imported successfully');
      loadData();
    } catch (error: unknown) {
      showNotification((error as Error).message, 'error');
    }
    e.target.value = '';
  };

  const loadBrokerStats = async () => {
    try {
      const res = await fetch("/api/candidates"); //  broker API
      const data = await res.json();

      setBrokerCount(data.length); // or data.total if you return it
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    loadBrokerStats();
  }, []);
  const calculatePreviewScore = (entry: Partial<SEOEntry>): number => {
    let score = 0;
    if (entry.metaTitle && entry.metaTitle.length >= 50 && entry.metaTitle.length <= 60) score += 25;
    else if (entry.metaTitle && entry.metaTitle.length > 0) score += 15;
    if (entry.metaDescription && entry.metaDescription.length >= 150 && entry.metaDescription.length <= 160) score += 25;
    else if (entry.metaDescription && entry.metaDescription.length > 0) score += 15;
    if (entry.keywords && entry.keywords.length > 0) score += 15;
    if (entry.ogTitle && entry.ogDescription) score += 15;
    if (entry.twitterTitle && entry.twitterDescription) score += 15;
    if (entry.metaTitle && entry.metaTitle.length > 70) score -= 10;
    if (entry.metaDescription && entry.metaDescription.length > 170) score -= 10;
    return Math.max(0, Math.min(100, score));
  };

  const navItems = [
    { id: 'dashboard', icon: Layout, label: 'Dashboard' },
    { id: 'seo', icon: Search, label: 'SEO Manager', badge: stats.total },
    { id: 'explore', icon: Search, label: 'Candidate Manager', badge: brokerCount },
    { id: 'companies', icon: Users, label: 'Company Manager' },
    { id: 'requirement', icon: Users, label: 'Added Requirements' },
     { id: 'resumes', icon: SiReactiveresume, label: 'Resumes' },
    { id: 'joinNetwork', icon: Users, label: 'Candidate Request Manager' },

    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const SidebarNav = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {navItems.map(({ id, icon: Icon, label, badge }) => (
        <button
          key={id}
          onClick={() => { setActiveSidebarItem(id); onItemClick?.(); }}
          className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSidebarItem === id
            ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] shadow-sm border border-[var(--color-primary-100)]'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
          <Icon className="w-5 h-5 shrink-0" />
          <span className="truncate">{label}</span>
          {badge !== undefined && (
            <span className="ml-auto bg-[var(--color-primary-600)] text-white text-xs px-2 py-0.5 rounded-full shrink-0">
              {badge}
            </span>
          )}
        </button>
      ))}
    </>
  );

  const AdminBadge = ({ name, email }: { name?: string, email?: string }) => (
    <div>
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary-50)] to-white border border-[var(--color-primary-100)]">
        <div className="w-8 h-8 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--color-primary-900)] truncate">{name ? name : "Admin User"}</p>
          <p className="text-xs text-[var(--color-primary-600)] truncate">{email ? email : "admin@estateai.com"}</p>
        </div>

      </div>
      <button
        onClick={handleLogout}
        className="flex items-center justify-center cursor-pointer gap-2 px-4 py-2 text-slate-600 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all w-full"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>

  );

  return (
    <div className="min-h-screen bg-[var(--color-secondary-50)] flex">

      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-[var(--color-primary-100)] z-50 flex flex-col
        transform transition-transform duration-300 ease-in-out lg:hidden
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-5 border-b border-[var(--color-primary-100)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-[var(--color-primary-900)]">EstateAI</h1>
              <img src="/workbyhome.png" alt='logo' />
              <p className="text-xs text-[var(--color-primary-600)]">Admin Dashboard</p>
            </div>
          </div>
          <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 cursor-pointer text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          <SidebarNav onItemClick={() => setIsMobileSidebarOpen(false)} />
        </nav>
        <div className="p-4 border-t border-[var(--color-primary-100)] shrink-0">
          <AdminBadge name={user?.name} email={user?.email} />
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="w-64 bg-white border-r border-[var(--color-primary-100)] fixed h-full z-10 hidden lg:flex lg:flex-col">
        <div className="p-6 border-b border-[var(--color-primary-100)] shrink-0">
          <div className="flex items-center gap-3">
            {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center shadow-lg shadow-[var(--color-primary-200)]">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className=''>
              
              <h1 className="font-bold text-xl text-[var(--color-primary-900)]">EstateAI</h1>
              
              <p className="text-xs text-[var(--color-primary-600)]">Admin Dashboard</p>
            </div> */}
            <img src="/workbyhome-logo.png" alt='logo' className=' h-16 w-full' />
          </div>
        </div>
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          <SidebarNav />
        </nav>
        <div className="p-4 border-t border-[var(--color-primary-100)] shrink-0">
          <AdminBadge name={user?.name} email={user?.email} />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-64 min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-[var(--color-primary-100)] sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="p-2 text-slate-500 cursor-pointer hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors lg:hidden shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold text-[var(--color-primary-600)] leading-tight truncate">Admin Dashboard</h2>

              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

              <button
                onClick={handleLogout}
                className="flex items-center justify-center cursor-pointer gap-2 px-4 py-2 text-slate-600 hover:text-red-600  hover:bg-red-50 rounded-lg transition-all w-full"
              >
                <LogOut className="w-4 h-4" />

              </button>
            </div>
          </div>
        </header>
        {activeSidebarItem === "dashboard" && <DashboardPage />}
         {activeSidebarItem === "resumes" && <ResumesAdminPage />}
        {activeSidebarItem === "seo" && <div className=" ">
          {/* Header */}
          <header className="bg-white border-b border-[var(--color-primary-100)] sticky top-[64.5px]">
            <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="p-2 text-slate-500 cursor-pointer hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors lg:hidden shrink-0"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-4xl font-bold text-slate-900 leading-tight truncate">SEO Manager</h2>
                  <p className="text-sm sm:text-lg text-slate-500 hidden sm:block mt-0.5">Manage meta tags and optimize your site for search engines</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

                <button onClick={handleExport} className="p-2 cursor-pointer text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors hidden sm:flex" title="Export">
                  <Download className="w-5 h-5" />
                </button>
                <label className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer hidden sm:flex" title="Import">
                  <Upload className="w-5 h-5" />
                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                </label>
                <button
                  onClick={handleCreate}
                  disabled={isLoading}
                  className="flex items-center cursor-pointer gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium text-sm shadow-lg shadow-[var(--color-primary-200)] transition-all hover:shadow-xl active:scale-95"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
                  <span className="hidden sm:inline">Add Page SEO</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          </header>

          {/* Stats */}
          <div className="px-4 sm:px-6 py-4 sm:py-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                label: 'Avg SEO Score', value: `${stats.avgScore}%`,
                icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary-600)]" />,
                iconBg: 'bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)]',
                sub: <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getScoreColor(stats.avgScore)}`}>{getScoreLabel(stats.avgScore)}</span>,
                valueClass: 'text-[var(--color-primary-900)]',
              },
              {
                label: 'Published', value: stats.published,
                icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
                iconBg: 'bg-green-50',
                sub: <p className="text-xs text-slate-500">of {stats.total} total pages</p>,
                valueClass: 'text-[var(--color-primary-900)]',
              },
              {
                label: 'Needs Attention', value: stats.needsAttention,
                icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />,
                iconBg: 'bg-red-50',
                sub: <p className="text-xs text-slate-500 hidden sm:block">Pages with SEO score &lt; 60</p>,
                valueClass: 'text-red-600',
              },
              {
                label: 'Total Keywords', value: stats.totalKeywords,
                icon: <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-secondary-600)]" />,
                iconBg: 'bg-[var(--color-secondary-100)]',
                sub: <p className="text-xs text-slate-500">Across all pages</p>,
                valueClass: 'text-[var(--color-primary-900)]',
              },
            ].map(card => (
              <div key={card.label} className="bg-white rounded-2xl p-4 sm:p-5 border border-[var(--color-primary-100)] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-500 truncate">{card.label}</p>
                    <p className={`text-2xl sm:text-3xl font-bold mt-1 ${card.valueClass}`}>{card.value}</p>
                  </div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                    {card.icon}
                  </div>
                </div>
                <div className="mt-2 sm:mt-3">{card.sub}</div>
              </div>
            ))}
          </div>

          {/* Table area */}
          <div className="px-4 sm:px-6 pb-6">
            <div className="bg-white rounded-2xl border border-[var(--color-primary-100)] shadow-sm overflow-hidden">

              {/* Toolbar */}
              <div className="p-3 sm:p-4 border-b border-[var(--color-primary-100)] space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    {(['all', 'published', 'draft'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        disabled={isLoading}
                        className={`px-2.5 sm:px-4 cursor-pointer py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-all disabled:opacity-50 ${activeTab === tab ? 'bg-white text-[var(--color-primary-700)] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-row gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search pages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full sm:max-w-xs bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
                      />
                    </div>
                    <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0">
                      <Filter className="min-w-4 min-h-4 sm:min-w-5 sm:min-h-5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-[var(--color-primary-100)]">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Page</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">SEO Score</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Last Modified</th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoading ? (
                      <tr><td colSpan={5} className="px-6 py-12 text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-[var(--color-primary-600)]" />
                        <p className="text-slate-500 mt-2">Loading...</p>
                      </td></tr>
                    ) : entries.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                          <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-500 font-medium">No pages found</p>
                        <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
                      </td></tr>
                    ) : entries.map(entry => (
                      <tr key={entry.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-50)] flex items-center justify-center border border-[var(--color-primary-100)] shrink-0">
                              <FileText className="w-5 h-5 text-[var(--color-primary-600)]" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-slate-900 group-hover:text-[var(--color-primary-700)] transition-colors truncate">{entry.pageName}</p>
                              <p className="text-sm text-slate-500 truncate">{entry.url}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${entry.seoScore >= 80 ? 'bg-green-500' : entry.seoScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${entry.seoScore}%` }} />
                            </div>
                            <span className={`text-sm font-medium ${entry.seoScore >= 80 ? 'text-green-600' : entry.seoScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{entry.seoScore}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${entry.status === 'published' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${entry.status === 'published' ? 'bg-green-500' : 'bg-amber-500'}`} />
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{new Date(entry.lastModified).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(entry)} className="p-2 cursor-pointer text-slate-600 hover:text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] rounded-lg transition-all">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(entry.id)} className="p-2 cursor-pointer text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className="sm:hidden">
                {isLoading ? (
                  <div className="py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[var(--color-primary-600)]" />
                    <p className="text-slate-500 mt-2 text-sm">Loading...</p>
                  </div>
                ) : entries.length === 0 ? (
                  <div className="py-12 text-center px-6">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                      <Search className="w-7 h-7 text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-medium text-sm">No pages found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {entries.map(entry => (
                      <div key={entry.id} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-50)] border border-[var(--color-primary-100)] flex items-center justify-center shrink-0 mt-0.5">
                            <FileText className="w-4 h-4 text-[var(--color-primary-600)]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="font-medium text-slate-900 text-sm truncate">{entry.pageName}</p>
                                <p className="text-xs text-slate-500 truncate mt-0.5">{entry.url}</p>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button onClick={() => handleEdit(entry)} className="p-1.5 cursor-pointer text-slate-500 hover:text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] rounded-lg transition-all">
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(entry.id)} className="p-1.5 cursor-pointer text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="mt-2.5 flex items-center flex-wrap gap-2">
                              <div className="flex items-center gap-1.5">
                                <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full ${entry.seoScore >= 80 ? 'bg-green-500' : entry.seoScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${entry.seoScore}%` }} />
                                </div>
                                <span className={`text-xs font-semibold ${entry.seoScore >= 80 ? 'text-green-600' : entry.seoScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{entry.seoScore}</span>
                              </div>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${entry.status === 'published' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${entry.status === 'published' ? 'bg-green-500' : 'bg-amber-500'}`} />
                                {entry.status}
                              </span>
                              <span className="text-xs text-slate-400 ml-auto">{new Date(entry.lastModified).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>}
        {activeSidebarItem === "explore" && <CandidatesPage />}
        {activeSidebarItem === "requirement" && <RequirementsPage />}
        {activeSidebarItem === "companies" && <CompaniesPage />}
        {activeSidebarItem === "joinNetwork" && <CandidateApplicationsAdmin />}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="relative bg-white w-full sm:max-w-6xl rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">

            {/* Drag pill – mobile */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-slate-300 rounded-full sm:hidden" />

            {/* Modal header */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[var(--color-primary-100)] flex items-center justify-between bg-gradient-to-r from-white to-[var(--color-primary-50)] shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-primary-600)] flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-lg font-bold text-slate-900 truncate">
                    {isCreateMode ? 'Create New SEO Entry' : 'Edit SEO Settings'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 truncate">{formData.pageName || 'Untitled Page'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {isDirty && (
                  <>
                    <span className="hidden sm:flex text-sm text-amber-600 items-center gap-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      Unsaved changes
                    </span>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse sm:hidden" />
                  </>
                )}
                <button onClick={() => setIsModalOpen(false)} className="p-2 cursor-pointer text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal body */}
            <div className="flex-1 overflow-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-3">

                {/* Form */}
                <div className="lg:col-span-2 p-4 sm:p-6 space-y-5 sm:space-y-6 lg:border-r border-[var(--color-primary-100)]">

                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[var(--color-primary-600)]" /> Basic Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Page Name <span className="text-red-500">*</span></label>
                        <input type="text" value={formData.pageName || ''} onChange={(e) => handleInputChange('pageName', e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
                          placeholder="e.g., Home, About Us" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Slug</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">/</span>
                          <input type="text" value={formData.slug || ''} onChange={(e) => handleInputChange('slug', e.target.value)}
                            className={`w-full pl-7 pr-4 py-2.5 border rounded-xl text-sm ${isCreateMode ? 'bg-white border-slate-200 focus:ring-2 focus:ring-[var(--color-primary-500)]' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
                            readOnly={!isCreateMode} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Canonical URL</label>
                      <input type="text" value={formData.canonicalUrl || ''} onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] transition-all"
                        placeholder="https://estateai.com/page" />
                    </div>
                  </div>

                  {/* Meta Tags */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Search className="w-4 h-4 text-[var(--color-primary-600)]" /> Meta Tags
                    </h4>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-medium text-slate-700">Meta Title <span className="text-red-500">*</span></label>
                        <span className={`text-xs font-medium ${(formData.metaTitle?.length || 0) >= 50 && (formData.metaTitle?.length || 0) <= 60 ? 'text-green-600' : 'text-amber-600'}`}>{formData.metaTitle?.length || 0}/60</span>
                      </div>
                      <input type="text" value={formData.metaTitle || ''} onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] transition-all"
                        placeholder="Page title for search results" />
                      <p className="text-xs text-slate-500 mt-1.5">Recommended: 50-60 characters for optimal display</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-medium text-slate-700">Meta Description <span className="text-red-500">*</span></label>
                        <span className={`text-xs font-medium ${(formData.metaDescription?.length || 0) >= 150 && (formData.metaDescription?.length || 0) <= 160 ? 'text-green-600' : 'text-amber-600'}`}>{formData.metaDescription?.length || 0}/160</span>
                      </div>
                      <textarea value={formData.metaDescription || ''} onChange={(e) => handleInputChange('metaDescription', e.target.value)} rows={3}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] transition-all resize-none"
                        placeholder="Brief description of the page content" />
                      <p className="text-xs text-slate-500 mt-1.5">Recommended: 150-160 characters for optimal display</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Keywords</label>
                      <input type="text" value={keywordInput} onChange={(e) => handleKeywordsChange(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] transition-all"
                        placeholder="real estate, property, AI, automation" />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(formData.keywords || []).map((keyword, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-xs rounded-lg border border-[var(--color-primary-100)]">{keyword}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Open Graph */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <FacebookIcon className="w-4 h-4 text-[var(--color-primary-600)]" /> Open Graph (Facebook)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">OG Title</label>
                        <input type="text" value={formData.ogTitle || ''} onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] transition-all"
                          placeholder="Title for social sharing" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">OG Image URL</label>
                        <div className="relative">
                          <input type="text" value={formData.ogImage || ''} onChange={(e) => handleInputChange('ogImage', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] transition-all"
                            placeholder="https://..." />
                          <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">OG Description</label>
                      <textarea value={formData.ogDescription || ''} onChange={(e) => handleInputChange('ogDescription', e.target.value)} rows={2}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] transition-all resize-none"
                        placeholder="Description for Facebook sharing" />
                    </div>
                  </div>

                  {/* Twitter Card */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <TwitterIcon className="w-4 h-4 text-[var(--color-primary-600)]" /> Twitter Card
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Twitter Title</label>
                        <input type="text" value={formData.twitterTitle || ''} onChange={(e) => handleInputChange('twitterTitle', e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] transition-all"
                          placeholder="Title for Twitter cards" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Twitter Image URL</label>
                        <div className="relative">
                          <input type="text" value={formData.twitterImage || ''} onChange={(e) => handleInputChange('twitterImage', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] transition-all"
                            placeholder="https://..." />
                          <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Twitter Description</label>
                      <textarea value={formData.twitterDescription || ''} onChange={(e) => handleInputChange('twitterDescription', e.target.value)} rows={2}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] transition-all resize-none"
                        placeholder="Description for Twitter cards" />
                    </div>
                  </div>

                  {/* Page Settings */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[var(--color-primary-600)]" /> Page Settings
                    </h4>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.indexable} onChange={(e) => handleInputChange('indexable', e.target.checked)}
                          className="w-5 h-5 rounded border-slate-300 text-[var(--color-primary-600)] focus:ring-[var(--color-primary-500)]" />
                        <span className="text-sm text-slate-700">Allow search engine indexing</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.status === 'published'} onChange={(e) => handleInputChange('status', e.target.checked ? 'published' : 'draft')}
                          className="w-5 h-5 rounded border-slate-300 text-[var(--color-primary-600)] focus:ring-[var(--color-primary-500)]" />
                        <span className="text-sm text-slate-700">Published</span>
                      </label>
                    </div>
                  </div>

                  {/* Preview toggle – mobile only, inside form */}
                  <div className="pt-2 lg:hidden border-t border-slate-100">
                    <button
                      onClick={() => setIsPreviewOpen(v => !v)}
                      className="w-full flex items-center justify-between cursor-pointer px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-[var(--color-primary-600)]" />
                        Live Preview &amp; SEO Score
                      </span>
                      {isPreviewOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {isPreviewOpen && (
                      <div className="mt-3 bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-5">
                        <PreviewPanel formData={formData} previewMode={previewMode} setPreviewMode={setPreviewMode} calculatePreviewScore={calculatePreviewScore} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview sidebar – desktop only */}
                <div className="hidden lg:block bg-slate-50 p-6 space-y-6">
                  <PreviewPanel formData={formData} previewMode={previewMode} setPreviewMode={setPreviewMode} calculatePreviewScore={calculatePreviewScore} />
                </div>

              </div>
            </div>

            {/* Modal footer */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-[var(--color-primary-100)] bg-slate-50 flex items-center justify-between gap-3 shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="px-4 cursor-pointer sm:px-5 py-2 sm:py-2.5 text-sm text-slate-600 font-medium hover:text-slate-900 transition-colors">
                Cancel
              </button>
              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={() => showNotification('Draft saved automatically', 'info')}
                  className="hidden sm:block cursor-pointer px-5 py-2.5 text-sm text-[var(--color-primary-700)] font-medium hover:bg-[var(--color-primary-50)] rounded-xl transition-all">
                  Save as Draft
                </button>
                <button onClick={handleSave} disabled={isSaving}
                  className="flex items-center gap-2 px-4 cursor-pointer sm:px-6 py-2 sm:py-2.5 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl shadow-lg shadow-[var(--color-primary-200)] transition-all hover:shadow-xl active:scale-95">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isCreateMode ? 'Create Entry' : 'Save Changes'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Notifications */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 space-y-2 max-w-xs w-full pointer-events-none">
        {notifications.map(notification => (
          <div key={notification.id} className={`pointer-events-auto flex items-center gap-3 px-4 sm:px-5 py-3 rounded-xl shadow-lg transition-all text-sm ${notification.type === 'success' ? 'bg-green-600 text-white' :
            notification.type === 'error' ? 'bg-red-600 text-white' :
              'bg-[var(--color-primary-600)] text-white'
            }`}>
            {notification.type === 'success' && <CheckCircle className="w-5 h-5 shrink-0" />}
            {notification.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" />}
            <span className="font-medium">{notification.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}