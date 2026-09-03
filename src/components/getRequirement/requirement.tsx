// app/requirements/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  IndianRupee, 
  Calendar,
  User,
  Users,
  UserSearch,
  ArrowUpDown,
  Loader2,
  RefreshCw,
  X,
  BadgeCheck,
  Clock,
  Maximize2
} from 'lucide-react';

interface Requirement {
  id: string;
  requirementType: string;
  jobType: string;
  jobRole: string;
  city: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  name: string;
  contactNumber: string;
  email: string;
  description?: string;
  createdAt: string;
}

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'hiring' | 'seeking'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'salary-low' | 'salary-high'>('newest');
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);

  const fetchRequirements = async () => {
    setLoading(true);
    setError('');
    try {
      console.log(" fetching ... ")
      const res = await fetch('/api/requirements');
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Failed to fetch');
      
      setRequirements(data.data || []);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  // Filter and sort requirements
  const filteredRequirements = requirements
    .filter((req) => {
      const matchesSearch = 
        req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.jobRole.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || req.requirementType === filterType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'salary-low') {
        return a.minSalary - b.minSalary;
      } else {
        return b.maxSalary - a.maxSalary;
      }
    });

  const formatSalary = (salary: number) => {
    if (salary >= 10000000) {
      return `₹${(salary / 10000000).toFixed(1)} Cr`;
    } else if (salary >= 100000) {
      return `₹${(salary / 100000).toFixed(1)} L`;
    }
    return `₹${salary.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatJobType = (jobType: string) => {
    return jobType
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  const formatRole = (role: string) => {
    return role
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Requirements</h1>
                <p className="text-sm text-slate-500">Manage job requirements</p>
              </div>
            </div>
            <button
              onClick={fetchRequirements}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Requirements</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{requirements.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Hiring Requests</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {requirements.filter(r => r.requirementType === 'hiring').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Job Seekers</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {requirements.filter(r => r.requirementType === 'seeking').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <UserSearch className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Avg Salary</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {requirements.length > 0 
                    ? formatSalary(requirements.reduce((acc, r) => acc + r.maxSalary, 0) / requirements.length)
                    : '₹0'
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, city, role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Filter Type */}
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1 border border-slate-200">
              {(['all', 'hiring', 'seeking'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    filterType === type
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none px-4 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="salary-low">Salary: Low to High</option>
                <option value="salary-high">Salary: High to Low</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading requirements...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600 font-medium mb-2">Error loading requirements</p>
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
              onClick={fetchRequirements}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        ) : filteredRequirements.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No requirements found</h3>
            <p className="text-slate-500">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your filters or search term'
                : 'No requirements have been submitted yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequirements.map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedRequirement(req)}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group overflow-hidden"
              >
                {/* Card Header */}
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-white to-slate-50">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                    req.requirementType === 'hiring' 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}>
                    {req.requirementType}
                  </span>
                  <Maximize2 className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>

                {/* Card Body - Minimal Info */}
                <div className="p-5">
                  {/* Job Role */}
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {formatRole(req.jobRole)}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">{formatJobType(req.jobType)}</p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-sm truncate">{req.location}, {req.city}</span>
                  </div>

                  {/* Salary */}
                  <div className="bg-blue-50 rounded-xl p-3 mb-4">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-blue-600" />
                      <span className="text-base font-bold text-blue-900">
                        {formatSalary(req.minSalary)} - {formatSalary(req.maxSalary)}
                      </span>
                    </div>
                  </div>

                  {/* Client Name Only */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">{req.name}</p>
                      <p className="text-xs text-slate-500">{formatDate(req.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Detail Popup Modal */}
      {selectedRequirement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedRequirement(null)}
          />
          
          {/* Modal */}
          <div className="relative bg-white  rounded-3xl shadow-2xl w-full max-w-2xl max-h-[100vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {formatRole(selectedRequirement.jobRole)} · {formatJobType(selectedRequirement.jobType)}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                      selectedRequirement.requirementType === 'hiring'
                        ? 'bg-emerald-400 text-emerald-900'
                        : 'bg-amber-400 text-amber-900'
                    }`}>
                      {selectedRequirement.requirementType}
                    </span>
                    <span className="text-blue-100 text-sm">•</span>
                    <span className="text-blue-100 text-sm">ID: {selectedRequirement.id.slice(0, 8)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedRequirement(null)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Salary Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 mb-6 border border-blue-100">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Salary Range</p>
                <div className="flex items-baseline gap-2">
                  <IndianRupee className="w-6 h-6 text-blue-700" />
                  <span className="text-3xl font-bold text-blue-900">
                    {formatSalary(selectedRequirement.minSalary)}
                  </span>
                  <span className="text-xl text-blue-400 mx-2">-</span>
                  <span className="text-3xl font-bold text-blue-900">
                    {formatSalary(selectedRequirement.maxSalary)}
                  </span>
                </div>
              </div>

              {/* Location Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-slate-500 uppercase">City</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">{selectedRequirement.city}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-slate-500 uppercase">Location</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">{selectedRequirement.location}</p>
                </div>
              </div>

              {/* Client Info Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  Client Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-blue-600">
                        {selectedRequirement.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">{selectedRequirement.name}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Submitted on {formatFullDate(selectedRequirement.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                    <a
                      href={`tel:${selectedRequirement.contactNumber}`}
                      className="flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition-all group"
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Phone</p>
                        <p className="font-semibold text-slate-900">{selectedRequirement.contactNumber}</p>
                      </div>
                    </a>
                    
                    <a
                      href={`mailto:${selectedRequirement.email}`}
                      className="flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition-all group"
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">Email</p>
                        <p className="font-semibold text-slate-900 truncate">{selectedRequirement.email}</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              {selectedRequirement.description && (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-blue-500" />
                    Additional Details
                  </h3>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedRequirement.description}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-2 border-t border-slate-200 flex items-center gap-3">
              <a
                href={`tel:${selectedRequirement.contactNumber}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Client
              </a>
              <a
                href={`mailto:${selectedRequirement.email}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}