'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';

function useAnimatedNumber(value: number, duration = 600) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const start = prev.current;
    const diff = value - start;
    if (diff === 0) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) requestAnimationFrame(animate);
      else prev.current = value;
    };
    requestAnimationFrame(animate);
  }, [value, duration]);
  return display;
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
}

function SliderInput({ label, value, min, max, step, onChange, format }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; format: (v: number) => string;
}) {
  return (
    <div>
      <label className="flex justify-between text-sm font-medium text-white/80 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <span>{label}</span>
        <span style={{ color: '#C9A84C' }}>{format(value)}</span>
      </label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} className="gold-slider" />
    </div>
  );
}

function RatioBar({ label, ratio, max: maxVal }: { label: string; ratio: number; max: number }) {
  const pct = Math.min((ratio / maxVal) * 100, 100);
  const color = ratio <= maxVal * 0.85 ? '#4ade80' : ratio <= maxVal ? '#fbbf24' : '#f87171';
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <span className="text-white/60">{label}</span>
        <span style={{ color }}>{ratio.toFixed(1)}% / {maxVal}%</span>
      </div>
      <div className="w-full h-3 rounded-full" style={{ background: '#2a2a2a' }}>
        <div className="h-3 rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function AffordabilityCalculatorPage() {
  const [income, setIncome] = useState(120000);
  const [debts, setDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(100000);
  const [contractRate, setContractRate] = useState(4.5);
  const [amortization, setAmortization] = useState(25);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [propertyTax, setPropertyTax] = useState(300);
  const [heating, setHeating] = useState(150);
  const [strataFee, setStrataFee] = useState(0);

  const stressRate = Math.max(5.25, contractRate + 2);
  const grossMonthly = income / 12;

  const { maxMortgage, maxHomePrice, monthlyPayment, gdsRatio, tdsRatio } = useMemo(() => {
    const fixedCosts = propertyTax + heating + strataFee * 0.5;

    // GDS and TDS max payment
    const maxPaymentGDS = grossMonthly * 0.39 - fixedCosts;
    const maxPaymentTDS = grossMonthly * 0.44 - fixedCosts - debts;
    const maxPayment = Math.max(Math.min(maxPaymentGDS, maxPaymentTDS), 0);

    // Reverse PV at stress rate
    const r = stressRate / 100 / 12;
    const n = amortization * 12;
    let maxMort: number;
    if (r === 0) {
      maxMort = maxPayment * n;
    } else {
      maxMort = maxPayment * ((1 - Math.pow(1 + r, -n)) / r);
    }
    maxMort = Math.max(Math.round(maxMort), 0);
    const maxPrice = maxMort + downPayment;

    // Estimated monthly payment at contract rate
    const cr = contractRate / 100 / 12;
    let mp: number;
    if (cr === 0) {
      mp = maxMort / n;
    } else {
      mp = (maxMort * cr * Math.pow(1 + cr, n)) / (Math.pow(1 + cr, n) - 1);
    }
    mp = Math.round(mp);

    // GDS & TDS at contract rate
    const gds = grossMonthly > 0 ? ((mp + fixedCosts) / grossMonthly) * 100 : 0;
    const tds = grossMonthly > 0 ? ((mp + fixedCosts + debts) / grossMonthly) * 100 : 0;

    return { maxMortgage: maxMort, maxHomePrice: Math.round(maxPrice), monthlyPayment: mp, gdsRatio: gds, tdsRatio: tds };
  }, [debts, downPayment, contractRate, stressRate, amortization, propertyTax, heating, strataFee, grossMonthly]);

  const animatedPrice = useAnimatedNumber(maxHomePrice);
  const animatedMortgage = useAnimatedNumber(maxMortgage);
  const animatedPayment = useAnimatedNumber(monthlyPayment);

  const needs30yrWarning = amortization > 25;
  const dpPercent = maxHomePrice > 0 ? (downPayment / maxHomePrice) * 100 : 0;

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      <div className="pt-32 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/tools" className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6 hover:opacity-80 transition-opacity" style={{ color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
            All Calculators
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white font-heading">Affordability Calculator</h1>
          <p className="text-white/50 mt-2 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Find your maximum home price based on Canadian OSFI B-20 lending rules.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Stress Test Banner */}
        <div className="rounded-xl px-5 py-4 mb-8 flex items-center gap-3" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.15)' }}>
            <span className="text-sm" role="img" aria-label="shield">🛡️</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Stress Test Rate: <span style={{ color: '#C9A84C' }}>{stressRate.toFixed(2)}%</span>
            </p>
            <p className="text-xs text-white/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Max of 5.25% or {contractRate.toFixed(2)}% + 2% = {(contractRate + 2).toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ===== INPUTS ===== */}
          <div className="space-y-6">
            <div className="rounded-2xl p-6 md:p-8 space-y-7" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <SliderInput label="Annual Household Income" value={income} min={30000} max={1000000} step={5000} onChange={setIncome} format={fmt} />
              <SliderInput label="Monthly Debt Payments" value={debts} min={0} max={10000} step={50} onChange={setDebts} format={fmt} />
              <SliderInput label="Down Payment" value={downPayment} min={10000} max={2000000} step={5000} onChange={setDownPayment} format={fmt} />
              <SliderInput label="Mortgage Rate (Contract)" value={contractRate} min={2} max={12} step={0.05} onChange={setContractRate} format={v => `${v.toFixed(2)}%`} />

              {/* Amortization */}
              <div>
                <SliderInput label="Amortization" value={amortization} min={5} max={30} step={1} onChange={setAmortization} format={v => `${v} years`} />
                {needs30yrWarning && (
                  <div className="mt-2 px-4 py-2.5 rounded-lg text-xs" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24', fontFamily: "'DM Sans', sans-serif" }}>
                    ⚠️ 30-year amortization requires ≥20% down payment
                  </div>
                )}
              </div>
            </div>

            {/* Advanced Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between rounded-xl px-5 py-4 text-sm font-medium transition-all"
              style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans', sans-serif" }}
            >
              <span>Advanced Options</span>
              <svg className={`w-4 h-4 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showAdvanced && (
              <div className="rounded-2xl p-6 md:p-8 space-y-6 calc-results-enter" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <SliderInput label="Monthly Property Tax" value={propertyTax} min={0} max={2000} step={25} onChange={setPropertyTax} format={fmt} />
                <SliderInput label="Monthly Heating" value={heating} min={0} max={500} step={10} onChange={setHeating} format={fmt} />
                <SliderInput label="Monthly Strata Fee" value={strataFee} min={0} max={1500} step={25} onChange={setStrataFee} format={fmt} />
                <p className="text-white/30 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  GDS includes 50% of strata fees per OSFI guidelines.
                </p>
              </div>
            )}
          </div>

          {/* ===== RESULTS ===== */}
          <div className="space-y-6 calc-results-enter">
            {/* Max Home Price */}
            <div className="rounded-2xl p-8 text-center" style={{ background: '#141414', border: '1px solid rgba(201,168,76,0.4)', boxShadow: '0 0 30px rgba(201,168,76,0.06)' }}>
              <p className="text-white/50 text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Maximum Home Price</p>
              <p className="text-5xl md:text-6xl font-semibold mb-1 font-heading" style={{ color: '#C9A84C' }}>{fmt(animatedPrice)}</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-5 text-center" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-white/40 text-xs mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Max Mortgage</p>
                <p className="text-lg font-semibold text-white font-heading">{fmt(animatedMortgage)}</p>
              </div>
              <div className="rounded-xl p-5 text-center" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-white/40 text-xs mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Est. Monthly Payment</p>
                <p className="text-lg font-semibold text-white font-heading">{fmt(animatedPayment)}</p>
                <p className="text-white/30 text-[10px] mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>at contract rate</p>
              </div>
            </div>

            {/* GDS / TDS */}
            <div className="rounded-2xl p-6 space-y-5" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/50 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Debt Service Ratios</p>
              <RatioBar label="GDS (Gross Debt Service)" ratio={gdsRatio} max={39} />
              <RatioBar label="TDS (Total Debt Service)" ratio={tdsRatio} max={44} />
            </div>

            {/* Stress Test Summary */}
            <div className="rounded-2xl p-6" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Stress Test Summary</p>
              <div className="space-y-2">
                {[
                  { label: 'Contract Rate', value: `${contractRate.toFixed(2)}%` },
                  { label: 'Qualifying (Stress) Rate', value: `${stressRate.toFixed(2)}%` },
                  { label: 'Down Payment', value: `${fmt(downPayment)} (${dpPercent.toFixed(1)}%)` },
                  { label: 'Amortization', value: `${amortization} years` },
                  { label: 'Gross Monthly Income', value: fmt(Math.round(grossMonthly)) },
                ].map(row => (
                  <div key={row.label} className="flex justify-between text-sm py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontFamily: "'DM Sans', sans-serif" }}>
                    <span className="text-white/50">{row.label}</span>
                    <span className="text-white/80">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-xl p-5" style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <p className="text-white/40 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Max CMHC-insured mortgage is $1.5M (Dec 2024). Uninsured lenders may have additional requirements. This calculator uses OSFI B-20 qualifying rules (GDS ≤ 39%, TDS ≤ 44%).
              </p>
            </div>

            <p className="text-white/30 text-xs text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              For estimation purposes only. Consult a mortgage professional for advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
