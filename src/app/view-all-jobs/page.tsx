"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin, Search, SlidersHorizontal, X,
  ChevronDown, ChevronUp, Briefcase, Clock,
  DollarSign, LayoutGrid, List, ArrowUpDown,
  LucideIcon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type LocationType = "remote" | "onsite" | "hybrid";
type JobType      = "Full-time" | "Part-time" | "Contract" | "Freelance";
type Experience   = "Entry" | "Mid" | "Senior";
type Department   = "Engineering" | "Design" | "Data" | "Marketing";
type SortValue    = "recent" | "salary-desc" | "salary-asc" | "company-az";
type ViewMode     = "grid" | "list";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  locationType: LocationType;
  experience: Experience;
  experienceYears: string;
  type: JobType;
  salary: number;
  department: Department;
  postedDays: number;
  logo: string;
  logoBg: string;
  dots: number;
  dotsFilled: number;
}

interface FilterState {
  locationType: LocationType[];
  type: JobType[];
  experience: Experience[];
  department: Department[];
}

type FilterKey = keyof FilterState;

interface FilterSection {
  key: FilterKey;
  label: string;
  icon: LucideIcon;
  options: string[];
  values: string[];
}

interface JobCardProps {
  job: Job;
  compact: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  salaryRange: [number, number];
  setSalaryRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  onClearAll: () => void;
}

interface ActiveChipsProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  salaryRange: [number, number];
  setSalaryRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  defaultSalary: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_JOBS: Job[] = [
  { id: 1,  title: "Senior Software Engineer", company: "Slack",  location: "London",        locationType: "onsite",  experience: "Senior", experienceYears: "5+", type: "Full-time",  salary: 120, department: "Engineering", postedDays: 2, logo: "S", logoBg: "#4A154B", dots: 9,  dotsFilled: 2 },
  { id: 2,  title: "Product Designer",          company: "Figma",  location: "Remote",        locationType: "remote",  experience: "Mid",    experienceYears: "3+", type: "Full-time",  salary: 95,  department: "Design",      postedDays: 1, logo: "F", logoBg: "#1ABCFE", dots: 10, dotsFilled: 6 },
  { id: 3,  title: "Senior Software Engineer", company: "Gmail",  location: "Hamington",     locationType: "hybrid",  experience: "Senior", experienceYears: "6+", type: "Full-time",  salary: 140, department: "Engineering", postedDays: 2, logo: "G", logoBg: "#EA4335", dots: 12, dotsFilled: 2 },
  { id: 4,  title: "Frontend Engineer",         company: "Vercel", location: "Remote",        locationType: "remote",  experience: "Mid",    experienceYears: "2+", type: "Contract",   salary: 80,  department: "Engineering", postedDays: 3, logo: "V", logoBg: "#000000", dots: 8,  dotsFilled: 4 },
  { id: 5,  title: "Data Scientist",            company: "Stripe", location: "New York",      locationType: "hybrid",  experience: "Senior", experienceYears: "4+", type: "Full-time",  salary: 150, department: "Data",        postedDays: 5, logo: "S", logoBg: "#6772E5", dots: 11, dotsFilled: 7 },
  { id: 6,  title: "DevOps Engineer",           company: "Slack",  location: "San Francisco", locationType: "onsite",  experience: "Mid",    experienceYears: "3+", type: "Full-time",  salary: 110, department: "Engineering", postedDays: 4, logo: "S", logoBg: "#4A154B", dots: 9,  dotsFilled: 5 },
  { id: 7,  title: "UX Researcher",             company: "Figma",  location: "Remote",        locationType: "remote",  experience: "Entry",  experienceYears: "1+", type: "Part-time",  salary: 55,  department: "Design",      postedDays: 1, logo: "F", logoBg: "#1ABCFE", dots: 7,  dotsFilled: 2 },
  { id: 8,  title: "Backend Engineer",          company: "Stripe", location: "Remote",        locationType: "remote",  experience: "Senior", experienceYears: "5+", type: "Full-time",  salary: 135, department: "Engineering", postedDays: 6, logo: "S", logoBg: "#6772E5", dots: 10, dotsFilled: 8 },
  { id: 9,  title: "Marketing Manager",         company: "Notion", location: "Berlin",        locationType: "hybrid",  experience: "Mid",    experienceYears: "3+", type: "Full-time",  salary: 75,  department: "Marketing",   postedDays: 3, logo: "N", logoBg: "#000000", dots: 8,  dotsFilled: 3 },
  { id: 10, title: "iOS Developer",             company: "Apple",  location: "Cupertino",     locationType: "onsite",  experience: "Senior", experienceYears: "4+", type: "Full-time",  salary: 165, department: "Engineering", postedDays: 7, logo: "A", logoBg: "#555555", dots: 12, dotsFilled: 9 },
  { id: 11, title: "Growth Analyst",            company: "Notion", location: "Remote",        locationType: "remote",  experience: "Entry",  experienceYears: "1+", type: "Full-time",  salary: 60,  department: "Data",        postedDays: 2, logo: "N", logoBg: "#000000", dots: 7,  dotsFilled: 2 },
  { id: 12, title: "Technical Writer",          company: "Vercel", location: "Remote",        locationType: "remote",  experience: "Mid",    experienceYears: "2+", type: "Freelance",  salary: 50,  department: "Marketing",   postedDays: 8, logo: "V", logoBg: "#000000", dots: 6,  dotsFilled: 3 },
];

