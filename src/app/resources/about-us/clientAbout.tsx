"use client";

import React from 'react';
import Head from 'next/head';
import { 
  Bot, 
  Brain, 
  Zap, 
  Shield, 
  Clock, 
  Target, 
  Sparkles, 
  Workflow, 
  Users, 
  TrendingUp,
  MessageSquare,
  Search,
  Briefcase,
  UserCheck,
  ClipboardList,
  Building,
  CheckCircle2,
  ArrowRight,
  Play
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as const
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.2 
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.6 } 
  }
};

// Types
interface Agent {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

// Data customized for WorkByHome
const agents: Agent[] = [
  {
    icon: ClipboardList,
    title: "AI Task Capture Agent",
    description: "Automatically captures and organizes job requirements from websites, forms, and emails.",
    gradient: "from-[var(--color-primary-500)] to-[var(--color-primary-300)]"
  },
  {
    icon: UserCheck,
    title: "AI Qualification Agent",
    description: "Evaluates candidates instantly based on budget, skills, location, and timeline.",
    gradient: "from-[var(--color-secondary-600)] to-[var(--color-secondary-400)]"
  },
  {
    icon: Search,
    title: "AI Matching Agent",
    description: "Uses vector search engines to recommend the best-fit candidates for every project.",
    gradient: "from-[var(--color-primary-600)] to-[var(--color-primary-400)]"
  },
  {
    icon: MessageSquare,
    title: "AI Communication Agent",
    description: "Manages seamless updates, interviews, and notifications via WhatsApp, Email, and SMS.",
    gradient: "from-[var(--color-secondary-500)] to-[var(--color-primary-300)]"
  },
  {
    icon: Briefcase,
    title: "Employer Success Agent",
    description: "Helps job providers craft perfect job listings and optimize their hiring pipeline.",
    gradient: "from-[var(--color-primary-700)] to-[var(--color-primary-500)]"
  },
  {
    icon: Users,
    title: "Freelancer Guide Agent",
    description: "Assists remote workers in finding tasks, upgrading skills, and managing assignments.",
    gradient: "from-[var(--color-secondary-700)] to-[var(--color-secondary-500)]"
  },
  {
    icon: Workflow,
    title: "Orchestrator Agent",
    description: "Coordinates workflows between managers, brokers, and the WorkByHome database.",
    gradient: "from-[var(--color-primary-500)] to-[var(--color-secondary-400)]"
  },
  {
    icon: Brain,
    title: "Agent Memory",
    description: "Learns from past interactions and hiring activities to improve future matchmaking.",
    gradient: "from-[var(--color-secondary-600)] to-[var(--color-primary-400)]"
  }
];

const stats: Stat[] = [
  { value: "100k+", label: "Remote Jobs", icon: Briefcase },
  { value: "24/7", label: "AI Matching", icon: Clock },
  { value: "50k+", label: "Hired Candidates", icon: Zap }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-primary-50)] text-[var(--color-primary-900)] overflow-x-hidden">
      <Head>
        <title>About WorkByHome | AI Powered Remote Jobs Platform</title>
        <meta name="description" content="Connecting candidates and job providers through intelligent AI agents." />
      </Head>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary-200)]/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-secondary-200)]/30 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary-100)]/20 rounded-full blur-[150px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 lg:pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] border border-[var(--color-primary-200)]">
                <Sparkles className="w-4 h-4 text-[var(--color-primary-600)]" />
                <span className="text-sm font-medium text-[var(--color-primary-700)]">Work Anywhere, Earn Everywhere</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-bold leading-tight text-[var(--color-primary-920)]"
              >
                The Future of Remote Hiring with{' '}
                <span className="bg-gradient-to-r from-[var(--color-primary-600)] via-[var(--color-secondary-500)] to-[var(--color-primary-800)] bg-clip-text text-transparent">
                  AI Agents
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-[var(--color-primary-800)]/80 leading-relaxed max-w-xl"
              >
                WorkByHome is a unified platform for job providers, brokers, and remote candidates. 
                Our specialized AI agents handle the heavy lifting—from qualifying leads to matching skills—so you can focus on building great teams and delivering great work.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-800)] text-white font-semibold hover:shadow-[0_0_40px_-10px_rgba(0,102,204,0.5)] transition-all flex items-center gap-2">
                  Find Work / Hire Talent
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-full bg-white border border-[var(--color-primary-300)] text-[var(--color-primary-800)] font-semibold hover:bg-[var(--color-primary-50)] transition-all flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  See How It Works
                </button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-400)]/20 to-[var(--color-secondary-400)]/20 rounded-3xl blur-3xl" />
                
                <div className="relative bg-white/80 backdrop-blur-xl border border-[var(--color-primary-200)] rounded-3xl p-8 shadow-2xl shadow-[var(--color-primary-200)]">
                  <div className="grid grid-cols-2 gap-4">
                    {agents.slice(0, 4).map((agent, idx) => {
                      const IconComponent = agent.icon;
                      return (
                        <div 
                          key={idx}
                          className="bg-[var(--color-primary-50)] backdrop-blur-md border border-[var(--color-primary-200)] rounded-2xl p-4 hover:border-[var(--color-primary-400)] transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-3`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-xs font-bold text-[var(--color-primary-900)] mb-1 truncate">{agent.title}</div>
                          <div className="h-2 w-12 bg-[var(--color-primary-200)] rounded-full" />
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
                    <div className="absolute inset-0 bg-[var(--color-primary-400)]/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-full h-full bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] rounded-full flex items-center justify-center border-4 border-white">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[var(--color-secondary-500)] to-[var(--color-primary-500)] rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-600)] rounded-2xl flex items-center justify-center shadow-lg animate-bounce delay-1000">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold mb-6 text-[var(--color-primary-920)]">
              Our Mission
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--color-primary-800)]/80 leading-relaxed">
              To democratize remote work by eliminating hiring friction. We empower job providers, managers, and candidates with AI tools that make discovering and executing work effortless.
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
                icon: Briefcase, 
                title: "For Employers", 
                desc: "Post jobs effortlessly. Our agents capture tasks, qualify leads, and orchestrate the hiring pipeline.",
                gradient: "from-[var(--color-primary-500)] to-[var(--color-primary-300)]"
              },
              { 
                icon: Users, 
                title: "For Candidates", 
                desc: "Find tasks & earn. Get smartly matched to remote opportunities that fit your exact skills and timeline.",
                gradient: "from-[var(--color-secondary-500)] to-[var(--color-secondary-300)]"
              },
              { 
                icon: Target, 
                title: "Smart Matching", 
                desc: "Our LLMs and Vector Search Engines ensure the right candidate meets the right project, every time.",
                gradient: "from-[var(--color-primary-600)] to-[var(--color-primary-400)]"
              }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-200)]/50 to-[var(--color-secondary-200)]/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] transition-all h-full shadow-lg shadow-[var(--color-primary-100)]">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-[var(--color-primary-900)]">{item.title}</h3>
                    <p className="text-[var(--color-primary-800)]/70 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* AI Ecosystem Grid */}
      <section className="relative z-10 py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-secondary-100)] border border-[var(--color-secondary-200)] mb-6">
              <Bot className="w-4 h-4 text-[var(--color-secondary-700)]" />
              <span className="text-sm font-medium text-[var(--color-secondary-800)]">The WorkByHome Orchestrator</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold mb-6 text-[var(--color-primary-920)]">
              Meet Your AI Hiring Team
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--color-primary-800)]/70 max-w-2xl mx-auto">
              Our autonomous agents read, match, and execute tasks across the WorkByHome database to simplify remote hiring.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {agents.map((agent, idx) => {
              const IconComponent = agent.icon;
              return (
                <motion.div
                  key={idx}
                  variants={scaleIn}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-300)]/30 to-[var(--color-secondary-300)]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative h-full p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] transition-all overflow-hidden shadow-lg shadow-[var(--color-primary-100)]">
                    <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
                    
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-[var(--color-primary-900)] group-hover:text-[var(--color-primary-600)] transition-colors">
                      {agent.title}
                    </h3>
                    <p className="text-sm text-[var(--color-primary-800)]/70 leading-relaxed">
                      {agent.description}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-primary-600)]">
                      <span>Active</span>
                      <div className="w-2 h-2 rounded-full bg-[var(--color-secondary-500)] animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why We Built This */}
      <section className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold text-[var(--color-primary-920)]">
                Why We Built WorkByHome
              </motion.h2>
              
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-red-700">The Hiring Bottleneck</h3>
                    <p className="text-[var(--color-primary-800)]/70 leading-relaxed">
                      Finding the right remote talent involves endless manual screening, misaligned expectations, and slow communication. Good candidates slip through the cracks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Workflow className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">The Intelligent Solution</h3>
                    <p className="text-[var(--color-primary-800)]/70 leading-relaxed">
                      An AI Orchestrator that natively links job providers and freelancers. Agents qualify timelines and budgets instantly, while our Vector Engine finds the exact skill match.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-100)] to-[var(--color-secondary-100)] border border-[var(--color-primary-200)]">
                <p className="text-lg italic text-[var(--color-primary-800)]">
                  "We wanted to build a platform where distance is irrelevant and skills speak louder than resumes. Our AI ensures the perfect match, faster than ever before."
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-300)]/20 to-[var(--color-secondary-300)]/20 rounded-3xl blur-3xl" />
              <div className="relative space-y-4">
                {[
                  { label: "Candidate Screening", value: 95, color: "bg-[var(--color-primary-500)]" },
                  { label: "Job Matching (Vector Search)", value: 98, color: "bg-[var(--color-secondary-500)]" },
                  { label: "Interview Scheduling", value: 85, color: "bg-[var(--color-primary-400)]" },
                  { label: "Outreach & Follow-ups", value: 90, color: "bg-[var(--color-primary-600)]" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur-md border border-[var(--color-primary-200)] rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-between mb-3">
                      <span className="font-medium text-[var(--color-primary-800)]">{stat.label}</span>
                      <span className="text-[var(--color-primary-600)] font-bold">{stat.value}% Automated</span>
                    </div>
                    <div className="h-3 bg-[var(--color-primary-100)] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: idx * 0.2 }}
                        className={`h-full ${stat.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-2xl p-6 mt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-green-800">Result</span>
                  </div>
                  <p className="text-[var(--color-primary-800)]">
                    Employers hire <span className="text-green-600 font-bold">4x faster</span> and remote candidates find ideal projects with <span className="text-green-600 font-bold">zero manual applying</span>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative z-10 py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold mb-6 text-[var(--color-primary-920)]">
              Under the Hood
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--color-primary-800)]/70 max-w-2xl mx-auto">
              WorkByHome is built on a scalable Next.js architecture, layered with powerful data services and AI models.
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
                icon: Brain,
                title: "AI Model (LLM)",
                desc: "Our orchestrator understands context, reasons through hiring constraints, and makes complex matchmaking decisions.",
                features: ["Understands Resumes/JDs", "Reasoning & Logic", "Skill Extraction"]
              },
              {
                icon: Search,
                title: "Vector Search Engine",
                desc: "Translates job descriptions and user profiles into vectors to guarantee high-fidelity smart matching and recommendations.",
                features: ["Semantic Search", "Smart Recommendations", "Real-time Queries"]
              },
              {
                icon: Workflow,
                title: "Data & Services Layer",
                desc: "Secure databases and APIs that handle user profiles, tasks, external messaging (WhatsApp/Email), and integrations.",
                features: ["REST & GraphQL APIs", "WhatsApp & Email Sync", "Secure Storage"]
              }
            ].map((tech, idx) => {
              const IconComponent = tech.icon;
              return (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  className="group relative p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] transition-all duration-500 shadow-lg shadow-[var(--color-primary-100)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-200)]/50 to-[var(--color-secondary-200)]/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] flex items-center justify-center mb-6 shadow-lg shadow-[var(--color-primary-300)]">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[var(--color-primary-900)]">{tech.title}</h3>
                    <p className="text-[var(--color-primary-800)]/70 mb-6 leading-relaxed">{tech.desc}</p>
                    <ul className="space-y-3">
                      {tech.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center gap-3 text-sm text-[var(--color-primary-800)]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-500)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Trust & Reliability */}
      <section className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-300)]/30 to-[var(--color-secondary-300)]/30 rounded-3xl blur-3xl" />
                <div className="relative grid grid-cols-2 gap-4">
                  {stats.map((stat, idx) => {
                    const IconComponent = stat.icon;
                    return (
                      <div 
                        key={idx}
                        className={`p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-[var(--color-primary-200)] shadow-lg ${idx === 2 ? 'col-span-2' : ''}`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="text-4xl font-bold text-[var(--color-primary-900)] mb-1">
                          {stat.value}
                        </div>
                        <div className="text-[var(--color-primary-700)]">{stat.label}</div>
                      </div>
                    );
                  })}
                  
                  <div className="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Secure Platform</span>
                    </div>
                    <p className="text-sm text-[var(--color-primary-800)]">
                      Your Data is Safe • Verified Profiles • Built for Growth & Reliability
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2 space-y-8"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold text-[var(--color-primary-920)]">
                Trust & Reliability
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-xl text-[var(--color-primary-800)]/70 leading-relaxed">
                Whether you are posting a task or completing one, WorkByHome ensures a secure, transparent, and verified environment for remote collaboration.
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4">
                {[
                  { icon: Shield, title: "Data Privacy", desc: "Enterprise-grade security securing user profiles and resumes." },
                  { icon: Building, title: "Verified Employers", desc: "Rigorous vetting of job providers and remote tasks." },
                  { icon: CheckCircle2, title: "Transparent Matching", desc: "Clear reasoning on why an AI agent recommended a match." },
                  { icon: Users, title: "Human in the Loop", desc: "AI assists, but users and managers make the final decisions." }
                ].map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/80 border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] transition-colors shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-[var(--color-primary-600)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-[var(--color-primary-900)]">{item.title}</h4>
                        <p className="text-sm text-[var(--color-primary-800)]/70">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative z-10 py-32 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary-100)]/50 via-transparent to-[var(--color-secondary-100)]/50" />
        
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-secondary-100)] border border-[var(--color-secondary-200)] mb-8">
              <Sparkles className="w-4 h-4 text-[var(--color-secondary-700)]" />
              <span className="text-sm font-medium text-[var(--color-secondary-800)]">The Future of Work</span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-7xl font-bold mb-8 leading-tight text-[var(--color-primary-920)]">
              Work Anywhere,{' '}
              <span className="bg-gradient-to-r from-[var(--color-primary-600)] via-[var(--color-secondary-500)] to-[var(--color-primary-800)] bg-clip-text text-transparent">
                Earn Everywhere.
              </span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-xl lg:text-2xl text-[var(--color-primary-800)]/70 leading-relaxed max-w-3xl mx-auto mb-12">
              We envision a borderless economy where talent finds opportunity instantly. WorkByHome connects the world's workforce using intelligent, collaborative AI agents.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 text-sm text-[var(--color-primary-700)]">
              <span className="px-4 py-2 rounded-full bg-white/80 border border-[var(--color-primary-200)]">AI Powered</span>
              <span className="px-4 py-2 rounded-full bg-white/80 border border-[var(--color-primary-200)]">Global Freelancers</span>
              <span className="px-4 py-2 rounded-full bg-white/80 border border-[var(--color-primary-200)]">Smart Workflows</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6 lg:px-8 mb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 lg:p-20 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-primary-600)]/90 via-[var(--color-primary-700)]/90 to-[var(--color-secondary-700)]/90 border border-[var(--color-primary-400)] overflow-hidden"
          >
            {/* Background effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-[var(--color-primary-400)]/30 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[var(--color-secondary-400)]/30 rounded-full blur-[100px]" />
            </div>

            <div className="relative text-center space-y-8">
              <h2 className="text-3xl lg:text-5xl font-bold text-white">
                Ready to Join WorkByHome?
              </h2>
              <p className="text-xl text-[var(--color-primary-100)] max-w-2xl mx-auto">
                Whether you're looking for your next remote gig or trying to hire top talent, our AI agents are ready to help.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link href="/for-candidate/browse-jobs" className="group px-8 py-4 rounded-full bg-white text-[var(--color-primary-800)] font-semibold hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] transition-all flex items-center gap-2">
                  Find Remote Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/for-employer/hire-candidates" className="px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-all">
                  Hire Candidates
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}