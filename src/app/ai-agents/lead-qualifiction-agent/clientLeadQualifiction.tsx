
'use client';

import { ArrowRight, Bot, CheckCircle2, Clock, Play, Shield, Sparkles, Star, Target, TrendingUp, X, Zap } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef,useState } from 'react';
interface Lead {
  id: number;
  name: string;
  email: string;
  score: number;
  status: 'hot' | 'warm' | 'cold';
  source: string;
  time: string;
}

interface Activity {
  id: number;
  action: string;
  lead: string;
  time: string;
  type: 'qualified' | 'routed' | 'scored';
}
export default function LeadBotPage() {
  const scoreCardsRef = useRef<HTMLDivElement>(null);
  const statNumbersRef = useRef<HTMLDivElement>(null);
const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [leadCount, setLeadCount] = useState(247);
  const [selectedLead, setSelectedLead] = useState<number | null>(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    // Animate score bars on scroll
    const scoreObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.score-fill').forEach((bar) => {
            const el = bar as HTMLElement;
            const w = el.style.width;
            el.style.width = '0%';
            setTimeout(() => { el.style.width = w; }, 100);
          });
        }
      });
    }, { threshold: 0.3 });

    // Animate stat numbers
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animation = 'countUp 0.6s ease both';
        }
      });
    }, { threshold: 0.5 });

    if (scoreCardsRef.current) {
      scoreCardsRef.current.querySelectorAll('.score-card').forEach(c => scoreObserver.observe(c));
    }

    if (statNumbersRef.current) {
      statNumbersRef.current.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));
    }

    // Smooth hover tilt on feature cards
    const featureCards = document.querySelectorAll('.feature-card:not(.featured)');
    featureCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = ((e as MouseEvent).clientX - rect.left) / rect.width - 0.5;
        const y = ((e as MouseEvent).clientY - rect.top) / rect.height - 0.5;
        (card as HTMLElement).style.transform = `perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = '';
      });
    });

    return () => {
      scoreObserver.disconnect();
      statObserver.disconnect();
    };
  }, []);
 useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    // Animate lead count
    const interval = setInterval(() => {
      setLeadCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return newCount > 240 && newCount < 260 ? newCount : prev;
      });
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);


  const handleVideoClick = () => {
  if (!videoRef.current) return;

  if (videoRef.current.paused) {
    videoRef.current.play();
  } else {
    videoRef.current.pause();
  }
};
    const leads: Lead[] = [
    { id: 1, name: 'Sarah Chen', email: 'sarah@techcorp.com', score: 94, status: 'hot', source: 'Website', time: '2m ago' },
    { id: 2, name: 'Marcus Johnson', email: 'marcus@growth.io', score: 87, status: 'hot', source: 'LinkedIn', time: '5m ago' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily@scaleup.com', score: 72, status: 'warm', source: 'Referral', time: '12m ago' },
    { id: 4, name: 'David Park', email: 'david@startup.io', score: 45, status: 'cold', source: 'Ad Campaign', time: '18m ago' },
  ];

  const activities: Activity[] = [
    { id: 1, action: 'Qualified lead', lead: 'Sarah Chen', time: 'Just now', type: 'qualified' },
    { id: 2, action: 'Routed to sales', lead: 'Marcus Johnson', time: '2m ago', type: 'routed' },
    { id: 3, action: 'Score updated', lead: 'Emily Rodriguez', time: '5m ago', type: 'scored' },
    { id: 4, action: 'Auto-enriched', lead: 'David Park', time: '8m ago', type: 'qualified' },
  ];
 const stats = [
    { value: '94%', label: 'Qualification Accuracy', subtext: 'AI-powered scoring', icon: <Target className="w-5 h-5" /> },
    { value: '24/7', label: 'Always On', subtext: 'Never miss a lead', icon: <Clock className="w-5 h-5" /> },
    { value: '3×', label: 'Faster Response', subtext: 'Instant engagement', icon: <Zap className="w-5 h-5" /> },
    { value: '40%', label: 'More Conversions', subtext: 'Qualified leads only', icon: <TrendingUp className="w-5 h-5" /> },
  ];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-500 text-white';
      case 'warm': return 'bg-yellow-500 text-white';
      case 'cold': return 'bg-slate-400 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-slate-400';
  };
  return (
    
    <main className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
 <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 4s; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient-shift 15s ease infinite; }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scan { animation: scan 2s linear infinite; }
        .animate-ping-slow { animation: ping-slow 2s ease-in-out infinite; }
        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 4px 30px rgba(0, 102, 204, 0.1);
        }
        .glass-strong {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 40px rgba(0, 102, 204, 0.15);
        }
        .text-gradient {
          background: linear-gradient(135deg, #0066cc 0%, #3399ff 50%, #0057ad 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .grid-bg {
          background-image: 
            linear-gradient(rgba(0, 102, 204, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 102, 204, 0.03) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
      {/* Grid Background */}
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid-bg" />

        {/* Animated Orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse-glow bg-[#66b2ff]"
          style={{
            left: `${mousePosition.x * 30}%`,
            top: `${mousePosition.y * 30}%`,
            transition: 'left 0.3s ease-out, top 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse-glow bg-[#4096ff]"
          style={{
            right: `${(1 - mousePosition.x) * 20}%`,
            bottom: `${(1 - mousePosition.y) * 20}%`,
            transition: 'right 0.5s ease-out, bottom 0.5s ease-out',
            animationDelay: '2s'
          }}
        />

        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#cce5ff]/30 via-transparent to-[#d9eaff]/30" />
      </div>


      {/* HERO */}
 <section
  ref={heroRef}
  className="relative min-h-screen flex items-center px-4 py-20 overflow-hidden perspective-1000"
>
  <div className="max-w-7xl mx-auto w-full relative z-10">
    
    {/* Main Grid */}
    <div className="grid lg:grid-cols-12 items-center  ">

      {/* Left: Content */}
      <div
        className={`lg:col-span-7 xl:col-span-7 transition-all py-10 duration-1000 order-2 sm:order-1 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold  leading-[0.9] mb-8 tracking-tight text-[var(--color-primary-800)]">
          Your Smartest Sales{" "}
          <span className="relative inline-block">
            <span className="text-gradient animate-gradient">
              Rep Never    
            </span>                       <span>Sleeps</span>
                          
          </span>
        
        </h1>

        <p className="text-lg sm:text-xl text-[#0057ad] mb-10 max-w-xl leading-relaxed font-light">
          leadAgent AI qualifies, scores, and routes inbound leads 24/7 — so your
          team closes deals instead of chasing dead ends.
          <span className="text-[#0066cc] font-medium">
            {" "}
            94% accuracy. Instant engagement.
          </span>
        </p>

        {/* Premium CTA */}
        <div className="flex flex-wrap gap-4 mb-10">
        <Link href="https://app.estateai.in/register">  <button className="relative px-4 py-2 rounded-2xl bg-gradient-to-r from-[#0066cc] to-[#3399ff] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] flex items-center gap-2 group">
            {/* <Sparkles className="w-5 h-5" /> */}
               leadAgent Free
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button></Link>

          <button onClick={() => setIsVideoOpen(true)} className="px-4 py-2 rounded-2xl border border-[#99ccff] text-[#0057ad] font-semibold text-lg backdrop-blur-md hover:bg-white hover:border-[#0066cc] hover:text-[#003871] transition-all duration-300 flex items-center gap-2">
            {/* <Play className="w-5 h-5" /> */}
            See it in action
          </button>
        </div>

        {/* Features */}
        <div className="flex items-center gap-6 text-sm text-[#0066cc] flex-wrap">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
            <span>No credit card</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
            <span>5-min setup</span>
          </div>
        </div>
      </div>

      {/* Right: Bigger Image */}
      <div
        className={`lg:col-span-5 xl:col-span-5  relative right-10 order-1 sm:order-2  flex items-center justify-center transition-all duration-1000 delay-300 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative transform-style-3d flex sm:block items-center justify-center">
          
          <img
            src="https://res.cloudinary.com/djipgt6vc/image/upload/v1775472300/lead-qualify-agent-hero_xoqrxc.png"
            alt="AI Robot"
            className="w-[100%] max-w-none lg:w-[110%] xl:w-full object-contain translate-x-2 lg:translate-x-10"
          />

        </div>
      </div>
    </div>

    {/* Stats Bar */}
    <div
      className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="glass rounded-2xl p-6 text-center hover:bg-white transition-all duration-300 group border border-[#99ccff] hover:border-[#0066cc] shadow-sm hover:shadow-md"
        ><div className="flex sm:hidden items-center justify-center mb-2 text-[#0066cc]">{stat.icon}</div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="hidden sm:block text-[#0066cc]">{stat.icon}</div>
            <div className="text-3xl lg:text-4xl font-bold text-gradient group-hover:scale-110 transition-transform">
              {stat.value}
            </div>
          </div>
          <div className="text-sm font-semibold text-[#003871] mb-1">
            {stat.label}
          </div>
          <div className="text-xs text-[#3399ff]">{stat.subtext}</div>
        </div>
      ))}
    </div>
  </div>
 
</section>
     

      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent relative z-10 my-4" />

      {/* HOW IT WORKS */}
     
<section id="features" className="relative z-10 px-3 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto">
   <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
  
  <div className="flex-1">
    <p className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-blue-500 ">
      <span className="w-6 h-px bg-blue-600" />
      Core Capabilities
    </p>

    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 text-[var(--color-primary-700)]">
      Everything Your SDR Team<br />Wishes They Could Do
    </h2>

    <p className="text-slate-500 text-lg leading-relaxed font-light mb-16 max-w-xl">
      Built for speed, accuracy, and scale — leadAgent combines AI reasoning with structured sales methodology.
    </p>
  </div>

  <div className="shrink-0 w-full max-w-[400px]">
    <img
      src="/assets/half-body-robo.png"
      alt="SDR Robot"
      className="w-full h-auto object-contain"
    />
  </div>

</div>
        <div className="relative">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured card with terminal */}
          <div className="feature-card featured lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-white to-blue-50/50 border border-blue-200 rounded-2xl p-9 hover:border-blue-300 transition-all hover:shadow-xl hover:shadow-blue-500/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-700 via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div>
              <div className="w-13 h-13 bg-blue-100 border border-blue-300 rounded-xl flex items-center justify-center text-2xl mb-5">🧠</div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">Intelligent BANT Qualification</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-light mb-4">
                leadAgent conducts a nuanced sales conversation using proven BANT, MEDDIC, and CHAMP frameworks. It adapts tone and depth based on the prospect's seniority, industry, and engagement level — mimicking your best SDR.
              </p>
              <span className="inline-block bg-blue-50 border border-blue-200 rounded-md px-2.5 py-1 text-xs font-mono text-blue-600">
                BANT · MEDDIC · CHAMP · SPICED
              </span>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-5">
              
              
              {/* Terminal */}
              <div className="w-full bg-white border border-[var(--color-primary-200)] rounded-xl overflow-hidden font-mono text-xs shadow-sm">

  {/* Header */}
  <div className="bg-[var(--color-primary-50)] px-4 py-2.5 flex items-center gap-1.5 border-b border-[var(--color-primary-200)]">
    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
    <span className="text-[var(--color-primary-600)] text-xs ml-2 font-medium">
      leadAgent-qualify.ts
    </span>
  </div>

  {/* Body */}
  <div className="p-5 leading-7 text-[var(--color-primary-800)]">

    <span className="block">
      <span className="text-[var(--color-primary-600)]">›</span> Analyzing prospect profile...
    </span>

    <span className="block text-[var(--color-primary-600)]/70">
      &nbsp;&nbsp;Company: Acme Corp (Series B)
    </span>

    <span className="block text-[var(--color-primary-600)]/70">
      &nbsp;&nbsp;Team: 48 SDRs, $2.4M ARR
    </span>

    <span className="block">
      <span className="text-[var(--color-primary-600)]">›</span> BANT score:{" "}
      <span className="text-[var(--color-primary-700)] font-semibold">
        87 / 100
      </span>
    </span>

    <span className="block text-green-600">
      &nbsp;&nbsp;✓ Budget confirmed: $50k+/yr
    </span>

    <span className="block text-green-600">
      &nbsp;&nbsp;✓ Authority: VP Sales
    </span>

    <span className="block text-yellow-500">
      &nbsp;&nbsp;~ Timeline: Q2 (soft)
    </span>

    <span className="block">
      <span className="text-[var(--color-primary-600)]">›</span> Routing to AE: Sarah K.
      <span className="inline-block w-2 h-3.5 bg-[var(--color-primary-500)] ml-0.5 animate-[pulse_1s_steps(1)_infinite]" />
    </span>

  </div>
</div>
            </div>
          </div>

          {[
            { icon: '⚡', title: 'Real-Time Lead Scoring', desc: 'Dynamic scoring that updates as the conversation evolves. Firmographic enrichment via Clearbit, Apollo, and LinkedIn — automatically.', tag: '150+ Signals' },
            { icon: '🎯', title: 'Intent Detection', desc: 'Detect buying signals in emails, chat, and web behaviour. Identify high-intent visitors before they even fill a form.', tag: 'Behavioural AI' },
            { icon: '📅', title: 'Auto Demo Booking', desc: 'Hot leads are offered a calendar slot mid-conversation. Syncs with Calendly, Cal.com, or your native CRM calendar in real time.', tag: 'Calendly · Cal.com · HubSpot' },
            { icon: '🔁', title: 'Nurture Sequencing', desc: 'Warm leads that aren\'t ready yet? leadAgent drops them into smart email sequences based on their specific objections and interests.', tag: 'Personalised Drip' }
          ].map((feature, idx) => (
            <div key={idx} className="feature-card bg-white border border-slate-200 rounded-2xl p-9 hover:border-blue-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 transition-all relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-700 via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-13 h-13 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-2xl mb-5">{feature.icon}</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-light mb-4">{feature.desc}</p>
              <span className="inline-block bg-blue-50 border border-blue-200 rounded-md px-2.5 py-1 text-xs font-mono text-blue-600">{feature.tag}</span>
            </div>
          ))}
        </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent relative z-10 my-16" />

      {/* FEATURES */}
       <section id="how" className="relative z-10 px-3 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto">
     <div className='flex flex-col sm:flex-row justify-between items-center'> 
       <div>
        <p className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-blue-500 mb-5">
          <span className="w-6 h-px bg-blue-600" />
          How it works
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 text-[var(--color-primary-700)]">
          From Stranger to Qualified Lead<br />in Under 60 Seconds
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed font-light mb-16 max-w-xl">
          leadAgent intercepts every inbound signal, runs a deep qualification interview, and hands your reps a warm, scored prospect.
        </p>
        </div>
        <img width={400} height={400} src="/assets/lead-crm-with-robo.png"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-slate-200 rounded-2xl overflow-hidden border border-slate-200">
          {[
            { num: '01', icon: '📡', title: 'Lead Enters the Funnel', desc: 'Form submissions, chat, email, LinkedIn DMs — leadAgent watches every channel and intercepts the moment someone shows intent.' },
            { num: '02', icon: '💬', title: 'Conversational Interview', desc: 'A natural, GPT-powered conversation collects BANT signals (Budget, Authority, Need, Timeline) without feeling like a questionnaire.' },
            { num: '03', icon: '📊', title: 'AI Lead Scoring', desc: '150+ data points, firmographics, behavioural cues, and intent signals are synthesised into a 0–100 qualification score.' },
            { num: '04', icon: '⚡', title: 'Instant Smart Routing', desc: 'Hot leads go straight to your best closers. Warm leads enter nurture sequences. Cold leads get deprioritised automatically.' }
          ].map((step, idx) => (
            <div key={idx} className="bg-white p-10 relative hover:bg-slate-50 transition-colors group">
              <div className="text-xs font-mono text-blue-600 tracking-widest mb-5">{step.num} / {['CAPTURE', 'ENGAGE', 'SCORE', 'ROUTE'][idx]}</div>
              <span className="text-4xl mb-5 block drop-shadow-[0_0_12px_rgba(51,153,255,0.4)]">{step.icon}</span>
              <div className="font-bold text-lg text-slate-900 mb-2">{step.title}</div>
              <p className="text-sm text-slate-500 leading-relaxed font-light">{step.desc}</p>
              {idx < 3 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 bg-white border border-blue-200 rounded-full items-center justify-center text-blue-500 text-sm font-bold z-10 shadow-sm">
                  ›
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent relative z-10 my-16" />

      {/* PIPELINE */}
      <section id="pipeline" className="relative z-10 bg-white border border-slate-200 rounded-3xl p-3 sm:p-10 md:p-16 mx-3 sm:mx-6 max-w-6xl xl:mx-auto overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <p className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-blue-500 mb-5">
          <span className="w-6 h-px bg-blue-600" />
          Live Pipeline
        </p>
        <h2 className="text-xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-[var(--color-primary-700)] ">
          Watch Leads Flow Through<br />the Qualification Engine
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed font-light mb-12 max-w-xl">
          Every lead is classified, enriched, scored, and routed in seconds.
        </p>

        <div className="flex flex-wrap lg:flex-nowrap items-stretch gap-0 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          {[
            { icon: '📥', label: 'Inbound', sub: 'Form / Chat / Email' },
            { icon: '🔍', label: 'Enrich', sub: 'Clearbit + Apollo' },
            { icon: '💬', label: 'Interview', sub: 'BANT Conversation' },
            { icon: '🧮', label: 'Score', sub: '0–100 AI Score' },
            { icon: '🚦', label: 'Classify', sub: 'Hot / Warm / Cold' },
            { icon: '📤', label: 'Route', sub: 'CRM + AE Alert' }
          ].map((stage, idx) => (
            <div key={idx} className={`flex-1 min-w-[140px] p-4 sm:p-7 text-center relative bg-white hover:bg-blue-50/30 transition-colors ${idx < 5 ? 'border-r border-slate-200' : ''}`}>
              {idx < 5 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-slate-200 z-10 hidden lg:block" />
              )}
              <span className="text-3xl mb-3 block drop-shadow-[0_0_8px_rgba(51,153,255,0.4)]">{stage.icon}</span>
              <div className="font-bold text-sm text-slate-900 mb-1">{stage.label}</div>
              <div className="text-xs text-slate-400 font-mono">{stage.sub}</div>
            </div>
          ))}
        </div>

        {/* Lead Score Preview */}
        <div ref={scoreCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Hot Lead */}
          <div className="score-card bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-7 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5 font-bold text-slate-900">
                <div className="min-w-10 min-h-10 bg-blue-100 border border-blue-200 rounded-full flex items-center justify-center text-xl">👨‍💼</div>
                James Whitfield
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-red-50 text-red-500 border border-red-200 sm:font-medium">🔥 HOT</span>
            </div>
            <div className="text-5xl font-extrabold tracking-tight text-red-500 mb-1">92</div>
            <div className="text-slate-400 text-xs font-mono mb-4">/100 qualification score</div>
            
            {[
              { label: 'Budget Match', val: '95%', width: '95%', color: 'high' },
              { label: 'Authority', val: '100%', width: '100%', color: 'high' },
              { label: 'Timeline', val: '80%', width: '80%', color: 'high' }
            ].map((meter, idx) => (
              <div key={idx} className="mb-3.5">
                <div className="flex justify-between text-xs text-slate-400 font-mono mb-1.5">
                  <span>{meter.label}</span>
                  <span>{meter.val}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`score-fill h-full rounded-full bg-gradient-to-r ${meter.color === 'high' ? 'from-red-600 to-red-400' : 'from-orange-600 to-orange-400'} transition-all duration-1000`} style={{ width: meter.width }} />
                </div>
              </div>
            ))}
          </div>

          {/* Warm Lead */}
          <div className="score-card bg-slate-50 border border-slate-200 rounded-xl p-7 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5 font-bold text-slate-900">
                <div className="w-10 h-10 bg-blue-100 border border-blue-200 rounded-full flex items-center justify-center text-xl">👩‍💻</div>
                Priya Sharma
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-orange-50 text-orange-500 border border-orange-200 font-medium">🟡 WARM</span>
            </div>
            <div className="text-5xl font-extrabold tracking-tight text-orange-500 mb-1">61</div>
            <div className="text-slate-400 text-xs font-mono mb-4">/100 qualification score</div>
            
            {[
              { label: 'Budget Match', val: '55%', width: '55%' },
              { label: 'Authority', val: '70%', width: '70%' },
              { label: 'Timeline', val: '45%', width: '45%' }
            ].map((meter, idx) => (
              <div key={idx} className="mb-3.5">
                <div className="flex justify-between text-xs text-slate-400 font-mono mb-1.5">
                  <span>{meter.label}</span>
                  <span>{meter.val}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="score-fill h-full rounded-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-1000" style={{ width: meter.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section id="integrations" className="relative z-10 px-3 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div>  <p className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-blue-500 mb-5">
          <span className="w-6 h-px bg-blue-600" />
          Integrations
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 text-[var(--color-primary-700)] ">
          Plugs Into Your Entire<br />Revenue Stack
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed font-light mb-12 max-w-xl">
          leadAgent connects to your CRM, calendar, communication tools, and data enrichment providers out of the box.
        </p></div>
        <img width={400} height={400} src="/assets/stack-robo.png"/>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: '🟠', name: 'HubSpot' },
            { icon: '🔵', name: 'Salesforce' },
            { icon: '📅', name: 'Calendly' },
            { icon: '💌', name: 'Mailchimp' },
            { icon: '💬', name: 'Slack' },
            { icon: '🔗', name: 'LinkedIn' },
            { icon: '📧', name: 'Gmail' },
            { icon: '🌐', name: 'Clearbit' },
            { icon: '🚀', name: 'Apollo.io' },
            { icon: '⚡', name: 'Zapier' }
          ].map((integration, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-slate-50 hover:-translate-y-1 transition-all cursor-default">
              <span className="text-3xl mb-2 block">{integration.icon}</span>
              <div className="text-sm text-slate-600 font-medium">{integration.name}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent relative z-10 my-16" />

      {/* TESTIMONIALS */}
      <section className="relative z-10 px-3 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row-reverse  justify-between items-center">
          <div><p className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-blue-500 mb-5">
          <span className="w-6 h-px bg-blue-600" />
          Social Proof
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 text-[var(--color-primary-700)] ">
          Trusted by High-Growth<br />Sales Teams
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed font-light mb-12 max-w-xl">
          From seed-stage startups to enterprise revenue orgs — leadAgent works at every scale.
        </p>
</div>
<img width={400} height={400} src="/assets/pc-robo.png" className="pb-4"/>
</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { stars: '⭐⭐⭐⭐⭐', text: '"We deployed leadAgent in 2 hours and booked 40% more demos the very first week. Our SDRs now only talk to leads that are genuinely interested."', avatar: '👨', name: 'Marcus Chen', title: 'VP Sales, Finova (Series B)' },
            { stars: '⭐⭐⭐⭐⭐', text: '"The BANT scoring is scarily accurate. It picks up on things our reps miss — timeline hesitation, indirect budget signals, even tone shifts."', avatar: '👩', name: 'Danielle Okonkwo', title: 'Head of RevOps, Stackr' },
            { stars: '⭐⭐⭐⭐⭐', text: '"We reduced our cost-per-qualified-lead by 62% in 3 months. leadAgent basically paid for itself in the first two weeks."', avatar: '🧑', name: 'Raj Patel', title: 'Founder & CEO, Lumenra' }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-300 transition-colors">
              <div className="text-sm mb-4 tracking-widest">{testimonial.stars}</div>
              <p className="text-sm text-slate-500 leading-7 font-light italic mb-6">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center text-lg border border-blue-300">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">{testimonial.name}</div>
                  <div className="text-xs text-slate-400">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 text-center px-3 sm:px-6 py-24 sm:py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex justify-center gap-4 mb-12">
          <span className="text-4xl opacity-70 drop-shadow-[0_0_12px_rgba(51,153,255,0.4)] animate-[float_4s_ease-in-out_infinite]"><img width={50} height={50} src="/assets/head-robo.png"/></span>
          <span className="text-5xl drop-shadow-[0_0_12px_rgba(51,153,255,0.4)] animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: '0.7s' }}><img width={80} height={80} src="/assets/head-robo.png"/></span>
          <span className="text-4xl opacity-70 drop-shadow-[0_0_12px_rgba(51,153,255,0.4)] animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: '1.4s' }}><img width={50} height={50} src="/assets/head-robo.png"/></span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5 text-[var(--color-primary-700)] ">
          Your Pipeline Won't<br />Fill Itself
        </h2>
        <p className="text-slate-500 text-lg font-light mb-12 max-w-md mx-auto leading-relaxed">
          Deploy leadAgent in under 10 minutes. No code required. Start qualifying every single lead on autopilot — starting today.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-5">
          <input 
            type="email" 
            placeholder="your@company.com" 
            className="flex-1 bg-white border border-slate-200 text-slate-900 px-5 py-3.5 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
          />
          <a href="#" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-500 transition-all border border-blue-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 whitespace-nowrap">
            Deploy Now 🚀
          </a>
        </div>
        <p className="text-xs text-slate-400 font-mono">Free 14-day trial · No credit card · Cancel anytime</p>
      </section>
{isVideoOpen && (
  <div
    className="fixed inset-0 z-[999] flex items-center justify-center p-4"
    onClick={() => setIsVideoOpen(false)}
  >
    {/* Backdrop */}
    <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-md animate-fadeIn" />

    {/* Modal */}
    <div
      className="relative z-10 w-full max-w-3xl animate-scaleIn"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Glow border wrapper */}
      <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-[#3399ff] via-[#0066cc] to-[#99ccff] shadow-[0_8px_60px_rgba(0,102,204,0.25)]">

        {/* Inner container — LIGHT theme */}
        <div className="bg-white rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#dbeafe]">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#0066cc] animate-pulse" />
              <span className="text-sm font-semibold text-[#003871] tracking-wide">
                leadAgent AI — Product Demo
              </span>
            </div>
            <button
              onClick={() => setIsVideoOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#0066cc] hover:text-white hover:bg-[#0066cc] transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Video — with padding for breathing room */}
          <div className=" bg-[#f0f7ff]">
            <div className=" overflow-hidden  border border-[#bfdbfe]">
              <video
              ref={videoRef}
                src="https://res.cloudinary.com/djipgt6vc/video/upload/v1775287800/WhatsApp_Video_2026-04-04_at_12.42.01_PM_dthwlr.mp4"
                className="w-full aspect-video object-contain"
                controls
                autoPlay
                 onClick={handleVideoClick}
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture

              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 flex items-center justify-between border-t border-[#dbeafe] bg-white">
            <span className="text-xs text-[#0057ad] font-medium">
              See how leadAgent qualifies leads in real time
            </span>
            <Link href="/register">
              <button className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#0066cc] to-[#3399ff] text-white text-sm font-semibold hover:scale-[1.03] hover:shadow-md transition-all duration-200 flex items-center gap-1.5">
                Start Free Trial
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  </div>
)}
   
    </main>
  );
}