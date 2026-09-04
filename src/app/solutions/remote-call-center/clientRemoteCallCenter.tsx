"use client";

import React from 'react';
import { 
  Headset, 
  Activity, 
  BarChart2, 
  Globe, 
  Users, 
  Volume2, 
  Play,
  Pause,
  Settings, 
  ShieldCheck, 
  Layers, 
  Mic,
  ArrowUpRight,
  Search,
  Bell,
  MoreHorizontal,
  CheckCircle2
} from 'lucide-react';

export default function RemoteCallCenterPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden text-[var(--text-primary)] pt-20">
      
      {/* ---------------------------------------------------------------- */}
      {/* 1. SaaS Dashboard Hero (Dribbble Style) */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative pt-16 pb-12 overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-primary-100)] rounded-full blur-[120px] opacity-60 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-sm font-bold mb-6 border border-[var(--color-primary-200)] shadow-sm">
            <Layers className="w-4 h-4" /> Enterprise Infrastructure
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Scale your call center <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-600)] to-violet-600">
              from 1 to 10,000 agents.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
            Instantly deploy a limitless workforce of AI agents that sound human, learn from every interaction, and never put a customer on hold.
          </p>
        </div>

        {/* Huge Dashboard Mockup Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative perspective-1000">
          <div className="bg-white border border-[var(--border-medium)] rounded-[2rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col h-[500px] lg:h-[600px]">
            
            {/* Dashboard Top Bar */}
            <div className="h-16 border-b border-[var(--border-light)] flex items-center justify-between px-6 bg-slate-50/50 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="h-4 w-px bg-[var(--border-medium)] mx-2" />
                <div className="flex items-center gap-2 bg-white border border-[var(--border-light)] px-3 py-1.5 rounded-lg shadow-sm">
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400 font-medium">Search active calls...</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-primary-500)] to-violet-500" />
              </div>
            </div>

            {/* Dashboard Body */}
            <div className="flex-1 flex overflow-hidden bg-slate-50/30">
              
              {/* Sidebar */}
              <div className="w-20 lg:w-64 border-r border-[var(--border-light)] flex flex-col p-4 gap-2 bg-white">
                <div className="flex items-center gap-3 p-3 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] rounded-xl cursor-pointer">
                  <Activity className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden lg:block font-bold text-sm">Live Operations</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[var(--text-tertiary)] hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                  <Users className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden lg:block font-semibold text-sm">Agent Workforce</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-[var(--text-tertiary)] hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                  <BarChart2 className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden lg:block font-semibold text-sm">Analytics</span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-6 overflow-hidden flex flex-col gap-6">
                
                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[var(--border-light)] shadow-sm">
                    <p className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Active AI Agents</p>
                    <div className="flex items-end gap-3">
                      <h3 className="text-3xl font-black text-[var(--text-primary)]">2,408</h3>
                      <span className="flex items-center text-emerald-500 text-xs font-bold mb-1"><ArrowUpRight className="w-3 h-3"/> 12%</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[var(--border-light)] shadow-sm">
                    <p className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Calls In Queue</p>
                    <div className="flex items-end gap-3">
                      <h3 className="text-3xl font-black text-[var(--text-primary)]">0</h3>
                      <span className="text-slate-400 text-xs font-bold mb-1">Instant pickup</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[var(--border-light)] shadow-sm">
                    <p className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Avg QA Score</p>
                    <div className="flex items-end gap-3">
                      <h3 className="text-3xl font-black text-[var(--text-primary)]">99.8%</h3>
                      <span className="flex items-center text-emerald-500 text-xs font-bold mb-1"><ArrowUpRight className="w-3 h-3"/> 0.2%</span>
                    </div>
                  </div>
                </div>

                {/* Table Mockup */}
                <div className="flex-1 bg-white border border-[var(--border-light)] rounded-2xl shadow-sm overflow-hidden flex flex-col">
                  <div className="px-6 py-4 border-b border-[var(--border-light)] flex justify-between items-center bg-slate-50">
                    <h4 className="font-bold text-[var(--text-primary)] text-sm">Live Calls (Filtered: Support)</h4>
                    <MoreHorizontal className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="p-2 flex-1">
                    {[
                      { status: 'Talking', agent: 'Agent-X1', phone: '+1 (555) 019-2831', duration: '04:12', sentiment: 'Positive', color: 'emerald' },
                      { status: 'Listening', agent: 'Agent-X4', phone: '+44 20 7123 4567', duration: '01:45', sentiment: 'Neutral', color: 'blue' },
                      { status: 'Wrap-up', agent: 'Agent-Y2', phone: '+1 (555) 982-1102', duration: '08:30', sentiment: 'Positive', color: 'emerald' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl border border-transparent hover:border-[var(--border-light)] cursor-pointer transition-colors mb-1">
                        <div className="flex items-center gap-4 w-1/4">
                          <div className="relative">
                            <Headset className={`w-5 h-5 text-${row.color}-500`} />
                            <span className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-${row.color}-500 ring-2 ring-white ${row.status === 'Talking' ? 'animate-pulse' : ''}`} />
                          </div>
                          <span className="text-sm font-bold text-[var(--text-primary)]">{row.agent}</span>
                        </div>
                        <div className="w-1/4 text-sm text-[var(--text-secondary)] font-medium">{row.phone}</div>
                        <div className="w-1/6 text-sm text-[var(--text-tertiary)] font-mono">{row.duration}</div>
                        <div className="w-1/6">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${row.sentiment === 'Positive' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                            {row.sentiment}
                          </span>
                        </div>
                        <div className="w-12 flex justify-end">
                          <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400"><Play className="w-4 h-4 fill-current"/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* Faded overlay for effect at the bottom of dashboard */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-primary)] to-transparent z-20 pointer-events-none" />
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Scale / Big Numbers Banner */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-20 border-y border-[var(--border-light)] bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--border-light)] text-center">
            <div className="py-4">
              <h4 className="text-4xl md:text-5xl font-black text-[var(--color-primary-600)] mb-2">0s</h4>
              <p className="text-[var(--text-secondary)] font-bold uppercase tracking-wider text-sm">Hold Times</p>
            </div>
            <div className="py-4">
              <h4 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-2">10k+</h4>
              <p className="text-[var(--text-secondary)] font-bold uppercase tracking-wider text-sm">Concurrent Calls</p>
            </div>
            <div className="py-4">
              <h4 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-2">24/7</h4>
              <p className="text-[var(--text-secondary)] font-bold uppercase tracking-wider text-sm">Uptime Coverage</p>
            </div>
            <div className="py-4">
              <h4 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-2">100%</h4>
              <p className="text-[var(--text-secondary)] font-bold uppercase tracking-wider text-sm">Script Compliance</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. The Bento-Box Analytics Grid (Visual Features) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Total visibility into every conversation.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Manage your AI workforce exactly like you manage human agents, but with superhuman data tracking and zero manual QA.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Bento 1: Live Monitoring (Spans 2 columns) */}
            <div className="lg:col-span-2 bg-slate-900 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <Mic className="w-7 h-7 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Live Call Monitoring</h3>
                  <p className="text-slate-400 max-w-md leading-relaxed mb-8">
                    Listen to any active AI call in real-time. View live transcripts as they happen, and monitor customer sentiment dynamically.
                  </p>
                </div>

                {/* Simulated Soundwave UI */}
                <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Live Audio Stream</span>
                    <span className="flex items-center gap-2 text-xs font-medium text-slate-300">
                      <Volume2 className="w-4 h-4" /> 02:44
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1 h-12">
                    {/* CSS Animated Soundwave Bars */}
                    {[40, 70, 40, 100, 60, 30, 80, 50, 90, 40, 70, 30, 80, 60, 100, 40, 70].map((height, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 bg-indigo-500 rounded-full animate-pulse" 
                        style={{ 
                          height: `${height}%`, 
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '0.8s'
                        }} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bento 2: Automated QA (1 Column) */}
            <div className="bg-[var(--bg-secondary)] rounded-[2rem] p-8 md:p-10 border border-[var(--border-light)] shadow-sm relative overflow-hidden group">
              <div className="w-14 h-14 bg-white border border-[var(--border-medium)] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Automated QA</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                Say goodbye to random sampling. Every single call is recorded, transcribed, and graded automatically against your compliance and quality standards.
              </p>
              
              <div className="mt-auto bg-white border border-[var(--border-light)] rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-[var(--text-tertiary)]">Scorecard</span>
                  <span className="text-xs font-black text-emerald-600">100/100</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-primary)] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Greeting Adherence
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-primary)] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Empathy Detected
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-primary)] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Goal Achieved
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 4. Manager's Dark View (Supervisor Takeover) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[#0B0F19] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left: Interactive/Code-like visual */}
            <div className="flex-1 w-full relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary-500)] to-rose-500 rounded-[2rem] blur opacity-30" />
              <div className="relative bg-[#1A1F2E] border border-white/10 rounded-[2rem] p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Supervisor Actions</span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Volume2 className="w-5 h-5 text-indigo-400" />
                        <span className="font-bold text-sm">Whisper Mode</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Feed live instructions to the AI agent during a call.</p>
                  </div>

                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 hover:bg-rose-500/20 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-rose-400" />
                        <span className="font-bold text-sm text-rose-100">Barge-in / Takeover</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-rose-500 group-hover:text-rose-300 transition-colors" />
                    </div>
                    <p className="text-xs text-rose-300/70 mt-2">Instantly disconnect the AI and take over the line as a human.</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Pause className="w-5 h-5 text-amber-400" />
                        <span className="font-bold text-sm">Force Pause Campaign</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Halt outbound dialing instantly across 10,000 active channels.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Copy */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                Total control when it matters most.
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Even with AI, humans need to stay in the loop. Our supervisor dashboard gives you god-mode access to your entire virtual floor. Monitor sentiment spikes, whisper instructions to the AI, or barge-in and take over the call instantly if a VIP customer needs a human touch.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 border-l-2 border-[var(--color-primary-500)] pl-4">
                  <span className="w-8 h-8 rounded-full bg-[var(--color-primary-500)]/20 flex items-center justify-center text-[var(--color-primary-400)] font-bold text-sm">1</span>
                  <p className="text-sm font-medium text-slate-300">Set automatic escalation triggers based on sentiment.</p>
                </div>
                <div className="flex items-center gap-4 border-l-2 border-emerald-500 pl-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">2</span>
                  <p className="text-sm font-medium text-slate-300">Route complex, high-value tickets directly to human closers.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Global Reach (Map/Language Grid) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-full mb-6">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 max-w-3xl mx-auto">
            A workforce that speaks the world's languages.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-16">
            Provision local phone numbers in over 50 countries instantly. The AI automatically detects the caller's language and switches fluently in real-time.
          </p>

          {/* Simple stylized language tags */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {['English (US, UK, AU)', 'Spanish (ES, MX)', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Mandarin', 'Hindi', 'Arabic', 'Dutch', 'Korean', '+30 More'].map((lang, i) => (
              <div 
                key={i}
                className="px-6 py-3 bg-white border border-[var(--border-medium)] rounded-full text-sm font-bold text-[var(--text-primary)] shadow-sm hover:border-[var(--color-primary-400)] hover:text-[var(--color-primary-600)] transition-colors cursor-default"
              >
                {lang}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}