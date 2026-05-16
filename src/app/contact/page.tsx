"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Building2,
  Activity,
  Menu,
  ChevronDown,
  X,
  ArrowRight,
  User,
  Briefcase,
  Globe,
  
  Headphones,
  Zap,
  Shield,
  Users,
  Sparkles,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";

// ─── Types ─────────────────────────────────────────────────────────────

type InquiryType = "sales" | "support" | "partnership" | "general" | "careers";
type PriorityType = "low" | "medium" | "high" | "urgent";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: InquiryType;
  priority: PriorityType;
  subject: string;
  message: string;
  preferredContact: "email" | "phone";
  newsletter: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────

const INQUIRY_TYPES: { value: InquiryType; label: string; icon: React.ReactNode; description: string }[] = [
  {
    value: "sales",
    label: "Sales",
    icon: <Zap size={20} />,
    description: "Talk to our sales team about pricing and plans",
  },
  {
    value: "support",
    label: "Support",
    icon: <Headphones size={20} />,
    description: "Get help with technical issues or account questions",
  },
  {
    value: "partnership",
    label: "Partnership",
    icon: <Users size={20} />,
    description: "Explore integration and partnership opportunities",
  },
  {
    value: "general",
    label: "General",
    icon: <MessageSquare size={20} />,
    description: "General questions and feedback",
  },
  {
    value: "careers",
    label: "Careers",
    icon: <Briefcase size={20} />,
    description: "Join our team - view open positions",
  },
];

const FAQS: FAQItem[] = [
  {
    question: "How quickly can I get started with WorkForce?",
    answer: "You can get started in under 5 minutes. Simply sign up for a free trial, import your employee data via CSV or API, and begin managing your workforce immediately. Our onboarding team is available to help with enterprise deployments.",
    category: "Getting Started",
  },
  {
    question: "What integrations does WorkForce support?",
    answer: "WorkForce integrates with 100+ popular tools including Slack, Microsoft Teams, Google Workspace, Salesforce, QuickBooks, ADP, BambooHR, and major payroll providers. We also offer a robust API for custom integrations.",
    category: "Integrations",
  },
  {
    question: "Is my data secure with WorkForce?",
    answer: "Absolutely. WorkForce is SOC 2 Type II certified, GDPR compliant, and uses AES-256 encryption at rest with TLS 1.3 in transit. We perform regular third-party security audits and maintain 99.99% uptime SLA.",
    category: "Security",
  },
  {
    question: "Do you offer custom enterprise plans?",
    answer: "Yes, we offer tailored enterprise solutions for organizations with 500+ employees. This includes dedicated account management, custom feature development, SLA guarantees, and on-premise deployment options.",
    category: "Pricing",
  },
  {
    question: "How does the AI-powered analytics work?",
    answer: "Our AI engine analyzes patterns in your workforce data to predict turnover risk, identify performance trends, and recommend optimal team structures. All insights are explainable and comply with fairness standards.",
    category: "Features",
  },
  {
    question: "Can I migrate from my existing HR system?",
    answer: "Yes, we provide free migration assistance from all major HR platforms including Workday, SAP SuccessFactors, and BambooHR. Our team handles data mapping, validation, and ensures zero downtime during transition.",
    category: "Migration",
  },
];

const OFFICE_LOCATIONS = [
  {
    city: "San Francisco",
    address: "555 Market Street, Suite 1200",
    phone: "+1 (415) 555-0100",
    timezone: "PST (UTC-8)",
    image: "SF",
  },
  {
    city: "New York",
    address: "350 Fifth Avenue, Floor 42",
    phone: "+1 (212) 555-0200",
    timezone: "EST (UTC-5)",
    image: "NY",
  },
  {
    city: "London",
    address: "100 Bishopsgate, Level 25",
    phone: "+44 20 7946 0958",
    timezone: "GMT (UTC+0)",
    image: "LD",
  },
];

