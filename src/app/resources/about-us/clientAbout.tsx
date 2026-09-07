"use client";

import React, { useRef } from 'react';
import Head from 'next/head';
import { 
  Globe, 
  Shield, 
  Zap, 
  Activity, 
  Layers, 
  Radio, 
  Lock, 
  Workflow, 
  BrainCircuit,
  ArrowRight,
  Crosshair,
  TrendingUp,
  Terminal,
  PlayCircle,
  Building2,
  Users,
  CheckCircle2,
  BarChart3,
  Database,
  Target,
  LineChart,
  Bot,
  UserPlus,
  Rocket,
  PhoneCall,
  MessageSquare,
  Search,
  ChevronRight
} from 'lucide-react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Link from 'next/link';

// ============================================================================
// TypeScript Interfaces
// ============================================================================

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  metric: string;
  icon: React.ElementType;
}

interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface GlobalNode {
  city: string;
  country: string;
  type: string;
  x: number;
  y: number;
}

interface TechPillar {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  delay: number;
}

interface AIAgent {
  image: string;
  label: string;
  desc: string;
  href: string;
  color: string;
}

interface MetricStats {
  value: string;
  label: string;
  trend: string;
}

// ============================================================================
// Animation Variants
// ============================================================================

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const revealText: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: { 
    opacity: 1, 
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const pulseGlow: Variants = {
  hidden: { opacity: 0.2, scale: 0.8 },
  visible: { 
    opacity: [0.2, 0.5, 0.2], 
    scale: [0.8, 1.1, 0.8],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
  }
};

// ============================================================================
// Data Dictionaries (Enterprise Calling Ecosystem)
// ============================================================================

const companyMetrics: MetricStats[] = [
  { value: "500k+", label: "Leads Processed Daily", trend: "+24% MoM" },
  { value: "10", label: "Specialized AI Agents", trend: "Fully Integrated" },
  { value: "98%", label: "CRM Automation Accuracy", trend: "+5% YoY" },
  { value: "3x", label: "Agent Call Volume", trend: "Efficiency Multiplier" }
];

const timelineEvents: TimelineEvent[] = [
  {
    year: "2022",
    title: "The Remote Workforce Initiative",
    description: "WorkByHome was founded to solve a massive bottleneck in the remote calling industry. We assembled a global team of elite callers, but realized that manual data entry and lead scraping were killing their efficiency.",
    metric: "Global Team Assembled",
    icon: Users
  },
  {
    year: "2023",
    title: "The Proprietary CRM Era",
    description: "Instead of relying on off-the-shelf software, we engineered our own proprietary CRM. Built for speed, it allowed our calling teams to manage real estate, student, and B2B leads from a single, unified dashboard.",
    metric: "Centralized Data Flow",
    icon: Database
  },
  {
    year: "2024",
    title: "The AI Agent Swarm",
    description: "We introduced our first wave of AI agents. Rather than replacing our callers, these agents handled the mundane: qualifying leads, matching properties, and organizing datasets before the phone even rang.",
    metric: "50% Manual Work Eliminated",
    icon: Bot
  },
  {
    year: "2025",
    title: "Omnichannel Campaign Automation",
    description: "We expanded our platform to automate follow-ups. Our AI agents began handling dynamic SMS, email, and social media outreach, ensuring our callers only spoke to highly-warmed, ready-to-buy prospects.",
    metric: "3x Connection Rates",
    icon: Target
  },
  {
    year: "2026",
    title: "The Ultimate Calling Ecosystem",
    description: "Today, WorkByHome stands as a powerhouse. A seamless fusion of a human elite calling workforce armed with 10 specialized AI agents, operating in perfect synchronization within our proprietary platform.",
    metric: "Complete Workflow Automation",
    icon: Rocket
  }
];

const coreValues: CoreValue[] = [
  {
    id: "v1",
    title: "Augmentation over Replacement.",
    description: "We believe AI is a tool, not a substitute. Our platform is designed to give human callers super-powers, stripping away administrative bloat so they can focus on empathy, negotiation, and closing.",
    icon: UserPlus,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "v2",
    title: "The Unified Dashboard.",
    description: "Context switching kills productivity. We built our entire ecosystem—from data mining to automated follow-ups—into a single, proprietary CRM interface that acts as the command center for our teams.",
    icon: Layers,
    color: "from-[var(--color-primary-600)] to-violet-500"
  },
  {
    id: "v3",
    title: "Absolute Data Isolation.",
    description: "When handling sensitive real estate or student leads, data security is paramount. Our AI agents operate within secure, isolated environments, ensuring proprietary lead data is never compromised or leaked.",
    icon: Lock,
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "v4",
    title: "Relentless Follow-Through.",
    description: "A lead is only as good as the follow-up. We engineer our platform to be aggressively consistent, utilizing automated campaign agents to nurture prospects relentlessly until they are ready for a human call.",
    icon: Target,
    color: "from-amber-500 to-orange-500"
  }
];

const globalNodes: GlobalNode[] = [
  { city: "Austin", country: "USA", type: "Sales Hub", x: 25, y: 40 },
  { city: "Toronto", country: "Brazil", type: "Support Team", x: 35, y: 70 },
  { city: "London", country: "UK", type: "B2B Outreach", x: 45, y: 28 },
  { city: "Dubai", country: "India", type: "Data Operations", x: 68, y: 48 },
  { city: "Manila", country: "Philippines", type: "Lead Gen", x: 80, y: 55 },
  { city: "Cape Town", country: "South Africa", type: "Real Estate Desk", x: 50, y: 75 },
];

const techPillars: TechPillar[] = [
  {
    title: "The Proprietary CRM",
    subtitle: "Command & Control",
    description: "The beating heart of our operation. A custom-built interface that aggregates leads, call scripts, and campaign data into a lightning-fast dashboard for our calling team.",
    icon: Database,
    gradient: "from-blue-500 to-cyan-400",
    delay: 0.1
  },
  {
    title: "Agentic Automation",
    subtitle: "The AI Workforce",
    description: "A swarm of specialized micro-services that mine data, create SEO content, qualify incoming leads, and prep the battlefield before our human callers pick up the headset.",
    icon: BrainCircuit,
    gradient: "from-[var(--color-primary-600)] to-violet-500",
    delay: 0.2
  },
  {
    title: "Omnichannel Routing",
    subtitle: "Seamless Communication",
    description: "An intelligent routing layer that coordinates automated SMS, emails, and social media touches alongside live human calls, ensuring a unified prospect experience.",
    icon: Workflow,
    gradient: "from-emerald-500 to-teal-400",
    delay: 0.3
  }
];

// Replaced the human team with the exact AI Agents provided by user
const aiAgents: AIAgent[] = [
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
    desc: "Content Creation tracking and forecasting",
    href: "/ai-agents/content-creation-agent",
    color: "bg-violet-50 text-violet-600",
  },
  {
    image: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335553/img-555_kabvyd.png",
    label: "Ai Follow-Up Agent",
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
    desc: "Data Mining automation",
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
  }
];

