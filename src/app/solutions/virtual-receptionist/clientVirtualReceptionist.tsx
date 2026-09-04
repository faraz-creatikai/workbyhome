"use client";

import React from 'react';
import { 
  PhoneCall, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Mail, 
  Bot, 
  ArrowRight,
  PhoneForwarded,
  BarChart3,
  Settings,
  Zap,
  Building,
  Stethoscope,
  Wrench,
  ShoppingCart,
  Users2,
  Play
} from 'lucide-react';

export default function VirtualReceptionistPage() {
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
          
          {/* Top Left: Sticky Note */}
          <div className="absolute top-12 left-10 -rotate-3 bg-[#fdf3c7] text-[#856404] p-5 w-56 rounded-sm shadow-md border border-[#fce996]">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-rose-500 shadow-sm" />
            <p className="font-medium text-sm leading-relaxed mb-3 mt-2">
              "Hi, thanks for calling! Would you like to book an appointment or speak to sales?"
            </p>
            <div className="flex items-center gap-2 bg-white/60 p-2 rounded-lg border border-white/40">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold">Perfect Intro</span>
            </div>
          </div>

          {/* Top Right: Reminders / Calendar Card */}
          <div className="absolute top-8 right-12 bg-[var(--bg-primary)] border border-[var(--border-light)] p-5 w-64 rounded-2xl shadow-xl shadow-[var(--color-primary-500)]/5 rotate-2">
            <div className="absolute -top-4 -left-4 bg-white border border-[var(--border-light)] shadow-sm rounded-full p-2.5">
              <Clock className="w-5 h-5 text-[var(--text-primary)]" />
            </div>
            <h4 className="text-[var(--text-primary)] font-bold text-sm mb-3 ml-2">Appointments</h4>
            <div className="bg-[var(--color-primary-50)] rounded-xl p-3 border border-[var(--color-primary-100)]">
              <p className="text-[var(--color-primary-700)] text-xs font-bold mb-1">Demo Call with Sarah</p>
              <p className="text-[var(--color-primary-600)] text-xs mb-2">Synced to Google Calendar</p>
              <div className="flex items-center gap-1 text-[var(--color-primary-500)] text-xs font-medium">
                <Calendar className="w-3.5 h-3.5" /> Today, 14:00 - 14:30
              </div>
            </div>
          </div>

          {/* Bottom Left: Task / Analytics Card */}
          <div className="absolute bottom-16 left-16 bg-[var(--bg-primary)] border border-[var(--border-light)] p-5 w-72 rounded-2xl shadow-xl shadow-[var(--color-primary-500)]/5 -rotate-2">
            <h4 className="text-[var(--text-primary)] font-bold text-sm mb-4">Today's Call Volume</h4>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-[var(--text-primary)]">Inbound Calls</span>
              </div>
              <span className="text-xs text-[var(--text-secondary)]">142</span>
            </div>
            <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2 mb-4 overflow-hidden">
              <div className="bg-[var(--color-primary-500)] h-2 rounded-full" style={{ width: '75%' }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-tertiary)]">Missed Calls: 0</span>
              <span className="text-xs font-bold text-[var(--color-primary-600)]">100% Answer Rate</span>
            </div>
          </div>

          {/* Bottom Right: Integrations Card */}
          <div className="absolute bottom-20 right-24 bg-[var(--bg-primary)] border border-[var(--border-light)] p-4 w-60 rounded-2xl shadow-xl shadow-[var(--color-primary-500)]/5 rotate-3">
            <h4 className="text-[var(--text-primary)] font-bold text-sm mb-3">Instant Routing</h4>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center border border-red-100 shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-500)] flex items-center justify-center border border-[var(--color-primary-100)] shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 shadow-sm">
                <PhoneForwarded className="w-5 h-5" />
              </div>
            </div>
          </div>

        </div>

        {/* Central Content */}
        <div className="relative z-20 max-w-3xl mx-auto text-center mt-10">
          <div className="w-20 h-20 mx-auto mb-6 bg-white border border-[var(--color-primary-200)] rounded-full shadow-lg shadow-[var(--color-primary-500)]/10 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary-500)] border-t-transparent animate-spin-slow opacity-20" />
            <div className="w-16 h-16 bg-[var(--color-primary-50)] rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-[var(--color-primary-600)]" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight mb-6">
            Answer every call, <br />
            <span className="text-[var(--text-secondary)] font-medium">never miss a lead.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Deploy an AI Virtual Receptionist that sounds perfectly human. It books appointments, answers FAQs, and routes urgent inquiries 24/7.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-full text-base font-bold shadow-lg shadow-[var(--color-primary-500)]/30 hover:shadow-[var(--color-primary-500)]/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
              <PhoneCall className="w-5 h-5" /> Build Your Voice Agent
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--bg-primary)] border border-[var(--border-medium)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-full text-base font-bold transition-all flex items-center justify-center gap-2">
              Hear a Demo <Play className="w-4 h-4" />
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
              More than just an answering machine
            </h2>
            <p className="text-[var(--text-secondary)]">
              Our AI doesn't just take messages; it actively resolves customer inquiries and drives your business forward while you sleep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--bg-primary)] p-8 rounded-3xl border border-[var(--border-light)] shadow-sm hover:border-[var(--color-primary-300)] transition-colors">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Smart Scheduling</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Connects directly to your calendar. The AI can find open slots, negotiate times with the caller, and book the meeting automatically.
              </p>
            </div>

            <div className="bg-[var(--bg-primary)] p-8 rounded-3xl border border-[var(--border-light)] shadow-sm hover:border-[var(--color-primary-300)] transition-colors">
              <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center mb-6">
                <PhoneForwarded className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Intelligent Routing</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                If a caller asks a complex question or demands a human, the AI seamlessly hot-transfers the call to the right department or takes a detailed message.
              </p>
            </div>

            <div className="bg-[var(--bg-primary)] p-8 rounded-3xl border border-[var(--border-light)] shadow-sm hover:border-[var(--color-primary-300)] transition-colors">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Instant Transcripts</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Every call is recorded, transcribed, and summarized. Key action items are pushed directly to your CRM or email the moment the caller hangs up.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. How It Works Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Live in less than 10 minutes
            </h2>
            <p className="text-[var(--text-secondary)]">
              No coding required. Train your AI just like you would train a human receptionist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-[var(--border-medium)] to-transparent" />

            {/* Step 1 */}
            <div className="relative text-center z-10">
              <div className="w-24 h-24 mx-auto bg-white border-2 border-[var(--border-medium)] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Settings className="w-10 h-10 text-[var(--color-primary-500)]" />
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] font-bold text-sm mb-4">1</span>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Define Your Rules</h3>
              <p className="text-[var(--text-secondary)] text-sm px-4">
                Upload your FAQs, define your business hours, and connect your calendar and CRM.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center z-10">
              <div className="w-24 h-24 mx-auto bg-white border-2 border-[var(--color-primary-400)] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[var(--color-primary-500)]/10 ring-4 ring-[var(--color-primary-50)]">
                <Bot className="w-10 h-10 text-[var(--color-primary-600)]" />
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary-600)] text-white font-bold text-sm mb-4">2</span>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Choose a Voice</h3>
              <p className="text-[var(--text-secondary)] text-sm px-4">
                Select from dozens of hyper-realistic AI voices and accents that match your brand identity.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center z-10">
              <div className="w-24 h-24 mx-auto bg-white border-2 border-[var(--border-medium)] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Zap className="w-10 h-10 text-[var(--color-primary-500)]" />
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] font-bold text-sm mb-4">3</span>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Forward Your Calls</h3>
              <p className="text-[var(--text-secondary)] text-sm px-4">
                Port your existing number or forward your calls to the AI during after-hours or busy periods.
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
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                Built for every industry
              </h2>
              <p className="text-[var(--text-secondary)]">
                Whatever your business, our AI adapts to your specific terminology and customer needs.
              </p>
            </div>
            <button className="text-[var(--color-primary-600)] font-semibold hover:underline flex items-center gap-1">
              View all solutions <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Real Estate */}
            <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-light)] hover:shadow-lg transition-all group">
              <Building className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-[var(--text-primary)] mb-2">Real Estate</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Qualify buyer leads, provide property details, and schedule viewings instantly.
              </p>
            </div>

            {/* Healthcare */}
            <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-light)] hover:shadow-lg transition-all group">
              <Stethoscope className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-[var(--text-primary)] mb-2">Medical & Dental</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Securely book patient appointments, handle reschedules, and answer clinic FAQs.
              </p>
            </div>

            {/* Home Services */}
            <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-light)] hover:shadow-lg transition-all group">
              <Wrench className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-[var(--text-primary)] mb-2">Home Services</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Dispatch plumbers, HVAC technicians, or electricians for emergency calls 24/7.
              </p>
            </div>

            {/* E-Commerce */}
            <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-light)] hover:shadow-lg transition-all group">
              <ShoppingCart className="w-8 h-8 text-violet-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-[var(--text-primary)] mb-2">E-Commerce</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Provide order status updates, process returns, and handle shipping inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Stats / Authority Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-20 bg-[var(--color-primary-600)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-[var(--color-primary-400)]">
            <div className="text-center md:px-8 py-4">
              <h4 className="text-4xl lg:text-5xl font-extrabold mb-2">24/7</h4>
              <p className="text-[var(--color-primary-100)] font-medium">Availability, Zero Sick Days</p>
            </div>
            <div className="text-center md:px-8 py-4">
              <h4 className="text-4xl lg:text-5xl font-extrabold mb-2">&lt; 1s</h4>
              <p className="text-[var(--color-primary-100)] font-medium">Average Response Time</p>
            </div>
            <div className="text-center md:px-8 py-4">
              <h4 className="text-4xl lg:text-5xl font-extrabold mb-2">60%</h4>
              <p className="text-[var(--color-primary-100)] font-medium">Reduction in Support Costs</p>
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
            <Users2 className="w-8 h-8 text-[var(--color-primary-600)]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            Stop missing calls. Start booking more business.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            Join thousands of businesses that rely on WorkByHome's AI Virtual Receptionist to scale their front desk operations effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-xl text-base font-bold shadow-lg shadow-[var(--color-primary-500)]/20 transition-all">
              Start Your Free Trial
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[var(--border-medium)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-xl text-base font-bold transition-all">
              Talk to Sales
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}