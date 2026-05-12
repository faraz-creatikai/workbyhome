"use client";
import { useState, useMemo, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  logoColor: string;
  location: string;
  salary: string;
  type: string;
  category: string;
  experience: string;
  posted: string;
  featured: boolean;
  urgent: boolean;
  skills: string[];
  desc: string;
  applicants: number;
}

interface SalaryRange {
  label: string;
  min: number;
  max: number;
}

interface JobCardProps {
  job: Job;
  saved: boolean;
  onSave: (id: number) => void;
  view: "grid" | "list";
  index: number;
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

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

interface EmptyStateProps {
  onClear: () => void;
}
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, DollarSign, Clock, Briefcase, Star,
  Bookmark, BookmarkCheck, ChevronDown, ChevronLeft,
  ChevronRight, SlidersHorizontal, X, LayoutGrid,
  List, Building2, Zap, Globe, Filter, TrendingUp,
  ArrowUpDown, CheckCircle2, Bell, Sparkles, Timer,
  Users, Award, RefreshCw,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const JOBS: Job[] = [
  {
    id: 1, title: "Senior Frontend Developer", company: "Stripe", logo: "S",
    logoColor: "bg-indigo-600", location: "Remote · USA", salary: "$120k – $160k",
    type: "Full-time", category: "Engineering", experience: "Senior",
    posted: "2h ago", featured: true, urgent: false,
    skills: ["React", "TypeScript", "GraphQL"],
    desc: "Build beautiful, performant UIs for millions of Stripe users worldwide.",
    applicants: 48,
  },
  {
    id: 2, title: "Product Designer (UX/UI)", company: "Notion", logo: "N",
    logoColor: "bg-gray-900", location: "Remote · Global", salary: "$90k – $130k",
    type: "Full-time", category: "Design", experience: "Mid-level",
    posted: "5h ago", featured: true, urgent: true,
    skills: ["Figma", "Prototyping", "Design Systems"],
    desc: "Shape the future of how people organize their work and thoughts at Notion.",
    applicants: 112,
  },
  {
    id: 3, title: "Backend Engineer (Go)", company: "Cloudflare", logo: "C",
    logoColor: "bg-orange-500", location: "Remote · EU", salary: "$100k – $145k",
    type: "Full-time", category: "Engineering", experience: "Senior",
    posted: "1d ago", featured: false, urgent: false,
    skills: ["Go", "Distributed Systems", "Rust"],
    desc: "Work on the infrastructure powering millions of websites globally.",
    applicants: 67,
  },
  {
    id: 4, title: "Growth Marketing Manager", company: "Linear", logo: "L",
    logoColor: "bg-violet-600", location: "Remote · USA", salary: "$85k – $115k",
    type: "Full-time", category: "Marketing", experience: "Mid-level",
    posted: "2d ago", featured: false, urgent: false,
    skills: ["SEO", "Paid Acquisition", "Analytics"],
    desc: "Drive user acquisition and retention for Linear's fast-growing platform.",
    applicants: 89,
  },
  {
    id: 5, title: "DevOps / Platform Engineer", company: "Vercel", logo: "V",
    logoColor: "bg-gray-800", location: "Remote · Global", salary: "$110k – $155k",
    type: "Full-time", category: "Engineering", experience: "Senior",
    posted: "3d ago", featured: true, urgent: false,
    skills: ["Kubernetes", "Terraform", "AWS"],
    desc: "Build and maintain the infrastructure that powers next-gen web deployments.",
    applicants: 33,
  },
  {
    id: 6, title: "Technical Content Writer", company: "Hashnode", logo: "H",
    logoColor: "bg-blue-600", location: "Remote · Global", salary: "$55k – $80k",
    type: "Contract", category: "Content", experience: "Mid-level",
    posted: "3d ago", featured: false, urgent: false,
    skills: ["Technical Writing", "Developer Docs", "Markdown"],
    desc: "Create high-quality technical content for the world's largest dev blogging platform.",
    applicants: 201,
  },
  {
    id: 7, title: "iOS Engineer (Swift)", company: "Superhuman", logo: "SH",
    logoColor: "bg-red-500", location: "Remote · USA", salary: "$130k – $170k",
    type: "Full-time", category: "Engineering", experience: "Senior",
    posted: "4d ago", featured: false, urgent: true,
    skills: ["Swift", "SwiftUI", "CoreData"],
    desc: "Build the fastest iOS email experience ever made, loved by top execs worldwide.",
    applicants: 44,
  },
  {
    id: 8, title: "Data Scientist", company: "Hugging Face", logo: "🤗",
    logoColor: "bg-yellow-400", location: "Remote · Global", salary: "$100k – $140k",
    type: "Full-time", category: "Data & AI", experience: "Mid-level",
    posted: "5d ago", featured: false, urgent: false,
    skills: ["Python", "PyTorch", "NLP"],
    desc: "Advance open-source AI and help shape the future of machine learning.",
    applicants: 156,
  },
  {
    id: 9, title: "Customer Success Manager", company: "Loom", logo: "L",
    logoColor: "bg-purple-600", location: "Remote · USA", salary: "$70k – $95k",
    type: "Full-time", category: "Operations", experience: "Junior",
    posted: "6d ago", featured: false, urgent: false,
    skills: ["Account Management", "Churn Analysis", "CRM"],
    desc: "Help enterprise customers unlock the full potential of async video communication.",
    applicants: 78,
  },
  {
    id: 10, title: "Head of Finance", company: "Pitch", logo: "P",
    logoColor: "bg-teal-600", location: "Remote · EU", salary: "$120k – $160k",
    type: "Full-time", category: "Finance", experience: "Senior",
    posted: "1w ago", featured: false, urgent: false,
    skills: ["FP&A", "SaaS Metrics", "M&A"],
    desc: "Lead financial strategy for one of Europe's most exciting SaaS companies.",
    applicants: 29,
  },
  {
    id: 11, title: "React Native Developer", company: "Calm", logo: "C",
    logoColor: "bg-blue-400", location: "Remote · Global", salary: "$95k – $130k",
    type: "Contract", category: "Engineering", experience: "Mid-level",
    posted: "1w ago", featured: false, urgent: false,
    skills: ["React Native", "Redux", "Firebase"],
    desc: "Help build the #1 mental wellness app used by 100M+ people globally.",
    applicants: 91,
  },
  {
    id: 12, title: "Recruiter – Tech Roles", company: "Remote.com", logo: "R",
    logoColor: "bg-emerald-600", location: "Remote · Global", salary: "$60k – $90k",
    type: "Full-time", category: "HR & Recruiting", experience: "Mid-level",
    posted: "1w ago", featured: false, urgent: false,
    skills: ["Talent Sourcing", "ATS", "Employer Branding"],
    desc: "Source and attract top global talent for a fully distributed company.",
    applicants: 143,
  },
];

const CATEGORIES = ["All", "Engineering", "Design", "Marketing", "Content", "Data & AI", "Finance", "Operations", "HR & Recruiting"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const EXPERIENCE = ["Junior", "Mid-level", "Senior", "Lead / Manager"];
const SALARY_RANGES: SalaryRange[] = [
  { label: "Any", min: 0, max: Infinity },
  { label: "$40k – $70k", min: 40, max: 70 },
  { label: "$70k – $100k", min: 70, max: 100 },
  { label: "$100k – $140k", min: 100, max: 140 },
  { label: "$140k+", min: 140, max: Infinity },
];
const SORT_OPTIONS = ["Most Relevant", "Newest First", "Salary: High to Low", "Most Applicants"];

// ─── Helper ───────────────────────────────────────────────────────────────────
const parseSalaryMin = (salaryStr: string): number => {
  const m = salaryStr.match(/\$(\d+)k/);
  return m ? parseInt(m[1]) : 0;
};

// ─── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({ job, saved, onSave, view, index }: JobCardProps) {
  const isList = view === "list";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-[0_8px_40px_-8px_rgba(37,99,235,0.15)] transition-all duration-300 cursor-pointer overflow-hidden ${
        isList ? "flex gap-5 p-5 items-start" : "flex flex-col p-5"
      } ${job.featured ? "ring-1 ring-blue-100" : ""}`}
    >
      {/* Featured / Urgent badges */}
      {(job.featured || job.urgent) && (
        <div className="absolute top-4 right-4 flex gap-1.5 z-10">
          {job.featured && (
            <span className="flex items-center gap-1 text-[10.5px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
          {job.urgent && (
            <span className="flex items-center gap-1 text-[10.5px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-red-50 text-red-500 border border-red-100">
              <Zap className="w-2.5 h-2.5" /> Urgent
            </span>
          )}
        </div>
      )}

      {/* Logo */}
      <div
        className={`${job.logoColor} rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm ${
          isList ? "w-12 h-12 text-base" : "w-11 h-11 text-sm mb-3"
        }`}
      >
        {job.logo}
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${isList ? "" : ""}`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className={`font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug ${isList ? "text-[15px]" : "text-[15px] mt-0"}`}>
              {job.title}
            </h3>
            <p className="text-[13px] text-gray-500 mt-0.5 flex items-center gap-1.5">
              <Building2 className="w-3 h-3" />
              {job.company}
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onSave(job.id); }}
            className={`flex-shrink-0 p-1.5 rounded-lg transition-all mt-0.5 ${
              saved
                ? "text-blue-600 bg-blue-50"
                : "text-gray-300 hover:text-blue-400 hover:bg-blue-50"
            }`}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
          <span className="flex items-center gap-1 text-[12.5px] text-gray-400">
            <MapPin className="w-3 h-3" /> {job.location}
          </span>
          <span className="flex items-center gap-1 text-[12.5px] text-gray-400">
            <DollarSign className="w-3 h-3" /> {job.salary}
          </span>
          <span className="flex items-center gap-1 text-[12.5px] text-gray-400">
            <Clock className="w-3 h-3" /> {job.posted}
          </span>
        </div>

        {/* Description */}
        {!isList && (
          <p className="text-[12.5px] text-gray-400 mt-3 leading-relaxed line-clamp-2">
            {job.desc}
          </p>
        )}

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {job.skills.map((s) => (
            <span key={s} className="text-[11.5px] font-medium px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-100">
              {s}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between mt-4 ${isList ? "mt-3" : "pt-3 border-t border-gray-50"}`}>
          <div className="flex items-center gap-2">
            <span className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-lg ${
              job.type === "Full-time" ? "bg-emerald-50 text-emerald-600" :
              job.type === "Contract" ? "bg-amber-50 text-amber-600" :
              "bg-purple-50 text-purple-600"
            }`}>
              {job.type}
            </span>
            <span className="text-[11.5px] font-semibold px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500">
              {job.experience}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-gray-400">
            <Users className="w-3 h-3" />
            <span>{job.applicants} applied</span>
          </div>
        </div>
      </div>

      {/* CTA on list view */}
      {isList && (
        <div className="flex-shrink-0 self-center">
          <button className="text-[13px] font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow-sm shadow-blue-200 transition-all hover:-translate-y-0.5 whitespace-nowrap">
            Apply Now
          </button>
        </div>
      )}

      {/* Apply button on grid */}
      {!isList && (
        <button className="mt-4 w-full text-[13px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white py-2.5 rounded-xl transition-all duration-200 border border-blue-100 hover:border-blue-600 hover:shadow-sm">
          Apply Now →
        </button>
      )}
    </motion.div>
  );
}

