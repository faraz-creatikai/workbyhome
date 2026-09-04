"use client";

import React from 'react';
import { 
  Repeat, 
  Clock, 
  Mail, 
  MessageSquare, 
  Phone, 
  Activity, 
  Sparkles, 
  Zap,
  CheckCircle2,
  CalendarCheck,
  ArrowRight,
  RefreshCw,
  Target
} from 'lucide-react';

export default function AutomatedFollowUpsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden text-[var(--text-primary)] pt-20">
      
      {/* ---------------------------------------------------------------- */}
      {/* 1. Editorial Split Hero with Large Imagery */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative py-16 lg:py-24 overflow-hidden border-b border-[var(--border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left: Copy */}
            <div className="flex-1 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-6 border border-emerald-200">
                <Repeat className="w-4 h-4" /> Relentless Consistency
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                Never let another lead <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-600)] to-emerald-500">
                  go cold.
                </span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Most sales require 5 to 8 touchpoints. Your team stops at 2. Deploy an AI agent that automatically follows up across Voice, SMS, and Email until you get a response.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="px-8 py-4 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-xl text-base font-bold shadow-lg shadow-[var(--color-primary-500)]/20 transition-all flex items-center justify-center gap-2">
                  Build a Follow-up Sequence
                </button>
              </div>
            </div>

            {/* Right: Large Image with Floating Elements */}
            <div className="flex-1 w-full relative perspective-1000">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-[var(--border-light)]">
                {/* Dummy Image from Unsplash */}
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
                  alt="Team working and tracking leads" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                
                {/* Floating Glassmorphism Badge */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white">
                    <p className="text-sm font-bold drop-shadow-sm">Response Received!</p>
                    <p className="text-xs text-white/80 drop-shadow-sm">Lead replied after 4th touchpoint (Day 12).</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. The Horizontal Cadence Timeline */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-secondary)] border-b border-[var(--border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              The Omnichannel Sequence
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Combine channels to maximize response rates. When a lead replies, the AI instantly stops the sequence and notifies your team.
            </p>
          </div>

          <div className="relative">
            {/* Horizontal Line connecting nodes (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[var(--border-medium)] -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              
              {/* Day 1 */}
              <div className="flex flex-col items-center text-center">
                <span className="text-xs font-black text-[var(--text-tertiary)] uppercase tracking-widest mb-4">Day 1</span>
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border-4 border-white shadow-md mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">Initial Call</h3>
                <p className="text-sm text-[var(--text-secondary)] px-4">AI calls the lead instantly. If no answer, leaves a dynamic voicemail.</p>
              </div>

              {/* Day 2 */}
              <div className="flex flex-col items-center text-center">
                <span className="text-xs font-black text-[var(--text-tertiary)] uppercase tracking-widest mb-4">Day 2</span>
                <div className="w-16 h-16 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center border-4 border-white shadow-md mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">SMS Bump</h3>
                <p className="text-sm text-[var(--text-secondary)] px-4">Sends a conversational text referencing the missed call yesterday.</p>
              </div>

              {/* Day 5 */}
              <div className="flex flex-col items-center text-center">
                <span className="text-xs font-black text-[var(--text-tertiary)] uppercase tracking-widest mb-4">Day 5</span>
                <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center border-4 border-white shadow-md mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">Value Email</h3>
                <p className="text-sm text-[var(--text-secondary)] px-4">Drops a personalized email with a case study or valuable resource.</p>
              </div>

              {/* Day 14 */}
              <div className="flex flex-col items-center text-center">
                <span className="text-xs font-black text-[var(--text-tertiary)] uppercase tracking-widest mb-4">Day 14</span>
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)] flex items-center justify-center border-4 border-white shadow-md mb-4">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">The Breakup Call</h3>
                <p className="text-sm text-[var(--text-secondary)] px-4">A final automated call to close the file or generate an urgent reply.</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Alternating Editorial Feature Blocks */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 overflow-hidden bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          
          {/* Feature Block 1: Speed to Lead */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 w-full">
              <div className="relative rounded-[2rem] overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Professional typing on laptop" 
                  className="w-full h-[450px] object-cover"
                />
                {/* Floating Metric */}
                <div className="absolute top-6 left-6 bg-white rounded-xl p-4 shadow-lg flex items-center gap-4 border border-[var(--border-light)]">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Speed to Lead</p>
                    <p className="text-xl font-black text-[var(--text-primary)]">&lt; 30 Seconds</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
                Strike while the iron is hot.
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                The odds of qualifying a lead drop by 80% if you wait more than 5 minutes to contact them. Connect your web forms, Facebook Ads, or Zillow leads to our platform, and the AI will call them within seconds of submission.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-[var(--text-primary)] font-medium">Instantly trigger calls via Zapier or API webhooks.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-[var(--text-primary)] font-medium">Out-pace your competitors who rely on manual dialing.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature Block 2: Reviving Dead Leads */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1 w-full">
              <div className="relative rounded-[2rem] overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1638262052640-82e94d64664a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFuZHNoYWtlfGVufDB8fDB8fHww" 
                  alt="Client shaking hands or smiling" 
                  className="w-full h-[450px] object-cover"
                />
                {/* Floating Chat Bubble */}
                <div className="absolute bottom-6 right-6 bg-slate-900 rounded-xl p-5 shadow-lg border border-slate-700 max-w-xs">
                  <p className="text-slate-300 text-sm italic mb-2">"Hey, sorry I missed you last month! Yes, I'm still interested in looking at properties."</p>
                  <p className="text-emerald-400 text-xs font-bold flex items-center gap-1"><Target className="w-3 h-3" /> Reactivated Lead</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
                Turn your database into a goldmine.
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                You already paid for the leads in your CRM; don't let them go to waste. Automatically run "win-back" campaigns on leads that went dark 3, 6, or 12 months ago.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-[var(--text-primary)] font-medium">Bulk-import old CSV files and let the AI find the warm ones.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-[var(--text-primary)] font-medium">Conversational openers designed specifically for re-engagement.</p>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 4. CRM Synchronization Banner (Dark) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-20 bg-slate-950 text-white relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary-600)] opacity-20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600 opacity-20 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20 backdrop-blur-md">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto">
            It knows when to stop.
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            The worst thing an automated system can do is annoy a customer who already replied. Our AI integrates natively with your inbox and CRM. If a lead calls back, replies to a text, or emails you, the follow-up sequence halts instantly.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium">
               Salesforce Ready
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium">
               HubSpot Sync
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium">
               GoHighLevel Native
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium">
               Zapier Connected
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}