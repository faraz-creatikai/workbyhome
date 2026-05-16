"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Building2, MapPin, DollarSign, Clock,
  Globe, Users, Shield, Code2, Palette, BarChart3,
  Megaphone, Layers, FileText, TrendingUp, Heart,
  GraduationCap, Wrench, Camera, BookOpen, ChevronDown,
  Plus, X, Check, ArrowRight, ArrowLeft, CheckCircle2,
  Sparkles, Eye, Zap, Star, AlertCircle, Upload,
  Mail, Phone, Link2, Tag, ListChecks, Target,
  Award, Flame, Send, Lock, BarChart2, RefreshCw,
  PenLine, Package,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1 – Job Details
  jobTitle: string;
  category: string;
  jobType: string[];
  experience: string;
  vacancies: string;
  deadline: string;

  // Step 2 – Company & Location
  companyName: string;
  companyWebsite: string;
  companySize: string;
  companyLogo: File | null;
  companyLogoPreview: string;
  companyDesc: string;
  location: string;
  workModel: string;
  timezone: string;

  // Step 3 – Compensation & Perks
  salaryMin: string;
  salaryMax: string;
  salaryCurrency: string;
  salaryPeriod: string;
  salaryVisible: boolean;
  equity: string;
  perks: string[];

  // Step 4 – Description & Skills
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  skills: string[];
  applyEmail: string;
  applyUrl: string;
  applyMethod: "email" | "url";
}

interface StepProps {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Job Details",       icon: Briefcase,   desc: "Role & requirements" },
  { id: 2, label: "Company & Location", icon: Building2,   desc: "Who's hiring & where" },
  { id: 3, label: "Compensation",       icon: DollarSign,  desc: "Salary & perks" },
  { id: 4, label: "Description",        icon: PenLine,     desc: "Full job write-up" },
];