// ─── Filter Checkbox ──────────────────────────────────────────────────────────
function FilterCheck({ label, checked, onChange, count }: FilterCheckProps) {
  return (
    <label className="flex items-center justify-between gap-2 py-1.5 cursor-pointer group">
      <div className="flex items-center gap-2.5">
        <div
          onClick={onChange}
          className={`w-4 h-4 rounded-[5px] flex items-center justify-center flex-shrink-0 border transition-all ${
            checked
              ? "bg-blue-600 border-blue-600"
              : "border-gray-200 group-hover:border-blue-300"
          }`}
        >
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className={`text-[13px] transition-colors ${checked ? "text-blue-600 font-medium" : "text-gray-600 group-hover:text-gray-900"}`}>
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-[11px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md">{count}</span>
      )}
    </label>
  );
}

// ─── Filter Section ───────────────────────────────────────────────────────────
function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-0 group"
      >
        <span className="text-[13px] font-bold text-gray-800 uppercase tracking-widest">{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const JOBS_PER_PAGE = 6;

export default function BrowseJobs() {
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedExp, setSelectedExp] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState(0); // index
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [savedJobs, setSavedJobs] = useState<number[]>([2, 5]);
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const toggleType = (t:any) =>
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  const toggleExp = (e:any) =>
    setSelectedExp((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );
  const toggleSave = (id:any) =>
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const salaryRange = SALARY_RANGES[selectedSalary];

  const filtered = useMemo(() => {
    let jobs = JOBS.filter((j) => {
      const q = search.toLowerCase();
      if (q && !j.title.toLowerCase().includes(q) && !j.company.toLowerCase().includes(q) && !j.skills.some((s) => s.toLowerCase().includes(q))) return false;
      if (locationSearch && !j.location.toLowerCase().includes(locationSearch.toLowerCase())) return false;
      if (selectedCategory !== "All" && j.category !== selectedCategory) return false;
      if (selectedTypes.length && !selectedTypes.includes(j.type)) return false;
      if (selectedExp.length && !selectedExp.includes(j.experience)) return false;
      const min = parseSalaryMin(j.salary);
      if (min < salaryRange.min || min > salaryRange.max) return false;
      return true;
    });

    if (sortBy === "Newest First") jobs = [...jobs].sort((a, b) => a.id - b.id);
    else if (sortBy === "Salary: High to Low") jobs = [...jobs].sort((a, b) => parseSalaryMin(b.salary) - parseSalaryMin(a.salary));
    else if (sortBy === "Most Applicants") jobs = [...jobs].sort((a, b) => b.applicants - a.applicants);
    else jobs = [...jobs].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return jobs;
  }, [search, locationSearch, selectedCategory, selectedTypes, selectedExp, salaryRange, sortBy]);

  const totalPages = Math.ceil(filtered.length / JOBS_PER_PAGE);
  const paged = filtered.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE);

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    selectedTypes.length +
    selectedExp.length +
    (selectedSalary !== 0 ? 1 : 0);

  const clearAll = () => {
    setSearch(""); setLocationSearch(""); setSelectedCategory("All");
    setSelectedTypes([]); setSelectedExp([]); setSelectedSalary(0);
    setPage(1);
  };

  const typeCounts = useMemo<Record<string, number>>(() =>
    Object.fromEntries(JOB_TYPES.map((t) => [t, JOBS.filter((j) => j.type === t).length])),
    []
  );

  useEffect(() => { setPage(1); }, [search, locationSearch, selectedCategory, selectedTypes, selectedExp, selectedSalary]);

  return (
    <div className="min-h-screen bg-[#f7f8fc]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      {/* ── Hero Search Bar ── */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-28 pb-12 px-4 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08),transparent_60%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="w-3 h-3" />
              {JOBS.length}+ Remote Jobs Available
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Remote Job
              </span>
            </h1>
            <p className="text-slate-400 mt-3 text-base max-w-lg mx-auto">
              Browse thousands of work-from-home opportunities from top companies worldwide.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-2xl shadow-black/30 p-2 flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100">
              <Search className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Job title, skills, or company…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none font-medium"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-300 hover:text-gray-500">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="hidden sm:flex w-px bg-gray-100 self-stretch my-1" />
            <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100">
              <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Location (e.g. USA, EU, Global)…"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none font-medium"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap">
              <Search className="w-4 h-4" /> Search Jobs
            </button>
          </motion.div>

          {/* Quick Category Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap justify-center gap-2 mt-5"
          >
            {CATEGORIES.slice(1, 7).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? "All" : cat)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                    : "border-white/20 text-slate-300 hover:border-blue-400 hover:text-blue-300 bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-7">

          {/* ── Sidebar Filters ── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
              {/* Header */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-gray-900 text-sm">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="text-[11px] font-bold bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-[11.5px] text-blue-600 hover:underline font-semibold flex items-center gap-1"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> Clear all
                  </button>
                )}
              </div>

              {/* Category */}
              <FilterSection title="Category">
                <div className="space-y-0.5">
                  {CATEGORIES.map((cat) => (
                    <FilterCheck
                      key={cat}
                      label={cat}
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      count={cat === "All" ? JOBS.length : JOBS.filter((j) => j.category === cat).length}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Job Type */}
              <FilterSection title="Job Type">
                <div className="space-y-0.5">
                  {JOB_TYPES.map((t) => (
                    <FilterCheck
                      key={t}
                      label={t}
                      checked={selectedTypes.includes(t)}
                      onChange={() => toggleType(t)}
                      count={typeCounts[t]}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Experience */}
              <FilterSection title="Experience">
                <div className="space-y-0.5">
                  {EXPERIENCE.map((e) => (
                    <FilterCheck
                      key={e}
                      label={e}
                      checked={selectedExp.includes(e)}
                      onChange={() => toggleExp(e)}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Salary */}
              <FilterSection title="Salary Range">
                <div className="space-y-1">
                  {SALARY_RANGES.map((r, i) => (
                    <label
                      key={r.label}
                      onClick={() => setSelectedSalary(i)}
                      className={`flex items-center gap-2.5 py-1.5 cursor-pointer group`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        selectedSalary === i ? "border-blue-600" : "border-gray-200 group-hover:border-blue-300"
                      }`}>
                        {selectedSalary === i && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                      </div>
                      <span className={`text-[13px] ${selectedSalary === i ? "text-blue-600 font-medium" : "text-gray-600"}`}>
                        {r.label}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Alert CTA */}
              <div className="mt-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <Bell className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-[12.5px] font-bold text-gray-800 mb-1">Get Job Alerts</p>
                <p className="text-[11.5px] text-gray-500 mb-3">Be first to apply for matching jobs.</p>
                <button className="w-full text-[12px] font-bold text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition-colors">
                  Set Up Alert
                </button>
              </div>
            </div>
          </aside>

          {/* ── Right: Results ── */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div>
                <span className="text-base font-bold text-gray-900">
                  {filtered.length} {filtered.length === 1 ? "job" : "jobs"} found
                </span>
                {(search || locationSearch) && (
                  <span className="text-sm text-gray-400 ml-2">
                    for "{search || locationSearch}"
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 px-3.5 py-2 rounded-xl"
                >
                  <Filter className="w-3.5 h-3.5" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 px-3.5 py-2 rounded-xl hover:border-gray-300 transition-colors"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    {sortBy}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-[calc(100%+6px)] bg-white rounded-xl border border-gray-100 shadow-xl shadow-black/10 z-20 w-48 py-1 overflow-hidden"
                      >
                        {SORT_OPTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => { setSortBy(s); setSortOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] font-medium flex items-center justify-between transition-colors ${
                              sortBy === s ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
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
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 transition-colors ${view === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 transition-colors ${view === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mb-5 overflow-hidden"
                >
                  {selectedCategory !== "All" && (
                    <FilterChip label={selectedCategory} onRemove={() => setSelectedCategory("All")} />
                  )}
                  {selectedTypes.map((t) => (
                    <FilterChip key={t} label={t} onRemove={() => toggleType(t)} />
                  ))}
                  {selectedExp.map((e) => (
                    <FilterChip key={e} label={e} onRemove={() => toggleExp(e)} />
                  ))}
                  {selectedSalary !== 0 && (
                    <FilterChip label={SALARY_RANGES[selectedSalary].label} onRemove={() => setSelectedSalary(0)} />
                  )}
                  <button
                    onClick={clearAll}
                    className="text-[12px] font-semibold text-blue-600 hover:underline px-1"
                  >
                    Clear all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Job Grid / List */}
            {paged.length === 0 ? (
              <EmptyState onClear={clearAll} />
            ) : (
              <motion.div layout className={`grid gap-4 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                <AnimatePresence mode="popLayout">
                  {paged.map((job, i) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      saved={savedJobs.includes(job.id)}
                      onSave={toggleSave}
                      view={view}
                      index={i}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                      page === p
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Page info */}
            {filtered.length > 0 && (
              <p className="text-center text-[12px] text-gray-400 mt-4">
                Showing {Math.min((page - 1) * JOBS_PER_PAGE + 1, filtered.length)}–{Math.min(page * JOBS_PER_PAGE, filtered.length)} of {filtered.length} jobs
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <span className="font-bold text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Filters
                </span>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="p-5">
                <FilterSection title="Category">
                  <div className="space-y-0.5">
                    {CATEGORIES.map((cat) => (
                      <FilterCheck key={cat} label={cat} checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} />
                    ))}
                  </div>
                </FilterSection>
                <FilterSection title="Job Type">
                  <div className="space-y-0.5">
                    {JOB_TYPES.map((t) => (
                      <FilterCheck key={t} label={t} checked={selectedTypes.includes(t)} onChange={() => toggleType(t)} />
                    ))}
                  </div>
                </FilterSection>
                <FilterSection title="Experience">
                  <div className="space-y-0.5">
                    {EXPERIENCE.map((e) => (
                      <FilterCheck key={e} label={e} checked={selectedExp.includes(e)} onChange={() => toggleExp(e)} />
                    ))}
                  </div>
                </FilterSection>
                <FilterSection title="Salary Range">
                  <div className="space-y-1">
                    {SALARY_RANGES.map((r, i) => (
                      <label key={r.label} onClick={() => setSelectedSalary(i)} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedSalary === i ? "border-blue-600" : "border-gray-200"}`}>
                          {selectedSalary === i && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                        </div>
                        <span className={`text-[13px] ${selectedSalary === i ? "text-blue-600 font-medium" : "text-gray-600"}`}>{r.label}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>
                <div className="flex gap-2 mt-6">
                  <button onClick={clearAll} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600">
                    Clear All
                  </button>
                  <button onClick={() => setMobileFilterOpen(false)} className="flex-1 py-3 rounded-xl bg-blue-600 text-sm font-semibold text-white">
                    Show {filtered.length} Jobs
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex items-center gap-1.5 text-[12px] font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full"
    >
      {label}
      <button onClick={onRemove} className="hover:text-blue-900 transition-colors">
        <X className="w-3 h-3" />
      </button>
    </motion.span>
  );
}

function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
        <Briefcase className="w-7 h-7 text-blue-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">No jobs found</h3>
      <p className="text-sm text-gray-400 max-w-xs mb-6">
        Try adjusting your filters or search terms to find more opportunities.
      </p>
      <button
        onClick={onClear}
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
      >
        <RefreshCw className="w-3.5 h-3.5" /> Clear Filters
      </button>
    </motion.div>
  );
}