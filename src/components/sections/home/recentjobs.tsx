"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Tag, Building2, GraduationCap, Shield, ShoppingCart, LucideIcon } from "lucide-react";
import Link from "next/link";

// ─── Types ──────────────────────────────────────────────────────────
interface Win {
  id: number;
  title: string;
  industry: string;
  detail: string;
  icon: LucideIcon;
  badgeBg: string;
  hoursAgo: number;
  dots: number;
  dotsFilled: number;
}

interface FilterOption {
  label: string;
  value: string;
}

// ─── Data ───────────────────────────────────────────────────────────
// Live activity feed — recent outcomes produced by the AI agents + calling
// team, shown across the industries WorkByHome serves. Not a public job
// board: no listings, no "apply", no location filter.
const wins: Win[] = [
  {
    id: 1,
    title: "2BHK Lead → Site Visit Booked",
    industry: "Real Estate",
    detail: "Qualified in 4 min",
    icon: Building2,
    badgeBg: "bg-blue-500",
    hoursAgo: 3,
    dots: 9,
    dotsFilled: 7,
  },
  {
    id: 2,
    title: "Admission Enquiry → Call Booked",
    industry: "Education",
    detail: "Handed to counselor",
    icon: GraduationCap,
    badgeBg: "bg-emerald-500",
    hoursAgo: 5,
    dots: 7,
    dotsFilled: 6,
  },
  {
    id: 3,
    title: "Policy Enquiry → Quote Sent",
    industry: "Insurance",
    detail: "Qualified & quoted",
    icon: Shield,
    badgeBg: "bg-violet-500",
    hoursAgo: 1,
    dots: 12,
    dotsFilled: 9,
  },
  {
    id: 4,
    title: "Cart Recovery → Order Confirmed",
    industry: "E-commerce",
    detail: "Follow-up call closed",
    icon: ShoppingCart,
    badgeBg: "bg-amber-500",
    hoursAgo: 6,
    dots: 12,
    dotsFilled: 8,
  },
];

const filterOptions: FilterOption[] = [
  { label: "All Industries", value: "all" },
  { label: "Real Estate", value: "real-estate" },
  { label: "Education", value: "education" },
  { label: "Insurance", value: "insurance" },
  { label: "E-commerce", value: "ecommerce" },
];

// ─── Components ─────────────────────────────────────────────────────

function FoldedCornerCard({ win }: { win: Win }) {
  return (
    <div className="relative group">
      {/* Main Card */}
      <div className="relative bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1">

        {/* Folded Corner - The Star Feature */}
        <div className="absolute top-0 right-0 z-20">
          {/* The folded triangle */}
          <div
            className="relative"
            style={{
              width: "48px",
              height: "48px",
            }}
          >
            {/* Back of fold (the shadow/darker part visible underneath) */}
            <div
              className="absolute top-0 right-0"
              style={{
                width: "0",
                height: "0",
                borderStyle: "solid",
                borderWidth: "0 48px 48px 0",
                borderColor: "transparent #d1d5db transparent transparent",
              }}
            />
            {/* Front of fold (the white paper curling over) */}
            <div
              className="absolute top-0 right-0"
              style={{
                width: "0",
                height: "0",
                borderStyle: "solid",
                borderWidth: "0 40px 40px 0",
                borderColor: "transparent #f3f4f6 transparent transparent",
              }}
            />
            {/* The curled edge highlight */}
            <div
              className="absolute top-0 right-0"
              style={{
                width: "0",
                height: "0",
                borderStyle: "solid",
                borderWidth: "0 36px 36px 0",
                borderColor: "transparent #ffffff transparent transparent",
              }}
            />
            {/* Subtle shadow line on the fold edge */}
            <div
              className="absolute top-0 right-0"
              style={{
                width: "0",
                height: "0",
                borderStyle: "solid",
                borderWidth: "0 38px 38px 0",
                borderColor: "transparent #e5e7eb transparent transparent",
              }}
            />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 pr-14">
          {/* Industry badge */}
          <div
            className={`w-10 h-10 rounded-lg ${win.badgeBg} flex items-center justify-center text-white mb-4 shadow-sm`}
          >
            <win.icon className="w-5 h-5" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
            {win.title}
          </h3>

          {/* Industry & Detail */}
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
            <Tag className="w-3.5 h-3.5" />
            <span>
              {win.industry} · {win.detail}
            </span>
          </div>

          {/* Dots Progress */}
          <div className="flex items-center gap-1.5 mb-4">
            {Array.from({ length: win.dots }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  i < win.dotsFilled
                    ? "bg-blue-400"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-400 font-medium">
              converted
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {win.hoursAgo}h ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={onClose}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// ─── Main Section ───────────────────────────────────────────────────
export default function RecentJobsPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Main Content Area with subtle rounded container */}
      <div className="mx-4 mb-4">
        <div className="bg-[#f5f6f7] rounded-2xl border border-gray-100/50 relative overflow-hidden">
          {/* Subtle dot pattern background */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
            backgroundSize: '6px 6px'
            }}
          />

          {/* Decorative blue squares */}
          <div className="absolute top-20 right-16 flex flex-col gap-1.5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-sky-400" />
              <div className="w-3 h-3 rounded-sm bg-sky-400" />
            </div>
            <div className="flex gap-1.5 ml-4">
              <div className="w-3 h-3 rounded-sm bg-sky-400" />
            </div>
          </div>

          <div className="absolute bottom-20 left-20 flex flex-col gap-1.5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-sky-400" />
              <div className="w-3 h-3 rounded-sm bg-sky-400" />
            </div>
            <div className="flex gap-1.5 ml-4">
              <div className="w-3 h-3 rounded-sm bg-sky-400" />
            </div>
          </div>

          {/* Section Content */}
          <div className="relative z-10 py-12 px-8">
            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
              Recent Wins
            </h1>

            {/* Filters Button */}
            <div className="flex justify-center mb-10 relative">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm font-medium hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <span className="text-sky-500 font-medium">Filters</span>
                <SlidersHorizontal className="w-4 h-4 text-sky-500" />
              </button>
              <FilterDropdown
                isOpen={filtersOpen}
                onClose={() => setFiltersOpen(false)}
              />
            </div>

            {/* Cards Grid */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {wins.map((win) => (
                <FoldedCornerCard key={win.id} win={win} />
              ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-10">
            <Link href="/resources/case-studies">  <button className="px-8 py-3 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm">
                View All Results
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}