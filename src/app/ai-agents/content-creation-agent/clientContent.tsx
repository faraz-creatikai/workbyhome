// app/content-creation-agent/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Wand2, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  Zap, 
  Layers,
  PenTool,
  Share2,
  Clock,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Play,
  Star,
  Users,
  BarChart3,
  Globe,
  Target,
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  MessageSquare,
  Bot,
  Send,
  Loader2,
  Maximize2,
  X
} from 'lucide-react';

export default function ContentCreationAgentLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('blog');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
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
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const contentTypes = [
    { id: 'blog', label: 'Blog Posts', icon: <FileText className="w-5 h-5" />, color: 'from-[var(--color-primary-500)] to-[var(--color-primary-700)]' },
    { id: 'social', label: 'Social Media', icon: <Share2 className="w-5 h-5" />, color: 'from-[var(--color-secondary-500)] to-[var(--color-secondary-700)]' },
    { id: 'video', label: 'Video Scripts', icon: <Video className="w-5 h-5" />, color: 'from-[var(--color-primary-400)] to-[var(--color-secondary-500)]' },
    { id: 'ad', label: 'Ad Copy', icon: <Target className="w-5 h-5" />, color: 'from-[var(--color-primary-600)] to-[var(--color-primary-800)]' },
    { id: 'email', label: 'Emails', icon: <MessageSquare className="w-5 h-5" />, color: 'from-[var(--color-secondary-400)] to-[var(--color-primary-500)]' },
    { id: 'seo', label: 'SEO Content', icon: <BarChart3 className="w-5 h-5" />, color: 'from-[var(--color-primary-700)] to-[var(--color-secondary-600)]' },
  ];

  const features = [
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: 'One-Click Generation',
      description: 'Create entire content pieces with a single prompt. Our AI understands context, tone, and your brand voice instantly.',
      stat: '10×',
      statLabel: 'Faster'
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: 'Multi-Format Magic',
      description: 'Generate blogs, social posts, video scripts, ads, and emails—all from one central creative hub.',
      stat: '50+',
      statLabel: 'Formats'
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: 'Brand Voice Learning',
      description: 'Train the AI on your existing content. It learns your unique style and maintains consistency across all channels.',
      stat: '100%',
      statLabel: 'On-Brand'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-Time Optimization',
      description: 'SEO scoring, readability analysis, and engagement predictions happen as you type—not after.',
      stat: '85+',
      statLabel: 'SEO Score'
    }
  ];

  const testimonials = [
    {
      quote: "We went from 2 blog posts a week to 20. The quality is incredible—our readers can't tell it's AI.",
      author: "Marcus Chen",
      role: "Content Director, TechFlow",
      metric: "10×",
      metricLabel: "Output Increase",
      avatar: "MC",
      gradient: "from-[var(--color-primary-500)] to-[var(--color-primary-700)]"
    },
    {
      quote: "Our social media engagement jumped 340% in 30 days. The AI just gets our voice perfectly.",
      author: "Sarah Williams",
      role: "Marketing Lead, Bloom Co",
      metric: "340%",
      metricLabel: "Engagement Boost",
      avatar: "SW",
      gradient: "from-[var(--color-secondary-500)] to-[var(--color-secondary-700)]"
    },
    {
      quote: "Video scripts that used to take 4 hours now take 10 minutes. And they're better than what I wrote.",
      author: "David Park",
      role: "YouTuber, 2M Subscribers",
      metric: "24×",
      metricLabel: "Time Saved",
      avatar: "DP",
      gradient: "from-[var(--color-primary-400)] to-[var(--color-secondary-500)]"
    }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
    }, 2000);
  };

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
        @keyframes typing {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 4s; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient-shift 15s ease infinite; }
        .animate-typing { animation: typing 1.4s infinite; }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
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
        
        {/* Animated Orbs - Light Theme */}
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
        
        {/* Gradient Mesh - Light */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-100)]/30 via-transparent to-[var(--color-secondary-100)]/30" />
      </div>

      {/* HERO SECTION */}
     <section ref={heroRef} 
             className="relative min-h-screen flex items-center px-4 py-20 overflow-hidden perspective-1000">
            <div className="max-w-7xl mx-auto w-full relative z-10">
              <div className="grid lg:grid-cols-12  items-center">
    
                  {/* Left: Content */}
                     <div
                       className={`lg:col-span-7 xl:col-span-7  order-2 sm:order-1 transition-all py-10 duration-1000 ${
                         isVisible
                           ? "opacity-100 translate-y-0"
                           : "opacity-0 translate-y-10"
                       }`}
                     >
                       <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold  leading-[0.9] mb-8 tracking-tight text-[var(--color-primary-800)]">
                       Create Content {" "} <br/>
                         <span className="relative inline-block">
                           <span className="text-gradient animate-gradient">
                          10× Faster
                           </span>                       
                                         
                         </span>
                       
                       </h1>
               
                       <p className="text-lg sm:text-xl text-[#0057ad] mb-10 max-w-xl leading-relaxed font-light">
                    The AI content agent that writes blogs, social posts, video scripts, and ad copy in your brand voice.
                         <span className="text-[#0066cc] font-medium">
                           {" "}
                           No prompts needed.
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
                                      Start Creating
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
            className={`lg:col-span-5 xl:col-span-5  relative order-1 sm:order-2 sm:right-10  flex items-center justify-center transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative transform-style-3d">
              
              <img
                src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774344447/content-creation_vx9cdv.png"
                alt="AI Robot"
                className="w-[100%] max-w-none lg:w-[90%] xl:w-[80%] object-contain translate-x-2 lg:translate-x-10"
              />
    
            </div>
          </div>
              </div>
    
               {/* Stats Bar */}
           <div className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
              { value: '10×', label: 'Faster Creation', subtext: 'vs manual writing' },
              { value: '50+', label: 'Content Formats', subtext: 'All channels covered' },
              { value: '94%', label: 'Human Quality', subtext: 'AI detection safe' },
              { value: '3M+', label: 'Articles Created', subtext: 'And counting daily' },
            ].map((stat, idx) => (
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

      {/* FEATURES - Bento Grid Layout */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-sm font-medium text-[var(--color-primary-600)] uppercase tracking-widest mb-4">Capabilities</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-primary-900)]">
              Everything You Need to{' '}
              <span className="text-gradient">Create at Scale</span>
            </h2>
            <p className="text-xl text-[var(--color-primary-700)]">
              From ideation to publication, our AI agent handles the entire content workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 auto-rows-fr">
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

      {/* HOW IT WORKS - Agentic Process */}
      <section className="relative py-32 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-[var(--color-primary-600)] uppercase tracking-widest mb-4">How It Works</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-primary-900)]">
              Your AI Agent in{' '}
              <span className="text-gradient">3 Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-[var(--color-primary-400)] via-[var(--color-secondary-400)] to-[var(--color-primary-600)]" />

            {[
              {
                step: '01',
                icon: <MessageSquare className="w-6 h-6" />,
                title: 'Describe Your Need',
                description: 'Tell the agent what you want—in plain English. No prompts, no templates, no complexity.'
              },
              {
                step: '02',
                icon: <Wand2 className="w-6 h-6" />,
                title: 'AI Creates & Optimizes',
                description: 'The agent researches, writes, and optimizes your content in seconds. SEO, tone, format—all handled.'
              },
              {
                step: '03',
                icon: <Share2 className="w-6 h-6" />,
                title: 'Publish Everywhere',
                description: 'One-click export to your CMS, social platforms, or email tool. Schedule and automate publishing.'
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

      {/* CONTENT TYPES - Visual Showcase */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-[var(--color-primary-600)] uppercase tracking-widest mb-4">Formats</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[var(--color-primary-900)]">
              Create Any Type of{' '}
              <span className="text-gradient">Content</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentTypes.map((type, idx) => (
              <div 
                key={type.id} 
                className="group glass rounded-3xl p-6 hover:bg-white transition-all duration-500 cursor-pointer border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] shadow-sm hover:shadow-lg overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${type.color} mb-4 shadow-md`}>
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-2">{type.label}</h3>
                  <p className="text-[var(--color-primary-700)] text-sm mb-4">Generate professional {type.label.toLowerCase()} in seconds with AI optimization.</p>
                  <div className="flex items-center text-[var(--color-primary-600)] text-sm font-medium group-hover:gap-2 transition-all">
                    Try it <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
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
              Loved by Content{' '}
              <span className="text-gradient">Creators</span>
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

      {/* INTEGRATIONS - Flow Diagram */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-[var(--color-primary-600)] uppercase tracking-widest mb-4">Integrations</span>
          <h2 className="text-5xl lg:text-6xl font-bold mb-16 text-[var(--color-primary-900)]">
            Fits Your{' '}
            <span className="text-gradient">Workflow</span>
          </h2>

          <div className="glass-strong rounded-3xl p-12 relative overflow-hidden border border-[var(--color-primary-200)] shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-100)]/50 via-[var(--color-secondary-100)]/50 to-[var(--color-primary-100)]/50" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-lg shadow-[var(--color-primary-300)]">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-2">ContentAgent</h3>
                <p className="text-[var(--color-primary-600)]">AI Creation Engine</p>
              </div>

              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full h-px bg-gradient-to-r from-[var(--color-primary-400)] via-[var(--color-secondary-400)] to-[var(--color-primary-600)] relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--color-primary-600)] rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-2 h-2 bg-[var(--color-primary-400)] rounded-full animate-ping" />
                  <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-2 h-2 bg-[var(--color-secondary-400)] rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {['WordPress', 'Shopify', 'Webflow', 'Notion', 'Slack', 'HubSpot'].map((tool) => (
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
                <Sparkles className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-[var(--color-primary-900)]">
                Start Creating{' '}
                <span className="text-gradient">10× Faster</span>
              </h2>
              
              <p className="text-xl text-[var(--color-primary-700)] mb-10 max-w-2xl mx-auto">
                Join 50,000+ creators who've transformed their content workflow. 
                No credit card required. Cancel anytime.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="flex-1 px-6 py-4 rounded-xl bg-white border-2 border-[var(--color-primary-200)] text-[var(--color-primary-900)] placeholder:text-[var(--color-primary-400)] focus:outline-none focus:border-[var(--color-primary-600)] focus:ring-4 focus:ring-[var(--color-primary-100)] transition-all shadow-sm"
                />
                <button className="px-8 py-4 rounded-xl bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[var(--color-primary-200)] whitespace-nowrap">
                  Get Started Free
                </button>
              </div>

              <p className="text-sm text-[var(--color-primary-600)]">
                Free 14-day trial • No credit card • Setup in 2 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

   
    </main>
  );
}