"use client";

import React from 'react';
import { 
  PhoneOutgoing, 
  Target, 
  Filter, 
  CheckCircle2, 
  Database, 
  Headset, 
  Bot, 
  ArrowRight,
  TrendingUp,
  BarChart,
  Rocket,
  UploadCloud,
  Briefcase,
  Home,
  ShieldCheck,
  Sun
} from 'lucide-react';

export default function OutboundLeadGenPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-20 overflow-hidden">
      
      {/* ---------------------------------------------------------------- */}
      {/* 1. Hero Section */}
      {/* ---------------------------------------------------------------- */}
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-[85vh] flex flex-col justify-center">
        
        {/* Dotted Background Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at center, var(--border-medium) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* FLOATING ELEMENTS (Desktop Only) */}
        <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
          
          {/* Top Left: Qualification Card */}
          <div className="absolute top-12 left-10 -rotate-2 bg-[var(--bg-primary)] border border-[var(--border-light)] p-5 w-60 rounded-2xl shadow-xl shadow-[var(--color-primary-500)]/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Lead Qualified</p>
                <p className="text-[10px] text-[var(--text-secondary)]">Just now</p>
              </div>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-lg p-2.5 border border-[var(--border-light)]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-[var(--text-secondary)]">Budget:</span>
                <span className="text-xs font-bold text-[var(--color-primary-600)]">$5,000/mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[var(--text-secondary)]">Timeline:</span>
                <span className="text-xs font-bold text-[var(--text-primary)]">Immediate</span>
              </div>
            </div>
          </div>

          {/* Top Right: Live Transfer Alert */}
          <div className="absolute top-16 right-12 bg-amber-50 text-amber-900 border border-amber-200 p-4 w-56 rounded-xl shadow-lg rotate-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">Live Transfer</span>
            </div>
            <p className="text-sm font-medium">
              "They are interested. Routing call to closer now..."
            </p>
          </div>

          {/* Bottom Left: Campaign Progress */}
          <div className="absolute bottom-16 left-16 bg-[var(--bg-primary)] border border-[var(--border-light)] p-5 w-72 rounded-2xl shadow-xl shadow-[var(--color-primary-500)]/5 -rotate-3">
            <h4 className="text-[var(--text-primary)] font-bold text-sm mb-4">Q3 Cold Outreach</h4>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <PhoneOutgoing className="w-4 h-4 text-[var(--color-primary-500)]" />
                <span className="text-xs font-medium text-[var(--text-primary)]">Dials Made</span>
              </div>
              <span className="text-xs font-bold text-[var(--text-primary)]">2,450 / 5,000</span>
            </div>
            <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2 mb-3 overflow-hidden">
              <div className="bg-[var(--color-primary-500)] h-2 rounded-full" style={{ width: '49%' }} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-[var(--color-primary-50)] p-2 rounded-lg text-center border border-[var(--color-primary-100)]">
                <p className="text-[10px] text-[var(--color-primary-600)] font-semibold uppercase">Meetings</p>
                <p className="text-sm font-bold text-[var(--color-primary-700)]">142</p>
              </div>
              <div className="bg-emerald-50 p-2 rounded-lg text-center border border-emerald-100">
                <p className="text-[10px] text-emerald-600 font-semibold uppercase">Transfers</p>
                <p className="text-sm font-bold text-emerald-700">38</p>
              </div>
            </div>
          </div>

          {/* Bottom Right: CRM Sync Note */}
          <div className="absolute bottom-24 right-20 bg-[var(--bg-primary)] border border-[var(--border-light)] p-4 w-48 rounded-xl shadow-lg rotate-2 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)]">CRM Synced</p>
              <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Notes & recording attached to lead profile.</p>
            </div>
          </div>

        </div>

        {/* Central Content */}
        <div className="relative z-20 max-w-4xl mx-auto text-center mt-10">
          <div className="w-20 h-20 mx-auto mb-6 bg-white border border-[var(--color-primary-200)] rounded-full shadow-lg shadow-[var(--color-primary-500)]/10 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary-500)] border-t-transparent animate-spin-slow opacity-20" />
            <div className="w-16 h-16 bg-[var(--color-primary-50)] rounded-full flex items-center justify-center">
              <Rocket className="w-8 h-8 text-[var(--color-primary-600)]" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight mb-6">
            Put your cold calling <br />
            <span className="text-[var(--text-secondary)] font-medium">on autopilot.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Scale your outreach infinitely. Our AI dials thousands of leads, asks qualifying questions, and live-transfers the hot prospects directly to your sales team.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-full text-base font-bold shadow-lg shadow-[var(--color-primary-500)]/30 hover:shadow-[var(--color-primary-500)]/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
              <PhoneOutgoing className="w-5 h-5" /> Launch a Campaign
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--bg-primary)] border border-[var(--border-medium)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-full text-base font-bold transition-all flex items-center justify-center gap-2">
              See How It Works
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Core Features Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-[var(--bg-secondary)] border-y border-[var(--border-light)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              A tireless SDR that never burns out
            </h2>
            <p className="text-[var(--text-secondary)]">
              Equip your sales organization with an AI that works 24/7, handles rejection perfectly, and only hands off leads ready to buy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--bg-primary)] p-8 rounded-3xl border border-[var(--border-light)] shadow-sm hover:border-[var(--color-primary-300)] transition-colors">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Smart Qualification</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Train the AI on your BANT (Budget, Authority, Need, Timeline) criteria. It asks the right questions dynamically based on the conversation flow.
              </p>
            </div>

            <div className="bg-[var(--bg-primary)] p-8 rounded-3xl border border-[var(--border-light)] shadow-sm hover:border-[var(--color-primary-300)] transition-colors">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Headset className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Live Warm Transfers</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                When a lead is hot, the AI places them on a brief hold, rings your closer, whispers the lead's context, and connects the call seamlessly.
              </p>
            </div>

            <div className="bg-[var(--bg-primary)] p-8 rounded-3xl border border-[var(--border-light)] shadow-sm hover:border-[var(--color-primary-300)] transition-colors">
              <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Infinite Concurrency</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Dial 10 numbers or 10,000 numbers simultaneously. Scale your outreach efforts instantly without hiring, training, or managing a massive call center.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Pipeline / How It Works Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Your automated lead pipeline
            </h2>
            <p className="text-[var(--text-secondary)]">
              From cold list to closed deal in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-[var(--border-light)]" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white border-2 border-[var(--border-medium)] rounded-full flex items-center justify-center mb-5 shadow-sm">
                <UploadCloud className="w-8 h-8 text-[var(--color-primary-500)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">1. Import Leads</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Upload a CSV or sync directly with HubSpot, Salesforce, or GoHighLevel.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white border-2 border-[var(--border-medium)] rounded-full flex items-center justify-center mb-5 shadow-sm">
                <Bot className="w-8 h-8 text-[var(--color-primary-500)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">2. Set the Script</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Give the AI your pitch, objection handling rules, and qualification goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white border-2 border-[var(--color-primary-500)] rounded-full flex items-center justify-center mb-5 shadow-md ring-4 ring-[var(--color-primary-50)]">
                <PhoneOutgoing className="w-8 h-8 text-[var(--color-primary-600)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">3. AI Dials Out</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                The agent calls thousands of leads, navigating voicemails and gatekeepers.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[var(--color-primary-600)] border-2 border-[var(--color-primary-600)] rounded-full flex items-center justify-center mb-5 shadow-md">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">4. You Close</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Your human reps only speak to pre-qualified prospects ready to take the next step.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 4. Industry Use Cases Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              High-volume prospecting for any sector
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-light)] hover:border-[var(--color-primary-300)] transition-all">
              <Briefcase className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-bold text-[var(--text-primary)] mb-2">B2B SaaS & Tech</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Cold call C-level executives, identify current software pain points, and book discovery demos.
              </p>
            </div>

            <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-light)] hover:border-[var(--color-primary-300)] transition-all">
              <Home className="w-8 h-8 text-emerald-500 mb-4" />
              <h3 className="font-bold text-[var(--text-primary)] mb-2">Real Estate Investors</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Dial absentee owners, gauge motivation to sell, and filter out unqualified properties automatically.
              </p>
            </div>

            <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-light)] hover:border-[var(--color-primary-300)] transition-all">
              <ShieldCheck className="w-8 h-8 text-violet-500 mb-4" />
              <h3 className="font-bold text-[var(--text-primary)] mb-2">Insurance Brokers</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Follow up on aged leads, confirm policy interest, and live-transfer to a licensed agent.
              </p>
            </div>

            <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-light)] hover:border-[var(--color-primary-300)] transition-all">
              <Sun className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="font-bold text-[var(--text-primary)] mb-2">Solar & Home Service</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Call homeowners to qualify roof age and electricity bills before sending a rep for an inspection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Stats / ROI Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-20 bg-[var(--color-primary-600)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary-400)]">
            <div className="text-center md:px-8 py-4">
              <h4 className="text-4xl lg:text-5xl font-extrabold mb-2">10x</h4>
              <p className="text-[var(--color-primary-100)] font-medium">More Dials Per Hour</p>
            </div>
            <div className="text-center md:px-8 py-4">
              <h4 className="text-4xl lg:text-5xl font-extrabold mb-2">100%</h4>
              <p className="text-[var(--color-primary-100)] font-medium">Script Adherence</p>
            </div>
            <div className="text-center md:px-8 py-4">
              <h4 className="text-4xl lg:text-5xl font-extrabold mb-2">80%</h4>
              <p className="text-[var(--color-primary-100)] font-medium">Reduction in SDR Burnout</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 6. Bottom Call to Action (CTA) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-[var(--color-primary-50)] rounded-full mb-6">
            <TrendingUp className="w-8 h-8 text-[var(--color-primary-600)]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            Stop dialing. Start closing.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            Create your first campaign today and watch the qualified appointments roll into your calendar automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-xl text-base font-bold shadow-lg shadow-[var(--color-primary-500)]/20 transition-all">
              Build Your Outbound Agent
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[var(--border-medium)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-xl text-base font-bold transition-all">
              Book a Strategy Call
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}