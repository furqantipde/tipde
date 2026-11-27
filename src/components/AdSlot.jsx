import { site } from '../config/site.js'

/**
 * Non-intrusive advertising container. Renders nothing until advertising is
 * explicitly enabled with VITE_ENABLE_ADS=true, so there are no fake ads and
 * no interference with tool controls.
 */
export default function AdSlot({ id, className = '' }) {
  if (!site.adsEnabled) return null
  return <div data-ad-slot={id} aria-hidden="true" className={`min-h-[90px] ${className}`} />
}
