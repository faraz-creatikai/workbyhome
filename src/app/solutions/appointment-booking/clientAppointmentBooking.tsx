"use client";

import React from 'react';
import { 
  CalendarDays, 
  Clock, 
  Globe2, 
  Smartphone, 
  ArrowRight,
  Check,
  CalendarPlus,
  Users,
  Video,
  Mail,
  MessageSquare,
  Zap
} from 'lucide-react';

export default function AppointmentBookingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      
      {/* ---------------------------------------------------------------- */}
      {/* 1. Split Hero Section with Calendar Mockup */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden border-b border-[var(--border-light)]">
        {/* Subtle background gradient mesh */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-gradient-to-br from-[var(--color-primary-100)] to-violet-100 rounded-full blur-[100px] opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left: Copy */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-50)] border border-[var(--color-primary-200)] text-[var(--color-primary-700)] text-sm font-bold mb-6 shadow-sm">
                <CalendarPlus className="w-4 h-4" /> Fully Automated Scheduling
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-6">
                Your calendar, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-600)] to-violet-500">
                  booked solid by AI.
                </span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Let your AI Virtual Agent answer the phone, check your real-time availability, negotiate a time, and send the calendar invite—all without human intervention.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="px-8 py-4 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-xl text-base font-bold shadow-lg shadow-[var(--color-primary-500)]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                  Connect Your Calendar <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Modern UI Mockup */}
            <div className="flex-1 w-full max-w-lg mx-auto lg:max-w-none relative perspective-1000">
              <div className="relative bg-white border border-[var(--border-medium)] rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-6 z-20">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-[var(--border-light)] pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-[var(--color-primary-600)]" />
                    <span className="font-bold text-[var(--text-primary)]">Next Week</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md">Live Sync Active</span>
                </div>
                
                {/* Mock Calendar Grid */}
                <div className="space-y-3">
                  {/* Slot 1: Filled */}
                  <div className="flex items-center gap-4 p-3 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-light)]">
                    <div className="w-12 text-center">
                      <p className="text-xs font-bold text-[var(--text-secondary)]">TUE</p>
                      <p className="text-lg font-black text-[var(--text-primary)]">14</p>
                    </div>
                    <div className="flex-1 bg-white p-2 rounded-lg border border-[var(--border-light)] shadow-sm">
                      <p className="text-xs font-bold text-[var(--text-primary)]">Consultation Call</p>
                      <p className="text-[10px] text-[var(--text-tertiary)]">10:00 AM • Zoom</p>
                    </div>
                  </div>
                  
                  {/* Slot 2: AI Booking Animation */}
                  <div className="flex items-center gap-4 p-3 bg-blue-50/50 rounded-xl border border-blue-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                    <div className="w-12 text-center relative z-10">
                      <p className="text-xs font-bold text-blue-600">WED</p>
                      <p className="text-lg font-black text-blue-700">15</p>
                    </div>
                    <div className="flex-1 bg-white p-2 rounded-lg border border-blue-200 shadow-sm relative z-10 ring-2 ring-blue-400 ring-offset-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-blue-700">New Patient Intake</p>
                          <p className="text-[10px] text-blue-500">2:30 PM • Just booked by AI</p>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slot 3: Empty */}
                  <div className="flex items-center gap-4 p-3 bg-[var(--bg-primary)] rounded-xl border border-dashed border-[var(--border-medium)] opacity-70">
                    <div className="w-12 text-center">
                      <p className="text-xs font-bold text-[var(--text-secondary)]">THU</p>
                      <p className="text-lg font-black text-[var(--text-primary)]">16</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center py-3">
                      <p className="text-xs font-medium text-[var(--text-tertiary)]">Open Slot</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Background Element */}
              <div className="absolute top-10 -right-8 w-full h-full bg-[var(--color-primary-600)] rounded-3xl -z-10 rotate-3 opacity-10" />
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. The "Bento Box" Grid (Modern Layout) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Intelligence built into every slot.
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl text-lg">
              It doesn't just block time. It understands context, handles cancellations, and integrates with the tools you already rely on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
            
            {/* Bento 1: Large Integration Block (Spans 2 columns) */}
            <div className="md:col-span-2 bg-[var(--bg-primary)] rounded-3xl p-8 border border-[var(--border-light)] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex gap-4 mb-8">
                  <div className="w-14 h-14 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center text-blue-500">
                    <CalendarDays className="w-7 h-7" />
                  </div>
                  <div className="w-14 h-14 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center text-blue-600">
                    <Video className="w-7 h-7" />
                  </div>
                  <div className="w-14 h-14 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center text-rose-500">
                    <Mail className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Native Integrations</h3>
                <p className="text-[var(--text-secondary)] max-w-md leading-relaxed">
                  Connects natively to Google Workspace, Microsoft Outlook, and Calendly. When a booking occurs, it instantly generates a Zoom or Google Meet link and fires off email confirmations.
                </p>
              </div>
            </div>

            {/* Bento 2: Timezone Block */}
            <div className="bg-[var(--bg-primary)] rounded-3xl p-8 border border-[var(--border-light)] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5 text-[var(--color-primary-500)]">
                <Globe2 className="w-48 h-48" />
              </div>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 relative z-10">Timezone Agnostic</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed relative z-10">
                "What time is that in London?" The AI knows. It seamlessly translates local times for international callers without missing a beat.
              </p>
            </div>

            {/* Bento 3: Rescheduling */}
            <div className="bg-[var(--bg-primary)] rounded-3xl p-8 border border-[var(--border-light)] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Smart Rescheduling</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                If a client calls back to change their time, the AI locates their existing appointment, cancels it, and finds a new slot instantly.
              </p>
            </div>

            {/* Bento 4: SMS Follow-ups (Spans 2 columns) */}
            <div className="md:col-span-2 bg-[var(--color-primary-600)] rounded-3xl p-8 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-10 bottom-0 flex items-center opacity-20 pointer-events-none">
                <Smartphone className="w-40 h-40 text-white" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Automated SMS Reminders</h3>
                <p className="text-[var(--color-primary-100)] max-w-md leading-relaxed mb-6">
                  Reduce no-shows by up to 40%. The platform automatically sends out customizable text message reminders 24 hours and 1 hour before the scheduled meeting.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/20 text-white text-sm font-medium">
                  <Zap className="w-4 h-4 text-amber-300" /> Twilio integration built-in
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Vertical Conversation Timeline (Process Flow) */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-primary)] border-t border-[var(--border-light)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              A frictionless booking experience
            </h2>
            <p className="text-[var(--text-secondary)]">
              Listen to how smoothly the AI handles a multi-step booking request in real-time.
            </p>
          </div>

          <div className="relative">
            {/* The Vertical Line */}
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary-200)] via-[var(--color-primary-500)] to-emerald-400 md:-translate-x-1/2" />

            <div className="space-y-12">
              
              {/* Step 1: Caller */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                <div className="hidden md:block w-5/12 text-right pr-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">The Request</span>
                </div>
                <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-white border-4 border-[var(--color-primary-100)] rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-10 shadow-sm group-hover:border-[var(--color-primary-300)] transition-colors">
                  <Users className="w-5 h-5 text-[var(--text-primary)]" />
                </div>
                <div className="pl-20 md:pl-8 w-full md:w-5/12 pt-2 md:pt-0">
                  <div className="bg-[var(--bg-secondary)] p-4 rounded-2xl rounded-tl-sm md:rounded-tl-2xl border border-[var(--border-light)] shadow-sm">
                    <p className="text-sm text-[var(--text-primary)]">
                      "Hi, I need to schedule a tax consultation for sometime next Thursday afternoon."
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2: AI Checking */}
              <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center justify-between group">
                <div className="hidden md:block w-5/12 text-left pl-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-600)]">AI Action</span>
                </div>
                <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-[var(--color-primary-500)] border-4 border-white rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-10 shadow-md">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="pl-20 md:pr-8 w-full md:w-5/12 pt-2 md:pt-0">
                  <div className="bg-[var(--color-primary-50)] p-4 rounded-2xl rounded-tl-sm md:rounded-tr-sm md:rounded-tl-2xl border border-[var(--color-primary-200)] shadow-sm text-left md:text-right">
                    <p className="text-sm text-[var(--color-primary-800)]">
                      "I can certainly help with that. Looking at the calendar for next Thursday, I have a slot at 2:00 PM or 4:30 PM. Do either of those work for you?"
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3: Caller Confirms */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                <div className="hidden md:block w-5/12 text-right pr-8" />
                <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-white border-4 border-[var(--color-primary-100)] rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-10 shadow-sm">
                  <Users className="w-5 h-5 text-[var(--text-primary)]" />
                </div>
                <div className="pl-20 md:pl-8 w-full md:w-5/12 pt-2 md:pt-0">
                  <div className="bg-[var(--bg-secondary)] p-4 rounded-2xl rounded-tl-sm md:rounded-tl-2xl border border-[var(--border-light)] shadow-sm">
                    <p className="text-sm text-[var(--text-primary)]">
                      "Let's do 2:00 PM."
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4: AI Books */}
              <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center justify-between group">
                <div className="hidden md:block w-5/12 text-left pl-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Action Complete</span>
                </div>
                <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-10 shadow-md">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="pl-20 md:pr-8 w-full md:w-5/12 pt-2 md:pt-0">
                  <div className="bg-emerald-50 p-4 rounded-2xl rounded-tl-sm md:rounded-tr-sm md:rounded-tl-2xl border border-emerald-200 shadow-sm text-left md:text-right">
                    <p className="text-sm text-emerald-800">
                      "Perfect, you are booked for Thursday at 2:00 PM. I've just sent a calendar invite with the meeting link to your phone number. Have a great day!"
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}