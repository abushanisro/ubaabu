'use client'
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

export const DIAL_CODES = [
  { iso: 'IN', country: 'India', code: '+91' },
  { iso: 'US', country: 'United States', code: '+1' },
  { iso: 'GB', country: 'United Kingdom', code: '+44' },
  { iso: 'AU', country: 'Australia', code: '+61' },
  { iso: 'CA', country: 'Canada', code: '+1' },
  { iso: 'DE', country: 'Germany', code: '+49' },
  { iso: 'FR', country: 'France', code: '+33' },
  { iso: 'IT', country: 'Italy', code: '+39' },
  { iso: 'ES', country: 'Spain', code: '+34' },
  { iso: 'JP', country: 'Japan', code: '+81' },
  { iso: 'CN', country: 'China', code: '+86' },
  { iso: 'KR', country: 'South Korea', code: '+82' },
  { iso: 'SG', country: 'Singapore', code: '+65' },
  { iso: 'AE', country: 'UAE', code: '+971' },
  { iso: 'SA', country: 'Saudi Arabia', code: '+966' },
  { iso: 'BR', country: 'Brazil', code: '+55' },
  { iso: 'MX', country: 'Mexico', code: '+52' },
  { iso: 'ZA', country: 'South Africa', code: '+27' },
  { iso: 'RU', country: 'Russia', code: '+7' },
  { iso: 'TR', country: 'Turkey', code: '+90' },
  { iso: 'ID', country: 'Indonesia', code: '+62' },
  { iso: 'MY', country: 'Malaysia', code: '+60' },
  { iso: 'TH', country: 'Thailand', code: '+66' },
  { iso: 'PK', country: 'Pakistan', code: '+92' },
  { iso: 'BD', country: 'Bangladesh', code: '+880' },
  { iso: 'EG', country: 'Egypt', code: '+20' },
  { iso: 'NG', country: 'Nigeria', code: '+234' },
  { iso: 'NL', country: 'Netherlands', code: '+31' },
  { iso: 'SE', country: 'Sweden', code: '+46' },
  { iso: 'NO', country: 'Norway', code: '+47' },
  { iso: 'DK', country: 'Denmark', code: '+45' },
  { iso: 'FI', country: 'Finland', code: '+358' },
  { iso: 'CH', country: 'Switzerland', code: '+41' },
  { iso: 'AT', country: 'Austria', code: '+43' },
  { iso: 'BE', country: 'Belgium', code: '+32' },
  { iso: 'PL', country: 'Poland', code: '+48' },
  { iso: 'PT', country: 'Portugal', code: '+351' },
  { iso: 'GR', country: 'Greece', code: '+30' },
  { iso: 'CZ', country: 'Czech Republic', code: '+420' },
  { iso: 'HU', country: 'Hungary', code: '+36' },
  { iso: 'RO', country: 'Romania', code: '+40' },
  { iso: 'UA', country: 'Ukraine', code: '+380' },
  { iso: 'IL', country: 'Israel', code: '+972' },
  { iso: 'NZ', country: 'New Zealand', code: '+64' },
  { iso: 'PH', country: 'Philippines', code: '+63' },
  { iso: 'VN', country: 'Vietnam', code: '+84' },
  { iso: 'LK', country: 'Sri Lanka', code: '+94' },
  { iso: 'NP', country: 'Nepal', code: '+977' },
  { iso: 'KE', country: 'Kenya', code: '+254' },
  { iso: 'GH', country: 'Ghana', code: '+233' },
];

interface PhoneFieldProps {
  label?: string;
  required?: boolean;
  codeValue: string;
  phoneValue: string;
  onCodeChange: (iso: string) => void;
  onPhoneChange: (value: string) => void;
  inputId?: string;
  className?: string;
  /** When true, shows the flag + dial code as a fixed, non-interactive prefix
   *  (no dropdown to change country) — just a flag and a number field. */
  staticCode?: boolean;
  placeholder?: string;
}

export function PhoneField({
  label = "Phone", required, codeValue, phoneValue, onCodeChange, onPhoneChange, inputId, className, staticCode, placeholder = "98765 43210",
}: PhoneFieldProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = DIAL_CODES.find(d => d.iso === codeValue) ?? DIAL_CODES[0];
  const filtered = search
    ? DIAL_CODES.filter(d => d.country.toLowerCase().includes(search.toLowerCase()) || d.code.includes(search))
    : DIAL_CODES;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-[12px] font-semibold text-[#0f1b2d]/60 uppercase tracking-wider">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div ref={ref} className={`relative flex h-10 rounded-lg bg-white border border-black/12 shadow-sm focus-within:border-[#0d9e8a]/70 focus-within:ring-2 focus-within:ring-[#0d9e8a]/15 transition-all ${className ?? ''}`}>
        {staticCode ? (
          <span className="flex items-center gap-1.5 px-3 border-r border-black/10 text-[13px] text-[#0f1b2d] shrink-0">
            <ReactCountryFlag countryCode={selected.iso} svg style={{ width: '1.25em', height: '1.25em' }} />
            <span className="font-medium tabular-nums">{selected.code}</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => { setOpen(o => !o); setSearch(''); }}
            className="flex items-center gap-1.5 px-3 border-r border-black/10 text-[13px] text-[#0f1b2d] hover:bg-black/[0.03] rounded-l-lg transition-colors shrink-0"
          >
            <ReactCountryFlag countryCode={selected.iso} svg style={{ width: '1.25em', height: '1.25em' }} />
            <span className="font-medium tabular-nums">{selected.code}</span>
            <ChevronDown size={12} className={`opacity-40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          </button>
        )}
        <input
          id={inputId}
          type="tel"
          value={phoneValue}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-0 px-3 text-[14px] text-[#0f1b2d] placeholder:text-black/25 focus:outline-none bg-transparent rounded-r-lg"
        />
        {!staticCode && open && (
          <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-64 rounded-xl bg-white border border-black/10 shadow-xl overflow-hidden">
            <div className="p-2 border-b border-black/8">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                autoFocus
                className="w-full h-8 px-3 text-[13px] rounded-lg bg-[#f5f5f5] border border-transparent focus:outline-none focus:border-[#0d9e8a]/50 placeholder:text-black/30"
              />
            </div>
            <div className="overflow-y-auto max-h-48">
              {filtered.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { onCodeChange(d.iso); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-[13px] text-left transition-colors ${codeValue === d.iso ? 'bg-[#0d9e8a]/10 font-semibold' : 'hover:bg-black/[0.04]'}`}
                >
                  <ReactCountryFlag countryCode={d.iso} svg style={{ width: '1.25em', height: '1.25em' }} />
                  <span className="flex-1 text-[#0f1b2d]">{d.country}</span>
                  <span className="text-[#0f1b2d]/40 tabular-nums">{d.code}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-3 py-4 text-[13px] text-[#0f1b2d]/40 text-center">No results</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
