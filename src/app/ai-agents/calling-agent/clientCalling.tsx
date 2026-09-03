// app/ai-calling-agent/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mic, 
  Bot, 
  Activity,
  Clock,
  Zap,
  Target,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
  Play,
  Pause,
  Volume2,
  MessageSquare,
  Calendar,
  Globe,
  BarChart3,
  Shield,
  Headphones,
  RefreshCw,
  ChevronRight,
  MoreHorizontal,
  X,
  Send,
  AudioWaveform,
  AudioWaveformIcon
} from 'lucide-react';

export default function AICallingAgentLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [transcript, setTranscript] = useState<{role: 'agent' | 'prospect', text: string, time: string}[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === 'active') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const startDemoCall = () => {
    setCallStatus('connecting');
    setCallDuration(0);
    setTranscript([]);
    
    setTimeout(() => {
      setCallStatus('active');
      setIsPlaying(true);
      
      // Simulate conversation
      const conversation = [
        { role: 'agent' as const, text: "Hi Sarah! This is Alex from CloudSync. I noticed you downloaded our whitepaper on sales automation. How's your current follow-up process working for you?", delay: 1000 },
        { role: 'prospect' as const, text: "Honestly, we're struggling. Our team spends hours on manual outreach and response rates are dropping.", delay: 4000 },
        { role: 'agent' as const, text: "I hear that a lot. Companies using our AI calling agent see 3× more conversations and save 25 hours per week. Would it make sense to explore how this could work for your team?", delay: 8000 },
        { role: 'prospect' as const, text: "That sounds interesting. Can you show me how the AI handles objections?", delay: 12000 },
        { role: 'agent' as const, text: "Absolutely! The AI is trained on thousands of sales conversations. It adapts tone, handles objections naturally, and knows when to escalate to a human. Should I schedule a quick demo for tomorrow?", delay: 16000 },
      ];

      conversation.forEach((msg) => {
        setTimeout(() => {
          setTranscript(prev => [...prev, { ...msg, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}) }]);
        }, msg.delay);
      });

      setTimeout(() => {
        setCallStatus('ended');
        setIsPlaying(false);
      }, 22000);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const stats = [
    { value: '3×', label: 'More Conversations', subtext: 'vs manual dialing' },
    { value: '85%', label: 'Answer Rate', subtext: 'Local presence AI' },
    { value: '25hrs', label: 'Saved Weekly', subtext: 'Per sales rep' },
    { value: '<2s', label: 'Response Time', subtext: 'Instant replies' },
  ];

  const features = [
    {
      icon: <AudioWaveform className="w-8 h-8" />,
      title: 'Human-Like Voice AI',
      description: 'Advanced neural voices that pause, breathe, and adapt tone naturally. Prospects can\'t tell it\'s AI until you tell them.',
      stat: '99%',
      statLabel: 'Human Score'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Smart Call Routing',
      description: 'AI qualifies leads in real-time, handles objections, and seamlessly transfers hot prospects to your team instantly.',
      stat: 'Real-Time',
      statLabel: 'Transfer'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Local Presence',
      description: 'Automatic local area code matching in 50+ countries. Increase answer rates by appearing as a trusted local caller.',
      stat: '50+',
      statLabel: 'Countries'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Live Conversation IQ',
      description: 'Real-time sentiment analysis, talk-to-listen ratios, and coaching prompts. Every call optimized for conversion.',
      stat: 'Live',
      statLabel: 'Analytics'
    }
  ];

  const testimonials = [
    {
      quote: "We went from 50 dials per day to 500 conversations. Our SDRs now only talk to qualified prospects who want to buy.",
      author: "Rachel Kim",
      role: "VP Sales, DataFlow",
      metric: "10×",
      metricLabel: "Productivity",
      avatar: "RK",
      gradient: "from-[var(--color-primary-500)] to-[var(--color-primary-700)]"
    },
    {
      quote: "The AI handles initial outreach, qualification, and scheduling. Our team focuses 100% on closing deals now.",
      author: "Marcus Johnson",
      role: "CEO, GrowthLabs",
      metric: "340%",
      metricLabel: "Pipeline Growth",
      avatar: "MJ",
      gradient: "from-[var(--color-secondary-500)] to-[var(--color-secondary-700)]"
    },
    {
      quote: "Answer rates jumped from 12% to 34% with local presence. The AI voice is incredibly natural and persuasive.",
      author: "Elena Torres",
      role: "SDR Manager, ScaleUp",
      metric: "34%",
      metricLabel: "Answer Rate",
      avatar: "ET",
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
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 4s; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient-shift 15s ease infinite; }
        .animate-wave { animation: wave 1s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-ring { animation: ring 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
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
        .waveform-bar {
          width: 3px;
          background: linear-gradient(to top, var(--color-primary-500), var(--color-secondary-500));
          border-radius: 2px;
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
       {/* Hero Section */}
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
                       AI That Makes{" "} <br/>
                        <span className="relative inline-block">
                          <span className="text-gradient animate-gradient">
                         Real Calls 
                          </span>                       
                                        
                        </span>
                      
                      </h1>
              
                      <p className="text-lg sm:text-xl text-[#0057ad] mb-10 max-w-xl leading-relaxed font-light">
                     An AI calling agent that dials, converses, qualifies, and books meetings—automatically. 
                        <span className="text-[#0066cc] font-medium">
                          {" "}
                         Human-like voice. Superhuman scale.
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
                                     Deploy Ai Caller
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
           className={`lg:col-span-5 xl:col-span-5  relative order-1 lg:order-2 right-10  flex items-center justify-center transition-all duration-1000 delay-300 ${
             isVisible
               ? "opacity-100 translate-y-0"
               : "opacity-0 translate-y-10"
           }`}
         >
           <div className="relative transform-style-3d">
             
             <img
               src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774338876/ai-calling_jfgxup.png"
               alt="AI Robot"
               className="w-[100%] max-w-none pt-8 lg:pt-0 lg:w-[90%] xl:w-[70%] object-contain translate-x-2 lg:translate-x-10"
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
              Voice AI That{' '}
              <span className="text-gradient">Actually Works</span>
            </h2>
            <p className="text-xl text-[var(--color-primary-700)]">
              Advanced conversational AI built specifically for sales calls. Natural, persuasive, and relentlessly effective.
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

      {/* HOW IT WORKS */}
      <section className="relative py-32 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-[var(--color-primary-600)] uppercase tracking-widest mb-4">How It Works</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-primary-900)]">
              Deploy in{' '}
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
                title: 'Upload Your Leads',
                description: 'Import from CRM or CSV. The AI instantly enriches data and prioritizes based on fit and intent signals.'
              },
              {
                step: '02',
                icon: <Mic className="w-6 h-6" />,
                title: 'Train Your Voice',
                description: 'Select from premium neural voices or clone your own. Set talking points, objections handling, and booking criteria.'
              },
              {
                step: '03',
                icon: <Phone className="w-6 h-6" />,
                title: 'Start Calling',
                description: 'The AI dials, converses, qualifies, and books meetings 24/7. You get notified only for qualified opportunities.'
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

      {/* VOICE FEATURES SHOWCASE */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-[var(--color-primary-600)] uppercase tracking-widest mb-4">Voice Technology</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-primary-900)]">
              Why Our AI Voice{' '}
              <span className="text-gradient">Converts Better</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <AudioWaveformIcon className="w-8 h-8" />, title: 'Neural TTS', desc: 'ElevenLabs-powered voices with natural cadence, emotion, and breathing', color: 'from-blue-500 to-blue-700' },
              { icon: <Activity className="w-8 h-8" />, title: 'Real-Time Adaptation', desc: 'AI adjusts tone and pace based on prospect responses and sentiment', color: 'from-green-500 to-emerald-700' },
              { icon: <Shield className="w-8 h-8" />, title: 'Compliance Ready', desc: 'Built-in TCPA, GDPR, and DNC list compliance with automatic opt-out handling', color: 'from-purple-500 to-violet-700' },
              { icon: <BarChart3 className="w-8 h-8" />, title: 'Call Analytics', desc: 'Transcription, sentiment analysis, and conversion tracking for every call', color: 'from-orange-500 to-amber-700' },
            ].map((feature, idx) => (
              <div key={idx} className="glass rounded-3xl p-6 hover:bg-white transition-all duration-500 group border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] shadow-sm hover:shadow-lg text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--color-primary-600)]">{feature.desc}</p>
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
              <span className="text-gradient">Love the Voice</span>
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
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-2">AICaller</h3>
                <p className="text-[var(--color-primary-600)]">Voice AI Engine</p>
              </div>

              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full h-px bg-gradient-to-r from-[var(--color-primary-400)] via-[var(--color-secondary-400)] to-[var(--color-primary-600)] relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--color-primary-600)] rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-2 h-2 bg-[var(--color-primary-400)] rounded-full animate-ping" />
                  <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-2 h-2 bg-[var(--color-secondary-400)] rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {['Salesforce', 'HubSpot', 'Twilio', 'RingCentral', 'Slack', 'Calendar'].map((tool) => (
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
      <section className="relative py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="glass-strong rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden border border-[var(--color-primary-300)] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-100)]/50 via-[var(--color-secondary-100)]/50 to-[var(--color-primary-100)]/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--color-primary-200)]/30 via-transparent to-transparent" />
            
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[var(--color-primary-300)] animate-pulse-glow">
                <Phone className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-[var(--color-primary-900)]">
                Let AI Handle Your{' '}
                <span className="text-gradient">Calling</span>
              </h2>
              
              <p className="text-xl text-[var(--color-primary-700)] mb-10 max-w-2xl mx-auto">
                Join 1,000+ sales teams using AI voice to book more meetings. 
                Start with 100 free calls.
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
                100 free calls • No credit card • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 px-4 border-t border-[var(--color-primary-200)] bg-white/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center shadow-md">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-[var(--color-primary-900)]">AICaller</span>
          </div>
          
          <div className="flex gap-8 text-sm text-[var(--color-primary-600)]">
            <a href="#" className="hover:text-[var(--color-primary-900)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--color-primary-900)] transition-colors">Terms</a>
            <a href="#" className="hover:text-[var(--color-primary-900)] transition-colors">Contact</a>
          </div>

          <div className="text-sm text-[var(--color-primary-500)]">
            © 2026 AICaller AI
          </div>
        </div>
      </footer>
    </main>
  );
}