"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, Variants, m, } from "framer-motion";
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Globe,
  ChevronDown,
  X,
  Filter,
  Laptop,
  Home,
  Zap,
  Shield,
  TrendingUp,
  Heart,
  Bookmark,
  Bell,
  Menu,
  Building2,
  LayoutGrid,
  FileText,
  LayoutDashboard,
  UserSearch,
  PlusSquare,
  PlusCircle,
  Newspaper,
  Phone,
  Download,
  ChevronRight,
  LucideIcon,
  Contact,
} from "lucide-react";
import Link from "next/link";
import { GrResources } from "react-icons/gr";
import { FaApplePay, FaRobot } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { usePathname } from "next/navigation";

// A sub-link can render EITHER a lucide icon component OR an image URL.
type SubLink = {
  label: string;
  href: string;
  desc: string;
  color: string;
  icon?: LucideIcon;
  image?: string;
};

const candidateLinks: SubLink[] = [
  // ── Public job browsing — commented out per new direction, this is not a job marketplace ──
  /* {
    label: "Browse Jobs",
    icon: Search,
    href: "/for-candidate/browse-jobs",
    desc: "Explore thousands of remote opportunities",
    color: "bg-blue-50 text-blue-600",
  }, */
  /* {
    label: "Browse Companies",
    icon: Building2,
    href: "/for-candidate/browse-companies",
    desc: "Discover top companies hiring now",
    color: "bg-violet-50 text-violet-600",
  }, */
  /*   {
      label: "Browse Categories",
      icon: LayoutGrid,
      href: "/for-candidate/browse-catagories",
      desc: "Find jobs by industry or skill",
      color: "bg-emerald-50 text-emerald-600",
    }, */
  {
    label: "Submit Resume",
    icon: FileText,
    href: "/for-candidate/submit-resume",
    desc: "Let employers come to you",
    color: "bg-amber-50 text-amber-600",
  },
  /*   {
      label: "Candidate Dashboard",
      icon: LayoutDashboard,
      href: "/for-candidate/candidate-dashboard",
      desc: "Manage applications & profile",
      color: "bg-rose-50 text-rose-600",
    }, */
];

const employeeLinks: SubLink[] = [
  {
    label: "Browse Candidates",
    icon: UserSearch,
    href: "/for-employee/browse-candidate",
    desc: "Find qualified talent fast",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Submit Job",
    icon: PlusSquare,
    href: "/for-employee/submit-jobs",
    desc: "Post your job in minutes",
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Add Company",
    icon: Building2,
    href: "/for-employee/add-company",
    desc: "Build your employer brand",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Employer Dashboard",
    icon: LayoutDashboard,
    href: "/for-employee/employee-dashboard",
    desc: "Track postings & candidates",
    color: "bg-amber-50 text-amber-600",
  },
];

