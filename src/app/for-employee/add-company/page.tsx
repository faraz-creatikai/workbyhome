"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Globe, MapPin, Users, Mail, Phone,
  Upload,
  Plus, X, Check, ArrowRight, ArrowLeft, CheckCircle2,
  Sparkles, Eye, Zap, Star, AlertCircle, Link2,
  Shield, Code2, Palette, BarChart3, Megaphone, Layers,
  Heart, Wrench, GraduationCap, TrendingUp, FileText,
  DollarSign, Camera, BookOpen, Tag, Award, Flame,
  Target, Package, Send, ChevronDown, Lock, Coffee,
  Laptop, RefreshCw, Clock, PenLine, Image, Flag,
  CheckSquare, BarChart2, Briefcase, ExternalLink,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  companyName: string; tagline: string; industry: string; companyType: string;
  founded: string; companySize: string; logo: File | null; logoPreview: string;
  coverImage: File | null; coverPreview: string;
  headquarters: string; workModel: string; officeLocations: string[];
  website: string; email: string; phone: string;
  linkedin: string; twitter: string; github: string; instagram: string;
  mission: string; values: string[]; perks: string[]; techStack: string[];
  workHours: string; languages: string[];
  about: string; teamHighlights: string[]; totalFunding: string;
  fundingStage: string; isPubliclyListed: boolean; stockSymbol: string;
  agreeTerms: boolean; agreeAccurate: boolean;
}

interface StepProps {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Company Identity",   icon: Building2,   desc: "Name, logo & industry" },
  { id: 2, label: "Location & Contact", icon: MapPin,       desc: "Where you are & how to reach you" },
  { id: 3, label: "Culture & Perks",    icon: Heart,        desc: "Values, benefits & stack" },
  { id: 4, label: "About & Verify",     icon: CheckSquare,  desc: "Story & verification" },
];

