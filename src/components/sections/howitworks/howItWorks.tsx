"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Building2, 
  Home, 
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
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import Link from "next/link";
import ChartSection from "@/components/agentchart/agentchart";

// Animation variants with proper typing
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
};

// Agent data based on the architecture diagram
const agents = [
  {
    id: "lead-capture",
    title: "AI Lead Capture Agent",
    color: "orange",
    icon: Users,
    description: "Automatically captures candidates and employers from multiple channels including website forms, WhatsApp, and direct inquiries.",
    capabilities: [
      "Website form integration",
      "WhatsApp business API",
      "Landing page optimization",
      "Instant lead validation"
    ],
    stats: { value: "10x", label: "Faster Lead Capture" }
  },
  {
    id: "qualification",
    title: "AI Qualification Agent",
    color: "green",
    icon: CheckCircle2,
    description: "Intelligently qualifies candidates by analyzing skills, experience, salary expectations, and availability.",
    capabilities: [
      "Skills & experience analysis",
      "Salary expectation mapping",
      "Availability assessment",
      "Priority scoring"
    ],
    stats: { value: "85%", label: "Qualification Accuracy" }
  },
  {
    id: "candidate-matching",
    title: "AI Candidate Matching Agent",
    color: "purple",
    icon: Search,
    description: "Uses advanced vector search and AI reasoning to match candidates with their perfect remote job openings.",
    capabilities: [
      "Semantic job & resume search",
      "Vector similarity matching",
      "Recommendation engine",
      "Smart filtering"
    ],
    stats: { value: "3x", label: "Better Match Rate" }
  },
  {
    id: "campaign",
    title: "AI Campaign Agent",
    color: "yellow",
    icon: MessageSquare,
    description: "Automates multi-channel outreach via WhatsApp, Email, and SMS to nurture candidates and employers effectively.",
    capabilities: [
      "WhatsApp automation",
      "Email sequences",
      "SMS campaigns",
      "Personalized messaging"
    ],
    stats: { value: "40%", label: "Higher Response Rate" }
  }
];

const orchestratorFeatures = [
  {
    icon: Database,
    title: "Agent Memory",
    description: "Stores past activities and interactions for context-aware conversations",
    color: "var(--color-primary-600)"
  },
  {
    icon: Brain,
    title: "AI Model (LLM)",
    description: "Advanced reasoning capabilities for intelligent decision making",
    color: "var(--color-primary-600)"
  },
  {
    icon: Workflow,
    title: "Agent Tools",
    description: "APIs & integrations with external services and databases",
    color: "var(--color-primary-600)"
  }
];

const dataLayer = [
  {
    icon: Database,
    title: "Hiring Database",
    subtitle: "Candidates & Jobs",
    description: "Centralized storage for all candidate and job listing data"
  },
  {
    icon: Search,
    title: "Vector Search",
    subtitle: "Candidate Matching",
    description: "AI-powered semantic search for intelligent job matching"
  },
  {
    icon: Globe,
    title: "External Services",
    subtitle: "WhatsApp • Email • AI",
    description: "Third-party integrations for omnichannel communication"
  }
];

