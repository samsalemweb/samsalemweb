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

// BC PTT 2025 bracket rates
function calcBCPTT(price: number): number {
  if (price <= 200_000) return price * 0.01;
  if (price <= 2_000_000) return 2_000 + (price - 200_000) * 0.02;
  if (price <= 3_000_000) return 38_000 + (price - 2_000_000) * 0.03;
  return 68_000 + (price - 3_000_000) * 0.05;
}

// FTHB Rebate (updated April 1, 2024)
function calcFTHBRebate(price: number): number {
  if (price > 860_000) return 0;
  if (price <= 835_000) return calcBCPTT(Math.min(price, 500_000)); // max $8,000
  // Partial phase-out $835K–$860K
  const fullRebate = calcBCPTT(500_000); // = $8,000
  return Math.round(fullRebate * (860_000 - price) / (860_000 - 835_000));
}

const brackets = [
  { range: 'First $200,000', rate: '1%', threshold: 200_000 },
  { range: '$200,001 – $2,000,000', rate: '2%', threshold: 2_000_000 },
  { range: '$2,000,001 – $3,000,000', rate: '3%', threshold: 3_000_000 },
  { range: 'Over $3,000,000', rate: '5%', threshold: Infinity },
];

export default function LandTransferTaxPage() {
  const [price, setPrice] = useState(750000);
  const [isFTHB, setIsFTHB] = useState(false);

  const basePTT = useMemo(() => calcBCPTT(price), [price]);
  const rebate = useMemo(() => isFTHB ? calcFTHBRebate(price) : 0, [price, isFTHB]);
  const totalPTT = Math.max(basePTT - rebate, 0);
  const effectiveRate = price > 0 ? ((totalPTT / price) * 100).toFixed(3) : '0.000';

  const animatedTotal = useAnimatedNumber(totalPTT);

  // Bracket breakdown
  const breakdownRows = useMemo(() => {
    const rows: { bracket: string; taxable: number; rate: number; tax: number }[] = [];
    let remaining = price;

    if (remaining > 0) {
      const taxable = Math.min(remaining, 200_000);
      rows.push({ bracket: 'First $200,000', taxable, rate: 1, tax: taxable * 0.01 });
      remaining -= taxable;
    }
    if (remaining > 0) {
      const taxable = Math.min(remaining, 1_800_000);
      rows.push({ bracket: '$200,001 – $2,000,000', taxable, rate: 2, tax: taxable * 0.02 });
      remaining -= taxable;
    }
    if (remaining > 0) {
      const taxable = Math.min(remaining, 1_000_000);
      rows.push({ bracket: '$2,000,001 – $3,000,000', taxable, rate: 3, tax: taxable * 0.03 });
      remaining -= taxable;
    }
    if (remaining > 0) {
      rows.push({ bracket: 'Over $3,000,000', taxable: remaining, rate: 5, tax: remaining * 0.05 });
    }

    return rows;
  }, [price]);

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      <div className="pt-32 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/tools" className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6 hover:opacity-80 transition-opacity" style={{ color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
            All Calculators
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white font-heading">Property Transfer Tax</h1>
          <p className="text-white/50 mt-2 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Calculate BC Property Transfer Tax with first-time home buyer rebates.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ===== INPUTS ===== */}
          <div className="space-y-6">
            <div className="rounded-2xl p-6 md:p-8 space-y-6" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              {/* Purchase Price */}
              <div>
                <label className="flex justify-between text-sm font-medium text-white/80 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span>Purchase Price</span>
                  <span style={{ color: '#C9A84C' }}>{fmt(price)}</span>
                </label>
                <input type="range" min={100000} max={5000000} step={10000} value={price} onChange={e => setPrice(Number(e.target.value))} className="gold-slider" />
                <div className="mt-3">
                  <input
                    type="number"
                    value={price}
                    onChange={e => {
                      const val = Number(e.target.value);
                      if (!isNaN(val) && val >= 0) setPrice(Math.min(val, 10000000));
                    }}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white gold-input"
                    style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', fontFamily: "'DM Sans', sans-serif" }}
                    placeholder="Enter exact price"
                  />
                </div>
              </div>

              {/* FTHB Toggle Card */}
              <div
                onClick={() => setIsFTHB(!isFTHB)}
                className="rounded-xl p-5 cursor-pointer transition-all duration-300 select-none"
                style={{
                  background: isFTHB ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isFTHB ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-all" style={{
                    border: `2px solid ${isFTHB ? '#C9A84C' : 'rgba(255,255,255,0.2)'}`,
                    background: isFTHB ? '#C9A84C' : 'transparent',
                  }}>
                    {isFTHB && (
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>First-Time Home Buyer</p>
                    <p className="text-xs text-white/40 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Eligible for BC PTT exemption (up to $8,000 rebate)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rate Structure Reference */}
            <div className="rounded-2xl p-6" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>BC PTT Rate Structure</p>
              <table className="w-full text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <thead>
                  <tr className="text-white/40 text-xs">
                    <th className="text-left pb-3 font-medium">Fair Market Value</th>
                    <th className="text-right pb-3 font-medium">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {brackets.map(b => (
                    <tr key={b.range} className="text-white/70" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <td className="py-2.5">{b.range}</td>
                      <td className="py-2.5 text-right" style={{ color: '#C9A84C' }}>{b.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="space-y-6 calc-results-enter">
            {/* Total PTT */}
            <div className="rounded-2xl p-8 text-center" style={{ background: '#141414', border: '1px solid rgba(201,168,76,0.4)', boxShadow: '0 0 30px rgba(201,168,76,0.06)' }}>
              <p className="text-white/50 text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Total PTT Payable</p>
              <p className="text-5xl md:text-6xl font-semibold mb-2 font-heading" style={{ color: '#C9A84C' }}>{fmt(animatedTotal)}</p>
              <p className="text-white/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Effective rate: {effectiveRate}%</p>
            </div>

            {/* Breakdown */}
            <div className="rounded-2xl p-6" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Tax Breakdown</p>
              <table className="w-full text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <thead>
                  <tr className="text-white/40 text-xs">
                    <th className="text-left pb-3 font-medium">Bracket</th>
                    <th className="text-right pb-3 font-medium">Taxable</th>
                    <th className="text-right pb-3 font-medium">Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdownRows.map(r => (
                    <tr key={r.bracket} className="text-white/70" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <td className="py-2.5">{r.bracket}</td>
                      <td className="py-2.5 text-right">{fmt(r.taxable)}</td>
                      <td className="py-2.5 text-right" style={{ color: '#C9A84C' }}>{fmt(Math.round(r.tax))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Summary rows */}
              <div className="mt-4 pt-4 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex justify-between text-sm text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span>Base PTT</span><span>{fmt(Math.round(basePTT))}</span>
                </div>
                {isFTHB && (
                  <div className="flex justify-between text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: '#4ade80' }}>
                    <span>FTHB Rebate</span><span>-{fmt(rebate)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', fontFamily: "'DM Sans', sans-serif", color: '#C9A84C' }}>
                  <span>Total Payable</span><span>{fmt(totalPTT)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-xl p-5 space-y-2" style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <p className="text-xs font-semibold text-white/60 tracking-widest uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Important Notes</p>
              {[
                'Foreign buyers pay an additional 20% PTT on residential property in specified areas.',
                'GST (5%) applies to newly constructed homes only.',
                'Newly built home exemption: full exemption up to $1.1M, partial $1.1M–$1.15M.',
                'FTHB rebate: full exemption up to $835K, partial phase-out $835K–$860K.',
              ].map((note, i) => (
                <p key={i} className="text-white/40 text-xs leading-relaxed flex gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ color: '#C9A84C' }}>•</span> {note}
                </p>
              ))}
            </div>

            <p className="text-white/30 text-xs text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              For estimation purposes only. Consult a notary or lawyer for advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
