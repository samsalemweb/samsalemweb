'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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

const amortOptions = [10, 15, 20, 25, 30];
const freqOptions = [
  { label: 'Monthly', key: 'monthly' },
  { label: 'Bi-weekly', key: 'biweekly' },
  { label: 'Weekly', key: 'weekly' },
] as const;

export default function PaymentCalculatorPage() {
  const [homePrice, setHomePrice] = useState(800000);
  const [downPayment, setDownPayment] = useState(160000);
  const [dpMode, setDpMode] = useState<'$' | '%'>('$');
  const [interestRate, setInterestRate] = useState(4.5);
  const [amortization, setAmortization] = useState(25);
  const [frequency, setFrequency] = useState<'monthly' | 'biweekly' | 'weekly'>('monthly');
  const [resultKey, setResultKey] = useState(0);

  const dpPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
  const needsCMHC = dpPercent < 20;

  // CMHC insurance premium
  const cmhcPremium = useMemo(() => {
    if (!needsCMHC) return 0;
    const principal = homePrice - downPayment;
    let rate = 0;
    if (dpPercent >= 15) rate = 0.028;
    else if (dpPercent >= 10) rate = 0.031;
    else rate = 0.04;
    return Math.round(principal * rate);
  }, [homePrice, downPayment, dpPercent, needsCMHC]);

  const principal = homePrice - downPayment + cmhcPremium;

  const { monthlyPayment, totalInterest, totalPaid } = useMemo(() => {
    if (principal <= 0) return { monthlyPayment: 0, totalInterest: 0, totalPaid: 0 };
    const r = interestRate / 100 / 12;
    const n = amortization * 12;
    if (r === 0) {
      const mp = principal / n;
      return { monthlyPayment: Math.round(mp), totalInterest: 0, totalPaid: Math.round(principal) };
    }
    const mp = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const tp = mp * n;
    return { monthlyPayment: Math.round(mp), totalInterest: Math.round(tp - principal), totalPaid: Math.round(tp) };
  }, [principal, interestRate, amortization]);

  const displayPayment = useMemo(() => {
    if (frequency === 'biweekly') return Math.round((monthlyPayment * 12) / 26);
    if (frequency === 'weekly') return Math.round((monthlyPayment * 12) / 52);
    return monthlyPayment;
  }, [monthlyPayment, frequency]);

  const animatedPayment = useAnimatedNumber(displayPayment);
  const animatedInterest = useAnimatedNumber(totalInterest);
  const animatedTotal = useAnimatedNumber(totalPaid);

  // Trigger results animation on change
  useEffect(() => { setResultKey(k => k + 1); }, [displayPayment]);

  const pieData = [
    { name: 'Principal', value: principal > 0 ? principal : 0 },
    { name: 'Interest', value: totalInterest > 0 ? totalInterest : 0 },
  ];

  const handleDpSlider = (val: number) => {
    if (dpMode === '%') {
      setDownPayment(Math.round(homePrice * (val / 100)));
    } else {
      setDownPayment(val);
    }
  };

  const freqLabel = frequency === 'biweekly' ? '/bi-weekly' : frequency === 'weekly' ? '/week' : '/month';

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Header */}
      <div className="pt-32 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/tools" className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6 hover:opacity-80 transition-opacity" style={{ color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
            All Calculators
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white font-heading">
            Payment Calculator
          </h1>
          <p className="text-white/50 mt-2 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Estimate your mortgage payment across different frequencies and terms.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ===== INPUTS ===== */}
          <div className="rounded-2xl p-6 md:p-8 space-y-7" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
            {/* Home Price */}
            <div>
              <label className="flex justify-between text-sm font-medium text-white/80 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span>Home Price</span>
                <span style={{ color: '#C9A84C' }}>{fmt(homePrice)}</span>
              </label>
              <input type="range" min={100000} max={5000000} step={10000} value={homePrice} onChange={e => setHomePrice(Number(e.target.value))} className="gold-slider" />
            </div>

            {/* Down Payment */}
            <div>
              <label className="flex justify-between items-center text-sm font-medium text-white/80 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span>Down Payment ({dpPercent.toFixed(1)}%)</span>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#C9A84C' }}>{dpMode === '%' ? `${dpPercent.toFixed(1)}%` : fmt(downPayment)}</span>
                  <div className="flex rounded-full overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
                    {(['$', '%'] as const).map(m => (
                      <button key={m} onClick={() => setDpMode(m)} className="px-3 py-1 text-xs font-semibold transition-all" style={{
                        background: dpMode === m ? '#C9A84C' : 'transparent',
                        color: dpMode === m ? '#0A0A0A' : '#C9A84C',
                        fontFamily: "'DM Sans', sans-serif"
                      }}>{m}</button>
                    ))}
                  </div>
                </div>
              </label>
              <input
                type="range"
                min={dpMode === '%' ? 5 : Math.round(homePrice * 0.05)}
                max={dpMode === '%' ? 100 : homePrice}
                step={dpMode === '%' ? 0.5 : 5000}
                value={dpMode === '%' ? dpPercent : downPayment}
                onChange={e => handleDpSlider(Number(e.target.value))}
                className="gold-slider"
              />
              {needsCMHC && (
                <div className="mt-3 px-4 py-3 rounded-xl text-xs leading-relaxed" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}>
                  ⚠️ CMHC Insurance Required — Premium: {fmt(cmhcPremium)} (added to mortgage)
                </div>
              )}
            </div>

            {/* Interest Rate */}
            <div>
              <label className="flex justify-between text-sm font-medium text-white/80 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span>Interest Rate</span>
                <span style={{ color: '#C9A84C' }}>{interestRate.toFixed(2)}%</span>
              </label>
              <input type="range" min={1} max={15} step={0.05} value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="gold-slider" />
            </div>

            {/* Amortization */}
            <div>
              <label className="text-sm font-medium text-white/80 mb-3 block" style={{ fontFamily: "'DM Sans', sans-serif" }}>Amortization</label>
              <div className="flex gap-2">
                {amortOptions.map(y => (
                  <button key={y} onClick={() => setAmortization(y)} className="flex-1 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all" style={{
                    border: `1px solid ${amortization === y ? '#C9A84C' : 'rgba(255,255,255,0.1)'}`,
                    background: amortization === y ? 'rgba(201,168,76,0.1)' : 'transparent',
                    color: amortization === y ? '#C9A84C' : 'rgba(255,255,255,0.5)',
                    fontFamily: "'DM Sans', sans-serif"
                  }}>{y} yr</button>
                ))}
              </div>
            </div>

            {/* Payment Frequency */}
            <div>
              <label className="text-sm font-medium text-white/80 mb-3 block" style={{ fontFamily: "'DM Sans', sans-serif" }}>Payment Frequency</label>
              <div className="flex gap-2">
                {freqOptions.map(f => (
                  <button key={f.key} onClick={() => setFrequency(f.key)} className="flex-1 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all" style={{
                    border: `1px solid ${frequency === f.key ? '#C9A84C' : 'rgba(255,255,255,0.1)'}`,
                    background: frequency === f.key ? 'rgba(201,168,76,0.1)' : 'transparent',
                    color: frequency === f.key ? '#C9A84C' : 'rgba(255,255,255,0.5)',
                    fontFamily: "'DM Sans', sans-serif"
                  }}>{f.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div key={resultKey} className="space-y-6 calc-results-enter">
            {/* Main Result */}
            <div className="rounded-2xl p-8 text-center" style={{ background: '#141414', border: '1px solid rgba(201,168,76,0.4)', boxShadow: '0 0 30px rgba(201,168,76,0.06)' }}>
              <p className="text-white/50 text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Estimated Payment</p>
              <p className="text-5xl md:text-6xl font-semibold mb-1 font-heading" style={{ color: '#C9A84C' }}>
                {fmt(animatedPayment)}
              </p>
              <p className="text-white/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{freqLabel}</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-5 text-center" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-white/40 text-xs mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Total Interest</p>
                <p className="text-lg font-semibold text-white font-heading">{fmt(animatedInterest)}</p>
              </div>
              <div className="rounded-xl p-5 text-center" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-white/40 text-xs mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Total Paid</p>
                <p className="text-lg font-semibold text-white font-heading">{fmt(animatedTotal)}</p>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="rounded-2xl p-6" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>Principal vs Interest</p>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" strokeWidth={0}>
                    <Cell fill="#C9A84C" />
                    <Cell fill="#2a2a2a" />
                  </Pie>
                  <Tooltip formatter={(val) => fmt(Number(val))} contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2 text-xs text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: '#C9A84C' }} /> Principal
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: '#2a2a2a' }} /> Interest
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-white/30 text-xs text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              For estimation purposes only. Consult a mortgage professional for advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
