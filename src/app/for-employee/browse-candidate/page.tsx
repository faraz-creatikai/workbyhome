"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Star, Globe, ChevronDown, ChevronLeft,
  ChevronRight, X, SlidersHorizontal, LayoutGrid, List,
  Filter, ArrowUpDown, CheckCircle2, Sparkles, RefreshCw,
  MessageSquare, Bookmark, BookmarkCheck, Eye, Send,
  Briefcase, DollarSign, Clock, Users, Shield, Code2,
  Palette, BarChart3, Megaphone, Layers, GraduationCap,
  TrendingUp, Award, Zap, Heart, Mail, Phone,  Globe2, ExternalLink, ChevronRight as CR,
  UserCheck, FileText, Building2, Calendar, ArrowRight,
  Flame, Target, BadgeCheck, MoreHorizontal, Download,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

// ─── Types ──────────────────────────────────────────────────────────────────
interface Candidate {
  id: number;
  name: string;
  title: string;
  avatar: string;
  avatarGradient: string;
  location: string;
  timezone: string;
  availability: string;
  availColor: string;
  experience: string;
  category: string;
  skills: string[];
  languages: string[];
  salaryMin: number;
  salaryMax: number;
  workType: string[];
  rating: number;
  reviews: number;
  profileViews: number;
  jobsCompleted: number;
  successRate: number;
  bio: string;
  featured: boolean;
  verified: boolean;
  openToWork: boolean;
  lastActive: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  topProjects: string[];
}

interface FilterCheckProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface CandidateCardProps {
  candidate: Candidate;
  saved: boolean;
  onSave: (id: number) => void;
  onContact: (candidate: Candidate) => void;
  view: "grid" | "list";
  index: number;
}

interface ContactModalProps {
  candidate: Candidate;
  onClose: () => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All Categories", "Engineering & Dev", "Design & Creative", "Data & AI",
  "Marketing & Growth", "Product Management", "Writing & Content",
  "Finance & Accounting", "HR & People Ops", "Customer Success",
  "Operations & PM", "Cybersecurity", "Sales & BD",
];

const EXPERIENCE_LEVELS = ["Junior (1–3 yrs)", "Mid-level (3–5 yrs)", "Senior (5–8 yrs)", "Lead / Principal (8+ yrs)"];
const WORK_TYPES = ["Fully Remote", "Remote-first", "Hybrid", "Contract", "Freelance", "Part-time"];
const AVAILABILITY_FILTERS = ["Immediately", "Within 2 weeks", "Within 1 month", "Open to offers"];
const LANGUAGES_LIST = ["English", "Spanish", "French", "German", "Mandarin", "Hindi", "Portuguese", "Arabic", "Japanese"];
const SORT_OPTIONS = ["Most Relevant", "Recently Active", "Highest Rated", "Most Experienced", "Salary: Low to High", "Salary: High to Low"];
const CANDIDATES_PER_PAGE = 9;

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Engineering & Dev": Code2,
  "Design & Creative": Palette,
  "Data & AI": BarChart3,
  "Marketing & Growth": Megaphone,
  "Product Management": Layers,
  "Writing & Content": FileText,
  "Finance & Accounting": DollarSign,
  "HR & People Ops": Users,
  "Customer Success": Heart,
  "Operations & PM": Target,
  "Cybersecurity": Shield,
  "Sales & BD": TrendingUp,
};

const CATEGORY_COLORS: Record<string, string> = {
  "Engineering & Dev": "text-blue-600 bg-blue-50 border-blue-100",
  "Design & Creative": "text-pink-600 bg-pink-50 border-pink-100",
  "Data & AI": "text-violet-600 bg-violet-50 border-violet-100",
  "Marketing & Growth": "text-orange-600 bg-orange-50 border-orange-100",
  "Product Management": "text-cyan-600 bg-cyan-50 border-cyan-100",
  "Writing & Content": "text-yellow-700 bg-yellow-50 border-yellow-100",
  "Finance & Accounting": "text-green-700 bg-green-50 border-green-100",
  "HR & People Ops": "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100",
  "Customer Success": "text-rose-600 bg-rose-50 border-rose-100",
  "Operations & PM": "text-teal-600 bg-teal-50 border-teal-100",
  "Cybersecurity": "text-slate-700 bg-slate-50 border-slate-200",
  "Sales & BD": "text-emerald-600 bg-emerald-50 border-emerald-100",
};

