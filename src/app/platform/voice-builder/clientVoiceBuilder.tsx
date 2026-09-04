"use client";

import React from 'react';
import { 
  Mic, 
  GitBranch, 
  Play, 
  Cpu, 
  Volume2, 
  Sliders, 
  Globe2, 
  Zap,
  Bot,
  MessageSquare,
  PhoneForwarded,
  Code2,
  Database,
  Wand2,
  ArrowRight
} from 'lucide-react';

export default function AiVoiceBuilderPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden text-[var(--text-primary)] pt-20">
      
      {/* ---------------------------------------------------------------- */}
      {/* 1. Hero Section: Tall Pill Image & Floating Nodes */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--color-primary-50)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-20 w-[600px] h-[600px] bg-violet-100/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left: Copy */}
            <div className="flex-1 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-[var(--border-light)] text-[var(--color-primary-600)] text-sm font-bold mb-8">
                <GitBranch className="w-4 h-4" /> Visual Flow Builder
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
                Design conversations, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-600)] to-violet-500">
                  without writing code.
                </span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Drag, drop, and connect. Build powerful, logic-driven AI voice agents using our visual canvas. Map out entire call flows in minutes instead of months.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="px-8 py-4 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-2xl text-base font-bold shadow-xl shadow-[var(--color-primary-500)]/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                  Start Building Free <Wand2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Tall "Pill" Shape Image + UI Nodes */}
            <div className="flex-1 relative w-full flex justify-center lg:justify-end perspective-1000">
              
              {/* Tall Vertical Image */}
              <div className="relative w-[300px] sm:w-[360px] h-[500px] sm:h-[600px] rounded-[120px] overflow-hidden shadow-2xl border-8 border-white/50 backdrop-blur-sm z-10">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
                  alt="Data mapping on screen" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-900)]/80 via-transparent to-transparent" />
              </div>

              {/* Floating Node 1: Greeting */}
              <div className="absolute top-20 -left-6 sm:left-0 bg-white p-4 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border border-[var(--border-light)] z-20 w-56 animate-[float_4s_ease-in-out_infinite]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-[var(--text-primary)]">1. Greeting</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] p-2 rounded-lg border border-[var(--border-light)]">
                  "Hi there! Are you calling about sales or support?"
                </p>
                {/* Connection Line visual */}
                <div className="absolute -bottom-6 left-1/2 w-0.5 h-6 bg-gray-300" />
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-gray-300 bg-white" />
              </div>

              {/* Floating Node 2: Logic Split */}
              <div className="absolute bottom-40 -right-6 sm:right-10 bg-white p-4 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border border-[var(--border-light)] z-20 w-48 animate-[float_5s_ease-in-out_infinite_reverse]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-500 flex items-center justify-center">
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-[var(--text-primary)]">Condition</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-100">
                    If 'Sales' <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100">
                    If 'Support' <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Ultra-Wide Horizontal Canvas Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-light)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-6">
            The Infinite Canvas.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Design multi-turn conversations with infinite branching. Add webhooks, API calls, and live transfers exactly where you need them.
          </p>
        </div>

        {/* Ultra-Wide Image Container */}
        <div className="max-w-[96%] mx-auto relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
          <img 
            src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=2000" 
            alt="Abstract tech background or UI canvas" 
            className="w-full aspect-[21/9] md:aspect-[21/7] object-cover filter brightness-[0.85]"
          />
          
          {/* Overlay UI elements simulating a builder interface */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-900)]/90 via-[var(--color-primary-800)]/40 to-transparent flex items-center p-8 md:p-16">
            <div className="max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-white">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">API Nodes</h3>
              <p className="text-white/80 leading-relaxed mb-6 text-sm">
                Pause the conversation, query your backend for the customer's order status, and feed the data directly into the AI's response in real-time.
              </p>
              <button className="px-5 py-2.5 bg-white text-[var(--color-primary-700)] font-bold rounded-xl text-sm hover:scale-105 transition-transform">
                Explore Nodes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. The Voice Library (Grid with Circular Avatars & Waveforms) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                Voices so real, they'll ask "Are you human?"
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">
                Choose from over 100 hyper-realistic, latency-optimized voices across different genders, ages, and regional accents.
              </p>
            </div>
            <button className="flex items-center gap-2 text-[var(--color-primary-600)] font-bold hover:underline">
              Listen to Voice Gallery <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Voice Profile 1 */}
            <div className="bg-white border border-[var(--border-light)] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[var(--color-primary-300)] transition-all group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 p-1">
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150" alt="Avatar" className="w-full h-full object-cover rounded-full" />
                </div>
                <button className="w-10 h-10 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center group-hover:bg-[var(--color-primary-600)] group-hover:text-white transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
              <h4 className="font-bold text-[var(--text-primary)] text-lg">Sarah</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Friendly • US East Coast</p>
              {/* CSS Waveform */}
              <div className="flex items-end justify-between h-8 gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                {[4, 7, 3, 10, 5, 8, 4, 6, 9, 3, 7, 4, 8, 5, 10].map((h, i) => (
                  <div key={i} className="w-full bg-[var(--color-primary-500)] rounded-t-sm" style={{ height: `${h}0%` }} />
                ))}
              </div>
            </div>

            {/* Voice Profile 2 */}
            <div className="bg-white border border-[var(--border-light)] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 p-1">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Avatar" className="w-full h-full object-cover rounded-full" />
                </div>
                <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
              <h4 className="font-bold text-[var(--text-primary)] text-lg">Marcus</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Professional • British (UK)</p>
              <div className="flex items-end justify-between h-8 gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                {[6, 4, 8, 5, 3, 9, 7, 4, 10, 6, 8, 3, 5, 7, 4].map((h, i) => (
                  <div key={i} className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${h}0%` }} />
                ))}
              </div>
            </div>

            {/* Voice Profile 3 */}
            <div className="bg-white border border-[var(--border-light)] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 p-1">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" alt="Avatar" className="w-full h-full object-cover rounded-full" />
                </div>
                <button className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
              <h4 className="font-bold text-[var(--text-primary)] text-lg">Elena</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Warm • Spanish (ES)</p>
              <div className="flex items-end justify-between h-8 gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                {[3, 8, 6, 4, 10, 5, 7, 9, 4, 6, 8, 5, 7, 3, 10].map((h, i) => (
                  <div key={i} className="w-full bg-emerald-500 rounded-t-sm" style={{ height: `${h}0%` }} />
                ))}
              </div>
            </div>

            {/* Voice Profile 4 */}
            <div className="bg-white border border-[var(--border-light)] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 p-1">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" alt="Avatar" className="w-full h-full object-cover rounded-full" />
                </div>
                <button className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
              <h4 className="font-bold text-[var(--text-primary)] text-lg">David</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Energetic • Australian</p>
              <div className="flex items-end justify-between h-8 gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                {[10, 5, 7, 3, 8, 6, 9, 4, 7, 5, 10, 4, 8, 6, 3].map((h, i) => (
                  <div key={i} className="w-full bg-amber-500 rounded-t-sm" style={{ height: `${h}0%` }} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 4. Overlapping Square Layout (Prompt Engineering / Base Prompt) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Overlapping Square Images */}
            <div className="relative w-full h-[500px]">
              {/* Back Square Image */}
              <div className="absolute top-0 left-0 w-3/4 aspect-square rounded-[3rem] overflow-hidden shadow-xl border-4 border-white z-10">
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" 
                  alt="Code on screen" 
                  className="w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply" />
              </div>

              {/* Front Square Graphic (Offset) */}
              <div className="absolute bottom-0 right-0 w-[65%] aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white z-20 bg-slate-900 p-8 flex flex-col justify-center text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="w-6 h-6 text-[var(--color-primary-400)]" />
                  <span className="font-mono text-sm tracking-widest uppercase">System_Prompt</span>
                </div>
                <div className="bg-black/50 rounded-xl p-4 border border-white/10 font-mono text-sm text-slate-300 leading-relaxed overflow-hidden">
                  <span className="text-violet-400">Role:</span> Expert Sales SDR.<br/><br/>
                  <span className="text-emerald-400">Objective:</span> Qualify caller budget and timeline. If budget {'>'} $5k, execute 
                  <span className="text-amber-400"> {`{{transfer_to_closer}}`}</span>.
                  <br/><br/>
                  <span className="text-rose-400">Rules:</span> Never break character. Never mention you are an AI.
                </div>
              </div>
            </div>

            {/* Right: Copy */}
            <div className="z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-medium)] text-[var(--text-primary)] text-sm font-bold mb-6">
                <Cpu className="w-4 h-4 text-[var(--color-primary-600)]" /> Ultimate Brain Control
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
                Shape its brain with plain English.
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                You don't need to be an engineer. Program your agent's personality, boundaries, and logic simply by writing out a System Prompt in conversational text. 
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center flex-shrink-0">
                    <Sliders className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">Adjustable Creativity</h4>
                    <p className="text-sm text-[var(--text-secondary)]">Turn down the "temperature" for strict compliance (healthcare, legal), or turn it up for conversational sales.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">Context Injection</h4>
                    <p className="text-sm text-[var(--text-secondary)]">Inject dynamic variables like the caller's name, local weather, or account balance into the prompt before the call connects.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Dark Mode Testing Playground */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-[#0f1117] py-24 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--color-primary-600)] rounded-full blur-[150px] opacity-20" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Test before you deploy.
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            Try breaking your bot. Use the built-in simulator to roleplay different scenarios over your microphone before making the phone number live.
          </p>

          {/* Audio Simulator UI */}
          <div className="bg-[#1a1d27] border border-white/10 rounded-[2rem] p-8 shadow-2xl relative">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
              <span className="text-white/60 font-mono text-sm">Simulator Mode</span>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold bg-emerald-400/10 px-3 py-1 rounded-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> System Ready
              </div>
            </div>
            
            {/* Big Mic Button */}
            <div className="flex justify-center mb-10">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-[var(--color-primary-500)] rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--color-primary-600)] to-[var(--color-primary-400)] flex items-center justify-center shadow-inner ring-4 ring-[#1a1d27] group-hover:scale-105 transition-transform duration-300">
                  <Mic className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <p className="text-white font-medium text-lg mb-2">Click to start roleplay</p>
            <p className="text-slate-500 text-sm">Make sure your microphone is connected.</p>
          </div>
        </div>
      </div>

    </div>
  );
}