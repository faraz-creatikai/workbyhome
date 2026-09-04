"use client";

import React from 'react';
import { 
  Headphones, 
  Clock, 
  MessageCircle, 
  BookOpen, 
  ArrowRight,
  Zap,
  CheckCircle2,
  Shield,
  Star,
  Globe,
  ThumbsUp,
  Sparkles,
  Bot
} from 'lucide-react';

export default function InboundSupportPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      
      {/* ---------------------------------------------------------------- */}
      {/* 1. Dark Mode Hero with Glassmorphism & UI Mockup */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative bg-slate-950 pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary-600)] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[var(--color-primary-400)]" />
                Next-Gen Customer Support
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Never put a customer <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-400)] to-violet-400">
                  on hold again.
                </span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
                Transform your customer service with an AI agent that resolves inbound inquiries, processes returns, and troubleshoots issues instantly—24/7/365.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-xl text-base font-bold shadow-[0_0_40px_-10px_var(--color-primary-500)] hover:shadow-[0_0_60px_-15px_var(--color-primary-500)] transition-all flex items-center justify-center gap-2">
                  Deploy Your Agent <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-base font-bold backdrop-blur-sm transition-all flex items-center justify-center">
                  Calculate ROI
                </button>
              </div>

              <div className="mt-10 flex items-center gap-4 text-sm text-slate-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px]">
                      👤
                    </div>
                  ))}
                </div>
                <p>Trusted by 1,000+ support teams</p>
              </div>
            </div>

            {/* Right Content: Glass UI Mockup */}
            <div className="relative lg:h-[500px] flex items-center justify-center perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl transform rotate-y-[-10deg] rotate-x-[5deg] p-6 flex flex-col gap-4 z-20">
                
                {/* Mock Support Ticket Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-primary-500)] to-violet-500 flex items-center justify-center shadow-inner">
                      <Headphones className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">AI Support Agent</h3>
                      <p className="text-emerald-400 text-xs flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded bg-white/10 text-white/70 text-xs border border-white/5">
                    Ticket #8992
                  </div>
                </div>

                {/* Mock Conversation */}
                <div className="flex-1 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-xs">C</div>
                    <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm p-3 text-sm text-slate-200">
                      Hi, my recent order arrived damaged. What can I do?
                    </div>
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary-600)] flex-shrink-0 flex items-center justify-center text-xs"><Bot className="w-4 h-4 text-white"/></div>
                    <div className="bg-[var(--color-primary-600)]/20 border border-[var(--color-primary-500)]/30 rounded-2xl rounded-tr-sm p-3 text-sm text-white">
                      I'm so sorry to hear that! I've located your order. I can immediately process a replacement or issue a full refund to your original payment method. Which would you prefer?
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-xs">C</div>
                    <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm p-3 text-sm text-slate-200">
                      A replacement would be great, thanks.
                    </div>
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary-600)] flex-shrink-0 flex items-center justify-center text-xs"><Bot className="w-4 h-4 text-white"/></div>
                    <div className="bg-[var(--color-primary-600)]/20 border border-[var(--color-primary-500)]/30 rounded-2xl rounded-tr-sm p-3 text-sm text-white">
                      Done! Order #1104-R has been placed. You'll receive a tracking email shortly. Is there anything else I can help you with today?
                    </div>
                  </div>
                </div>
                
                {/* Mock Input */}
                <div className="mt-2 relative">
                  <div className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-4 text-slate-400 text-sm">
                    Resolution Time: 12 seconds...
                  </div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--color-primary-500)] rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Overlapping Metrics Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20">
        <div className="bg-[var(--bg-primary)] rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-[var(--border-light)] p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--border-light)]">
            <div className="flex items-center gap-4 md:px-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-[var(--text-primary)]">&lt; 2s</h4>
                <p className="text-sm text-[var(--text-secondary)] font-medium">Average Wait Time</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:px-8">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-[var(--text-primary)]">85%</h4>
                <p className="text-sm text-[var(--text-secondary)] font-medium">First-Touch Resolution</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:px-8">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-[var(--text-primary)]">+4.8</h4>
                <p className="text-sm text-[var(--text-secondary)] font-medium">CSAT Score Avg.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Zig-Zag Feature Section (Deep Shadows & Gradients) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Feature 1: Left Text, Right Graphic */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-sm font-bold mb-6">
                <BookOpen className="w-4 h-4" /> Knowledge Base Integration
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
                It reads your docs. <br />
                It answers like an expert.
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                Connect your Zendesk, Intercom, or internal wikis. The AI ingests your policies, return rules, and troubleshooting guides to provide perfectly accurate, brand-aligned answers.
              </p>
              <ul className="space-y-4">
                {[
                  'Syncs automatically when docs update',
                  'Cites sources in its responses',
                  'Maintains your brand voice and tone'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[var(--text-primary)] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-primary-500)]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary-200)] to-violet-200 rounded-full filter blur-3xl opacity-50" />
              <div className="relative bg-white border border-[var(--border-light)] rounded-3xl shadow-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="h-2 w-24 bg-gray-200 rounded-full" />
                  <div className="h-6 w-16 bg-emerald-100 text-emerald-700 rounded-md flex items-center justify-center text-xs font-bold">SYNCED</div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-[var(--border-medium)] rounded-xl bg-gray-50 flex gap-4 items-center">
                    <Globe className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="font-bold text-sm text-[var(--text-primary)]">Help Center Sync</p>
                      <p className="text-xs text-[var(--text-secondary)]">2,402 articles indexed</p>
                    </div>
                  </div>
                  <div className="p-4 border border-[var(--color-primary-200)] rounded-xl bg-[var(--color-primary-50)] flex gap-4 items-center">
                    <MessageCircle className="w-8 h-8 text-[var(--color-primary-500)]" />
                    <div>
                      <p className="font-bold text-sm text-[var(--text-primary)]">Past Tickets</p>
                      <p className="text-xs text-[var(--text-secondary)]">Learning from 50k+ resolutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Left Graphic, Right Text */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-rose-200 rounded-full filter blur-3xl opacity-50" />
              <div className="relative bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-8 text-white">
                <div className="flex gap-4 mb-6">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <h4 className="text-lg font-bold mb-4">Sentiment Analysis Detected: <span className="text-rose-400">Frustrated</span></h4>
                <div className="bg-white/10 p-4 rounded-xl border border-white/5 mb-4 text-sm text-slate-300">
                  "I've been waiting for my package for 3 weeks! This is unacceptable, I want to talk to a manager immediately."
                </div>
                <div className="flex items-center gap-3 text-amber-400 text-sm font-bold bg-amber-400/10 p-3 rounded-lg border border-amber-400/20">
                  <Zap className="w-4 h-4" /> Triggering Escalation Protocol...
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-4">
                  <span>Routing to: Tier 2 Human Agent</span>
                  <span className="text-emerald-400">Context Attached</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-bold mb-6">
                <Shield className="w-4 h-4" /> Smart Escalation
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
                Knows when to step aside.
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                The AI isn't here to trap your customers in a loop. It uses advanced sentiment analysis to detect frustration and instantly hot-transfers complex or sensitive issues to your human agents.
              </p>
              <ul className="space-y-4">
                {[
                  'Detects anger or urgency instantly',
                  'Passes full conversation history to human agents',
                  'Frees up your team to handle high-value tickets'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[var(--text-primary)] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-amber-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 4. High-Contrast Grid Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-slate-50 py-24 border-y border-[var(--border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-4">
              Everything you need for world-class support
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Deliver a personalized, localized, and instant support experience across every channel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[var(--color-primary-500)] hover:-translate-y-1 transition-transform">
              <Globe className="w-8 h-8 text-[var(--color-primary-600)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Multilingual</h3>
              <p className="text-[var(--text-secondary)]">
                Provide fluent support in over 40 languages instantly, without hiring a global team.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-violet-500 hover:-translate-y-1 transition-transform">
              <MessageCircle className="w-8 h-8 text-violet-600 mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Omnichannel</h3>
              <p className="text-[var(--text-secondary)]">
                Deploy your agent on Voice, SMS, WhatsApp, Web Chat, and Email from a single dashboard.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-emerald-500 hover:-translate-y-1 transition-transform">
              <ThumbsUp className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Personalized</h3>
              <p className="text-[var(--text-secondary)]">
                Integrates with Shopify and Salesforce to greet callers by name and reference recent orders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Bold Gradient CTA Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
            {/* Massive Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-600)] via-violet-600 to-indigo-800" />
            
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black opacity-20 rounded-full blur-2xl" />
            
            <div className="relative z-10 px-8 py-20 md:py-24 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Ready to clear your ticket queue?
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
                Join the most innovative customer support teams. Set up your AI agent in minutes and watch your CSAT scores soar.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-[var(--color-primary-700)] hover:bg-gray-50 rounded-xl text-base font-bold shadow-xl transition-all hover:scale-105">
                  Start Your Free Trial
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-black/20 hover:bg-black/30 text-white border border-white/20 rounded-xl text-base font-bold backdrop-blur-md transition-all">
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}