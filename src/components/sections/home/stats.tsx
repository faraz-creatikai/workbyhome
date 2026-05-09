"use client"
import { useState,useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Briefcase, Globe, Star, Users } from "lucide-react";
import { Variants } from "framer-motion";
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
const fadeUp:Variants  = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stats = [
  { icon: Briefcase, value: "2,500+", label: "Remote Jobs" },
  { icon: Users, value: "150K+", label: "Job Seekers" },
  { icon: Globe, value: "80+", label: "Countries" },
  { icon: Star, value: "4.9", label: "Rating" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4  gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center bg-neutral-100 rounded-xl  py-4"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 mb-4">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}</div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}