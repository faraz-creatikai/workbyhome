// app/candidates/page.tsx
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
  Loader2,
  Search,
  Filter,
  FileText,
  IndianRupee
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types — mirrors the Candidate prisma model exactly
interface Candidate {
  id: string;
  name: string;
  image?: string;
  currentCompany: string;
  role: string;
  location: string;
  description: string;
  email: string;
  phone: string;
  experience: string;
  expectedSalary: string;
  resumeUrl?: string;
  skills: string[] | any;
  createdAt: string;
  updatedAt: string;
}

interface CandidateFormData {
  name: string;
  image?: string;
  currentCompany: string;
  role: string;
  location: string;
  description: string;
  email: string;
  phone: string;
  experience: string;
  expectedSalary: string;
  resumeUrl?: string;
  skills: string; // comma-separated in the form, converted to an array on submit
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
const CandidateCardSkeleton = () => (
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

// Candidate Card Component
const CandidateCard = ({ 
  candidate, 
  onView, 
  onEdit, 
  onDelete,
  isAdmin = true 
}: { 
  candidate: Candidate; 
  onView: (candidate: Candidate) => void;
  onEdit: (candidate: Candidate) => void;
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
    onClick={() => onView(candidate)}
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={candidate.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
        alt={candidate.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {isAdmin && (
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(candidate); }}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-[var(--color-primary-50)] text-[var(--color-primary-600)] transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(candidate.id); }}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50 text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
    
    <div className="p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{candidate.name}</h3>
      <p className="text-[var(--color-primary-600)] font-medium text-sm mb-2">{candidate.role}</p>
      
      {candidate.currentCompany && (
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <Building2 className="w-4 h-4" />
          <span>{candidate.currentCompany}</span>
        </div>
      )}
      
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <MapPin className="w-4 h-4" />
        <span>{candidate.location}</span>
      </div>

      {candidate.description && (
        <p className="text-gray-600 text-sm line-clamp-2">{candidate.description}</p>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {(candidate.skills || []).slice(0, 3).map((skill: any, idx: any) => (
            <span 
              key={idx}
              className="px-2 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-xs rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
          {(candidate.skills || []).length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{candidate.skills.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

// Candidate Detail Modal
const CandidateDetailModal = ({ 
  candidate, 
  isOpen, 
  onClose 
}: { 
  candidate: Candidate | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!candidate) return null;

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
            <div className="relative h-64 md:h-72 shrink-0">
              <img 
                src={candidate.image || 'https://via.placeholder.com/800x400?text=No+Image'} 
                alt={candidate.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-3xl font-bold mb-1">{candidate.name}</h2>
                <p className="text-lg text-white/90">
                  {candidate.role}{candidate.currentCompany ? ` at ${candidate.currentCompany}` : ''}
                </p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {candidate.description && (
                    <>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">About</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">{candidate.description}</p>
                    </>
                  )}
                  
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(candidate.skills || []).map((skill: any, idx: any) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-sm rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {candidate.resumeUrl && (
                    <a
                      href={candidate.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      View Resume
                    </a>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact Info</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <a href={`mailto:${candidate.email}`} className="hover:text-[var(--color-primary-600)] transition-colors">
                          {candidate.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <a href={`tel:${candidate.phone}`} className="hover:text-[var(--color-primary-600)] transition-colors">
                          {candidate.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <span>{candidate.location}</span>
                      </div>
                      
                      {candidate.currentCompany && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <Building2 className="w-5 h-5 text-[var(--color-primary-600)]" />
                          <span>{candidate.currentCompany}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-[var(--color-primary-50)] rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-[var(--color-primary-800)] uppercase tracking-wider mb-2">Experience</h3>
                    <p className="text-[var(--color-primary-700)] font-medium">{candidate.experience}</p>
                  </div>

                  {candidate.expectedSalary && (
                    <div className="bg-[var(--color-primary-50)] rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-[var(--color-primary-800)] uppercase tracking-wider mb-2">Expected Salary</h3>
                      <p className="text-[var(--color-primary-700)] font-medium flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        {candidate.expectedSalary}
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

// Candidate Form Modal
const CandidateFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CandidateFormData) => void;
  initialData?: Candidate | null;
  isEditing: boolean;
}) => {
  const [formData, setFormData] = useState<CandidateFormData>({
    name: '',
    image: '',
    currentCompany: '',
    role: '',
    location: '',
    description: '',
    email: '',
    phone: '',
    experience: '',
    expectedSalary: '',
    resumeUrl: '',
    skills: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CandidateFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        image: initialData.image || '',
        currentCompany: initialData.currentCompany || '',
        role: initialData.role,
        location: initialData.location || '',
        description: initialData.description || '',
        email: initialData.email,
        phone: initialData.phone || '',
        experience: initialData.experience || '',
        expectedSalary: initialData.expectedSalary || '',
        resumeUrl: initialData.resumeUrl || '',
        skills: Array.isArray(initialData.skills)
          ? initialData.skills.join(', ')
          : initialData.skills || ''
      });
    } else {
      setFormData({
        name: '',
        image: '',
        currentCompany: '',
        role: '',
        location: '',
        description: '',
        email: '',
        phone: '',
        experience: '',
        expectedSalary: '',
        resumeUrl: '',
        skills: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen, isEditing]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CandidateFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.role.trim()) newErrors.role = 'Role is required';

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

    if (errors[name as keyof CandidateFormData]) {
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
                {isEditing ? 'Edit Candidate' : 'Add New Candidate'}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="John Smith"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="https://example.com/photo.jpg"
                  />
                  {formData.image && (
                    <div className="relative inline-block mt-3">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.role ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="Frontend Developer"
                  />
                  {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Company</label>
                  <input
                    type="text"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="Acme Inc. (leave blank if none)"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="3+ years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Salary</label>
                  <input
                    type="text"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="₹8,00,000 / year"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="john@example.com"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resume URL</label>
                  <input
                    type="text"
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="/uploads/candidates/resume.pdf"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="React, Node.js, TypeScript"
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
                    placeholder="Brief summary about the candidate..."
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
                {isEditing ? 'Update Candidate' : 'Add Candidate'}
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
  candidateName
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  candidateName: string;
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Candidate?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{candidateName}</span>? This action cannot be undone.
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
export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [deletingCandidate, setDeletingCandidate] = useState<Candidate | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch candidates from our own /api/candidates route
  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/candidates');
      if (!response.ok) throw new Error('Failed to fetch candidates');
      const data: Candidate[] = await response.json();
      setCandidates(data);
    } catch (error) {
      showToast('Failed to load candidates', 'error');
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  // CRUD Operations — all against /api/candidates, JSON body, matching the Candidate model
  const handleAddCandidate = async (formData: CandidateFormData) => {
    try {
      const skillsArray = formData.skills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          image: formData.image || null,
          currentCompany: formData.currentCompany || '',
          role: formData.role,
          location: formData.location || '',
          description: formData.description || '',
          email: formData.email,
          phone: formData.phone || '',
          experience: formData.experience || '',
          expectedSalary: formData.expectedSalary || '',
          resumeUrl: formData.resumeUrl || null,
          skills: skillsArray
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to add candidate');
      }

      const newCandidate: Candidate = await response.json();
      setCandidates(prev => [newCandidate, ...prev]);
      setIsFormModalOpen(false);
      showToast('Candidate added successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to add candidate', 'error');
    }
  };

  const handleEditCandidate = async (formData: CandidateFormData) => {
    if (!editingCandidate) return;

    try {
      const skillsArray = formData.skills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const response = await fetch(`/api/candidates/${editingCandidate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          image: formData.image || null,
          currentCompany: formData.currentCompany || '',
          role: formData.role,
          location: formData.location || '',
          description: formData.description || '',
          email: formData.email,
          phone: formData.phone || '',
          experience: formData.experience || '',
          expectedSalary: formData.expectedSalary || '',
          resumeUrl: formData.resumeUrl || null,
          skills: skillsArray
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to update candidate');
      }

      const updatedCandidate: Candidate = await response.json();
      setCandidates(prev => prev.map(c => c.id === updatedCandidate.id ? updatedCandidate : c));
      setIsFormModalOpen(false);
      setEditingCandidate(null);
      showToast('Candidate updated successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to update candidate', 'error');
    }
  };

  const handleDeleteCandidate = async () => {
    if (!deletingCandidate) return;

    try {
      const response = await fetch(`/api/candidates/${deletingCandidate.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete candidate');
      }

      setCandidates(prev => prev.filter(c => c.id !== deletingCandidate.id));
      setIsDeleteModalOpen(false);
      setDeletingCandidate(null);
      showToast('Candidate deleted successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to delete candidate', 'error');
    }
  };

  const openAddModal = () => {
    setEditingCandidate(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setIsFormModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      setDeletingCandidate(candidate);
      setIsDeleteModalOpen(true);
    }
  };

  const openDetailModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailModalOpen(true);
  };

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (candidate.currentCompany || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.role.toLowerCase().includes(searchQuery.toLowerCase())
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Browse Candidates</h1>
              <p className="text-gray-600 mt-1">Find and connect with top talent on WorkByHome</p>
            </div>
            
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary-600)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-700)] transition-colors shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Candidate
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
                placeholder="Search candidates by name, role, company, or location..."
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
              <CandidateCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search terms' : 'Add your first candidate to get started'}
            </p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
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
      <CandidateDetailModal
        candidate={selectedCandidate}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <CandidateFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingCandidate(null);
        }}
        onSubmit={editingCandidate ? handleEditCandidate : handleAddCandidate}
        initialData={editingCandidate}
        isEditing={!!editingCandidate}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingCandidate(null);
        }}
        onConfirm={handleDeleteCandidate}
        candidateName={deletingCandidate?.name || ''}
      />
    </div>
  );
}