// app/follow-up-agent/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Clock, 
  Zap, 
  Target, 
  MessageSquare, 
  Mail,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Users,
  BarChart3,
  RefreshCw,
  Star,
  Sparkles,
  ChevronRight,
  Play,
  Pause,
  MoreHorizontal,
  Check,
  X,
  Calendar,
  Bell,
  Layers,
  Globe,
  Share2
} from 'lucide-react';

export default function FollowUpAgentLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSequence, setActiveSequence] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

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
    
    // Auto-rotate sequences
    const interval = setInterval(() => {
      if (isPlaying) {
        setActiveSequence((prev) => (prev + 1) % 4);
      }
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [isPlaying]);

  const stats = [
    { value: '10×', label: 'More Responses', subtext: 'vs manual outreach' },
    { value: '85%', label: 'Open Rates', subtext: 'AI-optimized subject lines' },
    { value: '24/7', label: 'Follow-Up', subtext: 'Never miss a lead' },
    { value: '3×', label: 'Faster Close', subtext: 'Automated nurturing' },
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Smart Timing Engine',
      description: 'AI analyzes prospect behavior to send follow-ups at the exact moment they\'re most likely to engage. No more guessing.',
      stat: 'Perfect',
      statLabel: 'Timing'
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: 'Multi-Channel Sequences',
      description: 'Orchestrate email, SMS, LinkedIn, and calls in one seamless sequence. Meet prospects wherever they prefer.',
      stat: '5+',
      statLabel: 'Channels'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Intent-Based Triggers',
      description: 'Automatically accelerate or pause sequences based on prospect actions. Website visits, email opens, replies—everything tracked.',
      stat: 'Real-Time',
      statLabel: 'Triggers'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI Personalization',
      description: 'Every message is uniquely crafted using prospect data, company news, and behavioral signals. Feels human, scales infinitely.',
      stat: '100%',
      statLabel: 'Unique'
    }
  ];

  const sequenceSteps = [
    {
      day: 'Day 1',
      time: '10:00 AM',
      channel: 'Email',
      action: 'Initial outreach with value proposition',
      status: 'sent',
      icon: <Mail className="w-4 h-4" />
    },
    {
      day: 'Day 3',
      time: '2:00 PM',
      channel: 'LinkedIn',
      action: 'Connection request + personalized note',
      status: 'pending',
      icon: <Share2 className="w-4 h-4" />
    },
    {
      day: 'Day 5',
      time: '11:00 AM',
      channel: 'Email',
      action: 'Case study share + soft CTA',
      status: 'pending',
      icon: <Mail className="w-4 h-4" />
    },
    {
      day: 'Day 7',
      time: '4:00 PM',
      channel: 'SMS',
      action: 'Quick check-in + meeting link',
      status: 'pending',
      icon: <Smartphone className="w-4 h-4" />
    }
  ];

  const testimonials = [
    {
      quote: "We automated 40 hours of follow-up work per week. Our sales team now focuses only on qualified meetings, not chasing cold leads.",
      author: "Alex Thompson",
      role: "VP Sales, CloudSync",
      metric: "40hrs",
      metricLabel: "Saved Weekly",
      avatar: "AT",
      gradient: "from-[var(--color-primary-500)] to-[var(--color-primary-700)]"
    },
    {
      quote: "Response rates went from 12% to 34% in 30 days. The AI knows exactly when to send and what to say. It's scary good.",
      author: "Maria Garcia",
      role: "SDR Manager, DataFlow",
      metric: "34%",
      metricLabel: "Response Rate",
      avatar: "MG",
      gradient: "from-[var(--color-secondary-500)] to-[var(--color-secondary-700)]"
    },
    {
      quote: "Our sales cycle shortened from 45 days to 18 days. The automated nurturing keeps prospects warm until they're ready to buy.",
      author: "James Wilson",
      role: "CEO, GrowthLabs",
      metric: "60%",
      metricLabel: "Faster Close",
      avatar: "JW",
      gradient: "from-[var(--color-primary-400)] to-[var(--color-secondary-500)]"
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--color-primary-50)] text-[var(--color-primary-900)] font-sans overflow-x-hidden selection:bg-[var(--color-primary-200)] selection:text-[var(--color-primary-900)]">
      {/* Global Styles */}
      <style jsx global>{`
        :root {
          --primary-50: var(--color-primary-50);
          --primary-100: var(--color-primary-100);
          --primary-200: var(--color-primary-200);
          --primary-300: var(--color-primary-300);
          --primary-400: var(--color-primary-400);
          --primary-500: var(--color-primary-500);
          --primary-600: var(--color-primary-600);
          --primary-700: var(--color-primary-700);
          --primary-800: var(--color-primary-800);
          --primary-900: var(--color-primary-900);
          --secondary-100: var(--color-secondary-100);
          --secondary-200: var(--color-secondary-200);
          --secondary-500: var(--color-secondary-500);
          --secondary-700: var(--color-secondary-700);
        }
        
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
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 4s; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient-shift 15s ease infinite; }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-progress { animation: progress 3s linear; }
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
          background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-secondary-600) 50%, var(--color-primary-800) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glow-blue {
          box-shadow: 0 0 60px rgba(0, 102, 204, 0.2);
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

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        
        {/* Animated Orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse-glow bg-[var(--color-primary-300)]"
          style={{
            left: `${mousePosition.x * 30}%`,
            top: `${mousePosition.y * 30}%`,
            transition: 'left 0.3s ease-out, top 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse-glow bg-[var(--color-secondary-300)]"
          style={{
            right: `${(1 - mousePosition.x) * 20}%`,
            bottom: `${(1 - mousePosition.y) * 20}%`,
            transition: 'right 0.5s ease-out, bottom 0.5s ease-out',
            animationDelay: '2s'
          }}
        />
        
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-100)]/30 via-transparent to-[var(--color-secondary-100)]/30" />
      </div>

      {/* HERO SECTION */}
   <section ref={heroRef} 
                  className="relative min-h-screen flex items-center px-4 py-20 overflow-hidden perspective-1000">
                 <div className="max-w-7xl mx-auto w-full relative z-10">
                   <div className="grid lg:grid-cols-12  items-center">
         
                       {/* Left: Content */}
                          <div
                            className={`lg:col-span-7 xl:col-span-7 order-2 lg:order-1 transition-all py-10 duration-1000 ${
                              isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                            }`}
                          >
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold  leading-[0.9] mb-8 tracking-tight text-[var(--color-primary-800)]">
                            Never Let a{" "} <br/>
                              <span className="relative inline-block">
                                <span className="text-gradient animate-gradient">
                          Lead Go Cold
                                </span>                       
                                              
                              </span>
                            
                            </h1>
                    
                            <p className="text-lg sm:text-xl text-[#0057ad] mb-10 max-w-xl leading-relaxed font-light">
                         An AI agent that automatically follows up with every lead across email, SMS, and LinkedIn.
                              <span className="text-[#0066cc] font-medium">
                                {" "}
                                Personalized. Persistent. Perfectly timed.
                              </span>
                            </p>
                    
                           {/* Email Capture */}
                                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mb-8">
                                          <div className="flex-1 relative">
                                            <input 
                                              type="email" 
                                              value={email}
                                              onChange={(e) => setEmail(e.target.value)}
                                              placeholder="Enter your email"
                                              className="w-full px-6 py-3 rounded-2xl bg-white border-2 border-[#99ccff] text-[#003871] placeholder:text-[#3399ff] focus:outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-[#cce5ff] transition-all text-lg shadow-sm"
                                            />
                                          </div>
                                          <button className="px-4 py-2 rounded-2xl bg-[#0066cc] hover:bg-[#0057ad] text-white font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#cce5ff] flex items-center justify-center gap-2 group whitespace-nowrap">
                                           Deploy Agent
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
         
                     {/* Right: Property Matching Interface */}
                   <div
                 className={`lg:col-span-5 xl:col-span-5  relative order-1 lg:order-2 sm:right-10  flex items-center justify-center transition-all duration-1000 delay-300 ${
                   isVisible
                     ? "opacity-100 translate-y-0"
                     : "opacity-0 translate-y-10"
                 }`}
               >
                 <div className="relative transform-style-3d">
                   
                   <img
                     src="/assets/follo-up-hero-robo.png"
                     alt="AI Robot"
                     className="w-[80%] max-w-none lg:w-[80%] xl:w-[80%] object-contain translate-x-6 lg:translate-x-10"
                   />
         
                 </div>
               </div>
                   </div>
         
                    {/* Stats Bar */}
                <div className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  {stats.map((stat, idx) => (
                    <div key={idx} className="glass rounded-2xl p-6 text-center hover:bg-white transition-all duration-300 group border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] shadow-sm hover:shadow-md">
                      <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1 group-hover:scale-110 transition-transform inline-block">
                        {stat.value}
                      </div>
                      <div className="text-sm font-semibold text-[var(--color-primary-900)] mb-1">{stat.label}</div>
                      <div className="text-xs text-[var(--color-primary-600)]">{stat.subtext}</div>
                    </div>
                  ))}
                </div>
                 </div>
                 
               </section>

      {/* FEATURES - Bento Grid */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-sm font-medium text-[var(--color-primary-600)] uppercase tracking-widest mb-4">Capabilities</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-primary-900)]">
              Follow-Up{' '}
              <span className="text-gradient">Superpowers</span>
            </h2>
            <p className="text-xl text-[var(--color-primary-700)]">
              Everything you need to nurture leads from first touch to closed deal—automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={`glass rounded-3xl p-8 hover:bg-white transition-all duration-500 group border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] shadow-sm hover:shadow-lg ${idx === 0 || idx === 3 ? 'lg:col-span-2' : ''}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] flex items-center justify-center text-[var(--color-primary-600)] mb-6 group-hover:scale-110 transition-transform border border-[var(--color-primary-300)]">
                  {feature.icon}
                </div>
                <div className="flex items-end gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-[var(--color-primary-900)]">{feature.title}</h3>
                  <span className="text-2xl font-bold text-[var(--color-primary-600)] mb-1">{feature.stat}</span>
                </div>
                <p className="text-[var(--color-primary-700)] leading-relaxed mb-4">{feature.description}</p>
                <div className="text-xs text-[var(--color-primary-600)] font-medium uppercase tracking-wider">{feature.statLabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - 3 Steps */}
      <section className="relative py-32 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-[var(--color-primary-600)] uppercase tracking-widest mb-4">How It Works</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-primary-900)]">
              Set It Up in{' '}
              <span className="text-gradient">5 Minutes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-[var(--color-primary-400)] via-[var(--color-secondary-400)] to-[var(--color-primary-600)]" />

            {[
              {
                step: '01',
                icon: <Target className="w-6 h-6" />,
                title: 'Connect Your Leads',
                description: 'Import from CRM, connect forms, or add via API. The agent immediately starts tracking every prospect.'
              },
              {
                step: '02',
                icon: <Layers className="w-6 h-6" />,
                title: 'Choose Your Playbook',
                description: 'Select from proven sequences or build your own. Set triggers, timing, and personalization rules.'
              },
              {
                step: '03',
                icon: <Zap className="w-6 h-6" />,
                title: 'Let AI Handle Rest',
                description: 'The agent executes, adapts, and optimizes. You get notified only when prospects are ready to talk.'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="glass-strong rounded-3xl p-8 h-full hover:bg-white transition-all duration-500 border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] shadow-sm hover:shadow-lg">
                  <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[var(--color-primary-300)]">
                    {item.step}
                  </div>
                  <div className="pt-4">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center text-[var(--color-primary-600)] mb-6 border border-[var(--color-primary-200)]">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-3">{item.title}</h3>
                    <p className="text-[var(--color-primary-700)] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MULTI-CHANNEL SHOWCASE */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-[var(--color-primary-600)] uppercase tracking-widest mb-4">Omnichannel</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-primary-900)]">
              Meet Prospects{' '}
              <span className="text-gradient">Everywhere</span>
            </h2>
            <p className="text-xl text-[var(--color-primary-700)] max-w-2xl mx-auto">
              One sequence, multiple channels. Automatically adapt to each prospect's preferred communication style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Mail className="w-8 h-8" />, label: 'Email', desc: 'AI-crafted subject lines & personalized body', color: 'from-blue-500 to-blue-700' },
              { icon: <Smartphone className="w-8 h-8" />, label: 'SMS', desc: 'Short, timely, high-impact text messages', color: 'from-green-500 to-emerald-700' },
              { icon: <Share2 className="w-8 h-8" />, label: 'LinkedIn', desc: 'Connection requests & voice messages', color: 'from-blue-600 to-indigo-700' },
              { icon: <Calendar className="w-8 h-8" />, label: 'Calls', desc: 'AI-dialer with smart scheduling', color: 'from-purple-500 to-violet-700' },
            ].map((channel, idx) => (
              <div key={idx} className="glass rounded-3xl p-6 hover:bg-white transition-all duration-500 group border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] shadow-sm hover:shadow-lg text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${channel.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {channel.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-2">{channel.label}</h3>
                <p className="text-sm text-[var(--color-primary-600)]">{channel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-32 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-[var(--color-primary-600)] uppercase tracking-widest mb-4">Results</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-primary-900)]">
              Sales Teams{' '}
              <span className="text-gradient">Love It</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="glass-strong rounded-3xl p-8 relative group hover:bg-white transition-all duration-500 border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] shadow-sm hover:shadow-lg">
                <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform`}>
                  <Star className="w-8 h-8 text-white fill-white" />
                </div>

                <div className="mb-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.gradient} bg-opacity-10 text-white text-sm font-bold mb-4`}>
                    <TrendingUp className="w-4 h-4" />
                    {testimonial.metric} {testimonial.metricLabel}
                  </div>
                  <p className="text-[var(--color-primary-800)] text-lg leading-relaxed">"{testimonial.quote}"</p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-[var(--color-primary-200)]">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-primary-900)]">{testimonial.author}</div>
                    <div className="text-sm text-[var(--color-primary-600)]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-[var(--color-primary-600)] uppercase tracking-widest mb-4">Connected</span>
          <h2 className="text-5xl lg:text-6xl font-bold mb-16 text-[var(--color-primary-900)]">
            Works With Your{' '}
            <span className="text-gradient">Stack</span>
          </h2>

          <div className="glass-strong rounded-3xl p-12 relative overflow-hidden border border-[var(--color-primary-200)] shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-100)]/50 via-[var(--color-secondary-100)]/50 to-[var(--color-primary-100)]/50" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-lg shadow-[var(--color-primary-300)]">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-2">FollowUpAgent</h3>
                <p className="text-[var(--color-primary-600)]">AI Follow-Up Engine</p>
              </div>

              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full h-px bg-gradient-to-r from-[var(--color-primary-400)] via-[var(--color-secondary-400)] to-[var(--color-primary-600)] relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--color-primary-600)] rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-2 h-2 bg-[var(--color-primary-400)] rounded-full animate-ping" />
                  <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-2 h-2 bg-[var(--color-secondary-400)] rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {['Salesforce', 'HubSpot', 'Pipedrive', 'Slack', 'Gmail', 'Outlook'].map((tool) => (
                  <div key={tool} className="px-6 py-3 rounded-xl glass text-[var(--color-primary-700)] hover:text-[var(--color-primary-900)] hover:bg-white transition-colors border border-[var(--color-primary-200)] shadow-sm">
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-16 px-3 sm:py-32 sm:px-4">
        <div className="max-w-5xl mx-auto">
          <div className="glass-strong rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden border border-[var(--color-primary-300)] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-100)]/50 via-[var(--color-secondary-100)]/50 to-[var(--color-primary-100)]/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--color-primary-200)]/30 via-transparent to-transparent" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[var(--color-primary-300)] animate-pulse-glow">
                <Send className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-6 text-[var(--color-primary-900)]">
                Stop Losing Leads to{' '}
                <span className="text-gradient">Silence</span>
              </h2>
              
              <p className="text-md sm:text-xl text-[var(--color-primary-700)] mb-10 max-w-2xl mx-auto">
                Join 5,000+ sales teams who never miss a follow-up. 
                Deploy your AI agent in 5 minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="flex-1 px-6 py-4 rounded-xl bg-white border-2 border-[var(--color-primary-200)] text-[var(--color-primary-900)] placeholder:text-[var(--color-primary-400)] focus:outline-none focus:border-[var(--color-primary-600)] focus:ring-4 focus:ring-[var(--color-primary-100)] transition-all shadow-sm"
                />
                <button className="px-8 py-4 rounded-xl bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[var(--color-primary-200)] whitespace-nowrap">
                  Start Free Trial
                </button>
              </div>

              <p className="text-sm text-[var(--color-primary-600)]">
                Free 14-day trial • No credit card • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

  
    </main>
  );
}