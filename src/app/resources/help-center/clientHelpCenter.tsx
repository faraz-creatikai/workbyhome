"use client";

import React, { useMemo, useRef, useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import {
  Search, User, Briefcase, Building2, Bot, FileText, ShieldCheck,
  ChevronRight, ChevronDown, ArrowRight, Headphones, Mail, LifeBuoy,
  X, CheckCircle2, Send, Loader2,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Content — WorkByHome Help Center
// WorkByHome connects job seekers with employers and uses AI Agents to
// match candidates, screen applicants, and manage communication.
//
// Everything below lives in this one file: category accordions, a search
// that reaches into every FAQ, and two working modals (Contact Support /
// Submit a Ticket). There are no other pages — every control either
// expands something in place or opens a modal.
// ---------------------------------------------------------------------------

type ColorKey = 'blue' | 'green' | 'violet' | 'orange' | 'sky' | 'rose';

interface ColorStyle {
  bg: string;
  text: string;
  ring: string;
}

const colorStyles: Record<ColorKey, ColorStyle> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-200' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-200' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'ring-violet-200' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', ring: 'ring-orange-200' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', ring: 'ring-sky-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', ring: 'ring-rose-200' },
};

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: ColorKey;
}

const categories: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Create your account, set up a profile, and learn how WorkByHome works.',
    icon: User,
    color: 'blue',
  },
  {
    id: 'job-seekers',
    title: 'For Job Seekers',
    description: 'Find jobs, submit applications, and track your status with employers.',
    icon: Briefcase,
    color: 'green',
  },
  {
    id: 'employers',
    title: 'For Employers',
    description: 'Post jobs, review matched candidates, and manage your hiring pipeline.',
    icon: Building2,
    color: 'violet',
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'See how our AI Agents match, screen, and message candidates for you.',
    icon: Bot,
    color: 'orange',
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    description: 'Payment methods, payout schedules, invoices, and refunds.',
    icon: FileText,
    color: 'sky',
  },
  {
    id: 'account',
    title: 'Account & Settings',
    description: 'Manage your account, privacy, notifications, and preferences.',
    icon: ShieldCheck,
    color: 'rose',
  },
];

interface Faq {
  id: string;
  q: string;
  a: string;
}

interface FaqWithCategory extends Faq {
  categoryId: string;
  categoryTitle: string;
  categoryColor: ColorKey;
}

