"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Users, Briefcase, Star, Globe,
  ChevronDown, ChevronLeft, ChevronRight, X,
  SlidersHorizontal, LayoutGrid, List, Building2,
  Filter, ArrowUpDown, CheckCircle2, Bell, Sparkles,
  RefreshCw, Heart, ExternalLink, TrendingUp,
  Shield, Zap, Coffee, Laptop, Award, BookOpen,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────
interface Perk {
  label: string;
  icon: React.ElementType;
}

interface Company {
  id: number;
  name: string;
  logo: string;
  logoColor: string;
  tagline: string;
  desc: string;
  industry: string;
  size: string;
  type: string;
  location: string;
  founded: number;
  openJobs: number;
  rating: number;
  reviews: number;
  featured: boolean;
  hiring: boolean;
  perks: string[];
  coverGradient: string;
  website: string;
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

interface CompanyCardProps {
  company: Company;
  followed: boolean;
  onFollow: (id: number) => void;
  view: "grid" | "list";
  index: number;
}

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

interface EmptyStateProps {
  onClear: () => void;
}

// ─── Constants ─────────────────────────────────────────────────────────────
const INDUSTRIES = [
  "All Industries", "SaaS / Productivity", "Fintech", "AI & Machine Learning",
  "Design Tools", "Developer Tools", "E-commerce", "Health & Wellness",
  "HR Tech", "Infrastructure", "Community & Media",
];

const SIZES = ["1 – 50", "51 – 200", "201 – 500", "501 – 1,000", "1,000+"];
const WORK_TYPES = ["Fully Remote", "Remote-first", "Hybrid"];
const REGIONS = ["Global", "USA", "Europe", "Asia-Pacific", "Latin America"];
const SORT_OPTIONS = ["Most Relevant", "Most Jobs", "Highest Rated", "Newest", "Most Reviews"];
const COMPANIES_PER_PAGE = 9;

const PERK_ICONS: Record<string, React.ElementType> = {
  "Health Insurance": Shield,
  "Flexible Hours": Coffee,
  "Home Office Budget": Laptop,
  "Learning Budget": BookOpen,
  "Equity / Stock": TrendingUp,
  "Unlimited PTO": Star,
  "Async-first": Zap,
  "Team Retreats": Globe,
  "Mental Wellness": Heart,
  "401k / Pension": Award,
};

// ─── Mock Data ──────────────────────────────────────────────────────────────
const COMPANIES: Company[] = [
  {
    id: 1, name: "Stripe", logo: "S", logoColor: "bg-indigo-600",
    tagline: "Financial infrastructure for the internet",
    desc: "Stripe builds economic infrastructure for the internet. Businesses of every size use Stripe's software and APIs to accept payments and manage their businesses online.",
    industry: "Fintech", size: "1,000+", type: "Remote-first",
    location: "USA · Global", founded: 2010, openJobs: 87,
    rating: 4.7, reviews: 2340, featured: true, hiring: true,
    perks: ["Equity / Stock", "Health Insurance", "Learning Budget", "Team Retreats"],
    coverGradient: "from-indigo-600 to-violet-700",
    website: "stripe.com",
  },
  {
    id: 2, name: "Notion", logo: "N", logoColor: "bg-gray-900",
    tagline: "The all-in-one workspace for your notes",
    desc: "Notion is a single space where you can think, write, and plan. Capture thoughts, manage projects, or even run an entire company — and do it exactly the way you want.",
    industry: "SaaS / Productivity", size: "501 – 1,000", type: "Remote-first",
    location: "USA · Global", founded: 2016, openJobs: 34,
    rating: 4.6, reviews: 1120, featured: true, hiring: true,
    perks: ["Flexible Hours", "Home Office Budget", "Health Insurance", "Unlimited PTO"],
    coverGradient: "from-gray-800 to-gray-950",
    website: "notion.so",
  },
  {
    id: 3, name: "Vercel", logo: "▲", logoColor: "bg-black",
    tagline: "Ship faster. Scale to billions.",
    desc: "Vercel provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web. Deploy Next.js, React, and more with zero config.",
    industry: "Developer Tools", size: "201 – 500", type: "Fully Remote",
    location: "Global", founded: 2015, openJobs: 22,
    rating: 4.8, reviews: 680, featured: true, hiring: true,
    perks: ["Async-first", "Home Office Budget", "Equity / Stock", "Learning Budget"],
    coverGradient: "from-gray-700 to-gray-900",
    website: "vercel.com",
  },
  {
    id: 4, name: "Hugging Face", logo: "🤗", logoColor: "bg-yellow-400",
    tagline: "The AI community building the future",
    desc: "Hugging Face is the collaboration platform for the machine learning community. Build, train and deploy state of the art models powered by the reference open source in ML.",
    industry: "AI & Machine Learning", size: "201 – 500", type: "Fully Remote",
    location: "USA · Europe", founded: 2016, openJobs: 19,
    rating: 4.9, reviews: 430, featured: true, hiring: true,
    perks: ["Equity / Stock", "Flexible Hours", "Learning Budget", "Async-first"],
    coverGradient: "from-yellow-400 to-orange-500",
    website: "huggingface.co",
  },
  {
    id: 5, name: "Linear", logo: "L", logoColor: "bg-violet-700",
    tagline: "The issue tracker that engineers love",
    desc: "Linear is a purpose-built tool for planning and building products. Streamline issues, projects, and product roadmaps. Used by the best software teams in the world.",
    industry: "SaaS / Productivity", size: "51 – 200", type: "Fully Remote",
    location: "Global", founded: 2019, openJobs: 11,
    rating: 4.9, reviews: 310, featured: false, hiring: true,
    perks: ["Async-first", "Equity / Stock", "Home Office Budget", "Unlimited PTO"],
    coverGradient: "from-violet-600 to-indigo-800",
    website: "linear.app",
  },
  {
    id: 6, name: "Shopify", logo: "Sh", logoColor: "bg-emerald-600",
    tagline: "Start, run, and grow your business",
    desc: "Shopify is the leading global commerce company providing tools for anyone to start, grow, market, and manage a retail business of any size.",
    industry: "E-commerce", size: "1,000+", type: "Fully Remote",
    location: "Canada · Global", founded: 2006, openJobs: 143,
    rating: 4.4, reviews: 5600, featured: false, hiring: true,
    perks: ["Health Insurance", "401k / Pension", "Learning Budget", "Team Retreats"],
    coverGradient: "from-emerald-500 to-teal-700",
    website: "shopify.com",
  },
  {
    id: 7, name: "Figma", logo: "F", logoColor: "bg-pink-600",
    tagline: "Design, prototype, and collaborate in real time",
    desc: "Figma is a collaborative design tool built for the browser. With Figma, the entire product team can work together in one place, from early concept to design handoff.",
    industry: "Design Tools", size: "501 – 1,000", type: "Hybrid",
    location: "USA", founded: 2012, openJobs: 56,
    rating: 4.6, reviews: 2100, featured: false, hiring: true,
    perks: ["Health Insurance", "Equity / Stock", "Learning Budget", "Mental Wellness"],
    coverGradient: "from-pink-500 to-rose-700",
    website: "figma.com",
  },
  {
    id: 8, name: "Automattic", logo: "A", logoColor: "bg-blue-700",
    tagline: "Making the web a better place",
    desc: "Automattic is a fully distributed company behind WordPress.com, WooCommerce, Jetpack, and more. We believe in making the web a better place for everyone.",
    industry: "Community & Media", size: "1,000+", type: "Fully Remote",
    location: "Global", founded: 2005, openJobs: 38,
    rating: 4.5, reviews: 3200, featured: false, hiring: true,
    perks: ["Flexible Hours", "Home Office Budget", "Mental Wellness", "Unlimited PTO"],
    coverGradient: "from-blue-600 to-blue-900",
    website: "automattic.com",
  },
  {
    id: 9, name: "Cloudflare", logo: "CF", logoColor: "bg-orange-500",
    tagline: "Building a better internet",
    desc: "Cloudflare is a global network designed to make everything you connect to the internet secure, private, fast, and reliable. One of the largest networks in the world.",
    industry: "Infrastructure", size: "1,000+", type: "Hybrid",
    location: "USA · Global", founded: 2009, openJobs: 71,
    rating: 4.3, reviews: 1890, featured: false, hiring: true,
    perks: ["Health Insurance", "401k / Pension", "Equity / Stock", "Team Retreats"],
    coverGradient: "from-orange-500 to-amber-600",
    website: "cloudflare.com",
  },
  {
    id: 10, name: "Loom", logo: "Lo", logoColor: "bg-purple-600",
    tagline: "Communicate better at work with video",
    desc: "Loom makes it easy to record and share video messages with your teammates. Loom is used by over 21 million people across 200,000+ companies worldwide.",
    industry: "SaaS / Productivity", size: "201 – 500", type: "Remote-first",
    location: "USA · Global", founded: 2015, openJobs: 15,
    rating: 4.5, reviews: 790, featured: false, hiring: true,
    perks: ["Flexible Hours", "Health Insurance", "Mental Wellness", "Home Office Budget"],
    coverGradient: "from-purple-600 to-violet-800",
    website: "loom.com",
  },
  {
    id: 11, name: "Remote", logo: "R", logoColor: "bg-teal-600",
    tagline: "Employ anyone, anywhere, simply",
    desc: "Remote makes it easy to employ anyone, anywhere. Payroll, benefits, taxes, and compliance — we handle the complexity so you can focus on growing your team.",
    industry: "HR Tech", size: "501 – 1,000", type: "Fully Remote",
    location: "Global", founded: 2019, openJobs: 29,
    rating: 4.7, reviews: 560, featured: false, hiring: true,
    perks: ["Async-first", "Health Insurance", "Home Office Budget", "Learning Budget"],
    coverGradient: "from-teal-500 to-emerald-700",
    website: "remote.com",
  },
  {
    id: 12, name: "Calm", logo: "C", logoColor: "bg-sky-500",
    tagline: "Sleep more. Stress less. Live better.",
    desc: "Calm is the #1 app for meditation and sleep. Join the millions experiencing better sleep, lower stress, and less anxiety with guided meditations and sleep stories.",
    industry: "Health & Wellness", size: "201 – 500", type: "Remote-first",
    location: "USA", founded: 2012, openJobs: 18,
    rating: 4.4, reviews: 920, featured: false, hiring: false,
    perks: ["Mental Wellness", "Flexible Hours", "Health Insurance", "Unlimited PTO"],
    coverGradient: "from-sky-400 to-blue-600",
    website: "calm.com",
  },
  {
    id: 13, name: "GitHub", logo: "GH", logoColor: "bg-gray-900",
    tagline: "Where the world builds software",
    desc: "GitHub is where over 100 million developers shape the future of software, together. The complete developer platform to build, scale, and deliver secure software.",
    industry: "Developer Tools", size: "1,000+", type: "Remote-first",
    location: "USA · Global", founded: 2008, openJobs: 62,
    rating: 4.5, reviews: 4100, featured: false, hiring: true,
    perks: ["Health Insurance", "401k / Pension", "Learning Budget", "Equity / Stock"],
    coverGradient: "from-gray-700 to-gray-950",
    website: "github.com",
  },
  {
    id: 14, name: "Hashnode", logo: "H", logoColor: "bg-blue-600",
    tagline: "The blogging platform for developers",
    desc: "Hashnode is a free developer blogging platform that allows you to publish articles on your own domain and helps you stay connected with a global developer community.",
    industry: "Community & Media", size: "51 – 200", type: "Fully Remote",
    location: "Global", founded: 2018, openJobs: 8,
    rating: 4.8, reviews: 210, featured: false, hiring: true,
    perks: ["Async-first", "Home Office Budget", "Flexible Hours", "Learning Budget"],
    coverGradient: "from-blue-500 to-indigo-700",
    website: "hashnode.com",
  },
  {
    id: 15, name: "Superhuman", logo: "Su", logoColor: "bg-red-500",
    tagline: "The fastest email experience ever made",
    desc: "Superhuman is the fastest email experience ever made. It's the only email app with a 100ms guarantee, so every action and every transition happens in the blink of an eye.",
    industry: "SaaS / Productivity", size: "51 – 200", type: "Remote-first",
    location: "USA", founded: 2014, openJobs: 13,
    rating: 4.7, reviews: 380, featured: false, hiring: true,
    perks: ["Equity / Stock", "Health Insurance", "Team Retreats", "Flexible Hours"],
    coverGradient: "from-red-500 to-rose-700",
    website: "superhuman.com",
  },
  {
    id: 16, name: "Pitch", logo: "Pi", logoColor: "bg-cyan-600",
    tagline: "Presentations that move teams forward",
    desc: "Pitch is the collaborative presentation platform for modern teams. Create decks that wow, collaborate in real time, and share anywhere with powerful analytics.",
    industry: "SaaS / Productivity", size: "51 – 200", type: "Hybrid",
    location: "Europe", founded: 2018, openJobs: 9,
    rating: 4.6, reviews: 290, featured: false, hiring: true,
    perks: ["Flexible Hours", "Learning Budget", "Home Office Budget", "Mental Wellness"],
    coverGradient: "from-cyan-500 to-blue-700",
    website: "pitch.com",
  },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-3 h-3 ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function FilterCheck({ label, checked, onChange, count }: FilterCheckProps) {
  return (
    <label className="flex items-center justify-between gap-2 py-1.5 cursor-pointer group">
      <div className="flex items-center gap-2.5">
        <div
          onClick={onChange}
          className={`w-4 h-4 rounded-[5px] flex items-center justify-center flex-shrink-0 border transition-all ${
            checked ? "bg-blue-600 border-blue-600" : "border-gray-200 group-hover:border-blue-300"
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

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full group">
        <span className="text-[11px] font-black text-gray-700 uppercase tracking-widest">{title}</span>
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

function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex items-center gap-1.5 text-[12px] font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full"
    >
      {label}
      <button onClick={onRemove}><X className="w-3 h-3 hover:text-blue-900 transition-colors" /></button>
    </motion.span>
  );
}

function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
        <Building2 className="w-7 h-7 text-blue-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">No companies found</h3>
      <p className="text-sm text-gray-400 max-w-xs mb-6">Try adjusting your filters or search terms to discover more companies.</p>
      <button onClick={onClear} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
        <RefreshCw className="w-3.5 h-3.5" /> Clear Filters
      </button>
    </motion.div>
  );
}

// ─── Company Card ───────────────────────────────────────────────────────────
function CompanyCard({ company, followed, onFollow, view, index }: CompanyCardProps) {
  const isList = view === "list";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.32, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-[0_8px_40px_-8px_rgba(37,99,235,0.14)] transition-all duration-300 cursor-pointer overflow-hidden ${
        company.featured ? "ring-1 ring-blue-100" : ""
      } ${isList ? "flex gap-0" : "flex flex-col"}`}
    >
      {/* Cover strip */}
      {!isList && (
        <div className={`h-20 bg-gradient-to-r ${company.coverGradient} relative flex-shrink-0`}>
          {company.featured && (
            <span className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
          {company.hiring && (
            <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Hiring
            </span>
          )}
        </div>
      )}

      <div className={`${isList ? "flex gap-5 p-5 items-start w-full" : "px-5 pb-5 flex flex-col flex-1"}`}>
        {/* Logo — overlaps cover on grid */}
        {!isList && (
          <div className="relative -mt-6 mb-3">
            <div className={`${company.logoColor} w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm border-2 border-white shadow-md`}>
              {company.logo}
            </div>
          </div>
        )}

        {isList && (
          <div className={`${company.logoColor} w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-sm`}>
            {company.logo}
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-[15px] font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                  {company.name}
                </h3>
                {isList && company.featured && (
                  <span className="flex items-center gap-1 text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                    <Sparkles className="w-2 h-2" /> Featured
                  </span>
                )}
                {isList && company.hiring && (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Hiring
                  </span>
                )}
              </div>
              <p className="text-[12.5px] text-gray-400 mt-0.5">{company.tagline}</p>
            </div>

            {/* Follow button */}
            <button
              onClick={(e) => { e.stopPropagation(); onFollow(company.id); }}
              className={`flex-shrink-0 flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-1.5 rounded-xl border transition-all ${
                followed
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <Heart className={`w-3 h-3 ${followed ? "fill-blue-600" : ""}`} />
              {followed ? "Following" : "Follow"}
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
            <span className="flex items-center gap-1.5 text-[12.5px] text-gray-400">
              <Globe className="w-3.5 h-3.5" /> {company.location}
            </span>
            <span className="flex items-center gap-1.5 text-[12.5px] text-gray-400">
              <Users className="w-3.5 h-3.5" /> {company.size} employees
            </span>
            <span className="flex items-center gap-1.5 text-[12.5px] text-gray-400">
              <Building2 className="w-3.5 h-3.5" /> Est. {company.founded}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={company.rating} />
            <span className="text-[12.5px] font-bold text-gray-700">{company.rating}</span>
            <span className="text-[12px] text-gray-400">({company.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Description — list view only */}
          {isList && (
            <p className="text-[12.5px] text-gray-400 mt-2 leading-relaxed line-clamp-2">{company.desc}</p>
          )}

          {/* Perks */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {company.perks.slice(0, isList ? 4 : 3).map((perk) => {
              const Icon = PERK_ICONS[perk] || Star;
              return (
                <span key={perk} className="flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-100">
                  <Icon className="w-3 h-3" /> {perk}
                </span>
              );
            })}
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-between mt-4 ${!isList ? "pt-3 border-t border-gray-50" : ""}`}>
            <div className="flex items-center gap-2">
              <span className={`text-[11.5px] font-bold px-2.5 py-1 rounded-lg ${
                company.type === "Fully Remote" ? "bg-emerald-50 text-emerald-600" :
                company.type === "Remote-first" ? "bg-blue-50 text-blue-600" :
                "bg-amber-50 text-amber-600"
              }`}>
                {company.type}
              </span>
              <span className="text-[11.5px] font-semibold px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-100">
                {company.industry}
              </span>
            </div>

            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[12px] font-bold text-blue-600 hover:underline"
            >
              <Briefcase className="w-3 h-3" />
              {company.openJobs} open jobs
            </a>
          </div>
        </div>
      </div>

      {/* View Company CTA */}
      {!isList && (
        <div className="px-5 pb-5">
          <button className="w-full flex items-center justify-center gap-2 text-[13px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white py-2.5 rounded-xl transition-all duration-200 border border-blue-100 hover:border-blue-600">
            View Company <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ─── Featured Banner ─────────────────────────────────────────────────────────
function FeaturedBanner({ companies, followed, onFollow }: {
  companies: Company[];
  followed: number[];
  onFollow: (id: number) => void;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <h2 className="text-sm font-black text-gray-700 uppercase tracking-widest">Featured Companies</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {companies.map((company, i) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${company.coverGradient} p-5 cursor-pointer group hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-black text-sm border border-white/30">
                {company.logo}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onFollow(company.id); }}
                className={`p-1.5 rounded-lg transition-all ${
                  followed.includes(company.id)
                    ? "bg-white/30 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${followed.includes(company.id) ? "fill-white" : ""}`} />
              </button>
            </div>
            <h3 className="text-[14px] font-black text-white leading-tight">{company.name}</h3>
            <p className="text-[11px] text-white/70 mt-0.5 line-clamp-1">{company.tagline}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[11px] font-bold text-white/80 bg-white/15 px-2.5 py-1 rounded-full">
                {company.openJobs} jobs
              </span>
              <span className="flex items-center gap-1 text-[11px] text-white/70">
                <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                {company.rating}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function BrowseCompanies() {
  const [search, setSearch] = useState<string>("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All Industries");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("Most Relevant");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [followed, setFollowed] = useState<number[]>([1, 3]);
  const [page, setPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [sortOpen, setSortOpen] = useState<boolean>(false);

  const toggleSize = (s: string) =>
    setSelectedSizes((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const toggleType = (t: string) =>
    setSelectedTypes((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);
  const toggleRegion = (r: string) =>
    setSelectedRegions((p) => p.includes(r) ? p.filter((x) => x !== r) : [...p, r]);
  const toggleFollow = (id: number) =>
    setFollowed((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const clearAll = () => {
    setSearch(""); setSelectedIndustry("All Industries");
    setSelectedSizes([]); setSelectedTypes([]); setSelectedRegions([]);
    setPage(1);
  };

  const activeFilterCount =
    (selectedIndustry !== "All Industries" ? 1 : 0) +
    selectedSizes.length + selectedTypes.length + selectedRegions.length;

  const filtered = useMemo<Company[]>(() => {
    let list = COMPANIES.filter((c) => {
      const q = search.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.tagline.toLowerCase().includes(q) && !c.industry.toLowerCase().includes(q)) return false;
      if (selectedIndustry !== "All Industries" && c.industry !== selectedIndustry) return false;
      if (selectedSizes.length && !selectedSizes.includes(c.size)) return false;
      if (selectedTypes.length && !selectedTypes.includes(c.type)) return false;
      if (selectedRegions.length) {
        const match = selectedRegions.some((r) => c.location.toLowerCase().includes(r.toLowerCase()) || c.location === "Global");
        if (!match) return false;
      }
      return true;
    });
    if (sortBy === "Most Jobs") list = [...list].sort((a, b) => b.openJobs - a.openJobs);
    else if (sortBy === "Highest Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === "Newest") list = [...list].sort((a, b) => b.founded - a.founded);
    else if (sortBy === "Most Reviews") list = [...list].sort((a, b) => b.reviews - a.reviews);
    else list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [search, selectedIndustry, selectedSizes, selectedTypes, selectedRegions, sortBy]);

  useEffect(() => { setPage(1); }, [search, selectedIndustry, selectedSizes, selectedTypes, selectedRegions]);

  const totalPages = Math.ceil(filtered.length / COMPANIES_PER_PAGE);
  const paged = filtered.slice((page - 1) * COMPANIES_PER_PAGE, page * COMPANIES_PER_PAGE);
  const featuredCompanies = COMPANIES.filter((c) => c.featured);

  const industryCounts = useMemo<Record<string, number>>(() =>
    Object.fromEntries(INDUSTRIES.slice(1).map((ind) => [ind, COMPANIES.filter((c) => c.industry === ind).length])),
    []
  );

  const SidebarFilters = (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <span className="font-black text-gray-900 text-sm">Filters</span>
          {activeFilterCount > 0 && (
            <span className="text-[11px] font-bold bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} className="text-[11.5px] text-blue-600 hover:underline font-semibold flex items-center gap-1">
            <RefreshCw className="w-2.5 h-2.5" /> Clear all
          </button>
        )}
      </div>

      <FilterSection title="Industry">
        <div className="space-y-0.5">
          {INDUSTRIES.map((ind) => (
            <FilterCheck
              key={ind}
              label={ind}
              checked={selectedIndustry === ind}
              onChange={() => setSelectedIndustry(ind)}
              count={ind === "All Industries" ? COMPANIES.length : industryCounts[ind]}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Company Size">
        <div className="space-y-0.5">
          {SIZES.map((s) => (
            <FilterCheck key={s} label={s} checked={selectedSizes.includes(s)} onChange={() => toggleSize(s)}
              count={COMPANIES.filter((c) => c.size === s).length}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Work Model">
        <div className="space-y-0.5">
          {WORK_TYPES.map((t) => (
            <FilterCheck key={t} label={t} checked={selectedTypes.includes(t)} onChange={() => toggleType(t)}
              count={COMPANIES.filter((c) => c.type === t).length}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Region" defaultOpen={false}>
        <div className="space-y-0.5">
          {REGIONS.map((r) => (
            <FilterCheck key={r} label={r} checked={selectedRegions.includes(r)} onChange={() => toggleRegion(r)} />
          ))}
        </div>
      </FilterSection>

      {/* Stats card */}
      <div className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <Bell className="w-5 h-5 text-blue-600 mb-2" />
        <p className="text-[12.5px] font-bold text-gray-800 mb-1">Company Alerts</p>
        <p className="text-[11.5px] text-gray-500 mb-3">Get notified when companies you like post new jobs.</p>
        <button className="w-full text-[12px] font-bold text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition-colors">
          Set Up Alert
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f8fc]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-28 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              <Building2 className="w-3 h-3" />
              {COMPANIES.length}+ Companies Hiring Remotely
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Remote Companies
              </span>
            </h1>
            <p className="text-slate-400 mt-3 text-base max-w-lg mx-auto">
              Explore top-rated companies embracing remote work — find your culture fit and apply with confidence.
            </p>
          </motion.div>

          {/* Search */}
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
                placeholder="Search company name, industry, or keyword…"
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
            <button className="flex items-center justify-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap">
              <Search className="w-4 h-4" /> Search
            </button>
          </motion.div>

          {/* Quick industry pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap justify-center gap-2 mt-5"
          >
            {INDUSTRIES.slice(1, 7).map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(selectedIndustry === ind ? "All Industries" : ind)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                  selectedIndustry === ind
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                    : "border-white/20 text-slate-300 hover:border-blue-400 hover:text-blue-300 bg-white/5"
                }`}
              >
                {ind}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Featured banner */}
        <FeaturedBanner companies={featuredCompanies} followed={followed} onFollow={toggleFollow} />

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">All Companies</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div className="flex gap-7">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
              {SidebarFilters}
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div>
                <span className="text-base font-black text-gray-900">
                  {filtered.length} {filtered.length === 1 ? "company" : "companies"}
                </span>
                {search && (
                  <span className="text-sm text-gray-400 ml-2">for "{search}"</span>
                )}
              </div>

              <div className="flex items-center gap-2">
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
                        className="absolute right-0 top-[calc(100%+6px)] bg-white rounded-xl border border-gray-100 shadow-xl shadow-black/10 z-20 w-48 py-1"
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
                  <button onClick={() => setView("grid")} className={`p-2 transition-colors ${view === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-600"}`}>
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setView("list")} className={`p-2 transition-colors ${view === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-600"}`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mb-5 overflow-hidden"
                >
                  {selectedIndustry !== "All Industries" && (
                    <FilterChip label={selectedIndustry} onRemove={() => setSelectedIndustry("All Industries")} />
                  )}
                  {selectedSizes.map((s) => <FilterChip key={s} label={s} onRemove={() => toggleSize(s)} />)}
                  {selectedTypes.map((t) => <FilterChip key={t} label={t} onRemove={() => toggleType(t)} />)}
                  {selectedRegions.map((r) => <FilterChip key={r} label={r} onRemove={() => toggleRegion(r)} />)}
                  <button onClick={clearAll} className="text-[12px] font-semibold text-blue-600 hover:underline px-1">
                    Clear all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid */}
            <motion.div
              layout
              className={`grid gap-4 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
            >
              <AnimatePresence mode="popLayout">
                {paged.length === 0
                  ? <EmptyState onClear={clearAll} />
                  : paged.map((company, i) => (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      followed={followed.includes(company.id)}
                      onFollow={toggleFollow}
                      view={view}
                      index={i}
                    />
                  ))
                }
              </AnimatePresence>
            </motion.div>

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

            {filtered.length > 0 && (
              <p className="text-center text-[12px] text-gray-400 mt-4">
                Showing {Math.min((page - 1) * COMPANIES_PER_PAGE + 1, filtered.length)}–{Math.min(page * COMPANIES_PER_PAGE, filtered.length)} of {filtered.length} companies
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <span className="font-black text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Filters
                </span>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="p-5">{SidebarFilters}</div>
              <div className="p-5 border-t border-gray-100 flex gap-2">
                <button onClick={clearAll} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600">
                  Clear All
                </button>
                <button onClick={() => setMobileFilterOpen(false)} className="flex-1 py-3 rounded-xl bg-blue-600 text-sm font-semibold text-white">
                  Show {filtered.length} Companies
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}