// ─── Mock Candidates ──────────────────────────────────────────────────────────
const CANDIDATES: Candidate[] = [
  {
    id: 1, name: "Alex Johnson", title: "Senior Frontend Developer",
    avatar: "AJ", avatarGradient: "from-blue-500 to-indigo-600",
    location: "New York, USA", timezone: "EST (UTC-5)",
    availability: "Immediately", availColor: "emerald",
    experience: "Senior (5–8 yrs)", category: "Engineering & Dev",
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS", "AWS"],
    languages: ["English", "Spanish"],
    salaryMin: 120, salaryMax: 160,
    workType: ["Fully Remote", "Contract"],
    rating: 4.9, reviews: 47, profileViews: 312, jobsCompleted: 23, successRate: 97,
    bio: "Senior frontend engineer with 7 years building high-performance web apps. Passionate about UX, design systems, and developer experience. Previously at Google and Stripe.",
    featured: true, verified: true, openToWork: true, lastActive: "2h ago",
    linkedin: "#", github: "#", portfolio: "#",
    topProjects: ["Design system for SaaS platform (50k users)", "Real-time dashboard at Stripe", "Component library with 99% test coverage"],
  },
  {
    id: 2, name: "Priya Sharma", title: "Product Designer (UX/UI)",
    avatar: "PS", avatarGradient: "from-pink-500 to-rose-600",
    location: "London, UK", timezone: "GMT (UTC+0)",
    availability: "Within 2 weeks", availColor: "blue",
    experience: "Mid-level (3–5 yrs)", category: "Design & Creative",
    skills: ["Figma", "Prototyping", "Design Systems", "User Research", "Webflow", "Adobe XD"],
    languages: ["English", "Hindi"],
    salaryMin: 90, salaryMax: 130,
    workType: ["Fully Remote", "Remote-first"],
    rating: 4.8, reviews: 31, profileViews: 198, jobsCompleted: 15, successRate: 94,
    bio: "UX/UI designer who bridges research and beautiful interfaces. 4 years experience across fintech, SaaS, and e-commerce. Advocate for accessibility-first design.",
    featured: true, verified: true, openToWork: true, lastActive: "5h ago",
    linkedin: "#", portfolio: "#",
    topProjects: ["Redesigned onboarding flow (+35% activation)", "Design system for 3 product lines", "Mobile app from 0 to 50k DAU"],
  },
  {
    id: 3, name: "Marcus Williams", title: "ML Engineer & Data Scientist",
    avatar: "MW", avatarGradient: "from-violet-500 to-purple-700",
    location: "Berlin, Germany", timezone: "CET (UTC+1)",
    availability: "Within 1 month", availColor: "amber",
    experience: "Senior (5–8 yrs)", category: "Data & AI",
    skills: ["Python", "PyTorch", "TensorFlow", "MLOps", "SQL", "Spark", "LLMs"],
    languages: ["English", "German"],
    salaryMin: 110, salaryMax: 155,
    workType: ["Fully Remote", "Hybrid"],
    rating: 4.9, reviews: 28, profileViews: 267, jobsCompleted: 19, successRate: 98,
    bio: "ML engineer specializing in NLP and computer vision. Built models deployed to 10M+ users. PhD in Computer Science from TU Berlin. Open-source contributor to HuggingFace.",
    featured: true, verified: true, openToWork: true, lastActive: "1d ago",
    linkedin: "#", github: "#",
    topProjects: ["Deployed NLP model serving 10M+ requests/day", "Reduced inference latency by 60%", "Open-source CV library (2.1k GitHub stars)"],
  },
  {
    id: 4, name: "Sofia García", title: "Growth Marketing Manager",
    avatar: "SG", avatarGradient: "from-orange-400 to-amber-500",
    location: "Barcelona, Spain", timezone: "CET (UTC+1)",
    availability: "Open to offers", availColor: "gray",
    experience: "Mid-level (3–5 yrs)", category: "Marketing & Growth",
    skills: ["SEO", "Google Ads", "Content Strategy", "HubSpot", "Analytics", "Email Marketing"],
    languages: ["English", "Spanish", "French"],
    salaryMin: 65, salaryMax: 100,
    workType: ["Fully Remote", "Remote-first"],
    rating: 4.7, reviews: 22, profileViews: 143, jobsCompleted: 12, successRate: 91,
    bio: "Growth marketer with a track record of scaling SaaS companies from $0 to $10M ARR. Expert in paid acquisition, SEO, and lifecycle marketing. Previously led marketing at two YC-backed startups.",
    featured: false, verified: true, openToWork: true, lastActive: "3h ago",
    linkedin: "#", portfolio: "#",
    topProjects: ["Scaled organic traffic 8x in 12 months", "Built email sequences with 42% open rate", "Led campaigns generating $2.4M pipeline"],
  },
  {
    id: 5, name: "James Chen", title: "Staff Backend Engineer",
    avatar: "JC", avatarGradient: "from-teal-500 to-emerald-600",
    location: "Singapore", timezone: "SGT (UTC+8)",
    availability: "Immediately", availColor: "emerald",
    experience: "Lead / Principal (8+ yrs)", category: "Engineering & Dev",
    skills: ["Go", "Kubernetes", "Distributed Systems", "PostgreSQL", "gRPC", "Terraform"],
    languages: ["English", "Mandarin"],
    salaryMin: 140, salaryMax: 190,
    workType: ["Fully Remote"],
    rating: 4.9, reviews: 38, profileViews: 421, jobsCompleted: 31, successRate: 99,
    bio: "Staff engineer specializing in distributed systems and platform engineering. Built infrastructure serving 500M+ requests/day. Former tech lead at Grab and Shopee.",
    featured: true, verified: true, openToWork: true, lastActive: "30m ago",
    linkedin: "#", github: "#",
    topProjects: ["Built payment infrastructure at Grab (500M+ req/day)", "Led platform migration saving $1.2M/year", "Authored internal distributed tracing system"],
  },
  {
    id: 6, name: "Aisha Okafor", title: "Product Manager (B2B SaaS)",
    avatar: "AO", avatarGradient: "from-cyan-500 to-blue-600",
    location: "Lagos, Nigeria", timezone: "WAT (UTC+1)",
    availability: "Within 2 weeks", availColor: "blue",
    experience: "Senior (5–8 yrs)", category: "Product Management",
    skills: ["Roadmapping", "User Research", "A/B Testing", "Jira", "Analytics", "SQL", "Agile"],
    languages: ["English", "Yoruba"],
    salaryMin: 95, salaryMax: 135,
    workType: ["Fully Remote", "Async-first"],
    rating: 4.8, reviews: 19, profileViews: 156, jobsCompleted: 14, successRate: 93,
    bio: "Product leader with 6 years building B2B SaaS products. Shipped features used by 300+ enterprise customers. Former PM at Intercom and a Sequoia-backed fintech startup.",
    featured: false, verified: true, openToWork: true, lastActive: "6h ago",
    linkedin: "#", portfolio: "#",
    topProjects: ["Shipped reporting dashboard (40% retention lift)", "Led 0→1 mobile product to 50k MAU", "Reduced churn by 22% through lifecycle redesign"],
  },
  {
    id: 7, name: "Ryan Kowalski", title: "DevOps & Platform Engineer",
    avatar: "RK", avatarGradient: "from-slate-600 to-gray-800",
    location: "Warsaw, Poland", timezone: "CET (UTC+1)",
    availability: "Immediately", availColor: "emerald",
    experience: "Senior (5–8 yrs)", category: "Engineering & Dev",
    skills: ["Kubernetes", "Terraform", "AWS", "CI/CD", "Docker", "Python", "Linux"],
    languages: ["English", "Polish"],
    salaryMin: 95, salaryMax: 135,
    workType: ["Fully Remote", "Contract"],
    rating: 4.7, reviews: 25, profileViews: 187, jobsCompleted: 20, successRate: 95,
    bio: "Platform engineer focused on reliability, scalability, and developer experience. Built CI/CD pipelines reducing deploy times from 45min to under 3min. AWS Solutions Architect certified.",
    featured: false, verified: true, openToWork: true, lastActive: "4h ago",
    linkedin: "#", github: "#",
    topProjects: ["Reduced deploy times by 94%", "Zero-downtime Kubernetes migration", "Built self-healing infra for 99.99% uptime"],
  },
  {
    id: 8, name: "Lena Hoffmann", title: "Senior UX Researcher",
    avatar: "LH", avatarGradient: "from-rose-400 to-pink-600",
    location: "Munich, Germany", timezone: "CET (UTC+1)",
    availability: "Within 1 month", availColor: "amber",
    experience: "Senior (5–8 yrs)", category: "Design & Creative",
    skills: ["User Research", "Usability Testing", "Figma", "Survey Design", "Data Analysis", "Workshop Facilitation"],
    languages: ["English", "German", "French"],
    salaryMin: 80, salaryMax: 115,
    workType: ["Fully Remote", "Remote-first", "Hybrid"],
    rating: 4.8, reviews: 16, profileViews: 112, jobsCompleted: 11, successRate: 96,
    bio: "Mixed-methods UX researcher with expertise in enterprise software and consumer products. Have run 200+ user interviews and usability studies. Former researcher at SAP.",
    featured: false, verified: false, openToWork: true, lastActive: "1d ago",
    linkedin: "#", portfolio: "#",
    topProjects: ["Global research program (12 countries)", "Identified insight saving €500k in dev costs", "Established research ops framework for 20+ PMs"],
  },
  {
    id: 9, name: "Tariq Hassan", title: "Full-Stack Engineer",
    avatar: "TH", avatarGradient: "from-amber-500 to-orange-600",
    location: "Dubai, UAE", timezone: "GST (UTC+4)",
    availability: "Immediately", availColor: "emerald",
    experience: "Mid-level (3–5 yrs)", category: "Engineering & Dev",
    skills: ["React", "Node.js", "Python", "PostgreSQL", "Docker", "Next.js", "Redis"],
    languages: ["English", "Arabic", "Urdu"],
    salaryMin: 75, salaryMax: 110,
    workType: ["Fully Remote", "Contract", "Freelance"],
    rating: 4.6, reviews: 34, profileViews: 231, jobsCompleted: 28, successRate: 92,
    bio: "Full-stack developer who loves building fast, scalable web products from scratch. Shipped 6 SaaS products. Open-source contributor. Also an indie hacker with 2 profitable side projects.",
    featured: false, verified: true, openToWork: true, lastActive: "2h ago",
    linkedin: "#", github: "#", portfolio: "#",
    topProjects: ["Built SaaS product to $8k MRR", "API integration platform (400+ connectors)", "Real-time collaboration tool for 10k users"],
  },
  {
    id: 10, name: "Chloe Dubois", title: "Technical Content Strategist",
    avatar: "CD", avatarGradient: "from-yellow-400 to-amber-500",
    location: "Paris, France", timezone: "CET (UTC+1)",
    availability: "Open to offers", availColor: "gray",
    experience: "Mid-level (3–5 yrs)", category: "Writing & Content",
    skills: ["Technical Writing", "Developer Docs", "SEO", "Content Strategy", "Markdown", "API Docs"],
    languages: ["English", "French", "Spanish"],
    salaryMin: 55, salaryMax: 85,
    workType: ["Fully Remote", "Freelance"],
    rating: 4.8, reviews: 29, profileViews: 97, jobsCompleted: 24, successRate: 96,
    bio: "Technical writer who makes complex developer tools feel approachable. Wrote docs used by 1M+ developers. Background in software engineering — I speak both dev and human.",
    featured: false, verified: true, openToWork: true, lastActive: "1d ago",
    linkedin: "#", portfolio: "#",
    topProjects: ["Developer docs for API with 1M+ users", "Reduced support tickets by 38% via docs", "Built content system for 5-person docs team"],
  },
  {
    id: 11, name: "David Nakamura", title: "Cybersecurity Engineer",
    avatar: "DN", avatarGradient: "from-slate-700 to-slate-900",
    location: "Tokyo, Japan", timezone: "JST (UTC+9)",
    availability: "Within 2 weeks", availColor: "blue",
    experience: "Senior (5–8 yrs)", category: "Cybersecurity",
    skills: ["Penetration Testing", "Cloud Security", "SOC Analysis", "SIEM", "Python", "Zero Trust"],
    languages: ["English", "Japanese"],
    salaryMin: 100, salaryMax: 145,
    workType: ["Fully Remote"],
    rating: 4.9, reviews: 13, profileViews: 178, jobsCompleted: 9, successRate: 100,
    bio: "Security engineer with expertise in cloud security and penetration testing. OSCP and AWS Security Specialty certified. Found and disclosed 14 CVEs. Previously at Cloudflare.",
    featured: false, verified: true, openToWork: true, lastActive: "12h ago",
    linkedin: "#", github: "#",
    topProjects: ["Discovered critical RCE in major SaaS platform", "Built cloud security posture management tool", "Led SOC implementation for 5,000-person company"],
  },
  {
    id: 12, name: "Isabella Rossi", title: "Financial Analyst & CFO Advisor",
    avatar: "IR", avatarGradient: "from-green-500 to-emerald-700",
    location: "Milan, Italy", timezone: "CET (UTC+1)",
    availability: "Open to offers", availColor: "gray",
    experience: "Lead / Principal (8+ yrs)", category: "Finance & Accounting",
    skills: ["FP&A", "SaaS Metrics", "Excel", "Financial Modeling", "M&A", "Forecasting"],
    languages: ["English", "Italian", "French"],
    salaryMin: 110, salaryMax: 155,
    workType: ["Fully Remote", "Contract"],
    rating: 4.7, reviews: 21, profileViews: 134, jobsCompleted: 16, successRate: 94,
    bio: "Finance executive with 10+ years in SaaS and private equity. Helped 4 startups raise Series A/B. Built financial models that powered $50M+ funding rounds.",
    featured: false, verified: true, openToWork: false, lastActive: "3d ago",
    linkedin: "#",
    topProjects: ["Modeled fundraise leading to $22M Series A", "Built FP&A system from scratch at Series B startup", "Optimized burn rate saving $1.8M ARR"],
  },
];

