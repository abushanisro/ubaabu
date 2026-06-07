"use client";
import Link from "next/link";
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer";

type FooterLink = {
  title: string;
  href: string;
  pulse?: boolean;
};

const platformLinks: FooterLink[] = [
  { title: "CAD to Cost", href: "/blogs/cad-to-cost" },
  { title: "Should Cost Analysis", href: "/blogs/should-cost-analysis" },
  { title: "Supplier Intelligence", href: "/blogs/supplier-intelligence" },
  { title: "Production Tracking", href: "/blogs/production-tracking" },
  { title: "Quality & PPAP", href: "/blogs/quality-and-ppap" },
  { title: "Manufacturing Analytics", href: "/blogs/analytics" },
];

const industryLinks: FooterLink[] = [
  { title: "Space Manufacturing", href: "/blogs/space-manufacturing" },
  { title: "Defence Manufacturing", href: "/blogs/defence-manufacturing" },
  { title: "Aerospace Manufacturing", href: "/blogs/aerospace-manufacturing" },
  { title: "Automotive Manufacturing", href: "/blogs/automotive-manufacturing" },
  { title: "Precision Manufacturing", href: "/blogs/precision-manufacturing-intelligence" },
];

const footerLinks = [
  {
    title: "Platform",
    links: platformLinks,
    useNextLink: true,
  },
  {
    title: "Industries",
    links: industryLinks,
    useNextLink: true,
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "#" },
      { title: "Careers", href: "#", pulse: true },
      { title: "Contact", href: "#" },
      { title: "Blog", href: "#" },
    ],
  },
];

const contactInfo = [
  { icon: <Mail   size={16} className="text-[#0d9e8a]" />, text: "contact@emithran.in",      href: "mailto:contact@emithran.in" },
  { icon: <Phone  size={16} className="text-[#0d9e8a]" />, text: "+91 98765 43210",           href: "tel:+919876543210" },
  { icon: <MapPin size={16} className="text-[#0d9e8a]" />, text: "Bangalore, Karnataka, India" },
];

const socialLinks = [
  { icon: <Linkedin size={18} />, label: "LinkedIn", href: "#" },
  { icon: <Twitter  size={18} />, label: "Twitter",  href: "#" },
  { icon: <Github   size={18} />, label: "GitHub",   href: "#" },
];

const legalLinks = ["Terms of Service", "Privacy Notice", "Acceptable Use", "Legal", "Cookie Settings"];

export default function Footer() {
  return (
    <footer className="bg-[#080808] relative overflow-hidden rounded-t-3xl m-0">
      <div className="max-w-[1280px] mx-auto px-8 pt-16 z-40 relative">
        {/* ── Main columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.07]">
          {/* Brand + contact */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded bg-[#0d9e8a] text-white text-xs font-black">E</span>
              <span className="text-white text-xl font-bold tracking-wide">EMITHRAN</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-[280px]">
              End-to-end manufacturing intelligence for India's space, defence, and aerospace industry.
            </p>
            <ul className="space-y-3 pt-2">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  {item.icon}
                  {item.href ? (
                    <a href={item.href} className="text-[13px] text-white/40 hover:text-[#0d9e8a] transition-colors">{item.text}</a>
                  ) : (
                    <span className="text-[13px] text-white/40">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Nav link columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-[11px] font-semibold uppercase tracking-widest mb-5">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.title} className="relative">
                    {section.useNextLink ? (
                      <Link
                        href={link.href}
                        className="text-[13px] text-white/45 hover:text-[#0d9e8a] transition-colors"
                      >
                        {link.title}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[13px] text-white/45 hover:text-[#0d9e8a] transition-colors"
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

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 pb-4 text-sm">
          {/* Social icons */}
          <div className="flex items-center gap-4 text-white/40">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#0d9e8a] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Legal + copyright */}
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1">
              {legalLinks.map(l => (
                <a key={l} href="#" className="text-[11px] text-white/30 hover:text-white/70 transition-colors whitespace-nowrap">
                  {l}
                </a>
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
