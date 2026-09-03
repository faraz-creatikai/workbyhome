'use client';

// app/register/page.tsx  (the "Apply now" candidate application page)
//
// Visual refresh: matches the target design — a light, dot-pattern background
// (same ambient pattern as the marketing homepage's hero section), a blue-accented
// step rail instead of the old dark/gold theme, and the same playful floating
// decorative pieces used on the hero (sticky note, floating checkmark card,
// pointer arrow) rebuilt here to frame the form.
//
// Functionality, validation, submit flow, and the /api/candidate-applications
// contract are all unchanged from before: fullName, email, phone, location,
// currentCompany (optional), currentRole, experience, expectedSalary (optional),
// skills (JSON string), description, resume (optional file).
//
// All colors are pulled from the existing design-token CSS variables (the same
// --color-primary-*, --bg-*, --text-*, --border-medium tokens already used
// across the app) rather than hard-coded hex values, so the page stays in sync
// with the rest of the product's theme. A couple of accents (the sticky note's
// yellow, the pointer bubble's green) fall back to a sensible hex if that
// token isn't defined yet — safe no-ops if it is.
//
// Job-card prefill: when arriving from a job card (see buildApplyHref in the
// browse-jobs page), the URL carries currentRole / location / expectedSalary /
// skills / company / jobExperience. currentRole, location, expectedSalary and
// skills map directly onto this form's own fields and are prefilled below.
// `company` and `jobExperience` describe the JOB POSTING, not the candidate,
// so they're only used for the "Applying for X at Y" banner — never used to
// overwrite the candidate's own currentCompany / experience answers.

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Zilla_Slab, Inter, IBM_Plex_Mono } from 'next/font/google';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
  User,
  Briefcase,
  Sparkles,
  FileText,
  Mail,
  Phone,
  MapPin,
  Building2,
  IndianRupee,
  Tag,
  X,
  Upload,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const display = Zilla_Slab({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  currentCompany: string;
  currentRole: string;
  experience: string;
  expectedSalary: string;
  description: string;
}

const emptyForm: FormState = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  currentCompany: '',
  currentRole: '',
  experience: '',
  expectedSalary: '',
  description: '',
};

const STEPS = [
  { key: 'about', label: 'About you', icon: User },
  { key: 'work', label: 'Work & experience', icon: Briefcase },
  { key: 'skills', label: 'Skills & story', icon: Sparkles },
  { key: 'resume', label: 'Resume & review', icon: FileText },
] as const;

// Contextual sticky-note tip shown next to the form, one per step.
const STEP_TIPS = [
  "Let's get started! Help us know you better so we can find the right opportunities.",
  "Give us the full picture — your experience helps us match you to the right teams.",
  'A few good skills and a short story help recruiters see what makes you, you.',
  "Almost there! Attach a resume if you've got one, then send it our way.",
];

// ---------------------------------------------------------------------------
// Small shared bits
// ---------------------------------------------------------------------------

const fieldClass = (hasError?: string) =>
  `w-full rounded-xl border px-4 py-3 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]
   bg-[var(--bg-primary)] outline-none transition-all
   focus:ring-2 focus:ring-[var(--color-primary-600)] focus:ring-offset-1 focus:ring-offset-[var(--bg-primary)]
   ${hasError ? 'border-[var(--color-error-600)]' : 'border-[var(--border-medium)] focus:border-[var(--color-primary-600)]'}`;

