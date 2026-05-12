"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Briefcase, Code2, Palette, BarChart3, Globe,
  HeartPulse, ShoppingBag, GraduationCap, Megaphone,
  Camera, Wrench, DollarSign, Users, Shield, Cpu,
  PenTool, Music, TrendingUp, ArrowRight, X, ChevronRight,
  Layers, Zap, Star, Sparkles, RefreshCw, BookOpen,
  Building2, Package, MapPin, Clock, Filter,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface SubCategory {
  name: string;
  jobs: number;
}

interface Category {
  id: number;
  name: string;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
  textColor: string;
  borderColor: string;
  jobs: number;
  companies: number;
  trending: boolean;
  topSkills: string[];
  avgSalary: string;
  subCategories: SubCategory[];
  desc: string;
}

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}

interface CategoryCardProps {
  category: Category;
  index: number;
  onSelect: (cat: Category) => void;
  isSelected: boolean;
}

interface SubCategoryDrawerProps {
  category: Category;
  onClose: () => void;
}

// ─── Data ───────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    id: 1, name: "Engineering & Dev", icon: Code2,
    gradient: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-50", textColor: "text-blue-600", borderColor: "border-blue-100",
    jobs: 4820, companies: 312, trending: true,
    topSkills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Go"],
    avgSalary: "$95k – $175k",
    desc: "Full-stack, frontend, backend, mobile, DevOps and everything in between.",
    subCategories: [
      { name: "Frontend Development", jobs: 1240 },
      { name: "Backend Development", jobs: 980 },
      { name: "Full-Stack Development", jobs: 870 },
      { name: "Mobile (iOS / Android)", jobs: 430 },
      { name: "DevOps & Infrastructure", jobs: 520 },
      { name: "Blockchain & Web3", jobs: 290 },
      { name: "QA & Testing", jobs: 180 },
      { name: "Embedded Systems", jobs: 110 },
    ],
  },
  {
    id: 2, name: "Design & Creative", icon: Palette,
    gradient: "from-pink-500 to-rose-600",
    iconBg: "bg-pink-50", textColor: "text-pink-600", borderColor: "border-pink-100",
    jobs: 2150, companies: 189, trending: true,
    topSkills: ["Figma", "Adobe XD", "Illustrator", "Prototyping", "Webflow", "Motion"],
    avgSalary: "$70k – $130k",
    desc: "UX/UI, product design, motion graphics, branding and visual identity.",
    subCategories: [
      { name: "UX / UI Design", jobs: 780 },
      { name: "Product Design", jobs: 540 },
      { name: "Graphic Design", jobs: 320 },
      { name: "Motion & Animation", jobs: 210 },
      { name: "Brand Identity", jobs: 175 },
      { name: "3D Design", jobs: 125 },
    ],
  },
  {
    id: 3, name: "Marketing & Growth", icon: Megaphone,
    gradient: "from-orange-500 to-amber-500",
    iconBg: "bg-orange-50", textColor: "text-orange-600", borderColor: "border-orange-100",
    jobs: 1890, companies: 224, trending: true,
    topSkills: ["SEO", "Google Ads", "Content Strategy", "Email Marketing", "Analytics", "HubSpot"],
    avgSalary: "$60k – $120k",
    desc: "Growth hacking, paid acquisition, SEO, content, and brand marketing.",
    subCategories: [
      { name: "Digital Marketing", jobs: 560 },
      { name: "SEO / SEM", jobs: 390 },
      { name: "Content Marketing", jobs: 340 },
      { name: "Social Media", jobs: 280 },
      { name: "Growth & Acquisition", jobs: 190 },
      { name: "Email Marketing", jobs: 130 },
    ],
  },
  {
    id: 4, name: "Data & AI", icon: BarChart3,
    gradient: "from-violet-500 to-purple-700",
    iconBg: "bg-violet-50", textColor: "text-violet-600", borderColor: "border-violet-100",
    jobs: 2640, companies: 198, trending: true,
    topSkills: ["Python", "PyTorch", "SQL", "TensorFlow", "Spark", "LLMs"],
    avgSalary: "$100k – $180k",
    desc: "Data science, machine learning, AI engineering and business intelligence.",
    subCategories: [
      { name: "Data Science", jobs: 720 },
      { name: "Machine Learning / AI", jobs: 890 },
      { name: "Data Engineering", jobs: 480 },
      { name: "Business Intelligence", jobs: 310 },
      { name: "AI Research", jobs: 140 },
      { name: "Data Analysis", jobs: 100 },
    ],
  },
  {
    id: 5, name: "Sales & BD", icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-50", textColor: "text-emerald-600", borderColor: "border-emerald-100",
    jobs: 1340, companies: 167, trending: false,
    topSkills: ["Salesforce", "Outreach", "Cold Calling", "SaaS Sales", "CRM", "Negotiation"],
    avgSalary: "$55k – $130k + OTE",
    desc: "SaaS sales, account management, business development and partnerships.",
    subCategories: [
      { name: "SaaS / Tech Sales", jobs: 490 },
      { name: "Account Executive", jobs: 310 },
      { name: "Business Development", jobs: 220 },
      { name: "Partnerships", jobs: 150 },
      { name: "Sales Engineering", jobs: 90 },
      { name: "Revenue Operations", jobs: 80 },
    ],
  },
  {
    id: 6, name: "Product Management", icon: Layers,
    gradient: "from-cyan-500 to-blue-600",
    iconBg: "bg-cyan-50", textColor: "text-cyan-600", borderColor: "border-cyan-100",
    jobs: 980, companies: 143, trending: true,
    topSkills: ["Roadmapping", "Jira", "User Research", "A/B Testing", "Analytics", "Agile"],
    avgSalary: "$100k – $160k",
    desc: "Product strategy, roadmapping, user research and cross-functional leadership.",
    subCategories: [
      { name: "Product Manager", jobs: 440 },
      { name: "Technical PM", jobs: 210 },
      { name: "Product Analyst", jobs: 180 },
      { name: "Product Strategy", jobs: 90 },
      { name: "Growth PM", jobs: 60 },
    ],
  },
  {
    id: 7, name: "Writing & Content", icon: PenTool,
    gradient: "from-yellow-500 to-amber-600",
    iconBg: "bg-yellow-50", textColor: "text-yellow-700", borderColor: "border-yellow-100",
    jobs: 1120, companies: 156, trending: false,
    topSkills: ["Copywriting", "SEO Writing", "Technical Writing", "Editing", "Ghostwriting", "Docs"],
    avgSalary: "$45k – $95k",
    desc: "Copywriting, technical docs, content strategy, journalism and blogging.",
    subCategories: [
      { name: "Copywriting", jobs: 380 },
      { name: "Technical Writing", jobs: 270 },
      { name: "Blog / Content Writing", jobs: 220 },
      { name: "Editing & Proofreading", jobs: 140 },
      { name: "Ghostwriting", jobs: 75 },
      { name: "Grant Writing", jobs: 35 },
    ],
  },
  {
    id: 8, name: "Finance & Accounting", icon: DollarSign,
    gradient: "from-green-600 to-emerald-700",
    iconBg: "bg-green-50", textColor: "text-green-700", borderColor: "border-green-100",
    jobs: 760, companies: 112, trending: false,
    topSkills: ["FP&A", "Excel", "QuickBooks", "GAAP", "Forecasting", "Xero"],
    avgSalary: "$65k – $140k",
    desc: "Financial planning, accounting, tax, auditing and CFO-level strategy.",
    subCategories: [
      { name: "Financial Analyst", jobs: 240 },
      { name: "Accounting / Bookkeeping", jobs: 190 },
      { name: "CFO / Finance Leadership", jobs: 80 },
      { name: "Tax & Compliance", jobs: 120 },
      { name: "Payroll", jobs: 70 },
      { name: "Fintech", jobs: 60 },
    ],
  },
  {
    id: 9, name: "HR & People Ops", icon: Users,
    gradient: "from-fuchsia-500 to-pink-600",
    iconBg: "bg-fuchsia-50", textColor: "text-fuchsia-600", borderColor: "border-fuchsia-100",
    jobs: 630, companies: 98, trending: false,
    topSkills: ["ATS", "HRIS", "Recruiting", "L&D", "Culture", "Compensation"],
    avgSalary: "$55k – $110k",
    desc: "Talent acquisition, people operations, learning & development and culture.",
    subCategories: [
      { name: "Recruiting / Talent", jobs: 280 },
      { name: "HR Business Partner", jobs: 140 },
      { name: "Learning & Development", jobs: 90 },
      { name: "Compensation & Benefits", jobs: 70 },
      { name: "People Analytics", jobs: 50 },
    ],
  },
  {
    id: 10, name: "Customer Success", icon: HeartPulse,
    gradient: "from-red-500 to-rose-600",
    iconBg: "bg-red-50", textColor: "text-red-600", borderColor: "border-red-100",
    jobs: 890, companies: 134, trending: false,
    topSkills: ["Churn Analysis", "Onboarding", "NPS", "Zendesk", "Gainsight", "Intercom"],
    avgSalary: "$55k – $105k",
    desc: "Customer success management, support, onboarding and retention strategies.",
    subCategories: [
      { name: "Customer Success Manager", jobs: 340 },
      { name: "Customer Support", jobs: 280 },
      { name: "Onboarding Specialist", jobs: 150 },
      { name: "Technical Support", jobs: 120 },
    ],
  },
  {
    id: 11, name: "Cybersecurity", icon: Shield,
    gradient: "from-slate-600 to-gray-800",
    iconBg: "bg-slate-50", textColor: "text-slate-700", borderColor: "border-slate-200",
    jobs: 1050, companies: 121, trending: true,
    topSkills: ["Penetration Testing", "SIEM", "ISO 27001", "Cloud Security", "SOC", "Zero Trust"],
    avgSalary: "$90k – $160k",
    desc: "Security engineering, pen testing, compliance, SOC and cloud security.",
    subCategories: [
      { name: "Security Engineer", jobs: 390 },
      { name: "Penetration Testing", jobs: 190 },
      { name: "SOC Analyst", jobs: 150 },
      { name: "Compliance & GRC", jobs: 180 },
      { name: "Cloud Security", jobs: 140 },
    ],
  },
  {
    id: 12, name: "E-commerce & Retail", icon: ShoppingBag,
    gradient: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-50", textColor: "text-amber-700", borderColor: "border-amber-100",
    jobs: 740, companies: 97, trending: false,
    topSkills: ["Shopify", "WooCommerce", "Amazon Seller", "PPC", "Inventory", "CRO"],
    avgSalary: "$50k – $100k",
    desc: "E-commerce management, marketplace selling, CRO and online retail strategy.",
    subCategories: [
      { name: "E-commerce Manager", jobs: 260 },
      { name: "Amazon / Marketplace", jobs: 190 },
      { name: "Shopify Developer", jobs: 140 },
      { name: "Inventory & Logistics", jobs: 90 },
      { name: "Conversion Optimisation", jobs: 60 },
    ],
  },
  {
    id: 13, name: "Education & Training", icon: GraduationCap,
    gradient: "from-sky-500 to-cyan-600",
    iconBg: "bg-sky-50", textColor: "text-sky-600", borderColor: "border-sky-100",
    jobs: 580, companies: 88, trending: false,
    topSkills: ["Instructional Design", "LMS", "eLearning", "Curriculum", "Coaching", "Articulate"],
    avgSalary: "$45k – $90k",
    desc: "Instructional design, eLearning development, coaching and corporate training.",
    subCategories: [
      { name: "Instructional Designer", jobs: 210 },
      { name: "Online Tutor / Teacher", jobs: 180 },
      { name: "Corporate Trainer", jobs: 110 },
      { name: "Curriculum Developer", jobs: 80 },
    ],
  },
  {
    id: 14, name: "Operations & PM", icon: Wrench,
    gradient: "from-teal-500 to-emerald-600",
    iconBg: "bg-teal-50", textColor: "text-teal-600", borderColor: "border-teal-100",
    jobs: 670, companies: 103, trending: false,
    topSkills: ["Project Management", "Scrum", "Notion", "Asana", "OKRs", "Process Improvement"],
    avgSalary: "$60k – $120k",
    desc: "Operations management, project delivery, process improvement and chief-of-staff roles.",
    subCategories: [
      { name: "Project Manager", jobs: 290 },
      { name: "Operations Manager", jobs: 190 },
      { name: "Scrum Master", jobs: 110 },
      { name: "Chief of Staff", jobs: 50 },
      { name: "Business Analyst", jobs: 30 },
    ],
  },
  {
    id: 15, name: "Media & Video", icon: Camera,
    gradient: "from-rose-500 to-pink-600",
    iconBg: "bg-rose-50", textColor: "text-rose-600", borderColor: "border-rose-100",
    jobs: 490, companies: 74, trending: false,
    topSkills: ["Video Editing", "Premiere Pro", "YouTube", "Podcasting", "DaVinci", "After Effects"],
    avgSalary: "$40k – $85k",
    desc: "Video editing, podcast production, YouTube content and multimedia creation.",
    subCategories: [
      { name: "Video Editor", jobs: 210 },
      { name: "Podcast Producer", jobs: 100 },
      { name: "YouTube / Creator", jobs: 90 },
      { name: "Motion Graphics", jobs: 90 },
    ],
  },
  {
    id: 16, name: "Legal & Compliance", icon: BookOpen,
    gradient: "from-indigo-600 to-blue-800",
    iconBg: "bg-indigo-50", textColor: "text-indigo-600", borderColor: "border-indigo-100",
    jobs: 320, companies: 56, trending: false,
    topSkills: ["Contract Law", "GDPR", "IP Law", "Privacy", "Paralegal", "Compliance"],
    avgSalary: "$70k – $150k",
    desc: "In-house counsel, paralegal, privacy compliance and regulatory roles.",
    subCategories: [
      { name: "In-house Counsel", jobs: 130 },
      { name: "Paralegal", jobs: 90 },
      { name: "Privacy & GDPR", jobs: 60 },
      { name: "IP & Patents", jobs: 40 },
    ],
  },
];