const CATEGORIES = [
  { label: "Engineering & Dev",   icon: Code2,         color: "text-blue-600 bg-blue-50 border-blue-100" },
  { label: "Design & Creative",   icon: Palette,       color: "text-pink-600 bg-pink-50 border-pink-100" },
  { label: "Data & AI",           icon: BarChart3,     color: "text-violet-600 bg-violet-50 border-violet-100" },
  { label: "Marketing & Growth",  icon: Megaphone,     color: "text-orange-600 bg-orange-50 border-orange-100" },
  { label: "Product Management",  icon: Layers,        color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
  { label: "Writing & Content",   icon: BookOpen,      color: "text-yellow-700 bg-yellow-50 border-yellow-100" },
  { label: "Finance & Accounting",icon: DollarSign,    color: "text-green-700 bg-green-50 border-green-100" },
  { label: "HR & People Ops",     icon: Users,         color: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100" },
  { label: "Customer Success",    icon: Heart,         color: "text-rose-600 bg-rose-50 border-rose-100" },
  { label: "Operations & PM",     icon: Wrench,        color: "text-teal-600 bg-teal-50 border-teal-100" },
  { label: "Cybersecurity",       icon: Shield,        color: "text-slate-700 bg-slate-50 border-slate-200" },
  { label: "Sales & BD",          icon: TrendingUp,    color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
  { label: "Education & Training",icon: GraduationCap, color: "text-sky-600 bg-sky-50 border-sky-100" },
  { label: "Media & Video",       icon: Camera,        color: "text-rose-500 bg-rose-50 border-rose-100" },
];

const JOB_TYPES   = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const EXPERIENCE_LEVELS = [
  { value: "intern",    label: "Intern / Student", desc: "0–1 yr" },
  { value: "junior",    label: "Junior",           desc: "1–3 yrs" },
  { value: "mid",       label: "Mid-level",        desc: "3–5 yrs" },
  { value: "senior",    label: "Senior",           desc: "5–8 yrs" },
  { value: "lead",      label: "Lead / Manager",   desc: "8–12 yrs" },
  { value: "principal", label: "Principal / Director", desc: "12+ yrs" },
];

const WORK_MODELS  = ["Fully Remote", "Remote-first", "Hybrid", "On-site"];
const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–500", "501–1,000", "1,000+"];
const CURRENCIES   = ["USD", "EUR", "GBP", "CAD", "AUD", "SGD", "INR"];
const SALARY_PERIODS = ["/ year", "/ month", "/ hour"];
const EQUITY_OPTIONS = ["None", "0.01–0.1%", "0.1–0.5%", "0.5–1%", "1–2%", "2%+"];

const POPULAR_PERKS = [
  "Health Insurance", "Flexible Hours", "Home Office Budget", "Learning Budget",
  "Equity / Stock", "Unlimited PTO", "Async-first", "Team Retreats",
  "Mental Wellness", "401k / Pension", "Paid Parental Leave", "Gym / Wellness",
  "Free Meals", "Company Laptop", "Conference Budget", "Co-working Stipend",
];

const POPULAR_SKILLS = [
  "React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Figma",
  "SQL", "GraphQL", "Kubernetes", "Next.js", "Vue", "Go", "Swift",
  "TensorFlow", "PostgreSQL", "MongoDB", "Tailwind CSS", "Redis", "Terraform",
  "Machine Learning", "Agile", "SEO", "Copywriting", "Product Design",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const inputCls = (err?: string) =>
  `w-full px-4 py-3 text-sm font-medium text-gray-800 bg-white border rounded-xl outline-none transition-all placeholder-gray-400 ${
    err ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
  }`;

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[11.5px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
      {children}{required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
}

function FieldErr({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 text-[11.5px] font-semibold text-red-500 mt-1.5">
      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {msg}
    </p>
  );
}

function BulletEditor({
  label, items, setItems, placeholder, max = 10,
}: {
  label: string; items: string[];
  setItems: (items: string[]) => void;
  placeholder: string; max?: number;
}) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (v && !items.includes(v) && items.length < max) {
      setItems([...items, v]);
      setInput("");
    }
  };
  return (
    <div>
      <Label>{label} <span className="text-gray-400 font-normal normal-case tracking-normal">({items.length}/{max})</span></Label>
      <div className="flex gap-2 mb-3">
        <input type="text" placeholder={placeholder} value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          className={inputCls()} />
        <button type="button" onClick={add}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors flex-shrink-0">
          Add
        </button>
      </div>
      <AnimatePresence>
        {items.length > 0 && (
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            {items.map((item, i) => (
              <motion.li key={item}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-2.5 bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl group">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                <span className="text-[13px] text-gray-700 flex-1 leading-snug">{item}</span>
                <button type="button" onClick={() => setItems(items.filter((_, j) => j !== i))}
                  className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Step 1: Job Details ──────────────────────────────────────────────────────
function StepJobDetails({ form, setForm, errors }: StepProps) {
  const toggleType = (t: string) =>
    setForm((f) => ({
      ...f,
      jobType: f.jobType.includes(t) ? f.jobType.filter((x) => x !== t) : [...f.jobType, t],
    }));

  return (
    <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="space-y-6">

      {/* Job Title */}
      <div>
        <Label required>Job Title</Label>
        <div className="relative">
          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="e.g. Senior Frontend Developer"
            value={form.jobTitle} onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
            className={`${inputCls(errors.jobTitle)} pl-10`} />
        </div>
        <FieldErr msg={errors.jobTitle} />
      </div>

      {/* Category */}
      <div>
        <Label required>Job Category</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const selected = form.category === cat.label;
            return (
              <button key={cat.label} type="button"
                onClick={() => setForm((f) => ({ ...f, category: cat.label }))}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[12px] font-bold transition-all text-left ${
                  selected ? `${cat.color} border-current shadow-sm` : "border-gray-100 text-gray-600 hover:border-gray-200 hover:bg-gray-50"
                }`}>
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>
        <FieldErr msg={errors.category} />
      </div>

      {/* Job Type */}
      <div>
        <Label>Employment Type <span className="text-gray-400 font-normal normal-case tracking-normal">(select all that apply)</span></Label>
        <div className="flex flex-wrap gap-2">
          {JOB_TYPES.map((t) => {
            const selected = form.jobType.includes(t);
            return (
              <button key={t} type="button" onClick={() => toggleType(t)}
                className={`flex items-center gap-1.5 text-[12.5px] font-bold px-3.5 py-2 rounded-xl border transition-all ${
                  selected ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                           : "border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
                }`}>
                {selected && <Check className="w-3 h-3" />}{t}
              </button>
            );
          })}
        </div>
        <FieldErr msg={errors.jobType} />
      </div>

      {/* Experience Level */}
      <div>
        <Label required>Experience Level</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {EXPERIENCE_LEVELS.map((lvl) => {
            const selected = form.experience === lvl.value;
            return (
              <button key={lvl.value} type="button"
                onClick={() => setForm((f) => ({ ...f, experience: lvl.value }))}
                className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all ${
                  selected ? "border-blue-400 bg-blue-50 shadow-sm" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}>
                <span className={`text-[13px] font-black leading-none ${selected ? "text-blue-700" : "text-gray-700"}`}>{lvl.label}</span>
                <span className={`text-[11px] font-medium mt-0.5 ${selected ? "text-blue-500" : "text-gray-400"}`}>{lvl.desc}</span>
              </button>
            );
          })}
        </div>
        <FieldErr msg={errors.experience} />
      </div>

      {/* Vacancies + Deadline */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Number of Vacancies</Label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="number" min="1" placeholder="e.g. 2"
              value={form.vacancies} onChange={(e) => setForm((f) => ({ ...f, vacancies: e.target.value }))}
              className={`${inputCls()} pl-10`} />
          </div>
        </div>
        <div>
          <Label>Application Deadline</Label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="date"
              value={form.deadline} onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
              className={`${inputCls()} pl-10`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Step 2: Company & Location ───────────────────────────────────────────────
function StepCompany({ form, setForm, errors }: StepProps) {
  const logoRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="space-y-6">

      {/* Logo upload */}
      <div className="flex items-center gap-5">
        <div onClick={() => logoRef.current?.click()}
          className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all group overflow-hidden flex-shrink-0">
          {form.companyLogoPreview
            ? <img src={form.companyLogoPreview} className="w-full h-full object-contain p-1" alt="Logo" />
            : <div className="flex flex-col items-center gap-1">
                <Upload className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-500">Logo</span>
              </div>
          }
          <div className="absolute bottom-1.5 right-1.5 w-5 h-5 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <Plus className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-black text-gray-700">Company Logo</p>
          <p className="text-[12px] text-gray-400 mt-0.5 mb-2">PNG or SVG recommended. Max 2MB.</p>
          <button type="button" onClick={() => logoRef.current?.click()}
            className="text-[12px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
            Browse Files
          </button>
        </div>
        <input ref={logoRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setForm((f) => ({ ...f, companyLogo: file, companyLogoPreview: URL.createObjectURL(file) }));
          }} />
      </div>

      {/* Company Name + Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Company Name</Label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="e.g. Stripe" value={form.companyName}
              onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
              className={`${inputCls(errors.companyName)} pl-10`} />
          </div>
          <FieldErr msg={errors.companyName} />
        </div>
        <div>
          <Label>Company Website</Label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="url" placeholder="https://yourcompany.com" value={form.companyWebsite}
              onChange={(e) => setForm((f) => ({ ...f, companyWebsite: e.target.value }))}
              className={`${inputCls()} pl-10`} />
          </div>
        </div>
      </div>

      {/* Company Size */}
      <div>
        <Label>Company Size</Label>
        <div className="flex flex-wrap gap-2">
          {COMPANY_SIZES.map((s) => {
            const selected = form.companySize === s;
            return (
              <button key={s} type="button" onClick={() => setForm((f) => ({ ...f, companySize: s }))}
                className={`text-[12.5px] font-bold px-3.5 py-2 rounded-xl border transition-all ${
                  selected ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                           : "border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
                }`}>
                {s} employees
              </button>
            );
          })}
        </div>
      </div>

      {/* Company Description */}
      <div>
        <Label>Company Description</Label>
        <textarea rows={3} placeholder="Tell candidates who you are — your mission, product, and culture…"
          value={form.companyDesc} onChange={(e) => setForm((f) => ({ ...f, companyDesc: e.target.value }))}
          className={`${inputCls()} resize-none leading-relaxed`} />
        <p className="text-[11.5px] text-gray-400 mt-1.5 text-right">{form.companyDesc.length} / 400</p>
      </div>

      {/* Work Model */}
      <div>
        <Label required>Work Model</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {WORK_MODELS.map((m) => {
            const selected = form.workModel === m;
            const icons: Record<string, React.ElementType> = {
              "Fully Remote": Globe, "Remote-first": Globe, "Hybrid": Building2, "On-site": MapPin,
            };
            const Icon = icons[m] || Globe;
            return (
              <button key={m} type="button" onClick={() => setForm((f) => ({ ...f, workModel: m }))}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all ${
                  selected ? "border-blue-400 bg-blue-50 shadow-sm" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}>
                <Icon className={`w-5 h-5 ${selected ? "text-blue-600" : "text-gray-400"}`} />
                <span className={`text-[12px] font-bold ${selected ? "text-blue-700" : "text-gray-600"}`}>{m}</span>
              </button>
            );
          })}
        </div>
        <FieldErr msg={errors.workModel} />
      </div>

      {/* Location + Timezone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Location / Region</Label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="e.g. USA · Global · EU"
              value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className={`${inputCls()} pl-10`} />
          </div>
        </div>
        <div>
          <Label>Preferred Timezone</Label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="e.g. EST, CET, or Any"
              value={form.timezone} onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
              className={`${inputCls()} pl-10`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Step 3: Compensation & Perks ─────────────────────────────────────────────
function StepCompensation({ form, setForm, errors }: StepProps) {
  const togglePerk = (p: string) =>
    setForm((f) => ({
      ...f,
      perks: f.perks.includes(p) ? f.perks.filter((x) => x !== p) : [...f.perks, p],
    }));

  return (
    <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="space-y-6">

      {/* Salary visibility toggle */}
      <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4">
        <div>
          <p className="text-[13.5px] font-black text-gray-800">Show Salary Publicly</p>
          <p className="text-[12px] text-gray-400 mt-0.5">Jobs with visible salaries get 3× more applicants</p>
        </div>
        <button type="button" onClick={() => setForm((f) => ({ ...f, salaryVisible: !f.salaryVisible }))}
          className="relative rounded-full transition-colors flex-shrink-0"
          style={{ width: 44, height: 24, background: form.salaryVisible ? "#2563eb" : "#e5e7eb" }}>
          <motion.div animate={{ x: form.salaryVisible ? 22 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="absolute top-[4px] w-4 h-4 bg-white rounded-full shadow-sm" />
        </button>
      </div>

      {/* Salary Range */}
      <div>
        <Label required>Salary Range</Label>
        <div className="flex gap-3 flex-wrap">
          {/* Currency */}
          <div className="relative">
            <select value={form.salaryCurrency} onChange={(e) => setForm((f) => ({ ...f, salaryCurrency: e.target.value }))}
              className="appearance-none pl-4 pr-8 py-3 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 cursor-pointer transition-all">
              {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          {/* Min */}
          <div className="relative flex-1 min-w-[100px]">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input type="number" placeholder="Min" value={form.salaryMin}
              onChange={(e) => setForm((f) => ({ ...f, salaryMin: e.target.value }))}
              className={`${inputCls(errors.salaryMin)} pl-8`} />
          </div>
          <span className="self-center text-gray-400 font-bold flex-shrink-0">–</span>
          {/* Max */}
          <div className="relative flex-1 min-w-[100px]">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input type="number" placeholder="Max" value={form.salaryMax}
              onChange={(e) => setForm((f) => ({ ...f, salaryMax: e.target.value }))}
              className={`${inputCls(errors.salaryMax)} pl-8`} />
          </div>
          {/* Period */}
          <div className="relative">
            <select value={form.salaryPeriod} onChange={(e) => setForm((f) => ({ ...f, salaryPeriod: e.target.value }))}
              className="appearance-none pl-3 pr-8 py-3 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 cursor-pointer transition-all">
              {SALARY_PERIODS.map((p) => <option key={p}>{p}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <FieldErr msg={errors.salaryMin || errors.salaryMax} />
      </div>

      {/* Equity */}
      <div>
        <Label>Equity / Stock Options</Label>
        <div className="flex flex-wrap gap-2">
          {EQUITY_OPTIONS.map((eq) => {
            const selected = form.equity === eq;
            return (
              <button key={eq} type="button" onClick={() => setForm((f) => ({ ...f, equity: eq }))}
                className={`text-[12.5px] font-bold px-3.5 py-2 rounded-xl border transition-all ${
                  selected ? "bg-violet-600 border-violet-600 text-white shadow-sm"
                           : "border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50"
                }`}>
                {eq}
              </button>
            );
          })}
        </div>
      </div>

      {/* Perks */}
      <div>
        <Label>Benefits & Perks <span className="text-gray-400 font-normal normal-case tracking-normal">(select all that apply)</span></Label>
        <div className="flex flex-wrap gap-2">
          {POPULAR_PERKS.map((perk) => {
            const selected = form.perks.includes(perk);
            return (
              <button key={perk} type="button" onClick={() => togglePerk(perk)}
                className={`flex items-center gap-1.5 text-[12px] font-bold px-3 py-2 rounded-xl border transition-all ${
                  selected ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                           : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50"
                }`}>
                {selected && <Check className="w-3 h-3" />}
                {perk}
              </button>
            );
          })}
        </div>
        {form.perks.length === 0 && (
          <p className="text-[12px] text-amber-600 mt-2 flex items-center gap-1.5">
            <Zap className="w-3 h-3" /> Jobs with 3+ perks attract 2× more applicants
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Step 4: Description ──────────────────────────────────────────────────────
function StepDescription({ form, setForm, errors }: StepProps) {
  const [skillInput, setSkillInput] = useState("");
  const addSkill = (s: string) => {
    const v = s.trim();
    if (v && !form.skills.includes(v) && form.skills.length < 20)
      setForm((f) => ({ ...f, skills: [...f.skills, v] }));
    setSkillInput("");
  };

  return (
    <motion.div key="step4" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="space-y-6">

      {/* Job Description */}
      <div>
        <Label required>Job Description</Label>
        <textarea rows={6} placeholder="Write a compelling overview of the role — what you're building, what the candidate will work on, why this opportunity is exciting…"
          value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className={`${inputCls(errors.description)} resize-none leading-relaxed`} />
        <div className="flex items-center justify-between mt-1.5">
          <FieldErr msg={errors.description} />
          <p className="text-[11.5px] text-gray-400 ml-auto">{form.description.length} / 2000</p>
        </div>
      </div>

      {/* Responsibilities */}
      <BulletEditor label="Responsibilities" items={form.responsibilities}
        setItems={(items) => setForm((f) => ({ ...f, responsibilities: items }))}
        placeholder="e.g. Lead the frontend architecture decisions…" />

      {/* Requirements */}
      <BulletEditor label="Requirements" items={form.requirements}
        setItems={(items) => setForm((f) => ({ ...f, requirements: items }))}
        placeholder="e.g. 5+ years of React experience…" />

      {/* Nice to Have */}
      <BulletEditor label="Nice to Have" items={form.niceToHave}
        setItems={(items) => setForm((f) => ({ ...f, niceToHave: items }))}
        placeholder="e.g. Experience with WebGL or Three.js…" max={8} />

      {/* Skills */}
      <div>
        <Label required>Required Skills <span className="text-gray-400 font-normal normal-case tracking-normal">(up to 20)</span></Label>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {POPULAR_SKILLS.filter((s) => !form.skills.includes(s)).slice(0, 14).map((skill) => (
            <button key={skill} type="button" onClick={() => addSkill(skill)}
              className="text-[11.5px] font-semibold px-2.5 py-1.5 rounded-lg border border-gray-100 bg-gray-50 text-gray-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all">
              + {skill}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="Type a skill and press Enter…" value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(skillInput); } }}
            className={inputCls(errors.skills)} />
          <button type="button" onClick={() => addSkill(skillInput)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors flex-shrink-0">
            Add
          </button>
        </div>
        <AnimatePresence>
          {form.skills.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-1.5 mt-3">
              {form.skills.map((skill) => (
                <motion.span key={skill} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl">
                  {skill}
                  <button type="button" onClick={() => setForm((f) => ({ ...f, skills: f.skills.filter((s) => s !== skill) }))}>
                    <X className="w-3 h-3 hover:text-blue-900 transition-colors" />
                  </button>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <FieldErr msg={errors.skills} />
      </div>

      {/* Application Method */}
      <div>
        <Label required>How to Apply</Label>
        <div className="flex gap-2 mb-4">
          {(["email", "url"] as const).map((method) => {
            const selected = form.applyMethod === method;
            const Icon = method === "email" ? Mail : Link2;
            return (
              <button key={method} type="button" onClick={() => setForm((f) => ({ ...f, applyMethod: method }))}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition-all ${
                  selected ? "border-blue-400 bg-blue-50 text-blue-700 shadow-sm"
                           : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}>
                <Icon className="w-4 h-4" />
                {method === "email" ? "Via Email" : "External URL"}
              </button>
            );
          })}
        </div>
        {form.applyMethod === "email" ? (
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="email" placeholder="careers@yourcompany.com" value={form.applyEmail}
              onChange={(e) => setForm((f) => ({ ...f, applyEmail: e.target.value }))}
              className={`${inputCls(errors.applyEmail)} pl-10`} />
          </div>
        ) : (
          <div className="relative">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="url" placeholder="https://yourcompany.com/jobs/apply" value={form.applyUrl}
              onChange={(e) => setForm((f) => ({ ...f, applyUrl: e.target.value }))}
              className={`${inputCls(errors.applyUrl)} pl-10`} />
          </div>
        )}
        <FieldErr msg={errors.applyEmail || errors.applyUrl} />
      </div>
    </motion.div>
  );
}

// ─── Live Preview Card ─────────────────────────────────────────────────────────
function LivePreview({ form }: { form: FormData }) {
  const cat = CATEGORIES.find((c) => c.label === form.category);
  const catColor = cat?.color || "text-blue-600 bg-blue-50 border-blue-100";
  const CatIcon = cat?.icon || Briefcase;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-24">
      {/* Preview header */}
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
        <Eye className="w-4 h-4 text-blue-500" />
        <span className="text-[12px] font-black text-gray-600 uppercase tracking-widest">Live Preview</span>
        <span className="ml-auto text-[10.5px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">Updates as you type</span>
      </div>

      <div className="p-5">
        {/* Company logo + name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-100">
            {form.companyLogoPreview
              ? <img src={form.companyLogoPreview} className="w-full h-full object-contain" alt="" />
              : <Building2 className="w-5 h-5 text-gray-400" />
            }
          </div>
          <div>
            <p className="text-[14px] font-black text-gray-900">{form.jobTitle || "Job Title"}</p>
            <p className="text-[12.5px] text-gray-500">{form.companyName || "Company Name"}</p>
          </div>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {form.category && (
            <span className={`flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full border ${catColor}`}>
              <CatIcon className="w-2.5 h-2.5" />{form.category}
            </span>
          )}
          {form.workModel && (
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${form.workModel === "Fully Remote" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"}`}>
              {form.workModel}
            </span>
          )}
          {form.jobType.length > 0 && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-gray-50 text-gray-500 border-gray-100">
              {form.jobType[0]}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="space-y-2 text-[12.5px] text-gray-500 mb-4">
          {form.location && (
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400" />{form.location}</span>
          )}
          {(form.salaryMin || form.salaryMax) && (
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-gray-400" />
              {form.salaryCurrency} {form.salaryMin || "–"} – {form.salaryMax || "–"} {form.salaryPeriod}
              {!form.salaryVisible && <Lock className="w-3 h-3 text-gray-300" />}
            </span>
          )}
          {form.experience && (
            <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-gray-400" />
              {EXPERIENCE_LEVELS.find((e) => e.value === form.experience)?.label || ""}
            </span>
          )}
        </div>

        {/* Description preview */}
        {form.description && (
          <p className="text-[12.5px] text-gray-400 leading-relaxed line-clamp-3 mb-4">
            {form.description}
          </p>
        )}

        {/* Skills */}
        {form.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {form.skills.slice(0, 5).map((s) => (
              <span key={s} className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-100">{s}</span>
            ))}
            {form.skills.length > 5 && (
              <span className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-gray-50 text-gray-400 border border-gray-100">+{form.skills.length - 5}</span>
            )}
          </div>
        )}

        {/* Perks */}
        {form.perks.length > 0 && (
          <div className="flex flex-wrap gap-1.5 border-t border-gray-50 pt-4">
            {form.perks.slice(0, 4).map((p) => (
              <span key={p} className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">{p}</span>
            ))}
            {form.perks.length > 4 && (
              <span className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-gray-50 text-gray-400 border border-gray-100">+{form.perks.length - 4} more</span>
            )}
          </div>
        )}

        {/* Completeness meter */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Post Quality</span>
            <span className="text-[11px] font-black text-blue-600">
              {Math.round([form.jobTitle, form.category, form.companyName, form.workModel, form.salaryMin, form.description, form.skills.length > 0, form.perks.length > 0].filter(Boolean).length / 8 * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${Math.round([form.jobTitle, form.category, form.companyName, form.workModel, form.salaryMin, form.description, form.skills.length > 0, form.perks.length > 0].filter(Boolean).length / 8 * 100)}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Success Screen ────────────────────────────────────────────────────────────
function SuccessScreen({ form }: { form: FormData }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="text-center py-8">

      {/* Animated badge */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 bg-emerald-100 rounded-3xl animate-pulse" />
        <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-200">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-7 h-7 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>

      <h2 className="text-2xl font-black text-gray-900 mb-2">Job Posted Successfully!</h2>
      <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed mb-8">
        <span className="font-bold text-gray-700">{form.jobTitle}</span> at{" "}
        <span className="font-bold text-gray-700">{form.companyName}</span> is now live and visible to thousands of remote candidates.
      </p>

      {/* Reach stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { icon: Users,    value: "12k+",  label: "Candidates will see this",  color: "text-blue-600 bg-blue-50" },
          { icon: Star,     value: "4.8★",  label: "Avg. applicant quality",    color: "text-amber-600 bg-amber-50" },
          { icon: Zap,      value: "24h",   label: "First applicants expected", color: "text-violet-600 bg-violet-50" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`${s.color} rounded-2xl p-3 border border-current border-opacity-10`}>
              <Icon className={`w-5 h-5 ${s.color.split(" ")[0]} mx-auto mb-1`} />
              <p className={`text-[15px] font-black ${s.color.split(" ")[0]}`}>{s.value}</p>
              <p className="text-[10.5px] text-gray-500 font-semibold mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Next steps */}
      <div className="bg-gray-50 rounded-2xl p-5 text-left border border-gray-100 mb-6">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">What's Next</p>
        {[
          { icon: Eye,          text: "Your job is live — candidates can find it now" },
          { icon: Send,         text: "Matched candidates will be notified by email" },
          { icon: BarChart2,    text: "Track applicants in your Employer Dashboard" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.text} className="flex items-start gap-3 mb-3 last:mb-0">
              <div className="w-7 h-7 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-[13px] text-gray-600 font-medium mt-0.5 leading-snug">{item.text}</p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5">
          <BarChart2 className="w-4 h-4" /> View Dashboard
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-black text-sm rounded-2xl transition-all">
          <Plus className="w-4 h-4" /> Post Another Job
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SubmitJob() {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<FormData>({
    jobTitle: "", category: "", jobType: [], experience: "", vacancies: "", deadline: "",
    companyName: "", companyWebsite: "", companySize: "", companyLogo: null, companyLogoPreview: "",
    companyDesc: "", location: "", workModel: "", timezone: "",
    salaryMin: "", salaryMax: "", salaryCurrency: "USD", salaryPeriod: "/ year",
    salaryVisible: true, equity: "None", perks: [],
    description: "", responsibilities: [], requirements: [], niceToHave: [],
    skills: [], applyEmail: "", applyUrl: "", applyMethod: "email",
  });

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!form.jobTitle.trim())  e.jobTitle  = "Job title is required";
      if (!form.category)         e.category  = "Please select a category";
      if (!form.experience)       e.experience = "Please select an experience level";
      if (form.jobType.length === 0) e.jobType = "Select at least one job type";
    }
    if (step === 2) {
      if (!form.companyName.trim()) e.companyName = "Company name is required";
      if (!form.workModel)          e.workModel    = "Please select a work model";
    }
    if (step === 3) {
      if (!form.salaryMin.trim()) e.salaryMin = "Please enter minimum salary";
      if (!form.salaryMax.trim()) e.salaryMax = "Please enter maximum salary";
    }
    if (step === 4) {
      if (!form.description.trim())  e.description = "Job description is required";
      if (form.skills.length === 0)  e.skills      = "Add at least one required skill";
      if (form.applyMethod === "email" && !form.applyEmail.trim())
        e.applyEmail = "Application email is required";
      if (form.applyMethod === "url" && !form.applyUrl.trim())
        e.applyUrl = "Application URL is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      if (step < 4) setStep((s) => s + 1);
      else setSubmitted(true);
    }
  };

  const progress = ((step - 1) / 3) * 100;

  const TIPS: Record<number, { icon: React.ElementType; tip: string }[]> = {
    1: [
      { icon: Flame, tip: "Clear, specific job titles get 40% more qualified applicants" },
      { icon: Target, tip: "Accurate experience levels reduce unqualified applications by 60%" },
    ],
    2: [
      { icon: Globe, tip: "Fully Remote jobs get 3× more applications than hybrid" },
      { icon: Sparkles, tip: "Companies with logos get 2× more views" },
    ],
    3: [
      { icon: DollarSign, tip: "Jobs with visible salary ranges attract 3× more candidates" },
      { icon: Heart, tip: "Offering 4+ perks doubles your application rate" },
    ],
    4: [
      { icon: ListChecks, tip: "Jobs with 5–8 bullet points per section perform best" },
      { icon: Tag, tip: "Relevant skill tags increase search visibility by 70%" },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-28 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="max-w-3xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              <Briefcase className="w-3 h-3" /> Post a Remote Job
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-4">
              Hire the Best
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                Remote Talent
              </span>
            </h1>
            <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed mb-8">
              Reach 50,000+ vetted remote candidates. Post your job in minutes and start receiving qualified applicants within 24 hours.
            </p>

            {/* Social proof */}
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/15 px-6 py-3 rounded-2xl">
              <div className="flex flex-col items-start">
                <p className="text-[13px] font-black text-white">Trusted by 2,000+ companies</p>
                <p className="text-[11px] text-white/50">Stripe · Notion · Vercel · Linear · Figma</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
                <span className="text-[12px] font-black text-white ml-1">4.9</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Form Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sticky top-24 space-y-6">

              {/* Step list */}
              <div>
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Progress</h3>
                <div className="space-y-2">
                  {STEPS.map((s) => {
                    const Icon = s.icon;
                    const isActive = step === s.id;
                    const isDone = step > s.id || submitted;
                    return (
                      <div key={s.id} className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${isActive ? "bg-blue-50 border border-blue-100" : "border border-transparent"}`}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                          isDone ? "bg-emerald-500 shadow-sm" : isActive ? "bg-blue-600 shadow-md shadow-blue-200" : "bg-gray-100"
                        }`}>
                          {isDone ? <Check className="w-4 h-4 text-white" />
                                  : <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />}
                        </div>
                        <div>
                          <p className={`text-[13px] font-black leading-none ${isActive ? "text-blue-700" : isDone ? "text-emerald-700" : "text-gray-500"}`}>{s.label}</p>
                          <p className={`text-[11px] mt-0.5 font-medium ${isActive ? "text-blue-500" : "text-gray-400"}`}>{s.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Completion</span>
                  <span className="text-[12px] font-black text-blue-600">{submitted ? 100 : Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div animate={{ width: submitted ? "100%" : `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                </div>
              </div>

              {/* Tips for current step */}
              <div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
                  💡 Tips for this step
                </p>
                <div className="space-y-3">
                  {(TIPS[step] || []).map((t, i) => {
                    const Icon = t.icon;
                    return (
                      <div key={i} className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl p-3">
                        <Icon className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <p className="text-[12px] font-semibold text-blue-700 leading-snug">{t.tip}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pricing info */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-blue-600" />
                  <p className="text-[12.5px] font-black text-blue-800">Free Job Posting</p>
                </div>
                <p className="text-[11.5px] text-blue-600 leading-relaxed">
                  Post your first job for free. Reach 50k+ candidates with no commitment.
                </p>
              </div>
            </div>
          </aside>

          {/* ── Form + Preview ── */}
          <div className="lg:col-span-9 grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">

            {/* Form card */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Form header */}
                {!submitted && (
                  <div className="px-8 pt-8 pb-6 border-b border-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-black text-gray-900">{STEPS[step - 1].label}</h2>
                        <p className="text-sm text-gray-400 mt-0.5">{STEPS[step - 1].desc}</p>
                      </div>
                      <span className="text-[12px] font-black text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">
                        {step} / 4
                      </span>
                    </div>
                    {/* Step dots */}
                    <div className="flex gap-1.5 mt-5">
                      {STEPS.map((s) => (
                        <div key={s.id} className={`h-1.5 rounded-full transition-all duration-500 ${step >= s.id ? "bg-blue-600" : "bg-gray-100"} ${step === s.id ? "flex-[2]" : "flex-1"}`} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Form body */}
                <div className="px-8 py-8">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <SuccessScreen key="success" form={form} />
                    ) : (
                      <>
                        {step === 1 && <StepJobDetails    form={form} setForm={setForm} errors={errors} />}
                        {step === 2 && <StepCompany       form={form} setForm={setForm} errors={errors} />}
                        {step === 3 && <StepCompensation  form={form} setForm={setForm} errors={errors} />}
                        {step === 4 && <StepDescription   form={form} setForm={setForm} errors={errors} />}
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                {!submitted && (
                  <div className="px-8 pb-8 flex items-center justify-between gap-4">
                    <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))}
                      disabled={step === 1}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-gray-200 text-sm font-black text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="button" onClick={handleNext}
                      className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black rounded-2xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5">
                      {step === 4
                        ? <><Send className="w-4 h-4" /> Publish Job</>
                        : <>Continue <ArrowRight className="w-4 h-4" /></>
                      }
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Live Preview */}
            {!submitted && (
              <div className="xl:col-span-2">
                <LivePreview form={form} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}