// Every FAQ, grouped by category id.
const faqData: Record<string, Faq[]> = {
  'getting-started': [
    { id: 'gs-1', q: 'How do I create a WorkByHome account?', a: 'Click "Sign up," enter your email (or continue with Google), and choose whether you\'re looking for work or hiring. Verify your email and your account is ready — it takes under two minutes.' },
    { id: 'gs-2', q: 'Is WorkByHome free to join?', a: 'Yes. Job seeker accounts are always free. Employers get a free trial with limited job posts, then move to a paid plan based on how many roles they\'re hiring for.' },
    { id: 'gs-3', q: 'What\'s the difference between a job seeker and an employer account?', a: 'A job seeker account is built for searching and applying to roles. An employer account is built for posting jobs and reviewing candidates. Each account has one role — you can\'t do both from a single login.' },
    { id: 'gs-4', q: 'Can I switch between job seeker and employer views?', a: 'If you have both account types registered under the same email, use the account switcher in the top-right menu to move between them. Otherwise, sign up again with the other role using a different email.' },
    { id: 'gs-5', q: 'How do I complete my profile?', a: 'Upload a resume or build one with the profile editor, then add your skills, experience, and job preferences like location, salary range, and remote work. A completeness meter on your dashboard shows what\'s left to fill in.' },
  ],
  'job-seekers': [
    { id: 'js-1', q: 'How do I search and apply for jobs?', a: 'Browse open roles or let matches come to you on your dashboard. Filter by location, salary, and remote options, then apply in one click using the profile and resume you already have on file.' },
    { id: 'js-2', q: 'How does the AI Agent match me with jobs?', a: 'The Agent reads your profile, resume, and stated preferences, then compares them against what each open role actually requires. It ranks results by fit and shows you a match score on every listing.' },
    { id: 'js-3', q: 'Can I track my application status?', a: 'Yes. Your dashboard shows every application moving through Applied, Reviewed, Interview, and Offer or Declined, and you\'ll get a notification whenever one of your applications changes stage.' },
    { id: 'js-4', q: 'Can I edit or withdraw an application after submitting?', a: 'You can edit your submitted materials within 24 hours of applying. You can withdraw an application at any point before an offer is made, from the application\'s detail page.' },
    { id: 'js-5', q: 'Can I upload more than one resume?', a: 'Yes — keep several versions tailored to different kinds of roles, and choose which one to attach each time you apply.' },
  ],
  employers: [
    { id: 'emp-1', q: 'How do I post a job?', a: 'From your employer dashboard, click "Post a job," fill in the role details, requirements, and salary range, then publish. Most listings go live within minutes after a quick automated review.' },
    { id: 'emp-2', q: 'How are candidates matched to my posting?', a: 'The AI Agent scores every applicant, along with candidates it sources proactively, against the requirements you listed. It builds a ranked shortlist that keeps updating as new people apply.' },
    { id: 'emp-3', q: 'How do I review candidates?', a: 'Candidates appear on a pipeline board you can drag between stages. Open any candidate\'s card to see their resume, the Agent\'s match rationale, and any screening notes it collected.' },
    { id: 'emp-4', q: 'Can I message candidates directly?', a: 'Yes, every candidate has an in-app messaging thread. You can also ask the AI Agent to draft outreach for you, which you can edit before it sends.' },
    { id: 'emp-5', q: 'Can interviews be scheduled automatically?', a: 'Connect your calendar under Employer Settings, and the AI Agent will propose times that work for both sides and send calendar invites once a time is confirmed.' },
  ],
  'ai-agents': [
    { id: 'ai-1', q: 'What exactly do the AI Agents do?', a: 'They handle three jobs: matching seekers to relevant roles, screening applicants against an employer\'s stated criteria, and drafting or sending routine messages like status updates and interview confirmations.' },
    { id: 'ai-2', q: 'Can I turn off AI screening?', a: 'Yes. Employers can disable automated screening on a per-job basis in the job\'s settings and review every applicant manually instead.' },
    { id: 'ai-3', q: 'How does the AI Agent message candidates?', a: 'It sends messages on your behalf only for things you\'ve already approved, like status updates and confirmed interview times. Anything beyond that shows up as a draft in your inbox for you to review first.' },
    { id: 'ai-4', q: 'Is my data used to train AI models?', a: 'No. Your resume and application details aren\'t used to train shared models. Only aggregated, de-identified data is ever used for model improvement, as described in our privacy policy.' },
    { id: 'ai-5', q: 'Can I customize what the AI Agent screens for?', a: 'Employers can mark criteria as required versus nice-to-have and weight them accordingly. Job seekers can set their own deal-breakers, like a minimum salary or an on-site requirement, so the Agent filters those out automatically.' },
  ],
  billing: [
    { id: 'bill-1', q: 'What payment methods do you accept?', a: 'Employers can pay with major credit cards or ACH bank transfer for annual plans. Invoicing is available for enterprise accounts.' },
    { id: 'bill-2', q: 'When are employers billed?', a: 'Subscription plans are billed monthly or annually depending on what you chose at signup. Pay-per-post plans are billed as soon as each job goes live.' },
    { id: 'bill-3', q: 'How do I set up my payout method?', a: 'Payouts apply to WorkByHome\'s referral program — if someone you refer gets hired and completes their probation period, you earn a payout. Add a bank account or PayPal under Account > Payouts to receive it.' },
    { id: 'bill-4', q: 'When will I receive a payout?', a: 'Payouts process roughly two weeks after a referred hire completes their qualifying period, then arrive within three to five business days depending on your payout method.' },
    { id: 'bill-5', q: 'Can I get a refund?', a: 'Employers can request a refund on unused job-post credits within 14 days of purchase. Subscription refunds are handled case by case and prorated — reach out to support to start one.' },
  ],
  account: [
    { id: 'acct-1', q: 'How do I update my profile information?', a: 'Go to Account > Profile and edit any field — changes save automatically as you go.' },
    { id: 'acct-2', q: 'How do I manage notification preferences?', a: 'Under Account > Notifications, choose email or push alerts separately for matches, messages, and application updates.' },
    { id: 'acct-3', q: 'How do I secure my account?', a: 'You can change your password anytime from Account > Security, and turn on two-factor authentication there for an extra step at login.' },
    { id: 'acct-4', q: 'How do I delete my account?', a: 'Go to Account > Privacy > Delete Account and confirm through the link we email you. Your data is removed according to the retention window in our privacy notice.' },
    { id: 'acct-5', q: 'What control do I have over my data?', a: 'From Account > Privacy, you can download a copy of your data, control what employers can see on your profile, and opt out of anonymized analytics.' },
  ],
};

