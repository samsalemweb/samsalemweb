import { Resend } from 'resend';
import { z } from 'zod';

const assignmentSchema = z.object({
    email: z.string().trim().email('Invalid email address'),
    fullName: z.string().trim().min(1, 'Full name is required').max(120),
    phone: z.string().trim().min(1, 'Phone is required').max(40),
    propertyAddress: z.string().trim().min(1, 'Property address is required').max(250),
    projectName: z.string().trim().min(1, 'Project name is required').max(150),
    city: z.string().trim().min(1, 'City is required').max(100),
    postalCode: z.string().trim().min(1, 'Postal code is required').max(20),
    bedrooms: z.string().trim().max(20).optional(),
    bathrooms: z.string().trim().max(20).optional(),
    size: z.string().trim().max(80).optional(),
    features: z.string().trim().max(5000).optional(),
});

/** Resend testing sender (no verified domain required). Override with RESEND_FROM_EMAIL after you add a domain. */
const DEFAULT_FROM = 'Sam Salem Website <onboarding@resend.dev>';

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const parsed = assignmentSchema.safeParse(json);
        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;
            return Response.json({ error: 'Validation failed', fieldErrors }, { status: 400 });
        }

        const apiKey = process.env.RESEND_API_KEY;
        const to = process.env.CONTACT_TO_EMAIL;
        if (!apiKey || !to) {
            console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL');
            return Response.json({ error: 'Email is not configured on the server.' }, { status: 503 });
        }

        const {
            email,
            fullName,
            phone,
            propertyAddress,
            projectName,
            city,
            postalCode,
            bedrooms,
            bathrooms,
            size,
            features,
        } = parsed.data;
        const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;
        const resend = new Resend(apiKey);

        const subject = `Website assignment inquiry: ${fullName}`;
        const text = [
            'New pre-sale assignment inquiry',
            '',
            `Full name: ${fullName}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Property address: ${propertyAddress}`,
            `Project name: ${projectName}`,
            `City: ${city}`,
            `Postal code: ${postalCode}`,
            `Bedrooms: ${bedrooms || 'Not provided'}`,
            `Bathrooms: ${bathrooms || 'Not provided'}`,
            `Size: ${size || 'Not provided'}`,
            '',
            'Features:',
            features || 'Not provided',
        ].join('\n');

        const html = `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #1a1a1a;">
  <h2 style="margin: 0 0 16px;">New pre-sale assignment inquiry</h2>
  <table style="border-collapse: collapse;">
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">Full name</td><td>${escapeHtml(fullName)}</td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">Email</td><td><a href="mailto:${escapeAttr(email)}">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">Phone</td><td>${escapeHtml(phone)}</td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">Property address</td><td>${escapeHtml(propertyAddress)}</td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">Project name</td><td>${escapeHtml(projectName)}</td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">City</td><td>${escapeHtml(city)}</td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">Postal code</td><td>${escapeHtml(postalCode)}</td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">Bedrooms</td><td>${escapeHtml(bedrooms || 'Not provided')}</td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">Bathrooms</td><td>${escapeHtml(bathrooms || 'Not provided')}</td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">Size</td><td>${escapeHtml(size || 'Not provided')}</td></tr>
  </table>
  <p style="margin-top: 20px; font-weight: 600;">Features</p>
  <p style="white-space: pre-wrap; margin: 0; padding: 12px; background: #f8f8f6; border-radius: 8px;">${escapeHtml(features || 'Not provided')}</p>
</body>
</html>`;

        const { error } = await resend.emails.send({
            from,
            to: [to],
            replyTo: email,
            subject,
            text,
            html,
        });

        if (error) {
            console.error('Resend error:', error);
            return Response.json(
                { error: resendErrorMessage(error) },
                { status: 502 },
            );
        }

        return Response.json({ success: true });
    } catch (err) {
        console.error('Listing assignment API error:', err);
        return Response.json({ error: 'Invalid request body.' }, { status: 400 });
    }
}

function resendErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
        return error.message;
    }
    return 'Failed to send message. Please try again later.';
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escapeAttr(s: string): string {
    return escapeHtml(s).replace(/'/g, '&#39;');
}
