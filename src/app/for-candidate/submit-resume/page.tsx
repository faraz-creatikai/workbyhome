"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, User, Briefcase, MapPin, DollarSign, Globe,
  CheckCircle2, ArrowRight, ArrowLeft, Plus, X, Sparkles,
  FileText, Code2, Palette,
  BarChart3, Megaphone, Shield, Layers, GraduationCap,
  Clock, Star, Zap, ChevronDown, Eye, EyeOff, Lock,
  Mail, Phone, Building2, Award, TrendingUp, Heart,
  BookOpen, Camera, Wrench, Users, Check, AlertCircle,
} from "lucide-react";
import { BsTwitter } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

// ─── Types ──────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1 – Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  profilePhoto: File | null;
  photoPreview: string;

  // Step 2 – Professional
  jobTitle: string;
  category: string;
  experience: string;
  workType: string[];
  availability: string;
  salaryMin: string;
  salaryMax: string;

  // Step 3 – Skills & Resume
  skills: string[];
  languages: string[];
  resume: File | null;
  resumeName: string;
  bio: string;

  // Step 4 – Links
  portfolio: string;
  linkedin: string;
  github: string;
  twitter: string;
  website: string;
  visibility: "public" | "private" | "recruiters";
}

interface StepProps {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Personal Info", icon: User, desc: "Tell us who you are" },
  { id: 2, label: "Professional", icon: Briefcase, desc: "Your work profile" },
  { id: 3, label: "Skills & Resume", icon: FileText, desc: "Showcase your expertise" },
  { id: 4, label: "Links & Visibility", icon: Globe, desc: "Online presence" },
];

const CATEGORIES = [
  { label: "Engineering & Dev", icon: Code2, color: "text-blue-600 bg-blue-50 border-blue-100" },
  { label: "Design & Creative", icon: Palette, color: "text-pink-600 bg-pink-50 border-pink-100" },
  { label: "Data & AI", icon: BarChart3, color: "text-violet-600 bg-violet-50 border-violet-100" },
  { label: "Marketing & Growth", icon: Megaphone, color: "text-orange-600 bg-orange-50 border-orange-100" },
  { label: "Product Management", icon: Layers, color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
  { label: "Cybersecurity", icon: Shield, color: "text-slate-600 bg-slate-50 border-slate-200" },
  { label: "Education & Training", icon: GraduationCap, color: "text-sky-600 bg-sky-50 border-sky-100" },
  { label: "Finance & Accounting", icon: DollarSign, color: "text-green-700 bg-green-50 border-green-100" },
  { label: "HR & People Ops", icon: Users, color: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100" },
  { label: "Operations & PM", icon: Wrench, color: "text-teal-600 bg-teal-50 border-teal-100" },
  { label: "Writing & Content", icon: BookOpen, color: "text-yellow-700 bg-yellow-50 border-yellow-100" },
  { label: "Media & Video", icon: Camera, color: "text-rose-600 bg-rose-50 border-rose-100" },
];

const EXPERIENCE_LEVELS = [
  { value: "intern", label: "Intern / Student", desc: "0 – 1 year" },
  { value: "junior", label: "Junior", desc: "1 – 3 years" },
  { value: "mid", label: "Mid-level", desc: "3 – 5 years" },
  { value: "senior", label: "Senior", desc: "5 – 8 years" },
  { value: "lead", label: "Lead / Manager", desc: "8 – 12 years" },
  { value: "principal", label: "Principal / Director", desc: "12+ years" },
];

const WORK_TYPES = ["Fully Remote", "Remote-first", "Hybrid", "Contract", "Part-time", "Freelance"];
const AVAILABILITY = ["Immediately", "Within 2 weeks", "Within 1 month", "Within 3 months", "Open to offers"];

const POPULAR_SKILLS = [
  "React", "TypeScript", "Node.js", "Python", "Go", "AWS", "Docker", "Figma",
  "SQL", "GraphQL", "Kubernetes", "Rust", "Next.js", "Vue", "Swift", "Kotlin",
  "TensorFlow", "PyTorch", "Tailwind CSS", "PostgreSQL", "MongoDB", "Redis",
  "Machine Learning", "Data Science", "Product Design", "UX Research",
  "SEO", "Google Ads", "Content Strategy", "Copywriting",
];

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Mandarin", "Hindi",
  "Portuguese", "Arabic", "Japanese", "Korean", "Italian", "Dutch",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const inputClass = (error?: string) =>
  `w-full px-4 py-3 text-sm font-medium text-gray-800 bg-white border rounded-xl outline-none transition-all placeholder-gray-400 ${
    error
      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
  }`;

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[12.5px] font-black text-gray-600 uppercase tracking-widest mb-1.5">
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-[11.5px] font-semibold text-red-500 mt-1.5">
      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {message}
    </p>
  );
}

