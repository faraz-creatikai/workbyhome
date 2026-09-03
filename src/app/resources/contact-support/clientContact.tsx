  "use client";

  import React, { useState } from 'react';
  import Head from 'next/head';
  import { motion, AnimatePresence } from 'framer-motion';
  import {
    MessageSquare, Mail, Phone, Clock, CheckCircle2, ChevronRight,
    Send, User, Building, HelpCircle, ArrowRight, Star, Shield,
    Globe, Zap, Headphones, X,
    ChevronUp
  } from 'lucide-react';

  // --- Types ---

  type SupportMethod = 'chat' | 'email' | 'phone' | 'callback';
  type InquiryType = 'technical' | 'billing' | 'sales' | 'account' | 'partners';

  interface SupportStat {
    label: string;
    value: string;
    subtext: string;
  }

  interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
    rating: number;
  }

  interface FAQ {
    question: string;
    answer: string;
  }

  // --- Data ---

  const supportStats: SupportStat[] = [
    { label: 'Average Response', value: '< 2 min', subtext: 'Live chat' },
    { label: 'Email Resolution', value: '4 hours', subtext: 'Average time' },
    { label: 'Phone Availability', value: '24/7/365', subtext: 'Global coverage' },
    { label: 'Customer Satisfaction', value: '98.7%', subtext: 'Rating' },
  ];

  const inquiryTypes: { id: InquiryType; label: string; description: string; icon: React.ElementType }[] = [
    { id: 'technical', label: 'Technical Support', description: 'API issues, integrations, bugs', icon: Zap },
    { id: 'billing', label: 'Billing & Plans', description: 'Invoices, upgrades, refunds', icon: Shield },
    { id: 'sales', label: 'Sales Inquiry', description: 'Enterprise, custom solutions', icon: Building },
    { id: 'account', label: 'Account Help', description: 'Access, security, settings', icon: User },
    { id: 'partners', label: 'Partnerships', description: 'Reseller, affiliate, integrations', icon: Globe },
  ];

  const testimonials: Testimonial[] = [
    {
      quote: "The support team resolved our API integration issue in under 30 minutes. Incredible expertise and patience.",
      author: "Sarah Chen",
      role: "CTO",
      company: "TechFlow Inc.",
      rating: 5
    },
    {
      quote: "24/7 support isn't just a promise here. At 3 AM on a Sunday, they helped us recover critical data.",
      author: "Marcus Johnson",
      role: "Operations Director",
      company: "Global Retail Solutions",
      rating: 5
    },
    {
      quote: "Best enterprise support I've experienced. Dedicated account manager knows our stack inside out.",
      author: "Elena Rodriguez",
      role: "VP Engineering",
      company: "ScaleUp Labs",
      rating: 5
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What are your support hours?",
      answer: "Our technical support team is available 24 hours a day, 7 days a week, 365 days a year. Sales and billing teams are available Monday-Friday, 8AM-8PM EST, with 24/7 emergency billing support for enterprise customers."
    },
    {
      question: "How quickly will I get a response?",
      answer: "Live chat: Under 2 minutes average. Email: 4 hours average for technical issues, 24 hours for general inquiries. Phone: Immediate connection, no hold times for enterprise. Callback requests: Within 15 minutes."
    },
    {
      question: "Do you offer dedicated support for enterprise?",
      answer: "Yes. Enterprise plans include a dedicated Customer Success Manager, priority phone support with direct line, SLA guarantees, and quarterly business reviews. You'll also get access to our private Slack channel for real-time collaboration."
    },
    {
      question: "Is phone support included in all plans?",
      answer: "Phone support is included in Professional and above. Starter plans have access to email and community support. All plans can upgrade to phone support for an additional fee."
    }
  ];

  // --- Components ---

  const StatCard = ({ stat, index }: { stat: SupportStat; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
      <div className="text-white/90 font-medium text-sm mb-1">{stat.label}</div>
      <div className="text-white/60 text-xs">{stat.subtext}</div>
    </motion.div>
  );

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="bg-[var(--bg-primary)] rounded-2xl p-6 border border-[var(--border-light)] shadow-lg">
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">"{testimonial.quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-secondary-400)] flex items-center justify-center text-white font-bold">
          {testimonial.author[0]}
        </div>
        <div>
          <div className="font-medium text-[var(--text-primary)] text-sm">{testimonial.author}</div>
          <div className="text-xs text-[var(--text-tertiary)]">{testimonial.role}, {testimonial.company}</div>
        </div>
      </div>
    </div>
  );

  export default function ContactSupportPage() {
    const [selectedMethod, setSelectedMethod] = useState<SupportMethod>('chat');
    const [selectedInquiry, setSelectedInquiry] = useState<InquiryType>('technical');
    const [formStep, setFormStep] = useState(1);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;

  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    inquiryType: selectedInquiry,
    priority: formData.get("priority"),
    supportMethod: selectedMethod,
    preferredTime: formData.get("preferredTime"),
  };

  try {
    const res = await fetch("/api/contact-support", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      setShowSuccess(true);
      form.reset();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

    const SelectedIcon = inquiryTypes.find(t => t.id === selectedInquiry)?.icon || HelpCircle;

    return (
      <div className="min-h-screen  text-[var(--text-primary)]">
        <Head>
          <title>Contact Support | 24/7 Expert Assistance</title>
          <meta name="description" content="Get 24/7 expert support from our dedicated team. Live chat, phone, email, and callback options available." />
        </Head>
      <div ></div>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[var(--color-primary-700)] via-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                All systems operational
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              >
                24/7 Expert Assistance
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/80 mb-8 max-w-2xl"
              >
                Our global support team is always online, always ready. 
                Get instant help through live chat, schedule a callback, or reach us by phone—anytime, anywhere.
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {supportStats.map((stat, index) => (
                  <StatCard key={stat.label} stat={stat} index={index} />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full opacity-20 hidden lg:block">
            <div className="absolute right-20 top-20 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute right-40 bottom-20 w-48 h-48 bg-[var(--color-secondary-400)] rounded-full blur-3xl" />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Left: Contact Methods */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Method Selector */}
              <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-light)] p-2 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { id: 'chat' as SupportMethod, label: 'Live Chat', icon: MessageSquare, desc: '< 2 min response' },
                    { id: 'email' as SupportMethod, label: 'Email', icon: Mail, desc: '4 hr response' },
                    { id: 'phone' as SupportMethod, label: 'Phone', icon: Phone, desc: '24/7 available' },
                    { id: 'callback' as SupportMethod, label: 'Callback', icon: Clock, desc: '15 min callback' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        selectedMethod === method.id
                          ? 'bg-[var(--color-primary-600)] text-white shadow-lg'
                          : 'hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <method.icon className={`w-6 h-6 mb-2 ${selectedMethod === method.id ? 'text-white' : 'text-[var(--color-primary-600)]'}`} />
                      <div className={`font-semibold text-sm ${selectedMethod === method.id ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                        {method.label}
                      </div>
                      <div className={`text-xs ${selectedMethod === method.id ? 'text-white/80' : 'text-[var(--text-tertiary)]'}`}>
                        {method.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Form Area */}
              <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-light)] shadow-sm overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-[var(--border-light)]">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                    {selectedMethod === 'chat' && 'Start Live Chat'}
                    {selectedMethod === 'email' && 'Send us an Email'}
                    {selectedMethod === 'phone' && 'Call Us Directly'}
                    {selectedMethod === 'callback' && 'Request a Callback'}
                  </h2>
                  <p className="text-[var(--text-secondary)]">
                    {selectedMethod === 'chat' && 'Connect instantly with our support engineers. Average wait time: 45 seconds.'}
                    {selectedMethod === 'email' && 'Describe your issue in detail. We typically respond within 4 hours.'}
                    {selectedMethod === 'phone' && 'Speak directly with a support specialist. Toll-free numbers available.'}
                    {selectedMethod === 'callback' && 'Schedule a call at your convenience. We will call you within 15 minutes.'}
                  </p>
                </div>

                {/* Phone Display */}
                {selectedMethod === 'phone' && (
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center mx-auto mb-6">
                      <Phone className="w-10 h-10 text-[var(--color-primary-600)]" />
                    </div>
                    <div className="text-4xl font-bold text-[var(--text-primary)] mb-2">+1 (800) 555-0199</div>
                    <p className="text-[var(--text-secondary)] mb-6">Toll-free from US & Canada</p>
                    
                    <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                      <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                        <div className="font-semibold text-[var(--text-primary)]">Americas</div>
                        <div className="text-sm text-[var(--text-secondary)]">+1 (800) 555-0199</div>
                      </div>
                      <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                        <div className="font-semibold text-[var(--text-primary)]">Europe</div>
                        <div className="text-sm text-[var(--text-secondary)]">+44 20 7946 0958</div>
                      </div>
                      <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                        <div className="font-semibold text-[var(--text-primary)]">Asia-Pacific</div>
                        <div className="text-sm text-[var(--text-secondary)]">+61 2 9374 4000</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat/Email/Callback Form */}
                {selectedMethod !== 'phone' && (
                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">What can we help you with?</label>
                      <div className="grid md:grid-cols-3 gap-3">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setSelectedInquiry(type.id)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              selectedInquiry === type.id
                                ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)]'
                                : 'border-[var(--border-medium)] hover:border-[var(--color-primary-400)]'
                            }`}
                          >
                            <type.icon className={`w-5 h-5 mb-2 ${selectedInquiry === type.id ? 'text-[var(--color-primary-600)]' : 'text-[var(--text-tertiary)]'}`} />
                            <div className={`font-medium text-sm ${selectedInquiry === type.id ? 'text-[var(--color-primary-700)]' : 'text-[var(--text-primary)]'}`}>
                              {type.label}
                            </div>
                            <div className="text-xs text-[var(--text-tertiary)]">{type.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Full Name</label>
                        <input
                        name="name"
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-[var(--border-medium)] rounded-xl bg-[var(--bg-primary)] focus:outline-none focus:border-[var(--color-primary-400)] transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Email Address</label>
                        <input
                        name="email"
                          type="email"
                          required
                          className="w-full px-4 py-3 border border-[var(--border-medium)] rounded-xl bg-[var(--bg-primary)] focus:outline-none focus:border-[var(--color-primary-400)] transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Subject</label>
                      <input
                      name="subject"
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-[var(--border-medium)] rounded-xl bg-[var(--bg-primary)] focus:outline-none focus:border-[var(--color-primary-400)] transition-colors"
                        placeholder="Brief description of your issue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Message</label>
                      <textarea
                      name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-3 border border-[var(--border-medium)] rounded-xl bg-[var(--bg-primary)] focus:outline-none focus:border-[var(--color-primary-400)] transition-colors resize-none"
                        placeholder="Describe your issue in detail. Include any error messages, steps to reproduce, and what you've already tried."
                      />
                    </div>

                    {/* Priority & Callback Time */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Priority</label>
                        <select defaultValue="option2" className="w-full px-4 py-3 border border-[var(--border-medium)] rounded-xl bg-[var(--bg-primary)] focus:outline-none focus:border-[var(--color-primary-400)]">
                          <option>Low — General question</option>
                          <option>Medium — Affecting my work</option>
                          <option>High — Critical business impact</option>
                          <option>Urgent — System down</option>
                        </select>
                      </div>
                      {selectedMethod === 'callback' && (
                        <div>
                          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Preferred Time</label>
                          <select className="w-full px-4 py-3 border border-[var(--border-medium)] rounded-xl bg-[var(--bg-primary)] focus:outline-none focus:border-[var(--color-primary-400)]">
                            <option>ASAP (within 15 min)</option>
                            <option>In 1 hour</option>
                            <option>In 2 hours</option>
                            <option>Tomorrow morning</option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* File Upload */}
                    <div className="p-4 border-2 border-dashed border-[var(--border-medium)] rounded-xl hover:border-[var(--color-primary-400)] transition-colors cursor-pointer">
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-2">
                          <Mail className="w-5 h-5 text-[var(--text-tertiary)]" />
                        </div>
                        <p className="text-sm text-[var(--text-primary)] font-medium">Attach files or screenshots</p>
                        <p className="text-xs text-[var(--text-tertiary)]">Drag & drop or click to upload (max 10MB)</p>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                    >
                      {selectedMethod === 'chat' && <MessageSquare className="w-5 h-5" />}
                      {selectedMethod === 'email' && <Send className="w-5 h-5" />}
                      {selectedMethod === 'callback' && <Clock className="w-5 h-5" />}
                      {selectedMethod === 'chat' ? 'Start Live Chat' : selectedMethod === 'email' ? 'Send Message' : 'Request Callback'}
                    </button>
                  </form>
                )}
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed bottom-8 right-[40%] bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">Message sent successfully!</div>
                      <div className="text-sm text-emerald-100">We will respond shortly.</div>
                    </div>
                    <button onClick={() => setShowSuccess(false)} className="ml-4">
                      <X className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Quick Help */}
              <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-light)] p-6 shadow-sm">
                <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[var(--color-primary-600)]" />
                  Quick Help
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-[var(--border-light)] last:border-0 pb-3 last:pb-0">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <span className={`text-sm font-medium ${expandedFaq === index ? 'text-[var(--color-primary-600)]' : 'text-[var(--text-primary)]'}`}>
                          {faq.question}
                        </span>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-4 h-4 text-[var(--color-primary-600)]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-[var(--text-secondary)] mt-2 pr-4">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
                <a href="#" className="inline-flex items-center gap-1 text-sm text-[var(--color-primary-600)] hover:underline mt-4 font-medium">
                  View all FAQs <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Enterprise CTA */}
              <div className="bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-secondary-600)] rounded-2xl p-6 text-white shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Enterprise Support</h3>
                <p className="text-white/80 text-sm mb-4">
                  Dedicated account manager, SLA guarantees, private Slack channel, and quarterly business reviews.
                </p>
                <ul className="space-y-2 text-sm text-white/90 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />  15 min response time
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> 99.99% SLA
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Dedicated CSM
                  </li>
                </ul>
                <button className="w-full py-3 bg-white text-[var(--color-primary-700)] rounded-xl font-semibold hover:bg-white/90 transition-colors">
                  Contact Sales
                </button>
              </div>

              {/* Testimonials */}
              <div className="space-y-4">
                <h3 className="font-bold text-[var(--text-primary)] px-1">What our customers say</h3>
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} />
                ))}
              </div>

              {/* Status */}
              <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-light)] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[var(--text-primary)]">System Status</h3>
                  <span className="flex items-center gap-1.5 text-sm text-emerald-600">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    All systems operational
                  </span>
                </div>
                <div className="space-y-2">
                  {['API', 'Dashboard', 'Webhooks', 'Mobile App', 'Integrations'].map((service) => (
                    <div key={service} className="flex items-center justify-between py-2 border-b border-[var(--border-light)] last:border-0">
                      <span className="text-sm text-[var(--text-secondary)]">{service}</span>
                      <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> 100%
                      </span>
                    </div>
                  ))}
                </div>
                <a href="#" className="inline-flex items-center gap-1 text-sm text-[var(--color-primary-600)] hover:underline mt-4">
                  View status page <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[var(--bg-primary)] border-t border-[var(--border-light)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Still need help?</h2>
                <p className="text-[var(--text-secondary)]">Our community is active 24/7 with thousands of experts ready to help.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 border border-[var(--border-medium)] rounded-xl font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors">
                  Browse Community
                </button>
                <button className="px-6 py-3 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-xl font-medium transition-colors">
                  Start Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }