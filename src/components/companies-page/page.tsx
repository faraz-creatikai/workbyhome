// app/companies/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  MapPin,
  Building2,
  Phone,
  Mail,
  Search,
  Filter,
  Globe,
  Users,
  Briefcase,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types — mirrors the Company prisma model exactly
interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  companySize: string;
  location: string;
  description: string;
  email: string;
  phone: string;
  website?: string;
  foundedYear: string;
  openPositions: number;
  benefits: string[] | any;
  createdAt: string;
  updatedAt: string;
}

interface CompanyFormData {
  name: string;
  logo?: string;
  industry: string;
  companySize: string;
  location: string;
  description: string;
  email: string;
  phone: string;
  website?: string;
  foundedYear: string;
  openPositions: string; // number entered as string in the form, parsed on submit
  benefits: string; // comma-separated in the form, converted to an array on submit
}

// Toast Notification Component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -50, x: '-50%' }}
      className={`fixed top-4 left-1/2 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// Skeleton Loader Component
const CompanyCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-16 bg-gray-200 rounded" />
    </div>
  </div>
);

// Company Card Component
const CompanyCard = ({
  company,
  onView,
  onEdit,
  onDelete,
  isAdmin = true
}: {
  company: Company;
  onView: (company: Company) => void;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
  isAdmin?: boolean;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -4 }}
    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
    onClick={() => onView(company)}
  >
    <div className="relative h-48 overflow-hidden bg-gray-50">
      <img
        src={company.logo || 'https://via.placeholder.com/400x300?text=No+Logo'}
        alt={company.name}
        className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {isAdmin && (
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(company); }}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-[var(--color-primary-50)] text-[var(--color-primary-600)] transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(company.id); }}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50 text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {company.openPositions > 0 && (
        <div className="absolute top-3 left-3 px-3 py-1 bg-[var(--color-primary-600)] text-white text-xs font-semibold rounded-full shadow-md">
          {company.openPositions} open role{company.openPositions === 1 ? '' : 's'}
        </div>
      )}
    </div>

    <div className="p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{company.name}</h3>
      {company.industry && (
        <p className="text-[var(--color-primary-600)] font-medium text-sm mb-2">{company.industry}</p>
      )}

      {company.companySize && (
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <Users className="w-4 h-4" />
          <span>{company.companySize} employees</span>
        </div>
      )}

      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <MapPin className="w-4 h-4" />
        <span>{company.location}</span>
      </div>

      {company.description && (
        <p className="text-gray-600 text-sm line-clamp-2">{company.description}</p>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {(company.benefits || []).slice(0, 3).map((benefit: any, idx: any) => (
            <span
              key={idx}
              className="px-2 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-xs rounded-full font-medium"
            >
              {benefit}
            </span>
          ))}
          {(company.benefits || []).length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{company.benefits.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

// Company Detail Modal
const CompanyDetailModal = ({
  company,
  isOpen,
  onClose
}: {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!company) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            <div className="relative h-64 md:h-72 shrink-0 bg-gray-100">
              <img
                src={company.logo || 'https://via.placeholder.com/800x400?text=No+Logo'}
                alt={company.name}
                className="w-full h-full object-contain p-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-3xl font-bold mb-1">{company.name}</h2>
                {company.industry && <p className="text-lg text-white/90">{company.industry}</p>}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {company.description && (
                    <>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">About</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">{company.description}</p>
                    </>
                  )}

                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Benefits</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(company.benefits || []).map((benefit: any, idx: any) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-sm rounded-full font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                    </a>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact Info</h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <a href={`mailto:${company.email}`} className="hover:text-[var(--color-primary-600)] transition-colors">
                          {company.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <a href={`tel:${company.phone}`} className="hover:text-[var(--color-primary-600)] transition-colors">
                          {company.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <span>{company.location}</span>
                      </div>

                      {company.companySize && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <Users className="w-5 h-5 text-[var(--color-primary-600)]" />
                          <span>{company.companySize} employees</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[var(--color-primary-50)] rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-[var(--color-primary-800)] uppercase tracking-wider mb-2">Open Positions</h3>
                    <p className="text-[var(--color-primary-700)] font-medium flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {company.openPositions}
                    </p>
                  </div>

                  {company.foundedYear && (
                    <div className="bg-[var(--color-primary-50)] rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-[var(--color-primary-800)] uppercase tracking-wider mb-2">Founded</h3>
                      <p className="text-[var(--color-primary-700)] font-medium flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {company.foundedYear}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button
                onClick={onClose}
                className="w-full py-3 bg-[var(--color-primary-600)] text-white rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors"
              >
                Close Profile
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Company Form Modal
const CompanyFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CompanyFormData) => void;
  initialData?: Company | null;
  isEditing: boolean;
}) => {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    logo: '',
    industry: '',
    companySize: '',
    location: '',
    description: '',
    email: '',
    phone: '',
    website: '',
    foundedYear: '',
    openPositions: '0',
    benefits: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CompanyFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        logo: initialData.logo || '',
        industry: initialData.industry || '',
        companySize: initialData.companySize || '',
        location: initialData.location || '',
        description: initialData.description || '',
        email: initialData.email,
        phone: initialData.phone || '',
        website: initialData.website || '',
        foundedYear: initialData.foundedYear || '',
        openPositions: String(initialData.openPositions ?? 0),
        benefits: Array.isArray(initialData.benefits)
          ? initialData.benefits.join(', ')
          : initialData.benefits || ''
      });
    } else {
      setFormData({
        name: '',
        logo: '',
        industry: '',
        companySize: '',
        location: '',
        description: '',
        email: '',
        phone: '',
        website: '',
        foundedYear: '',
        openPositions: '0',
        benefits: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen, isEditing]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CompanyFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Company name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
    if (formData.openPositions && isNaN(Number(formData.openPositions))) {
      newErrors.openPositions = 'Open positions must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof CompanyFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Edit Company' : 'Add New Company'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="Acme Inc."
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                  <input
                    type="text"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="https://example.com/logo.png"
                  />
                  {formData.logo && (
                    <div className="relative inline-block mt-3">
                      <img
                        src={formData.logo}
                        alt="Preview"
                        className="w-24 h-24 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.industry ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="Software / SaaS"
                  />
                  {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                  <input
                    type="text"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="11-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="Bangalore / Remote"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Founded Year</label>
                  <input
                    type="text"
                    name="foundedYear"
                    value={formData.foundedYear}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="2018"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Open Positions</label>
                  <input
                    type="number"
                    min="0"
                    name="openPositions"
                    value={formData.openPositions}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.openPositions ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="5"
                  />
                  {errors.openPositions && <p className="mt-1 text-sm text-red-500">{errors.openPositions}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="hr@acme.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="https://acme.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (comma-separated)</label>
                  <input
                    type="text"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="Remote work, Health insurance, Stock options"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all resize-none"
                    placeholder="Brief summary about the company..."
                  />
                </div>
              </div>
            </form>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2.5 bg-[var(--color-primary-600)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-700)] transition-colors"
              >
                {isEditing ? 'Update Company' : 'Add Company'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Delete Confirmation Modal
const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  companyName
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  companyName: string;
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Company?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{companyName}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Main Page Component
export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [deletingCompany, setDeletingCompany] = useState<Company | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch companies from our own /api/companies route
  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/companies');
      if (!response.ok) throw new Error('Failed to fetch companies');
      const data: Company[] = await response.json();
      setCompanies(data);
    } catch (error) {
      showToast('Failed to load companies', 'error');
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  // CRUD Operations — all against /api/companies, JSON body, matching the Company model
  const handleAddCompany = async (formData: CompanyFormData) => {
    try {
      const benefitsArray = formData.benefits
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          logo: formData.logo || null,
          industry: formData.industry || '',
          companySize: formData.companySize || '',
          location: formData.location || '',
          description: formData.description || '',
          email: formData.email,
          phone: formData.phone || '',
          website: formData.website || null,
          foundedYear: formData.foundedYear || '',
          openPositions: parseInt(formData.openPositions, 10) || 0,
          benefits: benefitsArray
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to add company');
      }

      const newCompany: Company = await response.json();
      setCompanies(prev => [newCompany, ...prev]);
      setIsFormModalOpen(false);
      showToast('Company added successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to add company', 'error');
    }
  };

  const handleEditCompany = async (formData: CompanyFormData) => {
    if (!editingCompany) return;

    try {
      const benefitsArray = formData.benefits
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const response = await fetch(`/api/companies/${editingCompany.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          logo: formData.logo || null,
          industry: formData.industry || '',
          companySize: formData.companySize || '',
          location: formData.location || '',
          description: formData.description || '',
          email: formData.email,
          phone: formData.phone || '',
          website: formData.website || null,
          foundedYear: formData.foundedYear || '',
          openPositions: parseInt(formData.openPositions, 10) || 0,
          benefits: benefitsArray
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to update company');
      }

      const updatedCompany: Company = await response.json();
      setCompanies(prev => prev.map(c => c.id === updatedCompany.id ? updatedCompany : c));
      setIsFormModalOpen(false);
      setEditingCompany(null);
      showToast('Company updated successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to update company', 'error');
    }
  };

  const handleDeleteCompany = async () => {
    if (!deletingCompany) return;

    try {
      const response = await fetch(`/api/companies/${deletingCompany.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete company');
      }

      setCompanies(prev => prev.filter(c => c.id !== deletingCompany.id));
      setIsDeleteModalOpen(false);
      setDeletingCompany(null);
      showToast('Company deleted successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to delete company', 'error');
    }
  };

  const openAddModal = () => {
    setEditingCompany(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (company: Company) => {
    setEditingCompany(company);
    setIsFormModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    const company = companies.find(c => c.id === id);
    if (company) {
      setDeletingCompany(company);
      setIsDeleteModalOpen(true);
    }
  };

  const openDetailModal = (company: Company) => {
    setSelectedCompany(company);
    setIsDetailModalOpen(true);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (company.industry || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Companies</h1>
              <p className="text-gray-600 mt-1">Add, edit, and manage companies hiring on WorkByHome</p>
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary-600)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-700)] transition-colors shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Company
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies by name, industry, or location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
              />
            </div>
            <button className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <CompanyCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search terms' : 'Add your first company to get started'}
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onView={openDetailModal}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <CompanyDetailModal
        company={selectedCompany}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <CompanyFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingCompany(null);
        }}
        onSubmit={editingCompany ? handleEditCompany : handleAddCompany}
        initialData={editingCompany}
        isEditing={!!editingCompany}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingCompany(null);
        }}
        onConfirm={handleDeleteCompany}
        companyName={deletingCompany?.name || ''}
      />
    </div>
  );
}