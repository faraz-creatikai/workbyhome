import React from 'react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter plan',
      subtitle: 'Perfect for solo agents & small teams.',
      price: '$5',
      period: '/mo',
      buttonText: 'Get Started',
      buttonStyle: 'bg-[#1E88E5] text-white',
      features: [
        'Up to 3 calling team seats',
        'AI Lead Capture Agent',
        'AI Qualification Agent',
        'Basic CRM & call logging',
        '1,000 leads/mo',
        'Email support',
      ],
      isPopular: false,
    },
    {
      name: 'Growth plan',
      subtitle: 'Ideal for growing calling teams.',
      price: '$9',
      period: '/mo',
      buttonText: 'Get Started',
      buttonStyle: 'bg-white text-[#1E88E5]',
      features: [
        'Up to 15 calling team seats',
        'All AI Agents (Calling, Campaign, Data Mining & more)',
        'Full CRM with campaign automation',
        'WhatsApp, Email & SMS integrations',
        '10,000 leads/mo',
        'Priority support',
      ],
      isPopular: true,
      badge: 'Most popular',
    },
    {
      name: 'Enterprise plan',
      subtitle: 'Best for large calling operations.',
      price: '$15',
      period: '/mo',
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-[#1E88E5] text-white',
      features: [
        'Unlimited calling team seats',
        'Custom AI agent workflows',
        'Dedicated CRM instance',
        'Advanced analytics & reporting',
        'Unlimited leads',
        'Dedicated account manager',
      ],
      isPopular: false,
    },
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
          Pricing that scales with your calling team
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