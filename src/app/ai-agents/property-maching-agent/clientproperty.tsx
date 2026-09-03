// app/property-matcher/page.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  Search, 
  Home, 
  Zap, 
  Calendar, 
  Bell, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Star,
  BarChart3,
  MessageSquare,
  Lock,
  Play,
  ChevronRight,
  Menu,
  X,
  Target,
  Bed,
  Bath,
  Square,
  Bot,
  Key
} from 'lucide-react';

interface Property {
  id: number;
  image: string;
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
  matchScore: number;
  tags: string[];
}

interface Buyer {
  id: number;
  name: string;
  budget: string;
  preferences: string[];
  status: 'active' | 'matched' | 'closed';
}
export default function PropertyMatcherPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  // hero section start
    const [isVisible, setIsVisible] = useState(false);
  const [activeTabhero, setActiveTabhero] = useState<'buyer' | 'agent'>('buyer');
  const [selectedProperty, setSelectedProperty] = useState<number | null>(1);
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMatching, setIsMatching] = useState(false);
  const [matchProgress, setMatchProgress] = useState(0);
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

  const startMatching = () => {
    setIsMatching(true);
    setMatchProgress(0);

    const interval = setInterval(() => {
      setMatchProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsMatching(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const properties: Property[] = [
    {
      id: 1,
      image: 'Modern Villa',
      price: '$1,250,000',
      address: '2847 Pacific Heights Blvd',
      beds: 4,
      baths: 3,
      sqft: '2,850',
      matchScore: 98,
      tags: ['Pool', 'Smart Home', 'View']
    },
    {
      id: 2,
      image: 'Urban Loft',
      price: '$875,000',
      address: '452 Market Street #1204',
      beds: 2,
      baths: 2,
      sqft: '1,400',
      matchScore: 94,
      tags: ['Downtown', 'Gym', 'Parking']
    },
    {
      id: 3,
      image: 'Suburban Home',
      price: '$950,000',
      address: '1289 Oak Valley Rd',
      beds: 3,
      baths: 2.5,
      sqft: '2,100',
      matchScore: 91,
      tags: ['Garden', 'Schools', 'Quiet']
    }
  ];

  const buyers: Buyer[] = [
    { id: 1, name: 'Sarah Chen', budget: '$1.2M - $1.5M', preferences: ['4BR', 'Pool', 'View'], status: 'matched' },
    { id: 2, name: 'Marcus Johnson', budget: '$800K - $1M', preferences: ['Downtown', '2BR', 'Modern'], status: 'active' },
    { id: 3, name: 'The Rodriguez Family', budget: '$900K - $1.1M', preferences: ['3BR', 'Garden', 'Schools'], status: 'active' },
  ];

 
  // hero section end

  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '97%', label: 'Match Accuracy', subtext: 'AI-powered precision' },
    { value: '4.2×', label: 'Faster Closings', subtext: 'Speed to close deals' },
    { value: '12s', label: 'Response Time', subtext: 'Instant matching' },
    { value: '85%', label: 'Less Busywork', subtext: 'Agent productivity' },
  ];

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Neural Preference Learning',
      description: 'Our AI learns from every interaction, understanding nuanced buyer preferences like commute tolerance, school priorities, and lifestyle needs.',
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Real-Time Market Intelligence',
      description: 'Live market analysis with predictive pricing, neighborhood trends, and investment scoring. Spot opportunities before they hit the market.',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Autonomous Tour Scheduling',
      description: 'Qualified buyers get instant viewing appointments. Syncs with lockboxes, agent calendars, and MLS data automatically.',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Smart Nurturing Engine',
      description: 'Not ready to buy? Our AI sends personalized property alerts and market updates based on evolving criteria and behavior.',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Capture Intent',
      description: 'Every website visit, search, and inquiry is tracked. Our AI identifies serious buyers the moment they engage.',
      icon: <Search className="w-5 h-5" />,
    },
    {
      step: '02',
      title: 'Deep Profiling',
      description: 'Natural AI conversation collects must-haves, nice-to-haves, budget, and timeline without feeling like a form.',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      step: '03',
      title: 'Intelligent Scoring',
      description: '200+ data points synthesized into a 0-100 match score using behavioral cues, market data, and preferences.',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      step: '04',
      title: 'Instant Delivery',
      description: 'Perfect matches delivered instantly. Hot leads go to agents, warm leads enter nurture campaigns automatically.',
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  const integrations = [
    { name: 'MLS', category: 'Data', icon: <Database className="w-5 h-5" /> },
    { name: 'Salesforce', category: 'CRM', icon: <Cloud className="w-5 h-5" /> },
    { name: 'HubSpot', category: 'CRM', icon: <HubspotIcon /> },
    { name: 'Zillow', category: 'Portal', icon: <Home className="w-5 h-5" /> },
    { name: 'ShowingTime', category: 'Scheduling', icon: <Calendar className="w-5 h-5" /> },
    { name: 'SentriLock', category: 'Access', icon: <Lock className="w-5 h-5" /> },
    { name: 'Mailchimp', category: 'Marketing', icon: <Mail className="w-5 h-5" /> },
    { name: 'Slack', category: 'Comms', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  const testimonials = [
    {
      quote: "We saw a 50% increase in qualified showings within the first month. Our agents now focus on closing, not qualifying leads.",
      author: 'Marcus Chen',
      role: 'Broker Owner, Austin Elite Realty',
      metric: '50%',
      metricLabel: 'More Showings',
      avatar: 'MC',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      quote: "The matching accuracy is incredible. It understands buyer preferences better than some of our veteran agents.",
      author: 'Danielle Okonkwo',
      role: 'Team Lead, Compass',
      metric: '40%',
      metricLabel: 'Faster Closes',
      avatar: 'DO',
      color: 'bg-gradient-to-br from-violet-500 to-purple-600',
    },
    {
      quote: "PropertyMatcher paid for itself in the first month with two extra deals. The ROI is undeniable.",
      author: 'Raj Patel',
      role: 'Founder, Patel Properties',
      metric: '2×',
      metricLabel: 'ROI Month 1',
      avatar: 'RP',
      color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    },
  ];

  const matchExamples = [
    {
      buyer: 'James Whitfield',
      type: 'Hot Match',
      score: 96,
      property: '2456 Oak Valley Rd',
      details: '4BR · 3BA · $1.15M · Austin, TX',
      metrics: [
        { label: 'Budget', value: 98, color: 'bg-red-500' },
        { label: 'Location', value: 95, color: 'bg-red-500' },
        { label: 'Amenities', value: 92, color: 'bg-red-500' },
      ],
      badgeColor: 'bg-red-100 text-red-700 border-red-200',
    },
    {
      buyer: 'Priya Sharma',
      type: 'Warm Match',
      score: 68,
      property: '892 Pine Crest Ave',
      details: '3BR · 2BA · $875K · Austin, TX',
      metrics: [
        { label: 'Budget', value: 75, color: 'bg-amber-500' },
        { label: 'Location', value: 60, color: 'bg-amber-500' },
        { label: 'Amenities', value: 55, color: 'bg-amber-500' },
      ],
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
    },
  ];
  

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out infinite 2s; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient-shift 8s ease infinite; }
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal.animate-in { opacity: 1; transform: translateY(0); }
        .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2); }
        .text-gradient { background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>

   
      {/* Global Styles */}
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
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
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

      {/* Dynamic Background */}
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
                    Find Your Perfect{" "} <br/>
                     <span className="relative inline-block">
                       <span className="text-gradient animate-gradient">
                        Match in Second  
                       </span>                       
                                     
                     </span>
                   
                   </h1>
           
                   <p className="text-lg sm:text-xl text-[#0057ad] mb-10 max-w-xl leading-relaxed font-light">
                    AI that understands buyer preferences, matches properties instantly, and closes deals 3× faster. 
                     <span className="text-[#0066cc] font-medium">
                       {" "}
                      98% match accuracy. 24/7 availability.
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
                                   Get Started
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
            src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335576/property-hero-robo_y6drjt.png"
            alt="AI Robot"
            className="w-[100%] max-w-none pt-6 lg:pt-0 lg:w-[90%] xl:w-full object-contain translate-x-2 lg:translate-x-10"
          />

        </div>
      </div>
          </div>

         
        </div>
      </section>
      {/* Stats Bar */}
      <section ref={statsRef} className="py-12 lg:py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-900 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" ref={featuresRef} className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 reveal">
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Everything Your Team Needs to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-gradient">Close More Deals</span>
            </h2>
            <p className="text-lg text-slate-600">
              Built for speed, precision, and scale — PropertyMatcher combines AI reasoning with deep real estate expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 reveal"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-gradient-to-br ${feature.color} text-white p-3 rounded-xl`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{feature.description}</p>
                <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-[var(--color-primary-900)] text-white overflow-hidden relative">
        {/* <div className="absolute inset-0 w-90 h-90 rounded-full bg-linear-to-tr from-[var(--color-primary-900)]/90 via-slate-900/40 to-[var(--color-primary-900)]" /> */}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 reveal">
            <span className="inline-block text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">How It Works</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              From Prospect to Perfect Match in{' '}
              <span className="text-blue-400">60 Seconds</span>
            </h2>
            <p className="text-lg text-slate-400">
              Our AI engine captures, analyzes, and matches buyers to properties automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {workflowSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="relative group reveal"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:bg-slate-800 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-bold text-slate-700 group-hover:text-blue-500/30 transition-colors">{step.step}</span>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{step.description}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-slate-600">
                    <ArrowRight className="w-full h-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Matching Demo */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal">
              <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Live Matching</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                See the Magic Happen in{' '}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-gradient">Real-Time</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Every buyer is profiled, scored, and matched instantly. Watch as our AI delivers qualified leads directly to your agents.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <Zap className="w-5 h-5" />, text: 'Sub-second match scoring' },
                  { icon: <Users className="w-5 h-5" />, text: 'Automatic lead qualification' },
                  { icon: <TrendingUp className="w-5 h-5" />, text: 'Predictive closing probability' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 reveal">
              {matchExamples.map((match, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold">
                        {match.buyer.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{match.buyer}</div>
                        <div className="text-xs text-slate-500">Buyer Profile</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${match.badgeColor}`}>
                      {match.type}
                    </span>
                  </div>

                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-5xl font-bold text-slate-900">{match.score}</span>
                    <span className="text-lg text-slate-400 mb-1">/100</span>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Home className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-900">{match.property}</div>
                        <div className="text-sm text-slate-500">{match.details}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {match.metrics.map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">{metric.label}</span>
                          <span className="font-semibold text-slate-900">{metric.value}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${metric.color} rounded-full transition-all duration-1000`} 
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Integrations</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Plugs Into Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-gradient">Entire Stack</span>
            </h2>
            <p className="text-lg text-slate-600">
              Connects to your MLS, CRM, showing tools, and marketing platforms out of the box.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {integrations.map((integration, idx) => (
              <div 
                key={idx} 
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center reveal"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-600 group-hover:text-blue-600 transition-colors">
                  {integration.icon}
                </div>
                <div className="font-semibold text-slate-900 mb-1">{integration.name}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{integration.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Trusted by Top-Performing{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-gradient">Real Estate Teams</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl transition-shadow duration-300 reveal"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <div className={`inline-flex items-center gap-2 ${testimonial.color} text-white px-4 py-2 rounded-full text-sm font-bold mb-6`}>
                  <TrendingUp className="w-4 h-4" />
                  {testimonial.metric} {testimonial.metricLabel}
                </div>

                <p className="text-slate-700 leading-relaxed mb-8 text-lg">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.author}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-700" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Your Next Buyer Is Waiting for the Perfect Match
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Deploy PropertyMatcher in under 10 minutes. No code required. Start matching buyers to their dream homes on autopilot.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
            <button className="px-8 py-4 rounded-full bg-white text-blue-600 font-bold hover:bg-blue-50 transition-colors shadow-xl">
              Get Started
            </button>
          </div>
          
          <p className="text-sm text-blue-200">
            Free 14-day trial · No credit card required · Cancel anytime
          </p>
        </div>
      </section>

    
    </main>
  );
}

// Icon Components
function Brain({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  );
}

function Globe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function Database({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
      <path d="M3 12A9 3 0 0 0 21 12"/>
    </svg>
  );
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19c0-1.7-1.3-3-3-3h-11c-1.7 0-3 1.3-3 3 0 1.7 1.3 3 3 3h11c1.7 0 3-1.3 3-3z"/>
      <path d="M17.5 19c0-1.7-1.3-3-3-3h-11c-1.7 0-3 1.3-3 3 0 1.7 1.3 3 3 3h11c1.7 0 3-1.3 3-3z"/>
      <path d="M17.5 19c0-1.7-1.3-3-3-3h-11c-1.7 0-3 1.3-3 3 0 1.7 1.3 3 3 3h11c1.7 0 3-1.3 3-3z"/>
    </svg>
  );
}

function HubspotIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984 2.21 2.21 0 00-4.418 0 2.198 2.198 0 001.267 1.984v2.846a5.706 5.706 0 00-3.657 2.08l-7.095-5.52a2.216 2.216 0 00.088-.555 2.21 2.21 0 10-2.21 2.21c.193 0 .38-.026.555-.074l5.52 7.095a5.706 5.706 0 102.083-3.657z"/>
    </svg>
  );
}

function Mail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}