const aiagentsLinks: SubLink[] = [
  {
    image: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335520/img-1_nz99v7.png",
    label: "Ai Lead Qualification Agent",
    desc: "Organize and segment your customer Qualification",
    href: "/ai-agents/lead-qualifiction-agent",
    color: "bg-blue-50 text-blue-600",
  },
  {
    image: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335520/img-2_l1xdll.png",
    label: "Ai Property Matching Agent",
    desc: "AI-powered lead qualification",
    href: "/ai-agents/property-maching-agent",
    color: "bg-violet-50 text-violet-600",
  },
  {
    image: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335520/img-3_scja92.png",
    label: "Lead Capture Agent",
    desc: "Ai Lead Capture tracking and forecasting",
    href: "/ai-agents/lead-capture-agent",
    color: "bg-rose-50 text-rose-600",
  },
  {
    image: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335521/img-4_damgxf.png",
    label: "Ai Content Creation Agent",
    desc: "Content Creation  tracking and forecasting",
    href: "/ai-agents/content-creation-agent",
    color: "bg-violet-50 text-violet-600",
  },
  {
    image: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335553/img-555_kabvyd.png",
    label: "Ai  Follow-Up Agent",
    desc: "AI-powered lead qualification",
    href: "/ai-agents/follow-up-agent",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    image: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335521/img-6_mky5rb.png",
    label: "Ai Calling Agent",
    desc: "Automate Calling tasks",
    href: "/ai-agents/calling-agent",
    color: "bg-blue-50 text-blue-600",
  },
  {
    image: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335523/img-7_xjwzbl.png",
    label: "Ai Campaign Automation Agent",
    desc: "AI meeting scheduler",
    href: "/ai-agents/campaign-automation",
    color: "bg-rose-50 text-rose-600",
  },
  {
    image: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335552/img-8_twulvb.png",
    label: "Data Mining Agent",
    desc: "Data Mining  automation",
    href: "/ai-agents/data-mining-agent",
    color: "bg-rose-50 text-rose-600",
  },
  {
    image: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335553/img-9_i1wlut.png",
    label: "Social Media Agent",
    desc: "Social Media automation",
    href: "/ai-agents/social-media-agent",
    color: "bg-violet-50 text-violet-600",
  },
  {
    image: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335553/img-10_ajsusz.png",
    label: "Ai SEO Content Agent",
    desc: "SEO Content scheduler",
    href: "/ai-agents/seo-content-agent",
    color: "bg-emerald-50 text-emerald-600",
  },
]
// Now uses `image` instead of a pre-rendered <img> in `icon`.
const resourcesLinks: SubLink[] = [
  {
    image:
      "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335521/how-it-works-icon_ymaoex.png",
    label: "How-It-Works",
    desc: "Guides and API references",
    href: "/resources/howitworks",
    color: "bg-blue-50 text-blue-600",
  },
  {
    image:
      "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335509/about-us-icon_rkp7wa.png",
    label: "About Us",
    desc: "Step-by-step walkthroughs",
    href: "/resources/about-us",
    color: "bg-violet-50 text-violet-600",
  },
  {
    image:
      "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335509/customer-engage-icon_vafyry.png",
    label: "Help Center",
    desc: "FAQs and troubleshooting",
    href: "/resources/help-center",
    color: "bg-rose-50 text-rose-600",
  },
  {
    image:
      "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335521/how-it-works-icon_ymaoex.png",
    label: "contact Us",
    desc: "Contact Us Now",
    href: "/contact-us",
    color: "bg-rose-50 text-rose-600",
  },
  // ── PLANNED — uncomment and build pages when ready ──
  /* {
    label: "Blog / News",
    icon: Newspaper,
    href: "/resources/blog",
    desc: "Product updates & industry news",
    color: "bg-blue-50 text-blue-600",
  }, */
  /* {
    label: "Case Studies",
    icon: Star,
    href: "/resources/case-studies",
    desc: "How teams use our AI agents to convert more leads",
    color: "bg-violet-50 text-violet-600",
  }, */
  /* {
    label: "FAQs",
    icon: CheckCircle2,
    href: "/resources/faqs",
    desc: "Common questions, answered",
    color: "bg-emerald-50 text-emerald-600",
  }, */
  /* {
    label: "API Docs",
    icon: FileText,
    href: "/resources/api-docs",
    desc: "Integrate our AI agents into your stack",
    color: "bg-amber-50 text-amber-600",
  }, */
];

// ── PLANNED — Solutions by industry. Uncomment + wire into navLinks below when pages exist ──

const solutionsLinks: SubLink[] = [
  {
    label: "Real Estate",
    icon: Building2,
    href: "/solutions/real-estate",
    desc: "Property matching & buyer follow-up on autopilot",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Sales & Marketing Teams",
    icon: TrendingUp,
    href: "/solutions/sales-marketing",
    desc: "Automate lead qualification & outreach",
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Call Centers / BPOs",
    icon: Phone,
    href: "/solutions/call-centers",
    desc: "Scale calling operations with AI",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Insurance",
    icon: Shield,
    href: "/solutions/insurance",
    desc: "Automate claims follow-up & lead capture",
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "E-commerce",
    icon: Globe,
    href: "/solutions/ecommerce",
    desc: "Recover carts & qualify leads automatically",
    color: "bg-rose-50 text-rose-600",
  },
  {
    label: "Healthcare / Clinics",
    icon: Heart,
    href: "/solutions/healthcare",
    desc: "Automate appointment reminders & intake calls",
    color: "bg-blue-50 text-blue-600",
  },
];


// ── PLANNED — Platform (CRM, automation, integrations, analytics). Uncomment + wire in when ready ──

