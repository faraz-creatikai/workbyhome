'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Share2, 
  Sparkles, 
  Bot, 
  TrendingUp, 
  Clock,
  Zap,
  Target,
  Users,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Star,
  Play,
  Pause,
  MessageSquare,
  Calendar,
  Globe,
  Shield,
  Hash,
  Image,
  Video,
  Send,
  Heart,
  MessageCircle,
  Repeat2,
  Eye,
  MoreHorizontal,
  X,
  RefreshCw,
  ChevronRight,
  Palette,
  Wand2,
  LineChart,
  Megaphone
} from 'lucide-react';
import { BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

// Type definitions
interface Post {
  id: number;
  platform: 'instagram' | 'twitter' | 'linkedin' | 'facebook';
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  reach: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledTime?: string;
  engagement: number;
}

interface Metric {
  value: string;
  label: string;
  subtext: string;
  trend: 'up' | 'down' | 'neutral';
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  metric: string;
  metricLabel: string;
  avatar: string;
  gradient: string;
}

interface Platform {
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

export default function AISocialMediaAgentLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'schedule' | 'analyze'>('create');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<Post[]>([]);
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
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const startGeneration = () => {
    setIsGenerating(true);
    setGeneratedPosts([]);

    const posts: Post[] = [
      {
        id: 1,
        platform: 'instagram',
        content: "✨ Transform your workflow with AI automation! 🚀\n\nStop spending hours on repetitive tasks. Our AI agents handle the heavy lifting while you focus on strategy.\n\n#AI #Automation #Productivity #Tech",
        likes: 2453,
        comments: 187,
        shares: 423,
        reach: '52.3K',
        status: 'scheduled',
        scheduledTime: 'Today, 2:00 PM',
        engagement: 8.4
      },
      {
        id: 2,
        platform: 'twitter',
        content: "Just deployed our new AI content engine and saw 340% increase in engagement 📈\n\nThe future of social media is intelligent, automated, and personalized 🧠⚡",
        likes: 892,
        comments: 67,
        shares: 234,
        reach: '18.7K',
        status: 'published',
        engagement: 12.1
      },
      {
        id: 3,
        platform: 'linkedin',
        content: "🎯 Case Study: How TechCorp increased their social ROI by 500% using AI-powered content strategy\n\nKey takeaways:\n✅ 80% reduction in content creation time\n✅ 3x higher engagement rates\n✅ 24/7 optimal posting schedule\n\nFull breakdown in comments 👇",
        likes: 3421,
        comments: 156,
        shares: 892,
        reach: '127K',
        status: 'draft',
        engagement: 15.7
      }
    ];

    posts.forEach((post, index) => {
      setTimeout(() => {
        setGeneratedPosts(prev => [...prev, post]);
      }, (index + 1) * 1500);
    });

    setTimeout(() => {
      setIsGenerating(false);
    }, 5000);
  };

  const stats: Metric[] = [
    { value: '10×', label: 'Faster Creation', subtext: 'AI-generated content', trend: 'up' },
    { value: '340%', label: 'Engagement Boost', subtext: 'vs manual posting', trend: 'up' },
    { value: '85%', label: 'Time Saved', subtext: 'Weekly hours back', trend: 'up' },
    { value: '24/7', label: 'Auto-Posting', subtext: 'Never miss peak times', trend: 'neutral' },
  ];

  const features: Feature[] = [
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: 'AI Content Generation',
      description: 'Generate platform-optimized posts, captions, and hashtags in seconds. Trained on viral content patterns.',
      stat: '10×',
      statLabel: 'Faster'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Visual AI Studio',
      description: 'Create stunning images and videos with AI. Auto-resize for every platform. Brand consistency guaranteed.',
      stat: '50+',
      statLabel: 'Templates'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Smart Scheduling',
      description: 'AI analyzes your audience behavior to post at peak engagement times. Auto-adjusts for time zones.',
      stat: 'Best',
      statLabel: 'Time to Post'
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: 'Predictive Analytics',
      description: 'Know which content will perform before you post. AI predicts engagement with 94% accuracy.',
      stat: '94%',
      statLabel: 'Accuracy'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      quote: "We went from 2 posts per week to 20 daily across all platforms. Engagement is up 400% and our team actually has time to strategize.",
      author: "Jessica Chen",
      role: "Social Media Director, TechFlow",
      metric: "400%",
      metricLabel: "Engagement",
      avatar: "JC",
      gradient: "from-[#0066cc] to-[#0057ad]"
    },
    {
      quote: "The AI understands our brand voice perfectly. It generates content that sounds like us, just faster and more consistently.",
      author: "Marcus Rivera",
      role: "CMO, GrowthLabs",
      metric: "10×",
      metricLabel: "Output",
      avatar: "MR",
      gradient: "from-[#2676d9] to-[#1d5aa6]"
    },
    {
      quote: "Our social media manager was skeptical. Now she can't imagine working without it. The time savings are incredible.",
      author: "Sarah Thompson",
      role: "Founder, ScaleUp Inc",
      metric: "25hrs",
      metricLabel: "Saved/Week",
      avatar: "ST",
      gradient: "from-[#3399ff] to-[#2676d9]"
    }
  ];

  const platforms: Platform[] = [
    { name: 'Instagram', icon: <BsInstagram className="w-6 h-6" />, color: '#E4405F', bgColor: 'bg-pink-500' },
    { name: 'Twitter', icon: <BsTwitter className="w-6 h-6" />, color: '#1DA1F2', bgColor: 'bg-sky-500' },
    { name: 'LinkedIn', icon: <BsLinkedin className="w-6 h-6" />, color: '#0A66C2', bgColor: 'bg-blue-700' },
    { name: 'Facebook', icon: <FaFacebook className="w-6 h-6" />, color: '#1877F2', bgColor: 'bg-blue-600' },
    { name: 'YouTube', icon: <BsYoutube className="w-6 h-6" />, color: '#FF0000', bgColor: 'bg-red-600' },
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <FaInstagram className="w-5 h-5" />;
      case 'twitter': return <FaTwitter className="w-5 h-5" />;
      case 'linkedin': return <FaLinkedin className="w-5 h-5" />;
      case 'facebook': return <FaFacebook className="w-5 h-5" />;
      default: return <Share2 className="w-5 h-5" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'bg-gradient-to-br from-purple-500 to-pink-500';
      case 'twitter': return 'bg-sky-500';
      case 'linkedin': return 'bg-blue-700';
      case 'facebook': return 'bg-blue-600';
      default: return 'bg-[#0066cc]';
    }
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
        @keyframes typing {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 4s; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient-shift 15s ease infinite; }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-typing { animation: typing 1s ease-in-out infinite; }
        .animate-shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }
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
                                  AI That Posts {" "} <br/>
                                    <span className="relative inline-block">
                                      <span className="text-gradient animate-gradient">
                              While You Sleep
                                      </span>                       
                                                    
                                    </span>
                                  
                                  </h1>
                          
                                  <p className="text-lg sm:text-xl text-[#0057ad] mb-10 max-w-xl leading-relaxed font-light">
                             Generate, schedule, and optimize content across all platforms automatically.
                                    <span className="text-[#0066cc] font-medium">
                                      {" "}
                                      10× faster. 340% more engagement.
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
                       className={`lg:col-span-5 xl:col-span-5  relative order-1 lg:order-2 sm:right-10  flex items-center justify-center transition-all duration-1000 delay-300 ${
                         isVisible
                           ? "opacity-100 translate-y-0"
                           : "opacity-0 translate-y-10"
                       }`}
                     >
                       <div className="relative transform-style-3d">
                         
                         <img
                           src="/assets/social-media-hero-robo.png"
                           alt="AI Robot"
                           className="w-[100%] max-w-none lg:w-[90%] xl:w-[80%] object-contain translate-x-2 lg:translate-x-10"
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
            <span className="inline-block text-sm font-medium text-[#0066cc] uppercase tracking-widest mb-4">Capabilities</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#003871]">
              AI That Understands{' '}
              <span className="text-gradient">Social Media</span>
            </h2>
            <p className="text-xl text-[#0057ad]">
              From content creation to analytics, our AI handles every aspect of your social presence with superhuman efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={`glass rounded-3xl p-8 hover:bg-white transition-all duration-500 group border border-[#99ccff] hover:border-[#0066cc] shadow-sm hover:shadow-lg ${idx === 0 || idx === 3 ? 'lg:col-span-2' : ''}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cce5ff] to-[#99ccff] flex items-center justify-center text-[#0066cc] mb-6 group-hover:scale-110 transition-transform border border-[#66b2ff]">
                  {feature.icon}
                </div>
                <div className="flex items-end gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-[#003871]">{feature.title}</h3>
                  <span className="text-2xl font-bold text-[#0066cc] mb-1">{feature.stat}</span>
                </div>
                <p className="text-[#0057ad] leading-relaxed mb-4">{feature.description}</p>
                <div className="text-xs text-[#3399ff] font-medium uppercase tracking-wider">{feature.statLabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-32 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-[#0066cc] uppercase tracking-widest mb-4">How It Works</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#003871]">
              Deploy in{' '}
              <span className="text-gradient">3 Easy Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-[#0066cc] via-[#3399ff] to-[#0066cc]" />

            {[
              {
                step: '01',
                icon: <Target className="w-6 h-6" />,
                title: 'Connect Accounts',
                description: 'Link all your social profiles in seconds. Instagram, TikTok, LinkedIn, Twitter, Facebook—all in one dashboard.'
              },
              {
                step: '02',
                icon: <Wand2 className="w-6 h-6" />,
                title: 'Train Your AI',
                description: 'Upload brand guidelines, past posts, and voice preferences. The AI learns your style and audience preferences.'
              },
              {
                step: '03',
                icon: <Megaphone className="w-6 h-6" />,
                title: 'Auto-Publish',
                description: 'AI generates, schedules, and posts content 24/7. You review and approve—or let it run completely hands-free.'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="glass-strong rounded-3xl p-8 h-full hover:bg-white transition-all duration-500 border border-[#99ccff] hover:border-[#0066cc] shadow-sm hover:shadow-lg">
                  <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066cc] to-[#0057ad] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#66b2ff]">
                    {item.step}
                  </div>
                  <div className="pt-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#cce5ff] flex items-center justify-center text-[#0066cc] mb-6 border border-[#99ccff]">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#003871] mb-3">{item.title}</h3>
                    <p className="text-[#0057ad] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM SHOWCASE */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-[#0066cc] uppercase tracking-widest mb-4">All Platforms</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#003871]">
              One AI.{' '}
              <span className="text-gradient">Every Channel.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {platforms.map((platform, idx) => (
              <div key={idx} className="glass rounded-3xl p-6 hover:bg-white transition-all duration-500 group border border-[#99ccff] hover:border-[#0066cc] shadow-sm hover:shadow-lg text-center">
                <div className={`w-16 h-16 rounded-2xl ${platform.bgColor} flex items-center justify-center text-white mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {platform.icon}
                </div>
                <h3 className="text-lg font-bold text-[#003871] mb-2">{platform.name}</h3>
                <p className="text-sm text-[#3399ff]">Auto-optimized content</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-32 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-medium text-[#0066cc] uppercase tracking-widest mb-4">Results</span>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#003871]">
              Teams That{' '}
              <span className="text-gradient">Scale With AI</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="glass-strong rounded-3xl p-8 relative group hover:bg-white transition-all duration-500 border border-[#99ccff] hover:border-[#0066cc] shadow-sm hover:shadow-lg">
                <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform`}>
                  <Star className="w-8 h-8 text-white fill-white" />
                </div>

                <div className="mb-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.gradient} bg-opacity-10 text-white text-sm font-bold mb-4`}>
                    <TrendingUp className="w-4 h-4" />
                    {testimonial.metric} {testimonial.metricLabel}
                  </div>
                  <p className="text-[#003871] text-lg leading-relaxed">"{testimonial.quote}"</p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-[#99ccff]">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-[#003871]">{testimonial.author}</div>
                    <div className="text-sm text-[#3399ff]">{testimonial.role}</div>
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
          <span className="inline-block text-sm font-medium text-[#0066cc] uppercase tracking-widest mb-4">Connected</span>
          <h2 className="text-5xl lg:text-6xl font-bold mb-16 text-[#003871]">
            Works With Your{' '}
            <span className="text-gradient">Favorite Tools</span>
          </h2>

          <div className="glass-strong rounded-3xl p-12 relative overflow-hidden border border-[#99ccff] shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[#cce5ff]/50 via-[#d9eaff]/50 to-[#cce5ff]/50" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0066cc] to-[#0057ad] flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-lg shadow-[#66b2ff]">
                  <Share2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#003871] mb-2">SocialAI</h3>
                <p className="text-[#3399ff]">Content Engine</p>
              </div>

              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full h-px bg-gradient-to-r from-[#0066cc] via-[#3399ff] to-[#0066cc] relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0066cc] rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-2 h-2 bg-[#3399ff] rounded-full animate-ping" />
                  <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-2 h-2 bg-[#2676d9] rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {['Canva', 'Figma', 'Notion', 'Slack', 'Zapier', 'Shopify'].map((tool) => (
                  <div key={tool} className="px-6 py-3 rounded-xl glass text-[#0057ad] hover:text-[#003871] hover:bg-white transition-colors border border-[#99ccff] shadow-sm">
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
          <div className="glass-strong rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden border border-[#66b2ff] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#cce5ff]/50 via-[#d9eaff]/50 to-[#cce5ff]/50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#99ccff]/30 via-transparent to-transparent" />

            <div className="relative z-10">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#0066cc] to-[#0057ad] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#66b2ff] animate-pulse-glow">
                <Sparkles className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-[#003871]">
                Let AI Handle Your{' '}
                <span className="text-gradient">Social Media</span>
              </h2>

              <p className="text-xl text-[#0057ad] mb-10 max-w-2xl mx-auto">
                Join 10,000+ creators and brands using AI to grow their audience. 
                Start with 50 free AI-generated posts.
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
                50 free posts • No credit card • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
