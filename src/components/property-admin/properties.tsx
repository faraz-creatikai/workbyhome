
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Upload,
  Bed,
  Bath,
  Square,
  MapPin,
  DollarSign,
  Home,
  ChevronDown,
  Check,
  Image as ImageIcon,
  Eye,
  Filter,
  MoreVertical,
  Save,
  Key,
  TrendingUp,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {PropertyFormSchema, PropertyFormData, validateField, validateForm  } from '../../../lib/validation';
import ProtectedRoute from '@/utils/ProtectedRoute';


// Types
interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'House' | 'Apartment' | 'Condo' | 'Villa' | 'Townhouse';
  status: 'For Sale' | 'For Rent' | 'Draft' | 'Sold';
  image: string;
  images: string[];
  description: string;
  features: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  yearBuilt: number;
  garage: number;
  lotSize: string;
  pricePerSqft: number;
  createdAt: string;
  views: number;
}

// API Types
interface ApiProperty {
  id: string;
  propertyName: string;
  Adderess: string;
  Price: number;
  Area: string;
  PropertySubType: string;
  Verified: string;
  PropertyImage: string[];
  Description: string;
  Features: string;
  AgentInfo: string;
  AgentImage: string[];
  PropertyYear: string;
  ListingType?: string;
  Campaign?: string;
  views?: number;
  createdAt?: string;
}

// Constants for valid values
const VALID_PROPERTY_TYPES = ['House', 'Apartment', 'Condo', 'Villa', 'Townhouse'] as const;
const VALID_STATUSES = ['For Sale', 'For Rent', 'Draft', 'Sold'] as const;

type PropertyType = typeof VALID_PROPERTY_TYPES[number];
type PropertyStatus = typeof VALID_STATUSES[number];

// Validation helpers
const validateType = (type: string): PropertyType => {
  const trimmed = type?.trim();
    if (!trimmed) return 'House'; 
  return VALID_PROPERTY_TYPES.includes(trimmed as PropertyType) 
    ? (trimmed as PropertyType) 
    : 'House';
};

const validateStatus = (status: string): PropertyStatus => {
  if (!status) return 'Draft';  // Add null check
  
  const normalized = status.toLowerCase().trim();
  
  // Handle various API formats
  if (normalized === 'for rent' || normalized === 'rent') return 'For Rent';
  if (normalized === 'for sale' || normalized === 'sale') return 'For Sale';
  if (normalized === 'sold') return 'Sold';
  if (normalized === 'draft') return 'Draft';
  
  // Fallback to strict check
  return VALID_STATUSES.includes(status as PropertyStatus) 
    ? (status as PropertyStatus) 
    : 'Draft';  // Default to Draft, not For Sale
};
  