const JOBS_PER_PAGE = 6;

const FILTER_SECTIONS: FilterSection[] = [
  { key: "locationType", label: "Work Style",       icon: MapPin,    options: ["Remote", "On-site", "Hybrid"],                    values: ["remote", "onsite", "hybrid"] },
  { key: "type",         label: "Job Type",          icon: Briefcase, options: ["Full-time", "Part-time", "Contract", "Freelance"], values: ["Full-time", "Part-time", "Contract", "Freelance"] },
  { key: "experience",   label: "Experience Level",  icon: Clock,     options: ["Entry", "Mid", "Senior"],                         values: ["Entry", "Mid", "Senior"] },
  { key: "department",   label: "Department",        icon: LayoutGrid, options: ["Engineering", "Design", "Data", "Marketing"],    values: ["Engineering", "Design", "Data", "Marketing"] },
];

const SORT_OPTIONS: { label: string; value: SortValue }[] = [
  { label: "Most Recent",   value: "recent" },
  { label: "Highest Salary", value: "salary-desc" },
  { label: "Lowest Salary", value: "salary-asc" },
  { label: "Company A–Z",   value: "company-az" },
];

const INITIAL_FILTERS: FilterState = {
  locationType: [],
  type: [],
  experience: [],
  department: [],
};

const CHIP_LABEL_MAP: Record<string, string> = {
  remote: "Remote", onsite: "On-site", hybrid: "Hybrid",
  "Full-time": "Full-time", "Part-time": "Part-time",
  Contract: "Contract", Freelance: "Freelance",
  Entry: "Entry", Mid: "Mid", Senior: "Senior",
  Engineering: "Engineering", Design: "Design",
  Data: "Data", Marketing: "Marketing",
};

// ─── JobCard ─────────────────────────────────────────────────────────────────

