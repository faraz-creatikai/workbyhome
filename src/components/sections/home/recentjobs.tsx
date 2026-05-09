"use client";

import React, { useState } from "react";
import { MapPin, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";

// ─── Types ──────────────────────────────────────────────────────────
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  experience: string;
  postedDays: number;
  logo: string;
  logoBg: string;
  dots: number;
  dotsFilled: number;
}

interface FilterOption {
  label: string;
  value: string;
}

// ─── Data ───────────────────────────────────────────────────────────
const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Slack",
    location: "London",
    experience: "Experievel",
    postedDays: 2,
    logo: "S",
    logoBg: "bg-[#4A154B]",
    dots: 9,
    dotsFilled: 2,
  },
  {
    id: 2,
    title: "Senior Cashad Engineer",
    company: "Slack",
    location: "Marniraton",
    experience: "12+ Level",
    postedDays: 2,
    logo: "S",
    logoBg: "bg-[#4A154B]",
    dots: 7,
    dotsFilled: 3,
  },
  {
    id: 3,
    title: "Senior Software Engineer",
    company: "Gmail",
    location: "Hamington",
    experience: "Bevormanco",
    postedDays: 2,
    logo: "M",
    logoBg: "bg-gradient-to-br from-red-500 via-yellow-500 to-green-500",
    dots: 12,
    dotsFilled: 2,
  },
  {
    id: 4,
    title: "Senior Software Engineer",
    company: "Slack",
    location: "Sanjurahan",
    experience: "1+ Experience",
    postedDays: 2,
    logo: "S",
    logoBg: "bg-[#4A154B]",
    dots: 12,
    dotsFilled: 2,
  },
];

const filterOptions: FilterOption[] = [
  { label: "All Locations", value: "all" },
  { label: "Remote", value: "remote" },
  { label: "On-site", value: "onsite" },
  { label: "Hybrid", value: "hybrid" },
];

// ─── Components ─────────────────────────────────────────────────────

function FoldedCornerCard({ job }: { job: Job }) {
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
          {/* Logo */}
          <div
            className={`w-10 h-10 rounded-lg ${job.logoBg} flex items-center justify-center text-white font-bold text-sm mb-4 shadow-sm`}
          >
            {job.logo === "M" ? (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
              </svg>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
            {job.title}
          </h3>

          {/* Location & Experience */}
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {job.location} · {job.experience}
            </span>
          </div>

          {/* Dots Progress */}
          <div className="flex items-center gap-1.5 mb-4">
            {Array.from({ length: job.dots }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  i < job.dotsFilled
                    ? "bg-blue-400"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-400 font-medium">
              time posted
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {job.postedDays} days ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="grid grid-cols-2 gap-0.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-gray-900" />
          <div className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
          <div className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
          <div className="w-2.5 h-2.5 rounded-sm bg-gray-900" />
        </div>
        <span className="text-lg font-semibold text-gray-900 tracking-tight">
          ChronoTask
        </span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <a
          href="#"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Features
        </a>
        <a
          href="#"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Solutions
        </a>
        <a
          href="#"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Resources
        </a>
        <a
          href="#"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Pricing
        </a>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-1.5">
          Sign in
        </button>
        <button className="text-sm text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:border-gray-400 hover:bg-gray-50 transition-all">
          Get demo
        </button>
      </div>
    </nav>
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

// ─── Main Page ──────────────────────────────────────────────────────
export default function RecentJobsPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Navbar */}
      

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
              Recent Jobs
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
              {jobs.map((job) => (
                <FoldedCornerCard key={job.id} job={job} />
              ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-10">
            <Link href="/view-all-jobs">  <button className="px-8 py-3 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm">
                View All Jobs
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

