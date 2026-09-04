"use client";

import React from 'react';
import { 
  Link as LinkIcon, 
  Workflow, 
  Database, 
  MessageSquare, 
  Webhook, 
  Terminal, 
  CloudRain, 
  ArrowRightLeft,
  CheckCircle2,
  RefreshCw,
  Box,
  Layers,
  Code2,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function CRMIntegrationsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden text-[var(--text-primary)] pt-20">
      
      {/* ---------------------------------------------------------------- */}
      {/* 1. "Ecosystem Orbit" Hero Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-10 overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[var(--color-primary-100)] to-transparent rounded-full blur-[120px] opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-[var(--border-light)] text-[var(--color-primary-600)] text-sm font-bold mb-8">
            <Workflow className="w-4 h-4" /> Limitless Connectivity
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 max-w-4xl mx-auto">
            Plays nice with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-600)] to-violet-500">
              your entire tech stack.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-16 max-w-2xl mx-auto leading-relaxed">
            Don't change how you work. Our AI integrates natively with your existing CRM, calendars, and communication tools to push and pull data in real-time.
          </p>

          {/* Dribbble-style Orbit Visual */}
          <div className="relative w-full max-w-4xl mx-auto h-[400px] sm:h-[500px] flex items-center justify-center mt-10">
            
            {/* Center Node (WorkByHome AI) */}
            <div className="relative z-20 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-[var(--border-light)] flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 rounded-3xl border-2 border-[var(--color-primary-500)] border-t-transparent animate-spin-slow opacity-20" />
              <img src="/workbyhome.png" alt="WorkByHome AI" className="w-12 sm:w-16 h-12 sm:h-16 object-contain" />
            </div>

            {/* Orbit Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full border border-dashed border-[var(--border-medium)] animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-[380px] sm:w-[550px] h-[380px] sm:h-[550px] rounded-full border border-dashed border-[var(--border-medium)] animate-[spin_30s_linear_infinite_reverse]" />
            </div>

            {/* Orbiting App Nodes */}
            <div className="absolute w-full h-full z-10 flex items-center justify-center pointer-events-none">
              
              {/* Inner Orbit Apps */}
              <div className="absolute -mt-[250px] sm:-mt-[350px] w-14 h-14 bg-white rounded-2xl shadow-lg border border-[var(--border-light)] flex items-center justify-center text-blue-500">
                <Database className="w-6 h-6" /> {/* Placeholder for Salesforce/CRM */}
              </div>
              <div className="absolute mt-[250px] sm:mt-[350px] ml-[200px] w-14 h-14 bg-white rounded-2xl shadow-lg border border-[var(--border-light)] flex items-center justify-center text-orange-500">
                <Box className="w-6 h-6" /> {/* Placeholder for HubSpot */}
              </div>

              {/* Outer Orbit Apps */}
              <div className="absolute -ml-[380px] sm:-ml-[550px] w-16 h-16 bg-white rounded-2xl shadow-lg border border-[var(--border-light)] flex items-center justify-center text-amber-500">
                <Workflow className="w-7 h-7" /> {/* Placeholder for Zapier */}
              </div>
              <div className="absolute ml-[380px] sm:ml-[550px] -mt-[100px] w-16 h-16 bg-[#4A154B] rounded-2xl shadow-lg border border-[#4A154B] flex items-center justify-center text-white">
                <MessageSquare className="w-7 h-7" /> {/* Placeholder for Slack */}
              </div>
              <div className="absolute mt-[380px] sm:mt-[500px] -ml-[250px] w-14 h-14 bg-emerald-50 rounded-2xl shadow-lg border border-emerald-200 flex items-center justify-center text-emerald-600">
                <CloudRain className="w-6 h-6" /> {/* Placeholder for Google Workspace */}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Editorial Overlapping Image Section (Bi-directional Sync) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Panoramic Image with Glass Overlay */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-[2.5rem] mt-10 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern office dashboard" 
                className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] shadow-xl"
              />
              <div className="absolute inset-0 bg-indigo-900/10 rounded-[2.5rem]" />
              
              {/* Glassmorphism Floating Card */}
              <div className="absolute -right-4 md:-right-8 -bottom-8 md:bottom-12 bg-white/30 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-2xl w-[90%] md:w-80 transform rotate-[-2deg]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Live Sync</span>
                  <RefreshCw className="w-4 h-4 text-[var(--color-primary-600)] animate-spin-slow" />
                </div>
                <div className="bg-white/80 rounded-xl p-4 mb-3 border border-white/50">
                  <p className="text-xs text-[var(--text-secondary)] mb-1">Pulled from CRM:</p>
                  <p className="text-sm font-bold text-[var(--text-primary)]">"Customer Plan: Enterprise"</p>
                </div>
                <div className="flex justify-center my-2">
                  <ArrowRightLeft className="w-5 h-5 text-slate-600 rotate-90" />
                </div>
                <div className="bg-white/80 rounded-xl p-4 border border-white/50">
                  <p className="text-xs text-[var(--text-secondary)] mb-1">Pushed to CRM:</p>
                  <p className="text-sm font-bold text-[var(--text-primary)] text-emerald-600">Ticket Status: Resolved</p>
                </div>
              </div>
            </div>

            {/* Right: Copy */}
            <div className="z-10 lg:pl-10">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <ArrowRightLeft className="w-7 h-7" />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
                Bi-directional data flow.
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                Our AI doesn't just push transcripts into your CRM after a call. It actively <span className="font-bold text-[var(--text-primary)]">pulls</span> data from your database before the call connects, allowing the agent to greet the caller by name and reference their exact account history.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[var(--color-primary-500)] flex-shrink-0" />
                  <p className="text-[var(--text-primary)] font-medium leading-relaxed">
                    Read customer tier, lifetime value, or recent orders instantly.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[var(--color-primary-500)] flex-shrink-0" />
                  <p className="text-[var(--text-primary)] font-medium leading-relaxed">
                    Write call summaries, sentiment scores, and follow-up tasks directly to the contact record.
                  </p>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. The "App Marketplace" Bento Grid */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              Plug and play integrations.
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              No code required for the tools you use every day. Authenticate with a single click and start mapping your data fields immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Branded Card 1: Salesforce Vibe */}
            <div className="bg-white border border-[var(--border-light)] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-md text-white">
                  <Database className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">CRM Systems</h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Deep, native syncing with Salesforce, HubSpot, GoHighLevel, and Pipedrive.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">Leads</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">Contacts</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">Tasks</span>
                </div>
              </div>
            </div>

            {/* Branded Card 2: Slack/Teams Vibe */}
            <div className="bg-white border border-[var(--border-light)] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A154B]/5 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#4A154B] rounded-xl flex items-center justify-center mb-6 shadow-md text-white">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Team Chat</h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Push instant alerts to Slack or Microsoft Teams when a hot lead transfers or a VIP calls.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold rounded-lg border border-[#4A154B]/20">Alerts</span>
                  <span className="px-3 py-1 bg-[#4A154B]/10 text-[#4A154B] text-xs font-bold rounded-lg border border-[#4A154B]/20">Transcripts</span>
                </div>
              </div>
            </div>

            {/* Branded Card 3: Zapier Vibe */}
            <div className="bg-white border border-[var(--border-light)] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mb-6 shadow-md text-white">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Automation</h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Connect to over 5,000+ apps using our native Zapier and Make.com integrations.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">Triggers</span>
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">Actions</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 4. Developer / Webhook Terminal (Dark Mode) */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-[#0B0F19] py-24 border-t border-[#1f2937] text-white relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[var(--color-primary-600)] rounded-full blur-[180px] opacity-20 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Copy for Developers */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-bold mb-6 border border-white/20">
                <Code2 className="w-4 h-4" /> Developer First
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                Build custom workflows <br /> with Webhooks & APIs.
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Need something entirely bespoke? Our robust API and realtime Webhooks let your engineering team subscribe to call events, fetch raw audio files, and programmatically trigger outbound dials.
              </p>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-500)]/20 flex items-center justify-center flex-shrink-0 border border-[var(--color-primary-500)]/30">
                    <Webhook className="w-5 h-5 text-[var(--color-primary-400)]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Real-time Webhooks</h4>
                    <p className="text-sm text-slate-400">Receive instant POST requests for events like <code className="text-[var(--color-primary-300)] bg-white/10 px-1 py-0.5 rounded">call.started</code>, <code className="text-[var(--color-primary-300)] bg-white/10 px-1 py-0.5 rounded">call.completed</code>, or <code className="text-[var(--color-primary-300)] bg-white/10 px-1 py-0.5 rounded">sentiment.dropped</code>.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                    <Lock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Secure & Scalable</h4>
                    <p className="text-sm text-slate-400">Authenticate via Bearer tokens. Our infrastructure handles massive concurrency spikes effortlessly.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right: Terminal Mockup */}
            <div className="bg-[#141414] rounded-2xl border border-white/10 overflow-hidden shadow-2xl font-mono text-sm transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              
              {/* Terminal Header */}
              <div className="bg-[#1c1c1c] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-slate-500 font-bold tracking-widest uppercase flex items-center gap-2">
                  <Terminal className="w-3 h-3" /> Webhook Payload
                </span>
              </div>
              
              {/* Terminal Body (JSON) */}
              <div className="p-6 text-slate-300 overflow-x-auto">
                <pre className="text-[13px] leading-relaxed">
                  <code className="text-slate-400">{`POST /api/webhooks/incoming HTTP/1.1`}</code><br/>
                  <code className="text-slate-400">{`Host: your-server.com`}</code><br/>
                  <code className="text-slate-400">{`Content-Type: application/json`}</code><br/>
                  <br/>
                  <code className="text-slate-300">{`{`}</code><br/>
                  <code className="text-blue-300">{`  "event"`}</code><code className="text-slate-300">{`: `}</code><code className="text-emerald-300">{`"call.completed"`}</code><code className="text-slate-300">{`,`}</code><br/>
                  <code className="text-blue-300">{`  "call_id"`}</code><code className="text-slate-300">{`: `}</code><code className="text-emerald-300">{`"call_98x2j10"`}</code><code className="text-slate-300">{`,`}</code><br/>
                  <code className="text-blue-300">{`  "data"`}</code><code className="text-slate-300">{`: {`}</code><br/>
                  <code className="text-blue-300">{`    "duration"`}</code><code className="text-slate-300">{`: `}</code><code className="text-amber-300">{`184`}</code><code className="text-slate-300">{`,`}</code><br/>
                  <code className="text-blue-300">{`    "sentiment"`}</code><code className="text-slate-300">{`: `}</code><code className="text-emerald-300">{`"positive"`}</code><code className="text-slate-300">{`,`}</code><br/>
                  <code className="text-blue-300">{`    "summary"`}</code><code className="text-slate-300">{`: `}</code><code className="text-emerald-300">{`"Client requested an upgrade. Scheduled a follow-up for Tuesday."`}</code><code className="text-slate-300">{`,`}</code><br/>
                  <code className="text-blue-300">{`    "extracted_variables"`}</code><code className="text-slate-300">{`: {`}</code><br/>
                  <code className="text-blue-300">{`      "intent"`}</code><code className="text-slate-300">{`: `}</code><code className="text-emerald-300">{`"upgrade"`}</code><code className="text-slate-300">{`,`}</code><br/>
                  <code className="text-blue-300">{`      "budget"`}</code><code className="text-slate-300">{`: `}</code><code className="text-emerald-300">{`"$5,000"`}</code><br/>
                  <code className="text-slate-300">{`    }`}</code><br/>
                  <code className="text-slate-300">{`  }`}</code><br/>
                  <code className="text-slate-300">{`}`}</code>
                </pre>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}