function JobCard({ job, compact }: JobCardProps) {
  return (
    <div className="relative group">
      <div
        className={`relative bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)] hover:-translate-y-1 ${
          compact ? "p-4" : "p-5"
        }`}
      >
        {/* Folded Corner */}
        <div className="absolute top-0 right-0 z-10">
          <div className="relative" style={{ width: 44, height: 44 }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 44px 44px 0", borderColor: "transparent #e5e7eb transparent transparent" }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 36px 36px 0", borderColor: "transparent #f3f4f6 transparent transparent" }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 30px 30px 0", borderColor: "transparent #ffffff transparent transparent" }} />
          </div>
        </div>

        <div className="pr-10">
          {/* Logo */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-3 shadow-sm"
            style={{ backgroundColor: job.logoBg }}
          >
            {job.logo}
          </div>

          {/* Title + Company */}
          <h3 className={`font-semibold text-gray-900 leading-tight mb-1 ${compact ? "text-sm" : "text-base"}`}>
            {job.title}
          </h3>
          <p className="text-xs text-gray-400 font-medium mb-3">{job.company}</p>

          {/* Tag chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-600 text-[11px] font-medium px-2 py-0.5 rounded-md">
              <MapPin className="w-2.5 h-2.5" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-600 text-[11px] font-medium px-2 py-0.5 rounded-md">
              <Briefcase className="w-2.5 h-2.5" />
              {job.type}
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[11px] font-medium px-2 py-0.5 rounded-md">
              <DollarSign className="w-2.5 h-2.5" />
              {job.salary}k/yr
            </span>
          </div>

          {/* Dots progress */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: job.dots }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i < job.dotsFilled ? "bg-sky-400" : "bg-gray-200"}`}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-1 border-t border-gray-50">
            <span className="text-[11px] text-gray-400">{job.experienceYears} exp · {job.experience}</span>
            <span className="text-[11px] text-gray-400">{job.postedDays}d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FilterSidebar ────────────────────────────────────────────────────────────

function FilterSidebar({
  filters,
  setFilters,
  salaryRange,
  setSalaryRange,
  onClearAll,
}: FilterSidebarProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (key: string): void => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFilter = (key: FilterKey, value: string): void => {
    setFilters((prev) => {
      const current = prev[key] as string[];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const totalActive = (Object.values(filters) as string[][]).flat().length;

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden sticky top-6">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-sky-500" />
            <span className="text-sm font-semibold text-gray-900">Filters</span>
            {totalActive > 0 && (
              <span className="bg-sky-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {totalActive}
              </span>
            )}
          </div>
          {totalActive > 0 && (
            <button
              onClick={onClearAll}
              className="text-[11px] text-sky-500 hover:text-sky-600 font-medium transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="divide-y divide-gray-50">
          {/* Dynamic filter sections */}
          {FILTER_SECTIONS.map(({ key, label, icon: Icon, options, values }) => {
            const isCollapsed = collapsed[key] ?? false;
            return (
              <div key={key} className="px-5 py-4">
                <button
                  onClick={() => toggle(key)}
                  className="flex items-center justify-between w-full mb-3"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      {label}
                    </span>
                  </div>
                  {isCollapsed
                    ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    : <ChevronUp   className="w-3.5 h-3.5 text-gray-400" />
                  }
                </button>

                {!isCollapsed && (
                  <div className="space-y-2">
                    {options.map((opt, i) => {
                      const val = values[i];
                      const active = (filters[key] as string[]).includes(val);
                      return (
                        <label key={val} className="flex items-center gap-2.5 cursor-pointer group/item">
                          <div
                            role="checkbox"
                            aria-checked={active}
                            tabIndex={0}
                            onClick={() => toggleFilter(key, val)}
                            onKeyDown={(e) => e.key === "Enter" && toggleFilter(key, val)}
                            className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-150 flex-shrink-0 ${
                              active
                                ? "bg-sky-500 border-sky-500"
                                : "bg-white border-gray-300 group-hover/item:border-sky-400"
                            }`}
                          >
                            {active && (
                              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span
                            onClick={() => toggleFilter(key, val)}
                            className={`text-sm transition-colors select-none ${
                              active ? "text-gray-900 font-medium" : "text-gray-600"
                            }`}
                          >
                            {opt}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Salary Range */}
          <div className="px-5 py-4">
            <button
              onClick={() => toggle("salary")}
              className="flex items-center justify-between w-full mb-3"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Salary Range
                </span>
              </div>
              {collapsed["salary"]
                ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                : <ChevronUp   className="w-3.5 h-3.5 text-gray-400" />
              }
            </button>

            {!collapsed["salary"] && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">${salaryRange[0]}k</span>
                  <span className="text-xs text-sky-500 font-medium">up to ${salaryRange[1]}k/yr</span>
                </div>
                <div className="relative h-1.5 bg-gray-100 rounded-full">
                  <div
                    className="absolute h-full bg-sky-400 rounded-full"
                    style={{
                      left:  `${(salaryRange[0] / 200) * 100}%`,
                      right: `${100 - (salaryRange[1] / 200) * 100}%`,
                    }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={5}
                  value={salaryRange[1]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSalaryRange([salaryRange[0], Number(e.target.value)])
                  }
                  className="w-full mt-2 accent-sky-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── ActiveChips ──────────────────────────────────────────────────────────────

function ActiveChips({
  filters,
  setFilters,
  salaryRange,
  setSalaryRange,
  defaultSalary,
}: ActiveChipsProps) {
  type Chip = { key: FilterKey | "salary"; val: string; label: string };

  const chips: Chip[] = [];

  (Object.entries(filters) as [FilterKey, string[]][]).forEach(([key, vals]) => {
    vals.forEach((v) => {
      chips.push({ key, val: v, label: CHIP_LABEL_MAP[v] ?? v });
    });
  });

  if (salaryRange[1] < defaultSalary) {
    chips.push({ key: "salary", val: "salary", label: `Up to $${salaryRange[1]}k` });
  }

  if (chips.length === 0) return null;

  const removeChip = (key: FilterKey | "salary", val: string): void => {
    if (key === "salary") {
      setSalaryRange([0, defaultSalary]);
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: (prev[key] as string[]).filter((v) => v !== val),
      }));
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {chips.map(({ key, val, label }) => (
        <button
          key={`${key}-${val}`}
          onClick={() => removeChip(key, val)}
          className="inline-flex items-center gap-1.5 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-medium px-2.5 py-1 rounded-lg hover:bg-sky-100 transition-colors"
        >
          {label}
          <X className="w-3 h-3" />
        </button>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ViewAllJobsPage() {
  const [search,        setSearch]        = useState<string>("");
  const [filters,       setFilters]       = useState<FilterState>(INITIAL_FILTERS);
  const [salaryRange,   setSalaryRange]   = useState<[number, number]>([0, 200]);
  const [sort,          setSort]          = useState<SortValue>("recent");
  const [viewMode,      setViewMode]      = useState<ViewMode>("grid");
  const [currentPage,   setCurrentPage]   = useState<number>(1);
  const [sortOpen,      setSortOpen]      = useState<boolean>(false);
  const [mobileSidebar, setMobileSidebar] = useState<boolean>(false);

  const DEFAULT_SALARY = 200;

  const clearAll = (): void => {
    setFilters(INITIAL_FILTERS);
    setSalaryRange([0, DEFAULT_SALARY]);
    setSearch("");
    setCurrentPage(1);
  };

  // Keep page in bounds when filters change
  const handleFilter: React.Dispatch<React.SetStateAction<FilterState>> = (value) => {
    setFilters(value);
    setCurrentPage(1);
  };

  const filtered = useMemo<Job[]>(() => {
    let jobs = [...ALL_JOBS];

    if (search.trim()) {
      const q = search.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q),
      );
    }

    (Object.entries(filters) as [FilterKey, string[]][]).forEach(([key, vals]) => {
      if (vals.length > 0) {
        jobs = jobs.filter((j) => vals.includes(j[key] as string));
      }
    });

    jobs = jobs.filter((j) => j.salary >= salaryRange[0] && j.salary <= salaryRange[1]);

    jobs.sort((a, b) => {
      switch (sort) {
        case "recent":     return a.postedDays - b.postedDays;
        case "salary-desc": return b.salary - a.salary;
        case "salary-asc":  return a.salary - b.salary;
        case "company-az":  return a.company.localeCompare(b.company);
        default:           return 0;
      }
    });

    return jobs;
  }, [search, filters, salaryRange, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / JOBS_PER_PAGE));
  const paginated  = filtered.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE,
  );

  const currentSortLabel = SORT_OPTIONS.find((s) => s.value === sort)?.label ?? "Sort";

  return (
    <div className="min-h-screen bg-[#f5f6f7]">
      {/* Dot pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative squares – top right */}
      <div className="fixed top-24 right-10 flex flex-col gap-1.5 z-0 opacity-50 pointer-events-none">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
          <div className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
        </div>
        <div className="flex gap-1.5 ml-3">
          <div className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
        </div>
      </div>

      {/* Decorative squares – bottom left */}
      <div className="fixed bottom-24 left-10 flex flex-col gap-1.5 z-0 opacity-50 pointer-events-none">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
          <div className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
        </div>
        <div className="flex gap-1.5 ml-3">
          <div className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
        </div>
      </div>

      {/* ── Top Bar ── */}
      <div className="relative z-10 bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-gray-900" />
              <div className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
              <div className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
              <div className="w-2.5 h-2.5 rounded-sm bg-gray-900" />
            </div>
            <span className="text-lg font-semibold text-gray-900 tracking-tight">ChronoTask</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, companies, locations…"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-sky-400 focus:bg-white transition-all"
            />
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileSidebar(!mobileSidebar)}
            className="md:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-sky-500 font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">All Jobs</h1>
          <p className="text-sm text-gray-500">
            <span className="text-sky-500 font-semibold">{filtered.length}</span> positions found
          </p>
        </div>

        <div className="flex gap-7 items-start">
          {/* ── Sidebar desktop ── */}
          <div className="hidden md:block">
            <FilterSidebar
              filters={filters}
              setFilters={handleFilter}
              salaryRange={salaryRange}
              setSalaryRange={setSalaryRange}
              onClearAll={clearAll}
            />
          </div>

          {/* ── Mobile sidebar drawer ── */}
          {mobileSidebar && (
            <div
              className="fixed inset-0 z-50 bg-black/30 md:hidden"
              onClick={() => setMobileSidebar(false)}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-72 bg-[#f5f6f7] p-4 overflow-y-auto"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-gray-900">Filters</span>
                  <button onClick={() => setMobileSidebar(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  setFilters={handleFilter}
                  salaryRange={salaryRange}
                  setSalaryRange={setSalaryRange}
                  onClearAll={clearAll}
                />
              </div>
            </div>
          )}

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 gap-4">
              {/* Active chips */}
              <div className="flex-1 min-w-0">
                <ActiveChips
                  filters={filters}
                  setFilters={handleFilter}
                  salaryRange={salaryRange}
                  setSalaryRange={setSalaryRange}
                  defaultSalary={DEFAULT_SALARY}
                />
              </div>

              {/* View + Sort controls */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Grid / List toggle */}
                <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid" ? "bg-sky-50 text-sky-500" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${
                      viewMode === "list" ? "bg-sky-50 text-sky-500" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 transition-colors"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs font-medium">{currentSortLabel}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-30 py-1 overflow-hidden">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSort(opt.value);
                            setSortOpen(false);
                            setCurrentPage(1);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            sort === opt.value
                              ? "bg-sky-50 text-sky-600 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cards */}
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-gray-400" />
                </div>
                <h3 className="text-gray-700 font-semibold mb-1">No jobs found</h3>
                <p className="text-gray-400 text-sm mb-4">Try adjusting your filters or search query</p>
                <button
                  onClick={clearAll}
                  className="px-5 py-2 bg-sky-500 text-white text-sm font-medium rounded-xl hover:bg-sky-600 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "flex flex-col gap-3"
                }
              >
                {paginated.map((job) => (
                  <JobCard key={job.id} job={job} compact={viewMode === "list"} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm flex items-center justify-center hover:border-sky-300 hover:text-sky-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const page  = i + 1;
                  const active = page === currentPage;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? "bg-sky-500 text-white border border-sky-500 shadow-sm"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-500"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm flex items-center justify-center hover:border-sky-300 hover:text-sky-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  ›
                </button>
              </div>
            )}

            {/* Results count */}
            <p className="text-center text-xs text-gray-400 mt-4">
              Showing{" "}
              {Math.min((currentPage - 1) * JOBS_PER_PAGE + 1, filtered.length)}–
              {Math.min(currentPage * JOBS_PER_PAGE, filtered.length)} of {filtered.length} jobs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}