// Custom Select Component
interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, label, icon, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-3 bg-white border rounded-xl text-sm transition-all duration-200 ${
          error 
            ? 'border-red-300 ring-2 ring-red-100' 
            : isOpen 
              ? 'border-[var(--color-primary-500)] ring-2 ring-[var(--color-primary-200)]' 
              : 'border-gray-200 hover:border-[var(--color-primary-400)]'
        }`}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-[var(--color-primary-600)]">{icon}</span>}
          <span className="text-gray-900">{options.find(o => o.value === value)?.label || 'Select...'}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {error && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                  value === option.value ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] font-medium' : 'text-gray-700'
                }`}
              >
                <span>{option.label}</span>
                {value === option.value && <Check className="w-4 h-4 text-[var(--color-primary-600)]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Input Field Component with Validation
interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full ${icon ? 'pl-10' : 'px-4'} pr-4 py-3 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
            error 
              ? 'border-red-300 ring-red-100 focus:ring-red-200' 
              : 'border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-200)]'
          } ${className}`}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

// Textarea Component with Validation
interface ValidatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const ValidatedTextarea: React.FC<ValidatedTextareaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <textarea
        {...props}
        className={`w-full px-4 py-3 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 resize-none ${
          error 
            ? 'border-red-300 ring-red-100 focus:ring-red-200' 
            : 'border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-200)]'
        } ${className}`}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent' | 'draft'>('all');
  const [saving, setSaving] = useState(false);

  // Validation errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Form state
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    address: '',
    price: 0,
    beds: 1,
    baths: 1,
    sqft: 0,
    type: 'House',
    status: 'Draft',
    description: '',
    features: [],
    yearBuilt: new Date().getFullYear(),
    garage: 0,
    lotSize: '',
    images: [],
    agent: { name: '', phone: '', email: '', image: '' }
  });

  const [featureInput, setFeatureInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API Functions
  const fetchProperties = async (): Promise<ApiProperty[]> => {
    const res = await fetch('https://appapi.estateai.in/api/property', { credentials: "include" });
    if (!res.ok) throw new Error('Failed to fetch properties');
    return res.json();
  };

  const createProperty = async (formData: FormData): Promise<ApiProperty> => {
    try {
      const res = await fetch('https://appapi.estateai.in/api/property',{
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }
      return res.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const updateProperty = async (id: string, formData: FormData): Promise<ApiProperty> => {
    const res = await fetch(`https://appapi.estateai.in/api/property/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to update property');
    return res.json();
  };

  const deletePropertyApi = async (id: string): Promise<void> => {
    const res = await fetch(`https://appapi.estateai.in/api/property/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to delete property');
  };

  // Validation Functions
  const validateFormData = (): boolean => {
    const data: PropertyFormData = {
      images: formData.images || [],
      title: formData.title || '',
      address: formData.address || '',
      price: formData.price || 0,
      beds: formData.beds || 0,
      baths: formData.baths || 0,
      sqft: formData.sqft || 0,
      type: (formData.type as any) || 'House',
      status: (formData.status as any) || 'Draft',
      description: formData.description || '',
      yearBuilt: formData.yearBuilt || new Date().getFullYear(),
      garage: formData.garage || 0,
      lotSize: formData.lotSize,
      features: formData.features || [],
      agent: {
        name: formData.agent?.name || '',
        phone: formData.agent?.phone || '',
        email: formData.agent?.email || '',
        image: formData.agent?.image
      }
    };

    const result = validateForm(data);
    setErrors(result.errors);
    return result.success;
  };

  const validateSingleField = (field: keyof PropertyFormData, value: any) => {
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error || ''
    }));
  };

  const handleFieldChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Real-time validation for touched fields
    if (touched[field]) {
      validateSingleField(field, value);
    }
  };

  const handleAgentFieldChange = (field: keyof PropertyFormData['agent'], value: string) => {
    const newAgent = { ...formData.agent!, [field]: value };
    setFormData(prev => ({ ...prev, agent: newAgent }));
    setTouched(prev => ({ ...prev, 'agent': true }));
    
    if (touched['agent']) {
      validateSingleField('agent', newAgent);
    }
  };

  // Data Mapping
  const extractNumber = (features: string[], keyword: string): number => {
    if (!Array.isArray(features)) return 0;
    const item = features.find((f: string) => typeof f === 'string' && f.includes(keyword));
    return item ? parseInt(item.match(/\d+/)?.[0] || '0') : 0;
  };

  const parseJSON = (str: string | null | undefined, fallback: any = []) => {
    if (!str) return fallback;
    try {
      return JSON.parse(str);
    } catch {
      return fallback;
    }
  };

  const mapApiToProperty = (item: ApiProperty): Property | null => {
    console.log('API Item raw:', {
    id: item.id,
    Status: item.Campaign,
    ListingType: item.ListingType,
    Verified: item.Verified
  });
    try {
      const agent = parseJSON(item.AgentInfo, {});
      const features = parseJSON(item.Features, []);
      const images = Array.isArray(item.PropertyImage) ? item.PropertyImage : [];

      if (!item.id || !item.propertyName) {
        console.warn('Skipping property - missing required fields:', item.id);
        return null;
      }

      const beds = extractNumber(features, 'Bedrooms');
      const baths = extractNumber(features, 'Bathrooms');
      const sqft = parseInt(item.Area) || 0;
      const price = parseInt(item.Price as any) || 0;
      
      const getApiStatus = (item: ApiProperty): PropertyStatus => {
        if (item.Campaign) {
          return validateStatus(item.Campaign);
        }
        if (item.ListingType) {
          if (item.ListingType.toLowerCase() === 'rent') return 'For Rent';
          if (item.ListingType.toLowerCase() === 'sale') return 'For Sale';
        }
        return item.Verified === 'Yes' ? 'For Sale' : 'Draft';
      };

      const apiStatus = getApiStatus(item);

      return {
        id: String(item.id),
        title: item.propertyName?.trim() || 'Untitled Property',
        address: item.Adderess?.trim() || 'Address not available',
        price: price,
        beds: beds,
        baths: baths,
        sqft: sqft,
        type: validateType(item.PropertySubType),
        status: apiStatus,
        image: images[0] || 'https://via.placeholder.com/800x600',
        images: images,
        description: item.Description?.trim() || 'No description available',
        features: features,
        agent: {
          name: agent.name || 'EstateAI Agent',
          phone: agent.phone || '+1 (555) 000-0000',
          email: agent.email || 'contact@estateai.com',
          image: agent.image || images[0]
        },
        yearBuilt: parseInt(item.PropertyYear) || new Date().getFullYear(),
        garage: 0,
        lotSize: 'N/A',
        pricePerSqft: sqft > 0 ? Math.round(price / sqft) : 0,
        createdAt: item.createdAt || new Date().toISOString().split('T')[0],
        views: item.views || 0
      };
    } catch (error) {
      console.error('Error mapping property:', error, item);
      return null;
    }
  };

  const mapPropertyToApiFormData = (data: Partial<Property>, files: File[] = []): FormData => {
    const formData = new FormData();
    
    // Add text fields - match your backend API expected fields
    formData.append('propertyName', data.title || '');
    formData.append('Adderess', data.address || '');
    formData.append('Price', String(data.price || 0));
    formData.append('Area', String(data.sqft || 0));
    formData.append('PropertySubType', data.type || 'House');
    formData.append('Description', data.description || '');
    formData.append('PropertyYear', String(data.yearBuilt || new Date().getFullYear()));
    formData.append('Verified', data.status === 'For Sale' ? 'Yes' : 'No');

    const campaignValue = data.status === 'Draft' ? 'draft' : 
                        data.status === 'For Sale' ? 'for sale' : 
                        data.status === 'For Rent' ? 'for rent' : 
                        data.status === 'Sold' ? 'sold' : 'draft';
    formData.append('Campaign', campaignValue);
    formData.append('ContactNumber', data.agent?.phone || '+1 (555) 000-0000');
    
    // Add features as JSON string
    const features = data.features || [];
    if (data.beds && !features.some((f: string) => f.includes('Bedrooms'))) {
      features.push(`${data.beds} Bedrooms`);
    }
    if (data.baths && !features.some((f: string) => f.includes('Bathrooms'))) {
      features.push(`${data.baths} Bathrooms`);
    }
    formData.append('Features', JSON.stringify(features));
    
    // Add agent info as JSON string
    const agentInfo = {
      name: data.agent?.name || '',
      phone: data.agent?.phone || '',
      email: data.agent?.email || '',
      image: data.agent?.image || ''
    };
    formData.append('AgentInfo', JSON.stringify(agentInfo));
    
    // Handle images - existing URLs vs new file uploads
    const existingImages = data.images?.filter(img => !img.startsWith('blob:')) || [];
    
    // If there are existing images, send them as JSON
    if (existingImages.length > 0) {
      formData.append('PropertyImage', JSON.stringify(existingImages));
    }
    
    // If there are new file uploads, send them with the field name backend expects
    files.forEach((file, index) => {
      formData.append('PropertyImage', file);
    });
    
    return formData;
  };

  // Load Data
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const apiData = await fetchProperties();
      const propertiesArray = Array.isArray(apiData) ? apiData : [];
      const mapped = propertiesArray
        .map(mapApiToProperty)
        .filter((p): p is Property => p !== null);
      setProperties(mapped);
    } catch (error) {
      console.error('Failed to load properties:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter properties
  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesType = typeFilter === 'All' || p.type === typeFilter;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'sale' && p.status === 'For Sale') ||
                      (activeTab === 'rent' && p.status === 'For Rent') ||
                      (activeTab === 'draft' && p.status === 'Draft');
    return matchesSearch && matchesStatus && matchesType && matchesTab;
  });

  // Stats
  const stats = {
    total: properties.length,
    forSale: properties.filter(p => p.status === 'For Sale').length,
    forRent: properties.filter(p => p.status === 'For Rent').length,
    draft: properties.filter(p => p.status === 'Draft').length,
    sold: properties.filter(p => p.status === 'Sold').length,
    totalViews: properties.reduce((acc, p) => acc + p.views, 0)
  };

  const openAddModal = () => {
    setEditingProperty(null);
    setFormData({
      title: '',
      address: '',
      price: 0,
      beds: 1,
      baths: 1,
      sqft: 0,
      type: 'House',
      status: 'Draft',
      description: '',
      features: [],
      yearBuilt: new Date().getFullYear(),
      garage: 0,
      lotSize: '',
      images: [],
      agent: { name: '', phone: '', email: '', image: '' }
    });
    setErrors({});
    setTouched({});
    setIsModalOpen(true);
  };

  const openEditModal = (property: Property) => {
    setEditingProperty(property);
    setFormData({ ...property });
    setErrors({});
    setTouched({});
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => allTouched[key] = true);
    allTouched['agent'] = true;
    setTouched(allTouched);

    // Validate entire form
    if (!validateFormData()) {
      return; // Stop if validation fails
    }

    try {
      setSaving(true);
      
      // Get files from file input if any
      const files = fileInputRef.current?.files ? Array.from(fileInputRef.current.files) : [];
      
      // Convert to FormData
      const apiFormData = mapPropertyToApiFormData(formData, files);
      
      if (editingProperty) {
        // Update existing
        await updateProperty(editingProperty.id, apiFormData);
      } else {
        // Add new
        await createProperty(apiFormData);
      }
      
      // Reload properties
      await loadProperties();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save property:', error);
      alert('Failed to save property. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePropertyApi(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete property:', error);
      alert('Failed to delete property. Please try again.');
    }
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.features?.includes(featureInput.trim())) {
      const newFeatures = [...(formData.features || []), featureInput.trim()];
      setFormData(prev => ({ ...prev, features: newFeatures }));
      setFeatureInput('');
      validateSingleField('features', newFeatures);
    }
  };

  const removeFeature = (feature: string) => {
    const newFeatures = formData.features?.filter(f => f !== feature) || [];
    setFormData(prev => ({ ...prev, features: newFeatures }));
    validateSingleField('features', newFeatures);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      const updatedImages = [...(formData.images || []), ...newImages];
      setFormData(prev => ({ ...prev, images: updatedImages }));
      validateSingleField('images', updatedImages);
    }
  };

  const formatPrice = (price: number, status: string) => {
    if (status === 'For Rent') return `$${price.toLocaleString()}/mo`;
    return `$${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'For Sale': return 'bg-green-100 text-green-700 border-green-200';
      case 'For Rent': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Draft': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Sold': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary-600)]" />
          <span className="text-gray-600 font-medium">Loading properties...</span>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-primary-600)] rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Property Admin</h1>
                <p className="text-xs text-gray-500">Manage your listings</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Search className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-[var(--color-primary-700)]">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Total Properties */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] p-6 rounded-2xl shadow-lg shadow-[var(--color-primary-600)]/20"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-[var(--color-primary-100)] text-sm font-medium mb-1">Total Properties</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
                <p className="text-[var(--color-primary-200)] text-xs mt-1">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Home className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="h-full bg-white/40 w-3/4 rounded-r-full"></div>
            </div>
          </motion.div>

          {/* For Sale */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">For Sale</p>
                <p className="text-3xl font-bold text-gray-900">{stats.forSale}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full">
                    {stats.total > 0 ? Math.round((stats.forSale / stats.total) * 100) : 0}%
                  </span>
                  <span className="text-gray-400 text-xs">of total</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-1 h-1.5 bg-green-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: i < 3 ? '100%' : '60%' }}
                  ></div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* For Rent */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">For Rent</p>
                <p className="text-3xl font-bold text-gray-900">{stats.forRent}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[var(--color-primary-600)] text-xs font-medium bg-[var(--color-primary-50)] px-2 py-0.5 rounded-full">
                    {stats.total > 0 ? Math.round((stats.forRent / stats.total) * 100) : 0}%
                  </span>
                  <span className="text-gray-400 text-xs">of total</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[var(--color-primary-100)] rounded-xl flex items-center justify-center">
                <Key className="w-6 h-6 text-[var(--color-primary-600)]" />
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-1 h-1.5 bg-[var(--color-primary-100)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--color-primary-600)] rounded-full"
                    style={{ width: i < 2 ? '100%' : '40%' }}
                  ></div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Total Views */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-purple-600" />
                  <span className="text-purple-600 text-xs font-medium">+24.5%</span>
                  <span className="text-gray-400 text-xs">this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-end gap-1 h-8">
              {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-purple-200 rounded-t-sm"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs & Actions */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex p-1 bg-gray-100 rounded-xl">
            {[
              { id: 'all', label: 'All', count: stats.total },
              { id: 'sale', label: 'For Sale', count: stats.forSale },
              { id: 'rent', label: 'For Rent', count: stats.forRent },
              { id: 'draft', label: 'Drafts', count: stats.draft }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-[var(--color-primary-600)] shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="flex gap-3 ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] w-64"
              />
            </div>
            <button 
              onClick={openAddModal}
              className="flex items-center gap-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-[var(--color-primary-600)]/20"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <CustomSelect
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'All', label: 'All Status' },
              { value: 'For Sale', label: 'For Sale' },
              { value: 'For Rent', label: 'For Rent' },
              { value: 'Draft', label: 'Draft' },
              { value: 'Sold', label: 'Sold' }
            ]}
          />
          <CustomSelect
            label="Type"
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: 'All', label: 'All Types' },
              { value: 'House', label: 'House' },
              { value: 'Apartment', label: 'Apartment' },
              { value: 'Condo', label: 'Condo' },
              { value: 'Villa', label: 'Villa' },
              { value: 'Townhouse', label: 'Townhouse' }
            ]}
          />
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 w-24 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4  text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stats</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProperties.map((property) => {
                  
                  return(
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={property.image} 
                          alt={property.title}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">{property.title}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">{property.address}</span>
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Bed className="w-3 h-3" /> {property.beds}</span>
                            <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> {property.baths}</span>
                            <span className="flex items-center gap-1"><Square className="w-3 h-3" /> {property.sqft.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {property.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{formatPrice(property.price, property.status)}</p>
                      <p className="text-xs text-gray-500">${property.pricePerSqft.toLocaleString()}/sqft</p>
                    </td>
                    <td className="px-6 py-4 ">
                      <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap  font-medium border ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Eye className="w-4 h-4" />
                        {property.views.toLocaleString()}
                      </div>
                      {/* <p className="text-xs text-gray-400 mt-1">Added {property.createdAt}</p> */}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(property)}
                          className="p-2 text-gray-500 hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm(property.id)}
                          className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>)
                })}
              </tbody>
            </table>
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No properties found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
                      <div className="flex gap-2 flex-wrap mb-3">
                        {formData.images?.map((img, idx) => (
                          <div key={idx} className="relative w-20 h-20">
                            <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                            <button 
                              onClick={() => {
                                const newImages = formData.images?.filter((_, i) => i !== idx) || [];
                                setFormData(prev => ({ ...prev, images: newImages }));
                                validateSingleField('images', newImages);
                              }}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className={`w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
                            errors.images 
                              ? 'border-red-300 text-red-400' 
                              : 'border-gray-300 text-gray-400 hover:border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)]'
                          }`}
                        >
                          <Upload className="w-6 h-6 mb-1" />
                          <span className="text-xs">Upload</span>
                        </button>
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                        />
                      </div>
                      {errors.images && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.images}
                        </p>
                      )}
                    </div>

                    {/* Basic Info */}
                    <ValidatedInput
                      label="Property Title"
                      value={formData.title}
                      onChange={e => handleFieldChange('title', e.target.value)}
                      onBlur={() => {
                        setTouched(prev => ({ ...prev, title: true }));
                        validateSingleField('title', formData.title);
                      }}
                      error={errors.title}
                      placeholder="e.g., Modern Luxury Villa"
                    />

                    <ValidatedInput
                      label="Address"
                      value={formData.address}
                      onChange={e => handleFieldChange('address', e.target.value)}
                      onBlur={() => {
                        setTouched(prev => ({ ...prev, address: true }));
                        validateSingleField('address', formData.address);
                      }}
                      error={errors.address}
                      placeholder="Full address"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <CustomSelect
                        label="Property Type"
                        value={formData.type || 'House'}
                        onChange={v => handleFieldChange('type', v)}
                        options={[
                          { value: 'House', label: 'House' },
                          { value: 'Apartment', label: 'Apartment' },
                          { value: 'Condo', label: 'Condo' },
                          { value: 'Villa', label: 'Villa' },
                          { value: 'Townhouse', label: 'Townhouse' }
                        ]}
                        icon={<Home className="w-4 h-4" />}
                        error={errors.type}
                      />
                      <CustomSelect
                        label="Status"
                        value={formData.status || 'Draft'}
                        onChange={v => handleFieldChange('status', v)}
                        options={[
                          { value: 'Draft', label: 'Draft' },
                          { value: 'For Sale', label: 'For Sale' },
                          { value: 'For Rent', label: 'For Rent' },
                          { value: 'Sold', label: 'Sold' }
                        ]}
                        error={errors.status}
                      />
                    </div>

                    <ValidatedTextarea
                      label="Description"
                      value={formData.description}
                      onChange={e => handleFieldChange('description', e.target.value)}
                      onBlur={() => {
                        setTouched(prev => ({ ...prev, description: true }));
                        validateSingleField('description', formData.description);
                      }}
                      error={errors.description}
                      rows={4}
                      placeholder="Describe the property..."
                    />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Price & Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <ValidatedInput
                        label="Price ($)"
                        type="number"
                        value={formData.price || ''}
                        onChange={e => handleFieldChange('price', parseInt(e.target.value) || 0)}
                        onBlur={() => {
                          setTouched(prev => ({ ...prev, price: true }));
                          validateSingleField('price', formData.price);
                        }}
                        error={errors.price}
                        placeholder="0"
                        icon={<DollarSign className="w-4 h-4" />}
                      />
                      <ValidatedInput
                        label="Square Feet"
                        type="number"
                        value={formData.sqft || ''}
                        onChange={e => handleFieldChange('sqft', parseInt(e.target.value) || 0)}
                        onBlur={() => {
                          setTouched(prev => ({ ...prev, sqft: true }));
                          validateSingleField('sqft', formData.sqft);
                        }}
                        error={errors.sqft}
                        placeholder="0"
                        icon={<Square className="w-4 h-4" />}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <ValidatedInput
                        label="Bedrooms"
                        type="number"
                        value={formData.beds || ''}
                        onChange={e => handleFieldChange('beds', parseInt(e.target.value) || 0)}
                        onBlur={() => {
                          setTouched(prev => ({ ...prev, beds: true }));
                          validateSingleField('beds', formData.beds);
                        }}
                        error={errors.beds}
                        icon={<Bed className="w-4 h-4" />}
                      />
                      <ValidatedInput
                        label="Bathrooms"
                        type="number"
                        value={formData.baths || ''}
                        onChange={e => handleFieldChange('baths', parseInt(e.target.value) || 0)}
                        onBlur={() => {
                          setTouched(prev => ({ ...prev, baths: true }));
                          validateSingleField('baths', formData.baths);
                        }}
                        error={errors.baths}
                        icon={<Bath className="w-4 h-4" />}
                      />
                      <ValidatedInput
                        label="Garage"
                        type="number"
                        value={formData.garage || ''}
                        onChange={e => handleFieldChange('garage', parseInt(e.target.value) || 0)}
                        onBlur={() => {
                          setTouched(prev => ({ ...prev, garage: true }));
                          validateSingleField('garage', formData.garage);
                        }}
                        error={errors.garage}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <ValidatedInput
                        label="Year Built"
                        type="number"
                        value={formData.yearBuilt || ''}
                        onChange={e => handleFieldChange('yearBuilt', parseInt(e.target.value) || new Date().getFullYear())}
                        onBlur={() => {
                          setTouched(prev => ({ ...prev, yearBuilt: true }));
                          validateSingleField('yearBuilt', formData.yearBuilt);
                        }}
                        error={errors.yearBuilt}
                      />
                      <ValidatedInput
                        label="Lot Size"
                        value={formData.lotSize}
                        onChange={e => handleFieldChange('lotSize', e.target.value)}
                        onBlur={() => {
                          setTouched(prev => ({ ...prev, lotSize: true }));
                          validateSingleField('lotSize', formData.lotSize);
                        }}
                        error={errors.lotSize}
                        placeholder="e.g., 0.5 acres"
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={featureInput}
                          onChange={e => setFeatureInput(e.target.value)}
                          onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                          className={`flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                            errors.features 
                              ? 'border-red-300 focus:ring-red-200' 
                              : 'border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-200)]'
                          }`}
                          placeholder="Add feature (e.g., Pool, Gym)"
                        />
                        <button 
                          onClick={addFeature}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      {errors.features && (
                        <p className="mb-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.features}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {formData.features?.map((feature, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] rounded-full text-sm"
                          >
                            {feature}
                            <button onClick={() => removeFeature(feature)} className="hover:text-red-500">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Agent Info */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Agent Information</h3>
                      <div className="space-y-4">
                        <ValidatedInput
                          value={formData.agent?.name}
                          label='agent name'
                          onChange={e => handleAgentFieldChange('name', e.target.value)}
                          onBlur={() => {
                            setTouched(prev => ({ ...prev, 'agent.name': true }));
                            validateSingleField('agent', formData.agent);
                          }}
                          error={errors['agent.name'] || errors['agent']}
                          placeholder="Agent Name"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <ValidatedInput
                            type="tel"
                            label='telephone'
                            value={formData.agent?.phone}
                            onChange={e => handleAgentFieldChange('phone', e.target.value)}
                            onBlur={() => {
                              setTouched(prev => ({ ...prev, 'agent.phone': true }));
                              validateSingleField('agent', formData.agent);
                            }}
                            error={errors['agent.phone']}
                            placeholder="Phone"
                          />
                          <ValidatedInput
                            type="email"
                            label='email'
                            value={formData.agent?.email}
                            onChange={e => handleAgentFieldChange('email', e.target.value)}
                            onBlur={() => {
                              setTouched(prev => ({ ...prev, 'agent.email': true }));
                              validateSingleField('agent', formData.agent);
                            }}
                            error={errors['agent.email']}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="px-6 py-2.5 text-gray-700 hover:bg-gray-200 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-xl font-medium transition-colors shadow-lg disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {editingProperty ? 'Save Changes' : 'Create Property'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Property?</h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to delete this property? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </ProtectedRoute>
  );
}