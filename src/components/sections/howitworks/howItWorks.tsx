"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Users, 
  Building2, 
  Headphones,
  Brain, 
  Database, 
  Search, 
  MessageSquare, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Cpu,
  Workflow,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Sparkles,
  Server,
  Network,
  Lock,
  Activity,
  ArrowUpRight,
  Crosshair,
  Radar,
  Braces,
  Fingerprint,
  Combine,
  PhoneCall,
  PhoneIncoming,
  AudioWaveform,
  CloudCog,
  Briefcase
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import { FaRadio } from "react-icons/fa6";

// ============================================================================
// TypeScript Interfaces & Types
// ============================================================================

type PhaseType = {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: React.ElementType;
  accent: string;
  gradient: string;
};

type ArchitectureLayer = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  techStack: string[];
  color: string;
  stats: string;
};

type CapabilityCard = {
  title: string;
  description: string;
  icon: React.ElementType;
  colSpan: number;
  rowSpan: number;
  imageMode?: "code" | "wave" | "nodes" | "none";
  theme: "dark" | "light" | "brand";
};

// ============================================================================
// Animation Variants
// ============================================================================

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerWrap: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1, 
    transition: { duration: 1.5, ease: "easeInOut" } 
  }
};

const pulseGlow: Variants = {
  hidden: { opacity: 0.3, scale: 0.8 },
  visible: { 
    opacity: [0.3, 0.7, 0.3], 
    scale: [0.8, 1.1, 0.8],
    transition: { duration: 4, repeat: Infinity, ease: "linear" } 
  }
};

// ============================================================================
// Data Dictionaries (Showoff / Vaporware Copy)
// ============================================================================

const deploymentPhases: PhaseType[] = [
  {
    id: "phase-1",
    step: "01",
    title: "Strategic Knowledge Transfer",
    subtitle: "Mapping your business DNA to our framework.",
    description: "We don't hand you a blank software tool and wish you luck. Our deployment team conducts a deep-dive analysis of your sales scripts, FAQs, objection handling frameworks, and brand voice. We ingest this data into our proprietary semantic vaults.",
    details: [
      "Custom vector-database structuring of your company knowledge.",
      "Dialect and tone-of-voice alignment.",
      "Boundary setting (defining exactly what the assistant can and cannot say)."
    ],
    icon: Database,
    accent: "text-blue-600",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "phase-2",
    step: "02",
    title: "Telephony & Systems Integration",
    subtitle: "Plugging the engine into your existing stack.",
    description: "Our engineering team establishes secure, bi-directional pipelines between our virtual calling infrastructure and your CRM. We provision enterprise-grade VoIP trunks to ensure latency-free, crystal clear audio, whether we are making or taking calls.",
    details: [
      "Secure webhook configuration (Salesforce, HubSpot, custom CRMs).",
      "SIP trunk provisioning and localized number mapping.",
      "Calendar API syncing for real-time appointment scheduling."
    ],
    icon: Network,
    accent: "text-violet-600",
    gradient: "from-violet-500 to-fuchsia-500"
  },
  {
    id: "phase-3",
    step: "03",
    title: "Live Deployment & Orchestration",
    subtitle: "Our systems handle the heavy lifting.",
    description: "Once activated, our infrastructure handles the complete lifecycle of the call. We manage the automated dial rates, handle concurrent inbound spikes, and process the natural language logic entirely behind the scenes. You simply watch the results flow in.",
    details: [
      "Infinite elastic concurrency scaling (no dropped calls or busy signals).",
      "Sub-500ms conversation latency processing.",
      "Real-time intent extraction and sentiment monitoring."
    ],
    icon: AudioWaveform,
    accent: "text-[var(--color-primary-600)]",
    gradient: "from-[var(--color-primary-600)] to-blue-600"
  },
  {
    id: "phase-4",
    step: "04",
    title: "Handoff & Closed-Loop Analytics",
    subtitle: "You close the deals. We handle the rest.",
    description: "When a lead is qualified or a complex issue requires human intervention, our system executes a seamless 'warm transfer' to your team, passing along the full transcript and context. Post-call, structured data is injected directly into your database.",
    details: [
      "Live hot-transfers to your human closing team.",
      "Automated call summarization and CRM tagging.",
      "Continuous optimization based on your team's feedback loop."
    ],
    icon: Combine,
    accent: "text-emerald-600",
    gradient: "from-emerald-500 to-teal-500"
  }
];

