"use client";

import { useState } from "react";

/* ─── Types ───────────────────────────────────────────────────────────────── */
type BillingCycle = "monthly" | "annual";

interface PricingFeature {
  text: string;
  highlight?: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  properties: string;
  agents: string;
  badge?: string;
  isPopular?: boolean;
  features: PricingFeature[];
  cta: string;
  accentClass: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

/* ─── Data ────────────────────────────────────────────────────────────────── */
const PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for independent landlords",
    monthlyPrice: 2999,
    annualPrice: 1999,
    properties: "Up to 10 properties",
    agents: "3 AI Agents",
    features: [
      { text: "Lease Analyzer agent" },
      { text: "Tenant Screener agent" },
      { text: "Payment Tracker agent" },
      { text: "Dashboard & analytics" },
      { text: "Email support" },
      { text: "Mobile app access" },
    ],
    cta: "Start Free Trial",
    accentClass: "from-[#3399ff] to-[#0066cc]",
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "For growing property portfolios",
    monthlyPrice: 7999,
    annualPrice: 5499,
    properties: "Up to 50 properties",
    agents: "7 AI Agents",
    badge: "Most Popular",
    isPopular: true,
    features: [
      { text: "Everything in Starter" },
      { text: "Market Valuation agent", highlight: true },
      { text: "Maintenance Predictor agent", highlight: true },
      { text: "Energy Optimizer agent", highlight: true },
      { text: "Occupancy Forecaster agent", highlight: true },
      { text: "Priority support (< 4 hr)" },
      { text: "Custom reports & exports" },
      { text: "API access (10k calls/mo)" },
      { text: "Multi-user (5 seats)" },
    ],
    cta: "Start Free Trial",
    accentClass: "from-[#0066cc] to-[#003871]",
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For large portfolios & agencies",
    monthlyPrice: 18999,
    annualPrice: 13999,
    properties: "Up to 250 properties",
    agents: "All 10 AI Agents",
    features: [
      { text: "Everything in Professional" },
      { text: "Document Scanner agent", highlight: true },
      { text: "Risk Monitor agent", highlight: true },
      { text: "Comms Agent (all languages)", highlight: true },
      { text: "Dedicated account manager" },
      { text: "SLA guarantee (99.9%)" },
      { text: "Unlimited API access" },
      { text: "White-label options" },
      { text: "Unlimited seats" },
      { text: "Custom AI training" },
    ],
    cta: "Start Free Trial",
    accentClass: "from-[#002b57] to-[#0057ad]",
  },
];