const TOTAL_JOBS = CATEGORIES.reduce((s, c) => s + c.jobs, 0);
const TOTAL_COMPANIES = CATEGORIES.reduce((s, c) => s + c.companies, 0);

// ─── Sub-components ─────────────────────────────────────────────────────────
function StatCard({ icon: Icon, value, label, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4`}
    >
      <div className={`w-10 h-10 ${color} bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-xl font-black text-white leading-none">{value}</p>
        <p className="text-xs text-white/60 font-medium mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

function SubCategoryDrawer({ category, onClose }: SubCategoryDrawerProps) {
  const Icon = category.icon;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden z-10"
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${category.gradient} p-6 pb-5`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{category.name}</h3>
                  <p className="text-sm text-white/70 mt-0.5">{category.jobs.toLocaleString()} open positions</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white/15 hover:bg-white/25 rounded-xl transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex gap-3 mt-4">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-white/15 px-3 py-1.5 rounded-full">
                <Building2 className="w-3 h-3" /> {category.companies} companies
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-white/15 px-3 py-1.5 rounded-full">
                <DollarSign className="w-3 h-3" /> {category.avgSalary}
              </span>
            </div>
          </div>

          {/* Sub-categories list */}
          <div className="p-4">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-2 mb-3">
              Sub-categories
            </p>
            <div className="space-y-1">
              {category.subCategories.map((sub, i) => (
                <motion.button
                  key={sub.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 group transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`} />
                    <span className="text-[14px] font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                      {sub.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg">
                      {sub.jobs.toLocaleString()} jobs
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Top Skills */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-2 mb-3">
                Top Skills in Demand
              </p>
              <div className="flex flex-wrap gap-2 px-2">
                {category.topSkills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-[12px] font-semibold px-3 py-1.5 rounded-xl border ${category.borderColor} ${category.textColor} ${category.iconBg}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-4 px-2">
              <button
                className={`w-full py-3.5 rounded-2xl text-sm font-black text-white bg-gradient-to-r ${category.gradient} shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
              >
                Browse All {category.name} Jobs
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CategoryCard({ category, index, onSelect, isSelected }: CategoryCardProps) {
  const Icon = category.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(category)}
      className={`group relative bg-white rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] hover:-translate-y-1 ${
        isSelected
          ? "border-blue-300 shadow-[0_12px_40px_-8px_rgba(37,99,235,0.2)] -translate-y-1"
          : "border-gray-100 hover:border-gray-200"
      }`}
    >
      {/* Top gradient band */}
      <div className={`h-1.5 bg-gradient-to-r ${category.gradient}`} />

      <div className="p-5">
        {/* Icon + Trending badge */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 ${category.iconBg} rounded-2xl flex items-center justify-center border ${category.borderColor} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-5.5 h-5.5 ${category.textColor}`} style={{ width: 22, height: 22 }} />
          </div>
          {category.trending && (
            <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
              <Zap className="w-2.5 h-2.5" /> Hot
            </span>
          )}
        </div>

        {/* Name + Desc */}
        <h3 className={`text-[15px] font-black text-gray-900 group-hover:${category.textColor} transition-colors leading-snug`}>
          {category.name}
        </h3>
        <p className="text-[12.5px] text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
          {category.desc}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1.5">
            <div className={`w-7 h-7 ${category.iconBg} rounded-lg flex items-center justify-center`}>
              <Briefcase className={`w-3.5 h-3.5 ${category.textColor}`} />
            </div>
            <div>
              <p className="text-[13px] font-black text-gray-800">{category.jobs.toLocaleString()}</p>
              <p className="text-[10px] text-gray-400 leading-none">open jobs</p>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="flex items-center gap-1.5">
            <div className={`w-7 h-7 ${category.iconBg} rounded-lg flex items-center justify-center`}>
              <Building2 className={`w-3.5 h-3.5 ${category.textColor}`} />
            </div>
            <div>
              <p className="text-[13px] font-black text-gray-800">{category.companies}</p>
              <p className="text-[10px] text-gray-400 leading-none">companies</p>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="flex items-center gap-1.5">
            <div className={`w-7 h-7 ${category.iconBg} rounded-lg flex items-center justify-center`}>
              <DollarSign className={`w-3.5 h-3.5 ${category.textColor}`} />
            </div>
            <div>
              <p className="text-[11px] font-black text-gray-800 leading-tight">{category.avgSalary.split(" – ")[0]}</p>
              <p className="text-[10px] text-gray-400 leading-none">avg. start</p>
            </div>
          </div>
        </div>

        {/* Top skills */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {category.topSkills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${category.iconBg} ${category.textColor} border ${category.borderColor}`}
            >
              {skill}
            </span>
          ))}
          {category.topSkills.length > 3 && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-gray-50 text-gray-400 border border-gray-100">
              +{category.topSkills.length - 3} more
            </span>
          )}
        </div>

        {/* Footer CTA */}
        <div className={`flex items-center justify-between mt-5 pt-4 border-t border-gray-50`}>
          <span className="text-[12px] font-semibold text-gray-400">
            {category.subCategories.length} sub-categories
          </span>
          <span className={`flex items-center gap-1 text-[12.5px] font-black ${category.textColor} group-hover:gap-2 transition-all`}>
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function BrowseCategories() {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<"All" | "Trending" | "Most Jobs" | "Highest Pay">("All");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filtered = useMemo<Category[]>(() => {
    let list = CATEGORIES.filter((c) => {
      if (!search) return true;
      return (
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.topSkills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
        c.subCategories.some((s) => s.name.toLowerCase().includes(search.toLowerCase()))
      );
    });
    if (filter === "Trending") list = list.filter((c) => c.trending);
    else if (filter === "Most Jobs") list = [...list].sort((a, b) => b.jobs - a.jobs);
    else if (filter === "Highest Pay") list = [...list].sort((a, b) => {
      const getMax = (s: string) => parseInt(s.match(/\$(\d+)k/g)?.pop()?.replace(/\$|k/g, "") || "0");
      return getMax(b.avgSalary) - getMax(a.avgSalary);
    });
    return list;
  }, [search, filter]);

  const trendingCategories = CATEGORIES.filter((c) => c.trending);

  const FILTER_TABS = ["All", "Trending", "Most Jobs", "Highest Pay"] as const;

  return (
    <div className="min-h-screen bg-[#f7f8fc]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-28 pb-14 px-4 relative overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-48 h-48 bg-cyan-500/8 rounded-full blur-2xl pointer-events-none" />

        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              <Layers className="w-3 h-3" />
              {CATEGORIES.length} Job Categories
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Explore Jobs
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                By Category
              </span>
            </h1>
            <p className="text-slate-400 mt-3 text-base max-w-lg mx-auto leading-relaxed">
              Find your perfect remote role. Browse by industry, skill, or interest — discover thousands of opportunities waiting for you.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl shadow-black/30 p-2 flex gap-2"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <Search className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search category, skill, or sub-category…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none font-medium"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-300 hover:text-gray-500 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2">
              <Search className="w-4 h-4" /> Search
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            <StatCard icon={Briefcase} value={TOTAL_JOBS.toLocaleString() + "+"} label="Open Positions" color="text-blue-300" />
            <StatCard icon={Building2} value={TOTAL_COMPANIES.toLocaleString() + "+"} label="Remote Companies" color="text-cyan-300" />
            <StatCard icon={Globe} value="190+" label="Countries Covered" color="text-teal-300" />
            <StatCard icon={Star} value="4.8" label="Avg. Company Rating" color="text-amber-300" />
          </motion.div>
        </div>
      </div>

      {/* ── Trending Banner ────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">Trending Now</span>
            </div>
            <div className="w-px h-5 bg-gray-200 flex-shrink-0" />
            <div className="flex gap-2 flex-shrink-0">
              {trendingCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[13px] font-bold transition-all whitespace-nowrap hover:-translate-y-0.5 ${cat.iconBg} ${cat.textColor} ${cat.borderColor} hover:shadow-sm`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.name}
                    <span className="text-[11px] opacity-60">{cat.jobs.toLocaleString()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Toolbar */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-7">
          <div>
            <h2 className="text-xl font-black text-gray-900">
              {search
                ? `${filtered.length} results for "${search}"`
                : filter === "All"
                ? `All ${CATEGORIES.length} Categories`
                : filter === "Trending"
                ? `🔥 ${filtered.length} Trending Categories`
                : `${filtered.length} Categories`
              }
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {TOTAL_JOBS.toLocaleString()} total remote jobs across all categories
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex bg-white border border-gray-100 rounded-2xl p-1 gap-1 shadow-sm">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${
                  filter === tab
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Category Grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
              <Layers className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No categories found</h3>
            <p className="text-sm text-gray-400 max-w-xs mb-6">
              Try a different search term or browse all categories.
            </p>
            <button
              onClick={() => { setSearch(""); setFilter("All"); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Show All Categories
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((cat, i) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  index={i}
                  onSelect={setSelectedCategory}
                  isSelected={selectedCategory?.id === cat.id}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-14 relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-8 py-12"
        >
          {/* Blobs */}
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3 h-3" /> Don't see your category?
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
              Submit Your Resume & Let Companies Find You
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mb-7 leading-relaxed">
              Upload your profile and get discovered by thousands of remote-first companies actively hiring across every discipline.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-blue-900/40 transition-all hover:-translate-y-0.5">
                <Briefcase className="w-4 h-4" /> Submit Your Resume
              </button>
              <button className="flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm rounded-2xl transition-all hover:-translate-y-0.5">
                <Star className="w-4 h-4" /> Browse All Jobs
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Sub-category Drawer Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedCategory && (
          <SubCategoryDrawer
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}