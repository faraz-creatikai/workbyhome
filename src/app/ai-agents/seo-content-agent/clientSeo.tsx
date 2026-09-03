'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  Bot, 
  TrendingUp, 
  Clock,
  Zap,
  Target,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Star,
  FileText,
  Globe,
  Shield,
  Hash,
  Link2,
  PenTool,
  Layout,
  Eye,
  MoreHorizontal,
  RefreshCw,
  ChevronRight,
  Award,
  Cpu,
  LineChart,
  PieChart,
  AlignLeft,
  Heading,
  Type,
  Image,
  ExternalLink,
  ChevronDown,
  Play,
  Pause,
  Download,
  Copy,
  Check
} from 'lucide-react';

// Type definitions
interface ContentScore {
  category: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'needs-improvement';
}

interface KeywordData {
  keyword: string;
  volume: string;
  difficulty: string;
  intent: 'informational' | 'transactional' | 'navigational';
}

interface OutlineItem {
  id: number;
  title: string;
  type: 'h2' | 'h3';
  children?: OutlineItem[];
}

interface Metric {
  value: string;
  label: string;
  subtext: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  capabilities: string[];
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  avatar: string;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export default function AISEOContentAgentLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'research' | 'write' | 'optimize'>('research');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentProgress, setContentProgress] = useState(0);
  const [showScores, setShowScores] = useState(false);
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
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

  const startGeneration = () => {
    setIsGenerating(true);
    setContentProgress(0);
    setShowScores(false);

    const interval = setInterval(() => {
      setContentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setShowScores(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats: Metric[] = [
    { value: '10×', label: 'Faster Research', subtext: 'AI-powered analysis', trend: 'up', icon: <Zap className="w-5 h-5" /> },
    { value: '94', label: 'SEO Score', subtext: 'Average optimization', trend: 'up', icon: <Award className="w-5 h-5" /> },
    { value: '340%', label: 'Traffic Growth', subtext: 'In 6 months', trend: 'up', icon: <TrendingUp className="w-5 h-5" /> },
    { value: '50+', label: 'Languages', subtext: 'Global reach', trend: 'neutral', icon: <Globe className="w-5 h-5" /> },
  ];

  const contentScores: ContentScore[] = [
    { category: 'Keyword Optimization', score: 98, maxScore: 100, status: 'excellent' },
    { category: 'Readability', score: 92, maxScore: 100, status: 'excellent' },
    { category: 'Content Structure', score: 95, maxScore: 100, status: 'excellent' },
    { category: 'Semantic SEO', score: 88, maxScore: 100, status: 'good' },
    { category: 'Link Profile', score: 85, maxScore: 100, status: 'good' },
  ];

  const keywords: KeywordData[] = [
    { keyword: 'ai content creation', volume: '14K', difficulty: 'Medium', intent: 'informational' },
    { keyword: 'seo writing tools', volume: '8.5K', difficulty: 'Low', intent: 'transactional' },
    { keyword: 'content optimization', volume: '12K', difficulty: 'Medium', intent: 'informational' },
    { keyword: 'ai seo software', volume: '6.2K', difficulty: 'High', intent: 'transactional' },
  ];

  const outline: OutlineItem[] = [
    { id: 1, title: 'Introduction to AI SEO', type: 'h2' },
    { id: 2, title: 'How AI Transforms Content Creation', type: 'h2', children: [
      { id: 3, title: 'Automated Keyword Research', type: 'h3' },
      { id: 4, title: 'Semantic Content Analysis', type: 'h3' },
    ]},
    { id: 5, title: 'Best Practices for 2026', type: 'h2' },
    { id: 6, title: 'Conclusion', type: 'h2' },
  ];

  const features: Feature[] = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'AI Keyword Intelligence',
      description: 'Uncover high-intent, low-competition keywords with search volume, difficulty scores, and SERP analysis powered by machine learning.',
      capabilities: ['Search intent analysis', 'Competitor gap research', 'Long-tail discovery', 'Trend forecasting']
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: 'Autonomous Content Writer',
      description: 'Generate 4,000+ word articles optimized for your target keywords. AI structures content, adds headings, and ensures E-E-A-T compliance.',
      capabilities: ['Blog posts & articles', 'Product descriptions', 'Meta descriptions', 'FAQ generation']
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: 'Smart Content Optimizer',
      description: 'Real-time SEO scoring as you write. Get suggestions for keyword placement, readability improvements, and semantic enhancements.',
      capabilities: ['Live SEO scoring', 'Readability analysis', 'Keyword density check', 'Semantic suggestions']
    },
    {
      icon: <Link2 className="w-8 h-8" />,
      title: 'Internal Link Architect',
      description: 'AI automatically suggests and creates internal links between your content pieces, building topical authority and improving crawlability.',
      capabilities: ['Auto-link suggestions', 'Anchor text optimization', 'Orphan page detection', 'Link equity distribution']
    }
  ];

  const testimonials: Testimonial[] = [
    {
      quote: "We published 200 SEO-optimized articles in 3 months. Organic traffic increased 400% and we're now ranking #1 for 50+ competitive keywords.",
      author: "David Chen",
      role: "Head of Growth",
      company: "TechFlow SaaS",
      metric: "400%",
      metricLabel: "Traffic Growth",
      avatar: "DC"
    },
    {
      quote: "The AI understands search intent better than our previous agency. Content scores average 95+ and our client retention improved dramatically.",
      author: "Sarah Mitchell",
      role: "SEO Director",
      company: "DigitalFirst Agency",
      metric: "95+",
      metricLabel: "Avg SEO Score",
      avatar: "SM"
    },
    {
      quote: "From keyword research to published article in 20 minutes. What used to take our team a week now happens in an afternoon.",
      author: "Marcus Johnson",
      role: "Content Lead",
      company: "Ecommerce Plus",
      metric: "20min",
      metricLabel: "Per Article",
      avatar: "MJ"
    }
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for solo bloggers and small websites",
      features: [
        "20 AI articles/month",
        "Basic keyword research",
        "SEO optimization scores",
        "1 user seat",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: "$149",
      period: "/month",
      description: "For growing teams and content agencies",
      features: [
        "100 AI articles/month",
        "Advanced keyword intelligence",
        "Competitor analysis",
        "5 user seats",
        "Priority support",
        "API access"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited articles",
        "White-label options",
        "Custom AI training",
        "Unlimited users",
        "Dedicated success manager",
        "SSO & advanced security"
      ]
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <main className="min-h-screen bg-[#e6f2ff] text-[#003871] font-sans overflow-x-hidden selection:bg-[#99ccff] selection:text-[#003871]">
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
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 4s; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient-shift 15s ease infinite; }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scan { animation: scan 2s linear infinite; }
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

      {/* HERO SECTION - Same structure, SEO content */}
      <section ref={heroRef} 
                     className="relative min-h-screen flex items-center px-4 py-20 overflow-hidden perspective-1000">
                    <div className="max-w-7xl mx-auto w-full relative z-10">
                      <div className="grid lg:grid-cols-12  items-center">
            
                          {/* Left: Content */}
                             <div
                               className={`lg:col-span-7 xl:col-span-7 transition-all order-2 sm:order-1 py-10 duration-1000 ${
                                 isVisible
                                   ? "opacity-100 translate-y-0"
                                   : "opacity-0 translate-y-10"
                               }`}
                             >
                               <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold  leading-[0.9] mb-8 tracking-tight text-[var(--color-primary-800)]">
                               AI That Ranks{" "} <br/>
                                 <span className="relative inline-block">
                                   <span className="text-gradient animate-gradient">
                            #1 on Google
                                   </span>                       
                                                 
                                 </span>
                               
                               </h1>
                       
                               <p className="text-lg sm:text-xl text-[#0057ad] mb-10 max-w-xl leading-relaxed font-light">
                           Autonomous SEO content creation from keyword research to published article.
                                 <span className="text-[#0066cc] font-medium">
                                   {" "}
                                    10× faster. 340% more organic traffic.
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
                                              Start Writing
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
                    className={`lg:col-span-5 xl:col-span-5 order-1 sm:order-2 relative right-10  flex items-center justify-center transition-all duration-1000 delay-300 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="relative transform-style-3d">
                      
                      <img
                        src="/assets/seo-hero-robo.png"
                        alt="AI Robot"
                        className="w-fit xl:w-full object-contain translate-x-6 lg:translate-x-10"
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

      {/* FEATURES - Zig Zag Layout */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-sm font-medium text-[#0066cc] uppercase tracking-widest mb-4">Capabilities</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#003871]">
              Complete SEO{' '}
              <span className="text-gradient">Content Stack</span>
            </h2>
            <p className="text-xl text-[#0057ad]">
              From keyword research to published article, our AI handles every aspect of SEO content creation.
            </p>
          </div>

          <div className="space-y-24">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cce5ff] to-[#99ccff] flex items-center justify-center text-[#0066cc] mb-6 border border-[#66b2ff] shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-[#003871] mb-4">{feature.title}</h3>
                  <p className="text-lg text-[#0057ad] mb-6 leading-relaxed">{feature.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {feature.capabilities.map((cap, capIdx) => (
                      <div key={capIdx} className="flex items-center gap-2 text-sm text-[#0066cc]">
                        <CheckCircle2 className="w-4 h-4 text-[#0066cc]" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="glass-strong rounded-3xl p-8 border border-[#99ccff] shadow-xl">
                    {/* Visual representation for each feature */}
                    {idx === 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#cce5ff]">
                          <div className="w-10 h-10 rounded-lg bg-[#e6f2ff] flex items-center justify-center">
                            <Search className="w-5 h-5 text-[#0066cc]" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-[#003871]">AI Keyword Research</div>
                            <div className="text-xs text-[#3399ff]">14,200 related keywords found</div>
                          </div>
                          <div className="text-green-500 text-sm font-bold">+234%</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {['High Intent', 'Low Comp', 'Trending'].map((tag, i) => (
                            <div key={i} className="text-center py-2 bg-[#e6f2ff] rounded-lg text-xs text-[#0066cc] font-medium">
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {idx === 1 && (
                      <div className="space-y-3">
                        <div className="h-4 bg-[#e6f2ff] rounded-full w-3/4" />
                        <div className="h-4 bg-[#cce5ff] rounded-full w-full" />
                        <div className="h-4 bg-[#e6f2ff] rounded-full w-5/6" />
                        <div className="h-4 bg-[#cce5ff] rounded-full w-4/5" />
                        <div className="flex items-center gap-2 mt-4 p-3 bg-gradient-to-r from-[#0066cc] to-[#3399ff] rounded-xl text-white">
                          <Bot className="w-5 h-5" />
                          <span className="text-sm">Generating 2,400 words...</span>
                        </div>
                      </div>
                    )}
                    {idx === 2 && (
                      <div className="space-y-3">
                        {[
                          { label: 'Keyword Density', score: 98 },
                          { label: 'Readability', score: 92 },
                          { label: 'Structure', score: 95 },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-sm text-[#003871] w-32">{item.label}</span>
                            <div className="flex-1 h-2 bg-[#e6f2ff] rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#0066cc] to-[#3399ff] rounded-full" style={{ width: `${item.score}%` }} />
                            </div>
                            <span className="text-sm font-bold text-[#0066cc] w-8">{item.score}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {idx === 3 && (
                      <div className="space-y-3">
                        <div className="p-4 bg-white rounded-xl border border-[#cce5ff]">
                          <div className="text-sm text-[#003871] mb-2">Internal Links Suggested</div>
                          <div className="flex flex-wrap gap-2">
                            {['SEO Basics', 'Content Strategy', 'Link Building', 'Technical SEO'].map((link, i) => (
                              <span key={i} className="px-3 py-1 bg-[#e6f2ff] text-[#0066cc] text-xs rounded-full border border-[#99ccff]">
                                {link}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#3399ff]">
                          <Link2 className="w-4 h-4" />
                          <span>12 contextual links auto-inserted</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Vertical Timeline */}
      <section className="relative py-32 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-[#0066cc] uppercase tracking-widest mb-4">How It Works</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#003871]">
              From Keyword to{' '}
              <span className="text-gradient">Published in Minutes</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#0066cc] via-[#3399ff] to-[#0066cc]" />

            {[
              {
                step: '01',
                icon: <Target className="w-6 h-6" />,
                title: 'Enter Your Topic',
                description: 'Input a keyword or topic. Our AI analyzes SERP data, competitor content, and search intent to build a comprehensive content strategy.'
              },
              {
                step: '02',
                icon: <Cpu className="w-6 h-6" />,
                title: 'AI Research & Outline',
                description: 'The agent conducts deep research, identifies content gaps, and creates a structured outline optimized for featured snippets and rankings.'
              },
              {
                step: '03',
                icon: <PenTool className="w-6 h-6" />,
                title: 'Autonomous Writing',
                description: 'AI writes the full article with proper headings, internal links, images, and SEO optimization. E-E-A-T compliant by default.'
              },
              {
                step: '04',
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: 'Publish & Rank',
                description: 'One-click publish to WordPress, Webflow, or your CMS. AI continues monitoring performance and suggests updates.'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative flex gap-8 mb-12 last:mb-0">
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0066cc] to-[#0057ad] flex items-center justify-center text-white shadow-lg shadow-[#66b2ff] flex-shrink-0">
                  {item.icon}
                </div>
                <div className="glass-strong rounded-2xl p-6 flex-1 border border-[#99ccff] hover:border-[#0066cc] transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-[#3399ff]">STEP {item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#003871] mb-2">{item.title}</h3>
                  <p className="text-[#0057ad]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT TYPES - Grid Cards */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-[#0066cc] uppercase tracking-widest mb-4">Versatile</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#003871]">
              Every Content Type.{' '}
              <span className="text-gradient">Optimized.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FileText className="w-6 h-6" />, title: 'Blog Posts', desc: 'Long-form articles optimized for target keywords with perfect structure.', color: 'from-[#0066cc] to-[#3399ff]' },
              { icon: <Layout className="w-6 h-6" />, title: 'Landing Pages', desc: 'Conversion-focused copy that ranks and drives sign-ups.', color: 'from-[#2676d9] to-[#4096ff]' },
              { icon: <Type className="w-6 h-6" />, title: 'Product Descriptions', desc: 'SEO-friendly descriptions that improve visibility and conversions.', color: 'from-[#3399ff] to-[#66b2ff]' },
              { icon: <AlignLeft className="w-6 h-6" />, title: 'Meta Descriptions', desc: 'Click-worthy meta titles and descriptions for every page.', color: 'from-[#0057ad] to-[#0066cc]' },
              { icon: <Hash className="w-6 h-6" />, title: 'FAQ Sections', desc: 'Schema-ready FAQ content for featured snippets.', color: 'from-[#1d5aa6] to-[#2676d9]' },
              { icon: <Globe className="w-6 h-6" />, title: 'Multilingual Content', desc: 'Native-quality content in 50+ languages.', color: 'from-[#0066cc] to-[#2676d9]' },
            ].map((type, idx) => (
              <div key={idx} className="glass rounded-2xl p-6 hover:bg-white transition-all duration-300 group border border-[#99ccff] hover:border-[#0066cc] shadow-sm hover:shadow-lg">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {type.icon}
                </div>
                <h3 className="text-lg font-bold text-[#003871] mb-2">{type.title}</h3>
                <p className="text-sm text-[#3399ff]">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Horizontal Scroll Cards */}
      <section className="relative py-32 px-4 bg-white/50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium text-[#0066cc] uppercase tracking-widest mb-4">Results</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#003871]">
              Teams Scaling with{' '}
              <span className="text-gradient">AI SEO</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="glass-strong rounded-3xl p-8 relative group hover:bg-white transition-all duration-500 border border-[#99ccff] hover:border-[#0066cc] shadow-sm hover:shadow-lg">
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0066cc] to-[#0057ad] flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>

                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f2ff] text-[#0066cc] text-sm font-bold mb-4">
                    <BarChart3 className="w-4 h-4" />
                    {testimonial.metric} {testimonial.metricLabel}
                  </div>
                  <p className="text-[#003871] text-lg leading-relaxed">"{testimonial.quote}"</p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-[#99ccff]">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066cc] to-[#3399ff] flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-[#003871]">{testimonial.author}</div>
                    <div className="text-sm text-[#3399ff]">{testimonial.role}</div>
                    <div className="text-xs text-[#0066cc]">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING - Clean Cards */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium text-[#0066cc] uppercase tracking-widest mb-4">Pricing</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#003871]">
              Simple, Scalable{' '}
              <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-xl text-[#0057ad]">Start free. Scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => (
              <div 
                key={idx} 
                className={`glass rounded-3xl p-8 transition-all duration-300 hover:scale-105 ${
                  tier.highlighted 
                    ? 'border-2 border-[#0066cc] shadow-xl shadow-[#cce5ff] bg-white' 
                    : 'border border-[#99ccff] hover:border-[#0066cc]'
                }`}
              >
                {tier.highlighted && (
                  <div className="inline-block px-4 py-1 rounded-full bg-[#0066cc] text-white text-xs font-bold mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-[#003871] mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-[#0066cc]">{tier.price}</span>
                  <span className="text-[#3399ff]">{tier.period}</span>
                </div>
                <p className="text-sm text-[#3399ff] mb-6">{tier.description}</p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-sm text-[#0057ad]">
                      <CheckCircle2 className="w-4 h-4 text-[#0066cc] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                  tier.highlighted 
                    ? 'bg-[#0066cc] hover:bg-[#0057ad] text-white shadow-lg shadow-[#cce5ff]' 
                    : 'bg-[#e6f2ff] hover:bg-[#cce5ff] text-[#0066cc]'
                }`}>
                  {tier.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS - Logo Cloud */}
      <section className="relative py-32 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-[#0066cc] uppercase tracking-widest mb-4">Integrations</span>
          <h2 className="text-5xl lg:text-6xl font-bold mb-16 text-[#003871]">
            Works With Your{' '}
            <span className="text-gradient">Tech Stack</span>
          </h2>

          <div className="glass-strong rounded-3xl p-12 border border-[#99ccff] shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {['WordPress', 'Webflow', 'Shopify', 'Notion', 'Google Docs', 'Zapier'].map((tool, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 rounded-2xl bg-[#e6f2ff] flex items-center justify-center text-[#0066cc] font-bold text-lg group-hover:bg-[#0066cc] group-hover:text-white transition-all">
                    {tool.charAt(0)}
                  </div>
                  <span className="text-sm text-[#3399ff] group-hover:text-[#0066cc] transition-colors">{tool}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-[#cce5ff]">
              <div className="flex items-center justify-center gap-2 text-[#3399ff]">
                <span>And 50+ more integrations</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="glass-strong rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden border border-[#66b2ff] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#cce5ff]/50 via-[#d9eaff]/50 to-[#cce5ff]/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#99ccff]/30 via-transparent to-transparent" />

            <div className="relative z-10">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#0066cc] to-[#0057ad] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#66b2ff] animate-pulse-glow">
                <Search className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-[#003871]">
                Rank Higher with{' '}
                <span className="text-gradient">AI Content</span>
              </h2>

              <p className="text-xl text-[#0057ad] mb-10 max-w-2xl mx-auto">
                Join 10,000+ marketers using AI to dominate search rankings. 
                Start with 10 free articles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="flex-1 px-6 py-4 rounded-xl bg-white border-2 border-[#99ccff] text-[#003871] placeholder:text-[#3399ff] focus:outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-[#cce5ff] transition-all shadow-sm"
                />
                <button className="px-8 py-4 rounded-xl bg-[#0066cc] hover:bg-[#0057ad] text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#cce5ff] whitespace-nowrap">
                  Start Free Trial
                </button>
              </div>

              <p className="text-sm text-[#3399ff]">
                10 free articles • No credit card • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 px-4 border-t border-[#99ccff] bg-white/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066cc] to-[#0057ad] flex items-center justify-center shadow-md">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-[#003871]">SEOContent AI</span>
          </div>

          <div className="flex gap-8 text-sm text-[#3399ff]">
            <a href="#" className="hover:text-[#003871] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#003871] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#003871] transition-colors">Contact</a>
          </div>

          <div className="text-sm text-[#3399ff]">
            © 2026 SEOContent AI
          </div>
        </div>
      </footer>
    </main>
  );
}