// ─── Step 1: Personal Info ───────────────────────────────────────────────────
function StepPersonal({ form, setForm, errors }: StepProps) {
  const photoRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, profilePhoto: file, photoPreview: url }));
  };

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Photo Upload */}
      <div className="flex flex-col items-center">
        <div
          onClick={() => photoRef.current?.click()}
          className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-all group overflow-hidden"
        >
          {form.photoPreview ? (
            <img src={form.photoPreview} className="w-full h-full object-cover" alt="Profile" />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Camera className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold text-blue-400">Photo</span>
            </div>
          )}
          <div className="absolute bottom-1.5 right-1.5 w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <Plus className="w-3 h-3 text-white" />
          </div>
        </div>
        <p className="text-[11.5px] text-gray-400 mt-2 font-medium">Click to upload profile photo</p>
        <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
      </div>

      {/* Name row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel required>First Name</FieldLabel>
          <input
            type="text"
            placeholder="John"
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            className={inputClass(errors.firstName)}
          />
          <FieldError message={errors.firstName} />
        </div>
        <div>
          <FieldLabel required>Last Name</FieldLabel>
          <input
            type="text"
            placeholder="Doe"
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
            className={inputClass(errors.lastName)}
          />
          <FieldError message={errors.lastName} />
        </div>
      </div>

      {/* Email */}
      <div>
        <FieldLabel required>Email Address</FieldLabel>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={`${inputClass(errors.email)} pl-10`}
          />
        </div>
        <FieldError message={errors.email} />
      </div>

      {/* Phone */}
      <div>
        <FieldLabel>Phone Number</FieldLabel>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={`${inputClass()} pl-10`}
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <FieldLabel required>Location / Timezone</FieldLabel>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="e.g. New York, USA (EST)"
            value={form.location}
            onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
            className={`${inputClass(errors.location)} pl-10`}
          />
        </div>
        <FieldError message={errors.location} />
      </div>
    </motion.div>
  );
}

