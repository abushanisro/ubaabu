"use client"

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export interface MapMarker {
  lat: number
  lng: number
  title: string
  slug: string
}

interface Props {
  markers?: MapMarker[]
  className?: string
}

export default function MaplibreHeroMap({ markers = [], className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [20, 15],
      zoom: 1.2,
      attributionControl: false,
    })

    mapRef.current = map

    map.on('load', () => {
      if (markers.length === 0) return

      const bounds = new maplibregl.LngLatBounds()

      markers.forEach(m => {
        bounds.extend([m.lng, m.lat])

        const el = document.createElement('div')
        el.style.cssText = [
          'width:10px', 'height:10px',
          'background:#0d9488',
          'border:2px solid #fff',
          'border-radius:50%',
          'box-shadow:0 2px 8px rgba(13,148,136,0.5)',
          'cursor:pointer',
          'transition:transform 0.15s ease',
        ].join(';')
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.5)' })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })

        const popup = new maplibregl.Popup({
          offset: 14,
          closeButton: false,
          maxWidth: '200px',
        }).setHTML(
          `<div style="padding:8px 10px;font-family:system-ui,sans-serif;">` +
          `<div style="font-size:11px;font-weight:700;color:#0f1b2d;margin-bottom:4px;line-height:1.4;">${m.title}</div>` +
          `<a href="/case-studies/${m.slug}" style="font-size:11px;color:#0d9488;font-weight:600;text-decoration:none;">View case study →</a>` +
          `</div>`
        )

        new maplibregl.Marker({ element: el })
          .setLngLat([m.lng, m.lat])
          .setPopup(popup)
          .addTo(map)
      })

      map.fitBounds(bounds, { padding: 50, maxZoom: 4, duration: 0 })
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <style>{`
        .maplibregl-popup-content {
          padding: 0 !important;
          border-radius: 10px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.13) !important;
          overflow: hidden;
          border: 1px solid rgba(13,148,136,0.15);
        }
        .maplibregl-popup-tip { border-top-color: #fff !important; }
        .maplibregl-ctrl-logo { display: none !important; }
      `}</style>
      <div ref={containerRef} className={className} />
    </>
  )
}
