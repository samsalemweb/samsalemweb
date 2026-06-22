'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const schema = z.object({
    firstName: z.string().trim().min(1, 'First name is required').max(100),
    lastName: z.string().trim().min(1, 'Last name is required').max(100),
    email: z.string().trim().email('Enter a valid email'),
    phone: z.string().trim().min(1, 'Phone is required').max(40),
    message: z.string().trim().min(10, 'Please enter at least 10 characters').max(5000),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [succeeded, setSucceeded] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        setSubmitError(null);
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const body = (await res.json()) as { success?: boolean; error?: string };

        if (!res.ok) {
            setSubmitError(
                body.error ||
                    (res.status === 503
                        ? 'Email is not configured on the server. Please call or email Sam directly.'
                        : 'Something went wrong. Please try again.'),
            );
            return;
        }
if (typeof window !== "undefined") {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    form_name: "contact_form",
  });
}
        reset();
        setSucceeded(true);
    });

    const inputClass =
        'w-full px-4 py-3 border rounded-xl font-body text-sm focus:outline-none focus:border-accent/50 transition-colors';
    const errorClass = 'border-red-300 focus:border-red-400';
    const normalClass = 'border-gray-200';

    if (succeeded) {
        return (
            <div className="text-center py-8 px-4">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/15 flex items-center justify-center">
                    <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Message sent</h3>
                <p className="text-muted font-body text-sm mb-6">Thank you. Sam will get back to you as soon as possible.</p>
                <button
                    type="button"
                    onClick={() => setSucceeded(false)}
                    className="text-accent font-body text-sm font-semibold hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {submitError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 font-body">{submitError}</div>
            )}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        placeholder="First name"
                        className={`${inputClass} ${errors.firstName ? errorClass : normalClass}`}
                        {...register('firstName')}
                        disabled={isSubmitting}
                        autoComplete="given-name"
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-red-600 font-body">{errors.firstName.message}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Last name"
                        className={`${inputClass} ${errors.lastName ? errorClass : normalClass}`}
                        {...register('lastName')}
                        disabled={isSubmitting}
                        autoComplete="family-name"
                    />
                    {errors.lastName && <p className="mt-1 text-xs text-red-600 font-body">{errors.lastName.message}</p>}
                </div>
            </div>
            <div>
                <input
                    type="email"
                    placeholder="Email address"
                    className={`${inputClass} ${errors.email ? errorClass : normalClass}`}
                    {...register('email')}
                    disabled={isSubmitting}
                    autoComplete="email"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600 font-body">{errors.email.message}</p>}
            </div>
            <div>
                <input
                    type="tel"
                    placeholder="Phone number"
                    className={`${inputClass} ${errors.phone ? errorClass : normalClass}`}
                    {...register('phone')}
                    disabled={isSubmitting}
                    autoComplete="tel"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600 font-body">{errors.phone.message}</p>}
            </div>
            <div>
                <textarea
                    placeholder="Your message"
                    rows={4}
                    className={`${inputClass} resize-none ${errors.message ? errorClass : normalClass}`}
                    {...register('message')}
                    disabled={isSubmitting}
                />
                {errors.message && <p className="mt-1 text-xs text-red-600 font-body">{errors.message.message}</p>}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-accent text-white font-body font-semibold rounded-full hover:bg-accent-dark transition-all duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Sending…' : 'Send Message'}
            </button>
        </form>
    );
}