interface PopularArticle {
  id: string;
  title: string;
  categoryId: string;
  faqId: string;
}

// Jump-to links shown as "Popular Articles" — each points at one FAQ.
const popularArticles: PopularArticle[] = [
  { id: 'a1', title: 'How to create a WorkByHome account', categoryId: 'getting-started', faqId: 'gs-1' },
  { id: 'a2', title: 'How to apply for a job', categoryId: 'job-seekers', faqId: 'js-1' },
  { id: 'a3', title: 'How AI Agents help you find the right job', categoryId: 'ai-agents', faqId: 'ai-1' },
  { id: 'a4', title: 'Setting up your payout method', categoryId: 'billing', faqId: 'bill-3' },
];

// Flat list of every FAQ, tagged with its category — used for search and "view all".
const allFaqs: FaqWithCategory[] = categories.flatMap((cat) =>
  faqData[cat.id].map((faq) => ({ ...faq, categoryId: cat.id, categoryTitle: cat.title, categoryColor: cat.color }))
);

const ticketTopics: string[] = [...categories.map((c) => c.title), 'Something else'];

// A minimal shared shape covering both a PopularArticle and a FaqWithCategory,
// since handleArticleClick accepts either one.
interface ArticleLike {
  id: string;
  title?: string;
  q?: string;
  categoryId: string;
  faqId?: string;
}

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