const INDUSTRIES = [
  { label: "SaaS / Productivity",    icon: Layers,        color: "text-blue-600 bg-blue-50 border-blue-100" },
  { label: "Fintech",                icon: DollarSign,    color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
  { label: "AI & Machine Learning",  icon: BarChart3,     color: "text-violet-600 bg-violet-50 border-violet-100" },
  { label: "Developer Tools",        icon: Code2,         color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
  { label: "Design Tools",           icon: Palette,       color: "text-pink-600 bg-pink-50 border-pink-100" },
  { label: "E-commerce",             icon: Package,       color: "text-amber-600 bg-amber-50 border-amber-100" },
  { label: "Health & Wellness",      icon: Heart,         color: "text-rose-600 bg-rose-50 border-rose-100" },
  { label: "HR Tech",                icon: Users,         color: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100" },
  { label: "Infrastructure",         icon: Shield,        color: "text-slate-600 bg-slate-50 border-slate-200" },
  { label: "Community & Media",      icon: Megaphone,     color: "text-orange-600 bg-orange-50 border-orange-100" },
  { label: "Education",              icon: GraduationCap, color: "text-sky-600 bg-sky-50 border-sky-100" },
  { label: "Marketing Tech",         icon: TrendingUp,    color: "text-teal-600 bg-teal-50 border-teal-100" },
];

const COMPANY_TYPES   = ["Startup", "Scale-up", "SME", "Enterprise", "Agency", "Non-profit", "Open-source"];
const COMPANY_SIZES   = ["1–10", "11–50", "51–200", "201–500", "501–1,000", "1,000+"];
const WORK_MODELS     = ["Fully Remote", "Remote-first", "Hybrid", "On-site"];
const WORK_HOURS      = ["Async-first (flexible hours)", "Core hours (4h overlap)", "Fixed hours (9–5)", "Flexible (we trust you)"];
const FUNDING_STAGES  = ["Bootstrapped", "Pre-seed", "Seed", "Series A", "Series B", "Series C+", "Public", "Profitable"];
const FUNDING_AMOUNTS = ["N/A", "< $1M", "$1M – $5M", "$5M – $20M", "$20M – $100M", "$100M+"];

const POPULAR_PERKS = [
  "Health Insurance", "Flexible Hours", "Home Office Budget", "Learning Budget",
  "Equity / Stock", "Unlimited PTO", "Async-first", "Team Retreats",
  "Mental Wellness", "401k / Pension", "Paid Parental Leave", "Gym / Wellness",
  "Company Laptop", "Conference Budget", "Co-working Stipend", "Free Meals",
  "Pet-friendly", "4-day Work Week", "Sabbatical Policy", "Visa Sponsorship",
];

const POPULAR_TECH = [
  "React", "TypeScript", "Node.js", "Python", "Go", "AWS", "GCP", "Azure",
  "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "GraphQL",
  "Next.js", "Terraform", "Figma", "Notion", "Slack", "Linear", "GitHub",
];

const POPULAR_VALUES = [
  "Transparency", "Ownership", "Customer First", "Move Fast", "Quality over Speed",
  "Async First", "Diversity & Inclusion", "Work-Life Balance", "Continuous Learning",
  "Open Source", "Sustainability", "Innovation", "Trust", "Collaboration",
];

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Mandarin", "Hindi",
  "Portuguese", "Arabic", "Japanese", "Korean", "Italian", "Dutch",
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

function TagInput({
  label, items, setItems, suggestions, placeholder, color = "blue", max = 15,
}: {
  label: string; items: string[]; setItems: (v: string[]) => void;
  suggestions?: string[]; placeholder: string; color?: "blue"|"emerald"|"violet"|"amber"; max?: number;
}) {
  const [input, setInput] = useState("");

  const colorMap = {
    blue:    { btn: "bg-blue-600 hover:bg-blue-700",       tag: "text-blue-700 bg-blue-50 border-blue-100",       chip: "hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600" },
    emerald: { btn: "bg-emerald-600 hover:bg-emerald-700", tag: "text-emerald-700 bg-emerald-50 border-emerald-100", chip: "hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600" },
    violet:  { btn: "bg-violet-600 hover:bg-violet-700",   tag: "text-violet-700 bg-violet-50 border-violet-100",  chip: "hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600" },
    amber:   { btn: "bg-amber-500 hover:bg-amber-600",     tag: "text-amber-700 bg-amber-50 border-amber-100",     chip: "hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600" },
  };
  const c = colorMap[color];

  const add = (val: string) => {
    const v = val.trim();
    if (v && !items.includes(v) && items.length < max) setItems([...items, v]);
    setInput("");
  };

  return (
    <div>
      <Label>{label} <span className="text-gray-400 font-normal normal-case tracking-normal">({items.length}/{max})</span></Label>
      {suggestions && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {suggestions.filter((s) => !items.includes(s)).slice(0, 12).map((s) => (
            <button key={s} type="button" onClick={() => add(s)}
              className={`text-[11.5px] font-semibold px-2.5 py-1.5 rounded-lg border bg-gray-50 text-gray-500 transition-all ${c.chip}`}>
              + {s}
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input type="text" placeholder={placeholder} value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(input); } }}
          className={inputCls()} />
        <button type="button" onClick={() => add(input)}
          className={`px-4 py-2.5 ${c.btn} text-white rounded-xl font-bold text-sm transition-colors flex-shrink-0`}>
          Add
        </button>
      </div>
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-1.5 mt-3">
            {items.map((item) => (
              <motion.span key={item} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                className={`flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-xl border ${c.tag}`}>
                {item}
                <button type="button" onClick={() => setItems(items.filter((x) => x !== item))}>
                  <X className="w-3 h-3 hover:opacity-70" />
                </button>
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Step 1: Company Identity ─────────────────────────────────────────────────
function StepIdentity({ form, setForm, errors }: StepProps) {
  const logoRef  = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File, type: "logo" | "cover") => {
    const url = URL.createObjectURL(file);
    if (type === "logo") setForm((f) => ({ ...f, logo: file, logoPreview: url }));
    else                 setForm((f) => ({ ...f, coverImage: file, coverPreview: url }));
  };

  const onCoverDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file, "cover");
  }, []);

  return (
    <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="space-y-6">

      {/* Cover */}
      <div>
        <Label>Company Cover Image</Label>
        <div onDragOver={(e) => e.preventDefault()} onDrop={onCoverDrop}
          onClick={() => !form.coverPreview && coverRef.current?.click()}
          className={`relative h-36 rounded-2xl border-2 border-dashed overflow-hidden flex items-center justify-center transition-all cursor-pointer group ${
            form.coverPreview ? "border-transparent" : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
          }`}>
          {form.coverPreview ? (
            <>
              <img src={form.coverPreview} className="w-full h-full object-cover" alt="Cover" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button type="button" onClick={(e) => { e.stopPropagation(); coverRef.current?.click(); }}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-white bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/30 hover:bg-white/30 transition-colors">
                  <Image className="w-3.5 h-3.5" /> Change
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); setForm((f) => ({ ...f, coverImage: null, coverPreview: "" })); }}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-white bg-red-500/70 px-3 py-2 rounded-xl border border-white/30 hover:bg-red-500 transition-colors">
                  <X className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 pointer-events-none">
              <div className="w-12 h-12 bg-white rounded-2xl border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-blue-200 transition-colors">
                <Image className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-[13px] font-bold text-gray-600">Drag & drop or <span className="text-blue-600">browse</span></p>
                <p className="text-[11.5px] text-gray-400 mt-0.5">Recommended: 1400×400px · PNG, JPG, WebP</p>
              </div>
            </div>
          )}
        </div>
        <input ref={coverRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f, "cover"); }} />
      </div>

      {/* Logo + name row */}
      <div className="flex gap-5 items-start">
        <div onClick={() => logoRef.current?.click()}
          className="relative w-20 h-20 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all group overflow-hidden flex-shrink-0">
          {form.logoPreview
            ? <img src={form.logoPreview} className="w-full h-full object-contain p-1" alt="Logo" />
            : <div className="flex flex-col items-center gap-1">
                <Building2 className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-500">Logo</span>
              </div>
          }
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <Plus className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <Label required>Company Name</Label>
            <input type="text" placeholder="e.g. Stripe, Notion, Linear…"
              value={form.companyName} onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
              className={inputCls(errors.companyName)} />
            <FieldErr msg={errors.companyName} />
          </div>
          <div>
            <Label>Tagline</Label>
            <input type="text" placeholder="e.g. Financial infrastructure for the internet"
              value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
              className={inputCls()} />
          </div>
        </div>
        <input ref={logoRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f, "logo"); }} />
      </div>

      {/* Industry */}
      <div>
        <Label required>Industry</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            const sel = form.industry === ind.label;
            return (
              <button key={ind.label} type="button" onClick={() => setForm((f) => ({ ...f, industry: ind.label }))}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[12px] font-bold transition-all text-left ${
                  sel ? `${ind.color} border-current shadow-sm` : "border-gray-100 text-gray-600 hover:border-gray-200 hover:bg-gray-50"
                }`}>
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{ind.label}</span>
              </button>
            );
          })}
        </div>
        <FieldErr msg={errors.industry} />
      </div>

      {/* Company type */}
      <div>
        <Label required>Company Type</Label>
        <div className="flex flex-wrap gap-2">
          {COMPANY_TYPES.map((t) => {
            const sel = form.companyType === t;
            return (
              <button key={t} type="button" onClick={() => setForm((f) => ({ ...f, companyType: t }))}
                className={`text-[12.5px] font-bold px-3.5 py-2 rounded-xl border transition-all ${
                  sel ? "bg-blue-600 border-blue-600 text-white shadow-sm" : "border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
                }`}>
                {sel && <Check className="inline w-3 h-3 mr-1" />}{t}
              </button>
            );
          })}
        </div>
        <FieldErr msg={errors.companyType} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label required>Company Size</Label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select value={form.companySize} onChange={(e) => setForm((f) => ({ ...f, companySize: e.target.value }))}
              className={`${inputCls(errors.companySize)} pl-10 pr-8 appearance-none cursor-pointer`}>
              <option value="">Select size…</option>
              {COMPANY_SIZES.map((s) => <option key={s}>{s} employees</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <FieldErr msg={errors.companySize} />
        </div>
        <div>
          <Label>Year Founded</Label>
          <div className="relative">
            <Flag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="number" placeholder="e.g. 2019" min="1900" max={new Date().getFullYear()}
              value={form.founded} onChange={(e) => setForm((f) => ({ ...f, founded: e.target.value }))}
              className={`${inputCls()} pl-10`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Step 2: Location & Contact ───────────────────────────────────────────────
function StepContact({ form, setForm, errors }: StepProps) {
  const [officeInput, setOfficeInput] = useState("");
  const addOffice = () => {
    const v = officeInput.trim();
    if (v && !form.officeLocations.includes(v) && form.officeLocations.length < 10) {
      setForm((f) => ({ ...f, officeLocations: [...f.officeLocations, v] }));
      setOfficeInput("");
    }
  };

  return (
    <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="space-y-6">

      {/* Work model */}
      <div>
        <Label required>Work Model</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {WORK_MODELS.map((m) => {
            const icons: Record<string, React.ElementType> = { "Fully Remote": Globe, "Remote-first": Globe, Hybrid: Building2, "On-site": MapPin };
            const Icon = icons[m] || Globe;
            const sel = form.workModel === m;
            return (
              <button key={m} type="button" onClick={() => setForm((f) => ({ ...f, workModel: m }))}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all ${
                  sel ? "border-blue-400 bg-blue-50 shadow-sm" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}>
                <Icon className={`w-5 h-5 ${sel ? "text-blue-600" : "text-gray-400"}`} />
                <span className={`text-[12px] font-bold ${sel ? "text-blue-700" : "text-gray-600"}`}>{m}</span>
              </button>
            );
          })}
        </div>
        <FieldErr msg={errors.workModel} />
      </div>

      {/* HQ */}
      <div>
        <Label required>Headquarters</Label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="e.g. San Francisco, CA, USA"
            value={form.headquarters} onChange={(e) => setForm((f) => ({ ...f, headquarters: e.target.value }))}
            className={`${inputCls(errors.headquarters)} pl-10`} />
        </div>
        <FieldErr msg={errors.headquarters} />
      </div>

      {/* Office Locations */}
      <div>
        <Label>Office Locations <span className="text-gray-400 font-normal normal-case tracking-normal">(optional)</span></Label>
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="e.g. London, UK"
              value={officeInput} onChange={(e) => setOfficeInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addOffice(); } }}
              className={`${inputCls()} pl-10`} />
          </div>
          <button type="button" onClick={addOffice}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors flex-shrink-0">Add</button>
        </div>
        <AnimatePresence>
          {form.officeLocations.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-2">
              {form.officeLocations.map((loc) => (
                <motion.span key={loc} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl">
                  <MapPin className="w-3 h-3" />{loc}
                  <button type="button" onClick={() => setForm((f) => ({ ...f, officeLocations: f.officeLocations.filter((x) => x !== loc) }))}>
                    <X className="w-3 h-3 hover:text-blue-900" />
                  </button>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Contact Email</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="email" placeholder="careers@yourcompany.com"
              value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={`${inputCls(errors.email)} pl-10`} />
          </div>
          <FieldErr msg={errors.email} />
        </div>
        <div>
          <Label>Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="tel" placeholder="+1 (555) 000-0000"
              value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className={`${inputCls()} pl-10`} />
          </div>
        </div>
      </div>

      <div>
        <Label required>Company Website</Label>
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="url" placeholder="https://yourcompany.com"
            value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
            className={`${inputCls(errors.website)} pl-10`} />
        </div>
        <FieldErr msg={errors.website} />
      </div>

      {/* Social */}
      <div>
        <Label>Social Media Links <span className="text-gray-400 font-normal normal-case tracking-normal">(optional)</span></Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {([
            { icon: FaLinkedin,  field: "linkedin",  placeholder: "linkedin.com/company/…", cls: "text-blue-600" },
            { icon: FaTwitter,   field: "twitter",   placeholder: "twitter.com/…",          cls: "text-sky-500" },
            { icon: FaGithub,    field: "github",    placeholder: "github.com/…",           cls: "text-gray-700" },
            { icon: FaInstagram, field: "instagram", placeholder: "instagram.com/…",        cls: "text-pink-600" },
          ] as const).map(({ icon: Icon, field, placeholder, cls }) => (
            <div key={field} className="relative">
              <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${cls}`} />
              <input type="url" placeholder={placeholder}
                value={(form as any)[field]} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                className={`${inputCls()} pl-10`} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Step 3: Culture & Perks ──────────────────────────────────────────────────
