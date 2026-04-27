'use client';

import Link from 'next/link';
import { useState } from 'react';

const calculators = [
  {
    icon: '🏠',
    title: 'Payment Calculator',
    description: 'Estimate your monthly mortgage payments with precision.',
    keywords: 'Home Price · Down Payment · Amortization',
    href: '/tools/payment-calculator',
  },
  {
    icon: '🔄',
    title: 'Refinance Calculator',
    description: 'Compare your current mortgage against potential new terms.',
    keywords: 'Savings · Break-Even · Penalty',
    href: '/tools/refinance-calculator',
  },
  {
    icon: '📋',
    title: 'Property Transfer Tax',
    description: 'Calculate BC Property Transfer Tax and first-time buyer rebates.',
    keywords: 'BC PTT · FTHB Rebate · Brackets',
    href: '/tools/property-transfer-tax',
  },
  {
    icon: '💰',
    title: 'Affordability Calculator',
    description: 'Find your maximum home price based on Canadian lending rules.',
    keywords: 'Stress Test · GDS / TDS · OSFI B-20',
    href: '/tools/affordability-calculator',
  },
];

export default function ToolsHubPage() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <div className="pt-32 pb-16 text-center px-4">
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          style={{ color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}
        >
          Financial Tools
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 font-heading">
          Mortgage Calculators
        </h1>
        <p
          className="text-white/60 max-w-lg mx-auto text-base"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Professional tools to plan your real estate investment. All calculations follow current Canadian regulations.
        </p>
        <div className="mt-8 mx-auto w-64 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
      </div>

      {/* Calculator Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculators.map((calc, i) => (
            <Link
              key={calc.href}
              href={calc.href}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group relative rounded-2xl p-8 transition-all duration-500"
              style={{
                background: '#141414',
                border: `1px solid ${hoveredIdx === i ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.06)'}`,
                boxShadow: hoveredIdx === i ? '0 0 40px rgba(201,168,76,0.12)' : 'none',
                transform: hoveredIdx === i ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              {/* Icon */}
              <div className="text-4xl mb-5">{calc.icon}</div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-white mb-2 font-heading">
                {calc.title}
              </h2>

              {/* Description */}
              <p
                className="text-white/60 text-sm mb-3 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {calc.description}
              </p>

              {/* Keywords */}
              <p
                className="text-[11px] tracking-wide uppercase mb-6"
                style={{ color: '#C9A84C', fontFamily: "'DM Sans', sans-serif", opacity: 0.7 }}
              >
                {calc.keywords}
              </p>

              {/* Arrow CTA */}
              <div
                className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-all duration-500"
                style={{
                  color: '#C9A84C',
                  fontFamily: "'DM Sans', sans-serif",
                  opacity: hoveredIdx === i ? 1 : 0,
                  transform: hoveredIdx === i ? 'translateX(0)' : 'translateX(-12px)',
                }}
              >
                Open Calculator
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          className="text-center text-white/30 text-xs mt-12"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          For estimation purposes only. Consult a mortgage professional, notary, or lawyer for advice.
        </p>
      </div>
    </div>
  );
}
