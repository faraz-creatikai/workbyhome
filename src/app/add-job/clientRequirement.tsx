'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  Shield, 
  Zap, 
  Clock, 
  HeadphonesIcon, 
  Loader2,
  Briefcase,
  Building2,
  ChevronDown,
  ArrowRight,
  MapPin,
  DollarSign,
  User,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import RequirementSuccessPopup from '@/components/popups/requirementSubmit';

// Types
interface FormData {
  requirementType: 'hiring' | 'seeking';
  jobType: string;
  jobRole: string;
  city: string;
  location: string;
  minSalary: string;
  maxSalary: string;
  name: string;
  contactNumber: string;
  email: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

interface SelectOption {
  value: string;
  label: string;
}

// Data for dependent dropdowns
const jobTypes: SelectOption[] = [
  { value: '', label: 'Select Job Type' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'freelance', label: 'Freelance' }
];

const jobRoles: Record<string, SelectOption[]> = {
  '': [{ value: '', label: 'Select Job Type First' }],
  'full-time': [
    { value: '', label: 'Select Role' },
    { value: 'software-engineer', label: 'Software Engineer' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'designer', label: 'UI/UX Designer' },
    { value: 'marketing-manager', label: 'Marketing Manager' },
    { value: 'sales-executive', label: 'Sales Executive' },
    { value: 'operations-manager', label: 'Operations Manager' }
  ],
  'part-time': [
    { value: '', label: 'Select Role' },
    { value: 'pt-developer', label: 'Developer' },
    { value: 'pt-designer', label: 'Designer' },
    { value: 'pt-support', label: 'Customer Support' },
    { value: 'pt-content', label: 'Content Writer' }
  ],
  contract: [
    { value: '', label: 'Select Role' },
    { value: 'contract-developer', label: 'Contract Developer' },
    { value: 'contract-designer', label: 'Contract Designer' },
    { value: 'contract-consultant', label: 'Consultant' },
    { value: 'contract-analyst', label: 'Data Analyst' }
  ],
  internship: [
    { value: '', label: 'Select Role' },
    { value: 'swe-intern', label: 'Software Engineering Intern' },
    { value: 'design-intern', label: 'Design Intern' },
    { value: 'marketing-intern', label: 'Marketing Intern' },
    { value: 'data-intern', label: 'Data Analyst Intern' }
  ],
  freelance: [
    { value: '', label: 'Select Role' },
    { value: 'freelance-developer', label: 'Freelance Developer' },
    { value: 'freelance-designer', label: 'Freelance Designer' },
    { value: 'freelance-writer', label: 'Freelance Writer' },
    { value: 'freelance-marketer', label: 'Freelance Marketer' }
  ]
};

const cities: SelectOption[] = [
  { value: '', label: 'Select City' },
  { value: 'remote', label: 'Remote (Work from Home)' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'chennai', label: 'Chennai' },
  { value: 'pune', label: 'Pune' },
  { value: 'kolkata', label: 'Kolkata' }
];

const locations: Record<string, SelectOption[]> = {
  '': [{ value: '', label: 'Select City First' }],
  remote: [
    { value: '', label: 'Select Location' },
    { value: 'anywhere-india', label: 'Anywhere in India' },
    { value: 'anywhere-global', label: 'Anywhere (Global)' }
  ],
  mumbai: [
    { value: '', label: 'Select Location' },
    { value: 'andheri', label: 'Andheri' },
    { value: 'bandra', label: 'Bandra' },
    { value: 'powai', label: 'Powai' },
    { value: 'juhu', label: 'Juhu' },
    { value: 'worli', label: 'Worli' }
  ],
  delhi: [
    { value: '', label: 'Select Location' },
    { value: 'connaught-place', label: 'Connaught Place' },
    { value: 'south-delhi', label: 'South Delhi' },
    { value: 'gurgaon', label: 'Gurgaon' },
    { value: 'noida', label: 'Noida' },
    { value: 'dwarka', label: 'Dwarka' }
  ],
  bangalore: [
    { value: '', label: 'Select Location' },
    { value: 'koramangala', label: 'Koramangala' },
    { value: 'indiranagar', label: 'Indiranagar' },
    { value: 'whitefield', label: 'Whitefield' },
    { value: 'electronic-city', label: 'Electronic City' },
    { value: 'hsr-layout', label: 'HSR Layout' }
  ],
  hyderabad: [
    { value: '', label: 'Select Location' },
    { value: 'hitech-city', label: 'Hitech City' },
    { value: 'banjara-hills', label: 'Banjara Hills' },
    { value: 'jubilee-hills', label: 'Jubilee Hills' },
    { value: 'gachibowli', label: 'Gachibowli' }
  ],
  chennai: [
    { value: '', label: 'Select Location' },
    { value: 'adyar', label: 'Adyar' },
    { value: 'anna-nagar', label: 'Anna Nagar' },
    { value: 't-nagar', label: 'T. Nagar' },
    { value: 'velachery', label: 'Velachery' }
  ],
  pune: [
    { value: '', label: 'Select Location' },
    { value: 'koregaon-park', label: 'Koregaon Park' },
    { value: 'kalyani-nagar', label: 'Kalyani Nagar' },
    { value: 'hinjewadi', label: 'Hinjewadi' },
    { value: 'magarpatta', label: 'Magarpatta' }
  ],
  kolkata: [
    { value: '', label: 'Select Location' },
    { value: 'salt-lake', label: 'Salt Lake' },
    { value: 'park-street', label: 'Park Street' },
    { value: 'new-town', label: 'New Town' },
    { value: 'rajarhat', label: 'Rajarhat' }
  ]
};

const benefits = [
  {
    icon: Shield,
    title: 'Verified Employers & Candidates',
    description: 'Every requirement is reviewed before it goes live on WorkByHome'
  },
  {
    icon: Zap,
    title: 'Faster Matching',
    description: 'Our AI agents match you with the right job or candidate in minutes'
  },
  {
    icon: Briefcase,
    title: 'Personalized Recommendations',
    description: 'Roles or candidates tailored to your requirement, not generic listings'
  },
  {
    icon: Clock,
    title: 'Save Time & Effort',
    description: 'Skip the endless scrolling — the right match comes to you'
  },
  {
    icon: HeadphonesIcon,
    title: 'Priority Support',
    description: 'Dedicated support team for every requirement you post'
  }
];

// Custom Select Component
interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  disabled = false, 
  error,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);
  
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen) {
          onChange(options[highlightedIndex].value);
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => (prev + 1) % options.length);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => (prev - 1 + options.length) % options.length);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
    >
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none flex items-center justify-between
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
            : isOpen 
              ? 'border-[var(--color-primary-600)] ring-4 ring-[var(--color-primary-600)]/10' 
              : 'border-[var(--color-gray-200)] hover:border-[var(--color-gray-300)] focus:border-[var(--color-primary-600)] focus:ring-4 focus:ring-[var(--color-primary-600)]/10'
          }
          ${disabled ? 'bg-[var(--color-gray-100)]' : 'bg-white'}
        `}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {icon && <span className="text-[var(--color-gray-400)] flex-shrink-0">{icon}</span>}
          <span className={`truncate ${selectedOption?.value ? 'text-[var(--color-gray-900)]' : 'text-[var(--color-gray-400)]'}`}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-[var(--color-gray-400)] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl border border-[var(--color-gray-200)] shadow-xl max-h-60 overflow-auto animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option, index) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`
                px-4 py-3 cursor-pointer transition-colors duration-150 flex items-center justify-between
                ${index === highlightedIndex ? 'bg-[var(--color-primary-50)]' : 'hover:bg-[var(--color-gray-50)]'}
                ${option.value === value ? 'bg-[var(--color-primary-50)]' : ''}
                ${index !== options.length - 1 ? 'border-b border-[var(--color-gray-100)]' : ''}
              `}
            >
              <span className={`${option.value === value ? 'font-medium text-[var(--color-primary-700)]' : 'text-[var(--color-gray-700)]'}`}>
                {option.label}
              </span>
              {option.value === value && (
                <CheckCircle2 className="w-4 h-4 text-[var(--color-primary-600)] flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-red-500" />
          {error}
        </p>
      )}
    </div>
  );
};

export default function AddJobRequirementPage() {
  const [formData, setFormData] = useState<FormData>({
    requirementType: 'hiring',
    jobType: '',
    jobRole: '',
    city: '',
    location: '',
    minSalary: '',
    maxSalary: '',
    name: '',
    contactNumber: '',
    email: '',
    description: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
 // Reset role ONLY when jobType changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      jobRole: '',
    
    }));
  }, [formData.jobType]);
// Reset location ONLY when city changes
useEffect(() => {
  setFormData(prev => ({
    ...prev,
    location: ''
  }));
}, [formData.city]);
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.jobType) {
      newErrors.jobType = 'Please select a job type';
    }
    if (!formData.jobRole) {
      newErrors.jobRole = 'Please select a role';
    }
    if (!formData.city) {
      newErrors.city = 'Please select a city';
    }
    if (!formData.location) {
      newErrors.location = 'Please select a location';
    }
    if (!formData.minSalary || !formData.maxSalary) {
      newErrors.salary = 'Please enter both min and max salary';
    } else if (parseInt(formData.minSalary) > parseInt(formData.maxSalary)) {
      newErrors.salary = 'Min salary cannot be greater than max salary';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const res = await fetch("/api/requirements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    setSubmitSuccess(true);
    //Show popup instead of just state
setShowPopup(true);



    setFormData({
      requirementType: 'hiring',
      jobType: '',
      jobRole: '',
      city: '',
      location: '',
      minSalary: '',
      maxSalary: '',
      name: '',
      contactNumber: '',
      email: '',
      description: ''
    });

  } catch (error: any) {
    console.log(error.message);
  } finally {
    setIsSubmitting(false);
  }
};

  const inputClasses = (hasError: boolean) => `
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
    ${hasError 
      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
      : 'border-[var(--color-gray-200)] focus:border-[var(--color-primary-600)] focus:ring-4 focus:ring-[var(--color-primary-600)]/10'
    }
    bg-white text-[var(--color-gray-900)] placeholder-[var(--color-gray-400)]
    hover:border-[var(--color-gray-300)]
  `;

  return (
    <>
    <div className="min-h-screen bg-[var(--color-gray-50)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--color-gray-200)] sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-600)] flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--color-gray-900)]">Post a Job Requirement</h1>
              <p className="text-sm text-[var(--color-gray-500)]">Tell WorkByHome who you're hiring, or what job you're looking for</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--color-gray-500)]">
            <CheckCircle2 className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span>Free to post</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          
          {/* Left Column - Form */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[var(--color-gray-200)] overflow-hidden">
              
              {submitSuccess && (
                <div className="bg-[var(--color-primary-50)] border-b border-[var(--color-primary-100)] p-6 animate-in slide-in-from-top-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--color-primary-900)]">Requirement Posted Successfully!</h3>
                      <p className="text-[var(--color-primary-700)]">Our team will contact you shortly with matching jobs or candidates.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-8">
                
                {/* Section 1: Requirement Type */}
                <section>
                  <h2 className="text-lg font-semibold text-[var(--color-gray-900)] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center text-sm font-bold">1</span>
                    Requirement Type
                  </h2>
                  
                  <div className="flex gap-4">
                    <label 
                      className={`
                        flex-1 relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200
                        ${formData.requirementType === 'hiring' 
                          ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)] shadow-md' 
                          : 'border-[var(--color-gray-200)] bg-white hover:border-[var(--color-gray-300)]'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="requirementType"
                        value="hiring"
                        checked={formData.requirementType === 'hiring'}
                        onChange={(e) => handleInputChange('requirementType', e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-center gap-2">
                        <span className={`font-semibold ${formData.requirementType === 'hiring' ? 'text-[var(--color-primary-900)]' : 'text-[var(--color-gray-700)]'}`}>
                          Hiring Talent
                        </span>
                      </div>
                      {formData.requirementType === 'hiring' && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="w-5 h-5 text-[var(--color-primary-600)]" />
                        </div>
                      )}
                    </label>

                    <label 
                      className={`
                        flex-1 relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200
                        ${formData.requirementType === 'seeking' 
                          ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)] shadow-md' 
                          : 'border-[var(--color-gray-200)] bg-white hover:border-[var(--color-gray-300)]'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="requirementType"
                        value="seeking"
                        checked={formData.requirementType === 'seeking'}
                        onChange={(e) => handleInputChange('requirementType', e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-center gap-2">
                        <span className={`font-semibold ${formData.requirementType === 'seeking' ? 'text-[var(--color-primary-900)]' : 'text-[var(--color-gray-700)]'}`}>
                          Looking for a Job
                        </span>
                      </div>
                      {formData.requirementType === 'seeking' && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="w-5 h-5 text-[var(--color-primary-600)]" />
                        </div>
                      )}
                    </label>
                  </div>
                </section>

                {/* Section 2: Job Details */}
                <section>
                  <h2 className="text-lg font-semibold text-[var(--color-gray-900)] mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center text-sm font-bold">2</span>
                    Job Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Job Type - Custom Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                        Job Type <span className="text-red-500">*</span>
                      </label>
                      <CustomSelect
                        value={formData.jobType}
                        onChange={(value) => handleInputChange('jobType', value)}
                        options={jobTypes}
                        placeholder="Choose job type"
                        error={errors.jobType}
                      />
                    </div>

                    {/* Job Role - Custom Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                        Role <span className="text-red-500">*</span>
                      </label>
                      <CustomSelect
                        value={formData.jobRole}
                        onChange={(value) => handleInputChange('jobRole', value)}
                        options={jobRoles[formData.jobType] || jobRoles['']}
                        placeholder={formData.jobType ? "Choose role" : "Select job type first"}
                        disabled={!formData.jobType}
                        error={errors.jobRole}
                      />
                    </div>

                    {/* City - Custom Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <CustomSelect
                        value={formData.city}
                        onChange={(value) => handleInputChange('city', value)}
                        options={cities}
                        placeholder="Select city"
                        error={errors.city}
                        icon={<MapPin className="w-4 h-4" />}
                      />
                    </div>

                    {/* Location - Custom Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                        Location / Area <span className="text-red-500">*</span>
                      </label>
                      <CustomSelect
                        value={formData.location}
                        onChange={(value) => handleInputChange('location', value)}
                        options={locations[formData.city] || locations['']}
                        placeholder={formData.city ? "Choose location" : "Select city first"}
                        disabled={!formData.city}
                        error={errors.location}
                        icon={<MapPin className="w-4 h-4" />}
                      />
                    </div>
                  </div>
                </section>

                {/* Section 3: Salary */}
                <section>
                  <h2 className="text-lg font-semibold text-[var(--color-gray-900)] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center text-sm font-bold">3</span>
                    Salary Range (₹ / month)
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                        Min Salary <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-gray-400)] font-medium">₹</span>
                        <input
                          type="number"
                          placeholder="30,000"
                          value={formData.minSalary}
                          onChange={(e) => handleInputChange('minSalary', e.target.value)}
                          className={`${inputClasses(!!errors.salary)} pl-8`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                        Max Salary <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-gray-400)] font-medium">₹</span>
                        <input
                          type="number"
                          placeholder="80,000"
                          value={formData.maxSalary}
                          onChange={(e) => handleInputChange('maxSalary', e.target.value)}
                          className={`${inputClasses(!!errors.salary)} pl-8`}
                        />
                      </div>
                    </div>
                  </div>
                  {errors.salary && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-500" />
                      {errors.salary}
                    </p>
                  )}
                </section>

                {/* Section 4: Contact Details */}
                <section>
                  <h2 className="text-lg font-semibold text-[var(--color-gray-900)] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center text-sm font-bold">4</span>
                    Your Contact Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`${inputClasses(!!errors.name)} pl-10`}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-red-500" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
                        <input
                          type="tel"
                          placeholder="10-digit number"
                          value={formData.contactNumber}
                          onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                          className={`${inputClasses(!!errors.contactNumber)} pl-10`}
                        />
                      </div>
                      {errors.contactNumber && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-red-500" />
                          {errors.contactNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`${inputClasses(!!errors.email)} pl-10`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-red-500" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Section 5: Description */}
                <section>
                  <h2 className="text-lg font-semibold text-[var(--color-gray-900)] mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center text-sm font-bold">5</span>
                    Additional Details
                  </h2>

                  <div className="relative">
                    <textarea
                      rows={4}
                      placeholder="Describe any specific requirements (e.g., years of experience, must-have skills, availability, notice period...)"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className={`${inputClasses(false)} resize-none`}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-[var(--color-gray-400)] bg-white px-2 py-1 rounded">
                      Optional
                    </div>
                  </div>
                </section>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      w-full sm:w-auto sm:min-w-[200px] px-8 py-4 rounded-xl font-semibold text-white
                      transition-all duration-200 flex items-center justify-center gap-2
                      ${isSubmitting 
                        ? 'bg-[var(--color-gray-400)] cursor-not-allowed' 
                        : 'bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] active:scale-[0.98] shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Posting Requirement...
                      </>
                    ) : (
                      <>
                        Post Job Requirement
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                    By posting, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Benefits */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              
              {/* Benefits Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-gray-200)] p-6">
                <h3 className="text-xl font-bold text-[var(--color-gray-900)] mb-6 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-50)] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[var(--color-primary-600)]" />
                  </div>
                  Why Post on WorkByHome?
                </h3>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex gap-4 p-3 rounded-xl transition-all duration-200 hover:bg-[var(--color-gray-50)] group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-50)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-primary-100)] transition-colors">
                        <benefit.icon className="w-5 h-5 text-[var(--color-primary-600)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--color-gray-900)] text-sm mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-[var(--color-gray-500)] leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-[var(--color-gray-200)] grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-xl bg-[var(--color-primary-50)]">
                    <div className="text-2xl font-bold text-[var(--color-primary-600)]">3k+</div>
                    <div className="text-xs text-[var(--color-primary-700)]">Requirements Matched</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-[var(--color-primary-50)]">
                    <div className="text-2xl font-bold text-[var(--color-primary-600)]">48h</div>
                    <div className="text-xs text-[var(--color-primary-700)]">Avg. Response Time</div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-700)] rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-white/90" />
                  <h4 className="font-bold text-lg">Trusted Platform</h4>
                </div>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  Join thousands of professionals and companies finding their perfect match through WorkByHome's verified network.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>100% Free to Post</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
    <RequirementSuccessPopup
  isOpen={showPopup}
  onClose={() => setShowPopup(false)}
/>
    </>
  );
}