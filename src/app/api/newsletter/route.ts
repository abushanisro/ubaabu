import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { newsletterConfirmationEmail } from '@/lib/emails'

const resend = new Resend(process.env.RESEND_API_KEY || 're_build_placeholder')

const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
const TO   = process.env.RESEND_TO_EMAIL   ?? 'contact@emithran.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, source, honeypot } = body

    // Honeypot: real users never fill this hidden field.
    if (honeypot) {
      return NextResponse.json({ ok: true })
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const [adminResult] = await Promise.allSettled([
      resend.emails.send({
        from:    `Emithran <${FROM}>`,
        to:      TO,
        replyTo: email,
        subject: `Newsletter signup - ${email}`,
        html: `<p style="font-family:-apple-system,sans-serif;font-size:14px;color:#111827;">New newsletter subscriber: <strong>${email}</strong></p><p style="font-family:-apple-system,sans-serif;font-size:12px;color:#6b7280;">Source: ${source ?? 'footer'}</p>`,
      }),
      resend.emails.send({
        from:    `Emithran <${FROM}>`,
        to:      email,
        subject: `You're subscribed to Emithran updates`,
        html:    newsletterConfirmationEmail(email),
      }),
    ])

    if (adminResult.status === 'rejected') throw adminResult.reason

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[newsletter]', err)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
