
"use client"

import { useState } from 'react'
import { 
  Send,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  Sparkles,
  MessageSquare,
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setIsSubmitting(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    setIsSuccess(true);

  } catch (error: any) {
    alert(error.message);
  } finally {
    setIsSubmitting(false);
  }
};

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          {/* Animated Success Circle */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center gap-3 text-[#0066cc]">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Expected response: 24 hours</span>
            </div>
          </div>

          <button 
            onClick={() => {
              setIsSuccess(false)
              setFormData({ name: '', email: '', description: '' })
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066cc] text-white font-semibold rounded-full hover:bg-[#0052a3] transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            Send Another Message
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--primary-color-100)] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-50 to-transparent rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/50 via-transparent to-indigo-500/50 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Navigation */}
      {/* <nav className="relative z-10 px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0066cc] to-[#0052a3] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#0066cc] to-[#0052a3] bg-clip-text text-transparent">
            EstateAI
          </span>
        </Link>
      </nav> */}

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Info */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                <MessageSquare className="w-4 h-4 text-[#0066cc]" />
                <span className="text-sm font-semibold text-[#0066cc]">Get in Touch</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Let's Start a{' '}
                <span className="bg-gradient-to-r from-[#0066cc] to-[#0052a3] bg-clip-text text-transparent">
                  Conversation
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Have a question or want to learn more? We'd love to hear from you. 
                Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'info@workbyhome.in', href: 'mailto:info@estateai.in' },
                { icon: Phone, label: 'Phone', value: '+91 9649902000', href: 'tel:+919649902000' },
                {  icon: MessageCircle, label: 'Support', value: '24/7 AI Support Available', href: '/explore-ai-agent'  },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <a
                    key={idx}
                    href={item.href}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-[#0066cc] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#0066cc] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">{item.label}</div>
                      <div className="text-gray-900 font-semibold">{item.value}</div>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-800 font-medium">
                Average response time: <span className="font-bold">2 hours</span>
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-2xl opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-indigo-100 to-blue-100 rounded-full blur-2xl opacity-60" />

            <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/5 border border-gray-100 p-8 lg:p-10">
              {/* Form Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
                <p className="text-gray-500">Fill out the form below and we'll get back to you shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label 
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'name' || formData.name 
                        ? '-top-2 text-xs font-semibold text-[#0066cc] bg-white px-2' 
                        : 'top-4 text-gray-400'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#0066cc] focus:bg-white transition-all duration-300 text-gray-900"
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label 
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'email' || formData.email 
                        ? '-top-2 text-xs font-semibold text-[#0066cc] bg-white px-2' 
                        : 'top-4 text-gray-400'
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#0066cc] focus:bg-white transition-all duration-300 text-gray-900"
                  />
                </div>

                {/* Description Field */}
                <div className="relative">
                  <label 
                    htmlFor="description"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'description' || formData.description 
                        ? '-top-2 text-xs font-semibold text-[#0066cc] bg-white px-2 z-10' 
                        : 'top-4 text-gray-400'
                    }`}
                  >
                    How can we help?
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    onFocus={() => setFocusedField('description')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#0066cc] focus:bg-white transition-all duration-300 text-gray-900 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full py-4 bg-gradient-to-r from-[#0066cc] to-[#0052a3] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Privacy Note */}
              <p className="mt-6 text-xs text-gray-400 text-center">
                By submitting this form, you agree to our{' '}
                <Link href="/privacy" className="text-[#0066cc] hover:underline">Privacy Policy</Link>
                {' '}and{' '}
                <Link href="/terms" className="text-[#0066cc] hover:underline">Terms of Service</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

  
    </div>
  )
}