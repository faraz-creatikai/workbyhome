"use client";

import React from 'react';
import { 
  FileText, 
  Activity, 
  PieChart, 
  BarChart3, 
  BrainCircuit, 
  Zap,
  MessageSquare,
  Clock,
  ArrowRight,
  TrendingUp,
  Tag,
  Filter,
  Download,
  AlertCircle,
  CheckCircle2,
  Share2,
  Database,
  Bot
} from 'lucide-react';

export default function LiveTranscriptsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden text-[var(--text-primary)] pt-20">
      
      {/* ---------------------------------------------------------------- */}
      {/* 1. The "Live Stream" Hero Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative pt-20 pb-32 lg:pt-28 lg:pb-48 overflow-hidden bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
        
        {/* Abstract Background Meshes */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-[var(--color-primary-100)] rounded-full blur-[150px] opacity-70 pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[50%] bg-emerald-100 rounded-full blur-[150px] opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-[var(--border-light)] text-[var(--color-primary-600)] text-sm font-bold mb-8">
            <Activity className="w-4 h-4" /> Real-time Observability
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 max-w-4xl mx-auto">
            See every word. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-600)] to-emerald-500">
              Understand every caller.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Monitor active calls with millisecond-perfect live transcripts. Track sentiment, extract key insights, and turn voice data into your most powerful analytics tool.
          </p>
        </div>

        {/* 
          Massive Overlapping UI Mockup 
          Positioned absolute to overlap the next section 
        */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-150px] md:bottom-[-250px] w-full max-w-5xl px-4 z-20 perspective-1000">
          <div className="bg-white border border-[var(--border-medium)] rounded-t-[2rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col h-[400px] md:h-[500px] transform rotate-x-[5deg] origin-bottom">
            
            {/* Mockup Header */}
            <div className="h-16 border-b border-[var(--border-light)] flex justify-between items-center px-6 bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> LIVE CALL
                </div>
                <div className="h-4 w-px bg-[var(--border-medium)]" />
                <span className="text-sm font-bold text-[var(--text-primary)]">+1 (555) 892-1049</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-[var(--text-secondary)]"><Clock className="w-4 h-4 inline pb-0.5"/> 03:14</span>
                <button className="p-2 border border-[var(--border-light)] rounded-lg hover:bg-slate-100 text-[var(--text-secondary)]"><Download className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Mockup Body: Split Layout (Transcript & Meta) */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left: Live Transcript */}
              <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 space-y-6">
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[var(--color-primary-600)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[var(--text-secondary)] mb-1">AI Agent <span className="font-normal text-[var(--text-tertiary)] ml-2">03:10</span></p>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">I can definitely help you with that refund. Just to confirm, the order number was ending in 4921, correct?</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-slate-600">JS</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[var(--text-secondary)] mb-1">Customer <span className="font-normal text-[var(--text-tertiary)] ml-2">03:12</span></p>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed bg-yellow-100/50 inline-block px-1 rounded">Yes, that's right. And I'm quite frustrated because this is the second time this has happened.</p>
                  </div>
                </div>

                <div className="flex gap-4 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[var(--color-primary-600)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[var(--text-secondary)] mb-1">AI Agent</p>
                    {/* Typing indicator */}
                    <div className="flex items-center gap-1 h-5">
                      <span className="w-1.5 h-1.5 bg-[var(--color-primary-400)] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[var(--color-primary-400)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-1.5 h-1.5 bg-[var(--color-primary-400)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>

              </div>

              {/* Right: Live Meta Data (Hidden on mobile) */}
              <div className="hidden lg:block w-72 border-l border-[var(--border-light)] bg-white p-6">
                <h4 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-4">Live Insights</h4>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">Current Sentiment</span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Frustrated</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 w-full h-full relative">
                      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-sm left-[30%]" />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-sm font-semibold text-[var(--text-primary)] block mb-2">Auto-Tags</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-slate-100 border border-slate-200 text-slate-600 px-2 py-1 rounded-md flex items-center gap-1"><Tag className="w-3 h-3"/> Refund Request</span>
                    <span className="text-xs bg-slate-100 border border-slate-200 text-slate-600 px-2 py-1 rounded-md flex items-center gap-1"><Tag className="w-3 h-3"/> Repeat Issue</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Spacer to push content down below the absolute positioned hero mockup */}
      <div className="h-[150px] md:h-[250px] bg-[var(--bg-primary)]" />

      {/* ---------------------------------------------------------------- */}
      {/* 2. The "X-Ray" Feature (Sentiment & Intent) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-primary)] border-b border-[var(--border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left: Copy */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-bold mb-6 border border-amber-200">
                <BrainCircuit className="w-4 h-4" /> Contextual X-Ray
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
                Read between the lines. Automatically.
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                Transcripts are just raw text. Our engine runs NLP (Natural Language Processing) on every sentence to extract buying intent, emotional sentiment, and competitor mentions instantly.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">Intent Recognition</h4>
                    <p className="text-sm text-[var(--text-secondary)]">Automatically tag transcripts when a caller asks for pricing, mentions a competitor, or signals readiness to buy.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">Escalation Triggers</h4>
                    <p className="text-sm text-[var(--text-secondary)]">If sentiment drops below a certain threshold, the system can automatically ping a human supervisor to barge-in.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual Transcript UI with Highlights */}
            <div className="flex-1 relative w-full perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 to-rose-100 rounded-3xl blur-[80px] opacity-50" />
              <div className="relative bg-white border border-[var(--border-light)] rounded-[2rem] p-8 shadow-2xl">
                
                <h4 className="text-sm font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-6 border-b border-[var(--border-light)] pb-4">Parsed Transcript View</h4>
                
                <div className="space-y-4 text-sm leading-relaxed text-[var(--text-primary)]">
                  <p>
                    <span className="font-bold text-[var(--text-secondary)]">Caller: </span>
                    "I've been using your software for a year, but lately <span className="bg-rose-100 text-rose-900 px-1.5 py-0.5 rounded cursor-pointer relative group border-b-2 border-rose-300">it's been so slow and buggy
                      {/* Tooltip */}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">📉 Sentiment: Negative</span>
                    </span>. Honestly, I was <span className="bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded cursor-pointer relative group border-b-2 border-blue-300">looking at [Competitor X]
                      {/* Tooltip */}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">🔍 Tag: Competitor Mention</span>
                    </span> to see if they are better."
                  </p>
                  
                  <p>
                    <span className="font-bold text-[var(--text-secondary)]">AI Agent: </span>
                    "I deeply apologize for the latency issues. I'd love to make this right. If I can upgrade you to our premium server tier for free, would you be willing to stay?"
                  </p>
                  
                  <p>
                    <span className="font-bold text-[var(--text-secondary)]">Caller: </span>
                    "Oh, wow. Yes, <span className="bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded cursor-pointer relative group border-b-2 border-emerald-300">that sounds great. Let's do that.
                      {/* Tooltip */}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">✅ Intent: Retention Saved</span>
                    </span>"
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. The "Command Center" Analytics Grid (CSS Charts) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-secondary)] border-b border-[var(--border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              Metrics that matter.
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Move beyond basic call durations. Track conversation outcomes, objection handling success rates, and campaign ROI in beautiful dashboards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Call Outcomes (Donut Chart) */}
            <div className="bg-white p-8 rounded-[2rem] border border-[var(--border-light)] shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-[var(--text-primary)]">Call Outcomes</h3>
                <PieChart className="w-5 h-5 text-[var(--text-tertiary)]" />
              </div>
              <div className="flex flex-col items-center">
                {/* CSS Conic Gradient Donut Chart */}
                <div className="w-40 h-40 rounded-full mb-8 relative" style={{ background: 'conic-gradient(var(--color-primary-500) 0% 55%, #10b981 55% 85%, #f59e0b 85% 100%)' }}>
                  {/* Inner cutout */}
                  <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-black text-[var(--text-primary)]">1.2k</span>
                  </div>
                </div>
                {/* Legend */}
                <div className="w-full space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[var(--color-primary-500)]"/> Booked Meeting</span>
                    <span className="font-bold">55%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-emerald-500"/> Resolved FAQ</span>
                    <span className="font-bold">30%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-amber-500"/> Escalatated</span>
                    <span className="font-bold">15%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Call Volume (Bar Chart) */}
            <div className="bg-white p-8 rounded-[2rem] border border-[var(--border-light)] shadow-sm hover:shadow-lg transition-shadow lg:col-span-2">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-[var(--text-primary)]">Call Volume & Deflection</h3>
                <BarChart3 className="w-5 h-5 text-[var(--text-tertiary)]" />
              </div>
              
              <div className="h-48 flex items-end justify-between gap-2 md:gap-4 border-b border-[var(--border-light)] pb-2 mb-4">
                {/* CSS Bar Chart generation */}
                {[40, 60, 45, 80, 50, 90, 70].map((h, i) => (
                  <div key={i} className="w-full flex flex-col justify-end gap-1 group">
                    {/* Deflected (AI Handled) - Green */}
                    <div className="w-full bg-emerald-400 rounded-t-sm opacity-90 group-hover:opacity-100 transition-opacity relative" style={{ height: `${h * 0.7}%` }}>
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-700 opacity-0 group-hover:opacity-100">{Math.floor(h * 0.7 * 12)}</span>
                    </div>
                    {/* Human Handled - Blue */}
                    <div className="w-full bg-[var(--color-primary-200)] rounded-b-sm opacity-90 group-hover:opacity-100 transition-opacity" style={{ height: `${h * 0.3}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-[var(--text-tertiary)] font-bold mb-6">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-emerald-400"/> AI Handled (70%)</span>
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[var(--color-primary-200)]"/> Human Handled (30%)</span>
              </div>
            </div>

            {/* Card 3: Top Objections */}
            <div className="bg-white p-8 rounded-[2rem] border border-[var(--border-light)] shadow-sm hover:shadow-lg transition-shadow lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[var(--text-primary)]">Most Common Objections (Auto-Detected)</h3>
                <Filter className="w-5 h-5 text-[var(--text-tertiary)]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  { label: "Price is too high", val: 85 },
                  { label: "Using a competitor", val: 62 },
                  { label: "Need to speak to boss", val: 45 },
                  { label: "Not the right time", val: 30 }
                ].map((obj, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm font-bold text-[var(--text-primary)] mb-2">
                      <span>{obj.label}</span>
                      <span>{obj.val}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[var(--color-primary-500)] h-full rounded-full" style={{ width: `${obj.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 4. Automated Post-Call Actions (Dark Pipeline Visualization) */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-[#0B0F19] py-24 border-t border-[#1f2937] text-slate-300 relative overflow-hidden">
        
        {/* Glows */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-primary-600)] rounded-full blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              The call ends. <br /> The automation begins.
            </h2>
            <p className="text-lg text-slate-400">
              Stop forcing your team to do manual data entry. WorkByHome automatically pushes transcripts, summaries, and action items to your favorite tools the second the caller hangs up.
            </p>
          </div>

          {/* Pipeline Visual */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0 relative max-w-5xl mx-auto">
            
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-slate-700 via-[var(--color-primary-500)] to-emerald-500 -translate-y-1/2 z-0" />

            {/* Node 1: Call End */}
            <div className="relative z-10 flex flex-col items-center group">
              <div className="w-20 h-20 bg-[#1A1F2E] border-2 border-slate-700 rounded-2xl flex items-center justify-center mb-4 group-hover:border-[var(--color-primary-400)] transition-colors shadow-xl">
                <FileText className="w-8 h-8 text-slate-400 group-hover:text-[var(--color-primary-400)] transition-colors" />
              </div>
              <h4 className="text-white font-bold text-sm">Transcript Generated</h4>
            </div>

            {/* Node 2: AI Summarization */}
            <div className="relative z-10 flex flex-col items-center group mt-8 lg:mt-0">
              <div className="w-20 h-20 bg-[#1A1F2E] border-2 border-slate-700 rounded-2xl flex items-center justify-center mb-4 group-hover:border-[var(--color-primary-400)] transition-colors shadow-xl relative">
                <BrainCircuit className="w-8 h-8 text-[var(--color-primary-500)]" />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--color-primary-500)] rounded-full animate-ping opacity-75" />
              </div>
              <h4 className="text-white font-bold text-sm">AI Extracts Data</h4>
            </div>

            {/* Node 3 & 4 (Branching) */}
            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 mt-8 lg:mt-0">
              {/* Branch 1: CRM */}
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 bg-[#1A1F2E] border-2 border-slate-700 rounded-2xl flex items-center justify-center mb-4 group-hover:border-emerald-400 transition-colors shadow-xl">
                  <Database className="w-8 h-8 text-emerald-500" />
                </div>
                <h4 className="text-white font-bold text-sm text-center">Pushed to CRM<br/><span className="text-xs text-slate-500 font-normal">HubSpot / Salesforce</span></h4>
              </div>
              
              {/* Branch 2: Alerts */}
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 bg-[#1A1F2E] border-2 border-slate-700 rounded-2xl flex items-center justify-center mb-4 group-hover:border-amber-400 transition-colors shadow-xl">
                  <MessageSquare className="w-8 h-8 text-amber-500" />
                </div>
                <h4 className="text-white font-bold text-sm text-center">Team Alerted<br/><span className="text-xs text-slate-500 font-normal">Slack / Teams / Email</span></h4>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}