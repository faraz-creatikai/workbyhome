"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Network,
  Users,
  Share2,
  Handshake,
  Brain,
  Building2,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Play,
  Shield,
  Zap,
  Globe,
  Award,
  Briefcase,
  Home,
  BarChart3,
  Sparkles,
  Target,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// Broker avatars data
const topBrokers = [
  { name: "Sarah Chen", role: "Senior Broker", location: "San Francisco", deals: "250+" },
  { name: "Michael Torres", role: "Luxury Specialist", location: "Miami", deals: "180+" },
  { name: "Jennifer Walsh", role: "Commercial Expert", location: "New York", deals: "320+" },
  { name: "David Kim", role: "Residential Lead", location: "Seattle", deals: "200+" },
  { name: "Amanda Foster", role: "Investment Broker", location: "Austin", deals: "150+" },
  { name: "Robert Martinez", role: "Regional Director", location: "Chicago", deals: "400+" },
];

// Features data
const aiFeatures = [
  {
    icon: Brain,
    title: "AI Lead Matching",
    description: "Our AI agents analyze buyer preferences and match them with your listings automatically, delivering qualified leads directly to your inbox.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Share2,
    title: "Shared Property Listings",
    description: "List properties once and share across the entire broker network. AI-powered syndication ensures maximum visibility to qualified buyers.",
    color: "from-indigo-500 to-purple-400",
  },
  {
    icon: Network,
    title: "Smart Referral System",
    description: "Intelligent referral matching connects you with brokers who have the perfect buyers for your listings, maximizing your commission potential.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: MessageSquare,
    title: "Real-time Broker Messaging",
    description: "Instant communication with network brokers. AI-suggested responses and deal templates speed up negotiations and closing processes.",
    color: "from-orange-500 to-amber-400",
  },
  {
    icon: Briefcase,
    title: "AI Deal Assistant",
    description: "Your personal AI agent manages paperwork, schedules showings, and follows up with clients, freeing you to focus on closing deals.",
    color: "from-rose-500 to-pink-400",
  },
  {
    icon: BarChart3,
    title: "Market Intelligence",
    description: "AI-driven market insights, pricing recommendations, and trend analysis help you advise clients with confidence and close deals faster.",
    color: "from-violet-500 to-fuchsia-400",
  },
];

// Benefits data
const benefits = [
  {
    icon: Building2,
    title: "Access Exclusive Listings",
    description: "Get first access to off-market properties and exclusive listings shared only within our broker network.",
  },
  {
    icon: Target,
    title: "AI-Qualified Leads",
    description: "Receive pre-qualified buyer leads matched by AI based on your specialization and location preferences.",
  },
  {
    icon: Globe,
    title: "Cross-Regional Partnerships",
    description: "Connect with top brokers across markets. Refer clients moving to new cities and earn referral commissions.",
  },
  {
    icon: Zap,
    title: "Faster Deal Closing",
    description: "AI-powered automation reduces paperwork time by 70%, helping you close more deals in less time.",
  },
  {
    icon: Shield,
    title: "Trusted Partnerships",
    description: "Verified broker network with rating systems ensures you work with reputable professionals only.",
  },
  {
    icon: TrendingUp,
    title: "Increased Revenue",
    description: "Brokers in our network report 40% increase in closed deals within the first 6 months.",
  },
];

// Testimonials data
const testimonials = [
  {
    name: "Alexandra Thompson",
    role: "Principal Broker",
    company: "Thompson Realty Group",
    image: "AT",
    content: "The AI lead matching is a game-changer. I'm receiving 3x more qualified leads than before, and the smart referral system helped me close a $2M deal last month with a broker I met through the network.",
    stats: "3x more qualified leads",
  },
  {
    name: "Marcus Johnson",
    role: "Managing Director",
    company: "Johnson & Associates",
    image: "MJ",
    content: "Since joining the broker network, my team's productivity has skyrocketed. The AI Deal Assistant handles routine tasks, allowing us to focus on high-value client relationships. We've closed 45% more deals this quarter.",
    stats: "45% increase in closed deals",
  },
  {
    name: "Rachel Kim",
    role: "Luxury Property Specialist",
    company: "Premier Estates",
    image: "RK",
    content: "The cross-regional partnerships have been incredible. I referred a client moving from LA to Miami and earned a substantial referral fee. The network's verification system gives me confidence in every partnership.",
    stats: "$150K in referral commissions",
  },
];