// ─── Step 2: Professional ────────────────────────────────────────────────────
function StepProfessional({ form, setForm, errors }: StepProps) {
  const toggleWorkType = (t: string) =>
    setForm((f) => ({
      ...f,
      workType: f.workType.includes(t) ? f.workType.filter((x) => x !== t) : [...f.workType, t],
    }));

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Job Title */}
      <div>
        <FieldLabel required>Current / Desired Job Title</FieldLabel>
        <div className="relative">
          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="e.g. Senior Frontend Developer"
            value={form.jobTitle}
            onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
            className={`${inputClass(errors.jobTitle)} pl-10`}
          />
        </div>
        <FieldError message={errors.jobTitle} />
      </div>

      {/* Category */}
      <div>
        <FieldLabel required>Job Category</FieldLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const selected = form.category === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setForm((f) => ({ ...f, category: cat.label }))}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[12px] font-bold transition-all text-left ${
                  selected
                    ? `${cat.color} border-current shadow-sm`
                    : "border-gray-100 text-gray-600 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>
        <FieldError message={errors.category} />
      </div>

      {/* Experience */}
      <div>
        <FieldLabel required>Experience Level</FieldLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {EXPERIENCE_LEVELS.map((lvl) => {
            const selected = form.experience === lvl.value;
            return (
              <button
                key={lvl.value}
                type="button"
                onClick={() => setForm((f) => ({ ...f, experience: lvl.value }))}
                className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all ${
                  selected
                    ? "border-blue-400 bg-blue-50 shadow-sm"
                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className={`text-[13px] font-black ${selected ? "text-blue-700" : "text-gray-700"}`}>
                  {lvl.label}
                </span>
                <span className={`text-[11px] font-medium mt-0.5 ${selected ? "text-blue-500" : "text-gray-400"}`}>
                  {lvl.desc}
                </span>
              </button>
            );
          })}
        </div>
        <FieldError message={errors.experience} />
      </div>

      {/* Work Type */}
      <div>
        <FieldLabel>Preferred Work Type <span className="text-gray-400 font-medium normal-case tracking-normal">(select all that apply)</span></FieldLabel>
        <div className="flex flex-wrap gap-2">
          {WORK_TYPES.map((t) => {
            const selected = form.workType.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleWorkType(t)}
                className={`flex items-center gap-1.5 text-[12.5px] font-bold px-3.5 py-2 rounded-xl border transition-all ${
                  selected
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                    : "border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {selected && <Check className="w-3 h-3" />}
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div>
        <FieldLabel>Availability</FieldLabel>
        <div className="relative">
          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={form.availability}
            onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value }))}
            className={`${inputClass()} pl-10 appearance-none cursor-pointer`}
          >
            <option value="">Select availability…</option>
            {AVAILABILITY.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Salary Range */}
      <div>
        <FieldLabel>Expected Salary Range (USD / year)</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="number"
              placeholder="Min (e.g. 80000)"
              value={form.salaryMin}
              onChange={(e) => setForm((f) => ({ ...f, salaryMin: e.target.value }))}
              className={`${inputClass()} pl-8`}
            />
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="number"
              placeholder="Max (e.g. 130000)"
              value={form.salaryMax}
              onChange={(e) => setForm((f) => ({ ...f, salaryMax: e.target.value }))}
              className={`${inputClass()} pl-8`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Step 3: Skills & Resume ─────────────────────────────────────────────────
function StepSkills({ form, setForm, errors }: StepProps) {
  const [skillInput, setSkillInput] = useState("");
  const [langInput, setLangInput] = useState("");
  const resumeRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addSkill = (skill: string) => {
    const s = skill.trim();
    if (s && !form.skills.includes(s) && form.skills.length < 20) {
      setForm((f) => ({ ...f, skills: [...f.skills, s] }));
    }
    setSkillInput("");
  };

  const addLang = (lang: string) => {
    const l = lang.trim();
    if (l && !form.languages.includes(l)) {
      setForm((f) => ({ ...f, languages: [...f.languages, l] }));
    }
    setLangInput("");
  };

  const handleResumeFile = (file: File) => {
    if (file && (file.type === "application/pdf" || file.name.endsWith(".doc") || file.name.endsWith(".docx"))) {
      setForm((f) => ({ ...f, resume: file, resumeName: file.name }));
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleResumeFile(file);
  }, []);

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Resume Upload */}
      <div>
        <FieldLabel required>Resume / CV</FieldLabel>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !form.resume && resumeRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
            dragging
              ? "border-blue-400 bg-blue-50"
              : form.resume
              ? "border-emerald-300 bg-emerald-50 cursor-default"
              : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
          }`}
        >
          <AnimatePresence mode="wait">
            {form.resume ? (
              <motion.div
                key="uploaded"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center border border-emerald-200">
                  <FileText className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[13.5px] font-black text-emerald-700">{form.resumeName}</p>
                  <p className="text-[12px] text-emerald-500 mt-0.5">Successfully uploaded</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setForm((f) => ({ ...f, resume: null, resumeName: "" })); }}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-red-500 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <X className="w-3 h-3" /> Remove
                </button>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-dashed transition-colors ${dragging ? "bg-blue-100 border-blue-300" : "bg-white border-gray-200"}`}>
                  <Upload className={`w-6 h-6 ${dragging ? "text-blue-500" : "text-gray-400"}`} />
                </div>
                <div>
                  <p className="text-[14px] font-black text-gray-700">
                    {dragging ? "Drop it here!" : "Drag & drop your resume"}
                  </p>
                  <p className="text-[12px] text-gray-400 mt-0.5">or <span className="text-blue-600 font-bold">browse files</span> — PDF, DOC, DOCX</p>
                </div>
                <p className="text-[11px] text-gray-400 bg-white px-3 py-1.5 rounded-lg border border-gray-100">Max file size: 5MB</p>
              </motion.div>
            )}
          </AnimatePresence>
          <input
            ref={resumeRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleResumeFile(f); }}
          />
        </div>
        <FieldError message={errors.resume} />
      </div>

      {/* Skills */}
      <div>
        <FieldLabel required>Skills <span className="text-gray-400 font-medium normal-case tracking-normal">(up to 20)</span></FieldLabel>

        {/* Popular skill chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {POPULAR_SKILLS.filter((s) => !form.skills.includes(s)).slice(0, 12).map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => addSkill(skill)}
              className="text-[11.5px] font-semibold px-2.5 py-1.5 rounded-lg border border-gray-100 bg-gray-50 text-gray-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              + {skill}
            </button>
          ))}
        </div>

        {/* Custom skill input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a skill and press Enter…"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(skillInput); } }}
            className={inputClass()}
          />
          <button
            type="button"
            onClick={() => addSkill(skillInput)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors flex-shrink-0"
          >
            Add
          </button>
        </div>

        {/* Selected skills */}
        <AnimatePresence>
          {form.skills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex flex-wrap gap-1.5 mt-3"
            >
              {form.skills.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl"
                >
                  {skill}
                  <button type="button" onClick={() => setForm((f) => ({ ...f, skills: f.skills.filter((s) => s !== skill) }))}>
                    <X className="w-3 h-3 hover:text-blue-900 transition-colors" />
                  </button>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <FieldError message={errors.skills} />
      </div>

      {/* Languages */}
      <div>
        <FieldLabel>Languages Spoken</FieldLabel>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {LANGUAGES.filter((l) => !form.languages.includes(l)).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => addLang(lang)}
              className="text-[11.5px] font-semibold px-2.5 py-1.5 rounded-lg border border-gray-100 bg-gray-50 text-gray-500 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
            >
              + {lang}
            </button>
          ))}
        </div>
        <AnimatePresence>
          {form.languages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-1.5"
            >
              {form.languages.map((lang) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl"
                >
                  {lang}
                  <button type="button" onClick={() => setForm((f) => ({ ...f, languages: f.languages.filter((l) => l !== lang) }))}>
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bio */}
      <div>
        <FieldLabel>Professional Summary</FieldLabel>
        <textarea
          rows={4}
          placeholder="Write a short summary about yourself, your experience, and what you're looking for in your next role…"
          value={form.bio}
          onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
          className={`${inputClass()} resize-none leading-relaxed`}
        />
        <p className="text-[11.5px] text-gray-400 mt-1.5 text-right">{form.bio.length} / 600 characters</p>
      </div>
    </motion.div>
  );
}

// ─── Step 4: Links & Visibility ──────────────────────────────────────────────
function StepLinks({ form, setForm }: StepProps) {
  const VISIBILITY_OPTIONS = [
    {
      value: "public" as const,
      label: "Public",
      icon: Globe,
      desc: "Anyone can view your profile",
      color: "border-blue-400 bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      value: "recruiters" as const,
      label: "Recruiters Only",
      icon: Users,
      desc: "Only verified recruiters can view",
      color: "border-violet-400 bg-violet-50",
      textColor: "text-violet-700",
    },
    {
      value: "private" as const,
      label: "Private",
      icon: Lock,
      desc: "Hidden — apply manually to jobs",
      color: "border-gray-300 bg-gray-50",
      textColor: "text-gray-700",
    },
  ];

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Links */}
      <div className="space-y-4">
        <div>
          <FieldLabel>Portfolio / Personal Website</FieldLabel>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="url"
              placeholder="https://yourportfolio.com"
              value={form.portfolio}
              onChange={(e) => setForm((f) => ({ ...f, portfolio: e.target.value }))}
              className={`${inputClass()} pl-10`}
            />
          </div>
        </div>
        <div>
          <FieldLabel>LinkedIn</FieldLabel>
          <div className="relative">
            <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
            <input
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={form.linkedin}
              onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
              className={`${inputClass()} pl-10`}
            />
          </div>
        </div>
        <div>
          <FieldLabel>GitHub</FieldLabel>
          <div className="relative">
            <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
            <input
              type="url"
              placeholder="https://github.com/yourusername"
              value={form.github}
              onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))}
              className={`${inputClass()} pl-10`}
            />
          </div>
        </div>
        <div>
          <FieldLabel>Twitter / X</FieldLabel>
          <div className="relative">
            <BsTwitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500" />
            <input
              type="url"
              placeholder="https://twitter.com/yourhandle"
              value={form.twitter}
              onChange={(e) => setForm((f) => ({ ...f, twitter: e.target.value }))}
              className={`${inputClass()} pl-10`}
            />
          </div>
        </div>
      </div>

      {/* Visibility */}
      <div>
        <FieldLabel required>Profile Visibility</FieldLabel>
        <div className="space-y-2.5">
          {VISIBILITY_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const selected = form.visibility === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setForm((f) => ({ ...f, visibility: opt.value }))}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border-2 text-left transition-all ${
                  selected ? opt.color : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${selected ? opt.color : "bg-gray-50"}`}>
                  <Icon className={`w-4 h-4 ${selected ? opt.textColor : "text-gray-400"}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-[13.5px] font-black ${selected ? opt.textColor : "text-gray-700"}`}>{opt.label}</p>
                  <p className={`text-[12px] font-medium ${selected ? opt.textColor : "text-gray-400"} opacity-80 mt-0.5`}>{opt.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  selected ? "border-current" : "border-gray-200"
                }`}>
                  {selected && <div className={`w-2.5 h-2.5 rounded-full ${opt.textColor.replace("text-", "bg-")}`} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Privacy note */}
      <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4">
        <Lock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[12.5px] font-black text-amber-800">Your data is safe with us</p>
          <p className="text-[12px] text-amber-600 mt-0.5 leading-relaxed">
            We never sell your personal information. Your contact details are only shared when you apply for a job or opt-in to recruiter outreach.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Success Screen ──────────────────────────────────────────────────────────
function SuccessScreen({ form }: { form: FormData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-8"
    >
      {/* Animated check */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 bg-emerald-100 rounded-3xl animate-pulse" />
        <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-200">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-7 h-7 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>

      <h2 className="text-2xl font-black text-gray-900 mb-2">Resume Submitted!</h2>
      <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed mb-8">
        Great work, <span className="font-bold text-gray-700">{form.firstName}</span>! Your profile is now live and visible to top remote companies.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { icon: Building2, value: "500+", label: "Companies can see you", color: "text-blue-600 bg-blue-50" },
          { icon: Star, value: "4.8★", label: "Avg. company rating", color: "text-amber-600 bg-amber-50" },
          { icon: Zap, value: "48h", label: "Avg. first contact", color: "text-violet-600 bg-violet-50" },
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

      {/* What's next */}
      <div className="bg-gray-50 rounded-2xl p-5 text-left border border-gray-100 mb-6">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">What happens next</p>
        {[
          { step: "1", text: "Your profile is instantly visible to matching employers", icon: Eye },
          { step: "2", text: "Recruiters will reach out based on your skills & preferences", icon: Mail },
          { step: "3", text: "You'll receive job alerts matching your profile weekly", icon: Zap },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.step} className="flex items-start gap-3 mb-3 last:mb-0">
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
          <Briefcase className="w-4 h-4" /> Browse Jobs
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-black text-sm rounded-2xl transition-all">
          <User className="w-4 h-4" /> View Profile
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function SubmitResume() {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "", location: "",
    profilePhoto: null, photoPreview: "",
    jobTitle: "", category: "", experience: "", workType: [], availability: "",
    salaryMin: "", salaryMax: "",
    skills: [], languages: [], resume: null, resumeName: "", bio: "",
    portfolio: "", linkedin: "", github: "", twitter: "", website: "",
    visibility: "recruiters",
  });

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!form.firstName.trim()) newErrors.firstName = "First name is required";
      if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email is required";
      if (!form.location.trim()) newErrors.location = "Location is required";
    }
    if (step === 2) {
      if (!form.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
      if (!form.category) newErrors.category = "Please select a category";
      if (!form.experience) newErrors.experience = "Please select an experience level";
    }
    if (step === 3) {
      if (!form.resume) newErrors.resume = "Please upload your resume";
      if (form.skills.length === 0) newErrors.skills = "Add at least one skill";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      if (step < 4) setStep((s) => s + 1);
      else setSubmitted(true);
    }
  };

  const progress = ((step - 1) / 3) * 100;

  const SOCIAL_PROOF = [
    { avatar: "JK", name: "Jenna K.", role: "Got hired at Stripe", color: "bg-indigo-600" },
    { avatar: "MR", name: "Marcus R.", role: "Landed at Notion", color: "bg-gray-800" },
    { avatar: "SP", name: "Sara P.", role: "Joined Vercel", color: "bg-black" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fc]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-28 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="max-w-3xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              <FileText className="w-3 h-3" /> Submit Your Resume
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-4">
              Get Discovered by
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                Top Remote Companies
              </span>
            </h1>
            <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed mb-8">
              Create your free profile in minutes. Let 500+ remote-first companies come to you with the right opportunities.
            </p>

            {/* Social proof */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 px-5 py-3 rounded-2xl">
              <div className="flex -space-x-2">
                {SOCIAL_PROOF.map((p) => (
                  <div key={p.avatar} className={`w-8 h-8 ${p.color} rounded-full border-2 border-white/30 flex items-center justify-center text-[11px] font-black text-white`}>
                    {p.avatar}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-[12.5px] font-black text-white">12,400+ candidates hired</p>
                <p className="text-[11px] text-white/50">through WorkByHome this year</p>
              </div>
              <div className="flex items-center gap-1 ml-2">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Form Layout ────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Left: Sidebar ─────────────────────────── */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-5">Your Progress</h3>

              {/* Step list */}
              <div className="space-y-2 mb-6">
                {STEPS.map((s) => {
                  const Icon = s.icon;
                  const isActive = step === s.id;
                  const isDone = step > s.id || submitted;
                  return (
                    <div
                      key={s.id}
                      className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                        isActive ? "bg-blue-50 border border-blue-100" : "border border-transparent"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                        isDone
                          ? "bg-emerald-500 shadow-sm"
                          : isActive
                          ? "bg-blue-600 shadow-md shadow-blue-200"
                          : "bg-gray-100"
                      }`}>
                        {isDone
                          ? <Check className="w-4 h-4 text-white" />
                          : <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                        }
                      </div>
                      <div>
                        <p className={`text-[13px] font-black leading-none ${isActive ? "text-blue-700" : isDone ? "text-emerald-700" : "text-gray-500"}`}>
                          {s.label}
                        </p>
                        <p className={`text-[11px] mt-0.5 font-medium ${isActive ? "text-blue-500" : "text-gray-400"}`}>
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Completion</span>
                  <span className="text-[12px] font-black text-blue-600">{submitted ? 100 : Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: submitted ? "100%" : `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  />
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Why submit?</p>
                {[
                  { icon: Zap, text: "Get matched to jobs in 48h", color: "text-amber-500 bg-amber-50" },
                  { icon: Shield, text: "Your data stays private", color: "text-blue-500 bg-blue-50" },
                  { icon: TrendingUp, text: "500+ companies actively hiring", color: "text-emerald-500 bg-emerald-50" },
                  { icon: Heart, text: "Free — no hidden fees ever", color: "text-rose-500 bg-rose-50" },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.text} className="flex items-center gap-3">
                      <div className={`w-7 h-7 ${b.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-3.5 h-3.5 ${b.color.split(" ")[0]}`} />
                      </div>
                      <p className="text-[12.5px] font-semibold text-gray-600">{b.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ── Right: Form ───────────────────────────── */}
          <div className="lg:col-span-2">
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
                      Step {step} of 4
                    </span>
                  </div>

                  {/* Step progress dots */}
                  <div className="flex gap-1.5 mt-5">
                    {STEPS.map((s) => (
                      <div
                        key={s.id}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          step >= s.id ? "bg-blue-600" : "bg-gray-100"
                        } ${step === s.id ? "flex-[2]" : "flex-1"}`}
                      />
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
                      {step === 1 && <StepPersonal form={form} setForm={setForm} errors={errors} />}
                      {step === 2 && <StepProfessional form={form} setForm={setForm} errors={errors} />}
                      {step === 3 && <StepSkills form={form} setForm={setForm} errors={errors} />}
                      {step === 4 && <StepLinks form={form} setForm={setForm} errors={errors} />}
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              {!submitted && (
                <div className="px-8 pb-8 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    disabled={step === 1}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-gray-200 text-sm font-black text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black rounded-2xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
                  >
                    {step === 4 ? (
                      <><CheckCircle2 className="w-4 h-4" /> Submit Resume</>
                    ) : (
                      <>Continue <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}