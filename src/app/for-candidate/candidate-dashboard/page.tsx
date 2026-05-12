"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Briefcase, Bookmark, Bell, User,
  Settings, ChevronRight, ArrowUpRight, TrendingUp,
  Eye, Send, CheckCircle2, XCircle, Clock, Star,
  MapPin, DollarSign, Building2, Calendar, Zap,
  FileText, Globe,  MessageSquare,
  MoreHorizontal, Filter, Search, Download, Edit3,
  Award, Target, Flame, Activity, ChevronDown, X,
  Menu, LogOut, AlertCircle, RefreshCw, Plus,
  ThumbsUp, Mail, Phone, Layers, ArrowRight, Check,
  BarChart3, Users, Sparkles, Lock, Heart, BookmarkCheck,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

// ─── Types ───────────────────────────────────────────────────────────────────
type AppStatus = "applied" | "viewed" | "shortlisted" | "interview" | "offered" | "rejected";
type NavItem = "overview" | "applications" | "saved" | "alerts" | "profile" | "settings";

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  logo: string;
  logoColor: string;
  location: string;
  salary: string;
  type: string;
  appliedDate: string;
  status: AppStatus;
  statusUpdated: string;
  recruiterViewed: boolean;
  nextStep?: string;
}

interface SavedJob {
  id: number;
  jobTitle: string;
  company: string;
  logo: string;
  logoColor: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  deadline?: string;
  isUrgent: boolean;
}