export default function HowItWorksPage() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAgentColor = (color: string) => {
    const colors: Record<string, string> = {
      orange: "from-orange-500 to-amber-500",
      green: "from-emerald-500 to-teal-500",
      purple: "from-violet-500 to-purple-500",
      yellow: "from-amber-400 to-yellow-500"
    };
    return colors[color] || "from-blue-500 to-cyan-500";
  };

  const getAgentBgColor = (color: string) => {
    const colors: Record<string, string> = {
      orange: "bg-orange-50 border-orange-200",
      green: "bg-emerald-50 border-emerald-200",
      purple: "bg-violet-50 border-violet-200",
      yellow: "bg-amber-50 border-amber-200"
    };
    return colors[color] || "bg-blue-50 border-blue-200";
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-500)] z-50 transition-all duration-300"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Hero Section */}
      {/* <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-secondary-50)]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-primary-100)]/20 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Remote Hiring Automation</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-primary-920)] leading-tight mb-6"
            >
              How WorkByHome{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)]">
                Transforms
              </span>{" "}
              Your Hiring & Job Search
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            >
              Discover how our intelligent AI agent system automates lead capture, 
              qualification, candidate matching, and campaign management—24/7.
            </motion.p>
          </motion.div>
        </div>
      </section> */}
      <ChartSection/>

      {/* System Architecture Overview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[var(--color-primary-920)] mb-4">
              System Architecture
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              A comprehensive AI ecosystem that connects candidates and employers through intelligent automation
            </motion.p>
          </motion.div>

          {/* Architecture Diagram Visualization */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Users Layer */}
            <motion.div variants={fadeInUp} className="flex justify-center gap-8 mb-12">
              {[
                { icon: Users, label: "Candidate", role: "Job Seeker" },
                { icon: Building2, label: "Employer", role: "Hiring Company" },
                { icon: Home, label: "Remote Worker", role: "Works From Home" }
              ].map((user, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] flex items-center justify-center mb-3 shadow-lg">
                    <user.icon className="w-8 h-8 text-[var(--color-primary-700)]" />
                  </div>
                  <span className="font-semibold text-[var(--color-primary-900)]">{user.label}</span>
                  <span className="text-sm text-gray-500">{user.role}</span>
                </div>
              ))}
            </motion.div>

            {/* Connection Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-[var(--color-primary-300)] to-[var(--color-primary-500)] top-24" />

            {/* Frontend Layer */}
            <motion.div variants={fadeInUp} className="max-w-3xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-[var(--color-primary-50)] to-[var(--color-secondary-50)] rounded-2xl p-6 border border-[var(--color-primary-200)] shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-600)] flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-primary-900)]">WorkByHome Frontend (Next.js)</h3>
                    <p className="text-sm text-gray-600">Job Listings • Candidate Forms</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-lg p-3 text-center">
                    <Home className="w-5 h-5 text-[var(--color-primary-600)] mx-auto mb-1" />
                    <span className="text-sm font-medium text-gray-700">Job Listings</span>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3 text-center">
                    <Users className="w-5 h-5 text-[var(--color-primary-600)] mx-auto mb-1" />
                    <span className="text-sm font-medium text-gray-700">Candidate Forms</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* API Layer */}
            <motion.div variants={fadeInUp} className="flex justify-center mb-12">
              <div className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full flex items-center gap-3 shadow-lg border border-gray-200">
                <Cpu className="w-5 h-5 text-[var(--color-primary-600)]" />
                <span className="font-mono text-sm font-medium">REST / GraphQL APIs</span>
              </div>
            </motion.div>

            {/* AI Orchestrator */}
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] rounded-3xl p-8 text-white shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                    <Brain className="w-5 h-5" />
                    <span className="font-semibold">AI Agent Orchestrator</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {orchestratorFeatures.map((feature, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                      <feature.icon className="w-10 h-10 mb-4 text-[var(--color-secondary-300)]" />
                      <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-200">{feature.description}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-secondary-300)]" />
                        <span className="text-xs text-[var(--color-secondary-200)]">
                          {idx === 0 ? "Past Activities" : idx === 1 ? "AI Reasoning" : "APIs & Integrations"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* AI Agents Grid */}
            <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              {agents.map((agent, idx) => (
                <motion.div
                  key={agent.id}
                  variants={scaleIn}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setActiveAgent(activeAgent === agent.id ? null : agent.id)}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${getAgentBgColor(agent.color)} ${activeAgent === agent.id ? 'ring-4 ring-[var(--color-primary-200)] shadow-2xl' : 'shadow-lg hover:shadow-xl'}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAgentColor(agent.color)} flex items-center justify-center mb-4 text-white shadow-lg`}>
                    <agent.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[var(--color-primary-900)] mb-2">{agent.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--color-primary-600)] bg-white/80 px-2 py-1 rounded-full">
                      {agent.stats.value} {agent.stats.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Data Layer */}
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-center text-lg font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
                  <Database className="w-5 h-5 text-[var(--color-primary-600)]" />
                  Data & Services Layer
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {dataLayer.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                      <item.icon className="w-10 h-10 text-[var(--color-primary-600)] mb-4" />
                      <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-xs text-[var(--color-primary-600)] font-medium mb-2">{item.subtitle}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Agent Breakdown */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[var(--color-primary-50)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[var(--color-primary-920)] mb-4">
              AI Agents in Action
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Each specialized agent works together to create a seamless hiring experience
            </motion.p>
          </motion.div>

          <div className="space-y-12">
            {agents.map((agent, idx) => (
              <motion.div
                key={agent.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={`grid lg:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getAgentColor(agent.color)} text-white text-sm font-medium mb-4`}>
                    <agent.icon className="w-4 h-4" />
                    <span>Step {idx + 1}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-920)] mb-4">
                    {agent.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {agent.description}
                  </p>
                  <ul className="space-y-3">
                    {agent.capabilities.map((cap, capIdx) => (
                      <li key={capIdx} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${getAgentColor(agent.color)} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-gray-700">{cap}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm inline-flex items-center gap-4">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${getAgentColor(agent.color)} bg-clip-text text-transparent`}>
                      {agent.stats.value}
                    </div>
                    <div className="text-sm text-gray-600 leading-tight">
                      {agent.stats.label}
                    </div>
                  </div>
                </div>
                <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className={`relative rounded-3xl p-8 bg-gradient-to-br ${getAgentColor(agent.color)} shadow-2xl overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                    <div className="relative z-10">
                      <agent.icon className="w-20 h-20 text-white/90 mb-6" />
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="bg-white/20 backdrop-blur-md rounded-lg p-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                              <div className="h-full bg-white/60 rounded-full" style={{ width: `${100 - i * 20}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Process */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[var(--color-primary-920)] mb-4">
              The WorkByHome Workflow
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              From first application to successful hire—fully automated and optimized
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Connection Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-primary-200)] via-[var(--color-primary-500)] to-[var(--color-primary-800)] hidden lg:block" />

            <div className="space-y-12 lg:space-y-24">
              {[
                {
                  step: "01",
                  title: "Candidate or Employer Enters System",
                  description: "Job seekers or hiring companies interact with your website, WhatsApp, or forms. The AI Lead Capture Agent immediately records their information.",
                  icon: Users,
                  color: "orange"
                },
                {
                  step: "02",
                  title: "AI Qualification",
                  description: "The Qualification Agent analyzes skills, experience, and availability to determine candidate quality and priority.",
                  icon: CheckCircle2,
                  color: "green"
                },
                {
                  step: "03",
                  title: "Smart Candidate Matching",
                  description: "Using vector search and AI reasoning, the system finds perfect job matches from your database.",
                  icon: Search,
                  color: "purple"
                },
                {
                  step: "04",
                  title: "Automated Outreach",
                  description: "The Campaign Agent initiates personalized WhatsApp, email, or SMS sequences to nurture the candidate.",
                  icon: MessageSquare,
                  color: "yellow"
                },
                {
                  step: "05",
                  title: "Employer Handoff",
                  description: "Qualified, interested candidates are automatically matched and introduced to the right employer with full context and history.",
                  icon: Building2,
                  color: "blue"
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  className={`relative flex items-center gap-8 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${item.color}-100 text-${item.color}-700 text-sm font-medium mb-4`}>
                      <span className="font-bold">Step {item.step}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-primary-920)] mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                  
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getAgentColor(item.color)} flex items-center justify-center shadow-xl`}>
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-[var(--color-primary-600)] rounded-2xl blur-xl opacity-20" />
                  </div>

                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration & Data Flow */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[var(--color-primary-920)] mb-4">
              Seamless Integrations
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Connect with your existing tools and databases effortlessly
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Database,
                title: "Hiring Database",
                features: ["Candidate & job storage", "Application history", "Contact management", "Activity tracking"]
              },
              {
                icon: Search,
                title: "Vector Search Engine",
                features: ["Semantic candidate search", "AI-powered matching", "Natural language queries", "Similarity scoring"]
              },
              {
                icon: Layers,
                title: "External Services",
                features: ["WhatsApp Business API", "Email service providers", "SMS gateways", "Payment processors"]
              }
            ].map((integration, idx) => (
              <motion.div 
                key={idx}
                variants={scaleIn}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <integration.icon className="w-7 h-7 text-[var(--color-primary-700)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-4">{integration.title}</h3>
                <ul className="space-y-3">
                  {integration.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-500)]" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Converted to Light Theme */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[var(--color-primary-920)] mb-4">
              Why Choose WorkByHome?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Transform your hiring and job search with AI-powered automation
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Zap, value: "10x", label: "Faster Response Time", desc: "Instant AI replies 24/7" },
              { icon: BarChart3, value: "85%", label: "Candidate Qualification", desc: "Accurate priority scoring" },
              { icon: Shield, value: "99.9%", label: "Uptime Guarantee", desc: "Reliable cloud infrastructure" },
              { icon: Sparkles, value: "3x", label: "Placement Rate", desc: "Better qualified candidates" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={scaleIn}
                className="text-center p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <stat.icon className="w-10 h-10 text-[var(--color-primary-600)] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[var(--color-primary-700)] mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[var(--color-primary-920)] mb-6">
              Ready to Transform Your Hiring or Job Search?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies and job seekers using WorkByHome's AI agents to hire faster and land the right remote role.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link href="/register"> 
              <button className="px-8 py-4 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-700)] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
              <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button></Link>
             <Link href="/book-demo"> <button className="px-8 py-4 bg-white text-[var(--color-primary-700)] border-2 border-[var(--color-primary-200)] rounded-xl font-semibold hover:bg-[var(--color-primary-50)] transition-colors">
                Schedule Demo
              </button></Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

   
    </main>
  );
}