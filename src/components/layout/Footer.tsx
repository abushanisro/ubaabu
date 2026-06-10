"use client";
import Link from "next/link";
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer";

type FooterLink = {
  title: string;
  href: string;
  pulse?: boolean;
};

const platformLinks: FooterLink[] = [
  { title: "Products",             href: "/products" },
  { title: "Engineering Support",  href: "/products/engineering-support" },
  { title: "Training",             href: "/products/training" },
  { title: "Solutions",            href: "/solutions" },
  { title: "Pricing",              href: "/pricing" },
];

const resourceLinks: FooterLink[] = [
  { title: "Case Studies",   href: "/case-studies" },
  { title: "Blog",           href: "/blog" },
  { title: "Industries",     href: "/industries" },
  { title: "Why Emithran",   href: "/why-emithran" },
  { title: "FAQ",            href: "/faq" },
];

const footerLinks = [
  { title: "Platform",   links: platformLinks,  useNextLink: true },
  { title: "Resources",  links: resourceLinks,  useNextLink: true },
  {
    title: "Company",
    links: [
      { title: "About",    href: "/about" },
      { title: "Partners", href: "/about/partners" },
      { title: "Careers",  href: "/about", pulse: true },
      { title: "Contact",  href: "/contact?source=footer&cta=contact" },
    ],
  },
];

const legalLinks: { title: string; href: string }[] = [
  { title: "Terms of Service", href: "/terms"   },
  { title: "Privacy Policy",   href: "/privacy"  },
  { title: "Cookie Policy",    href: "/cookies"  },
  { title: "DPA",              href: "/dpa"      },
];

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function ChatGPTIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zm-9.022 12.608a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.865.865 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zm-9.66-4.125a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.864.864 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zm-1.26-10.712a4.485 4.485 0 0 1 2.366-1.973V11.6a.862.862 0 0 0 .388.677l5.815 3.354-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.774-3.33 2.015-1.164a.076.076 0 0 1 .072 0l4.83 2.786a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.467-.719zm2.01-3.023-.141-.085-4.774-2.759a.864.864 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.865.865 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z"/>
    </svg>
  );
}

function GrokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h11v11H0zm13 13h11v11H13z"/>
    </svg>
  );
}

function AnthropicIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.33 7.978l4.027 9.3H15.03l-1.08-2.548H9.04L7.96 17.278H5.63l4.04-9.3h3.66zm-1.83 2.101-1.67 3.98h3.33l-1.66-3.98zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#080808] relative overflow-hidden m-0 isolate">
      <div className="max-w-[1280px] mx-auto px-8 pt-16 z-40 relative">
        {/* ── Main columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.07]">
          {/* Brand + contact */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <img src="/assets/infographics/logo/logo-black.png" alt="Emithran" className="h-7 w-auto" />
            </div>

            {/* Tagline */}
            <p className="text-sm text-white/40 leading-relaxed max-w-[320px]">
              End-to-end manufacturing intelligence for India's space, defence, and aerospace industry.
            </p>

            {/* Our Locations */}
            <div>
              <h4 className="text-white text-[11px] font-semibold uppercase tracking-widest mb-4">
                Our Locations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">

                {/* Headquarters */}
                <div className="space-y-2">
                  <p className="text-[11px] text-[#0d9e8a] font-semibold uppercase tracking-widest">
                    Headquarters
                  </p>
                  <a
                    href="https://maps.app.goo.gl/gqknGeHd1HWvVQz96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 group"
                  >
                    <MapPin size={14} className="text-[#0d9e8a] mt-0.5 shrink-0" />
                    <span className="text-[13px] text-white/40 group-hover:text-[#0d9e8a] transition-colors leading-snug">
                      126, RNS Plaza, Electronic City Phase 2, Bangalore
                    </span>
                  </a>
                  <a href="tel:+919360216324" className="flex items-center gap-2">
                    <Phone size={14} className="text-[#0d9e8a] shrink-0" />
                    <span className="text-[13px] text-white/40 hover:text-[#0d9e8a] transition-colors">
                      +91 93602 16324
                    </span>
                  </a>
                </div>

                {/* Manufacturing */}
                <div className="space-y-2">
                  <p className="text-[11px] text-[#0d9e8a] font-semibold uppercase tracking-widest">
                    Manufacturing
                  </p>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-[#0d9e8a] mt-0.5 shrink-0" />
                    <span className="text-[13px] text-white/40 leading-snug">Hosur, Tamil Nadu</span>
                  </div>
                  <a href="mailto:emithran@emuski.com" className="flex items-center gap-2">
                    <Mail size={14} className="text-[#0d9e8a] shrink-0" />
                    <span className="text-[13px] text-white/40 hover:text-[#0d9e8a] transition-colors">
                      emithran@emuski.com
                    </span>
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* ── Platform · Resources · Company (3-col grid on all sizes) ── */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest mb-4 sm:mb-5">
                  {section.title}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.title} className="relative">
                      {section.useNextLink ? (
                        <Link
                          href={link.href}
                          className="text-[11px] sm:text-[13px] text-white/45 hover:text-[#0d9e8a] transition-colors leading-snug block"
                        >
                          {link.title}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-[11px] sm:text-[13px] text-white/45 hover:text-[#0d9e8a] transition-colors leading-snug block"
                        >
                          {link.title}
                        </a>
                      )}
                      {link.pulse && (
                        <span className="absolute top-0.5 -right-3 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d9e8a] opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0d9e8a]" />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 pb-4 text-sm">

          {/* Social icons */}
          <div className="flex items-center gap-4 text-white/40">
            <a href="https://www.linkedin.com/company/emithran/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-[#0d9e8a] transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="https://x.com/emithran_ai" aria-label="X" target="_blank" rel="noopener noreferrer" className="hover:text-[#0d9e8a] transition-colors">
              <Twitter size={18} />
            </a>
            <a href="https://wa.me/919360216324" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">
              <WhatsAppIcon size={18} />
            </a>

            {/* Divider */}
            <span className="w-px h-4 bg-white/10" />

            {/* AI summary icons */}
            <span className="text-[10px] text-white/20 uppercase tracking-widest select-none">Ask AI</span>
            <a
              href={`https://chatgpt.com/?q=${encodeURIComponent("Give me a summary of Emithran Technologies — a manufacturing intelligence platform for India's space, defence, and aerospace industry. Website: https://emithran.com")}`}
              aria-label="Ask ChatGPT for a summary"
              target="_blank"
              rel="noopener noreferrer"
              title="Summarize with ChatGPT"
              className="hover:text-[#10a37f] transition-colors"
            >
              <ChatGPTIcon size={18} />
            </a>
            <a
              href={`https://grok.com/?q=${encodeURIComponent("Give me a summary of Emithran Technologies — a manufacturing intelligence platform for India's space, defence, and aerospace industry. Website: https://emithran.com")}`}
              aria-label="Ask Grok for a summary"
              target="_blank"
              rel="noopener noreferrer"
              title="Summarize with Grok"
              className="hover:text-white/80 transition-colors"
            >
              <GrokIcon size={18} />
            </a>
            <a
              href={`https://claude.ai/new?q=${encodeURIComponent("Give me a summary of Emithran Technologies — a manufacturing intelligence platform for India's space, defence, and aerospace industry. Website: https://emithran.com")}`}
              aria-label="Ask Claude for a summary"
              target="_blank"
              rel="noopener noreferrer"
              title="Summarize with Claude"
              className="hover:text-[#d97757] transition-colors"
            >
              <AnthropicIcon size={18} />
            </a>
          </div>

          {/* Legal + copyright */}
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1">
              {legalLinks.map(l => (
                <Link key={l.title} href={l.href} className="text-[11px] text-white/30 hover:text-white/70 transition-colors whitespace-nowrap">
                  {l.title}
                </Link>
              ))}
            </div>
            <p className="text-[11px] text-white/20">
              © {new Date().getFullYear()} Emithran Technologies Pvt. Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* ── Text hover effect — EMITHRAN at bottom ── */}
      <div className="w-full relative z-10" style={{ aspectRatio: '500 / 72' }}>
        <TextHoverEffect text="EMITHRAN" duration={0} className="w-full h-full" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
