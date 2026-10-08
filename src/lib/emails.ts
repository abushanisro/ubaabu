const SITE = 'https://emithran.com'
export const LOGO_URL = `${SITE}/assets/Emithran.png`

function base(previewText: string, body: string, badge?: string) {
  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>Emithran</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style>
    :root { color-scheme: light only; supported-color-schemes: light only; }
    /* Force light mode - prevent email clients from inverting colors */
    @media (prefers-color-scheme: dark) {
      body, table, td, a { background-color: inherit !important; color: inherit !important; }
      .force-white { background-color: #ffffff !important; }
      .force-dark  { background-color: #0f1b2d !important; }
      .force-body  { background-color: #f4f6f9 !important; }
      .force-hdr   { background-color: #15191f !important; }
      .force-pill  { background-color: #0d6b63 !important; color: #ffffff !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;" class="force-body">
  <!-- preview text -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${previewText}&nbsp;‌&zwnj;&nbsp;‌&zwnj;</div>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f4f6f9;padding:36px 16px 52px;" class="force-body">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;">

        <!-- ─── LOGO ROW ─── -->
        <tr>
          <td style="padding-bottom:18px;" align="center">
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                ${badge
                  ? `<td style="background:#0d6b63;border-radius:12px;padding:12px 28px;" class="force-pill">
                  <span style="font-size:14px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${badge}</span>
                </td>`
                  : `<td style="background:#0f1b2d;border-radius:8px;padding:8px 20px;" class="force-dark">
                  <span style="font-size:14px;font-weight:800;letter-spacing:0.16em;color:#2dd4bf;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">EMITHRAN</span>
                </td>`}
              </tr>
            </table>
          </td>
        </tr>

        <!-- ─── MAIN CARD ─── -->
        <tr>
          <td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);" class="force-white">

            <!-- teal accent bar (5px, prominent) -->
            <div style="height:5px;background:linear-gradient(90deg,#0d9488 0%,#2dd4bf 100%);"></div>

            ${body}

          </td>
        </tr>

        <!-- ─── FOOTER ─── -->
        <tr>
          <td style="padding:24px 8px 0;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;color:#8a96a8;line-height:1.6;">
              You received this email because you reached out at
              <a href="${SITE}" style="color:#0d9488;text-decoration:none;font-weight:500;">${SITE.replace('https://', '')}</a>.
            </p>
            <p style="margin:0;font-size:11px;color:#aab4c2;">
              Emithran Technologies Pvt. Ltd. &nbsp;·&nbsp; Bangalore, India
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function stepRow(n: number, text: string) {
  return `
  <tr>
    <td style="padding:9px 0;vertical-align:top;width:34px;">
      <table cellpadding="0" cellspacing="0" role="presentation"><tr>
        <td width="26" height="26" align="center" valign="middle" bgcolor="#0d6b63" class="force-pill" style="width:26px;height:26px;background:#0d6b63;border-radius:50%;box-shadow:0 0 0 4px #d5ebe8;font-size:12px;font-weight:700;line-height:26px;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${n}</td>
      </tr></table>
    </td>
    <td style="padding:9px 0 9px 8px;font-size:13.5px;color:#1f2937;line-height:1.55;vertical-align:middle;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${text}</td>
  </tr>`
}

function infoRow(icon: 'calendar' | 'clock' | 'timer' | 'video', label: string, value: string) {
  return `
  <tr>
    <td style="padding:14px 0 14px 20px;border-bottom:1px solid #e5e7eb;width:24px;vertical-align:middle;">
      <img src="${SITE}/assets/email/${icon}.png" width="20" height="20" alt="" style="display:block;width:20px;height:20px;border:0;">
    </td>
    <td style="padding:14px 12px 14px 10px;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#111827;white-space:nowrap;vertical-align:middle;width:100px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${label}</td>
    <td style="padding:14px 20px 14px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#111827;font-weight:500;vertical-align:middle;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${value}</td>
  </tr>`
}

// ─────────────────────────────────────────────
// Contact Us - confirmation to user
// ─────────────────────────────────────────────
export function contactConfirmationEmail(firstName: string, company: string) {
  const body = `
    <!-- header -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#15191f;padding:36px;" class="force-hdr">
      <tr>
        <td style="vertical-align:middle;">
          <p style="margin:0 0 10px;font-size:18px;font-weight:600;letter-spacing:0.04em;color:#c9ccd1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">EMITHRAN</p>
          <h1 style="margin:0 0 10px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.25;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
            Thanks for reaching out, ${firstName}.
          </h1>
          <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.65);line-height:1.65;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
            We've received your message and will be in touch shortly.
          </p>
        </td>
        <td width="96" align="right" style="vertical-align:middle;padding-left:16px;">
          <img src="${LOGO_URL}" width="84" height="84" alt="Emithran" style="display:block;width:84px;height:84px;border-radius:50%;border:0;">
        </td>
      </tr>
    </table>

    <!-- body -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:32px 36px;" class="force-white">
      <tr><td>

        <p style="margin:0 0 26px;font-size:14.5px;color:#374151;line-height:1.75;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          Our team at Emithran will review your inquiry from <strong style="color:#0f1b2d;">${company}</strong> and get back to you within <strong style="color:#0d9488;">24 hours</strong> on the next business day.
        </p>

        <!-- what happens next -->
        <div style="background:#f8fafc;border:1px solid #e8edf4;border-radius:12px;padding:22px 24px;margin-bottom:26px;">
          <p style="margin:0 0 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#0d9488;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">What happens next</p>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${stepRow(1, 'Our team reviews your inquiry and profiles your company')}
            ${stepRow(2, 'A specialist reaches out within <strong style="color:#0f1b2d;">24 hours</strong> to understand your needs')}
            ${stepRow(3, 'We share relevant resources or schedule a personalised walkthrough')}
          </table>
        </div>

        <!-- divider -->
        <div style="height:1px;background:#eef2f7;margin:0 0 26px;"></div>

        <p style="margin:0 0 8px;font-size:13.5px;color:#4b5563;line-height:1.65;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          Need an immediate response? Reply directly to this email and we'll prioritise your query.
        </p>
        <p style="margin:0;font-size:13.5px;color:#4b5563;line-height:1.65;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          In the meantime, explore the platform at
          <a href="${SITE}" style="color:#0d9488;text-decoration:none;font-weight:600;">${SITE.replace('https://', '')}</a>.
        </p>

      </td></tr>
    </table>

    <!-- sign-off -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;border-top:1px solid #eef2f7;padding:20px 36px;">
      <tr><td>
        <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#0f1b2d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">The Emithran Team</p>
        <p style="margin:0;font-size:12px;color:#8a96a8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Manufacturing Intelligence - Bangalore, India</p>
      </td></tr>
    </table>`

  return base(`We've received your message and will respond within 24 hours.`, body, 'Message received')
}

// ─────────────────────────────────────────────
// Request Demo - confirmation to user
// ─────────────────────────────────────────────
export function demoConfirmationEmail(firstName: string, date: string, time: string) {
  const formattedDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : date

  const body = `
    <!-- header -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#15191f;padding:36px;" class="force-hdr">
      <tr>
        <td style="vertical-align:middle;">
          <p style="margin:0 0 10px;font-size:18px;font-weight:600;letter-spacing:0.04em;color:#c9ccd1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">EMITHRAN</p>
          <h1 style="margin:0 0 10px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.25;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
            You're booked in, ${firstName}!
          </h1>
          <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.65);line-height:1.65;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
            Your 30-minute live walkthrough of Emithran is confirmed.
          </p>
        </td>
        <td width="96" align="right" style="vertical-align:middle;padding-left:16px;">
          <img src="${LOGO_URL}" width="84" height="84" alt="Emithran" style="display:block;width:84px;height:84px;border-radius:50%;border:0;">
        </td>
      </tr>
    </table>

    <!-- slot card -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:28px 36px 4px;" class="force-white">
      <tr><td>
        <div style="border:1.5px solid #0d6b63;border-radius:12px;overflow:hidden;">
          <div style="background:#0d6b63;padding:14px 20px;">
            <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Session details</p>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;">
            ${infoRow('calendar', 'Date', formattedDate)}
            ${infoRow('clock', 'Time', `${time} IST`)}
            ${infoRow('timer', 'Duration', '30 minutes')}
            ${infoRow('video', 'Format', 'Live video walkthrough')}
          </table>
        </div>
      </td></tr>
    </table>

    <!-- body -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:24px 36px;" class="force-white">
      <tr><td>

        <!-- what to expect -->
        <div style="background:#f8fafc;border:1px solid #e8edf4;border-left:4px solid #0d6b63;border-radius:12px;padding:22px 24px;margin-bottom:24px;">
          <p style="margin:0 0 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#0d9488;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">What to expect</p>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${stepRow(1, 'We\'ll review your company profile and prepare a tailored demo')}
            ${stepRow(2, 'A calendar invite will be sent to your inbox before the session')}
            ${stepRow(3, 'A 30-min live walkthrough of the Emithran platform, scoped to your use case')}
          </table>
        </div>

        <p style="margin:0;font-size:13.5px;color:#4b5563;line-height:1.65;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          Need to reschedule or have questions before the demo? Reply to this email and we'll sort it out.
        </p>

      </td></tr>
    </table>

    <!-- sign-off -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;border-top:1px solid #eef2f7;padding:20px 36px;">
      <tr><td>
        <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#0f1b2d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">The Emithran Team</p>
        <p style="margin:0;font-size:12px;color:#8a96a8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Manufacturing Intelligence - Bangalore, India</p>
      </td></tr>
    </table>`

  return base(`Your demo is booked for ${formattedDate} at ${time} IST.`, body, 'Demo booked')
}

// ─────────────────────────────────────────────
// Newsletter - confirmation to subscriber
// ─────────────────────────────────────────────
export function newsletterConfirmationEmail(email: string, firstName?: string) {
  const greeting = firstName ? `Thank you for subscribing, ${firstName}.` : 'Thank you for subscribing.'
  const body = `
    <!-- header -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#0f1b2d;padding:36px 36px 32px;" class="force-dark">
      <tr><td>
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#2dd4bf;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Subscribed ✓</p>
        <h1 style="margin:0 0 10px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.25;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          ${greeting}
        </h1>
        <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.65);line-height:1.65;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          You'll get our latest manufacturing intelligence articles and product updates at ${email}.
        </p>
      </td></tr>
    </table>

    <!-- body -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:32px 36px;" class="force-white">
      <tr><td>

        <p style="margin:0 0 26px;font-size:14.5px;color:#374151;line-height:1.75;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          Expect occasional emails when we publish new case studies, cost-engineering insights, or platform updates - no spam, unsubscribe anytime.
        </p>

        <p style="margin:0;font-size:13.5px;color:#4b5563;line-height:1.65;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          In the meantime, catch up on our latest thinking at
          <a href="${SITE}/blog" style="color:#0d9488;text-decoration:none;font-weight:600;">${SITE.replace('https://', '')}/blog</a>.
        </p>

      </td></tr>
    </table>

    <!-- sign-off -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;border-top:1px solid #eef2f7;padding:20px 36px;">
      <tr><td>
        <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#0f1b2d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">The Emithran Team</p>
        <p style="margin:0;font-size:12px;color:#8a96a8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Manufacturing Intelligence · Bangalore, India</p>
      </td></tr>
    </table>`

  return base(`Thank you for subscribing to Emithran updates.`, body)
}

// ─────────────────────────────────────────────
// Vendor Management App - pre-book confirmation
// ─────────────────────────────────────────────
export function preBookConfirmationEmail(email: string, firstName?: string) {
  const greeting = firstName ? `You're pre-booked, ${firstName}.` : `You're pre-booked.`
  const body = `
    <!-- header -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#0f1b2d;padding:36px 36px 32px;" class="force-dark">
      <tr><td>
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#2dd4bf;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Pre-booked ✓</p>
        <h1 style="margin:0 0 10px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.25;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          ${greeting}
        </h1>
        <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.65);line-height:1.65;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          You've reserved early access to the Emithran Vendor Management app at ${email}.
        </p>
      </td></tr>
    </table>

    <!-- body -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:32px 36px;" class="force-white">
      <tr><td>

        <p style="margin:0 0 26px;font-size:14.5px;color:#374151;line-height:1.75;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          We'll email you as soon as the app is ready - supplier discovery, evaluation, RFQs, and nomination, built for the field.
        </p>

        <p style="margin:0;font-size:13.5px;color:#4b5563;line-height:1.65;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          In the meantime, explore the platform at
          <a href="${SITE}" style="color:#0d9488;text-decoration:none;font-weight:600;">${SITE.replace('https://', '')}</a>.
        </p>

      </td></tr>
    </table>

    <!-- sign-off -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;border-top:1px solid #eef2f7;padding:20px 36px;">
      <tr><td>
        <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#0f1b2d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">The Emithran Team</p>
        <p style="margin:0;font-size:12px;color:#8a96a8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Manufacturing Intelligence · Bangalore, India</p>
      </td></tr>
    </table>`

  return base(`You're pre-booked for the Emithran Vendor Management app.`, body)
}
