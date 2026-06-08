const SITE = 'https://emithran.com'

function base(previewText: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>Emithran</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background:#eef1f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <!-- preview text -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${previewText}&nbsp;‌&zwnj;&nbsp;‌&zwnj;</div>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#eef1f5;padding:36px 16px 48px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;">

        <!-- ─── LOGO ROW ─── -->
        <tr>
          <td style="padding-bottom:20px;" align="center">
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="background:linear-gradient(135deg,#0f1b2d 0%,#1a3352 100%);border-radius:10px;padding:9px 18px;">
                  <span style="font-size:13px;font-weight:800;letter-spacing:0.14em;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">EMITHRAN</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ─── MAIN CARD ─── -->
        <tr>
          <td style="background:#ffffff;border-radius:16px;border:1px solid rgba(0,0,0,0.07);overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.07);">

            <!-- teal accent bar -->
            <div style="height:3px;background:linear-gradient(90deg,#0d9e8a 0%,#2dd4bf 100%);"></div>

            ${body}

          </td>
        </tr>

        <!-- ─── FOOTER ─── -->
        <tr>
          <td style="padding:24px 8px 0;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;line-height:1.6;">
              You received this email because you reached out at
              <a href="${SITE}" style="color:#0d9e8a;text-decoration:none;">${SITE.replace('https://', '')}</a>.
            </p>
            <p style="margin:0;font-size:11px;color:#b0bac7;">
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
    <td style="padding:7px 0;vertical-align:top;width:26px;">
      <div style="width:20px;height:20px;background:rgba(13,158,138,0.1);border:1.5px solid rgba(13,158,138,0.25);border-radius:50%;text-align:center;line-height:19px;">
        <span style="font-size:10px;font-weight:700;color:#0d9e8a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${n}</span>
      </div>
    </td>
    <td style="padding:7px 0 7px 10px;font-size:13px;color:#475569;line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${text}</td>
  </tr>`
}

function infoRow(icon: string, label: string, value: string) {
  return `
  <tr>
    <td style="padding:9px 16px;border-bottom:1px solid #f1f5f9;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#94a3b8;white-space:nowrap;vertical-align:middle;width:1%;">
      ${icon}&nbsp; ${label}
    </td>
    <td style="padding:9px 16px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#0f1b2d;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
      ${value}
    </td>
  </tr>`
}

// ─────────────────────────────────────────────
// Contact Us — confirmation to user
// ─────────────────────────────────────────────
export function contactConfirmationEmail(firstName: string, company: string) {
  const body = `
    <!-- header -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:linear-gradient(135deg,#0f1b2d 0%,#1a3352 100%);padding:32px 36px 28px;">
      <tr><td>
        <p style="margin:0 0 10px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Message received</p>
        <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          Thanks for reaching out, ${firstName}.
        </h1>
        <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5);line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          We've received your message and will be in touch shortly.
        </p>
      </td></tr>
    </table>

    <!-- body -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:32px 36px;">
      <tr><td>

        <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          Our team at Emithran will review your inquiry from <strong style="color:#0f1b2d;">${company}</strong> and get back to you within <strong style="color:#0d9e8a;">24 hours</strong> on the next business day.
        </p>

        <!-- what happens next -->
        <div style="background:#f8fafc;border:1px solid #e8edf2;border-radius:12px;padding:20px 22px;margin-bottom:24px;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#0d9e8a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">What happens next</p>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${stepRow(1, 'Our team reviews your inquiry and profiles your company')}
            ${stepRow(2, 'A specialist reaches out within <strong style="color:#0f1b2d;">24 hours</strong> to understand your needs')}
            ${stepRow(3, 'We share relevant resources or schedule a personalised walkthrough')}
          </table>
        </div>

        <!-- divider -->
        <div style="height:1px;background:#f1f5f9;margin:0 0 24px;"></div>

        <p style="margin:0 0 6px;font-size:13px;color:#64748b;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          Need an immediate response? Reply directly to this email and we'll prioritise your query.
        </p>
        <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          In the meantime, explore the platform at
          <a href="${SITE}" style="color:#0d9e8a;text-decoration:none;font-weight:500;">${SITE.replace('https://', '')}</a>.
        </p>

      </td></tr>
    </table>

    <!-- sign-off -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;border-top:1px solid #e8edf2;padding:20px 36px;">
      <tr><td>
        <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#0f1b2d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">The Emithran Team</p>
        <p style="margin:0;font-size:12px;color:#94a3b8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Manufacturing Intelligence · Bangalore, India</p>
      </td></tr>
    </table>`

  return base(`We've received your message and will respond within 24 hours.`, body)
}

// ─────────────────────────────────────────────
// Request Demo — confirmation to user
// ─────────────────────────────────────────────
export function demoConfirmationEmail(firstName: string, date: string, time: string) {
  const formattedDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : date

  const body = `
    <!-- header -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:linear-gradient(135deg,#0f1b2d 0%,#1a3352 100%);padding:32px 36px 28px;">
      <tr><td>
        <p style="margin:0 0 10px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Demo confirmed</p>
        <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          You're booked in, ${firstName}!
        </h1>
        <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5);line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          Your 30-minute live walkthrough of Emithran is confirmed.
        </p>
      </td></tr>
    </table>

    <!-- slot card -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:28px 36px 0;">
      <tr><td>
        <div style="background:linear-gradient(135deg,rgba(13,158,138,0.06) 0%,rgba(45,212,191,0.04) 100%);border:1.5px solid rgba(13,158,138,0.2);border-radius:12px;overflow:hidden;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${infoRow('📅', 'Date', formattedDate)}
            ${infoRow('🕐', 'Time', `${time} IST`)}
            ${infoRow('⏱', 'Duration', '30 minutes')}
            ${infoRow('📍', 'Format', 'Live video walkthrough')}
          </table>
        </div>
      </td></tr>
    </table>

    <!-- body -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:24px 36px;">
      <tr><td>

        <!-- what to expect -->
        <div style="background:#f8fafc;border:1px solid #e8edf2;border-radius:12px;padding:20px 22px;margin-bottom:24px;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#0d9e8a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">What to expect</p>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${stepRow(1, 'We\'ll review your company profile and prepare a tailored demo')}
            ${stepRow(2, 'A calendar invite will be sent to your inbox before the session')}
            ${stepRow(3, 'A 30-min live walkthrough of the Emithran platform, scoped to your use case')}
          </table>
        </div>

        <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
          Need to reschedule or have questions before the demo? Reply to this email and we'll sort it out.
        </p>

      </td></tr>
    </table>

    <!-- sign-off -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;border-top:1px solid #e8edf2;padding:20px 36px;">
      <tr><td>
        <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#0f1b2d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">The Emithran Team</p>
        <p style="margin:0;font-size:12px;color:#94a3b8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Manufacturing Intelligence · Bangalore, India</p>
      </td></tr>
    </table>`

  return base(`Your demo is booked for ${formattedDate} at ${time} IST.`, body)
}
