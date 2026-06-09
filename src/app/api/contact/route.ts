import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactConfirmationEmail } from '@/lib/emails'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
const TO   = process.env.RESEND_TO_EMAIL   ?? 'emithran@emuski.com'

function row(label: string, value?: string) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:8px 12px;font-size:12px;font-weight:600;color:#6b7280;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f3f4f6;">${label}</td>
      <td style="padding:8px 12px;font-size:13px;color:#111827;border-bottom:1px solid #f3f4f6;">${value}</td>
    </tr>`
}

function section(title: string, rows: string) {
  return `
    <div style="margin-bottom:24px;">
      <div style="background:#f0fdf4;border-left:3px solid #0d9488;padding:8px 14px;margin-bottom:8px;">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#0d9488;">${title}</span>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        ${rows}
      </table>
    </div>`
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
    const { email, country, firstName, lastName, phone, company, role, industry, message, cfToken, source, cta } = body

    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''
    if (process.env.TURNSTILE_SECRET_KEY) {
      const humanVerified = await verifyTurnstile(cfToken ?? '', ip)
      if (!humanVerified) {
        return NextResponse.json({ error: 'Human verification failed. Please try again.' }, { status: 403 })
      }
    }

    if (!firstName || !lastName || !email || !company || !role || !industry) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const sourceLabel = source ? source : 'emithran.com'
    const ctaLabel   = cta    ? cta    : '—'

    const html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;padding:32px 16px;background:#fff;color:#111827;">
        <div style="margin-bottom:8px;">
          <div style="display:inline-block;background:#0f1b2d;border-radius:8px;padding:7px 18px;margin-bottom:18px;">
            <span style="color:#2dd4bf;font-size:13px;font-weight:800;letter-spacing:0.14em;">EMITHRAN</span>
          </div>
          <h1 style="margin:0 0 4px;font-size:22px;font-weight:700;color:#0f1b2d;">New Contact Request</h1>
          <p style="margin:0;font-size:13px;color:#6b7280;">
            Source: <strong style="color:#0d9488;">${sourceLabel}</strong>
            ${cta ? ` &nbsp;·&nbsp; CTA: <strong style="color:#0d9488;">${ctaLabel}</strong>` : ''}
          </p>
        </div>

        <div style="height:3px;background:linear-gradient(90deg,#0d9488,#2dd4bf);border-radius:2px;margin:20px 0 28px;"></div>

        ${section('Contact', `
          ${row('Name',    `${firstName} ${lastName}`)}
          ${row('Email',   email)}
          ${row('Phone',   phone)}
          ${row('Country', country)}
        `)}

        ${section('Company', `
          ${row('Company',  company)}
          ${row('Role',     role)}
          ${row('Industry', industry)}
        `)}

        ${message ? section('Message', `
          ${row('Message', message)}
        `) : ''}

        <p style="font-size:11px;color:#9ca3af;border-top:1px solid #f3f4f6;padding-top:16px;margin-top:32px;">
          Emithran Manufacturing Intelligence · emithran.com
        </p>
      </body>
      </html>`

    const [adminResult] = await Promise.allSettled([
      resend.emails.send({
        from:    `Emithran <${FROM}>`,
        to:      TO,
        replyTo: email,
        subject: `Contact request — ${firstName} ${lastName} (${company})${source ? ` [${source}]` : ''}`,
        html,
      }),
      resend.emails.send({
        from:    `Emithran <${FROM}>`,
        to:      email,
        subject: `We've received your message, ${firstName}`,
        html:    contactConfirmationEmail(firstName, company),
      }),
    ])

    if (adminResult.status === 'rejected') throw adminResult.reason

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