const architectureLayers: ArchitectureLayer[] = [
  {
    id: "telephony",
    name: "Edge Telephony Layer",
    description: "The vanguard of our system. We maintain relationships with global Tier-1 carriers to ensure maximum deliverability, zero latency, and crystal-clear audio fidelity across all our virtual calls.",
    icon: FaRadio,
    techStack: ["WebRTC", "SIP Trunking", "Global Edge PoPs", "Noise Suppression"],
    color: "bg-blue-500",
    stats: "99.99% Uptime"
  },
  {
    id: "processing",
    name: "Proprietary Logic Core",
    description: "The black box where the magic happens. We route audio through highly optimized Automatic Speech Recognition (ASR), process it via custom-tuned Large Language Models, and synthesize a lifelike response.",
    icon: Cpu,
    techStack: ["Streaming ASR", "Vector RAG", "Sentiment Analysis", "Zero-Shot TTS"],
    color: "bg-[var(--color-primary-600)]",
    stats: "< 500ms Latency"
  },
  {
    id: "application",
    name: "Data Sync Pipeline",
    description: "The bridge to your world. As our assistants execute calls, this layer actively queries your databases for context and pushes formatted transcripts, summaries, and action items back to your team.",
    icon: Layers,
    techStack: ["REST/GraphQL", "OAuth 2.0", "Webhook Dispatcher", "Data Sanitization"],
    color: "bg-emerald-500",
    stats: "Real-time Sync"
  }
];

const capabilities: CapabilityCard[] = [
  {
    title: "Unmatched Concurrency",
    description: "Our distributed architecture allows us to handle thousands of simultaneous outbound dials or inbound support requests without breaking a sweat. No queues. No bottlenecks.",
    icon: Workflow,
    colSpan: 2,
    rowSpan: 1,
    imageMode: "nodes",
    theme: "dark"
  },
  {
    title: "Enterprise Grade Security",
    description: "Your data never leaves the vault. We employ end-to-end encryption and strict data partitioning. Your proprietary scripts and client data are never used to train foundational models.",
    icon: Lock,
    colSpan: 1,
    rowSpan: 2,
    imageMode: "none",
    theme: "brand"
  },
  {
    title: "Semantic Lead Matching",
    description: "We don't just follow a script; our system understands context, intent, and nuance, steering conversations toward your ultimate business objective.",
    icon: Brain,
    colSpan: 1,
    rowSpan: 1,
    imageMode: "none",
    theme: "light"
  },
  {
    title: "Omnichannel Fallback",
    description: "If a lead doesn't answer the phone, our system can automatically trigger a localized SMS or email sequence to keep the prospect warm.",
    icon: MessageSquare,
    colSpan: 1,
    rowSpan: 1,
    imageMode: "none",
    theme: "light"
  },
  {
    title: "Bi-Directional CRM Injection",
    description: "Every call outcome, sentiment score, and key data point is parsed from the audio and injected cleanly into your Salesforce, HubSpot, or custom CRM.",
    icon: Database,
    colSpan: 2,
    rowSpan: 1,
    imageMode: "code",
    theme: "dark"
  }
];

// ============================================================================
// Main Component
// ============================================================================