const platformLinks: SubLink[] = [
  {
    label: "CRM & Data Management",
    icon: LayoutDashboard,
    href: "/platform/crm",
    desc: "Manage every contact your calling team touches",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Call Automation / Workflows",
    icon: Zap,
    href: "/platform/call-automation",
    desc: "Script, route, and log calls automatically",
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Integrations",
    icon: Globe,
    href: "/platform/integrations",
    desc: "Connect telephony, CRM, Slack & WhatsApp",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Analytics & Reporting",
    icon: TrendingUp,
    href: "/platform/analytics",
    desc: "Track call outcomes & conversion",
    color: "bg-amber-50 text-amber-600",
  },
];


// ── PLANNED — Company. Uncomment + wire in when ready ──

const companyLinks: SubLink[] = [
  {
    label: "About Us",
    icon: Users,
    href: "/resources/about-us",
    desc: "Who we are",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Press / Media",
    icon: Newspaper,
    href: "/company/press",
    desc: "News & media coverage",
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Contact",
    icon: Phone,
    href: "/contact-us",
    desc: "Get in touch",
    color: "bg-emerald-50 text-emerald-600",
  },
];


const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    transformOrigin: "top center",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.04,
      delayChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: { duration: 0.16, ease: "easeIn" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

// Renders whichever icon type is present on the link: a lucide component
// OR an image URL. Sized independently so images (brand art, usually denser
// than a lucide glyph) don't inherit the same small footprint as an icon.
function LinkIcon({
  link,
  iconClassName,
  imgClassName,
}: {
  link: SubLink;
  iconClassName?: string;
  imgClassName?: string;
}) {
  if (link.image) {
    return (
      <img
        src={link.image}
        alt={link.label}
        className={`${imgClassName ?? "w-10 h-10"} object-contain`}
      />
    );
  }
  if (link.icon) {
    const Icon = link.icon;
    return <Icon className={iconClassName} />;
  }
  return null;
}

function DropdownMenu({ links, label, isOpen }: {
  links: SubLink[];
  label: string;
  isOpen: boolean;
}) {
  const isCandidate = label === "For Candidate";

  // Long lists (Ai Agents today, Resources if it grows) split into two
  // columns instead of stretching into one tall single-file list.
  const useTwoColumns = links.length > 5;
  const mid = Math.ceil(links.length / 2);
  const columns = useTwoColumns ? [links.slice(0, mid), links.slice(mid)] : [links];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-50 ${useTwoColumns ? "w-[560px]" : "w-[340px]"
            }`}
        >
          {/* Arrow pointer */}
          <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 shadow-[-2px_-2px_4px_rgba(0,0,0,0.04)]" />

          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] overflow-hidden">
            {/* Header strip */}
            <div
              className={`px-4 py-3 border-b border-gray-50 ${isCandidate
                ? "bg-gradient-to-r from-blue-600 to-blue-500"
                : "bg-gradient-to-r from-violet-600 to-violet-500"
                }`}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-white/80">
                {label}
              </p>
              <p className="text-[13px] font-medium text-white mt-0.5">
                {isCandidate
                  ? "Everything you need to land your dream job"
                  : "Tools to build your perfect team"}
              </p>
            </div>

            {/* Links */}
            <div className={`p-2 ${useTwoColumns ? "grid grid-cols-2 gap-x-1" : ""}`}>
              {columns.map((col, colIdx) => (
                <div
                  key={colIdx}
                  className={useTwoColumns && colIdx === 0 ? "border-r border-gray-50 pr-1" : ""}
                >
                  {col.map((link) => (
                    <motion.div key={link.label} variants={itemVariants}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div
                          className={`rounded-xl flex items-center justify-center flex-shrink-0 ${link.color} ${link.image ? "w-11 h-11" : "w-9 h-9"
                            }`}
                        >
                          <LinkIcon
                            link={link}
                            iconClassName="w-4 h-4"
                            imgClassName="w-12 h-12"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13.5px] font-semibold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                            {link.label}
                          </p>
                          <p className="text-[12px] text-gray-400 leading-tight mt-0.5 truncate">
                            {link.desc}
                          </p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <Link
                href={`${isCandidate ? "https://wbh.ibigdata.in/register" : "/add-job"}`}
                className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl text-[13px] font-semibold transition-all ${isCandidate
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-violet-600 hover:bg-violet-700 text-white"
                  }`}
              >
                {isCandidate ? "Create Free Account" : "Start Hiring Today"}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const pathname = usePathname();

  const hideRoutes = ["/resources/help-center"];
  const hideLayout = hideRoutes.includes(pathname);


  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const navLinks = [
    { label: "Home", href: "/", icon: Home },

    {
      label: "Ai Agents",
      href: "#",
      icon: FaRobot,
      submenu: aiagentsLinks,
    },
        // ── PLANNED — uncomment once solutionsLinks / platformLinks / companyLinks
    // arrays above are uncommented and their pages exist ──
    {
      label: "Solutions",
      href: "#",
      icon: Building2,
      submenu: solutionsLinks,
    },
        {
      label: "Platform",
      href: "#",
      icon: LayoutDashboard,
      submenu: platformLinks,
    },
/*     {
      label: "For Candidate",
      href: "#",
      icon: Briefcase,
      submenu: candidateLinks,
    }, */

    /*   {
        label: "For Employee",
        href: "#",
        icon: Users,
        submenu: employeeLinks,
      }, */
    {
      label: "Resources",
      href: "#",
      icon: GrResources,
      submenu: resourcesLinks,
    },
    {
      label: "Apply Now",
      href: "/apply-now",
      icon: MdAddTask,
    },


    /* {
      label: "Pricing",
      href: "/pricing",
      icon: DollarSign,
    }, */
    /* {
      label: "Company",
      href: "#",
      icon: Users,
      submenu: companyLinks,
    }, */
    /*   { label: "News", href: "/news", icon: Newspaper }, */
    /*   { label: "Contact", href: "/contact", icon: Phone }, */
    /*  { label: "Download", href: "#download", icon: Download }, */
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
        : hideLayout
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:shadow-blue-600/30 transition-shadow">
              <img src="/workbyhome.png" className="text-white" alt="Logo" />
            </div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Work<span className="text-blue-600">By</span>Home
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const hasSubmenu = !!link.submenu;
              const isOpen = activeDropdown === link.label;
              const Icon = link.icon;

              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => hasSubmenu && handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${isOpen
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 transition-colors ${isOpen ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                    />
                    {link.label}
                    {hasSubmenu && (
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="inline-flex"
                      >
                        <ChevronDown
                          className={`w-3 h-3 transition-colors ${isOpen ? "text-blue-500" : "text-gray-400"
                            }`}
                        />
                      </motion.span>
                    )}
                  </Link>

                  {hasSubmenu && (
                    <DropdownMenu
                      links={link.submenu}
                      label={link.label}
                      isOpen={isOpen}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">

            {/* <Link href={"/apply-now"} className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all hover:-translate-y-0.5">
              Apply Now
            </Link> */}
            <Link href={"/for-candidate/submit-resume"} className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all hover:-translate-y-0.5">
              Submit Resume
            </Link>
            <Link href={"https://wbh.ibigdata.in/register"} className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all hover:-translate-y-0.5">
              Sign In
            </Link>
            {/*  <Link href={"https://wbh.ibigdata.in/register"} className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Sign In
            </Link> */}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const hasSubmenu = !!link.submenu;
                const isExpanded = mobileExpanded === link.label;

                return (
                  <div key={link.label}>
                    <button
                      onClick={() => {
                        if (hasSubmenu) {
                          setMobileExpanded(isExpanded ? null : link.label);
                        } else {
                          setMobileOpen(false);
                        }
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors text-left"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-gray-400" />
                        {link.label}
                      </span>
                      {hasSubmenu && (
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="inline-flex"
                        >
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </motion.span>
                      )}
                    </button>

                    <AnimatePresence>
                      {hasSubmenu && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden ml-4 mt-1 border-l-2 border-blue-100 pl-3 space-y-0.5"
                        >
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <div
                                className={`rounded-lg flex items-center justify-center flex-shrink-0 ${sub.color} ${sub.image ? "w-10 h-10" : "w-7 h-7"
                                  }`}
                              >
                                <LinkIcon
                                  link={sub}
                                  iconClassName="w-3.5 h-3.5"
                                  imgClassName="w-7 h-7"
                                />
                              </div>
                              <span className="font-medium">{sub.label}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="pt-3 flex flex-col gap-2 border-t border-gray-100 mt-2">
                <Link href={"https://wbh.ibigdata.in/register"} className="w-full text-sm font-medium text-gray-700 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  Sign In
                </Link>
                <button className="w-full text-sm font-semibold text-white bg-blue-600 px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/20">
                  Post a Job
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}