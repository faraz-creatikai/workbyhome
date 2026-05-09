"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ───────────────────────────────────────────
   INTEGRATION LOGOS DATA
   ─────────────────────────────────────────── */
import {
  SiGoogledrive,
  SiInstagram,
  SiGooglephotos,
  SiSlack,
  SiSalesforce,
  SiSpotify,
  SiHubspot,
  SiIntercom,
  SiGooglecalendar,
  SiMongodb,
  SiGmail,
  
  

} from "react-icons/si";

import { 
  FaMicrosoft, 

} from "react-icons/fa";

const integrationsRow1 = [
  {
    name: "Google Drive",
    icon: SiGoogledrive,
    color: "#0F9D58",
  },
  {
    name: "Instagram",
    icon: SiInstagram,
    color: "#E4405F",
  },
  {
    name: "Microsoft Teams",
    icon: FaMicrosoft,
    color: "#6264A7",
  },
  {
    name: "Gmail",
    icon: SiGmail,
    color: "#EA4335",
  },
  {
    name: "Google Photos",
    icon: SiGooglephotos,
    color: "#4285F4",
  },
  {
    name: "Outlook",
    icon: SiHubspot,
    color: "#0078D4",
  },
  {
    name: "Slack",
    icon: SiSlack,
    color: "#4A154B",
  },
];

const integrationsRow2 = [
  {
    name: "Adobe Premiere",
    icon: FaMicrosoft,
    color: "#9999FF",
  },
  {
    name: "Salesforce",
    icon: SiSalesforce,
    color: "#00A1E0",
  },
  {
    name: "Spotify",
    icon: SiSpotify,
    color: "#1DB954",
  },
  {
    name: "HubSpot",
    icon: SiHubspot,
    color: "#FF7A59",
  },
  {
    name: "Intercom",
    icon: SiIntercom,
    color: "#1F8DED",
  },
  {
    name: "Google Calendar",
    icon: SiGooglecalendar,
    color: "#4285F4",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
  },
];

/* ───────────────────────────────────────────
   LOGO CARD COMPONENT
   ─────────────────────────────────────────── */
function LogoCard({ integration }: { integration: typeof integrationsRow1[0] }) {
   const Icon = integration.icon;
  return (
    <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-2xl sm:rounded-3xl shadow-md shadow-gray-200/40 border border-gray-100 flex items-center justify-center p-3 sm:p-4 hover:shadow-lg hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer mx-2 sm:mx-3">
      {/* <img
        src={integration.icon}
        alt={integration.name}
        className="w-full h-full object-contain"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<span class="text-xs font-bold text-gray-400">${integration.name.slice(0, 2)}</span>`;
          }
        }}
      /> */}
         <Icon className="w-full h-full " style={{ color: integration.color }} />
    </div>
  );
}

/* ───────────────────────────────────────────
   INTEGRATIONS SECTION — Infinite Scroll Marquee
   Row 1: scrolls left → right (continuous)
   Row 2: scrolls right → left (continuous, opposite)
   ─────────────────────────────────────────── */
export default function IntegrationsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Triple the items for seamless infinite loop
  const row1Items = [...integrationsRow1, ...integrationsRow1, ...integrationsRow1];
  const row2Items = [...integrationsRow2, ...integrationsRow2, ...integrationsRow2];

  return (
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden bg-white">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center px-4 py-1.5 text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded-full shadow-sm uppercase tracking-wider">
            Integrations
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center leading-tight px-4"
        >
          Connect integrations
          <br />
          you use every day
        </motion.h2>

        {/* Center 4-dot icon with connecting lines */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center mt-10"
        >
          <div className="relative w-full max-w-3xl">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200" />
            <div className="relative z-10 flex justify-center">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-lg shadow-gray-200/60 border border-gray-100 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── MARQUEE ROW 1: Left to Right ── */}
        <div className="mt-12 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex animate-marquee-left">
              {row1Items.map((integration, i) => (
                <LogoCard key={`r1-${i}`} integration={integration} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── MARQUEE ROW 2: Right to Left (Opposite) ── */}
        <div className="mt-5 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex animate-marquee-right">
              {row2Items.map((integration, i) => (
                <LogoCard key={`r2-${i}`} integration={integration} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS Keyframes for marquee */}
      {/* <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
          width: max-content;
        }
        .animate-marquee-right {
          animation: marquee-right 25s linear infinite;
          width: max-content;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style> */}
    </section>
  );
}