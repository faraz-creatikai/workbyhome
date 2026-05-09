"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

import {
  Check,
  Clock,
  Users,
  Target,
  ChevronRight,
  Bell,
  Search,
  Settings,
  BarChart3,
  Calendar,
  MessageSquare,
  FolderOpen,
  Zap,
  ArrowRight,
  Play,
  Star,
  Shield,
  TrendingUp,
  PieChart,
  Timer,
  LayoutGrid,
  ChevronDown,
  Plus,
  MoreHorizontal,
  Filter,
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  Menu,
} from "lucide-react";

// ─── Color Tokens (Tailwind v4 compatible) ───
const colors = {
  primary: "#0EA5E9",
  primaryLight: "#38BDF8",
  primaryDark: "#0284C7",
  accentCyan: "#06B6D4",
  accentTeal: "#14B8A6",
  accentOrange: "#F97316",
  accentYellow: "#FBBF24",
  accentGreen: "#22C55E",
  accentRed: "#EF4444",
  accentPurple: "#8B5CF6",
  bgPage: "#F8FAFC",
  bgCard: "#FFFFFF",
  bgCardAlt: "#F1F5F9",
  bgDark: "#0F172A",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  textLight: "#CBD5E1",
  borderLight: "#E2E8F0",
  borderMedium: "#CBD5E1",
  shadowSoft: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)",
  shadowMedium: "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)",
  shadowLarge: "0 25px 50px -12px rgba(0,0,0,0.12)",
  gradientHero: "linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #14B8A6 100%)",
  gradientCard: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
};

// ─── Animation Variants ───
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// ─── Mock Dashboard Data ───
const todoItems = [
  { id: 1, text: "Send wireframes to development team", done: true },
  { id: 2, text: "Review Q3 marketing campaign", done: true },
  { id: 3, text: "Update project timeline for client", done: false },
  { id: 4, text: "Prepare presentation for stakeholders", done: false },
];

const assignedTasks = [
  { id: 1, title: "New Website Redesign", progress: 75, color: "#0EA5E9", members: 3 },
  { id: 2, title: "Mobile App Development", progress: 45, color: "#F97316", members: 5 },
  { id: 3, title: "Brand Identity Update", progress: 90, color: "#22C55E", members: 2 },
];

const sidebarItems = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: FolderOpen, label: "Projects" },
  { icon: CheckCircle2, label: "Tasks" },
  { icon: Calendar, label: "Calendar" },
  { icon: BarChart3, label: "Reports" },
  { icon: Users, label: "Team" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Settings, label: "Settings" },
];

const activityData = [
  { day: "M", completed: 8, total: 12 },
  { day: "T", completed: 10, total: 12 },
  { day: "W", completed: 6, total: 12 },
  { day: "T", completed: 11, total: 12 },
  { day: "F", completed: 9, total: 12 },
  { day: "S", completed: 5, total: 8 },
  { day: "S", completed: 3, total: 8 },
];

// ─── Sub-Components ───

