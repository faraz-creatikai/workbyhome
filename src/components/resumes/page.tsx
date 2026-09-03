// app/resumes/page.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  MapPin,
  Phone,
  Mail,
  Search,
  Briefcase,
  GraduationCap,
  Globe,
  Users,
  Lock,
  FileText,
  DollarSign,
  Clock,
  Upload,
  ExternalLink,
  AlertCircle,
  Languages as LanguagesIcon,
  Camera,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types — mirrors the Resume prisma model ────────────────────────────────
interface Resume {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  profilePhoto?: string | null;
  jobTitle: string;
  category: string;
  experience: string;
  workType: string[] | any;
  availability: string;
  salaryMin: string;
  salaryMax: string;
  skills: string[] | any;
  languages: string[] | any;
  resumeUrl: string;
  resumeFileName: string;
  bio: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
}

interface ResumeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  category: string;
  experience: string;
  workType: string;    // comma-separated in the form, array on submit
  availability: string;
  salaryMin: string;
  salaryMax: string;
  skills: string;      // comma-separated in the form, array on submit
  languages: string;   // comma-separated in the form, array on submit
  bio: string;
  portfolio: string;
  linkedin: string;
  github: string;
  twitter: string;
  website: string;
  visibility: 'public' | 'private' | 'recruiters';
  profilePhotoFile: File | null; // a newly selected file — null means "no change"
  resumeFile: File | null;       // a newly selected file — null means "no change"
  removePhoto: boolean;
}

const CATEGORY_OPTIONS = [
  "Engineering & Dev", "Design & Creative", "Data & AI", "Marketing & Growth",
  "Product Management", "Cybersecurity", "Education & Training",
  "Finance & Accounting", "HR & People Ops", "Operations & PM",
  "Writing & Content", "Media & Video",
];

