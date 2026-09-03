"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowRight,
  Sparkles
} from "lucide-react";

// Animation variants (reusing your existing pattern)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Dummy chart component - replace this with your actual chart
const DummyChart = () => {
  // Sample data for visualization
  const data = [
    { month: "Jan", applications: 45, placements: 12 },
    { month: "Feb", applications: 52, placements: 18 },
    { month: "Mar", applications: 48, placements: 22 },
    { month: "Apr", applications: 65, placements: 28 },
    { month: "May", applications: 72, placements: 35 },
    { month: "Jun", applications: 85, placements: 42 },
  ];

  const maxValue = Math.max(...data.map(d => d.applications));

  return (
    <div className="w-full h-full bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">Hiring Performance</h4>
          <p className="text-sm text-gray-500">Applications & placements</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          <span>+24.5%</span>
        </div>
      </div>

      {/* Simple Bar Chart Visualization */}
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">{item.month}</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-900 font-semibold">{item.applications} applications</span>
                <span className="text-green-600 font-medium">{item.placements} placed</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Applications Bar */}
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-full transition-all duration-500"
                  style={{ width: `${(item.applications / maxValue) * 100}%` }}
                />
              </div>
              {/* Placements Indicator */}
              <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(item.placements / item.applications) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">367</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Total Applications</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">157</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Placements</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[var(--color-primary-600)]">42.8%</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Placement Rate</div>
        </div>
      </div>
    </div>
  );
};

// Main Chart Section Component
export default function ChartSection() {
  const chartFeatures = [
    {
      icon: Users,
      title: "Candidate Tracking",
      description: "Follow every candidate from application to placement, all in one pipeline"
    },
    {
      icon: TrendingUp,
      title: "Hiring Analytics",
      description: "See month-over-month growth across applications, interviews, and hires"
    },
    {
      icon: DollarSign,
      title: "Placement Insights",
      description: "Connect every successful hire back to the AI agents that sourced them"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[var(--color-primary-50)] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* LEFT SIDE - Content */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>AI Hiring Dashboard</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary-920)] leading-tight">
              Track Your Remote Hiring{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)]">
                Performance
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              WorkByHome's AI agents source, qualify, and match remote candidates around the clock. Get real-time visibility into every application, interview, and placement — so you can make faster, data-driven hiring decisions.
            </p>

            {/* Feature List */}
            <div className="space-y-4 pt-4">
              {chartFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/60 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-700)] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <span>Explore AI Agents</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Chart */}
          <img src="/assets/chart.png" className="w-full h-full"/>
        </motion.div>
      </div>
    </section>
  );
}