// FAQ data
const faqs = [
  {
    question: "What is the broker network?",
    answer: "Our AI-powered broker network is an exclusive community of real estate professionals who collaborate to share listings, exchange qualified leads, and close deals faster using intelligent automation tools.",
  },
  {
    question: "How do brokers collaborate?",
    answer: "Brokers collaborate through our AI-matching system that connects complementary professionals, shared listing syndication, real-time messaging, smart referral tracking, and collaborative deal rooms for complex transactions.",
  },
  {
    question: "Is there a cost to join?",
    answer: "Basic network membership is free for licensed brokers. Premium features including AI lead matching, advanced market intelligence, and priority referral routing are available through our subscription plans starting at $49/month.",
  },
  {
    question: "Can I share my listings?",
    answer: "Absolutely. You can share listings with the entire network or select specific broker partners. Our AI ensures your listings reach the most relevant buyers while maintaining your commission structure and brand control.",
  },
  {
    question: "How does AI lead matching work?",
    answer: "Our AI analyzes buyer behavior, preferences, and purchase history from across the network, then matches qualified prospects with brokers who have relevant listings or expertise. Leads are scored and ranked by conversion probability.",
  },
  {
    question: "What markets are covered?",
    answer: "The broker network spans all major US markets including New York, Los Angeles, Miami, Chicago, Austin, Seattle, and 150+ additional cities. International expansion is planned for 2025.",
  },
];

// Steps data
const steps = [
  {
    number: "01",
    title: "Join the Network",
    description: "Complete your broker profile, verify your license, and set your specialization preferences.",
    icon: Users,
  },
  {
    number: "02",
    title: "Connect with Brokers",
    description: "Our AI suggests compatible brokers based on your market, specialty, and collaboration history.",
    icon: Network,
  },
  {
    number: "03",
    title: "Share Property Listings",
    description: "Upload listings and let AI syndicate them to relevant buyers and partner brokers automatically.",
    icon: Share2,
  },
  {
    number: "04",
    title: "Close Deals Together",
    description: "Collaborate on transactions, track referrals, and split commissions transparently through our platform.",
    icon: Handshake,
  },
];