const FAQS: FaqItem[] = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes — upgrade or downgrade anytime. Upgrades take effect immediately with prorated billing. Downgrades apply at the next billing cycle.",
  },
  {
    question: "What happens after the free trial?",
    answer:
      "Your 14-day trial includes full access to your chosen plan. We'll remind you 3 days before it ends. No charge until you confirm — no card needed to start.",
  },
  {
    question: "Are prices per property or per portfolio?",
    answer:
      "Per portfolio. Your plan covers all properties up to the listed limit. Add more any time by upgrading — agents run across your entire portfolio automatically.",
  },
  {
    question: "Do you offer GST invoices?",
    answer:
      "Yes. All plans include a GST-compliant invoice issued in INR. We're registered under GST and your invoices are ready for business expense claims.",
  },
  {
    question: "What counts as an 'AI Agent'?",
    answer:
      "Each agent is a purpose-built autonomous module (e.g. Lease Analyzer, Tenant Screener). Your plan defines which agents are active — they run 24/7 on your portfolio with no per-task fees.",
  },
  {
    question: "Is my data secure?",
    answer:
      "EstateAI is SOC 2 Type II certified, encrypted at rest and in transit, and hosted on ISO 27001-compliant infrastructure. Your data is never used to train models for other clients.",
  },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const formatINR = (amount: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

/* ─── CheckIcon ───────────────────────────────────────────────────────────── */
const CheckIcon = ({ highlight }: { highlight?: boolean }) => (
  <svg
    className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
      highlight ? "text-[#0066cc]" : "text-[#0a9e72]"
    }`}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="8"
      cy="8"
      r="7"
      fill={highlight ? "#e6f2ff" : "#e6f9f4"}
    />
    <path
      d="M5 8l2.5 2.5L11 5.5"
      stroke={highlight ? "#0066cc" : "#0a9e72"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── PlanCard ────────────────────────────────────────────────────────────── */
const PlanCard = ({
  plan,
  billing,
}: {
  plan: PricingPlan;
  billing: BillingCycle;
}) => {
  const price =
    billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
  const saving = Math.round(
    ((plan.monthlyPrice - plan.annualPrice) / plan.monthlyPrice) * 100
  );

  return (
    <div
      className={`relative flex flex-col rounded-2xl transition-all duration-300 ${
        plan.isPopular
          ? "bg-[#0066cc] shadow-2xl shadow-[#0066cc]/25 scale-[1.03] z-10"
          : "bg-white border border-[#cce5ff] hover:border-[#3399ff]/50 hover:shadow-xl hover:shadow-[#0066cc]/8 hover:-translate-y-1"
      }`}
    >
      {/* Popular ribbon */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 bg-[#003871] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#66b2ff] animate-pulse" />
            {plan.badge}
          </span>
        </div>
      )}

      <div className="p-7 flex flex-col h-full">
        {/* Plan header */}
        <div className="mb-6">
          {/* Agent count badge */}
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 ${
              plan.isPopular
                ? "bg-white/15 text-[#cce5ff] border border-white/20"
                : "bg-[#e6f2ff] text-[#0066cc] border border-[#99ccff]/50"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                plan.isPopular ? "bg-[#66b2ff]" : "bg-[#0066cc]"
              }`}
            />
            {plan.agents}
          </span>

          <h3
            className={`text-2xl font-extrabold tracking-tight mb-1 ${
              plan.isPopular ? "text-white" : "text-[#001e42]"
            }`}
          >
            {plan.name}
          </h3>
          <p
            className={`text-sm ${
              plan.isPopular ? "text-[#99ccff]" : "text-[#5580a8]"
            }`}
          >
            {plan.tagline}
          </p>
        </div>

        {/* Pricing */}
        <div className="mb-1">
          <div className="flex items-end gap-2">
            <span
              className={`text-4xl font-black tracking-tight leading-none ${
                plan.isPopular ? "text-white" : "text-[#001e42]"
              }`}
            >
              {formatINR(price)}
            </span>
            <span
              className={`text-sm pb-1 ${
                plan.isPopular ? "text-[#99ccff]" : "text-[#5580a8]"
              }`}
            >
              / month
            </span>
          </div>

          {billing === "annual" && (
            <p
              className={`text-xs mt-1.5 font-medium ${
                plan.isPopular ? "text-[#66b2ff]" : "text-[#3399ff]"
              }`}
            >
              Save {saving}% · billed{" "}
              {formatINR(plan.annualPrice * 12)} / year
            </p>
          )}
          {billing === "monthly" && (
            <p
              className={`text-xs mt-1.5 ${
                plan.isPopular ? "text-[#99ccff]/70" : "text-[#92b3d0]"
              }`}
            >
              or {formatINR(plan.annualPrice)}/mo billed annually
            </p>
          )}
        </div>

        {/* Property limit */}
        <div
          className={`mt-4 mb-6 flex items-center gap-2 text-xs font-mono font-semibold tracking-wide px-3 py-2 rounded-lg ${
            plan.isPopular
              ? "bg-white/10 text-[#cce5ff]"
              : "bg-[#f0f6ff] text-[#3399ff]"
          }`}
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 14V7l6-5 6 5v7H10v-4H6v4H2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          {plan.properties}
        </div>

        {/* Divider */}
        <div
          className={`w-full h-px mb-5 ${
            plan.isPopular ? "bg-white/15" : "bg-[#e6f2ff]"
          }`}
        />

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-7">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckIcon highlight={f.highlight} />
              <span
                className={`text-sm leading-snug ${
                  f.highlight
                    ? plan.isPopular
                      ? "text-white font-semibold"
                      : "text-[#001e42] font-semibold"
                    : plan.isPopular
                    ? "text-[#cce5ff]"
                    : "text-[#3a5f88]"
                }`}
              >
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          type="button"
          className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 active:scale-[0.98] ${
            plan.isPopular
              ? "bg-white text-[#0066cc] hover:bg-[#e6f2ff] shadow-lg shadow-black/10"
              : "bg-[#0066cc] text-white hover:bg-[#0057ad] shadow-md shadow-[#0066cc]/25"
          }`}
        >
          {plan.cta}
        </button>

        <p
          className={`text-center text-[11px] mt-3 ${
            plan.isPopular ? "text-[#99ccff]/70" : "text-[#92b3d0]"
          }`}
        >
          14-day free trial · No card required
        </p>
      </div>
    </div>
  );
};

/* ─── FaqAccordion ────────────────────────────────────────────────────────── */
const FaqAccordion = ({ items }: { items: FaqItem[] }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[#e6f2ff]">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            className="w-full flex items-center justify-between gap-4 py-5 text-left group"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            <span className="text-sm font-semibold text-[#001e42] group-hover:text-[#0066cc] transition-colors">
              {item.question}
            </span>
            <span
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                openIdx === i
                  ? "bg-[#0066cc] rotate-45"
                  : "bg-[#e6f2ff] rotate-0"
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 transition-colors ${
                  openIdx === i ? "text-white" : "text-[#0066cc]"
                }`}
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 1v10M1 6h10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIdx === i ? "max-h-40 pb-5" : "max-h-0"
            }`}
          >
            <p className="text-sm text-[#3a5f88] leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─── PricingSection ──────────────────────────────────────────────────────── */
export default function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>("annual");

  const annualSavings = PLANS.reduce((acc, p) => {
    return acc + (p.monthlyPrice - p.annualPrice) * 12;
  }, 0);

  return (
    <section
      id="pricing"
      className="relative bg-[#f0f6ff] py-24 overflow-hidden"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0066cc 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(0,102,204,0.08)_0%,transparent_70%)]" />
      <div className="absolute -bottom-40 -left-40 w-[560px] h-[560px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(51,153,255,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-[#e6f2ff] border border-[#99ccff]/60 text-[#0066cc] text-[10px] font-mono font-bold tracking-[0.12em] uppercase px-4 py-1.5 rounded-full mb-5">
            <span className="relative inline-flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#0066cc] animate-ping opacity-60" />
              <span className="relative rounded-full bg-[#0066cc] w-2 h-2" />
            </span>
            Transparent Pricing · INR
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#001e42] tracking-tight leading-tight mb-4">
            One plan.{" "}
            <span className="bg-gradient-to-r from-[#0066cc] to-[#3399ff] bg-clip-text text-transparent">
              All your agents.
            </span>
          </h2>
          <p className="text-lg text-[#3a5f88] leading-relaxed">
            Deploy autonomous AI agents across your portfolio. No per-task
            charges, no hidden fees — just one predictable monthly bill in ₹.
          </p>
        </div>

        {/* ── Billing toggle ── */}
        <div className="flex flex-col items-center gap-3 mb-14">
          <div className="inline-flex items-center bg-white border border-[#cce5ff] rounded-full p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                billing === "monthly"
                  ? "bg-[#0066cc] text-white shadow-md shadow-[#0066cc]/25"
                  : "text-[#5580a8] hover:text-[#0066cc]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                billing === "annual"
                  ? "bg-[#0066cc] text-white shadow-md shadow-[#0066cc]/25"
                  : "text-[#5580a8] hover:text-[#0066cc]"
              }`}
            >
              Annual
            </button>
          </div>

          {billing === "annual" && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#0a9e72] bg-[#e6f9f4] border border-[#0a9e72]/20 px-3 py-1 rounded-full">
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6l3 3 5-5" stroke="#0a9e72" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Save up to 27% with annual billing
            </span>
          )}
        </div>

        {/* ── Plan cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-16">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>

        {/* ── Enterprise strip ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#001e42] via-[#0057ad] to-[#0066cc] p-8 mb-20">
          {/* subtle grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest uppercase text-[#66b2ff] bg-white/10 border border-white/15 px-3 py-1 rounded-full mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#66b2ff] animate-pulse" />
                500+ Properties
              </span>
              <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                Enterprise & Custom Portfolios
              </h3>
              <p className="text-[#99ccff] text-sm max-w-lg leading-relaxed">
                Unlimited properties, custom AI model training on your own data,
                dedicated SRE support, on-premise deployment, and white-labelling.
                Pricing tailored to your portfolio size.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                type="button"
                className="px-7 py-3.5 rounded-xl bg-white text-[#0066cc] font-bold text-sm hover:bg-[#e6f2ff] transition-colors shadow-lg shadow-black/10"
              >
                Contact Sales
              </button>
              <button
                type="button"
                className="px-7 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
              >
                View Demo
              </button>
            </div>
          </div>
        </div>

        {/* ── Trust strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
          {[
            { icon: "🔒", title: "SOC 2 Certified",     sub: "Enterprise security"      },
            { icon: "🇮🇳", title: "GST Invoices",        sub: "INR billing · Tax ready"  },
            { icon: "⚡", title: "14-Day Free Trial",   sub: "No card required"         },
            { icon: "🛡️", title: "99.9% Uptime SLA",   sub: "On Scale & Enterprise"    },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center gap-2 p-5 bg-white border border-[#cce5ff]/60 rounded-2xl shadow-sm hover:border-[#3399ff]/40 hover:shadow-md transition-all"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-bold text-[#001e42]">{item.title}</span>
              <span className="text-[11px] text-[#5580a8] font-mono">{item.sub}</span>
            </div>
          ))}
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-extrabold text-[#001e42] tracking-tight mb-2">
              Frequently asked questions
            </h3>
            <p className="text-sm text-[#5580a8]">
              Everything you need to know before you commit.
            </p>
          </div>

          <div className="bg-white border border-[#cce5ff]/70 rounded-2xl px-6 shadow-sm">
            <FaqAccordion items={FAQS} />
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="text-center mt-16 pt-16 border-t border-[#cce5ff]/60">
          <p className="text-sm text-[#5580a8] mb-6">
            <span className="font-bold text-[#001e42]">2,500+</span> property
            managers across India trust EstateAI
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              className="px-8 py-4 rounded-xl bg-[#0066cc] text-white font-bold text-sm hover:bg-[#0057ad] transition-colors shadow-lg shadow-[#0066cc]/25 flex items-center justify-center gap-2"
            >
              Start 14-Day Free Trial
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="px-8 py-4 rounded-xl bg-white border border-[#cce5ff] text-[#0066cc] font-bold text-sm hover:border-[#3399ff] hover:bg-[#f0f6ff] transition-colors shadow-sm"
            >
              Talk to Sales
            </button>
          </div>
          <p className="text-[11px] text-[#92b3d0] mt-4 font-mono">
            No credit card · Cancel anytime · GST invoice included
          </p>
        </div>

      </div>
    </section>
  );
}