function StepCulture({ form, setForm, errors }: StepProps) {
  return (
    <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="space-y-6">

      <div>
        <Label required>Mission Statement</Label>
        <textarea rows={3} placeholder="What does your company exist to do? What impact are you working toward?"
          value={form.mission} onChange={(e) => setForm((f) => ({ ...f, mission: e.target.value }))}
          className={`${inputCls(errors.mission)} resize-none leading-relaxed`} />
        <div className="flex items-center justify-between mt-1">
          <FieldErr msg={errors.mission} />
          <p className="text-[11.5px] text-gray-400 ml-auto">{form.mission.length} / 300</p>
        </div>
      </div>

      <TagInput label="Company Values" items={form.values}
        setItems={(v) => setForm((f) => ({ ...f, values: v }))}
        suggestions={POPULAR_VALUES} placeholder="e.g. Customer First…" color="violet" max={10} />

      <div>
        <Label>Work Hours Culture</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {WORK_HOURS.map((wh) => {
            const sel = form.workHours === wh;
            return (
              <button key={wh} type="button" onClick={() => setForm((f) => ({ ...f, workHours: wh }))}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left transition-all ${
                  sel ? "border-blue-400 bg-blue-50 shadow-sm" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}>
                <Clock className={`w-4 h-4 flex-shrink-0 ${sel ? "text-blue-600" : "text-gray-400"}`} />
                <span className={`text-[13px] font-bold ${sel ? "text-blue-700" : "text-gray-600"}`}>{wh}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label>Benefits & Perks <span className="text-gray-400 font-normal normal-case tracking-normal">(select all)</span></Label>
        <div className="flex flex-wrap gap-2">
          {POPULAR_PERKS.map((perk) => {
            const sel = form.perks.includes(perk);
            return (
              <button key={perk} type="button"
                onClick={() => setForm((f) => ({ ...f, perks: sel ? f.perks.filter((x) => x !== perk) : [...f.perks, perk] }))}
                className={`flex items-center gap-1.5 text-[12px] font-bold px-3 py-2 rounded-xl border transition-all ${
                  sel ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                      : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50"
                }`}>
                {sel && <Check className="w-3 h-3" />}{perk}
              </button>
            );
          })}
        </div>
        {form.perks.length === 0 && (
          <p className="text-[12px] text-amber-600 mt-2 flex items-center gap-1.5">
            <Zap className="w-3 h-3" /> Companies with 4+ perks attract 2× more applicants
          </p>
        )}
      </div>

      <TagInput label="Tech Stack" items={form.techStack}
        setItems={(v) => setForm((f) => ({ ...f, techStack: v }))}
        suggestions={POPULAR_TECH} placeholder="e.g. React, Go, PostgreSQL…" color="blue" max={20} />

      <div>
        <Label>Working Languages</Label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => {
            const sel = form.languages.includes(lang);
            return (
              <button key={lang} type="button"
                onClick={() => setForm((f) => ({ ...f, languages: sel ? f.languages.filter((x) => x !== lang) : [...f.languages, lang] }))}
                className={`text-[12.5px] font-bold px-3.5 py-2 rounded-xl border transition-all ${
                  sel ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                      : "border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
                }`}>
                {sel && <Check className="inline w-3 h-3 mr-1" />}{lang}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Step 4: About & Verify ───────────────────────────────────────────────────
function StepAbout({ form, setForm, errors }: StepProps) {
  return (
    <motion.div key="s4" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="space-y-6">

      <div>
        <Label required>About the Company</Label>
        <textarea rows={6}
          placeholder="Tell candidates who you are — your story, what you build, your product, your market, and why someone should join you. Be authentic and specific."
          value={form.about} onChange={(e) => setForm((f) => ({ ...f, about: e.target.value }))}
          className={`${inputCls(errors.about)} resize-none leading-relaxed`} />
        <div className="flex items-center justify-between mt-1">
          <FieldErr msg={errors.about} />
          <p className="text-[11.5px] text-gray-400 ml-auto">{form.about.length} / 2000</p>
        </div>
      </div>

      <TagInput label="Team Highlights" items={form.teamHighlights}
        setItems={(v) => setForm((f) => ({ ...f, teamHighlights: v }))}
        placeholder="e.g. Ex-Stripe, Ex-Google engineers…" color="amber" max={8} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Funding Stage</Label>
          <div className="relative">
            <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select value={form.fundingStage} onChange={(e) => setForm((f) => ({ ...f, fundingStage: e.target.value }))}
              className={`${inputCls()} pl-10 pr-8 appearance-none cursor-pointer`}>
              <option value="">Select stage…</option>
              {FUNDING_STAGES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div>
          <Label>Total Funding Raised</Label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select value={form.totalFunding} onChange={(e) => setForm((f) => ({ ...f, totalFunding: e.target.value }))}
              className={`${inputCls()} pl-10 pr-8 appearance-none cursor-pointer`}>
              <option value="">Select range…</option>
              {FUNDING_AMOUNTS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Publicly listed */}
      <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4">
        <div>
          <p className="text-[13.5px] font-black text-gray-800">Publicly Listed Company</p>
          <p className="text-[12px] text-gray-400 mt-0.5">Traded on a public stock exchange?</p>
        </div>
        <button type="button" onClick={() => setForm((f) => ({ ...f, isPubliclyListed: !f.isPubliclyListed }))}
          className="relative rounded-full transition-colors flex-shrink-0"
          style={{ width: 44, height: 24, background: form.isPubliclyListed ? "#2563eb" : "#e5e7eb" }}>
          <motion.div animate={{ x: form.isPubliclyListed ? 22 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="absolute top-[4px] w-4 h-4 bg-white rounded-full shadow-sm" />
        </button>
      </div>

      <AnimatePresence>
        {form.isPubliclyListed && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <Label>Stock Symbol / Ticker</Label>
            <div className="relative">
              <BarChart2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="e.g. AAPL, GOOGL"
                value={form.stockSymbol} onChange={(e) => setForm((f) => ({ ...f, stockSymbol: e.target.value.toUpperCase() }))}
                className={`${inputCls()} pl-10 font-bold tracking-widest`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Agreements */}
      <div className="space-y-3 pt-2 border-t border-gray-100">
        <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Agreements</p>
        {[
          { field: "agreeAccurate" as const, label: "I confirm that all company information provided is accurate and truthful." },
          { field: "agreeTerms"    as const, label: "I agree to the WorkByHome Terms of Service and Company Listing Policy." },
        ].map(({ field, label }) => (
          <label key={field} className="flex items-start gap-3 cursor-pointer group">
            <div onClick={() => setForm((f) => ({ ...f, [field]: !f[field] }))}
              className={`w-5 h-5 rounded-[6px] flex items-center justify-center flex-shrink-0 border-2 mt-0.5 transition-all ${
                form[field] ? "bg-blue-600 border-blue-600" : "border-gray-200 group-hover:border-blue-300"
              }`}>
              {form[field] && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className={`text-[13px] font-medium leading-snug ${form[field] ? "text-gray-800" : "text-gray-500"}`}>{label}</span>
          </label>
        ))}
        {(errors.agreeTerms || errors.agreeAccurate) && <FieldErr msg="Please agree to all terms before submitting" />}
      </div>

      <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4">
        <Lock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[12.5px] font-black text-amber-800">Verified Company Badge</p>
          <p className="text-[12px] text-amber-600 mt-0.5 leading-relaxed">
            After submission our team reviews your profile within 24–48 hours. Verified companies receive a badge and <strong>3× more candidate views</strong>.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Live Preview ──────────────────────────────────────────────────────────────
function LivePreview({ form }: { form: FormData }) {
  const ind      = INDUSTRIES.find((i) => i.label === form.industry);
  const indColor = ind?.color || "text-blue-600 bg-blue-50 border-blue-100";
  const IndIcon  = ind?.icon || Building2;

  const quality = Math.round(
    [form.companyName, form.industry, form.companyType, form.companySize,
     form.workModel, form.headquarters, form.email, form.website,
     form.mission, form.perks.length > 0, form.techStack.length > 0, form.about]
      .filter(Boolean).length / 12 * 100
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-24">
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
        <Eye className="w-4 h-4 text-blue-500" />
        <span className="text-[12px] font-black text-gray-600 uppercase tracking-widest">Live Preview</span>
        <span className="ml-auto text-[10.5px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">Updates live</span>
      </div>

      <div className={`h-24 relative ${form.coverPreview ? "" : "bg-gradient-to-r from-slate-800 to-blue-900"}`}>
        {form.coverPreview
          ? <img src={form.coverPreview} className="w-full h-full object-cover" alt="" />
          : <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "16px 16px" }} />
        }
      </div>

      <div className="px-5 pb-5">
        <div className="flex items-end gap-3 -mt-6 mb-3">
          <div className="w-14 h-14 bg-white border-2 border-white shadow-md rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
            {form.logoPreview
              ? <img src={form.logoPreview} className="w-full h-full object-contain p-1" alt="" />
              : <Building2 className="w-6 h-6 text-gray-300" />
            }
          </div>
          <div className="pb-1 min-w-0">
            <h3 className="text-[14.5px] font-black text-gray-900 truncate">{form.companyName || "Company Name"}</h3>
            <p className="text-[11.5px] text-gray-400 truncate">{form.tagline || "Your tagline here"}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {form.industry && (
            <span className={`flex items-center gap-1 text-[10.5px] font-black px-2 py-1 rounded-full border ${indColor}`}>
              <IndIcon className="w-2.5 h-2.5" />{form.industry}
            </span>
          )}
          {form.workModel && (
            <span className={`text-[10.5px] font-bold px-2 py-1 rounded-full border ${
              form.workModel === "Fully Remote" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"
            }`}>{form.workModel}</span>
          )}
          {form.companyType && (
            <span className="text-[10.5px] font-bold px-2 py-1 rounded-full border bg-gray-50 text-gray-500 border-gray-100">{form.companyType}</span>
          )}
        </div>

        <div className="space-y-1.5 text-[12px] text-gray-400 mb-3">
          {form.headquarters && <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{form.headquarters}</span>}
          {form.companySize  && <span className="flex items-center gap-1.5"><Users className="w-3 h-3" />{form.companySize} employees</span>}
          {form.founded      && <span className="flex items-center gap-1.5"><Flag className="w-3 h-3" />Founded {form.founded}</span>}
          {form.website      && <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" />{form.website.replace("https://", "")}</span>}
        </div>

        {form.mission && (
          <p className="text-[12px] text-gray-500 italic leading-relaxed line-clamp-2 mb-3 border-l-2 border-blue-200 pl-3">
            "{form.mission}"
          </p>
        )}

        {form.perks.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {form.perks.slice(0, 5).map((p) => (
              <span key={p} className="text-[10.5px] font-semibold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">{p}</span>
            ))}
            {form.perks.length > 5 && <span className="text-[10.5px] text-gray-400 px-1 self-center">+{form.perks.length - 5}</span>}
          </div>
        )}

        {form.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {form.techStack.slice(0, 6).map((t) => (
              <span key={t} className="text-[10.5px] font-semibold px-2 py-0.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">{t}</span>
            ))}
            {form.techStack.length > 6 && <span className="text-[10.5px] text-gray-400 px-1 self-center">+{form.techStack.length - 6}</span>}
          </div>
        )}

        <div className="flex gap-2 mb-4">
          {form.linkedin  && <FaLinkedin  className="w-4 h-4 text-blue-600" />}
          {form.twitter   && <FaTwitter   className="w-4 h-4 text-sky-500" />}
          {form.github    && <FaGithub    className="w-4 h-4 text-gray-700" />}
          {form.instagram && <FaInstagram className="w-4 h-4 text-pink-500" />}
        </div>

        {/* Quality meter */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Profile Quality</span>
            <span className={`text-[11px] font-black ${quality >= 80 ? "text-emerald-600" : quality >= 50 ? "text-amber-600" : "text-blue-600"}`}>{quality}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${quality}%` }} transition={{ duration: 0.5 }}
              className={`h-full rounded-full ${quality >= 80 ? "bg-gradient-to-r from-emerald-400 to-teal-400" : quality >= 50 ? "bg-gradient-to-r from-amber-400 to-orange-400" : "bg-gradient-to-r from-blue-500 to-cyan-400"}`} />
          </div>
          <p className="text-[11px] text-gray-400 mt-1.5">
            {quality >= 80 ? "🎉 Excellent profile — ready to attract top talent!" : quality >= 50 ? "Keep going — more detail = more applicants." : "Fill in more details to improve visibility."}
          </p>
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

      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 bg-emerald-100 rounded-3xl animate-pulse" />
        <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-200">
          <Building2 className="w-11 h-11 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-7 h-7 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
      </div>

      <h2 className="text-2xl font-black text-gray-900 mb-2">Company Profile Created!</h2>
      <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed mb-8">
        <span className="font-bold text-gray-700">{form.companyName}</span> is now listed on WorkByHome and will be reviewed for verification within 24–48 hours.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { icon: Eye,       value: "50k+", label: "Candidates can discover you", color: "text-blue-600 bg-blue-50" },
          { icon: Shield,    value: "48h",  label: "Verification timeline",       color: "text-emerald-600 bg-emerald-50" },
          { icon: Briefcase, value: "Free", label: "First job post included",     color: "text-violet-600 bg-violet-50" },
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

      <div className="bg-gray-50 rounded-2xl p-5 text-left border border-gray-100 mb-6">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">What Happens Next</p>
        {[
          { icon: Eye,       text: "Your company profile is immediately discoverable by candidates" },
          { icon: Shield,    text: "Our team reviews & grants your Verified Company badge in 48h" },
          { icon: Briefcase, text: "Post your first job and start receiving qualified applications" },
          { icon: BarChart2, text: "Track views, followers, and applicants in your Employer Dashboard" },
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
          <Briefcase className="w-4 h-4" /> Post a Job
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-black text-sm rounded-2xl transition-all">
          <Eye className="w-4 h-4" /> View Profile
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AddCompany() {
  const [step, setStep]           = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});

  const [form, setForm] = useState<FormData>({
    companyName: "", tagline: "", industry: "", companyType: "", founded: "", companySize: "",
    logo: null, logoPreview: "", coverImage: null, coverPreview: "",
    headquarters: "", workModel: "", officeLocations: [], website: "", email: "",
    phone: "", linkedin: "", twitter: "", github: "", instagram: "",
    mission: "", values: [], perks: [], techStack: [], workHours: "", languages: [],
    about: "", teamHighlights: [], totalFunding: "", fundingStage: "",
    isPubliclyListed: false, stockSymbol: "", agreeTerms: false, agreeAccurate: false,
  });

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!form.companyName.trim()) e.companyName = "Company name is required";
      if (!form.industry)           e.industry    = "Please select an industry";
      if (!form.companyType)        e.companyType = "Please select a company type";
      if (!form.companySize)        e.companySize = "Please select company size";
    }
    if (step === 2) {
      if (!form.headquarters.trim())                          e.headquarters = "Headquarters is required";
      if (!form.workModel)                                    e.workModel    = "Please select a work model";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
      if (!form.website.trim())                               e.website      = "Company website is required";
    }
    if (step === 3) {
      if (!form.mission.trim()) e.mission = "Mission statement is required";
    }
    if (step === 4) {
      if (!form.about.trim())  e.about        = "Company description is required";
      if (!form.agreeAccurate) e.agreeAccurate = "Please confirm accuracy";
      if (!form.agreeTerms)    e.agreeTerms   = "Please agree to terms";
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
      { icon: Image,    tip: "Companies with cover images get 2.5× more profile views" },
      { icon: Sparkles, tip: "A clear tagline helps candidates quickly understand your product" },
    ],
    2: [
      { icon: Globe,    tip: "Fully remote companies attract 3× more international talent" },
      { icon: FaLinkedin, tip: "LinkedIn link increases candidate trust and click-through by 40%" },
    ],
    3: [
      { icon: Heart,    tip: "Mission-driven companies see 60% higher candidate retention" },
      { icon: Zap,      tip: "Sharing your tech stack attracts the exact engineers you need" },
    ],
    4: [
      { icon: PenLine,  tip: "Detailed descriptions rank higher in candidate searches" },
      { icon: Award,    tip: "Verified badges increase application rates by 80%" },
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
          style={{ backgroundImage: "radial-gradient(circle,#ffffff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="max-w-3xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              <Building2 className="w-3 h-3" /> Add Your Company
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-4">
              Build Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                Employer Brand
              </span>
            </h1>
            <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed mb-8">
              Create a compelling company profile that attracts the best remote talent. Get discovered by 50,000+ pre-vetted candidates actively looking for their next role.
            </p>

            {/* Stats bar */}
            <div className="inline-flex items-center gap-0 bg-white/10 backdrop-blur-sm border border-white/15 px-6 py-3.5 rounded-2xl">
              {[
                { value: "2,000+", label: "Companies listed" },
                { value: "50k+",   label: "Active candidates" },
                { value: "48h",    label: "Avg. verification" },
                { value: "Free",   label: "To get started" },
              ].map((s, i) => (
                <div key={s.label} className={`text-center px-5 ${i > 0 ? "border-l border-white/20" : ""}`}>
                  <p className="text-[14px] font-black text-white">{s.value}</p>
                  <p className="text-[10.5px] text-white/50 font-medium">{s.label}</p>
                </div>
              ))}
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
              <div>
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Progress</h3>
                <div className="space-y-2">
                  {STEPS.map((s) => {
                    const Icon   = s.icon;
                    const isActive = step === s.id;
                    const isDone   = step > s.id || submitted;
                    return (
                      <div key={s.id} className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${isActive ? "bg-blue-50 border border-blue-100" : "border border-transparent"}`}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                          isDone ? "bg-emerald-500 shadow-sm" : isActive ? "bg-blue-600 shadow-md shadow-blue-200" : "bg-gray-100"
                        }`}>
                          {isDone ? <Check className="w-4 h-4 text-white" /> : <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />}
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

              <div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">💡 Tips</p>
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

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <p className="text-[12.5px] font-black text-emerald-800">Verified Badge</p>
                </div>
                <p className="text-[11.5px] text-emerald-600 leading-relaxed">
                  Verified companies see <span className="font-bold">80% more applications</span> and rank higher in candidate searches.
                </p>
              </div>
            </div>
          </aside>

          {/* ── Form + Preview ── */}
          <div className="lg:col-span-9 grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">
            <div className="xl:col-span-3">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {!submitted && (
                  <div className="px-8 pt-8 pb-6 border-b border-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-black text-gray-900">{STEPS[step - 1].label}</h2>
                        <p className="text-sm text-gray-400 mt-0.5">{STEPS[step - 1].desc}</p>
                      </div>
                      <span className="text-[12px] font-black text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">{step} / 4</span>
                    </div>
                    <div className="flex gap-1.5 mt-5">
                      {STEPS.map((s) => (
                        <div key={s.id} className={`h-1.5 rounded-full transition-all duration-500 ${step >= s.id ? "bg-blue-600" : "bg-gray-100"} ${step === s.id ? "flex-[2]" : "flex-1"}`} />
                      ))}
                    </div>
                  </div>
                )}

                <div className="px-8 py-8">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <SuccessScreen key="success" form={form} />
                    ) : (
                      <>
                        {step === 1 && <StepIdentity form={form} setForm={setForm} errors={errors} />}
                        {step === 2 && <StepContact  form={form} setForm={setForm} errors={errors} />}
                        {step === 3 && <StepCulture  form={form} setForm={setForm} errors={errors} />}
                        {step === 4 && <StepAbout    form={form} setForm={setForm} errors={errors} />}
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {!submitted && (
                  <div className="px-8 pb-8 flex items-center justify-between gap-4">
                    <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-gray-200 text-sm font-black text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="button" onClick={handleNext}
                      className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black rounded-2xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5">
                      {step === 4
                        ? <><Building2 className="w-4 h-4" /> Create Company Profile</>
                        : <>Continue <ArrowRight className="w-4 h-4" /></>
                      }
                    </button>
                  </div>
                )}
              </div>
            </div>

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