export default function BrokerNetworkPage(): React.ReactElement {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleFaq = (index: number): void => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white font-sans">


      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-28 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e6f2ff] via-white to-[#eef6ff]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066cc]/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#0066cc]" />
                <span className="text-sm font-semibold text-[#0066cc]">AI-Powered Collaboration</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#003871] leading-tight mb-6">
                The Smart Broker{" "}
                <span className="bg-gradient-to-r from-[#0066cc] to-[#3399ff] bg-clip-text text-transparent">
                  Network
                </span>{" "}
                Powered by AI
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                Connect with top real estate brokers, share opportunities, and close deals faster using intelligent AI agents that work 24/7 for your success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0066cc] text-white font-semibold rounded-xl hover:bg-[#0057ad] transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
                  Join the Network
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0066cc] font-semibold rounded-xl border-2 border-[#0066cc]/20 hover:border-[#0066cc]/40 hover:bg-blue-50/50 transition-all duration-300">
                  <Play className="w-5 h-5" />
                  Explore Brokers
                </button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="initial"
              animate="animate"
              variants={scaleIn}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066cc]/20 to-[#3399ff]/20" />
                <div className="bg-white p-8">
                  {/* Network Graph Illustration */}
                  <div className="relative h-80 w-full">
                    {/* Central Node */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0066cc] to-[#3399ff] flex items-center justify-center shadow-lg shadow-blue-500/30 z-10 relative">
                        <Brain className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="text-sm font-semibold text-[#003871]">AI Core</span>
                      </div>
                    </div>

                    {/* Orbiting Broker Nodes */}
                    {[
                      { angle: 0, icon: Building2, color: "from-emerald-500 to-teal-400", label: "Commercial" },
                      { angle: 60, icon: Home, color: "from-orange-500 to-amber-400", label: "Residential" },
                      { angle: 120, icon: Award, color: "from-purple-500 to-violet-400", label: "Luxury" },
                      { angle: 180, icon: TrendingUp, color: "from-rose-500 to-pink-400", label: "Investment" },
                      { angle: 240, icon: MapPin, color: "from-cyan-500 to-blue-400", label: "Regional" },
                      { angle: 300, icon: Users, color: "from-indigo-500 to-blue-400", label: "Teams" },
                    ].map((node, i) => {
                      const radius = 120;
                      const angle = (node.angle * Math.PI) / 180;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      const Icon = node.icon;
                      
                      return (
                        <motion.div
                          key={i}
                          className="absolute"
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: "translate(-50%, -50%)",
                          }}
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        >
                          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${node.color} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                            <span className="text-xs font-medium text-gray-600">{node.label}</span>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Floating Data Points */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-[#0066cc]"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          opacity: [0.2, 1, 0.2],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">2,500+</p>
                    <p className="text-xs text-gray-500">Active Brokers</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Handshake className="w-5 h-5 text-[#0066cc]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">$1.2B</p>
                    <p className="text-xs text-gray-500">Deals Closed</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted Brokers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#003871] mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join hundreds of real estate professionals already collaborating inside our AI-powered broker network.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {topBrokers.map((broker, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:border-[#0066cc]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066cc] to-[#3399ff] flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg group-hover:scale-110 transition-transform">
                  {broker.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="font-semibold text-gray-900 text-center mb-1">{broker.name}</h3>
                <p className="text-sm text-[#0066cc] text-center mb-2">{broker.role}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {broker.location}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                  <span className="text-xs font-semibold text-emerald-600">{broker.deals} Deals</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 items-center opacity-60">
            {["Keller Williams", "RE/MAX", "Coldwell Banker", "Sotheby's", "Compass", "eXp Realty"].map((brand, i) => (
              <span key={i} className="text-xl font-bold text-gray-400">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#e6f2ff]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-[#0066cc]/10 text-[#0066cc] text-sm font-semibold rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003871] mb-4">
              How the Broker Network Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and start collaborating with top brokers across the country
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#0066cc]/30 to-transparent" />
                  )}
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#0066cc]/30 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-4xl font-bold text-[#0066cc]/20">{step.number}</span>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066cc] to-[#3399ff] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#003871] mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-[#0066cc] text-sm font-semibold rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003871] mb-4">
              Intelligent Collaboration Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI agents work alongside you to automate routine tasks, match opportunities, and accelerate deal closure
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#0066cc]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity`} />
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#003871] mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-[#0066cc] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-[#003871] to-[#0057ad]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-semibold rounded-full mb-4">
              Why Join
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Benefits of Joining the Network
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Unlock new revenue streams and accelerate your real estate business growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "2,500+", label: "Active Brokers" },
              { value: "$1.2B", label: "Transactions Closed" },
              { value: "40%", label: "Avg. Revenue Increase" },
              { value: "150+", label: "Cities Covered" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-blue-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#e6f2ff]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-[#0066cc]/10 text-[#0066cc] text-sm font-semibold rounded-full mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003871] mb-4">
              Trusted by Top Brokers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how real estate professionals are growing their business with our AI-powered network
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066cc] to-[#3399ff] flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    {testimonial.stats}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={scaleIn}
            className="relative bg-gradient-to-br from-[#0066cc] to-[#003871] rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Grow Your Real Estate Network with AI
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Join thousands of brokers already closing more deals, earning more commissions, and building lasting partnerships.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/start-free-trial"> <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0066cc] font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg">
                  Join the Broker Network
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button></Link>
                <Link href="/book-demo"><button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                  Book Demo
                </button></Link>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#e6f2ff]/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 bg-[#0066cc]/10 text-[#0066cc] text-sm font-semibold rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003871] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about joining our broker network
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#003871] pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#0066cc] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button className="inline-flex items-center gap-2 text-[#0066cc] font-semibold hover:underline">
              <MessageSquare className="w-5 h-5" />
              Contact our team
            </button>
          </div>
        </div>
      </section>

 
    </div>
  );
}
