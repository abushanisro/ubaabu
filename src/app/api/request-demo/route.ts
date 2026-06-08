import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { demoConfirmationEmail } from '@/lib/emails'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM      = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
const NOTIFY_TO = process.env.RESEND_TO_EMAIL   ?? 'emithran@emuski.com'

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

function adminEmail(data: {
  name: string; email: string; company: string; role: string;
  country: string; teamSize: string; date: string; time: string; message: string;
}) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;padding:32px 16px;background:#fff;color:#111827;">
  <div style="margin-bottom:32px;">
    <div style="display:inline-block;background:linear-gradient(135deg,#0d9488,#2dd4bf);padding:10px 20px;border-radius:99px;">
      <span style="color:white;font-size:13px;font-weight:700;letter-spacing:0.05em;">EMITHRAN</span>
    </div>
    <h1 style="margin:20px 0 4px;font-size:22px;font-weight:700;color:#0f1b2d;">New Demo Request</h1>
    <p style="margin:0;font-size:13px;color:#6b7280;">Submitted via emithran.com/request-demo</p>
  </div>

  ${section('Contact', `
    ${row('Name',      data.name)}
    ${row('Email',     data.email)}
    ${row('Company',   data.company)}
    ${row('Role',      data.role)}
    ${row('Country',   data.country || '—')}
    ${row('Team Size', data.teamSize || '—')}
  `)}

  ${section('Scheduled Slot', `
    ${row('Date', data.date)}
    ${row('Time', data.time ? data.time + ' IST' : '')}
  `)}

  ${data.message ? section('What they want to solve', `
    ${row('Message', data.message)}
  `) : ''}

  <p style="font-size:11px;color:#9ca3af;border-top:1px solid #f3f4f6;padding-top:16px;margin-top:32px;">
    Emithran Manufacturing Intelligence · emithran.com
  </p>
</body>
</html>`
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
    const { name, email, company, role, country, teamSize, date, time, message, cfToken } = body as {
      name: string; email: string; company: string; role: string;
      country?: string; teamSize?: string; date?: string; time?: string; message?: string; cfToken?: string;
    }

    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''
    const humanVerified = await verifyTurnstile(cfToken ?? '', ip)
    if (!humanVerified) {
      return NextResponse.json({ error: 'Human verification failed. Please try again.' }, { status: 403 })
    }

    if (!name || !email || !company || !role || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const [adminResult] = await Promise.allSettled([
      resend.emails.send({
        from:    `Emithran <${FROM}>`,
        to:      NOTIFY_TO,
        replyTo: email,
        subject: `Demo request — ${name} @ ${company} · ${date} ${time}`,
        html:    adminEmail({ name, email, company, role, country: country ?? '', teamSize: teamSize ?? '', date: date ?? '', time: time ?? '', message: message ?? '' }),
      }),
      resend.emails.send({
        from:    `Emithran <${FROM}>`,
        to:      email,
        subject: `Your Emithran demo is confirmed — ${date} at ${time} IST`,
        html:    demoConfirmationEmail(name.split(' ')[0], date ?? '', time ?? ''),
      }),
    ])

    if (adminResult.status === 'rejected') throw adminResult.reason

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[request-demo]', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