interface Notification {
  id: number;
  type: "viewed" | "shortlisted" | "interview" | "message" | "match" | "reminder";
  title: string;
  body: string;
  time: string;
  read: boolean;
  avatar?: string;
  avatarColor?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CANDIDATE = {
  name: "Alex Johnson",
  title: "Senior Frontend Developer",
  email: "alex.johnson@email.com",
  location: "New York, USA (EST)",
  avatar: "AJ",
  avatarGradient: "from-blue-500 to-indigo-600",
  profileScore: 82,
  resumeViews: 148,
  profileViews: 312,
  joinedDate: "March 2024",
};

const PROFILE_TASKS = [
  { label: "Add profile photo", done: false, points: 5 },
  { label: "Upload resume", done: true, points: 20 },
  { label: "Add 5+ skills", done: true, points: 15 },
  { label: "Write bio summary", done: true, points: 10 },
  { label: "Add LinkedIn URL", done: false, points: 10 },
  { label: "Set salary expectations", done: true, points: 10 },
  { label: "Set availability", done: false, points: 5 },
  { label: "Add portfolio link", done: false, points: 5 },
];

const APPLICATIONS: Application[] = [
  {
    id: 1, jobTitle: "Senior Frontend Developer", company: "Stripe",
    logo: "S", logoColor: "bg-indigo-600", location: "Remote · USA",
    salary: "$120k – $160k", type: "Full-time",
    appliedDate: "May 8, 2026", status: "interview",
    statusUpdated: "2 days ago", recruiterViewed: true,
    nextStep: "Technical interview scheduled for May 15",
  },
  {
    id: 2, jobTitle: "Product Designer (UX/UI)", company: "Notion",
    logo: "N", logoColor: "bg-gray-900", location: "Remote · Global",
    salary: "$90k – $130k", type: "Full-time",
    appliedDate: "May 5, 2026", status: "shortlisted",
    statusUpdated: "4 days ago", recruiterViewed: true,
    nextStep: "Portfolio review in progress",
  },
  {
    id: 3, jobTitle: "DevOps / Platform Engineer", company: "Vercel",
    logo: "▲", logoColor: "bg-black", location: "Remote · Global",
    salary: "$110k – $155k", type: "Full-time",
    appliedDate: "May 2, 2026", status: "viewed",
    statusUpdated: "1 week ago", recruiterViewed: true,
  },
  {
    id: 4, jobTitle: "Growth Marketing Manager", company: "Linear",
    logo: "L", logoColor: "bg-violet-700", location: "Remote · USA",
    salary: "$85k – $115k", type: "Full-time",
    appliedDate: "Apr 28, 2026", status: "applied",
    statusUpdated: "2 weeks ago", recruiterViewed: false,
  },
  {
    id: 5, jobTitle: "Backend Engineer (Go)", company: "Cloudflare",
    logo: "CF", logoColor: "bg-orange-500", location: "Remote · EU",
    salary: "$100k – $145k", type: "Full-time",
    appliedDate: "Apr 20, 2026", status: "rejected",
    statusUpdated: "3 weeks ago", recruiterViewed: true,
  },
  {
    id: 6, jobTitle: "Data Scientist", company: "Hugging Face",
    logo: "🤗", logoColor: "bg-yellow-400", location: "Remote · Global",
    salary: "$100k – $140k", type: "Full-time",
    appliedDate: "Apr 15, 2026", status: "offered",
    statusUpdated: "5 days ago", recruiterViewed: true,
    nextStep: "Offer letter sent — expires May 20",
  },
];

const SAVED_JOBS: SavedJob[] = [
  {
    id: 1, jobTitle: "iOS Engineer (Swift)", company: "Superhuman",
    logo: "SH", logoColor: "bg-red-500", location: "Remote · USA",
    salary: "$130k – $170k", type: "Full-time",
    postedDate: "2d ago", isUrgent: true, deadline: "May 20, 2026",
  },
  {
    id: 2, jobTitle: "React Native Developer", company: "Calm",
    logo: "C", logoColor: "bg-sky-500", location: "Remote · Global",
    salary: "$95k – $130k", type: "Contract",
    postedDate: "3d ago", isUrgent: false,
  },
  {
    id: 3, jobTitle: "Technical Content Writer", company: "Hashnode",
    logo: "H", logoColor: "bg-blue-600", location: "Remote · Global",
    salary: "$55k – $80k", type: "Contract",
    postedDate: "5d ago", isUrgent: false,
  },
  {
    id: 4, jobTitle: "Head of Finance", company: "Pitch",
    logo: "Pi", logoColor: "bg-teal-600", location: "Remote · EU",
    salary: "$120k – $160k", type: "Full-time",
    postedDate: "1w ago", isUrgent: false,
  },
];

const NOTIFICATIONS: Notification[] = [
  {
    id: 1, type: "interview", read: false,
    title: "Interview Scheduled — Stripe",
    body: "Your technical interview is confirmed for May 15 at 3:00 PM EST.",
    time: "2h ago", avatar: "S", avatarColor: "bg-indigo-600",
  },
  {
    id: 2, type: "shortlisted", read: false,
    title: "You've been shortlisted — Notion",
    body: "The hiring team at Notion has shortlisted your application for review.",
    time: "4h ago", avatar: "N", avatarColor: "bg-gray-900",
  },
  {
    id: 3, type: "match", read: false,
    title: "5 new job matches found",
    body: "Based on your profile and skills, we found 5 new matching jobs this week.",
    time: "1d ago",
  },
  {
    id: 4, type: "viewed", read: true,
    title: "Vercel viewed your profile",
    body: "A recruiter from Vercel viewed your resume and profile.",
    time: "2d ago", avatar: "▲", avatarColor: "bg-black",
  },
  {
    id: 5, type: "message", read: true,
    title: "Message from Cloudflare",
    body: "Thank you for applying. After careful review, we've decided to move forward with other candidates.",
    time: "3d ago", avatar: "CF", avatarColor: "bg-orange-500",
  },
  {
    id: 6, type: "reminder", read: true,
    title: "Complete your profile",
    body: "Add a portfolio link and profile photo to boost your visibility by 40%.",
    time: "1w ago",
  },
];

const STATUS_CONFIG: Record<AppStatus, {
  label: string; color: string; bg: string; border: string; icon: React.ElementType; dot: string;
}> = {
  applied:     { label: "Applied",      color: "text-blue-600",   bg: "bg-blue-50",    border: "border-blue-100",   icon: Send,         dot: "bg-blue-400" },
  viewed:      { label: "Viewed",       color: "text-cyan-600",   bg: "bg-cyan-50",    border: "border-cyan-100",   icon: Eye,          dot: "bg-cyan-400" },
  shortlisted: { label: "Shortlisted",  color: "text-violet-600", bg: "bg-violet-50",  border: "border-violet-100", icon: Star,         dot: "bg-violet-500" },
  interview:   { label: "Interview",    color: "text-amber-600",  bg: "bg-amber-50",   border: "border-amber-100",  icon: Calendar,     dot: "bg-amber-400" },
  offered:     { label: "Offered 🎉",   color: "text-emerald-600",bg: "bg-emerald-50", border: "border-emerald-100",icon: CheckCircle2, dot: "bg-emerald-500" },
  rejected:    { label: "Rejected",     color: "text-red-500",    bg: "bg-red-50",     border: "border-red-100",    icon: XCircle,      dot: "bg-red-400" },
};

const NOTIF_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  interview:   { icon: Calendar,    color: "text-amber-600",   bg: "bg-amber-50" },
  shortlisted: { icon: Star,        color: "text-violet-600",  bg: "bg-violet-50" },
  match:       { icon: Sparkles,    color: "text-blue-600",    bg: "bg-blue-50" },
  viewed:      { icon: Eye,         color: "text-cyan-600",    bg: "bg-cyan-50" },
  message:     { icon: MessageSquare, color: "text-gray-600",  bg: "bg-gray-100" },
  reminder:    { icon: AlertCircle, color: "text-orange-500",  bg: "bg-orange-50" },
};

