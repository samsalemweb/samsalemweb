'use client';

import { FormEvent, useState } from 'react';

const bedroomOptions = ['0', '1', '2', '3', '4', '5', '5+'];
const bathroomOptions = ['0', '1', '2', '3', '4', '5', '5+'];

export default function AssignmentPage() {
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError('');
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const payload = {
            email: String(formData.get('email') ?? ''),
            fullName: String(formData.get('fullName') ?? ''),
            phone: String(formData.get('phone') ?? ''),
            propertyAddress: String(formData.get('propertyAddress') ?? ''),
            projectName: String(formData.get('projectName') ?? ''),
            city: String(formData.get('city') ?? ''),
            postalCode: String(formData.get('postalCode') ?? ''),
            bedrooms: String(formData.get('bedrooms') ?? ''),
            bathrooms: String(formData.get('bathrooms') ?? ''),
            size: String(formData.get('size') ?? ''),
            features: String(formData.get('features') ?? ''),
        };

        try {
            const response = await fetch('/api/listing-assignment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data: { error?: string } = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(
                    data.error ||
                        (response.status === 503
                            ? 'Email is not configured on the server. Please contact Sam directly.'
                            : 'Failed to submit form. Please try again.'),
                );
            }

            setIsSubmitted(true);
            event.currentTarget.reset();
            setBedrooms('');
            setBathrooms('');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to submit form. Please try again.';
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-[#C9A84C] flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-heading text-[#C9A84C] mb-3">
                        Thank you!
                    </h2>
                    <p className="text-white/70 font-body text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        We&apos;ll be in touch shortly.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
            {/* Hero Section */}
            <div className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
                <div className="absolute inset-0" style={{ background: '#0A0A0A' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-6 tracking-tight font-heading">
                            Need to{' '}
                            <span className="text-[#C9A84C]">Assign</span>{' '}
                            Your Pre-Sale?
                        </h1>
                        <p
                            className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                            If you purchased a pre-sale property and can no longer close on it or simply don&apos;t wish to,
                            we can help. Fill out the form below and we&apos;ll showcase your listing on our website to
                            help you find a buyer.
                        </p>
                    </div>
                </div>
            </div>

            {/* Gold Divider */}
            <div className="max-w-xl mx-auto px-4">
                <div
                    className="h-[2px]"
                    style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
                />
            </div>

            {/* Form Section */}
            <div className="max-w-[680px] mx-auto px-4 sm:px-6 py-12 md:py-16">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden fields for button-group values */}
                    <input type="hidden" name="bedrooms" value={bedrooms} />
                    <input type="hidden" name="bathrooms" value={bathrooms} />

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-2"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                            Email <span className="text-[#C9A84C]">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            className="gold-input w-full px-4 py-3 rounded-lg text-white text-sm transition-all duration-200"
                            style={{
                                background: '#111',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontFamily: 'DM Sans, sans-serif',
                            }}
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Full Name */}
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-2"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                            Full Name <span className="text-[#C9A84C]">*</span>
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            required
                            className="gold-input w-full px-4 py-3 rounded-lg text-white text-sm transition-all duration-200"
                            style={{
                                background: '#111',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontFamily: 'DM Sans, sans-serif',
                            }}
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-2"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                            Phone Number <span className="text-[#C9A84C]">*</span>
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            required
                            className="gold-input w-full px-4 py-3 rounded-lg text-white text-sm transition-all duration-200"
                            style={{
                                background: '#111',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontFamily: 'DM Sans, sans-serif',
                            }}
                            placeholder="(778) 123-4567"
                        />
                    </div>

                    {/* Property Address */}
                    <div>
                        <label
                            htmlFor="propertyAddress"
                            className="block text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-2"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                            Property Address <span className="text-[#C9A84C]">*</span>
                        </label>
                        <input
                            id="propertyAddress"
                            type="text"
                            name="propertyAddress"
                            required
                            className="gold-input w-full px-4 py-3 rounded-lg text-white text-sm transition-all duration-200"
                            style={{
                                background: '#111',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontFamily: 'DM Sans, sans-serif',
                            }}
                            placeholder="123 Main Street, Vancouver, BC"
                        />
                    </div>

                    {/* Project Name */}
                    <div>
                        <label
                            htmlFor="projectName"
                            className="block text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-2"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                            Project Name <span className="text-[#C9A84C]">*</span>
                        </label>
                        <input
                            id="projectName"
                            type="text"
                            name="projectName"
                            required
                            className="gold-input w-full px-4 py-3 rounded-lg text-white text-sm transition-all duration-200"
                            style={{
                                background: '#111',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontFamily: 'DM Sans, sans-serif',
                            }}
                            placeholder="e.g. Culmena, The Butterfly"
                        />
                    </div>

                    {/* City + Postal Code — side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="city"
                                className="block text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-2"
                                style={{ fontFamily: 'DM Sans, sans-serif' }}
                            >
                                City <span className="text-[#C9A84C]">*</span>
                            </label>
                            <input
                                id="city"
                                type="text"
                                name="city"
                                required
                                className="gold-input w-full px-4 py-3 rounded-lg text-white text-sm transition-all duration-200"
                                style={{
                                    background: '#111',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    fontFamily: 'DM Sans, sans-serif',
                                }}
                                placeholder="Vancouver"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="postalCode"
                                className="block text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-2"
                                style={{ fontFamily: 'DM Sans, sans-serif' }}
                            >
                                Postal / Zip Code <span className="text-[#C9A84C]">*</span>
                            </label>
                            <input
                                id="postalCode"
                                type="text"
                                name="postalCode"
                                required
                                className="gold-input w-full px-4 py-3 rounded-lg text-white text-sm transition-all duration-200"
                                style={{
                                    background: '#111',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    fontFamily: 'DM Sans, sans-serif',
                                }}
                                placeholder="V6B 1A1"
                            />
                        </div>
                    </div>

                    {/* Bedrooms — button group */}
                    <div>
                        <label
                            className="block text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-3"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                            Bedrooms
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {bedroomOptions.map((opt) => (
                                <button
                                    key={`bed-${opt}`}
                                    type="button"
                                    onClick={() => setBedrooms(opt)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={{
                                        fontFamily: 'DM Sans, sans-serif',
                                        background: bedrooms === opt ? 'rgba(201, 168, 76, 0.15)' : 'transparent',
                                        border: bedrooms === opt ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.15)',
                                        color: bedrooms === opt ? '#C9A84C' : 'rgba(255,255,255,0.5)',
                                        boxShadow: bedrooms === opt ? '0 0 12px rgba(201, 168, 76, 0.15)' : 'none',
                                    }}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bathrooms — button group */}
                    <div>
                        <label
                            className="block text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-3"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                            Bathrooms
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {bathroomOptions.map((opt) => (
                                <button
                                    key={`bath-${opt}`}
                                    type="button"
                                    onClick={() => setBathrooms(opt)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={{
                                        fontFamily: 'DM Sans, sans-serif',
                                        background: bathrooms === opt ? 'rgba(201, 168, 76, 0.15)' : 'transparent',
                                        border: bathrooms === opt ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.15)',
                                        color: bathrooms === opt ? '#C9A84C' : 'rgba(255,255,255,0.5)',
                                        boxShadow: bathrooms === opt ? '0 0 12px rgba(201, 168, 76, 0.15)' : 'none',
                                    }}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size (sq ft) */}
                    <div>
                        <label
                            htmlFor="size"
                            className="block text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-2"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                            Size (sq ft)
                        </label>
                        <input
                            id="size"
                            type="text"
                            name="size"
                            className="gold-input w-full px-4 py-3 rounded-lg text-white text-sm transition-all duration-200"
                            style={{
                                background: '#111',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontFamily: 'DM Sans, sans-serif',
                            }}
                            placeholder="e.g. 750 sq ft"
                        />
                    </div>

                    {/* Features — textarea */}
                    <div>
                        <label
                            htmlFor="features"
                            className="block text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-2"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                            Features
                        </label>
                        <textarea
                            id="features"
                            name="features"
                            rows={4}
                            className="gold-input w-full px-4 py-3 rounded-lg text-white text-sm transition-all duration-200 resize-none"
                            style={{
                                background: '#111',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontFamily: 'DM Sans, sans-serif',
                            }}
                            placeholder="e.g. Parking, storage locker, corner unit, ocean view..."
                        />
                    </div>

                    {submitError && (
                        <p
                            className="text-sm"
                            style={{ color: '#fca5a5', fontFamily: 'DM Sans, sans-serif' }}
                        >
                            {submitError}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-full text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed font-heading"
                        style={{
                            background: isSubmitting
                                ? 'rgba(201, 168, 76, 0.3)'
                                : 'linear-gradient(135deg, #C9A84C 0%, #B89A3E 50%, #8B6914 100%)',
                            color: isSubmitting ? '#C9A84C' : '#000',
                            boxShadow: isSubmitting
                                ? 'none'
                                : '0 4px 20px rgba(201, 168, 76, 0.3)',
                        }}
                    >
                        {isSubmitting && (
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        )}
                        Submit Assignment
                    </button>

                    {/* Disclaimer */}
                    <p
                        className="text-[11px] leading-relaxed mt-4"
                        style={{
                            color: 'rgba(255,255,255,0.3)',
                            fontFamily: 'DM Sans, sans-serif',
                        }}
                    >
                        Please note that you must obtain your developer&apos;s consent and permission for the assignment
                        of your pre-sale property. Sam Salem Personal Real Estate Corporation may not have an agency
                        relationship with either the assignor or the assignee. sam-salem.com is not responsible for any
                        financial, tax, or legal aspects of the assignment process. We strongly recommend seeking advice
                        from an accountant and legal professional to ensure all matters are properly addressed.
                    </p>
                </form>
            </div>
        </div>
    );
}
