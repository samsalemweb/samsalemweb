import { Resend } from 'resend';
import { z } from 'zod';

const contactSchema = z.object({
    firstName: z.string().trim().min(1, 'First name is required').max(100),
    lastName: z.string().trim().min(1, 'Last name is required').max(100),
    email: z.string().trim().email('Invalid email address'),
    phone: z.string().trim().min(1, 'Phone is required').max(40),
    message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
});

/** Resend testing sender (no verified domain required). Override with RESEND_FROM_EMAIL after you add a domain. */
const DEFAULT_FROM = 'Sam Salem Website <onboarding@resend.dev>';

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const parsed = contactSchema.safeParse(json);
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

        const { firstName, lastName, email, phone, message } = parsed.data;
        const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;

        const resend = new Resend(apiKey);
        const subject = `Website contact: ${firstName} ${lastName}`;
        const text = [
            `Name: ${firstName} ${lastName}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            '',
            message,
        ].join('\n');

        const html = `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #1a1a1a;">
  <h2 style="margin: 0 0 16px;">New contact form submission</h2>
  <table style="border-collapse: collapse;">
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">Name</td><td>${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">Email</td><td><a href="mailto:${escapeAttr(email)}">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding: 6px 16px 6px 0; font-weight: 600;">Phone</td><td>${escapeHtml(phone)}</td></tr>
  </table>
  <p style="margin-top: 20px; font-weight: 600;">Message</p>
  <p style="white-space: pre-wrap; margin: 0; padding: 12px; background: #f8f8f6; border-radius: 8px;">${escapeHtml(message)}</p>
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
        console.error('Contact API error:', err);
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