// ============================================================================
// Main Component
// ============================================================================

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const mapScale = useTransform(scrollYProgress, [0.1, 0.4], [0.9, 1]);
  const mapOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0.3, 1]);

  return (
    <main 
      className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans overflow-x-hidden"
      ref={containerRef}
    >
      <Head>
        <title>About Us | WorkByHome - The AI Powered Calling Ecosystem</title>
        <meta name="description" content="We don't just hire callers. We arm them with a proprietary CRM and an arsenal of AI agents." />
      </Head>

      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-primary-400)] via-[var(--color-primary-600)] to-blue-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* 1. The Light Abstract Hero (Typography & Ambience) */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative min-h-[95vh] flex flex-col justify-center pt-24 pb-20 overflow-hidden bg-white">
        
        {/* Ambient CSS Background Orbs (Light Mode) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            variants={pulseGlow} initial="hidden" animate="visible"
            className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[var(--color-primary-100)] rounded-full blur-[120px] mix-blend-multiply" 
          />
          <motion.div 
            variants={pulseGlow} initial="hidden" animate="visible"
            className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-100 rounded-full blur-[120px] mix-blend-multiply"
            style={{ animationDelay: '2s' }}
          />
          
          {/* Subtle Grid texture */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
        >
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-8">
              <motion.div 
                initial="hidden" animate="visible" variants={staggerContainer}
                className="space-y-6"
              >
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-[var(--border-light)] text-[var(--color-primary-600)] text-sm font-bold mb-6">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-primary-500)] animate-pulse" />
                  <span className="tracking-widest uppercase">The Ultimate Ecosystem</span>
                </motion.div>
                
                <motion.h1 
                  variants={revealText}
                  className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.95] text-[var(--text-primary)]"
                >
                  We didn't just <br /> build a CRM.
                </motion.h1>
                <motion.h2
                  variants={fadeUpSlow}
                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-600)] to-blue-500 leading-tight pb-4"
                >
                  We supercharged the calling workforce.
                </motion.h2>
                
                <motion.p 
                  variants={fadeUp}
                  className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl leading-relaxed font-medium mt-8"
                >
                  WorkByHome is an elite, standalone calling platform. We empower our remote calling teams with a proprietary CRM backed by a swarm of specialized AI agents that handle the heavy lifting, so our humans can focus purely on closing.
                </motion.p>
              </motion.div>
            </div>

            <div className="lg:col-span-4 hidden lg:flex justify-end">
              {/* Abstract Light Mode Graphic (Platform Symbol) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-72 h-96"
              >
                <div className="absolute inset-0 border-2 border-[var(--border-light)] rounded-3xl animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 border border-[var(--color-primary-200)] rounded-3xl animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-8 bg-white/50 rounded-3xl backdrop-blur-xl border border-white shadow-[0_20px_60px_-15px_rgba(0,102,204,0.15)] flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] to-blue-50 opacity-80" />
                  <Database className="w-16 h-16 text-[var(--color-primary-500)] relative z-10 mb-4" />
                  <Bot className="w-12 h-12 text-blue-400 relative z-10" />
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        >
          <span className="text-xs font-mono tracking-widest text-[var(--text-tertiary)] uppercase">Explore the Platform</span>
          <div className="w-px h-16 bg-gradient-to-b from-[var(--border-medium)] to-transparent relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-primary-400)]"
              animate={{ top: ['-50%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 1.5 Scale & Operations Metrics (White Theme) */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 bg-white border-b border-[var(--border-light)] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-[var(--border-light)]">
            {companyMetrics.map((metric, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col items-center text-center ${idx === 0 ? '' : 'pl-8'}`}
              >
                <span className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-2">{metric.value}</span>
                <span className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">{metric.label}</span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  <TrendingUp className="w-3 h-3" /> {metric.trend}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 2. The Manifesto (Dark Accent Section) */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-32 bg-slate-950 relative z-10 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary-600)] rounded-full blur-[180px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Huge Typography */}
            <div>
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              >
                <motion.div variants={fadeUp} className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-sm">
                  <PhoneCall className="w-8 h-8 text-[var(--color-primary-400)]" />
                </motion.div>
                <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold leading-tight mb-8">
                  The manual call center is dead.
                </motion.h3>
                <motion.p variants={fadeUp} className="text-lg text-slate-300 leading-relaxed mb-6 font-light">
                  Asking a human caller to manually scrape databases, format emails, draft follow-up SMS texts, and update spreadsheets is a massive waste of human potential.
                </motion.p>
                <motion.p variants={fadeUp} className="text-lg text-slate-300 leading-relaxed mb-8 font-light">
                  Empathy cannot be automated. But everything else can. We built a platform that separates the administrative chaos from the art of conversation.
                </motion.p>
                
                <motion.div variants={fadeUp} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <BrainCircuit className="w-6 h-6 text-emerald-400" /> The WorkByHome Paradigm
                  </h4>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    Our platform integrates our human calling teams directly with an arsenal of AI agents. The AI mines the data, creates the SEO content, captures the leads, and qualifies the prospects. Our human experts just pick up the headset and close.
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Abstract imagery / Data visualization */}
            <div className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
                alt="Data dashboard infrastructure" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] group-hover:brightness-[0.5] group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              {/* Floating Data UI */}
              <div className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-center mb-5 border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-slate-300 tracking-wider uppercase">CRM Live Sync</span>
                  <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Swarm
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-slate-400 flex items-center gap-2"><Search className="w-4 h-4"/> Data Mining:</span>
                    <span className="font-mono text-white bg-white/10 px-2 py-1 rounded">Extracting...</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-slate-400 flex items-center gap-2"><Target className="w-4 h-4"/> Lead Qualification:</span>
                    <span className="font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">142 Ready</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-slate-400 flex items-center gap-2"><PhoneCall className="w-4 h-4"/> Human Queue:</span>
                    <span className="font-mono text-[var(--color-primary-400)] bg-[var(--color-primary-400)]/10 px-2 py-1 rounded border border-[var(--color-primary-500)]/20">Awaiting Caller</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden">
                    <div className="w-[85%] h-full bg-gradient-to-r from-[var(--color-primary-500)] to-emerald-400" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. The Global Edge Network (Light Themed Map) */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6">
              A Borderless Calling Workforce.
            </h2>
            <p className="text-xl text-[var(--text-secondary)]">
              Our human calling teams operate globally, united by a centralized CRM. Whether we are fielding real estate leads in Austin or running B2B outbound in London, the data flows seamlessly.
            </p>
          </div>

          {/* Light Themed Simulated World Map SVG */}
          <motion.div 
            style={{ scale: mapScale, opacity: mapOpacity }}
            className="relative w-full aspect-[2/1] max-w-5xl mx-auto bg-white rounded-[3rem] border border-[var(--border-light)] shadow-xl overflow-hidden"
          >
            {/* Base Dotted Map SVG (Light) */}
            <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
               <pattern id="light-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                 <circle fill="var(--border-medium)" cx="2" cy="2" r="1.5"></circle>
               </pattern>
               <rect x="0" y="0" width="100%" height="100%" fill="url(#light-dots)"></rect>
               
               {/* Extremely abstract landmass shapes using paths */}
               <path d="M 15% 20% Q 25% 10% 35% 30% T 30% 60% Q 20% 80% 10% 50% Z" fill="var(--color-primary-50)" />
               <path d="M 45% 15% Q 55% 5% 65% 20% T 70% 50% T 50% 40% Z" fill="var(--color-primary-50)" />
               <path d="M 70% 30% Q 80% 20% 95% 40% T 85% 80% Q 75% 60% 75% 45% Z" fill="var(--color-primary-50)" />
            </svg>

            {/* Glowing Connections (Darker strokes for light map) */}
            <svg className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="none">
              {globalNodes.map((node, i) => (
                <motion.path 
                  key={`line-${i}`}
                  d={`M 50% 50% Q ${node.x}% ${20}% ${node.x}% ${node.y}%`}
                  fill="none" 
                  stroke="url(#light-grad)" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: i * 0.1 }}
                />
              ))}
              <defs>
                <linearGradient id="light-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-primary-400)" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Nodes */}
            {globalNodes.map((node, i) => (
              <div 
                key={i} 
                className="absolute z-20 group cursor-pointer"
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-8 h-8 bg-[var(--color-primary-400)] rounded-full opacity-30 animate-ping" style={{ animationDelay: `${i * 0.3}s` }} />
                  <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#34d399] border-2 border-white" />
                </div>
                
                {/* Tooltip (Light Theme) */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-white border border-[var(--border-light)] rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-30">
                  <p className="text-xs font-bold text-[var(--text-primary)] mb-1">{node.city}, {node.country}</p>
                  <p className="text-[10px] text-emerald-600 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block">{node.type}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. The Pillars of Technology (Light Bento Grid) */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-32 bg-white border-y border-[var(--border-light)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-6">
              Our Proprietary Stack.
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Our human teams don't rely on off-the-shelf software. We engineered a distinct operational stack to give them an unfair advantage in the market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techPillars.map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: pillar.delay }}
                className="bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-[2.5rem] p-8 md:p-10 hover:bg-white hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Hover Accent Graphic */}
                <div className={`absolute -bottom-20 -right-20 w-48 h-48 bg-gradient-to-br ${pillar.gradient} rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-8 shadow-lg shadow-[var(--color-primary-200)] group-hover:scale-110 transition-transform duration-500`}>
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <span className="text-xs font-mono tracking-widest text-[var(--text-tertiary)] uppercase mb-2 block">{pillar.subtitle}</span>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{pillar.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Timeline of Innovation (Vertical Scroll - Light Theme) */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-32 bg-[var(--bg-secondary)] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-6">The Evolution of our Ecosystem.</h2>
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-1 bg-[var(--border-medium)] md:-translate-x-1/2 rounded-full overflow-hidden">
              <motion.div 
                className="w-full h-1/3 bg-gradient-to-b from-transparent via-[var(--color-primary-500)] to-transparent"
                animate={{ y: ['-100%', '300%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="space-y-16 lg:space-y-24">
              {timelineEvents.map((event, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  
                  {/* Central Node */}
                  <div className="absolute left-0 md:left-1/2 w-12 h-12 bg-white border-4 border-[var(--color-primary-200)] rounded-full transform md:-translate-x-1/2 flex items-center justify-center z-10 shadow-lg">
                    <event.icon className="w-5 h-5 text-[var(--color-primary-600)]" />
                  </div>

                  {/* Content Box */}
                  <div className="pl-16 md:pl-0 md:w-1/2 w-full">
                    <div className={`bg-white p-8 rounded-3xl border border-[var(--border-light)] shadow-sm hover:shadow-xl transition-shadow duration-300 md:mx-8 relative
                      ${idx % 2 === 0 ? '' : ''}
                    `}>
                      {/* Pointer Arrow */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-l border-[var(--border-light)] transform rotate-45
                        ${idx % 2 === 0 ? '-left-2 -rotate-45 border-b-0 border-r-0' : '-right-2 rotate-[135deg] border-b-0 border-l-0'}
                      `} />

                      <span className="inline-block px-3 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] font-mono font-bold text-sm rounded-lg mb-4">{event.year}</span>
                      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{event.title}</h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{event.description}</p>
                      
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-xs font-bold text-emerald-700`}>
                        <TrendingUp className="w-4 h-4" /> {event.metric}
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. Core Values & Philosophy (Light Bento) */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-32 bg-white border-t border-[var(--border-light)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-6">
              Our Philosophy.
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              We are defined by what we refuse to compromise on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((value, idx) => (
              <motion.div 
                key={value.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white p-8 md:p-10 rounded-[2rem] border border-[var(--border-light)] hover:border-[var(--color-primary-300)] shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center flex-shrink-0 shadow-lg text-white group-hover:scale-110 transition-transform duration-500`}>
                    <value.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{value.title}</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 7. THE AI AGENT SWARM (Replacing Human Architects Grid) */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-32 bg-[var(--bg-secondary)] relative border-t border-[var(--border-light)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-bold mb-4">
                <Bot className="w-4 h-4" /> The Autonomous Swarm
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-6">
                Meet the AI Arsenal.
              </h2>
              <p className="text-lg text-[var(--text-secondary)]">
                Our human callers don't work alone. They are backed by 10 specialized AI agents integrated directly into our CRM. These agents run 24/7, turning raw data into qualified, pipeline-ready prospects.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiAgents.map((agent, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                className="group flex flex-col bg-white border border-[var(--border-light)] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[var(--color-primary-300)] transition-all duration-500 h-full"
              >
                {/* Agent Visual (Image from Cloudinary) */}
                <div className="relative w-full h-48 bg-slate-50 border-b border-[var(--border-light)] overflow-hidden flex items-center justify-center p-6">
                  {/* Subtle background glow based on the agent's theme */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[var(--color-primary-50)] to-transparent" />
                  
                  <img 
                    src={agent.image} 
                    alt={agent.label} 
                    className="relative z-10 w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 drop-shadow-xl"
                  />
                </div>
                
                {/* Agent Details */}
                <div className="flex flex-col flex-1 p-6 relative">
                  <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold w-max mb-4 border ${agent.color.replace('text-', 'border-').replace('50', '200')}`}>
                    Active Module
                  </div>
                  
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2 line-clamp-2 leading-tight">
                    {agent.label}
                  </h4>
                  
                  <p className="text-sm text-[var(--text-secondary)] mb-6 flex-1">
                    {agent.desc}
                  </p>
                  
                  {/* Interactive Button */}
                  <Link 
                    href={agent.href} 
                    className="mt-auto w-full py-3 px-4 bg-[var(--bg-secondary)] border border-[var(--border-medium)] rounded-xl text-center text-sm font-bold text-[var(--text-primary)] group-hover:bg-[var(--color-primary-600)] group-hover:text-white group-hover:border-transparent transition-colors flex items-center justify-center gap-2"
                  >
                    View Logic Flow <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 8. Final CTA (Massive Brand Gradient Card) */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-32 bg-white relative z-10 border-t border-[var(--border-light)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative rounded-[3rem] overflow-hidden p-12 lg:p-20 text-center shadow-2xl"
          >
            {/* Bright Brand Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-600)] via-blue-600 to-indigo-800" />
            
            {/* Animated Mesh / Glow */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[150px] opacity-20 animate-pulse" />

            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-white/30 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                Join the Elite Workforce.
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Whether you want to leverage our calling teams for your business, or you're a remote professional looking to join a tech-forward workforce, we want to hear from you.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/for-employee/submit-jobs" className="w-full sm:w-auto px-10 py-5 bg-white text-[var(--color-primary-700)] rounded-2xl text-lg font-black shadow-xl hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2">
                  <Building2 className="w-5 h-5" /> Hire Our Team
                </Link>
                <Link href="/for-candidate/submit-resume" className="w-full sm:w-auto px-10 py-5 bg-black/20 backdrop-blur-sm border border-white/30 text-white rounded-2xl text-lg font-bold hover:bg-black/30 transition-colors duration-300 flex items-center justify-center gap-2">
                  <Crosshair className="w-5 h-5" /> Apply as a Caller
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}