const Label = ({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) => (
  <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline gap-2 text-sm font-medium text-[var(--text-primary)]">
    {children}
    {optional && <span className="text-xs font-normal text-[var(--text-tertiary)]">optional</span>}
  </label>
);

const ErrorText = ({ children }: { children?: string }) =>
  children ? <p className="mt-1.5 text-sm text-[var(--color-error-600)]">{children}</p> : null;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Register() {
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();


  // Job context pulled from the URL, if the candidate arrived from a job card.
  // Param names (currentRole, expectedSalary, location, skills) are read
  // straight off the job card's buildApplyHref and line up 1:1 with this
  // form's own field names. `company` / `jobExperience` describe the job
  // posting itself and are kept separate — see note above.
  const jobContext = useMemo(() => {
    const jobId = searchParams.get('jobId');
    if (!jobId) return null;
    return {
      jobId,
      role: searchParams.get('currentRole') || '',
      company: searchParams.get('company') || '',
      location: searchParams.get('location') || '',
      experience: searchParams.get('jobExperience') || '',
      salary: searchParams.get('expectedSalary') || '',
      skills: (searchParams.get('skills') || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };
  }, [searchParams]);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [skills, setSkills] = useState<string[]>([]);

  // Fills the form from the job context once it's available — runs on mount
  // AND whenever jobContext changes (covers client-side nav that doesn't remount).
  // Only fills fields that are still empty, so it never clobbers something the
  // candidate already typed.
  const jobContextApplied = useRef<string | null>(null);

  useEffect(() => {
    if (!jobContext) return;
    if (jobContextApplied.current === jobContext.jobId) return; // already applied for this job
    jobContextApplied.current = jobContext.jobId;

    setForm((prev) => ({
      ...prev,
      currentRole: prev.currentRole || jobContext.role,
      location: prev.location || jobContext.location,
      expectedSalary: prev.expectedSalary || jobContext.salary,
      // A short, editable opener so "About you" isn't a blank page — the
      // candidate's own story still has to come from them, so this is just
      // a starting point they can rewrite or delete.
      description:
        prev.description ||
        (jobContext.role
          ? `I'm excited about the ${jobContext.role}${jobContext.company ? ` role at ${jobContext.company}` : ' role'} and would love to bring my experience to your team.`
          : ''),
      // Intentionally NOT prefilled from the job posting:
      // - experience: jobContext.experience is the LEVEL the job asks for
      //   (e.g. "Senior"), not the candidate's own years of experience —
      //   auto-filling their "years of experience" answer with that would
      //   misstate their profile.
      // - currentCompany: jobContext.company is the employer posting the
      //   job, not the candidate's current employer.
    }));

    setSkills((prev) => (prev.length > 0 ? prev : jobContext.skills));
  }, [jobContext]);
  const [skillInput, setSkillInput] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const addSkill = () => {
    const value = skillInput.trim().replace(/,+$/, '');
    if (value && !skills.some((s) => s.toLowerCase() === value.toLowerCase())) {
      setSkills((prev) => [...prev, value]);
    }
    setSkillInput('');
  };

  const removeSkill = (value: string) => setSkills((prev) => prev.filter((s) => s !== value));

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    } else if (e.key === 'Backspace' && !skillInput && skills.length > 0) {
      setSkills((prev) => prev.slice(0, -1));
    }
  };

  const applyResumeFile = (file: File | null) => {
    if (!file) return;
    const okType = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!okType) {
      toast.error('Please attach a PDF or Word document');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Resume must be under 5MB');
      return;
    }
    setResume(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    applyResumeFile(e.dataTransfer.files?.[0] ?? null);
  };

  const validateStep = (index: number): boolean => {
    const next: Partial<Record<keyof FormState, string>> = { ...errors };

    if (index === 0) {
      next.fullName = form.fullName.trim() ? undefined : 'Tell us your name';
      next.email = !form.email.trim()
        ? 'We need an email to reach you'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
          ? "That email doesn't look right"
          : undefined;
      next.phone = form.phone.trim() ? undefined : 'Add a phone number';
      next.location = form.location.trim() ? undefined : "Where are you based?";
    }

    if (index === 1) {
      next.currentRole = form.currentRole.trim() ? undefined : "What role are you looking for?";
      next.experience = form.experience.trim() ? undefined : 'How many years of experience?';
    }

    if (index === 2) {
      next.description = form.description.trim() ? undefined : 'Tell us a little about yourself';
    }

    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const goNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      goNext();
      return;
    }

    const stepsOk = [0, 1, 2].every((i) => validateStep(i));
    if (!stepsOk) {
      toast.error('A few details still need your attention');
      setStep(0);
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('fullName', form.fullName.trim());
      fd.append('email', form.email.trim());
      fd.append('phone', form.phone.trim());
      fd.append('location', form.location.trim());
      fd.append('currentCompany', form.currentCompany.trim());
      fd.append('currentRole', form.currentRole.trim());
      fd.append('experience', form.experience.trim());
      fd.append('expectedSalary', form.expectedSalary.trim());
      fd.append('description', form.description.trim());
      fd.append('skills', JSON.stringify(skills));
      if (resume) fd.append('resume', resume);

      const res = await fetch('/api/candidate-applications', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));

      if (res.status === 409) {
        setStep(0);
        setErrors((prev) => ({ ...prev, email: "You've already applied with this email" }));
        toast.error('An application with this email already exists');
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    setForm(emptyForm);
    setSkills([]);
    setSkillInput('');
    setResume(null);
    setErrors({});
    setStep(0);
    setSubmitted(false);
  };

  const firstName = form.fullName.trim().split(' ')[0] || 'there';

  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable} relative min-h-screen w-full overflow-x-hidden bg-[var(--bg-secondary)] `}
    >
      <Toaster position="top-center" />

      {/* Ambient dot-pattern backdrop — same pattern used on the marketing hero */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-70"
        style={{
          backgroundImage: 'radial-gradient(var(--border-medium) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative z-10 lg:grid lg:min-h-screen lg:grid-cols-[38%_62%]">
        {/* ---------------------------------------------------------------- */}
        {/* Brand / path panel                                               */}
        {/* ---------------------------------------------------------------- */}
        <aside className="relative hidden flex-col justify-between px-12 py-4 lg:flex">
          <div>
            <Link href="/">
              <img src="/workbyhome-logo.png" alt="WorkByHome" className="h-14 max-w-[200px] w-full shrink-0" /></Link>

            {/* <Link href="/" className="inline-flex items-center gap-3 py-3">
              <img src="/workbyhome-logo.png" alt="WorkByHome" className="h-14 w-14 shrink-0" />
              <div>
                <p className="text-xl font-extrabold text-[var(--text-primary)]">
                  <span>Work</span>
                  <span className="text-[var(--color-primary-600)]">By</span>
                  <span>Home</span>
                </p>
                <p className="pl-0.5 text-xs font-bold text-[var(--color-primary-600)]">Earn Money From Home</p>
              </div>
            </Link> */}

            <p className="mt-5 [font-family:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-primary-600)]">
              Candidate application
            </p>
            <h1 className="mt-3 text-[2.6rem] font-semibold leading-[1.08] text-[var(--text-primary)] ">
              Bring your work home.
            </h1>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--text-secondary)]">
              One profile, reviewed by a real person — not a filter. Tell us who you are and what
              you're looking for, and we'll match you with remote-first teams across India.
            </p>
          </div>

          {/* the step rail — the "home to work" path */}
          <ol className="relative mt-4 space-y-0">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isDone = i < step;
              const isActive = i === step;
              const isFilled = isDone || isActive;
              return (
                <li key={s.key} className="relative flex gap-4 pb-10 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span
                      className={`absolute left-[19px] top-10 h-[calc(100%-1.5rem)] w-px ${isDone ? 'bg-[var(--color-primary-600)]' : 'bg-[var(--border-medium)]'
                        }`}
                    />
                  )}
                  <span
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${isFilled
                      ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-600)] text-white'
                      : 'border-[var(--border-medium)] bg-[var(--bg-primary)] text-[var(--text-tertiary)]'
                      }`}
                  >
                    {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-[18px] w-[18px]" />}
                  </span>
                  <div className="pt-1.5">
                    <p className="[font-family:var(--font-mono)] text-[11px] tracking-widest text-[var(--text-tertiary)]">
                      0{i + 1}
                    </p>
                    <p className={`text-sm font-medium ${isFilled ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'}`}>
                      {s.label}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="relative flex items-center gap-3 rounded-2xl bg-[var(--color-primary-50)] px-4 py-3 text-sm text-[var(--color-primary-700)]">
            <Clock className="h-4 w-4 shrink-0 text-[var(--color-primary-600)]" />
            Most applications hear back within 2–3 business days.
          </div>
        </aside>

        {/* ---------------------------------------------------------------- */}
        {/* Form panel                                                       */}
        {/* ---------------------------------------------------------------- */}
        <main className="flex justify-center px-2 py-0 sm:px-8 sm:py-0 lg:items-center lg:py-2">
          <div className="w-full max-w-xl mt-2 sm:mt-14">
            {/* mobile-only compact header */}
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link href="/" className=' w-full'><img src="/workbyhome-logo.png" alt="WorkByHome" className="h-14 max-w-[200px] w-full shrink-0" /></Link>
              {/*    <Link href="/" className="inline-flex items-center gap-2.5">
                <img src="/workbyhome-logo.png" alt="WorkByHome" className="h-11 w-11 shrink-0" />
                <div>
                  <p className="text-lg font-extrabold text-[var(--text-primary)]">
                    <span>Work</span>
                    <span className="text-[var(--color-primary-600)]">By</span>
                    <span>Home</span>
                  </p>
                  <p className="text-[11px] font-bold text-[var(--color-primary-600)]">Earn Money From Home</p>
                </div>
              </Link> */}

            </div>

            {/* mobile step progress (replaces the desktop rail below lg) */}
            <div className="mb-6 lg:hidden">
              <div className="flex items-center justify-between text-xs font-medium text-[var(--text-tertiary)]">
                <span className="text-[var(--color-primary-600)]">{STEPS[step].label}</span>
                <span>
                  Step {step + 1} of {STEPS.length}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border-medium)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary-600)] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* form card + its floating decoration, grouped so the pieces can overlap the card edges */}
            <div className="relative">
              {/* sticky note */}
              <div className="pointer-events-none absolute -top-10 -left-10 z-20 hidden -rotate-3 sm:block">
                <div className="relative w-44 rounded-br-2xl rounded-tl-sm bg-[var(--color-warning-100,#FEF9C3)] px-4 pt-5 pb-6 shadow-[6px_14px_26px_rgba(0,0,0,0.10)]">
                  <span className="absolute -top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-[var(--color-error-600)] bg-[var(--color-error-500,#ef4444)] shadow-[0_3px_6px_rgba(239,68,68,0.4)]" />
                  <p className="text-[13px] font-medium leading-snug text-[var(--text-primary)]">{STEP_TIPS[step]}</p>
                </div>
              </div>

              {/* scattered dot cluster, top right */}
              <div className="pointer-events-none absolute top-5 right-5 z-40 hidden grid-cols-3 gap-2 sm:grid">
                {[0.7, 0.35, 0.9, 0.3, 0.6, 0.5, 0.85, 0.4, 0.55].map((o, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary-300)]" style={{ opacity: o }} />
                ))}
              </div>

              {/* central brand avatar, overlapping the card's top edge */}
              <div className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-primary)] shadow-[0_15px_35px_-10px_rgba(15,23,42,0.3)] ring-4 ring-[var(--bg-primary)] sm:h-20 sm:w-20">
                  <img src="/workbyhome.png" alt="" className="h-12 w-12 sm:h-16 sm:w-16" />
                </div>
              </div>

              <form
                onSubmit={handleFormSubmit}
                className="relative z-10 rounded-3xl border border-[var(--border-medium)] bg-[var(--bg-primary)] px-6 pb-6 pt-12 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.15)] sm:px-9 sm:pb-9 sm:pt-16"
              >

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -16 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: 'easeOut' }}
                  >
                    {/* Step 0 — About you */}
                    {step === 0 && (
                      <div className=''>
                        <h2 className="text-center text-2xl font-semibold text-[var(--text-primary)]  ">
                          Let's start with the basics
                        </h2>
                        <p className="mt-1.5 text-center text-sm text-[var(--text-secondary)] ">
                          So we know who you are and how to reach you.
                        </p>
                        {jobContext && (
                          <div className="mb-6 mt-4 flex items-start gap-2.5 rounded-xl border border-[var(--color-primary-100,#dbeafe)] bg-[var(--color-primary-50)] px-4 py-3 text-sm text-[var(--color-primary-700)]">
                            <Briefcase className="mt-0.5 h-4 w-4 shrink-0" />
                            <div>
                              <p>
                                Applying for <strong>{jobContext.role}</strong>
                                {jobContext.company && <> at <strong>{jobContext.company}</strong></>}
                              </p>
                              {(jobContext.location || jobContext.salary || jobContext.experience) && (
                                <p className="mt-0.5 text-xs text-[var(--color-primary-600)]">
                                  {[jobContext.location, jobContext.salary, jobContext.experience].filter(Boolean).join(' · ')}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="mt-7 grid gap-5 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <Label htmlFor="fullName">Full name</Label>
                            <div className="relative">
                              <User className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--text-tertiary)]" />
                              <input
                                id="fullName"
                                name="fullName"
                                autoComplete="name"
                                value={form.fullName}
                                onChange={update('fullName')}
                                placeholder="Ananya Sharma"
                                className={`${fieldClass(errors.fullName)} pl-10`}
                              />
                            </div>
                            <ErrorText>{errors.fullName}</ErrorText>
                          </div>

                          <div>
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--text-tertiary)]" />
                              <input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={update('email')}
                                placeholder="ananya@email.com"
                                className={`${fieldClass(errors.email)} pl-10`}
                              />
                            </div>
                            <ErrorText>{errors.email}</ErrorText>
                          </div>

                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <div className="relative">
                              <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--text-tertiary)]" />
                              <input
                                id="phone"
                                type="tel"
                                name="phone"
                                autoComplete="tel"
                                value={form.phone}
                                onChange={update('phone')}
                                placeholder="+91 98765 43210"
                                className={`${fieldClass(errors.phone)} pl-10`}
                              />
                            </div>
                            <ErrorText>{errors.phone}</ErrorText>
                          </div>

                          <div className="sm:col-span-2">
                            <Label htmlFor="location">Location</Label>
                            <div className="relative">
                              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--text-tertiary)]" />
                              <input
                                id="location"
                                name="location"
                                autoComplete="address-level2"
                                value={form.location}
                                onChange={update('location')}
                                placeholder="Bengaluru, India — or Remote"
                                className={`${fieldClass(errors.location)} pl-10`}
                              />
                            </div>
                            <ErrorText>{errors.location}</ErrorText>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 1 — Work & experience */}
                    {step === 1 && (
                      <div>
                        <h2 className="text-center text-2xl font-semibold text-[var(--text-primary)] [font-family:var(--font-display)] lg:text-left">
                          What are you looking for?
                        </h2>
                        <p className="mt-1.5 text-center text-sm text-[var(--text-secondary)] lg:text-left">
                          Your current standing, and the role you want next.
                        </p>

                        <div className="mt-7 grid gap-5 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <Label htmlFor="currentRole">Role you're applying for</Label>
                            <div className="relative">
                              <Briefcase className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--text-tertiary)]" />
                              <input
                                id="currentRole"
                                name="currentRole"
                                value={form.currentRole}
                                onChange={update('currentRole')}
                                placeholder="Frontend Developer"
                                className={`${fieldClass(errors.currentRole)} pl-10`}
                              />
                            </div>
                            <ErrorText>{errors.currentRole}</ErrorText>
                          </div>

                          <div>
                            <Label htmlFor="currentCompany" optional>
                              Current company
                            </Label>
                            <div className="relative">
                              <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--text-tertiary)]" />
                              <input
                                id="currentCompany"
                                name="currentCompany"
                                value={form.currentCompany}
                                onChange={update('currentCompany')}
                                placeholder="Leave blank if fresher / between roles"
                                className={`${fieldClass()} pl-10`}
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="experience">Years of experience</Label>
                            <input
                              id="experience"
                              name="experience"
                              value={form.experience}
                              onChange={update('experience')}
                              placeholder="3+ years"
                              className={fieldClass(errors.experience)}
                            />
                            <ErrorText>{errors.experience}</ErrorText>
                          </div>

                          <div className="sm:col-span-2">
                            <Label htmlFor="expectedSalary" optional>
                              Expected salary
                            </Label>
                            <div className="relative">
                              <IndianRupee className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--text-tertiary)]" />
                              <input
                                id="expectedSalary"
                                name="expectedSalary"
                                value={form.expectedSalary}
                                onChange={update('expectedSalary')}
                                placeholder="₹8,00,000 / year"
                                className={`${fieldClass()} pl-10`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2 — Skills & story */}
                    {step === 2 && (
                      <div>
                        <h2 className="text-center text-2xl font-semibold text-[var(--text-primary)] [font-family:var(--font-display)] lg:text-left">
                          Show us what you bring
                        </h2>
                        <p className="mt-1.5 text-center text-sm text-[var(--text-secondary)] lg:text-left">
                          Skills recruiters can search for, and a bit of your story.
                        </p>

                        <div className="mt-7 space-y-5">
                          <div>
                            <Label htmlFor="skillInput" optional>
                              Skills
                            </Label>
                            <div className="flex items-center gap-2 rounded-xl border border-[var(--border-medium)] bg-[var(--bg-primary)] px-3 py-2 focus-within:border-[var(--color-primary-600)] focus-within:ring-2 focus-within:ring-[var(--color-primary-600)]">
                              <Tag className="h-[18px] w-[18px] shrink-0 text-[var(--text-tertiary)]" />
                              <input
                                id="skillInput"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleSkillKeyDown}
                                onBlur={addSkill}
                                placeholder="Type a skill and hit Enter — React, Figma, SQL…"
                                className="min-w-[8rem] flex-1 bg-transparent py-1 text-[15px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
                              />
                            </div>
                            {skills.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {skills.map((s) => (
                                  <span
                                    key={s}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary-50)] px-3 py-1 text-sm font-medium text-[var(--color-primary-700)]"
                                  >
                                    {s}
                                    <button
                                      type="button"
                                      onClick={() => removeSkill(s)}
                                      className="rounded-full p-0.5 hover:bg-[var(--color-primary-100)]"
                                      aria-label={`Remove ${s}`}
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="description">About you</Label>
                            <textarea
                              id="description"
                              name="description"
                              rows={5}
                              value={form.description}
                              onChange={update('description')}
                              placeholder="What have you built, led, or shipped? What kind of remote role excites you?"
                              className={`${fieldClass(errors.description)} resize-none`}
                            />
                            <ErrorText>{errors.description}</ErrorText>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3 — Resume & review */}
                    {step === 3 && (
                      <div>
                        <h2 className="text-center text-2xl font-semibold text-[var(--text-primary)] [font-family:var(--font-display)] lg:text-left">
                          Attach your resume and review
                        </h2>
                        <p className="mt-1.5 text-center text-sm text-[var(--text-secondary)] lg:text-left">
                          Optional, but it helps hiring teams say yes faster.
                        </p>

                        <div className="mt-7">
                          <label
                            htmlFor="resume"
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragActive(true);
                            }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${dragActive
                              ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)]'
                              : 'border-[var(--border-medium)] bg-[var(--bg-secondary)] hover:border-[var(--color-primary-300)]'
                              }`}
                          >
                            <input
                              id="resume"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              onChange={(e) => applyResumeFile(e.target.files?.[0] ?? null)}
                            />
                            <Upload className="h-6 w-6 text-[var(--color-primary-600)]" />
                            {resume ? (
                              <>
                                <p className="text-sm font-medium text-[var(--text-primary)]">{resume.name}</p>
                                <p className="text-xs text-[var(--text-secondary)]">
                                  {(resume.size / 1024 / 1024).toFixed(1)} MB — click or drop to replace
                                </p>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setResume(null);
                                  }}
                                  className="mt-1 text-xs font-medium text-[var(--color-error-600)] hover:underline"
                                >
                                  Remove file
                                </button>
                              </>
                            ) : (
                              <>
                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                  Drop your resume here, or click to browse
                                </p>
                                <p className="text-xs text-[var(--text-secondary)]">PDF or Word, up to 5MB</p>
                              </>
                            )}
                          </label>
                        </div>

                        <div className="mt-7 rounded-2xl bg-[var(--bg-secondary)] p-5">
                          <p className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-widest text-[var(--text-tertiary)]">
                            Quick review
                          </p>
                          <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                            <ReviewRow label="Name" value={form.fullName} />
                            <ReviewRow label="Email" value={form.email} />
                            <ReviewRow label="Role" value={form.currentRole} />
                            <ReviewRow label="Experience" value={form.experience} />
                            <ReviewRow label="Location" value={form.location} />
                            <ReviewRow label="Skills" value={skills.length ? `${skills.length} added` : '—'} />
                          </dl>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>



                {/* Navigation */}
                <div className="mt-9 flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-medium)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < STEPS.length - 1 ? (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary-600)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-700)]"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary-600)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-700)] disabled:opacity-70"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        'Submit application'
                      )}
                    </button>
                  )}
                </div>
              </form>

              {/* floating checkmark card, bottom-left, overlapping the form edge */}
              <div className="pointer-events-none absolute -bottom-6 left-4 z-20 hidden -rotate-6 sm:flex">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--bg-primary)] shadow-[0_15px_35px_-8px_rgba(15,23,42,0.25)]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary-600)]">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* pointer bubble, bottom-right, aimed at Continue/Submit */}
              <div className="pointer-events-none absolute -bottom-5 right-3 z-20 hidden rotate-6 sm:flex">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-success-100,#DCFCE7)] shadow-[0_15px_30px_-10px_rgba(15,23,42,0.2)]">
                  <svg viewBox="0 0 60 60" className="h-7 w-7" fill="none">
                    <path d="M12 42 C 20 46, 26 20, 46 14" stroke="var(--color-primary-600)" strokeWidth="3.5" strokeLinecap="round" />
                    <path
                      d="M35 11 L47 14 L43 26"
                      stroke="var(--color-primary-600)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <p className="mt-5 hidden text-center text-sm text-[var(--text-secondary)] lg:block">
              Already applied?{' '}
              <Link href="/" className="font-medium text-[var(--color-primary-600)] hover:underline">
                Back to WorkByHome
              </Link>
            </p>
          </div>
        </main>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* Success dialog                                                       */}
      {/* -------------------------------------------------------------------- */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="alertdialog"
              aria-labelledby="success-heading"
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[var(--bg-dark)] px-8 py-10 text-center shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
            >
              {/* ambient dots */}
              {!shouldReduceMotion &&
                [
                  { top: '12%', left: '18%', delay: 0.2 },
                  { top: '22%', left: '80%', delay: 0.35 },
                  { top: '78%', left: '14%', delay: 0.5 },
                  { top: '85%', left: '75%', delay: 0.65 },
                ].map((dot, i) => (
                  <motion.span
                    key={i}
                    className="absolute h-1.5 w-1.5 rounded-full bg-[var(--color-primary-400)]"
                    style={{ top: dot.top, left: dot.left }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0.5], scale: [0, 1.2, 1] }}
                    transition={{ duration: 1.1, delay: dot.delay, ease: 'easeOut' }}
                  />
                ))}

              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary-900)]">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <motion.circle
                    cx="28"
                    cy="28"
                    r="25"
                    stroke="var(--color-primary-400)"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M17 29 L25 37 L39 20"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.55, ease: 'easeOut' }}
                  />
                </svg>
              </div>

              <p className="relative mt-6 [font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--color-primary-400)]">
                Application received
              </p>
              <h2 id="success-heading" className="relative mt-2 text-2xl font-semibold text-white [font-family:var(--font-display)]">
                You're officially in the queue.
              </h2>
              <p className="relative mt-3 text-sm leading-relaxed text-white/70">
                Thanks, {firstName}. Our team is reviewing your profile now — we'll email{' '}
                <span className="text-white">{form.email}</span> within 2–3 business days with next steps.
                No bots, no ghosting.
              </p>

              <div className="relative mt-8 flex flex-col items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--color-primary-500)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-[var(--color-primary-600)]"
                >
                  Back to WorkByHome
                </Link>
                <button type="button" onClick={resetAll} className="text-xs font-medium text-white/50 hover:text-white/80">
                  Submit another application
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[var(--border-medium)] py-1.5 sm:border-none sm:py-0">
      <dt className="text-[var(--text-secondary)]">{label}</dt>
      <dd className="max-w-[60%] truncate text-right font-medium text-[var(--text-primary)]">{value || '—'}</dd>
    </div>
  );
}