// ─── Main Component ──────────────────────────────────────────────────

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "general",
    priority: "medium",
    subject: "",
    message: "",
    preferredContact: "email",
    newsletter: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryType>("general");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // ─── Handlers ────────────────────────────────────────────────────────

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "message") {
      setCharCount(value.length);
    }
  };

  const handleInquirySelect = (type: InquiryType) => {
    setSelectedInquiry(type);
    setFormData((prev) => ({ ...prev, inquiryType: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        inquiryType: "general",
        priority: "medium",
        subject: "",
        message: "",
        preferredContact: "email",
        newsletter: false,
      });
      setCharCount(0);
      setSelectedInquiry("general");
    }, 5000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // ─── Render ──────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                <Building2 className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">
                  WorkForce
                </h1>
                <p className="text-xs text-slate-500">Contact Us</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                <Phone size={20} />
              </button>
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50 relative">
                <Activity size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-semibold text-slate-900">Support Team</p>
                  <p className="text-xs text-slate-500">Online Now</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-sm">
                  ST
                </div>
              </div>
            </div>

            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
            <p className="text-sm font-semibold text-slate-900">Support Team</p>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              Online Now
            </p>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Sparkles size={14} />
                <span>We typically respond within 2 hours</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Let&apos;s Start a Conversation
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                Whether you have questions about our platform, need technical support, or want to explore partnership opportunities, our team is here to help you succeed.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-100">
                  <Phone size={18} />
                  <span className="font-medium">+1 (800) 555-0199</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <Mail size={18} />
                  <span className="font-medium">hello@workforce.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 -mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ContactMethodCard
                icon={<MessageSquare size={24} />}
                title="Live Chat"
                description="Chat with our support team in real-time. Average response time under 2 minutes."
                action="Start Chat"
                color="blue"
                badge="Popular"
              />
              <ContactMethodCard
                icon={<Mail size={24} />}
                title="Email Support"
                description="Send us a detailed message and we'll respond within 2 business hours."
                action="Send Email"
                color="emerald"
              />
              <ContactMethodCard
                icon={<Phone size={24} />}
                title="Phone Support"
                description="Speak directly with our team. Available Mon-Fri, 9AM-6PM EST."
                action="Call Now"
                color="purple"
                badge="Enterprise"
              />
            </div>
          </div>
        </section>

        {/* Main Form Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Left Content */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Send us a Message
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Fill out the form and our team will get back to you as soon as possible. For urgent matters, please use live chat or call us directly.
                </p>

                {/* Inquiry Type Selector */}
                <div className="space-y-3 mb-8">
                  <label className="text-sm font-semibold text-slate-700">
                    What can we help you with?
                  </label>
                  <div className="space-y-2">
                    {INQUIRY_TYPES.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handleInquirySelect(type.value)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                          selectedInquiry === type.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            selectedInquiry === type.value
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {type.icon}
                        </div>
                        <div>
                          <p
                            className={`font-semibold text-sm ${
                              selectedInquiry === type.value
                                ? "text-blue-900"
                                : "text-slate-900"
                            }`}
                          >
                            {type.label}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {type.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-slate-900">Other Ways to Reach Us</h3>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Email</p>
                      <p className="text-sm text-slate-500">hello@workforce.com</p>
                      <p className="text-sm text-slate-500">support@workforce.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Phone</p>
                      <p className="text-sm text-slate-500">+1 (800) 555-0199</p>
                      <p className="text-xs text-slate-400 mt-0.5">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Headquarters</p>
                      <p className="text-sm text-slate-500">555 Market Street</p>
                      <p className="text-sm text-slate-500">San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
                  {isSubmitted ? (
                    <SuccessMessage />
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="First Name" required>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="John"
                          />
                        </FormField>
                        <FormField label="Last Name" required>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="Doe"
                          />
                        </FormField>
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Email Address" required>
                          <div className="relative">
                            <Mail
                              size={16}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                              placeholder="john@company.com"
                            />
                          </div>
                        </FormField>
                        <FormField label="Phone Number">
                          <div className="relative">
                            <Phone
                              size={16}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                        </FormField>
                      </div>

                      {/* Company & Priority */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Company">
                          <div className="relative">
                            <Building2
                              size={16}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                              placeholder="Acme Inc."
                            />
                          </div>
                        </FormField>
                        <FormField label="Priority">
                          <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                          >
                            <option value="low">Low - General inquiry</option>
                            <option value="medium">Medium - Need assistance</option>
                            <option value="high">High - Important issue</option>
                            <option value="urgent">Urgent - Critical problem</option>
                          </select>
                        </FormField>
                      </div>

                      {/* Subject */}
                      <FormField label="Subject" required>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          placeholder="How can we help you?"
                        />
                      </FormField>

                      {/* Message */}
                      <FormField label="Message" required>
                        <div className="relative">
                          <textarea
                            ref={messageRef}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={5}
                            maxLength={2000}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                            placeholder="Please describe your question or issue in detail..."
                          />
                          <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                            {charCount}/2000
                          </div>
                        </div>
                      </FormField>

                      {/* Preferred Contact & Newsletter */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <label className="text-sm font-medium text-slate-700">
                            Preferred contact:
                          </label>
                          <div className="flex gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="preferredContact"
                                value="email"
                                checked={formData.preferredContact === "email"}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                              />
                              <span className="text-sm text-slate-600">Email</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="preferredContact"
                                value="phone"
                                checked={formData.preferredContact === "phone"}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                              />
                              <span className="text-sm text-slate-600">Phone</span>
                            </label>
                          </div>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="newsletter"
                            checked={formData.newsletter}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-600">
                            Subscribe to newsletter
                          </span>
                        </label>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm shadow-blue-200"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-xs text-slate-400 text-center">
                        By submitting this form, you agree to our Privacy Policy and Terms of Service.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Offices</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Visit us at one of our global locations. We&apos;d love to meet you in person.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OFFICE_LOCATIONS.map((office) => (
                <div
                  key={office.city}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-40 bg-blue-600 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-700/20" />
                    <div className="text-white/30 text-6xl font-bold">
                      {office.image}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {office.city}
                    </h3>
                    <div className="space-y-2 text-sm text-slate-500">
                      <p className="flex items-start gap-2">
                        <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                        {office.address}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={16} className="text-slate-400 shrink-0" />
                        {office.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={16} className="text-slate-400 shrink-0" />
                        {office.timezone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-500">
                Find quick answers to common questions. Can&apos;t find what you&apos;re looking for? Reach out to our team.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                        {faq.category}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 transition-transform ${
                        openFaqIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-slate-600 leading-relaxed pl-[calc(3.5rem+4px)]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Connect With Us
                </h3>
                <p className="text-sm text-slate-500">
                  Follow us for the latest updates, tips, and industry insights
                </p>
              </div>
              <div className="flex gap-3">
                <SocialButton icon={<FaLinkedin size={20} />} label="LinkedIn" />
                <SocialButton icon={<FaTwitter size={20} />} label="Twitter" />
                <SocialButton icon={<FaFacebook size={20} />} label="Facebook" />
                <SocialButton icon={<FaInstagram size={20} />} label="Instagram" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ─── Sub-Components ────────────────────────────────────────────────────

function ContactMethodCard({
  icon,
  title,
  description,
  action,
  color,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  color: "blue" | "emerald" | "purple";
  badge?: string;
}) {
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700 shadow-blue-200",
    emerald: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
    purple: "bg-purple-600 hover:bg-purple-700 shadow-purple-200",
  };

  const iconColors = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow relative">
      {badge && (
        <span className="absolute -top-3 right-4 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
          {badge}
        </span>
      )}
      <div className={`w-12 h-12 rounded-xl ${iconColors[color]} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{description}</p>
      <button className={`w-full py-2.5 text-white font-medium rounded-lg transition-colors shadow-sm ${colors[color]}`}>
        {action}
      </button>
    </div>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function SuccessMessage() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={40} />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">
        Message Sent Successfully!
      </h3>
      <p className="text-slate-500 max-w-md mx-auto mb-6">
        Thank you for reaching out. Our team has received your message and will respond within 2 hours during business hours.
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
        <Clock size={16} />
        Expected response: Under 2 hours
      </div>
    </div>
  );
}

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all"
      title={label}
    >
      {icon}
    </button>
  );
}