const EXPERIENCE_OPTIONS = [
  { value: "intern", label: "Intern / Student" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead / Manager" },
  { value: "principal", label: "Principal / Director" },
];

const AVAILABILITY_OPTIONS = ["Immediately", "Within 2 weeks", "Within 1 month", "Within 3 months", "Open to offers"];
const VISIBILITY_OPTIONS: { value: 'public' | 'private' | 'recruiters'; label: string }[] = [
  { value: 'public', label: 'Public' },
  { value: 'recruiters', label: 'Recruiters Only' },
  { value: 'private', label: 'Private' },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB, matches the API's limit

const experienceLabel = (value: string) =>
  EXPERIENCE_OPTIONS.find((e) => e.value === value)?.label || value;

const toArray = (v: any): string[] => (Array.isArray(v) ? v : []);

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
};

const AVATAR_COLORS = [
  "bg-indigo-600", "bg-emerald-600", "bg-violet-700", "bg-pink-600",
  "bg-blue-700", "bg-orange-500", "bg-teal-600", "bg-rose-600",
];
const avatarColor = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

// ─── Visibility badge ────────────────────────────────────────────────────────
const VisibilityBadge = ({ visibility }: { visibility: string }) => {
  const map: Record<string, { icon: any; label: string; className: string }> = {
    public: { icon: Globe, label: "Public", className: "bg-blue-50 text-blue-600" },
    recruiters: { icon: Users, label: "Recruiters Only", className: "bg-violet-50 text-violet-600" },
    private: { icon: Lock, label: "Private", className: "bg-gray-100 text-gray-500" },
  };
  const v = map[visibility] || map.recruiters;
  const Icon = v.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold ${v.className}`}>
      <Icon className="w-3 h-3" /> {v.label}
    </span>
  );
};

// ─── Avatar ──────────────────────────────────────────────────────────────────
const Avatar = ({ photo, name, id, size = 'md' }: { photo?: string | null; name: string; id: string; size?: 'md' | 'lg' }) => {
  const dims = size === 'lg' ? 'w-20 h-20 text-xl' : 'w-14 h-14 text-base';
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || '?';

  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className={`${dims} rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0`}
      />
    );
  }
  return (
    <div className={`${dims} ${avatarColor(id)} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 border-2 border-white shadow-sm`}>
      {initial}
    </div>
  );
};

// ─── Toast Notification ──────────────────────────────────────────────────────
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

// ─── Skeleton Loader ─────────────────────────────────────────────────────────
const ResumeCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-14 h-14 rounded-full bg-gray-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
    <div className="h-3 bg-gray-100 rounded w-full mb-2" />
    <div className="h-3 bg-gray-100 rounded w-5/6 mb-4" />
    <div className="flex gap-2">
      <div className="h-6 bg-gray-100 rounded-full w-16" />
      <div className="h-6 bg-gray-100 rounded-full w-16" />
      <div className="h-6 bg-gray-100 rounded-full w-16" />
    </div>
  </div>
);

// ─── Resume Card ─────────────────────────────────────────────────────────────
const ResumeCard = ({
  resume,
  onView,
  onEdit,
  onDelete,
}: {
  resume: Resume;
  onView: (r: Resume) => void;
  onEdit: (r: Resume) => void;
  onDelete: (id: string) => void;
}) => {
  const skills = toArray(resume.skills);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => onView(resume)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar photo={resume.profilePhoto} name={`${resume.firstName} ${resume.lastName}`} id={resume.id} />
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-gray-900 truncate">
              {resume.firstName} {resume.lastName}
            </h3>
            <p className="text-[var(--color-primary-600)] font-medium text-sm truncate">{resume.jobTitle}</p>
          </div>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(resume); }}
            className="p-2 bg-gray-50 rounded-lg hover:bg-[var(--color-primary-50)] text-[var(--color-primary-600)] transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(resume.id); }}
            className="p-2 bg-gray-50 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-gray-500 mb-3">
        {resume.location && (
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {resume.location}</span>
        )}
        {resume.category && (
          <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {resume.category}</span>
        )}
        {resume.experience && (
          <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {experienceLabel(resume.experience)}</span>
        )}
      </div>

      {resume.bio && (
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{resume.bio}</p>
      )}

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {skills.slice(0, 4).map((skill: string) => (
            <span key={skill} className="px-2 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-xs rounded-full font-medium">
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{skills.length - 4}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <VisibilityBadge visibility={resume.visibility} />
        <span className="text-[11px] text-gray-400">{formatDate(resume.createdAt)}</span>
      </div>
    </motion.div>
  );
};

// ─── Resume Detail Modal ──────────────────────────────────────────────────────
const ResumeDetailModal = ({
  resume,
  isOpen,
  onClose,
}: {
  resume: Resume | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!resume) return null;

  const skills = toArray(resume.skills);
  const languages = toArray(resume.languages);
  const workType = toArray(resume.workType);
  const links = [
    { label: 'Portfolio', url: resume.portfolio, icon: Globe },
    { label: 'Website', url: resume.website, icon: Globe },
    { label: 'LinkedIn', url: resume.linkedin, icon: ExternalLink },
    { label: 'GitHub', url: resume.github, icon: ExternalLink },
    { label: 'Twitter', url: resume.twitter, icon: ExternalLink },
  ].filter((l) => l.url);

  const salaryRange = resume.salaryMin || resume.salaryMax
    ? `$${resume.salaryMin ? Number(resume.salaryMin).toLocaleString() : '—'} – $${resume.salaryMax ? Number(resume.salaryMax).toLocaleString() : '—'} / yr`
    : null;

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
            {/* Header */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 px-6 pt-8 pb-6 shrink-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <Avatar photo={resume.profilePhoto} name={`${resume.firstName} ${resume.lastName}`} id={resume.id} size="lg" />
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold text-white truncate">{resume.firstName} {resume.lastName}</h2>
                  <p className="text-slate-300 truncate">{resume.jobTitle}</p>
                  <div className="mt-2"><VisibilityBadge visibility={resume.visibility} /></div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {resume.bio && (
                    <>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">About</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">{resume.bio}</p>
                    </>
                  )}

                  {skills.length > 0 && (
                    <>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {skills.map((skill: string) => (
                          <span key={skill} className="px-3 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-sm rounded-full font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {languages.length > 0 && (
                    <>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <LanguagesIcon className="w-3.5 h-3.5" /> Languages
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {languages.map((lang: string) => (
                          <span key={lang} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm rounded-full font-medium">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  <a
                    href={resume.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors mb-4"
                  >
                    <FileText className="w-4 h-4" />
                    {resume.resumeFileName || 'View Resume'}
                  </a>

                  {links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {links.map((l) => (
                        <a
                          key={l.label}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-xs font-medium transition-colors"
                        >
                          <l.icon className="w-3 h-3" /> {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact Info</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <a href={`mailto:${resume.email}`} className="hover:text-[var(--color-primary-600)] transition-colors truncate">
                          {resume.email}
                        </a>
                      </div>
                      {resume.phone && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <Phone className="w-5 h-5 text-[var(--color-primary-600)]" />
                          <a href={`tel:${resume.phone}`} className="hover:text-[var(--color-primary-600)] transition-colors">
                            {resume.phone}
                          </a>
                        </div>
                      )}
                      {resume.location && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <MapPin className="w-5 h-5 text-[var(--color-primary-600)]" />
                          <span>{resume.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[var(--color-primary-50)] rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-[var(--color-primary-800)] uppercase tracking-wider mb-2">Category</h3>
                    <p className="text-[var(--color-primary-700)] font-medium flex items-center gap-1">
                      <Briefcase className="w-4 h-4" /> {resume.category}
                    </p>
                  </div>

                  <div className="bg-[var(--color-primary-50)] rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-[var(--color-primary-800)] uppercase tracking-wider mb-2">Experience</h3>
                    <p className="text-[var(--color-primary-700)] font-medium flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" /> {experienceLabel(resume.experience)}
                    </p>
                  </div>

                  {workType.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Work Type</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {workType.map((t: string) => (
                          <span key={t} className="px-2 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {resume.availability && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Availability</h3>
                      <p className="text-gray-700 font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" /> {resume.availability}
                      </p>
                    </div>
                  )}

                  {salaryRange && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Expected Salary</h3>
                      <p className="text-gray-700 font-medium flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-gray-400" /> {salaryRange}
                      </p>
                    </div>
                  )}

                  <p className="text-[11px] text-gray-400 text-center">Submitted {formatDate(resume.createdAt)}</p>
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

// ─── Resume Form Modal (Add / Edit) ──────────────────────────────────────────
const ResumeFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ResumeFormData) => void;
  initialData?: Resume | null;
  isEditing: boolean;
}) => {
  const emptyForm: ResumeFormData = {
    firstName: '', lastName: '', email: '', phone: '', location: '',
    jobTitle: '', category: '', experience: '',
    workType: '', availability: '', salaryMin: '', salaryMax: '',
    skills: '', languages: '',
    bio: '', portfolio: '', linkedin: '', github: '', twitter: '', website: '',
    visibility: 'recruiters',
    profilePhotoFile: null, resumeFile: null, removePhoto: false,
  };

  const [formData, setFormData] = useState<ResumeFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ResumeFormData, string>>>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        phone: initialData.phone || '',
        location: initialData.location,
        jobTitle: initialData.jobTitle,
        category: initialData.category,
        experience: initialData.experience,
        workType: toArray(initialData.workType).join(', '),
        availability: initialData.availability || '',
        salaryMin: initialData.salaryMin || '',
        salaryMax: initialData.salaryMax || '',
        skills: toArray(initialData.skills).join(', '),
        languages: toArray(initialData.languages).join(', '),
        bio: initialData.bio || '',
        portfolio: initialData.portfolio || '',
        linkedin: initialData.linkedin || '',
        github: initialData.github || '',
        twitter: initialData.twitter || '',
        website: initialData.website || '',
        visibility: (initialData.visibility as any) || 'recruiters',
        profilePhotoFile: null,
        resumeFile: null,
        removePhoto: false,
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
    setPhotoPreview(null);
  }, [initialData, isOpen, isEditing]);

  // Build a local preview URL whenever a new photo file is picked
  useEffect(() => {
    if (!formData.profilePhotoFile) { setPhotoPreview(null); return; }
    const url = URL.createObjectURL(formData.profilePhotoFile);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [formData.profilePhotoFile]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ResumeFormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.experience) newErrors.experience = 'Experience level is required';
    if (!formData.skills.trim()) newErrors.skills = 'Add at least one skill';
    if (!isEditing && !formData.resumeFile) newErrors.resumeFile = 'Resume file is required';
    if (formData.resumeFile) {
      const validType = formData.resumeFile.type === 'application/pdf'
        || formData.resumeFile.name.endsWith('.doc')
        || formData.resumeFile.name.endsWith('.docx');
      if (!validType) newErrors.resumeFile = 'Must be a PDF, DOC, or DOCX file';
      else if (formData.resumeFile.size > MAX_FILE_SIZE) newErrors.resumeFile = 'File must be under 5MB';
    }
    if (formData.profilePhotoFile) {
      if (!formData.profilePhotoFile.type.startsWith('image/')) newErrors.profilePhotoFile = 'Must be an image file';
      else if (formData.profilePhotoFile.size > MAX_FILE_SIZE) newErrors.profilePhotoFile = 'Photo must be under 5MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ResumeFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const currentPhoto = photoPreview || (!formData.removePhoto ? initialData?.profilePhoto : null);

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
                {isEditing ? 'Edit Resume' : 'Add New Resume'}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-4">

                {/* Photo */}
                <div className="md:col-span-2 flex items-center gap-4">
                  <div
                    onClick={() => photoRef.current?.click()}
                    className="relative w-16 h-16 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-[var(--color-primary-400)] transition-colors overflow-hidden flex-shrink-0"
                  >
                    {currentPhoto ? (
                      <img src={currentPhoto} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Profile Photo</p>
                    <div className="flex items-center gap-3 mt-1">
                      <button type="button" onClick={() => photoRef.current?.click()} className="text-xs font-semibold text-[var(--color-primary-600)] hover:underline">
                        {currentPhoto ? 'Replace' : 'Upload'}
                      </button>
                      {currentPhoto && (
                        <button
                          type="button"
                          onClick={() => setFormData((f) => ({ ...f, profilePhotoFile: null, removePhoto: true }))}
                          className="text-xs font-semibold text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {errors.profilePhotoFile && <p className="text-xs text-red-500 mt-1">{errors.profilePhotoFile}</p>}
                  </div>
                  <input
                    ref={photoRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setFormData((prev) => ({ ...prev, profilePhotoFile: f, removePhoto: false }));
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text" name="location" value={formData.location} onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.location ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="New York, USA (EST)"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.jobTitle ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="Senior Frontend Developer"
                  />
                  {errors.jobTitle && <p className="mt-1 text-sm text-red-500">{errors.jobTitle}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    name="category" value={formData.category} onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.category ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all bg-white`}
                  >
                    <option value="">Select category…</option>
                    {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level *</label>
                  <select
                    name="experience" value={formData.experience} onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.experience ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all bg-white`}
                  >
                    <option value="">Select level…</option>
                    {EXPERIENCE_OPTIONS.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
                  </select>
                  {errors.experience && <p className="mt-1 text-sm text-red-500">{errors.experience}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Type (comma-separated)</label>
                  <input
                    type="text" name="workType" value={formData.workType} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="Fully Remote, Contract"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <select
                    name="availability" value={formData.availability} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all bg-white"
                  >
                    <option value="">Select availability…</option>
                    {AVAILABILITY_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                  <select
                    name="visibility" value={formData.visibility} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all bg-white"
                  >
                    {VISIBILITY_OPTIONS.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary Min (USD)</label>
                  <input
                    type="number" name="salaryMin" value={formData.salaryMin} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="80000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary Max (USD)</label>
                  <input
                    type="number" name="salaryMax" value={formData.salaryMax} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="130000"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills * (comma-separated)</label>
                  <input
                    type="text" name="skills" value={formData.skills} onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.skills ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="React, TypeScript, Node.js"
                  />
                  {errors.skills && <p className="mt-1 text-sm text-red-500">{errors.skills}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Languages (comma-separated)</label>
                  <input
                    type="text" name="languages" value={formData.languages} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="English, Spanish"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                  <input
                    type="url" name="portfolio" value={formData.portfolio} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="https://portfolio.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url" name="website" value={formData.website} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input
                    type="url" name="linkedin" value={formData.linkedin} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                  <input
                    type="url" name="github" value={formData.github} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X</label>
                  <input
                    type="url" name="twitter" value={formData.twitter} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="https://twitter.com/username"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                  <textarea
                    name="bio" value={formData.bio} onChange={handleChange} rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all resize-none"
                    placeholder="Short summary about the candidate…"
                  />
                </div>

                {/* Resume file */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resume File {!isEditing && '*'}</label>

                  {isEditing && initialData?.resumeUrl && !formData.resumeFile && (
                    <a
                      href={initialData.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-primary-600)] hover:underline mb-2"
                    >
                      <FileText className="w-3.5 h-3.5" /> Current file: {initialData.resumeFileName || 'view'}
                    </a>
                  )}

                  <div
                    onClick={() => resumeRef.current?.click()}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
                      errors.resumeFile ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-[var(--color-primary-400)] bg-gray-50'
                    }`}
                  >
                    <Upload className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600 truncate">
                      {formData.resumeFile
                        ? formData.resumeFile.name
                        : isEditing
                        ? 'Choose a new file to replace the current one (optional)'
                        : 'Click to upload PDF, DOC, or DOCX (max 5MB)'}
                    </span>
                  </div>
                  <input
                    ref={resumeRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setFormData((prev) => ({ ...prev, resumeFile: f }));
                    }}
                  />
                  {errors.resumeFile && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.resumeFile}
                    </p>
                  )}
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
                {isEditing ? 'Update Resume' : 'Add Resume'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Delete Confirmation Modal ────────────────────────────────────────────────
const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  candidateName,
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Resume?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{candidateName}</span>'s resume? This also removes their uploaded files. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ResumesAdminPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [deletingResume, setDeletingResume] = useState<Resume | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchResumes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/resumes');
      if (!response.ok) throw new Error('Failed to fetch resumes');
      const data: Resume[] = await response.json();
      setResumes(data);
    } catch (error) {
      showToast('Failed to load resumes', 'error');
      setResumes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  // Builds the multipart payload shared by add/edit
  const buildFormPayload = (formData: ResumeFormData): FormData => {
    const fd = new FormData();
    fd.append('firstName', formData.firstName);
    fd.append('lastName', formData.lastName);
    fd.append('email', formData.email);
    fd.append('phone', formData.phone);
    fd.append('location', formData.location);
    fd.append('jobTitle', formData.jobTitle);
    fd.append('category', formData.category);
    fd.append('experience', formData.experience);
    fd.append('workType', JSON.stringify(formData.workType.split(',').map((s) => s.trim()).filter(Boolean)));
    fd.append('availability', formData.availability);
    fd.append('salaryMin', formData.salaryMin);
    fd.append('salaryMax', formData.salaryMax);
    fd.append('skills', JSON.stringify(formData.skills.split(',').map((s) => s.trim()).filter(Boolean)));
    fd.append('languages', JSON.stringify(formData.languages.split(',').map((s) => s.trim()).filter(Boolean)));
    fd.append('bio', formData.bio);
    fd.append('portfolio', formData.portfolio);
    fd.append('linkedin', formData.linkedin);
    fd.append('github', formData.github);
    fd.append('twitter', formData.twitter);
    fd.append('website', formData.website);
    fd.append('visibility', formData.visibility);
    if (formData.profilePhotoFile) fd.append('profilePhoto', formData.profilePhotoFile);
    if (formData.resumeFile) fd.append('resume', formData.resumeFile);
    if (formData.removePhoto) fd.append('removePhoto', 'true');
    return fd;
  };

  const handleAddResume = async (formData: ResumeFormData) => {
    try {
      const res = await fetch('/api/resumes', { method: 'POST', body: buildFormPayload(formData) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to add resume');

      setResumes((prev) => [data, ...prev]);
      setIsFormModalOpen(false);
      showToast('Resume added successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to add resume', 'error');
    }
  };

  const handleEditResume = async (formData: ResumeFormData) => {
    if (!editingResume) return;
    try {
      const res = await fetch(`/api/resumes/${editingResume.id}`, { method: 'PUT', body: buildFormPayload(formData) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to update resume');

      setResumes((prev) => prev.map((r) => (r.id === data.id ? data : r)));
      setIsFormModalOpen(false);
      setEditingResume(null);
      showToast('Resume updated successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to update resume', 'error');
    }
  };

  const handleDeleteResume = async () => {
    if (!deletingResume) return;
    try {
      const res = await fetch(`/api/resumes/${deletingResume.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to delete resume');
      }
      setResumes((prev) => prev.filter((r) => r.id !== deletingResume.id));
      setIsDeleteModalOpen(false);
      setDeletingResume(null);
      showToast('Resume deleted successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to delete resume', 'error');
    }
  };

  const openAddModal = () => { setEditingResume(null); setIsFormModalOpen(true); };
  const openEditModal = (resume: Resume) => { setEditingResume(resume); setIsFormModalOpen(true); };
  const openDeleteModal = (id: string) => {
    const resume = resumes.find((r) => r.id === id);
    if (resume) { setDeletingResume(resume); setIsDeleteModalOpen(true); }
  };
  const openDetailModal = (resume: Resume) => { setSelectedResume(resume); setIsDetailModalOpen(true); };

  const filteredResumes = resumes.filter((r) => {
    const q = searchQuery.toLowerCase();
    const fullName = `${r.firstName} ${r.lastName}`.toLowerCase();
    return (
      fullName.includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.jobTitle.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Resumes</h1>
              <p className="text-gray-600 mt-1">Review, edit, and manage candidate resumes submitted on WorkByHome</p>
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary-600)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-700)] transition-colors shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Resume
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, job title, category, or location…"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <ResumeCardSkeleton key={i} />)}
          </div>
        ) : filteredResumes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No resumes found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search terms' : 'Candidate resumes will show up here as they come in'}
            </p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredResumes.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  resume={resume}
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
      <ResumeDetailModal
        resume={selectedResume}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <ResumeFormModal
        isOpen={isFormModalOpen}
        onClose={() => { setIsFormModalOpen(false); setEditingResume(null); }}
        onSubmit={editingResume ? handleEditResume : handleAddResume}
        initialData={editingResume}
        isEditing={!!editingResume}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setDeletingResume(null); }}
        onConfirm={handleDeleteResume}
        candidateName={deletingResume ? `${deletingResume.firstName} ${deletingResume.lastName}` : ''}
      />
    </div>
  );
}