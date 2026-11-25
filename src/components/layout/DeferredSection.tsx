// Below-the-fold wrapper: `content-visibility: auto` lets the browser skip style,
// layout and paint for the section until it nears the viewport, which shortens
// the first layout (and so first paint) on long pages. The content is still in
// the HTML, so crawlers, find-in-page and anchor links are unaffected.
// `contain-intrinsic-size: auto <h>` is the placeholder height until the section
// has rendered once; after that the browser remembers its real size.
//
// Caveat: layout containment makes this wrapper the containing block for
// `position: fixed` descendants, so any modal inside must be portaled to <body>.
export default function DeferredSection({
  height,
  id,
  children,
}: {
  /** Approximate rendered height in px, used as the placeholder size */
  height: number
  /** Optional id (used as the progressive-hydration trigger on the homepage) */
  id?: string
  children: React.ReactNode
}) {
  return (
    <div id={id} style={{ contentVisibility: 'auto', containIntrinsicSize: `auto ${height}px` }}>
      {children}
    </div>
  )
}
