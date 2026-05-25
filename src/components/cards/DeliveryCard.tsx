'use client'
import { WorldMap } from '@/components/ui/map'

const ROUTES = [
  {
    start: { lat: 12.9716, lng: 77.5946, label: 'Bengaluru' },
    end:   { lat: 50.1109, lng: 8.6821,  label: 'Frankfurt' },
  },
  {
    start: { lat: 28.6139, lng: 77.2090, label: 'New Delhi' },
    end:   { lat: 34.0522, lng: -118.2437, label: 'Los Angeles' },
  },
  {
    start: { lat: 19.0760, lng: 72.8777, label: 'Mumbai' },
    end:   { lat: 1.3521,  lng: 103.8198, label: 'Singapore' },
  },
  {
    start: { lat: 13.0827, lng: 80.2707, label: 'Chennai' },
    end:   { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
  },
  {
    start: { lat: 17.3850, lng: 78.4867, label: 'Hyderabad' },
    end:   { lat: 25.2048, lng: 55.2708, label: 'Dubai' },
  },
]

export function DeliveryCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-black/[0.06]"
      style={{ background: 'oklch(0.985 0.004 200)' }}>
      <WorldMap dots={ROUTES} lineColor="#14b8a6" showLabels animationDuration={2} loop />
      <div className="flex items-center justify-between px-4 py-2 border-t border-black/[0.06]">
        <span className="text-[11px] font-medium text-black/40">32 active routes</span>
        <span className="text-[11px] font-medium text-teal-600">98% on-time</span>
      </div>
    </div>
  )
}
