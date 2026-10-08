import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { newsletterConfirmationEmail } from '@/lib/emails'

const resend = new Resend(process.env.RESEND_API_KEY || 're_build_placeholder')

const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
const TO   = process.env.RESEND_TO_EMAIL   ?? 'contact@emithran.com'

function row(label: string, value?: string) {
  if (!value) return ''
  return `<p style="margin:0 0 4px;font-family:-apple-system,sans-serif;font-size:13px;color:#111827;"><strong style="color:#6b7280;">${label}:</strong> ${value}</p>`
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
  })
  const data = await res.json()
  return data.success === true
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      email, firstName, lastName, jobTitle, organization, country,
      newsletters, topics, cfToken, source, honeypot,
    } = body

    // Honeypot: real users never fill this hidden field.
    if (honeypot) {
      return NextResponse.json({ ok: true })
    }

    // The footer's quick-capture form only stashes the email and hands off to
    // the full /subscribe page, which is the only place that collects cfToken -
    // require it whenever it's present so that flow stays bot-protected.
    if (cfToken !== undefined) {
      const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''
      const humanVerified = await verifyTurnstile(cfToken ?? '', ip)
      if (!humanVerified) {
        return NextResponse.json({ error: 'Human verification failed. Please try again.' }, { status: 403 })
      }
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const name = [firstName, lastName].filter(Boolean).join(' ')
    const newsletterList: string[] = Array.isArray(newsletters) ? newsletters : []
    const topicList: string[] = Array.isArray(topics) ? topics : []

    const [adminResult] = await Promise.allSettled([
      resend.emails.send({
        from:    `Emithran <${FROM}>`,
        to:      TO,
        replyTo: email,
        subject: `Newsletter signup - ${name || email}`,
        html: `
          <p style="font-family:-apple-system,sans-serif;font-size:14px;color:#111827;">New newsletter subscriber</p>
          ${row('Email', email)}
          ${row('Name', name)}
          ${row('Job title', jobTitle)}
          ${row('Organization', organization)}
          ${row('Country', country)}
          ${row('Updates', newsletterList.join(', '))}
          ${row('Topics', topicList.join(', '))}
          <p style="margin-top:8px;font-family:-apple-system,sans-serif;font-size:12px;color:#6b7280;">Source: ${source ?? 'footer'}</p>
        `,
      }),
      resend.emails.send({
        from:    `Emithran <${FROM}>`,
        to:      email,
        subject: `Thank you for subscribing to Emithran`,
        html:    newsletterConfirmationEmail(email, firstName),
      }),
    ])

    if (adminResult.status === 'rejected') throw adminResult.reason

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[newsletter]', err)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
