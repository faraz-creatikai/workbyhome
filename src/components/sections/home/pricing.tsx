import React from 'react';
import { BsChatSquareDots } from 'react-icons/bs';
import { FcClapperboard, FcOvertime, FcPlanner } from 'react-icons/fc';

export default function PricingPage() {
  const plans = [
    {
      name: 'Basic plan',
      subtitle: 'Perfect for individuals.',
      price: '$5',
      period: '/mo',
      buttonText: 'Get started',
      buttonStyle: 'bg-[#1E88E5] text-white',
      features: [
        'All product features',
        'Unlimited lists & tasks',
        'Priority support',
        'Unlimited tasks',
        'Unlimited file storage',
        'Unlimited projects',
      ],
      isPopular: false,
    },
    {
      name: 'Pro plan',
      subtitle: 'Ideal for small teams.',
      price: '$9',
      period: '/mo',
      buttonText: 'Get started',
      buttonStyle: 'bg-white text-[#1E88E5]',
      features: [
        'All product features',
        'Unlimited lists & tasks',
        'Priority support',
        'Unlimited tasks',
        'Unlimited file storage',
        'Unlimited projects',
      ],
      isPopular: true,
      badge: 'Best choice',
    },
    {
      name: 'Advanced plan',
      subtitle: 'Best for large organizations.',
      price: '$15',
      period: '/mo',
      buttonText: 'Get started',
      buttonStyle: 'bg-[#1E88E5] text-white',
      features: [
        'All product features',
        'Unlimited lists & tasks',
        'Priority support',
        'Unlimited tasks',
        'Unlimited file storage',
        'Unlimited projects',
      ],
      isPopular: false,
    },
  ];

  const footerLinks = {
    left: ['About Us', 'Contact', "What's New", 'Careers'],
    right: ['Product', 'Solutions', 'Integrations', 'Price'],
  };

  const floatingIcons = [
    { icon: <BsChatSquareDots />, top: '28%', left: '8%', rotate: '-12deg', size: 'w-14 h-14' },
    { icon: '20', top: '18%', left: '22%', rotate: '8deg', size: 'w-16 h-16', isNumber: true },
    { icon: '✓', top: '55%', left: '15%', rotate: '-6deg', size: 'w-14 h-14', isCheck: true },
    { icon: '⚡', top: '38%', left: '38%', rotate: '12deg', size: 'w-14 h-14' },
    { icon: '📅', top: '15%', left: '65%', rotate: '-4deg', size: 'w-14 h-14' },
    { icon: '⏱', top: '52%', left: '72%', rotate: '6deg', size: 'w-14 h-14' },
    { icon: '💡', top: '18%', left: '85%', rotate: '-8deg', size: 'w-14 h-14' },
    { icon: '≫', top: '55%', left: '88%', rotate: '4deg', size: 'w-14 h-14', isArrow: true },
    { icon: '⧗', top: '45%', left: '55%', rotate: '-10deg', size: 'w-12 h-12', isHourglass: true },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Pricing Section */}
      <section className="pt-16 my-3 mx-4 bg-[#F5F5F5] pb-20 px-4 rounded-xl shadow-2xl shadow-neutral-100">
        {/* Section Label */}
        <div className="flex justify-center mb-8">
          <span className="px-5 py-2 bg-white rounded-full text-sm text-gray-500 font-medium shadow-sm border border-gray-100">
            Pricing
          </span>
        </div>

        {/* Section Title */}
        <h2 className="text-center text-3xl sm:text-4xl font-semibold text-gray-900 mb-12">
          Simple pricing plans
        </h2>

        {/* Pricing Cards */}
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 w-full max-w-sm ${
                plan.isPopular
                  ? 'bg-[#1E88E5] text-white shadow-xl shadow-blue-600 scale-105 z-10'
                  : 'bg-white text-gray-900 shadow-2xl shadow-gray-600'
              }`}
            >
              {/* Popular Badge - Lightning */}
              {plan.isPopular && (
                <div className="absolute -top-3 -right-3 w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center rotate-12">
                <img src="https://png.pngtree.com/png-vector/20240920/ourlarge/pngtree-cool-flash-icon-png-image_13872174.png" className="w-12 h-12"/>
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`text-lg font-semibold mb-1 ${plan.isPopular ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-xs mb-4 ${plan.isPopular ? 'text-blue-100' : 'text-gray-500'}`}>
                {plan.subtitle}
              </p>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={`text-lg ${plan.isPopular ? 'text-blue-100' : 'text-gray-500'}`}>
                  {plan.period}
                </span>
              </div>

              {/* Best Choice Label */}
              {plan.badge && (
                <p className="text-xs text-blue-100 mb-4 font-medium">{plan.badge}</p>
              )}

              {/* CTA Button */}
              <button
                className={`w-full py-2.5 rounded-lg text-sm font-semibold mb-6 transition-all hover:opacity-90 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2.5 text-sm">
                    <svg
                      className={`w-4 h-4 flex-shrink-0 ${plan.isPopular ? 'text-blue-200' : 'text-[#1E88E5]'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.isPopular ? 'text-blue-50' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Learn More */}
              <p className={`mt-4 text-xs cursor-pointer hover:underline ${plan.isPopular ? 'text-blue-200' : 'text-gray-400'}`}>
                Learn more
              </p>
            </div>
          ))}
        </div>
      </section>

    
    </div>
  );
}

