export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export function pageview(url: string) {
  if (!GA_ID || typeof window === 'undefined') return
  window.gtag('config', GA_ID, { page_path: url })
}

type GtagEvent = {
  action: string
  category: string
  label?: string
  value?: number
  [key: string]: unknown
}

export function event({ action, category, label, value, ...rest }: GtagEvent) {
  if (!GA_ID || typeof window === 'undefined') return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  })
}

// ── Typed helpers ─────────────────────────────────────────────────────────────

export const track = {
  // CTAs
  ctaClick: (label: string, location: string) =>
    event({ action: 'cta_click', category: 'engagement', label, location }),

  demoRequest: (source: string) =>
    event({ action: 'demo_request', category: 'conversion', label: source }),

  contactFormSubmit: (source: string) =>
    event({ action: 'contact_form_submit', category: 'conversion', label: source }),

  vendorOnboard: () =>
    event({ action: 'vendor_onboard_submit', category: 'conversion' }),

  partnerApply: () =>
    event({ action: 'partner_apply_submit', category: 'conversion' }),

  // Navigation
  navClick: (label: string) =>
    event({ action: 'nav_click', category: 'navigation', label }),

  // Content
  blogRead: (slug: string, title: string) =>
    event({ action: 'blog_read', category: 'content', label: title, slug }),

  caseStudyView: (slug: string) =>
    event({ action: 'case_study_view', category: 'content', label: slug }),

  faqOpen: (question: string) =>
    event({ action: 'faq_open', category: 'content', label: question }),

  videoPlay: (label: string) =>
    event({ action: 'video_play', category: 'engagement', label }),

  // Sections (scroll into view)
  sectionView: (section: string, page: string) =>
    event({ action: 'section_view', category: 'scroll', label: section, page }),

  // Product / solution cards
  cardClick: (card: string, type: string) =>
    event({ action: 'card_click', category: 'engagement', label: card, card_type: type }),

  // Pricing
  pricingView: (plan: string) =>
    event({ action: 'pricing_plan_view', category: 'interest', label: plan }),
}