export default function HowItWorksPage() {
  const [activeLayer, setActiveLayer] = useState<string>(architectureLayers[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <main 
      className="min-h-screen bg-[var(--bg-primary)] overflow-x-hidden text-[var(--text-primary)] font-sans selection:bg-[var(--color-primary-500)] selection:text-white" 
      ref={containerRef}
    >
      {/* ---------------------------------------------------------------- */}
      {/* Global Progress Bar */}
      {/* ---------------------------------------------------------------- */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-primary-400)] via-violet-500 to-[var(--color-primary-600)] z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* 1. Hero Section: The "Black Box" Network Map */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-[#050914]">
        
        {/* Deep Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-[var(--color-primary-600)] rounded-full blur-[150px] opacity-10 animate-pulse mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] bg-emerald-600 rounded-full blur-[150px] opacity-10 animate-pulse mix-blend-screen pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Isometric SVG Grid Network */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <motion.div 
            style={{ y: headerY, opacity: headerOpacity }}
            className="text-center max-w-4xl mx-auto mb-16 lg:mb-24"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-bold mb-8 backdrop-blur-xl"
            >
              <Shield className="w-4 h-4 text-[var(--color-primary-400)]" /> Fully Managed Infrastructure
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-8"
            >
              We run the engine.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-400)] via-blue-400 to-emerald-400">
                You get the results.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light"
            >
              WorkByHome is not just a software tool. It is a turnkey virtual calling concierge powered by proprietary artificial intelligence and maintained by telecom experts.
            </motion.p>
          </motion.div>

          {/* Elaborate "Engine Room" Visual Representation */}
          <div className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[500px] mt-10">
            
            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="xMidYMid meet">
              <motion.path 
                d="M 15% 50% L 40% 50%" 
                fill="none" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="2" strokeDasharray="6 6"
                variants={drawLine} initial="hidden" animate="visible"
              />
              <motion.path 
                d="M 60% 50% L 85% 50%" 
                fill="none" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="2" strokeDasharray="6 6"
                variants={drawLine} initial="hidden" animate="visible"
              />
              {/* Moving data packets */}
              <circle r="4" fill="#818cf8">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 15% 50% L 40% 50%" />
              </circle>
              <circle r="4" fill="#34d399">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 60% 50% L 85% 50%" />
              </circle>
            </svg>

            {/* Left Node: The World (Leads/Callers) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}
              className="absolute left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 flex flex-col items-center z-20"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-[#121826] border border-slate-700/50 flex items-center justify-center shadow-2xl relative group">
                <Globe className="w-10 h-10 text-slate-400 group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
              </div>
              <div className="mt-6 text-center">
                <span className="block text-white font-bold tracking-wide uppercase text-sm mb-1">The World</span>
                <span className="block text-slate-500 text-xs font-mono">Inbound / Outbound</span>
              </div>
            </motion.div>

            {/* Center Node: The Proprietary Black Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.8 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30"
            >
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-1 shadow-[0_0_80px_rgba(79,70,229,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-500)] to-emerald-500 rounded-[2.5rem] blur-md opacity-50 animate-pulse" />
                <div className="w-full h-full bg-[#0a0f1a] rounded-[2.4rem] border border-white/10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                  <Brain className="w-16 h-16 md:w-20 md:h-20 text-white relative z-10" />
                  
                  {/* Decorative internal rings */}
                  <div className="absolute inset-4 border border-[var(--color-primary-500)]/30 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-8 border border-emerald-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                </div>
              </div>
              <div className="mt-8 text-center">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-bold tracking-widest uppercase text-sm mb-1">WorkByHome Engine</span>
                <span className="block text-slate-500 text-xs font-mono">Proprietary Processing</span>
              </div>
            </motion.div>

            {/* Right Node: Your Business (CRM/Closing Team) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}
              className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 flex flex-col items-center z-20"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-[#121826] border border-slate-700/50 flex items-center justify-center shadow-2xl relative group">
                <Database className="w-10 h-10 text-emerald-400 group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_20px_rgba(52,211,153,0.1)]" />
              </div>
              <div className="mt-6 text-center">
                <span className="block text-white font-bold tracking-wide uppercase text-sm mb-1">Your Business</span>
                <span className="block text-slate-500 text-xs font-mono">CRM / Sales Team</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 2. The Concierge Onboarding Flow (Sticky Scroll Timeline) */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white border-b border-[var(--border-light)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col lg:flex-row items-start gap-16 relative">
          
          {/* Left: Sticky Context */}
          <div className="lg:w-5/12 lg:sticky lg:top-32 relative z-10 mb-16 lg:mb-0">
            <div className="w-16 h-16 bg-[var(--color-primary-50)] rounded-[2rem] flex items-center justify-center mb-8 border border-[var(--color-primary-100)] shadow-sm">
              <Briefcase className="w-8 h-8 text-[var(--color-primary-600)]" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] mb-8 leading-[1.1] tracking-tight">
              A White-Glove Deployment Process.
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              We handle the complexities of AI orchestration, latency optimization, and SIP trunking. You provide the business goals, and our experts build the automated machine to achieve them.
            </p>
            <div className="hidden lg:flex items-center gap-4 text-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">
              <span className="w-12 h-px bg-[var(--border-medium)]" /> Scroll to explore the phases
            </div>
          </div>

          {/* Right: Scrolling Timeline Cards */}
          <div className="lg:w-7/12 relative z-10">
            {/* Central Timeline Line */}
            <div className="absolute left-8 lg:left-[3.25rem] top-10 bottom-10 w-1 bg-gradient-to-b from-blue-100 via-[var(--color-primary-200)] to-emerald-100 rounded-full hidden sm:block" />

            <div className="space-y-12 lg:space-y-24">
              {deploymentPhases.map((phase, idx) => (
                <motion.div 
                  key={phase.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                  className="relative flex flex-col sm:flex-row gap-6 lg:gap-10 group"
                >
                  {/* Timeline Node */}
                  <div className="hidden sm:flex flex-col items-center z-10 relative mt-4">
                    <div className={`w-16 h-16 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${phase.gradient} opacity-20`} />
                      <phase.icon className={`w-6 h-6 ${phase.accent} relative z-10`} />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white border border-[var(--border-light)] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden">
                    {/* Background Graphic Accent */}
                    <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-bl ${phase.gradient} rounded-full blur-[80px] opacity-20 pointer-events-none`} />

                    <span className={`text-sm font-black tracking-widest uppercase ${phase.accent} block mb-3`}>
                      Phase {phase.step}
                    </span>
                    <h3 className="text-3xl font-extrabold text-[var(--text-primary)] mb-3">
                      {phase.title}
                    </h3>
                    <h4 className="text-lg font-medium text-[var(--text-tertiary)] mb-6">
                      {phase.subtitle}
                    </h4>
                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                      {phase.description}
                    </p>

                    <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 border border-[var(--border-light)]">
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">Deliverables</p>
                      <ul className="space-y-3">
                        {phase.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-3">
                            <div className="mt-1">
                              <CheckCircle2 className={`w-4 h-4 ${phase.accent}`} />
                            </div>
                            <span className="text-sm font-medium text-[var(--text-secondary)]">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. The "Black Box" Bento Grid (Technical Showoff) */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-32 bg-[var(--bg-secondary)] border-b border-[var(--border-light)] relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerWrap}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tight">
              Enterprise Technology. <br/> Zero Maintenance.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-[var(--text-secondary)] leading-relaxed">
              We leverage the same foundational technologies used by Fortune 500 call centers, bundled entirely into our managed service offering.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerWrap}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]"
          >
            {capabilities.map((cap, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className={`rounded-[2.5rem] p-8 md:p-10 border shadow-sm relative overflow-hidden flex flex-col justify-between group transition-shadow hover:shadow-xl
                  ${cap.theme === 'dark' ? 'bg-[#0a0f1a] border-slate-800 text-white' : ''}
                  ${cap.theme === 'light' ? 'bg-white border-[var(--border-light)] text-[var(--text-primary)]' : ''}
                  ${cap.theme === 'brand' ? 'bg-[var(--color-primary-600)] border-[var(--color-primary-500)] text-white' : ''}
                `}
                style={{ 
                  gridColumn: `span ${cap.colSpan > 1 ? '2' : '1'}`,
                  gridRow: `span ${cap.rowSpan > 1 ? '2' : '1'}`
                }}
              >
                {/* Graphics Layer */}
                {cap.imageMode === "nodes" && (
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="dotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="#fff" />
                      </pattern>
                      <rect x="0" y="0" width="100%" height="100%" fill="url(#dotGrid)" />
                    </svg>
                  </div>
                )}
                {cap.imageMode === "code" && (
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4 rotate-[-10deg]">
                    <Braces className="w-64 h-64 text-emerald-400" />
                  </div>
                )}
                {cap.theme === 'brand' && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                )}

                {/* Content Layer */}
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg backdrop-blur-md border
                    ${cap.theme === 'dark' ? 'bg-white/10 border-white/20 text-white' : ''}
                    ${cap.theme === 'light' ? 'bg-[var(--color-primary-50)] border-[var(--color-primary-100)] text-[var(--color-primary-600)]' : ''}
                    ${cap.theme === 'brand' ? 'bg-black/20 border-black/10 text-white' : ''}
                  `}>
                    <cap.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">
                    {cap.title}
                  </h3>
                </div>
                
                <div className="relative z-10">
                  <p className={`text-base md:text-lg leading-relaxed ${cap.theme === 'light' ? 'text-[var(--text-secondary)]' : 'text-white/80'}`}>
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. Layered Architecture Visualizer (Interactive-looking) */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tight">
              Anatomy of the Platform.
            </h2>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              We utilize a decoupled, multi-tiered architecture to separate the raw voice transport from the cognitive processing, ensuring maximum stability and security.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: The "Stack" Graphic */}
            <div className="flex-1 w-full relative perspective-1000 flex flex-col gap-6 lg:gap-8 items-center justify-center">
              {architectureLayers.map((layer, index) => (
                <motion.div 
                  key={layer.id}
                  initial={{ opacity: 0, y: 50, rotateX: 20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                  className={`w-full max-w-md ${layer.color} rounded-[2rem] p-6 shadow-2xl relative group cursor-default transform hover:-translate-y-2 transition-transform duration-300`}
                >
                  <div className="absolute inset-0 bg-black/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                        <layer.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{layer.name}</h3>
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-white/60 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
                      Layer {3 - index}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {layer.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-xs font-mono font-medium text-white/90 bg-white/10 px-3 py-1.5 rounded-md border border-white/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: The Explanation */}
            <div className="flex-1 space-y-12">
              {architectureLayers.map((layer, index) => (
                <motion.div 
                  key={layer.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeRight}
                  className="relative pl-8 border-l-2 border-[var(--border-light)]"
                >
                  {/* Decorative dot */}
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ${layer.color} border-4 border-white shadow-sm`} />
                  
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{layer.name}</h3>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
                    {layer.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider">
                    <Activity className="w-4 h-4" /> {layer.stats}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Deployment / "Concierge" Banner */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-24 bg-[#050914] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-900)]/40 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl backdrop-blur-md">
              <CloudCog className="w-10 h-10 text-[var(--color-primary-400)]" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">
              Ready to automate your voice infrastructure?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Stop hiring temporary agents and fighting with clunky software. Let our team engineer, deploy, and manage an enterprise-grade AI calling system for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-[#050914] rounded-2xl text-lg font-black shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300">
                Request an Architecture Audit
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white/20 text-white rounded-2xl text-lg font-bold hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2">
                Talk to Engineering <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}