function Sidebar() {
  return (
    <div className="w-52 bg-white border-r border-[#E2E8F0] flex flex-col h-full rounded-l-2xl">
      {/* Logo */}
      <div className="p-5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-[#0F172A] text-sm tracking-tight">ChronoTask</span>
      </div>

      {/* Create Button */}
      <div className="px-4 mb-4">
        <button className="w-full flex items-center gap-2 bg-[#0F172A] text-white rounded-xl py-2.5 px-4 text-xs font-medium hover:bg-[#1E293B] transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Create
        </button>
      </div>

    

      {/* Projects Section */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Projects</span>
          <Plus className="w-3 h-3 text-[#94A3B8]" />
        </div>
        <div className="space-y-1">
          {["Marketing", "Development", "Design System"].map((proj, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#F8FAFC] cursor-pointer">
              <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#0EA5E9]" : i === 1 ? "bg-[#F97316]" : "bg-[#8B5CF6]"}`} />
              <span className="text-xs text-[#475569]">{proj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#14B8A6] flex items-center justify-center text-white text-[10px] font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#0F172A] truncate">Amanda K.</p>
            <p className="text-[10px] text-[#94A3B8]">Pro Plan</p>
          </div>
          <Settings className="w-3.5 h-3.5 text-[#94A3B8]" />
        </div>
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="flex-1 bg-[#F8FAFC] rounded-r-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#94A3B8]">Monday, September 30</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] transition-colors">
            <Search className="w-3.5 h-3.5 text-[#64748B]" />
          </button>
          <button className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] transition-colors relative">
            <Bell className="w-3.5 h-3.5 text-[#64748B]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white" />
          </button>
          <div className="flex items-center gap-2 ml-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#14B8A6] flex items-center justify-center text-white text-[10px] font-bold">
              A
            </div>
            <span className="text-xs font-medium text-[#0F172A]">Amanda K.</span>
            <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {/* Greeting */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-[#0F172A]">Good morning, Amanda</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">You have 4 tasks pending for today</p>
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* To-Do List */}
          <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-[#0F172A]">To-do list</h3>
              <MoreHorizontal className="w-3.5 h-3.5 text-[#94A3B8]" />
            </div>
            <div className="space-y-2">
              {todoItems.map((item) => (
                <div key={item.id} className="flex items-start gap-2.5 group cursor-pointer">
                  <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                    item.done
                      ? "bg-[#22C55E] border-[#22C55E]"
                      : "border-[#CBD5E1] group-hover:border-[#0EA5E9]"
                  }`}>
                    {item.done && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className={`text-[11px] leading-relaxed ${item.done ? "text-[#94A3B8] line-through" : "text-[#475569]"}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-3 flex items-center gap-1 text-[10px] text-[#0EA5E9] font-medium hover:underline">
              <Plus className="w-3 h-3" />
              Add new task
            </button>
          </div>

          {/* Time Tracker */}
          <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-[#0F172A]">Time tracker</h3>
              <MoreHorizontal className="w-3.5 h-3.5 text-[#94A3B8]" />
            </div>
            <div className="text-center py-2">
              <div className="text-2xl font-bold text-[#0F172A] font-mono tracking-tight">04:21:58</div>
              <p className="text-[10px] text-[#94A3B8] mt-1">Today&apos;s tracked time</p>
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              <button className="w-8 h-8 rounded-full bg-[#FEE2E2] flex items-center justify-center hover:bg-[#FECACA] transition-colors">
                <div className="w-3 h-3 rounded-sm bg-[#EF4444]" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-[#0EA5E9]/25 hover:scale-105 transition-transform">
                <Play className="w-4 h-4 text-white ml-0.5" />
              </button>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-[#0F172A]">Activity</h3>
              <MoreHorizontal className="w-3.5 h-3.5 text-[#94A3B8]" />
            </div>
            <div className="flex items-center justify-center py-1">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#0EA5E9"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.75} ${2 * Math.PI * 40 * 0.25}`}
                  strokeDashoffset={2 * Math.PI * 40 * 0.25}
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="28"
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 28 * 0.6} ${2 * Math.PI * 28 * 0.4}`}
                  strokeDashoffset={2 * Math.PI * 28 * 0.4}
                  transform="rotate(90 50 50)"
                />
              </svg>
            </div>
            <div className="flex justify-between mt-2 px-2">
              <div className="text-center">
                <p className="text-[10px] text-[#94A3B8]">Completed</p>
                <p className="text-sm font-bold text-[#0EA5E9]">29/40</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-[#94A3B8]">In Progress</p>
                <p className="text-sm font-bold text-[#FBBF24]">8/17</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Tasks Assigned */}
          <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-[#0F172A]">Tasks I&apos;ve assigned</h3>
              <MoreHorizontal className="w-3.5 h-3.5 text-[#94A3B8]" />
            </div>
            <div className="space-y-3">
              {assignedTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${task.color}15` }}>
                    <CheckCircle2 className="w-4 h-4" style={{ color: task.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-[#0F172A] truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${task.progress}%`, backgroundColor: task.color }}
                        />
                      </div>
                      <span className="text-[10px] text-[#94A3B8] font-medium">{task.progress}%</span>
                    </div>
                  </div>
                  <div className="flex -space-x-1.5">
                    {Array.from({ length: task.members }).map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white"
                        style={{
                          backgroundColor: ["#0EA5E9", "#F97316", "#22C55E", "#8B5CF6", "#EF4444"][i % 5],
                        }}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reminder */}
          <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-[#0F172A]">Reminder</h3>
              <MoreHorizontal className="w-3.5 h-3.5 text-[#94A3B8]" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FEF3C7] border border-[#FDE68A]">
                <div className="w-8 h-8 rounded-lg bg-[#FBBF24] flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-[#92400E]">Team meeting at 2:00 PM</p>
                  <p className="text-[10px] text-[#B45309]">Don&apos;t forget to prepare slides</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]">
                <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-[#166534]">Submit weekly report</p>
                  <p className="text-[10px] text-[#15803D]">Due by end of day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingElements() {
  return (
    <>
      {/* Left floating badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -left-8 top-1/3 bg-white rounded-2xl shadow-xl shadow-black/10 p-3 border border-[#E2E8F0] z-20"
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center">
            <span className="text-white font-bold text-sm">20</span>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#0F172A]">Tasks Done</p>
            <p className="text-[9px] text-[#22C55E] font-medium">+12% this week</p>
          </div>
        </div>
      </motion.div>

      {/* Right floating badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute -right-6 top-1/4 bg-white rounded-2xl shadow-xl shadow-black/10 p-3 border border-[#E2E8F0] z-20"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22C55E] to-[#14B8A6] flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      </motion.div>
    </>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  badgeColor,
  image,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  image?: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-300 group"
    >
      {image && (
        <div className="p-4 pb-0">
          <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] overflow-hidden">
            {image}
          </div>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0EA5E9]/10 to-[#06B6D4]/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#0EA5E9]" />
          </div>
          {badge && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${badgeColor}15`, color: badgeColor }}>
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-[#0F172A] mb-1">{title}</h3>
        <p className="text-xs text-[#64748B] leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function MiniBarChart() {
  const data = [65, 85, 45, 90, 70, 55, 80];
  return (
    <div className="flex items-end gap-1.5 h-20 px-4 py-3">
      {data.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-[#0EA5E9] to-[#38BDF8] opacity-80"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function MiniCalendar() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const events = [
    { day: 0, color: "#0EA5E9", label: "Standup" },
    { day: 1, color: "#F97316", label: "Review" },
    { day: 3, color: "#22C55E", label: "Deploy" },
    { day: 4, color: "#8B5CF6", label: "Retro" },
  ];
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-semibold text-[#0F172A]">Week schedule</span>
        <span className="text-[9px] text-[#94A3B8]">Oct 23-29</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div key={i} className="text-center">
            <span className="text-[8px] text-[#94A3B8] block mb-1">{d}</span>
            <div className={`w-6 h-6 rounded-lg mx-auto flex items-center justify-center text-[9px] font-medium ${
              i === 2 ? "bg-[#0EA5E9] text-white" : "bg-[#F1F5F9] text-[#475569]"
            }`}>
              {23 + i}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        {events.map((e, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.color }} />
            <span className="text-[9px] text-[#475569]">{e.label}</span>
            <span className="text-[8px] text-[#94A3B8] ml-auto">10:00 AM</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniWorkload() {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" stroke="#F1F5F9" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="#F97316"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 28 * 0.75} ${2 * Math.PI * 28 * 0.25}`}
            strokeDashoffset={0}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-[#0F172A]">75%</span>
        </div>
      </div>
      <p className="text-[10px] text-[#94A3B8] mt-2">Team workload</p>
    </div>
  );
}

function MiniTimeline() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-semibold text-[#0F172A]">Project timeline</span>
        <div className="flex -space-x-1 ml-auto">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[7px] font-bold text-white"
              style={{ backgroundColor: ["#0EA5E9", "#F97316", "#22C55E"][i] }}>
              {String.fromCharCode(65 + i)}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
          <div className="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
            <div className="h-full w-[70%] bg-[#0EA5E9] rounded-full" />
          </div>
          <span className="text-[8px] text-[#94A3B8]">70%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#F97316]" />
          <div className="flex-1 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
            <div className="h-full w-[45%] bg-[#F97316] rounded-full" />
          </div>
          <span className="text-[8px] text-[#94A3B8]">45%</span>
        </div>
      </div>
    </div>
  );
}

function MiniTaskBoard() {
  const cols = [
    { title: "To Do", color: "#94A3B8", items: ["Research", "Planning"] },
    { title: "In Progress", color: "#0EA5E9", items: ["Design", "Development"] },
    { title: "Done", color: "#22C55E", items: ["Review"] },
  ];
  return (
    <div className="p-4">
      <p className="text-[10px] font-semibold text-[#0F172A] mb-2">Tasks</p>
      <div className="flex gap-2">
        {cols.map((col, i) => (
          <div key={i} className="flex-1">
            <div className="flex items-center gap-1 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: col.color }} />
              <span className="text-[8px] text-[#94A3B8]">{col.title}</span>
            </div>
            <div className="space-y-1">
              {col.items.map((item, j) => (
                <div key={j} className="bg-[#F8FAFC] rounded-md px-1.5 py-1 text-[8px] text-[#475569] border border-[#E2E8F0]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniWorkspace() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold text-[#0F172A]">Customizable Workspaces</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#FEF3C7] rounded-xl p-2 border border-[#FDE68A]">
          <Clock className="w-3 h-3 text-[#F59E0B] mb-1" />
          <p className="text-[9px] font-bold text-[#92400E]">04:21</p>
          <p className="text-[7px] text-[#B45309]">Time tracked</p>
        </div>
        <div className="bg-[#F0FDF4] rounded-xl p-2 border border-[#BBF7D0]">
          <CheckCircle2 className="w-3 h-3 text-[#22C55E] mb-1" />
          <p className="text-[9px] font-bold text-[#166534]">12/15</p>
          <p className="text-[7px] text-[#15803D]">Done today</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page Component ───
export default function CrmImagePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
    

      {/* ─── Hero Section ─── */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[11px] font-medium text-[#64748B] shadow-sm">
              <Zap className="w-3 h-3 text-[#0EA5E9]" />
              Solutions
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-700 leading-tight tracking-tight">
              Solve your team&apos;s
              <br />
              biggest challenges
            </h1>
          </motion.div>

          {/* Feature Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            {[
              {
                icon: Target,
                title: "Ensure your team's always on the same page with task sharing and transparent updates.",
              },
              {
                icon: LayoutGrid,
                title: "Prioritize and manage tasks effectively so your team can focus on what matters most.",
              },
              {
                icon: Users,
                title: "Hold everyone accountable without the need for constant check-ins.",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FBBF24]/15 to-[#F59E0B]/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <p className="text-xs text-[#475569] leading-relaxed max-w-[240px]">{item.title}</p>
              </div>
            ))}
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Gradient Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#0EA5E9]/20 via-[#06B6D4]/20 to-[#14B8A6]/20 rounded-[2.5rem] blur-2xl" />

            {/* Main Container */}
            <div className="relative bg-gradient-to-br from-[#0EA5E9] via-[#06B6D4] to-[#14B8A6] rounded-[2rem] p-1.5 shadow-2xl shadow-[#0EA5E9]/20">
              <div className="bg-white rounded-[1.7rem] overflow-hidden flex" style={{ minHeight: "480px" }}>
                <Sidebar />
                <DashboardMock />
              </div>
            </div>

            <FloatingElements />
          </motion.div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[11px] font-medium text-[#64748B] shadow-sm">
              <LayoutGrid className="w-3 h-3 text-[#0EA5E9]" />
              Features
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-3"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 tracking-tight">
              Keep everything in one place
            </h2>
          </motion.div>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-sm text-[#64748B] mb-12 max-w-md mx-auto"
          >
            Forget complex project management tools.
          </motion.p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1: Seamless Collaboration */}
            <FeatureCard
              icon={Users}
              title="Seamless Collaboration"
              description="Work together with your team effortlessly. Share tasks, and update progress in real-time."
              badge="Popular"
              badgeColor="#0EA5E9"
              delay={0}
              image={
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-[#0EA5E9]/10 flex items-center justify-center">
                      <Users className="w-3 h-3 text-[#0EA5E9]" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#0F172A]">Team workspace</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Amanda K.", role: "Product Designer", color: "#0EA5E9" },
                      { name: "John D.", role: "Developer", color: "#F97316" },
                      { name: "Sarah M.", role: "Project Manager", color: "#22C55E" },
                    ].map((member, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#E2E8F0]">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{ backgroundColor: member.color }}>
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-medium text-[#0F172A]">{member.name}</p>
                          <p className="text-[9px] text-[#94A3B8]">{member.role}</p>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      </div>
                    ))}
                  </div>
                </div>
              }
            />

            {/* Card 2: Time Management Tools */}
            <FeatureCard
              icon={Clock}
              title="Time Management Tools"
              description="Optimize your time with integrated tools like timers, reminders, and schedules."
              badge="New"
              badgeColor="#22C55E"
              delay={1}
              image={
                <div className="grid grid-cols-2">
                  <MiniCalendar />
                  <div className="border-l border-[#E2E8F0]">
                    <MiniWorkload />
                  </div>
                </div>
              }
            />

            {/* Card 3: Advanced Task Tracking */}
            <FeatureCard
              icon={BarChart3}
              title="Advanced task tracking"
              description="A birds-eye view of your entire workflow and track productivity."
              delay={2}
              image={
                <div className="grid grid-cols-2">
                  <MiniTimeline />
                  <div className="border-l border-[#E2E8F0]">
                    <MiniTaskBoard />
                  </div>
                </div>
              }
            />

            {/* Card 4: Customizable Workspaces */}
            <FeatureCard
              icon={LayoutGrid}
              title="Customizable Workspaces"
              description="Tailor your workspace to fit your unique workflow and preferences."
              delay={3}
              image={<MiniWorkspace />}
            />

            {/* Card 5: Analytics & Insights */}
            <FeatureCard
              icon={PieChart}
              title="Analytics & Insights"
              description="Get detailed reports and analytics to make data-driven decisions."
              delay={4}
              image={<MiniBarChart />}
            />

            {/* Card 6: Smart Automation */}
            <FeatureCard
              icon={Zap}
              title="Smart Automation"
              description="Automate repetitive tasks and focus on what truly matters."
              badge="AI"
              badgeColor="#8B5CF6"
              delay={5}
              image={
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-[#8B5CF6]" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#0F172A]">Auto-assign rules</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "New bug → Dev team", active: true },
                      { label: "Design task → Design", active: true },
                      { label: "Urgent → Priority", active: false },
                    ].map((rule, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E2E8F0]">
                        <span className="text-[9px] text-[#475569]">{rule.label}</span>
                        <div className={`w-7 h-4 rounded-full flex items-center px-0.5 transition-colors ${rule.active ? "bg-[#22C55E]" : "bg-[#E2E8F0]"}`}>
                          <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${rule.active ? "translate-x-3" : "translate-x-0"}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-sm text-[#94A3B8]">and a lot more Features...</p>
          </motion.div>
        </div>
      </section>

    
    </div>
  );
}