const NAV_ITEMS: { id: NavItem; label: string; icon: React.ElementType }[] = [
  { id: "overview",      label: "Overview",      icon: LayoutDashboard },
  { id: "applications",  label: "Applications",  icon: Briefcase },
  { id: "saved",         label: "Saved Jobs",    icon: Bookmark },
  { id: "alerts",        label: "Notifications", icon: Bell },
  { id: "profile",       label: "My Profile",    icon: User },
  { id: "settings",      label: "Settings",      icon: Settings },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const},
};

const stagger = (i: number) => ({ ...fadeUp, transition: { ...fadeUp.transition, delay: i * 0.06 } });

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon, label, value, sub, color, iconBg, index,
}: {
  icon: React.ElementType; label: string; value: string | number;
  sub: string; color: string; iconBg: string; index: number;
}) {
  return (
    <motion.div
      {...stagger(index)}
      className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
      </div>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      <p className="text-[13px] font-bold text-gray-700 mt-0.5">{label}</p>
      <p className="text-[11.5px] text-gray-400 mt-0.5">{sub}</p>
    </motion.div>
  );
}

// ─── Pipeline Tracker ─────────────────────────────────────────────────────────
function PipelineTracker({ apps }: { apps: Application[] }) {
  const stages: AppStatus[] = ["applied", "viewed", "shortlisted", "interview", "offered"];
  return (
    <motion.div {...stagger(1)} className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-widest">Application Pipeline</h3>
        <span className="text-[11.5px] text-gray-400 font-semibold">{apps.filter(a => a.status !== "rejected").length} active</span>
      </div>
      <div className="flex gap-1 items-end h-24 mb-3">
        {stages.map((stage) => {
          const count = apps.filter((a) => a.status === stage).length;
          const maxCount = Math.max(...stages.map((s) => apps.filter((a) => a.status === s).length), 1);
          const height = count === 0 ? 8 : Math.max(20, (count / maxCount) * 80);
          const cfg = STATUS_CONFIG[stage];
          return (
            <div key={stage} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-black text-gray-500">{count}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className={`w-full rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center`}
                style={{ minHeight: 8 }}
              >
                {count > 0 && <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />}
              </motion.div>
              <span className="text-[9.5px] font-bold text-gray-400 text-center leading-tight">{cfg.label.replace(" 🎉", "")}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Recent Activity ──────────────────────────────────────────────────────────
function RecentActivity({ apps }: { apps: Application[] }) {
  const recent = apps.slice(0, 4);
  return (
    <motion.div {...stagger(2)} className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-widest">Recent Applications</h3>
        <button className="text-[12px] font-bold text-blue-600 hover:underline flex items-center gap-1">
          View all <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="space-y-3">
        {recent.map((app) => {
          const cfg = STATUS_CONFIG[app.status];
          const StatusIcon = cfg.icon;
          return (
            <div key={app.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer">
              <div className={`w-9 h-9 ${app.logoColor} rounded-xl flex items-center justify-center text-white text-[11px] font-black flex-shrink-0`}>
                {app.logo}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-gray-800 truncate">{app.jobTitle}</p>
                <p className="text-[11.5px] text-gray-400">{app.company} · {app.appliedDate}</p>
              </div>
              <span className={`flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-lg ${cfg.bg} ${cfg.color} border ${cfg.border} flex-shrink-0`}>
                <StatusIcon className="w-3 h-3" />
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Profile Completion Card ───────────────────────────────────────────────────
function ProfileCompletion() {
  const done = PROFILE_TASKS.filter((t) => t.done).length;
  const pct = Math.round((done / PROFILE_TASKS.length) * 100);
  const remaining = PROFILE_TASKS.filter((t) => !t.done);

  return (
    <motion.div {...stagger(3)} className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <Target className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-[13px] font-black text-gray-800">Profile Strength</h3>
          <p className="text-[11.5px] text-gray-400">Complete your profile to get more views</p>
        </div>
      </div>

      {/* Circular progress */}
      <div className="flex items-center gap-5 mb-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#f3f4f6" strokeWidth="8" />
            <motion.circle
              cx="40" cy="40" r="32" fill="none"
              stroke="url(#progressGrad)" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 32}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - pct / 100) }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[17px] font-black text-gray-900">{pct}%</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-black text-gray-700 mb-1">
            {pct >= 80 ? "Strong Profile! 💪" : pct >= 60 ? "Good Progress 👍" : "Needs Attention"}
          </p>
          <p className="text-[12px] text-gray-400 leading-relaxed">
            {remaining.length} tasks left. Complete them to boost your visibility by <span className="font-bold text-blue-600">+40%</span>
          </p>
        </div>
      </div>

      {/* Remaining tasks */}
      {remaining.slice(0, 3).map((task) => (
        <div key={task.label} className="flex items-center gap-2.5 py-2 border-t border-gray-50 first:border-0">
          <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" />
          <span className="text-[12.5px] text-gray-500 flex-1">{task.label}</span>
          <span className="text-[11px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-lg">+{task.points}pts</span>
        </div>
      ))}
      {remaining.length > 3 && (
        <button className="w-full mt-2 text-[12px] font-bold text-blue-600 hover:underline text-center">
          +{remaining.length - 3} more tasks
        </button>
      )}
    </motion.div>
  );
}

// ─── Quick Stats Row ──────────────────────────────────────────────────────────
function OverviewPage({ apps }: { apps: Application[] }) {
  const stats = [
    {
      icon: Send, label: "Total Applied", value: apps.length, sub: "All time applications",
      color: "text-blue-600", iconBg: "bg-blue-50",
    },
    {
      icon: Eye, label: "Profile Views", value: CANDIDATE.profileViews, sub: "+12% this week",
      color: "text-cyan-600", iconBg: "bg-cyan-50",
    },
    {
      icon: FileText, label: "Resume Views", value: CANDIDATE.resumeViews, sub: "By recruiters",
      color: "text-violet-600", iconBg: "bg-violet-50",
    },
    {
      icon: Star, label: "Shortlisted", value: apps.filter((a) => a.status === "shortlisted" || a.status === "interview" || a.status === "offered").length, sub: "Active opportunities",
      color: "text-amber-600", iconBg: "bg-amber-50",
    },
  ];

  const offered = apps.find((a) => a.status === "offered");
  const interviews = apps.filter((a) => a.status === "interview");

  return (
    <div className="space-y-5">
      {/* Offer alert */}
      {offered && (
        <motion.div
          {...fadeUp}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 flex items-start gap-4 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-black text-white/70 uppercase tracking-widest mb-1">🎉 You have an offer!</p>
            <p className="text-[15px] font-black text-white">{offered.jobTitle} at {offered.company}</p>
            {offered.nextStep && (
              <p className="text-[12.5px] text-white/80 mt-1">{offered.nextStep}</p>
            )}
          </div>
          <button className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-[12.5px] font-bold px-4 py-2 rounded-xl transition-colors flex-shrink-0">
            View <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* Interview reminder */}
      {interviews.length > 0 && (
        <motion.div
          {...stagger(0)}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4"
        >
          <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4.5 h-4.5 text-amber-600" style={{ width: 18, height: 18 }} />
          </div>
          <div className="flex-1">
            <p className="text-[13.5px] font-black text-amber-800">Upcoming Interview</p>
            <p className="text-[12px] text-amber-600">{interviews[0].nextStep}</p>
          </div>
          <button className="text-[12px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-colors flex-shrink-0">
            Prepare
          </button>
        </motion.div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
      </div>

      {/* Pipeline + Profile */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-1"><PipelineTracker apps={apps} /></div>
        <div className="xl:col-span-2"><RecentActivity apps={apps} /></div>
      </div>

      {/* Profile completion */}
      <ProfileCompletion />

      {/* Job recommendations */}
      <motion.div {...stagger(4)} className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-widest">Recommended for You</h3>
          </div>
          <button className="text-[12px] font-bold text-blue-600 hover:underline">View all</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "Staff Engineer", company: "GitHub", logo: "GH", logoColor: "bg-gray-900", salary: "$160k – $200k", match: 96 },
            { title: "Frontend Architect", company: "Shopify", logo: "Sh", logoColor: "bg-emerald-600", salary: "$140k – $180k", match: 91 },
          ].map((job) => (
            <div key={job.title} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all cursor-pointer group">
              <div className={`w-10 h-10 ${job.logoColor} rounded-xl flex items-center justify-center text-white text-[11px] font-black flex-shrink-0`}>
                {job.logo}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-black text-gray-800 truncate group-hover:text-blue-700 transition-colors">{job.title}</p>
                <p className="text-[12px] text-gray-400">{job.company} · {job.salary}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg">
                  {job.match}% match
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Applications Page ────────────────────────────────────────────────────────
function ApplicationsPage({ apps }: { apps: Application[] }) {
  const [filter, setFilter] = useState<AppStatus | "all">("all");
  const filtered = filter === "all" ? apps : apps.filter((a) => a.status === filter);
  const statusFilters: (AppStatus | "all")[] = ["all", "applied", "viewed", "shortlisted", "interview", "offered", "rejected"];

  return (
    <div className="space-y-5">
      <motion.div {...fadeUp} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-gray-900">My Applications</h2>
          <p className="text-sm text-gray-400 mt-0.5">{apps.length} total · {apps.filter(a => a.status !== "rejected").length} active</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Track New Application
        </button>
      </motion.div>

      {/* Filter tabs */}
      <motion.div {...stagger(1)} className="flex gap-1.5 flex-wrap">
        {statusFilters.map((f) => {
          const count = f === "all" ? apps.length : apps.filter((a) => a.status === f).length;
          const cfg = f !== "all" ? STATUS_CONFIG[f] : null;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 text-[12px] font-black px-3.5 py-2 rounded-xl border transition-all capitalize ${
                filter === f
                  ? "bg-gray-900 border-gray-900 text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {cfg && <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />}
              {f === "all" ? "All" : cfg?.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black ${filter === f ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>{count}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Application cards */}
      <AnimatePresence mode="popLayout">
        {filtered.map((app, i) => {
          const cfg = STATUS_CONFIG[app.status];
          const StatusIcon = cfg.icon;
          return (
            <motion.div
              key={app.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28, delay: i * 0.04 }}
              className={`bg-white rounded-2xl border hover:shadow-md transition-all group cursor-pointer overflow-hidden ${
                app.status === "offered" ? "border-emerald-200 ring-1 ring-emerald-100" :
                app.status === "interview" ? "border-amber-200" :
                "border-gray-100 hover:border-gray-200"
              }`}
            >
              {/* Status bar */}
              <div className={`h-1 bg-gradient-to-r ${
                app.status === "offered" ? "from-emerald-400 to-teal-400" :
                app.status === "interview" ? "from-amber-400 to-orange-400" :
                app.status === "shortlisted" ? "from-violet-400 to-purple-500" :
                app.status === "rejected" ? "from-red-300 to-red-400" :
                "from-blue-400 to-cyan-400"
              }`} />

              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div className={`w-12 h-12 ${app.logoColor} rounded-xl flex items-center justify-center text-white font-black text-[12px] flex-shrink-0 shadow-sm`}>
                    {app.logo}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[15px] font-black text-gray-900 group-hover:text-blue-600 transition-colors">{app.jobTitle}</h3>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="flex items-center gap-1 text-[12.5px] text-gray-400"><Building2 className="w-3 h-3" />{app.company}</span>
                          <span className="flex items-center gap-1 text-[12.5px] text-gray-400"><MapPin className="w-3 h-3" />{app.location}</span>
                          <span className="flex items-center gap-1 text-[12.5px] text-gray-400"><DollarSign className="w-3 h-3" />{app.salary}</span>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1.5 text-[12px] font-black px-3 py-1.5 rounded-xl border flex-shrink-0 ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {cfg.label}
                      </span>
                    </div>

                    {/* Next step */}
                    {app.nextStep && (
                      <div className={`flex items-start gap-2 mt-3 px-3 py-2 rounded-xl ${cfg.bg} border ${cfg.border}`}>
                        <Zap className={`w-3.5 h-3.5 ${cfg.color} flex-shrink-0 mt-0.5`} />
                        <p className={`text-[12.5px] font-semibold ${cfg.color}`}>{app.nextStep}</p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[11.5px] text-gray-400">
                          <Clock className="w-3 h-3" /> Applied {app.appliedDate}
                        </span>
                        <span className="flex items-center gap-1 text-[11.5px] text-gray-400">
                          Updated {app.statusUpdated}
                        </span>
                        {app.recruiterViewed && (
                          <span className="flex items-center gap-1 text-[11.5px] text-cyan-600 font-semibold">
                            <Eye className="w-3 h-3" /> Recruiter viewed
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// ─── Saved Jobs Page ──────────────────────────────────────────────────────────
function SavedJobsPage() {
  const [jobs, setJobs] = useState<SavedJob[]>(SAVED_JOBS);

  const removeJob = (id: number) => setJobs((prev) => prev.filter((j) => j.id !== id));

  return (
    <div className="space-y-5">
      <motion.div {...fadeUp} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">Saved Jobs</h2>
          <p className="text-sm text-gray-400 mt-0.5">{jobs.length} jobs saved · Apply before they expire</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 40, scale: 0.97 }}
            transition={{ duration: 0.28, delay: i * 0.04 }}
            className={`bg-white rounded-2xl border hover:shadow-md transition-all group cursor-pointer ${
              job.isUrgent ? "border-red-100 ring-1 ring-red-50" : "border-gray-100 hover:border-gray-200"
            }`}
          >
            <div className="p-5 flex items-start gap-4">
              <div className={`w-12 h-12 ${job.logoColor} rounded-xl flex items-center justify-center text-white font-black text-[12px] flex-shrink-0 shadow-sm`}>
                {job.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-black text-gray-900 group-hover:text-blue-600 transition-colors">{job.jobTitle}</h3>
                      {job.isUrgent && (
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-50 text-red-500 border border-red-100">
                          <Zap className="w-2.5 h-2.5" /> Urgent
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-[12.5px] text-gray-400"><Building2 className="w-3 h-3" />{job.company}</span>
                      <span className="flex items-center gap-1 text-[12.5px] text-gray-400"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1 text-[12.5px] text-gray-400"><DollarSign className="w-3 h-3" />{job.salary}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeJob(job.id); }}
                    className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {job.deadline && (
                  <div className="flex items-center gap-1.5 mt-2 text-[12px] font-semibold text-red-500">
                    <Clock className="w-3 h-3" /> Deadline: {job.deadline}
                  </div>
                )}

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-[11.5px] font-bold px-2.5 py-1 rounded-lg ${job.type === "Full-time" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{job.type}</span>
                    <span className="text-[11.5px] text-gray-400">{job.postedDate}</span>
                  </div>
                  <button className="flex items-center gap-1.5 text-[12.5px] font-black text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm shadow-blue-200">
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {jobs.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <Bookmark className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="font-bold text-gray-400">No saved jobs</p>
          <p className="text-sm text-gray-300 mt-1">Start browsing and save jobs you're interested in.</p>
        </motion.div>
      )}
    </div>
  );
}

// ─── Notifications Page ────────────────────────────────────────────────────────
function AlertsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(NOTIFICATIONS);
  const unread = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="space-y-5">
      <motion.div {...fadeUp} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-400 mt-0.5">{unread} unread notifications</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-[12.5px] font-bold text-blue-600 hover:underline flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </motion.div>

      <div className="space-y-2">
        {notifs.map((notif, i) => {
          const cfg = NOTIF_CONFIG[notif.type];
          const NIcon = cfg.icon;
          return (
            <motion.div
              key={notif.id}
              {...stagger(i)}
              onClick={() => markRead(notif.id)}
              className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                !notif.read
                  ? "bg-white border-blue-100 shadow-sm hover:border-blue-200"
                  : "bg-white border-gray-100 opacity-70 hover:opacity-100"
              }`}
            >
              {/* Icon or avatar */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                notif.avatar ? `${notif.avatarColor} shadow-sm` : cfg.bg
              }`}>
                {notif.avatar
                  ? <span className="text-white font-black text-[11px]">{notif.avatar}</span>
                  : <NIcon className={`w-4.5 h-4.5 ${cfg.color}`} style={{ width: 18, height: 18 }} />
                }
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-[13.5px] font-black ${notif.read ? "text-gray-600" : "text-gray-900"}`}>{notif.title}</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[11px] text-gray-400 whitespace-nowrap">{notif.time}</span>
                    {!notif.read && <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                  </div>
                </div>
                <p className="text-[12.5px] text-gray-400 mt-0.5 leading-relaxed">{notif.body}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Profile Page ──────────────────────────────────────────────────────────────
function ProfilePage() {
  const skills = ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker", "Next.js", "PostgreSQL", "Figma", "Python"];

  return (
    <div className="space-y-5">
      <motion.div {...fadeUp} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">My Profile</h2>
          <p className="text-sm text-gray-400 mt-0.5">How employers see you</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm font-bold text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
          <Edit3 className="w-3.5 h-3.5" /> Edit Profile
        </button>
      </motion.div>

      {/* Profile Card */}
      <motion.div {...stagger(1)} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        </div>
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-4">
            <div className={`w-20 h-20 bg-gradient-to-br ${CANDIDATE.avatarGradient} rounded-2xl border-4 border-white flex items-center justify-center text-white text-xl font-black shadow-md`}>
              {CANDIDATE.avatar}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1 text-[11.5px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Open to work
              </span>
            </div>
          </div>
          <h2 className="text-xl font-black text-gray-900">{CANDIDATE.name}</h2>
          <p className="text-[14px] font-semibold text-blue-600 mt-0.5">{CANDIDATE.title}</p>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-[12.5px] text-gray-400"><Mail className="w-3.5 h-3.5" />{CANDIDATE.email}</span>
            <span className="flex items-center gap-1.5 text-[12.5px] text-gray-400"><MapPin className="w-3.5 h-3.5" />{CANDIDATE.location}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <a href="#" className="flex items-center gap-2 text-[12.5px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-colors">
              <FaLinkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 text-[12.5px] font-bold text-gray-700 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors">
              <FaGithub className="w-3.5 h-3.5" /> GitHub
            </a>
            <a href="#" className="flex items-center gap-2 text-[12.5px] font-bold text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-xl hover:bg-teal-100 transition-colors">
              <Globe className="w-3.5 h-3.5" /> Portfolio
            </a>
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div {...stagger(2)} className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-widest">Skills</h3>
          <button className="text-[12px] font-bold text-blue-600 hover:underline flex items-center gap-1">
            <Edit3 className="w-3 h-3" /> Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="text-[12.5px] font-bold px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div {...stagger(3)} className="grid grid-cols-3 gap-4">
        {[
          { icon: Eye, value: CANDIDATE.profileViews, label: "Profile Views", color: "text-cyan-600 bg-cyan-50" },
          { icon: FileText, value: CANDIDATE.resumeViews, label: "Resume Views", color: "text-violet-600 bg-violet-50" },
          { icon: Send, value: APPLICATIONS.length, label: "Applications", color: "text-blue-600 bg-blue-50" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`${s.color} rounded-2xl p-4 text-center border border-current border-opacity-10`}>
              <Icon className={`w-5 h-5 ${s.color.split(" ")[0]} mx-auto mb-2`} />
              <p className={`text-xl font-black ${s.color.split(" ")[0]}`}>{s.value}</p>
              <p className="text-[11.5px] text-gray-500 font-semibold mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── Settings Page ──────────────────────────────────────────────────────────
function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [jobMatch, setJobMatch] = useState(true);
  const [recruiterMsg, setRecruiterMsg] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0 ${value ? "bg-blue-600" : "bg-gray-200"}`}
      style={{ height: 22 }}
    >
      <motion.div
        animate={{ x: value ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute top-[3px] w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  );

  return (
    <div className="space-y-5">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-black text-gray-900">Settings</h2>
        <p className="text-sm text-gray-400 mt-0.5">Manage your account and preferences</p>
      </motion.div>

      {[
        {
          title: "Notifications", items: [
            { label: "Email job alerts", desc: "Receive matching jobs via email", value: emailAlerts, fn: () => setEmailAlerts(!emailAlerts) },
            { label: "Job match notifications", desc: "Get notified when new jobs match your profile", value: jobMatch, fn: () => setJobMatch(!jobMatch) },
            { label: "Recruiter messages", desc: "Allow recruiters to message you", value: recruiterMsg, fn: () => setRecruiterMsg(!recruiterMsg) },
          ]
        },
        {
          title: "Privacy", items: [
            { label: "Public profile", desc: "Anyone can discover your profile", value: publicProfile, fn: () => setPublicProfile(!publicProfile) },
          ]
        },
      ].map((section, si) => (
        <motion.div key={section.title} {...stagger(si + 1)} className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">{section.title}</h3>
          <div className="space-y-1">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-[13.5px] font-bold text-gray-800">{item.label}</p>
                  <p className="text-[12px] text-gray-400 mt-0.5">{item.desc}</p>
                </div>
                <Toggle value={item.value} onChange={item.fn} />
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <motion.div {...stagger(3)} className="bg-red-50 border border-red-100 rounded-2xl p-5">
        <h3 className="text-[11px] font-black text-red-400 uppercase tracking-widest mb-3">Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13.5px] font-bold text-gray-800">Delete Account</p>
            <p className="text-[12px] text-gray-400 mt-0.5">Permanently delete your account and all data</p>
          </div>
          <button className="text-[12.5px] font-bold text-red-500 border border-red-200 bg-white hover:bg-red-50 px-4 py-2 rounded-xl transition-colors">
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function CandidateDashboard() {
  const [activeNav, setActiveNav] = useState<NavItem>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadNotifs = NOTIFICATIONS.filter((n) => !n.read).length;

  const renderPage = () => {
    switch (activeNav) {
      case "overview":     return <OverviewPage apps={APPLICATIONS} />;
      case "applications": return <ApplicationsPage apps={APPLICATIONS} />;
      case "saved":        return <SavedJobsPage />;
      case "alerts":       return <AlertsPage />;
      case "profile":      return <ProfilePage />;
      case "settings":     return <SettingsPage />;
      default:             return <OverviewPage apps={APPLICATIONS} />;
    }
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? "p-5" : "p-6"}`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <Briefcase className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
        </div>
        <span className="text-lg font-black text-gray-900">
          Work<span className="text-blue-600">By</span>Home
        </span>
      </div>

      {/* Avatar mini card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${CANDIDATE.avatarGradient} rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0 shadow-sm`}>
            {CANDIDATE.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-black text-gray-900 truncate">{CANDIDATE.name}</p>
            <p className="text-[11px] text-gray-400 truncate">{CANDIDATE.title}</p>
          </div>
        </div>
        {/* Profile strength */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10.5px] font-bold text-gray-500">Profile strength</span>
            <span className="text-[10.5px] font-black text-blue-600">{CANDIDATE.profileScore}%</span>
          </div>
          <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${CANDIDATE.profileScore}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 mb-2">Menu</p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all relative group ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} style={{ width: 18, height: 18 }} />
              <span className="text-[13.5px] font-bold">{item.label}</span>
              {item.id === "alerts" && unreadNotifs > 0 && (
                <span className={`ml-auto text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isActive ? "bg-white/30 text-white" : "bg-red-500 text-white"
                }`}>
                  {unreadNotifs}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sign out */}
      <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all mt-4 w-full">
        <LogOut className="w-4 h-4 flex-shrink-0" />
        <span className="text-[13.5px] font-bold">Sign Out</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f8fc] flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-white border-r border-gray-100 min-h-screen sticky top-0 h-screen overflow-y-auto">
        <Sidebar />
      </aside>

      {/* ── Mobile Sidebar Drawer ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 lg:hidden overflow-y-auto shadow-2xl"
            >
              <Sidebar mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-[15px] font-black text-gray-900 capitalize">
                {activeNav === "overview" ? `Good morning, ${CANDIDATE.name.split(" ")[0]} 👋` :
                 activeNav === "applications" ? "My Applications" :
                 activeNav === "saved" ? "Saved Jobs" :
                 activeNav === "alerts" ? "Notifications" :
                 activeNav === "profile" ? "My Profile" : "Settings"}
              </h1>
              <p className="text-[11.5px] text-gray-400 hidden sm:block">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveNav("alerts")}
              className="relative p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-4.5 h-4.5 text-gray-600" style={{ width: 18, height: 18 }} />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveNav("profile")}
              className={`w-9 h-9 bg-gradient-to-br ${CANDIDATE.avatarGradient} rounded-xl flex items-center justify-center text-white text-sm font-black shadow-sm`}
            >
              {CANDIDATE.avatar}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-7 max-w-5xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNav}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}