interface FaqRowProps {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqRow({ faq, isOpen, onToggle }: FaqRowProps) {
  return (
    <div className="border-b border-[var(--border-light)] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${faq.id}`}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group focus:outline-none"
      >
        <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--color-primary-600)] transition-colors">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 text-[var(--text-tertiary)] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>
      <div
        id={`faq-panel-${faq.id}`}
        className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed pb-4 pr-8">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

interface CategoryCardProps {
  cat: HelpCategory;
  isActive: boolean;
  onClick: () => void;
}

function CategoryCard({ cat, isActive, onClick }: CategoryCardProps) {
  const styles = colorStyles[cat.color];
  const Icon = cat.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isActive}
      className={`group w-full flex items-start gap-4 p-5 bg-[var(--bg-primary)] border rounded-2xl text-left hover:shadow-md transition-all duration-200 ${
        isActive ? `border-[var(--color-primary-400)] shadow-md ring-2 ${styles.ring}` : 'border-[var(--border-light)] hover:border-[var(--color-primary-300)]'
      }`}
    >
      <div className={`w-11 h-11 rounded-xl ${styles.bg} ${styles.text} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[var(--text-primary)]">{cat.title}</h3>
        <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
          {cat.description}
        </p>
      </div>
      <ChevronRight
        className={`w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0 mt-1 transition-transform duration-200 ${isActive ? 'rotate-90' : 'group-hover:translate-x-0.5'}`}
      />
    </button>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}

function Modal({ open, onClose, title, icon: Icon, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-neutral-900 opacity-50"
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-md bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-2xl shadow-lg p-6 transition-all duration-300 ${
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5 text-[var(--color-primary-600)]" />}
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-lg text-[var(--text-tertiary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [showAllArticles, setShowAllArticles] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [ticketOpen, setTicketOpen] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const query = searchQuery.trim().toLowerCase();
  const isSearching = query.length > 0;

  const filteredCategories = useMemo<HelpCategory[]>(() => {
    if (!query) return categories;
    return categories.filter(
      (c) => c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query)
    );
  }, [query]);

  const matchingFaqs = useMemo<FaqWithCategory[]>(() => {
    if (!query) return [];
    return allFaqs.filter(
      (f) => f.q.toLowerCase().includes(query) || f.a.toLowerCase().includes(query)
    );
  }, [query]);

  const hasResults = filteredCategories.length > 0 || matchingFaqs.length > 0;

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) ?? null;

  function openCategory(catId: string, faqId: string | null) {
    setSelectedCategoryId(catId);
    setExpandedFaqId(faqId);
    // Let the panel mount/update before scrolling to it.
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function handleCategoryClick(catId: string) {
    if (selectedCategoryId === catId) {
      setSelectedCategoryId(null);
      setExpandedFaqId(null);
    } else {
      openCategory(catId, null);
    }
  }

  function handleArticleClick(article: ArticleLike) {
    // popularArticles entries carry a dedicated faqId; entries drawn from the
    // flat allFaqs list (search results, "view all articles") use their own id.
    openCategory(article.categoryId, article.faqId ?? article.id);
  }

  function toggleFaq(faqId: string) {
    setExpandedFaqId((current) => (current === faqId ? null : faqId));
  }

  function openTicketFromCategory() {
    setContactOpen(false);
    setTicketOpen(true);
  }

  function handleClearSearch() {
    setSearchQuery('');
    searchInputRef.current?.focus();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-20">
      {/* ---------------------------------------------------------------- */}
      {/* Hero */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-gradient-to-b from-[var(--color-primary-50)] to-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr_1fr] items-center gap-10">
            {/* Sticky note illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative -rotate-6">
                <div className="w-52 h-52 bg-amber-100 border border-amber-200/80 rounded-sm shadow-md p-5 flex items-start">
                  <p className="text-amber-900/80 text-sm leading-relaxed">
                    Need help? We&apos;re here to support you every step of the way.
                  </p>
                </div>
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-rose-500 shadow" />
                <div className="absolute -bottom-4 -right-4 bg-[var(--bg-primary)] rounded-full shadow-md px-3 py-2 flex gap-1 rotate-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-400)]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-500)]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-600)]" />
                </div>
              </div>
            </div>

            {/* Heading + search */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
                Help Center
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                Find answers, solve issues, and get the most out of WorkByHome.
              </p>

              <div className="max-w-xl mx-auto flex items-center bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-2xl shadow-sm overflow-hidden focus-within:border-[var(--color-primary-400)] transition-colors">
                <Search className="w-5 h-5 text-[var(--text-tertiary)] ml-4 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  placeholder="Search for help articles..."
                  className="w-full px-3 py-4 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                    className="p-2 mr-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => searchInputRef.current?.focus()}
                  className="px-6 py-4 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white font-medium transition-colors flex-shrink-0"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Life-buoy illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative rotate-3 bg-[var(--bg-primary)] rounded-2xl shadow-lg p-5 w-56 text-center">
                <div className="absolute top-3 right-4 flex flex-col gap-1 -rotate-12">
                  <span className="w-4 h-0.5 bg-[var(--border-medium)] rounded-full" />
                  <span className="w-3 h-0.5 bg-[var(--border-medium)] rounded-full ml-1" />
                  <span className="w-2 h-0.5 bg-[var(--border-medium)] rounded-full ml-2" />
                </div>
                <LifeBuoy className="w-12 h-12 text-rose-500 mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-sm font-medium text-[var(--text-primary)] mb-3">
                  Can&apos;t find what you&apos;re looking for?
                </p>
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary-600)] border border-[var(--color-primary-200)] rounded-full px-3 py-1.5 hover:bg-[var(--color-primary-50)] transition-colors"
                >
                  Contact Support <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Categories */}
      {/* ---------------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-center mb-8 text-[var(--text-primary)]">
          Browse by Category
        </h2>

        {!hasResults ? (
          <div className="text-center py-12 border border-dashed border-[var(--border-medium)] rounded-2xl">
            <p className="text-[var(--text-secondary)] mb-4">
              No results for &quot;{searchQuery}&quot;. Try a different search, or reach out directly.
            </p>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Headphones className="w-4 h-4" /> Contact Support
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCategories.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  isActive={selectedCategoryId === cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                />
              ))}
            </div>

            {/* Search matches across every FAQ */}
            {isSearching && (
              <div className="mt-6">
                {matchingFaqs.length > 0 ? (
                  <div className="bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                      Matching questions
                    </h3>
                    <div className="flex flex-col divide-y divide-[var(--border-light)]">
                      {matchingFaqs.map((faq) => {
                        const styles = colorStyles[faq.categoryColor];
                        return (
                          <button
                            key={faq.id}
                            type="button"
                            onClick={() => handleArticleClick(faq)}
                            className="flex items-center justify-between gap-3 py-3 text-left group"
                          >
                            <span className="min-w-0">
                              <span className="block text-sm text-[var(--text-secondary)] group-hover:text-[var(--color-primary-600)] transition-colors truncate">
                                {faq.q}
                              </span>
                              <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${styles.bg} ${styles.text}`}>
                                {faq.categoryTitle}
                              </span>
                            </span>
                            <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[var(--text-tertiary)] text-center">
                    No questions matched &quot;{searchQuery}&quot; — try a category above instead.
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {/* Expanding category panel — always mounted so it can animate open/closed */}
        <div
          ref={panelRef}
          className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
            selectedCategory ? 'max-h-screen opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          {selectedCategory && (
            <div className="bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${colorStyles[selectedCategory.color].bg} ${colorStyles[selectedCategory.color].text} flex items-center justify-center flex-shrink-0`}>
                    <selectedCategory.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{selectedCategory.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{selectedCategory.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategoryId(null);
                    setExpandedFaqId(null);
                  }}
                  aria-label="Close"
                  className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4">
                {faqData[selectedCategory.id].map((faq) => (
                  <FaqRow
                    key={faq.id}
                    faq={faq}
                    isOpen={expandedFaqId === faq.id}
                    onToggle={() => toggleFaq(faq.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Popular Articles + Still need help */}
      {/* ---------------------------------------------------------------- */}
      {hasResults && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Popular Articles */}
            <div className="lg:col-span-3 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Popular Articles</h3>
                <button
                  type="button"
                  onClick={() => setShowAllArticles((v) => !v)}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary-600)] hover:underline"
                >
                  {showAllArticles ? 'Show fewer' : 'View all articles'}{' '}
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 ${showAllArticles ? 'rotate-90' : ''}`} />
                </button>
              </div>
              <div className="divide-y divide-[var(--border-light)]">
                {(showAllArticles ? allFaqs : popularArticles).map((article) => {
                  const label = 'title' in article ? article.title : article.q;
                  return (
                    <button
                      key={article.id}
                      type="button"
                      onClick={() => handleArticleClick(article)}
                      className="w-full flex items-center justify-between gap-3 py-3 group text-left"
                    >
                      <span className="flex items-center gap-2 text-sm text-[var(--text-secondary)] group-hover:text-[var(--color-primary-600)] transition-colors">
                        <FileText className="w-4 h-4 text-[var(--color-primary-500)] flex-shrink-0" />
                        {label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Still need help */}
            <div className="lg:col-span-2 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-2xl p-6 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">Still need help?</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-5">
                Our support team is ready to assist you, whether you&apos;re hiring or looking for work.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Headphones className="w-4 h-4" /> Contact Support
                </button>
                <button
                  type="button"
                  onClick={() => setTicketOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[var(--border-medium)] hover:bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg text-sm font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" /> Submit a Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Contact Support modal */}
      {/* ---------------------------------------------------------------- */}
      <Modal open={contactOpen} onClose={() => setContactOpen(false)} title="Contact Support" icon={Headphones}>
        <p className="text-sm text-[var(--text-secondary)] mb-5">
          Pick whichever works best — our team typically replies within a few hours.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="mailto:support@workbyhome.com"
            className="flex items-center gap-3 p-4 border border-[var(--border-light)] rounded-xl hover:border-[var(--color-primary-300)] hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <span>
              <span className="block text-sm font-medium text-[var(--text-primary)]">Email us</span>
              <span className="block text-xs text-[var(--text-tertiary)]">support@workbyhome.com</span>
            </span>
          </a>
          <button
            type="button"
            onClick={openTicketFromCategory}
            className="flex items-center gap-3 p-4 border border-[var(--border-light)] rounded-xl hover:border-[var(--color-primary-300)] hover:bg-[var(--bg-secondary)] transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <span>
              <span className="block text-sm font-medium text-[var(--text-primary)]">Submit a ticket</span>
              <span className="block text-xs text-[var(--text-tertiary)]">Best for anything that needs detail</span>
            </span>
          </button>
        </div>
      </Modal>

      {/* ---------------------------------------------------------------- */}
      {/* Submit a Ticket modal */}
      {/* ---------------------------------------------------------------- */}
      <TicketModal
        open={ticketOpen}
        onClose={() => setTicketOpen(false)}
        defaultTopic={selectedCategory ? selectedCategory.title : ''}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ticket modal — its own component so its form state resets cleanly
// ---------------------------------------------------------------------------

type TicketStatus = 'idle' | 'submitting' | 'submitted';

interface TicketFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface TicketModalProps {
  open: boolean;
  onClose: () => void;
  defaultTopic: string;
}

function TicketModal({ open, onClose, defaultTopic }: TicketModalProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<TicketFormErrors>({});
  const [status, setStatus] = useState<TicketStatus>('idle');
  const [ticketNumber, setTicketNumber] = useState<string>('');

  useEffect(() => {
    if (open) {
      setTopic((current) => current || defaultTopic || ticketTopics[ticketTopics.length - 1]);
    }
  }, [open, defaultTopic]);

  function resetForm() {
    setName('');
    setEmail('');
    setTopic('');
    setMessage('');
    setErrors({});
    setStatus('idle');
    setTicketNumber('');
  }

  function handleClose() {
    onClose();
    // Wait for the close transition before wiping the form.
    setTimeout(resetForm, 300);
  }

  function validate(): boolean {
    const next: TicketFormErrors = {};
    if (!name.trim()) next.name = 'Enter your name.';
    if (!email.trim()) next.email = 'Enter your email.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email.';
    if (!message.trim()) next.message = 'Tell us what\'s going on.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    // Simulated submission — wire this up to a real endpoint when ready.
    setTimeout(() => {
      setTicketNumber(`WBH-${Math.floor(100000 + Math.random() * 900000)}`);
      setStatus('submitted');
    }, 900);
  }

  return (
    <Modal open={open} onClose={handleClose} title="Submit a Ticket" icon={Mail}>
      {status === 'submitted' ? (
        <div className="text-center py-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
            Ticket {ticketNumber} submitted
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-5">
            We&apos;ll follow up at {email} within one business day.
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-[var(--border-medium)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              Submit another
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-lg text-sm font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className={`w-full px-3 py-2.5 border rounded-lg bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] outline-none transition-colors ${
                errors.name ? 'border-rose-400' : 'border-[var(--border-light)] focus:border-[var(--color-primary-400)]'
              }`}
              placeholder="Jamie Rivera"
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className={`w-full px-3 py-2.5 border rounded-lg bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] outline-none transition-colors ${
                errors.email ? 'border-rose-400' : 'border-[var(--border-light)] focus:border-[var(--color-primary-400)]'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Topic</label>
            <select
              value={topic}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setTopic(e.target.value)}
              className="w-full px-3 py-2.5 border border-[var(--border-light)] rounded-lg bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-primary-400)] transition-colors"
            >
              {ticketTopics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              rows={4}
              className={`w-full px-3 py-2.5 border rounded-lg bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] outline-none transition-colors resize-none ${
                errors.message ? 'border-rose-400' : 'border-[var(--border-light)] focus:border-[var(--color-primary-400)]'
              }`}
              placeholder="What's going on?"
            />
            {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] disabled:opacity-70 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Submit ticket
              </>
            )}
          </button>
        </form>
      )}
    </Modal>
  );
}