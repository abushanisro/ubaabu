import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
const TO   = process.env.RESEND_TO_EMAIL   ?? 'partner@emithran.com'

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret:   process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
  })
  const data = await res.json()
  return data.success === true
}

function row(label: string, value?: string) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:8px 12px;font-size:12px;font-weight:600;color:#6b7280;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f3f4f6;">${label}</td>
      <td style="padding:8px 12px;font-size:13px;color:#111827;border-bottom:1px solid #f3f4f6;">${value}</td>
    </tr>`
}

function tags(label: string, items?: string[]) {
  if (!items?.length) return ''
  return row(label, items.join(' · '))
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      companyName, firstName, lastName, email, phone, website, country, city,
      services, industries, certifications,
      process, equipmentType, tonnage, maxLength, maxWidth, maxHeight, notes,
      supplierCode, cfToken,
    } = body

    // Verify Turnstile token first
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? ''
    const humanVerified = await verifyTurnstile(cfToken ?? '', ip)
    if (!humanVerified) {
      return NextResponse.json({ error: 'Human verification failed. Please try again.' }, { status: 403 })
    }

    // Basic server-side validation
    if (!companyName || !firstName || !lastName || !email || !city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (!Array.isArray(services) || !services.length) {
      return NextResponse.json({ error: 'At least one service required' }, { status: 400 })
    }

    const dimensionStr = [maxLength, maxWidth, maxHeight].every(Boolean)
      ? `${maxLength} × ${maxWidth} × ${maxHeight} mm` : undefined

    const html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;padding:32px 16px;background:#fff;color:#111827;">
        <div style="margin-bottom:32px;">
          <div style="display:inline-block;background:linear-gradient(135deg,#0d9488,#2dd4bf);padding:10px 20px;border-radius:99px;">
            <span style="color:white;font-size:13px;font-weight:700;letter-spacing:0.05em;">EMITHRAN</span>
          </div>
          <h1 style="margin:20px 0 4px;font-size:22px;font-weight:700;color:#0f1b2d;">New Vendor Application</h1>
          <p style="margin:0;font-size:13px;color:#6b7280;">Submitted via emithran.in/about/partners/vendor-onboarding</p>
        </div>

        <div style="background:#f0fdf4;border:1.5px solid rgba(13,148,136,0.25);border-radius:12px;padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;gap:16px;">
          <div>
            <p style="margin:0 0 2px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#0d9488;">Auto-generated supplier code</p>
            <p style="margin:0;font-size:24px;font-weight:700;font-family:monospace;letter-spacing:0.12em;color:#0f1b2d;">${supplierCode ?? 'EMT-PENDING'}</p>
          </div>
        </div>

        ${section('Company', `
          ${row('Company',   companyName)}
          ${row('Contact',   `${firstName} ${lastName}`)}
          ${row('Email',     email)}
          ${row('Phone',     phone)}
          ${row('Website',   website)}
          ${row('Location',  [city, country].filter(Boolean).join(', '))}
        `)}

        ${section('Capabilities', `
          ${tags('Services',        services)}
          ${tags('Industries',      industries)}
          ${tags('Certifications',  certifications)}
        `)}

        ${process ? section('Equipment', `
          ${row('Process',    process)}
          ${row('Equipment',  equipmentType)}
          ${row('Tonnage',    tonnage ? `${tonnage} t` : undefined)}
          ${row('Max L×W×H', dimensionStr)}
          ${row('Notes',      notes)}
        `) : ''}

        <p style="font-size:11px;color:#9ca3af;border-top:1px solid #f3f4f6;padding-top:16px;margin-top:32px;">
          Emithran Supplier Database · partner@emithran.com
        </p>
      </body>
      </html>`

    await resend.emails.send({
      from:    `Emithran Vendors <${FROM}>`,
      to:      TO,
      replyTo: email,
      subject: `Vendor application - ${companyName} (${supplierCode})`,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[vendor-onboard]', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