// ─── Subcomponents ───────────────────────────────────────────────────────────
function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "xs" }) {
  const w = size === "xs" ? "w-2.5 h-2.5" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`${w} ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function AvailBadge({ availability, color }: { availability: string; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    gray: "bg-gray-50 text-gray-600 border-gray-200",
  };
  const dotMap: Record<string, string> = {
    emerald: "bg-emerald-500 animate-pulse",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
    gray: "bg-gray-400",
  };
  return (
    <span className={`flex items-center gap-1.5 text-[11px] font-black px-2.5 py-1 rounded-full border ${colorMap[color]}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotMap[color]}`} />
      {availability}
    </span>
  );
}

function FilterCheck({ label, checked, onChange, count }: FilterCheckProps) {
  return (
    <label className="flex items-center justify-between gap-2 py-1.5 cursor-pointer group">
      <div className="flex items-center gap-2.5">
        <div onClick={onChange} className={`w-4 h-4 rounded-[5px] flex items-center justify-center flex-shrink-0 border transition-all ${checked ? "bg-blue-600 border-blue-600" : "border-gray-200 group-hover:border-blue-300"}`}>
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className={`text-[13px] transition-colors ${checked ? "text-blue-600 font-semibold" : "text-gray-600 group-hover:text-gray-900"}`}>{label}</span>
      </div>
      {count !== undefined && <span className="text-[11px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md">{count}</span>}
    </label>
  );
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full group mb-0">
        <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest">{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="mt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      className="flex items-center gap-1.5 text-[12px] font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
      {label}
      <button onClick={onRemove}><X className="w-3 h-3 hover:text-blue-900 transition-colors" /></button>
    </motion.span>
  );
}

// ─── Contact Modal ────────────────────────────────────────────────────────────
function ContactModal({ candidate, onClose }: ContactModalProps) {
  const [message, setMessage] = useState(`Hi ${candidate.name.split(" ")[0]},\n\nI came across your profile and I'm impressed by your experience in ${candidate.category}. We're currently looking for a ${candidate.title} and think you could be a great fit.\n\nWould you be open to a quick call to discuss the opportunity?\n\nBest regards`);
  const [sent, setSent] = useState(false);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden z-10"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-blue-950 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${candidate.avatarGradient} rounded-2xl flex items-center justify-center text-white text-sm font-black border-2 border-white/20`}>
                  {candidate.avatar}
                </div>
                <div>
                  <h3 className="text-[15px] font-black text-white">{candidate.name}</h3>
                  <p className="text-[12px] text-white/60">{candidate.title}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex gap-2">
              {candidate.linkedin && (
                <a href={candidate.linkedin} className="flex items-center gap-1.5 text-[11.5px] font-bold text-white/70 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-colors">
                  <FaLinkedin className="w-3 h-3" /> LinkedIn
                </a>
              )}
              {candidate.github && (
                <a href={candidate.github} className="flex items-center gap-1.5 text-[11.5px] font-bold text-white/70 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-colors">
                  <FaGithub className="w-3 h-3" /> GitHub
                </a>
              )}
              {candidate.portfolio && (
                <a href={candidate.portfolio} className="flex items-center gap-1.5 text-[11.5px] font-bold text-white/70 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-colors">
                  <Globe2 className="w-3 h-3" /> Portfolio
                </a>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {!sent ? (
              <>
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Your Message</label>
                <textarea
                  rows={7}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 text-[13px] text-gray-700 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none leading-relaxed font-medium transition-all"
                />
                <div className="flex gap-3 mt-4">
                  <button onClick={onClose} className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={() => setSent(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-black shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </div>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-sm text-gray-500 mb-5">
                  Your message has been delivered to <span className="font-bold text-gray-700">{candidate.name.split(" ")[0]}</span>. They typically reply within 24 hours.
                </p>
                <button onClick={onClose} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black rounded-2xl transition-colors shadow-lg shadow-blue-200">
                  Done
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Candidate Card ───────────────────────────────────────────────────────────
function CandidateCard({ candidate, saved, onSave, onContact, view, index }: CandidateCardProps) {
  const isList = view === "list";
  const catColor = CATEGORY_COLORS[candidate.category] || "text-blue-600 bg-blue-50 border-blue-100";
  const CatIcon = CATEGORY_ICONS[candidate.category] || Briefcase;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.32, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-[0_8px_40px_-8px_rgba(37,99,235,0.14)] transition-all duration-300 overflow-hidden ${
        candidate.featured ? "ring-1 ring-blue-100" : ""
      } ${isList ? "flex gap-0" : "flex flex-col"}`}
    >
      {/* Top gradient accent */}
      <div className={`h-1 w-full bg-gradient-to-r ${candidate.avatarGradient} flex-shrink-0`} />

      <div className={`${isList ? "flex gap-5 p-5 w-full items-start" : "flex flex-col p-5 flex-1"}`}>

        {/* Avatar + badges */}
        <div className={`relative flex-shrink-0 ${isList ? "" : "mb-4 flex items-start justify-between"}`}>
          <div className={`bg-gradient-to-br ${candidate.avatarGradient} ${isList ? "w-14 h-14" : "w-14 h-14"} rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-md flex-shrink-0`}>
            {candidate.avatar}
          </div>
          {!isList && (
            <div className="flex items-center gap-1.5">
              {candidate.featured && (
                <span className="flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  <Sparkles className="w-2.5 h-2.5" /> Top
                </span>
              )}
              {candidate.verified && (
                <span className="flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <BadgeCheck className="w-2.5 h-2.5" /> Verified
                </span>
              )}
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Name row */}
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-[15px] font-black text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  {candidate.name}
                </h3>
                {isList && candidate.featured && (
                  <span className="flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                    <Sparkles className="w-2.5 h-2.5" /> Top
                  </span>
                )}
                {isList && candidate.verified && (
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-[13px] font-semibold text-gray-500 truncate">{candidate.title}</p>
            </div>
            {/* Save button */}
            <button
              onClick={(e) => { e.stopPropagation(); onSave(candidate.id); }}
              className={`flex-shrink-0 p-1.5 rounded-xl transition-all ${saved ? "text-blue-600 bg-blue-50" : "text-gray-300 hover:text-blue-400 hover:bg-blue-50"}`}
            >
              {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
            <span className="flex items-center gap-1 text-[12px] text-gray-400">
              <MapPin className="w-3 h-3 flex-shrink-0" /> {candidate.location}
            </span>
            <span className="flex items-center gap-1 text-[12px] text-gray-400">
              <Clock className="w-3 h-3 flex-shrink-0" /> {candidate.timezone}
            </span>
          </div>

          {/* Availability + category */}
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <AvailBadge availability={candidate.availability} color={candidate.availColor} />
            <span className={`flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full border ${catColor}`}>
              <CatIcon className="w-2.5 h-2.5" />
              {candidate.category}
            </span>
          </div>

          {/* Rating + stats */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <div className="flex items-center gap-1.5">
              <StarRating rating={candidate.rating} />
              <span className="text-[12.5px] font-black text-gray-700">{candidate.rating}</span>
              <span className="text-[11.5px] text-gray-400">({candidate.reviews})</span>
            </div>
            <span className="text-[11.5px] text-gray-400">·</span>
            <span className="flex items-center gap-1 text-[12px] text-gray-500 font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {candidate.successRate}% success
            </span>
            <span className="flex items-center gap-1 text-[12px] text-gray-400">
              <Eye className="w-3 h-3" /> {candidate.profileViews} views
            </span>
          </div>

          {/* Bio — list only */}
          {isList && (
            <p className="text-[12.5px] text-gray-400 mt-2.5 leading-relaxed line-clamp-2">{candidate.bio}</p>
          )}

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {candidate.skills.slice(0, isList ? 6 : 4).map((skill) => (
              <span key={skill} className="text-[11.5px] font-semibold px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-100">
                {skill}
              </span>
            ))}
            {candidate.skills.length > (isList ? 6 : 4) && (
              <span className="text-[11.5px] font-semibold px-2.5 py-1 rounded-lg bg-gray-50 text-gray-400 border border-gray-100">
                +{candidate.skills.length - (isList ? 6 : 4)}
              </span>
            )}
          </div>

          {/* Salary + work type */}
          <div className={`flex items-center justify-between mt-4 ${!isList ? "pt-3 border-t border-gray-50" : ""}`}>
            <div>
              <span className="text-[13px] font-black text-gray-800">
                ${candidate.salaryMin}k – ${candidate.salaryMax}k
              </span>
              <span className="text-[11.5px] text-gray-400 ml-1">/ year</span>
            </div>
            <div className="flex items-center gap-1.5">
              {candidate.workType.slice(0, 2).map((t) => (
                <span key={t} className={`text-[11px] font-bold px-2 py-0.5 rounded-lg ${t === "Fully Remote" ? "bg-emerald-50 text-emerald-600" : t === "Contract" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* List CTA */}
        {isList && (
          <div className="flex flex-col gap-2 flex-shrink-0 self-center ml-2">
            <button
              onClick={() => onContact(candidate)}
              className="flex items-center gap-1.5 text-[12.5px] font-black text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl shadow-sm shadow-blue-200 transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Contact
            </button>
            <button className="flex items-center gap-1.5 text-[12.5px] font-bold text-gray-600 border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
              <Eye className="w-3.5 h-3.5" /> View Profile
            </button>
          </div>
        )}
      </div>

      {/* Grid CTAs */}
      {!isList && (
        <div className="px-5 pb-5 flex gap-2">
          <button
            onClick={() => onContact(candidate)}
            className="flex-1 flex items-center justify-center gap-1.5 text-[12.5px] font-black text-white bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl shadow-sm shadow-blue-200 transition-all hover:-translate-y-0.5"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Contact
          </button>
          <button className="flex items-center justify-center gap-1.5 text-[12.5px] font-bold text-gray-600 border border-gray-200 hover:border-gray-300 px-3.5 py-2.5 rounded-xl transition-colors">
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ─── Featured Strip ───────────────────────────────────────────────────────────
function FeaturedStrip({
  candidates, saved, onSave, onContact,
}: { candidates: Candidate[]; saved: number[]; onSave: (id: number) => void; onContact: (c: Candidate) => void }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-4 h-4 text-orange-500" />
        <h2 className="text-sm font-black text-gray-700 uppercase tracking-widest">Top Talent This Week</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {candidates.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${c.avatarGradient} p-5 cursor-pointer group hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-black text-sm border border-white/30">
                {c.avatar}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onSave(c.id); }}
                className={`p-1.5 rounded-lg transition-all ${saved.includes(c.id) ? "bg-white/30 text-white" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${saved.includes(c.id) ? "fill-white" : ""}`} />
              </button>
            </div>
            <h3 className="text-[13.5px] font-black text-white leading-tight">{c.name}</h3>
            <p className="text-[11px] text-white/70 mt-0.5 line-clamp-1">{c.title}</p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                <StarRating rating={c.rating} size="xs" />
                <span className="text-[11px] font-bold text-white/80 ml-1">{c.rating}</span>
              </div>
              <AvailBadge availability={c.availability === "Immediately" ? "Available" : "Soon"} color={c.availColor} />
            </div>
            <button
              onClick={() => onContact(c)}
              className="mt-3 w-full flex items-center justify-center gap-1.5 text-[12px] font-black text-white bg-white/20 hover:bg-white/30 py-2 rounded-xl border border-white/20 transition-colors"
            >
              <MessageSquare className="w-3 h-3" /> Contact
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function BrowseCandidates() {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedExp, setSelectedExp] = useState<string[]>([]);
  const [selectedWork, setSelectedWork] = useState<string[]>([]);
  const [selectedAvail, setSelectedAvail] = useState<string[]>([]);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [salaryMin, setSalaryMin] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [openToWorkOnly, setOpenToWorkOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Most Relevant");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [saved, setSaved] = useState<number[]>([1, 3]);
  const [page, setPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [contactCandidate, setContactCandidate] = useState<Candidate | null>(null);

  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) =>
    setList((p) => p.includes(item) ? p.filter((x) => x !== item) : [...p, item]);

  const toggleSave = (id: number) =>
    setSaved((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const clearAll = () => {
    setSearch(""); setSelectedCategory("All Categories"); setSelectedExp([]);
    setSelectedWork([]); setSelectedAvail([]); setSelectedLangs([]);
    setSalaryMin(0); setVerifiedOnly(false); setOpenToWorkOnly(false); setPage(1);
  };

  const activeFilterCount =
    (selectedCategory !== "All Categories" ? 1 : 0) +
    selectedExp.length + selectedWork.length + selectedAvail.length +
    selectedLangs.length + (salaryMin > 0 ? 1 : 0) +
    (verifiedOnly ? 1 : 0) + (openToWorkOnly ? 1 : 0);

  const filtered = useMemo<Candidate[]>(() => {
    let list = CANDIDATES.filter((c) => {
      const q = search.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.title.toLowerCase().includes(q) &&
          !c.skills.some((s) => s.toLowerCase().includes(q)) &&
          !c.category.toLowerCase().includes(q)) return false;
      if (selectedCategory !== "All Categories" && c.category !== selectedCategory) return false;
      if (selectedExp.length && !selectedExp.includes(c.experience)) return false;
      if (selectedWork.length && !selectedWork.some((w) => c.workType.includes(w))) return false;
      if (selectedAvail.length && !selectedAvail.includes(c.availability)) return false;
      if (selectedLangs.length && !selectedLangs.some((l) => c.languages.includes(l))) return false;
      if (salaryMin > 0 && c.salaryMin < salaryMin) return false;
      if (verifiedOnly && !c.verified) return false;
      if (openToWorkOnly && !c.openToWork) return false;
      return true;
    });
    if (sortBy === "Recently Active") list = [...list].sort((a, b) => a.id - b.id);
    else if (sortBy === "Highest Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === "Most Experienced") list = [...list].sort((a, b) => b.salaryMax - a.salaryMax);
    else if (sortBy === "Salary: Low to High") list = [...list].sort((a, b) => a.salaryMin - b.salaryMin);
    else if (sortBy === "Salary: High to Low") list = [...list].sort((a, b) => b.salaryMax - a.salaryMax);
    else list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [search, selectedCategory, selectedExp, selectedWork, selectedAvail, selectedLangs, salaryMin, verifiedOnly, openToWorkOnly, sortBy]);

  useEffect(() => { setPage(1); }, [search, selectedCategory, selectedExp, selectedWork, selectedAvail, selectedLangs, salaryMin, verifiedOnly, openToWorkOnly]);

  const totalPages = Math.ceil(filtered.length / CANDIDATES_PER_PAGE);
  const paged = filtered.slice((page - 1) * CANDIDATES_PER_PAGE, page * CANDIDATES_PER_PAGE);
  const featuredCandidates = CANDIDATES.filter((c) => c.featured);

  const catCounts = useMemo<Record<string, number>>(() =>
    Object.fromEntries(CATEGORIES.slice(1).map((cat) => [cat, CANDIDATES.filter((c) => c.category === cat).length])), []);

  const SidebarContent = (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <span className="font-black text-gray-900 text-sm">Filters</span>
          {activeFilterCount > 0 && (
            <span className="text-[11px] font-bold bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center">{activeFilterCount}</span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} className="text-[11.5px] text-blue-600 hover:underline font-semibold flex items-center gap-1">
            <RefreshCw className="w-2.5 h-2.5" /> Clear all
          </button>
        )}
      </div>

      {/* Quick toggles */}
      <div className="py-4 border-b border-gray-100">
        <p className="text-[11px] font-black text-gray-600 uppercase tracking-widest mb-3">Quick Filters</p>
        <div className="space-y-2">
          {[
            { label: "Verified profiles only", value: verifiedOnly, fn: () => setVerifiedOnly(!verifiedOnly) },
            { label: "Open to work", value: openToWorkOnly, fn: () => setOpenToWorkOnly(!openToWorkOnly) },
          ].map((toggle) => (
            <label key={toggle.label} className="flex items-center justify-between cursor-pointer group py-1">
              <span className={`text-[13px] ${toggle.value ? "text-blue-600 font-semibold" : "text-gray-600 group-hover:text-gray-900"} transition-colors`}>{toggle.label}</span>
              <button
                onClick={toggle.fn}
                className={`relative w-9 rounded-full transition-colors flex-shrink-0`}
                style={{ height: 20, background: toggle.value ? "#2563eb" : "#e5e7eb" }}
              >
                <motion.div
                  animate={{ x: toggle.value ? 20 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute top-[3px] w-3.5 h-3.5 bg-white rounded-full shadow-sm"
                />
              </button>
            </label>
          ))}
        </div>
      </div>

      <FilterSection title="Category">
        <div className="space-y-0.5">
          {CATEGORIES.map((cat) => (
            <FilterCheck key={cat} label={cat} checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)}
              count={cat === "All Categories" ? CANDIDATES.length : catCounts[cat]} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Experience Level">
        <div className="space-y-0.5">
          {EXPERIENCE_LEVELS.map((e) => (
            <FilterCheck key={e} label={e} checked={selectedExp.includes(e)} onChange={() => toggleItem(selectedExp, setSelectedExp, e)}
              count={CANDIDATES.filter((c) => c.experience === e).length} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Work Preference">
        <div className="space-y-0.5">
          {WORK_TYPES.map((w) => (
            <FilterCheck key={w} label={w} checked={selectedWork.includes(w)} onChange={() => toggleItem(selectedWork, setSelectedWork, w)}
              count={CANDIDATES.filter((c) => c.workType.includes(w)).length} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Availability" defaultOpen={false}>
        <div className="space-y-0.5">
          {AVAILABILITY_FILTERS.map((a) => (
            <FilterCheck key={a} label={a} checked={selectedAvail.includes(a)} onChange={() => toggleItem(selectedAvail, setSelectedAvail, a)}
              count={CANDIDATES.filter((c) => c.availability === a).length} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Languages" defaultOpen={false}>
        <div className="space-y-0.5">
          {LANGUAGES_LIST.map((l) => (
            <FilterCheck key={l} label={l} checked={selectedLangs.includes(l)} onChange={() => toggleItem(selectedLangs, setSelectedLangs, l)}
              count={CANDIDATES.filter((c) => c.languages.includes(l)).length} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Min. Salary (k USD/yr)" defaultOpen={false}>
        <div className="space-y-2">
          {[0, 60, 80, 100, 130].map((val) => (
            <label key={val} onClick={() => setSalaryMin(val)} className="flex items-center gap-2.5 py-1 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${salaryMin === val ? "border-blue-600" : "border-gray-200 group-hover:border-blue-300"}`}>
                {salaryMin === val && <div className="w-2 h-2 rounded-full bg-blue-600" />}
              </div>
              <span className={`text-[13px] ${salaryMin === val ? "text-blue-600 font-semibold" : "text-gray-600"}`}>
                {val === 0 ? "Any" : `$${val}k+`}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f8fc]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-28 pb-14 px-4 relative overflow-hidden">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              <Users className="w-3 h-3" /> {CANDIDATES.length}+ Vetted Remote Candidates
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Find Your Next
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                Remote Hire
              </span>
            </h1>
            <p className="text-slate-400 mt-3 text-base max-w-lg mx-auto leading-relaxed">
              Browse thousands of pre-vetted remote-ready candidates across every discipline. Filter by skills, location, availability and salary — contact them directly.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-2xl shadow-black/30 p-2 flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100">
              <Search className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <input type="text" placeholder="Search by name, skill, title, or category…" value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none font-medium" />
              {search && <button onClick={() => setSearch("")} className="text-gray-300 hover:text-gray-500"><X className="w-3.5 h-3.5" /></button>}
            </div>
            <button className="flex items-center justify-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap">
              <Search className="w-4 h-4" /> Search Talent
            </button>
          </motion.div>

          {/* Quick category pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex flex-wrap justify-center gap-2 mt-5">
            {CATEGORIES.slice(1, 7).map((cat) => {
              const Icon = CATEGORY_ICONS[cat] || Briefcase;
              return (
                <button key={cat} onClick={() => setSelectedCategory(selectedCategory === cat ? "All Categories" : cat)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                    selectedCategory === cat ? "bg-blue-600 border-blue-600 text-white shadow-sm" : "border-white/20 text-slate-300 hover:border-blue-400 hover:text-blue-300 bg-white/5"
                  }`}>
                  <Icon className="w-3 h-3" />
                  {cat}
                </button>
              );
            })}
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { value: "4.8★", label: "Avg. candidate rating" },
              { value: "97%", label: "Success rate" },
              { value: "48h", label: "Avg. response time" },
              { value: "190+", label: "Countries represented" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-black text-white">{s.value}</p>
                <p className="text-[11px] text-white/50 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured strip */}
        <FeaturedStrip candidates={featuredCandidates} saved={saved} onSave={toggleSave} onContact={setContactCandidate} />

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">All Candidates</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div className="flex gap-7">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
              {SidebarContent}
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div>
                <span className="text-base font-black text-gray-900">{filtered.length} candidates found</span>
                {search && <span className="text-sm text-gray-400 ml-2">for "{search}"</span>}
              </div>
              <div className="flex items-center gap-2">
                {/* Mobile filter */}
                <button onClick={() => setMobileFilterOpen(true)} className="lg:hidden flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 px-3.5 py-2 rounded-xl">
                  <Filter className="w-3.5 h-3.5" /> Filters
                  {activeFilterCount > 0 && <span className="bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{activeFilterCount}</span>}
                </button>

                {/* Sort */}
                <div className="relative">
                  <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 px-3.5 py-2 rounded-xl hover:border-gray-300 transition-colors">
                    <ArrowUpDown className="w-3.5 h-3.5" /> {sortBy} <ChevronDown className="w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.97 }} transition={{ duration: 0.15 }}
                        className="absolute right-0 top-[calc(100%+6px)] bg-white rounded-xl border border-gray-100 shadow-xl shadow-black/10 z-20 w-52 py-1">
                        {SORT_OPTIONS.map((s) => (
                          <button key={s} onClick={() => { setSortBy(s); setSortOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] font-medium flex items-center justify-between transition-colors ${sortBy === s ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"}`}>
                            {s}
                            {sortBy === s && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* View toggle */}
                <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setView("grid")} className={`p-2 transition-colors ${view === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-600"}`}><LayoutGrid className="w-4 h-4" /></button>
                  <button onClick={() => setView("list")} className={`p-2 transition-colors ${view === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-600"}`}><List className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex flex-wrap gap-2 mb-5 overflow-hidden">
                  {selectedCategory !== "All Categories" && <FilterChip label={selectedCategory} onRemove={() => setSelectedCategory("All Categories")} />}
                  {selectedExp.map((e) => <FilterChip key={e} label={e} onRemove={() => toggleItem(selectedExp, setSelectedExp, e)} />)}
                  {selectedWork.map((w) => <FilterChip key={w} label={w} onRemove={() => toggleItem(selectedWork, setSelectedWork, w)} />)}
                  {selectedAvail.map((a) => <FilterChip key={a} label={a} onRemove={() => toggleItem(selectedAvail, setSelectedAvail, a)} />)}
                  {selectedLangs.map((l) => <FilterChip key={l} label={l} onRemove={() => toggleItem(selectedLangs, setSelectedLangs, l)} />)}
                  {salaryMin > 0 && <FilterChip label={`$${salaryMin}k+ salary`} onRemove={() => setSalaryMin(0)} />}
                  {verifiedOnly && <FilterChip label="Verified only" onRemove={() => setVerifiedOnly(false)} />}
                  {openToWorkOnly && <FilterChip label="Open to work" onRemove={() => setOpenToWorkOnly(false)} />}
                  <button onClick={clearAll} className="text-[12px] font-semibold text-blue-600 hover:underline px-1">Clear all</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cards */}
            {paged.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
                  <Users className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">No candidates found</h3>
                <p className="text-sm text-gray-400 max-w-xs mb-6">Try adjusting your filters or search terms to discover more talent.</p>
                <button onClick={clearAll} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
                  <RefreshCw className="w-3.5 h-3.5" /> Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div layout className={`grid gap-4 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                <AnimatePresence mode="popLayout">
                  {paged.map((candidate, i) => (
                    <CandidateCard key={candidate.id} candidate={candidate} saved={saved.includes(candidate.id)}
                      onSave={toggleSave} onContact={setContactCandidate} view={view} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${page === p ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300"}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            {filtered.length > 0 && (
              <p className="text-center text-[12px] text-gray-400 mt-4">
                Showing {Math.min((page - 1) * CANDIDATES_PER_PAGE + 1, filtered.length)}–{Math.min(page * CANDIDATES_PER_PAGE, filtered.length)} of {filtered.length} candidates
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileFilterOpen(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <span className="font-black text-gray-900 flex items-center gap-2"><SlidersHorizontal className="w-4 h-4 text-blue-600" /> Filters</span>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-4 h-4 text-gray-500" /></button>
              </div>
              <div className="p-5">{SidebarContent}</div>
              <div className="p-5 border-t border-gray-100 flex gap-2">
                <button onClick={clearAll} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600">Clear All</button>
                <button onClick={() => setMobileFilterOpen(false)} className="flex-1 py-3 rounded-xl bg-blue-600 text-sm font-semibold text-white">
                  Show {filtered.length} Candidates
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact modal */}
      <AnimatePresence>
        {contactCandidate && <ContactModal candidate={contactCandidate} onClose={() => setContactCandidate(null)} />}
      </AnimatePresence>
    </div>
  );
}