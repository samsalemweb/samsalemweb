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

export default function RefinanceCalculatorPage() {
  // Current mortgage
  const [curBalance, setCurBalance] = useState(500000);
  const [curRate, setCurRate] = useState(5.5);
  const [curPayment, setCurPayment] = useState(3000);
  const [curYearsLeft, setCurYearsLeft] = useState(20);

  // New mortgage
  const [newRate, setNewRate] = useState(4.0);
  const [newAmort, setNewAmort] = useState(25);
  const [penalty, setPenalty] = useState(5000);

  const [resultKey, setResultKey] = useState(0);

  // Current total interest remaining
  const curTotalRemaining = useMemo(() => {
    return curPayment * curYearsLeft * 12 - curBalance;
  }, [curPayment, curYearsLeft, curBalance]);

  // New monthly payment
  const newMonthly = useMemo(() => {
    const r = newRate / 100 / 12;
    const n = newAmort * 12;
    if (r === 0) return Math.round(curBalance / n);
    return Math.round((curBalance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  }, [curBalance, newRate, newAmort]);

  // New total interest
  const newTotalInterest = useMemo(() => {
    return newMonthly * newAmort * 12 - curBalance;
  }, [newMonthly, newAmort, curBalance]);

  const monthlySavings = curPayment - newMonthly;
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(penalty / monthlySavings) : Infinity;
  const lifetimeSavings = curTotalRemaining - newTotalInterest - penalty;

  const animatedNew = useAnimatedNumber(newMonthly);
  const animatedSavings = useAnimatedNumber(Math.abs(monthlySavings));

  useEffect(() => { setResultKey(k => k + 1); }, [newMonthly]);

  const maxInterest = Math.max(curTotalRemaining, newTotalInterest, 1);

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      <div className="pt-32 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/tools" className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6 hover:opacity-80 transition-opacity" style={{ color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
            All Calculators
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white font-heading">Refinance Calculator</h1>
          <p className="text-white/50 mt-2 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Compare your current mortgage against potential new terms.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ===== INPUTS ===== */}
          <div className="space-y-6">
            {/* Current Mortgage */}
            <div className="rounded-2xl p-6 md:p-8 space-y-6" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="text-base font-semibold tracking-widest uppercase text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>Current Mortgage</h2>
              <SliderInput label="Outstanding Balance" value={curBalance} min={50000} max={3000000} step={10000} onChange={setCurBalance} format={fmt} />
              <SliderInput label="Current Interest Rate" value={curRate} min={1} max={15} step={0.05} onChange={setCurRate} format={v => `${v.toFixed(2)}%`} />
              <SliderInput label="Current Monthly Payment" value={curPayment} min={500} max={20000} step={50} onChange={setCurPayment} format={fmt} />
              <SliderInput label="Years Remaining" value={curYearsLeft} min={1} max={30} step={1} onChange={setCurYearsLeft} format={v => `${v} years`} />
            </div>

            {/* New Mortgage */}
            <div className="rounded-2xl p-6 md:p-8 space-y-6" style={{ background: '#141414', border: '1px solid rgba(201,168,76,0.2)' }}>
              <h2 className="text-base font-semibold tracking-widest uppercase" style={{ color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}>New Mortgage</h2>
              <SliderInput label="New Interest Rate" value={newRate} min={1} max={15} step={0.05} onChange={setNewRate} format={v => `${v.toFixed(2)}%`} />
              <SliderInput label="New Amortization" value={newAmort} min={5} max={30} step={1} onChange={setNewAmort} format={v => `${v} years`} />
              <SliderInput label="Refinance Penalty / Cost" value={penalty} min={0} max={50000} step={500} onChange={setPenalty} format={fmt} />
              <p className="text-white/30 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Typical Canadian penalty: 3 months&apos; interest or IRD, whichever is greater.
              </p>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div key={resultKey} className="space-y-6 calc-results-enter">
            {/* New Monthly Payment */}
            <div className="rounded-2xl p-8 text-center" style={{ background: '#141414', border: '1px solid rgba(201,168,76,0.4)', boxShadow: '0 0 30px rgba(201,168,76,0.06)' }}>
              <p className="text-white/50 text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>New Monthly Payment</p>
              <p className="text-5xl md:text-6xl font-semibold mb-1 font-heading" style={{ color: '#C9A84C' }}>{fmt(animatedNew)}</p>
              <p className="text-white/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>/month</p>
            </div>

            {/* Monthly Savings */}
            <div className="rounded-xl p-6 text-center" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/40 text-xs mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Monthly Savings</p>
              <p className="text-2xl font-semibold font-heading" style={{ color: monthlySavings >= 0 ? '#4ade80' : '#f87171' }}>
                {monthlySavings >= 0 ? '+' : '-'}{fmt(animatedSavings)}
              </p>
            </div>

            {/* Break-Even */}
            <div className="rounded-xl p-6 text-center" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/40 text-xs mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Break-Even Period</p>
              <p className="text-2xl font-semibold text-white font-heading">
                {monthlySavings <= 0
                  ? 'N/A'
                  : breakEvenMonths < 12
                    ? `${breakEvenMonths} months`
                    : `${(breakEvenMonths / 12).toFixed(1)} years`}
              </p>
              {penalty > 0 && monthlySavings > 0 && (
                <p className="text-white/30 text-xs mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {fmt(penalty)} penalty recovered in {breakEvenMonths} months
                </p>
              )}
            </div>

            {/* Interest Comparison */}
            <div className="rounded-2xl p-6" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-5 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>Total Interest Comparison</p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-white/60 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <span>Current</span><span>{fmt(Math.max(curTotalRemaining, 0))}</span>
                  </div>
                  <div className="w-full h-3 rounded-full" style={{ background: '#2a2a2a' }}>
                    <div className="h-3 rounded-full" style={{ width: `${Math.min((Math.max(curTotalRemaining, 0) / maxInterest) * 100, 100)}%`, background: 'rgba(255,255,255,0.3)' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1" style={{ fontFamily: "'DM Sans', sans-serif", color: '#C9A84C' }}>
                    <span>New</span><span>{fmt(Math.max(newTotalInterest, 0))}</span>
                  </div>
                  <div className="w-full h-3 rounded-full" style={{ background: '#2a2a2a' }}>
                    <div className="h-3 rounded-full" style={{ width: `${Math.min((Math.max(newTotalInterest, 0) / maxInterest) * 100, 100)}%`, background: '#C9A84C' }} />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-white/40 text-xs mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Lifetime Savings (after penalty)</p>
                <p className="text-xl font-semibold font-heading" style={{ color: lifetimeSavings >= 0 ? '#4ade80' : '#f87171' }}>
                  {lifetimeSavings >= 0 ? '+' : ''}{fmt(lifetimeSavings)}
                </p>
              </div>
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
