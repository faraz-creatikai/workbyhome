"use client";

import React from 'react';
import { 
  Database, 
  Brain, 
  Link as LinkIcon, 
  FileText, 
  RefreshCw, 
  ShieldCheck, 
  Lock, 
  Search, 
  Zap, 
  FileJson,
  LayoutTemplate,
  Fingerprint,
  HardDrive
} from 'lucide-react';

export default function KnowledgeEnginePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden text-[var(--text-primary)] pt-20">
      
      {/* ---------------------------------------------------------------- */}
      {/* 1. The "Data Core" Hero Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative pt-20 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
        
        {/* Subtle Grid Background */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, var(--color-primary-500) 1px, transparent 1px), linear-gradient(to bottom, var(--color-primary-500) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-sm font-bold mb-8 border border-[var(--color-primary-200)] shadow-sm">
            <Brain className="w-4 h-4" /> The AI Brain
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Give your AI agents <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-500)] to-emerald-500">
              a perfect memory.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-16 max-w-2xl mx-auto leading-relaxed">
            Don't rely on basic prompts. Upload your entire company knowledge base, and let the AI retrieve the exact right answer in milliseconds during a live call.
          </p>
        </div>

        {/* Animated CSS Data Core Graphic */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto z-10 perspective-1000">
          {/* Outer Rotating Dashed Ring */}
          <div className="absolute inset-0 border-4 border-dashed border-[var(--color-primary-300)] rounded-full animate-[spin_15s_linear_infinite]" />
          
          {/* Middle Rotating Solid Ring (Reverse) */}
          <div className="absolute inset-4 border-2 border-[var(--color-primary-200)] rounded-full animate-[spin_10s_linear_infinite_reverse]" />
          
          {/* Inner Glowing Core */}
          <div className="absolute inset-10 bg-gradient-to-tr from-[var(--color-primary-600)] to-emerald-400 rounded-full shadow-[0_0_60px_-10px_var(--color-primary-500)] flex items-center justify-center animate-pulse">
            <Database className="w-16 h-16 text-white absolute mix-blend-overlay opacity-50" />
            <Brain className="w-16 h-16 text-white relative z-10 drop-shadow-lg" />
          </div>

          {/* Floating Data Nodes around the core */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-xl shadow-lg border border-[var(--border-light)] flex items-center gap-2">
            <FileText className="w-4 h-4 text-rose-500" /> <span className="text-xs font-bold">PDF Parsed</span>
          </div>
          <div className="absolute bottom-10 -left-10 bg-white p-2 rounded-xl shadow-lg border border-[var(--border-light)] flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-blue-500" /> <span className="text-xs font-bold">URL Scraped</span>
          </div>
          <div className="absolute bottom-10 -right-10 bg-white p-2 rounded-xl shadow-lg border border-[var(--border-light)] flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-500" /> <span className="text-xs font-bold">Zendesk Synced</span>
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Sticky-Scroll Storytelling Section */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-[var(--bg-secondary)] border-y border-[var(--border-light)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col lg:flex-row items-start gap-16 relative">
          
          {/* Left: Sticky Content (Stays pinned while scrolling) */}
          <div className="lg:w-5/12 lg:sticky lg:top-32 relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
              How the Knowledge Engine works.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
              We use advanced RAG (Retrieval-Augmented Generation) technology customized specifically for low-latency voice applications. 
            </p>
            <p className="text-base text-[var(--text-tertiary)] hidden lg:block">
              Scroll to see how raw data is transformed into instant intelligence during a live phone call.
            </p>
          </div>

          {/* Right: Scrolling Cards */}
          <div className="lg:w-7/12 flex flex-col gap-10 relative z-10">
            
            {/* Step 1 */}
            <div className="bg-[var(--bg-primary)] p-8 md:p-10 rounded-[2rem] border border-[var(--border-light)] shadow-xl shadow-[var(--color-primary-500)]/5">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                <HardDrive className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">1. Ingestion & Scraping</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                You drop a 100-page PDF manual or paste your website's sitemap URL. Our engine instantly scrapes the text, strips out the junk HTML/formatting, and cleans the raw data.
              </p>
              <div className="bg-[var(--bg-secondary)] rounded-xl p-4 font-mono text-xs text-[var(--text-tertiary)] border border-[var(--border-light)]">
                {`> Processing https://docs.yourcompany.com/*`} <br/>
                {`> 420 pages discovered...`} <br/>
                {`> HTML stripped, pure text extracted.`}
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[var(--bg-primary)] p-8 md:p-10 rounded-[2rem] border border-[var(--border-light)] shadow-xl shadow-[var(--color-primary-500)]/5">
              <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mb-6 border border-violet-100">
                <LayoutTemplate className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">2. Semantic Chunking</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                The engine breaks your massive documents down into small, digestible "chunks" of context. Each chunk is mathematically mapped (vectorized) based on its meaning, not just keywords.
              </p>
              <div className="flex gap-2">
                <div className="h-2 w-1/4 bg-violet-200 rounded-full" />
                <div className="h-2 w-1/3 bg-violet-300 rounded-full" />
                <div className="h-2 w-1/6 bg-violet-400 rounded-full" />
                <div className="h-2 w-1/4 bg-violet-500 rounded-full" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[var(--bg-primary)] p-8 md:p-10 rounded-[2rem] border border-[var(--border-light)] shadow-xl shadow-[var(--color-primary-500)]/5">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 border border-amber-100">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">3. Sub-Second Retrieval</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                When a customer asks a question on the phone, the AI translates their speech, searches your vectorized database, and retrieves the exact policy or answer in under 200 milliseconds—so there is zero awkward silence on the call.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Masonry Layout: Supported Data Sources */}
      {/* ---------------------------------------------------------------- */}
      <div className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              Connect what you already have.
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              No need to rewrite your knowledge base. Sync directly with your existing tools, and the AI will auto-update whenever you make changes.
            </p>
          </div>

          {/* Custom Asymmetric Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[160px]">
            
            {/* Box 1 (Wide) */}
            <div className="col-span-2 row-span-1 bg-rose-50 rounded-3xl p-6 flex items-center justify-between border border-rose-100 hover:scale-[1.02] transition-transform cursor-pointer">
              <div>
                <h4 className="text-xl font-bold text-rose-900 mb-1">Static Files</h4>
                <p className="text-sm text-rose-700">PDF, DOCX, TXT, CSV</p>
              </div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                <FileText className="w-8 h-8 text-rose-500" />
              </div>
            </div>

            {/* Box 2 (Square) */}
            <div className="col-span-1 row-span-1 bg-emerald-50 rounded-3xl p-6 flex flex-col justify-center items-center text-center border border-emerald-100 hover:scale-[1.02] transition-transform cursor-pointer">
              <LinkIcon className="w-8 h-8 text-emerald-600 mb-3" />
              <h4 className="text-sm font-bold text-emerald-900">Website Crawling</h4>
            </div>

            {/* Box 3 (Tall) */}
            <div className="col-span-1 row-span-2 bg-blue-50 rounded-3xl p-6 flex flex-col justify-between border border-blue-100 hover:scale-[1.02] transition-transform cursor-pointer">
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-2">Help Centers</h4>
                <p className="text-sm text-blue-700">Native sync with Zendesk & Intercom</p>
              </div>
              <div className="flex justify-end">
                <RefreshCw className="w-12 h-12 text-blue-300" />
              </div>
            </div>

            {/* Box 4 (Square) */}
            <div className="col-span-1 row-span-1 bg-[var(--color-primary-50)] rounded-3xl p-6 flex flex-col justify-center items-center text-center border border-[var(--color-primary-100)] hover:scale-[1.02] transition-transform cursor-pointer">
              <FileJson className="w-8 h-8 text-[var(--color-primary-600)] mb-3" />
              <h4 className="text-sm font-bold text-[var(--color-primary-900)]">REST API</h4>
            </div>

            {/* Box 5 (Wide) */}
            <div className="col-span-2 row-span-1 bg-slate-100 rounded-3xl p-6 flex items-center justify-between border border-slate-200 hover:scale-[1.02] transition-transform cursor-pointer">
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-1">Notion & Google Drive</h4>
                <p className="text-sm text-slate-600">OAuth integration for internal wikis</p>
              </div>
              <div className="flex -space-x-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="font-serif font-bold text-xl">N</span>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  <Database className="w-5 h-5 text-amber-500" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 4. Dark Terminal Block: Enterprise Security */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-[#0a0a0a] py-24 border-t border-[#1f1f1f] text-slate-300 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-bold mb-6 border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" /> Enterprise Grade Security
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Your data is yours. <br /> Period.
              </h2>
              <p className="text-lg mb-8 leading-relaxed text-slate-400">
                We understand that you are uploading proprietary company information, pricing sheets, and customer records. Our infrastructure is designed from the ground up to guarantee absolute isolation.
              </p>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <Lock className="w-6 h-6 text-[var(--color-primary-400)] flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">Zero Training on Customer Data</h4>
                    <p className="text-sm">Your documents and vectors are never used to train our base foundation models.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Fingerprint className="w-6 h-6 text-[var(--color-primary-400)] flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">SOC 2 Type II & HIPAA Compliant</h4>
                    <p className="text-sm">End-to-end AES-256 encryption at rest and TLS 1.3 in transit.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right: Terminal Visual */}
            <div className="bg-[#141414] rounded-2xl border border-[#2a2a2a] overflow-hidden shadow-2xl font-mono text-sm">
              <div className="bg-[#1c1c1c] border-b border-[#2a2a2a] px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-4 text-xs text-slate-500">security_audit.sh</span>
              </div>
              <div className="p-6 text-slate-400 space-y-2">
                <p><span className="text-emerald-400">user@admin:~$</span> initialize_vector_db --tenant=org_492</p>
                <p className="text-slate-500">Initializing isolated environment...</p>
                <p className="text-slate-500">Applying AES-256 encryption keys...</p>
                <p className="text-blue-400">[SUCCESS] Tenant isolation confirmed.</p>
                <p className="mt-4"><span className="text-emerald-400">user@admin:~$</span> run_compliance_check</p>
                <p className="text-slate-500">Scanning data retention policies...</p>
                <p className="text-amber-400">Note: PII Redaction module is ACTIVE.</p>
                <p className="text-blue-400">[SUCCESS] SOC2 parameters met.</p>
                <p className="mt-4 flex items-center gap-2"><span className="w-2 h-4 bg-slate-400 animate-pulse" /></p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}