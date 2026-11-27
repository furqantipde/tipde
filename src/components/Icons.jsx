const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
}

export function SearchIcon(props) {
  return <svg {...base} {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
}

export function SunIcon(props) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
}

export function MoonIcon(props) {
  return <svg {...base} {...props}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
}

export function CopyIcon(props) {
  return <svg {...base} {...props}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
}

export function CheckIcon(props) {
  return <svg {...base} {...props}><path d="m5 12 4 4L19 6" /></svg>
}

export function DownloadIcon(props) {
  return <svg {...base} {...props}><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
}

export function TrashIcon(props) {
  return <svg {...base} {...props}><path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7" /></svg>
}

export function StarIcon({ filled = false, ...props }) {
  return <svg {...base} fill={filled ? 'currentColor' : 'none'} {...props}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /></svg>
}

export function ArrowIcon(props) {
  return <svg {...base} {...props}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
}

export function MenuIcon(props) {
  return <svg {...base} {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
}

export function CloseIcon(props) {
  return <svg {...base} {...props}><path d="M6 6l12 12M18 6 6 18" /></svg>
}

export function SparkIcon(props) {
  return <svg {...base} {...props}><path d="M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></svg>
}

export function BoltIcon(props) {
  return <svg {...base} {...props}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
}

export function ShieldIcon(props) {
  return <svg {...base} {...props}><path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
}

export function DeviceIcon(props) {
  return <svg {...base} {...props}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4" /></svg>
}
