import React from "react"

interface IconProps {
  className?: string
  size?: number
}

export function CrossIcon({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <path d="M12 2v20M2 12h20" />
      <path d="M12 2l1.5 1.5M12 2l-1.5 1.5" opacity="0.5" />
    </svg>
  )
}

export function RosaryIcon({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v4" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M12 13.5v4" />
      <circle cx="12" cy="19" r="2" />
      <path d="M8 8l-2-2M16 8l2-2" />
      <circle cx="6" cy="6" r="1" />
      <circle cx="18" cy="6" r="1" />
    </svg>
  )
}

export function CathedralIcon({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <path d="M12 2L4 8v12h16V8L12 2z" />
      <path d="M12 2v4" />
      <path d="M8 8h8" />
      <path d="M10 12h4v8h-4z" />
      <circle cx="12" cy="5" r="1" fill="currentColor" />
    </svg>
  )
}

export function ChaliceIcon({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <path d="M8 2h8l-1 10H9L8 2z" />
      <path d="M9 12c0 2 1.5 3 3 3s3-1 3-3" />
      <path d="M12 15v4" />
      <path d="M9 19h6" />
      <circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export function BibleIcon({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <path d="M4 19V5a2 2 0 012-2h8a2 2 0 012 2v14" />
      <path d="M14 3v4a1 1 0 001 1h3a2 2 0 012 2v9a2 2 0 01-2 2H6" />
      <path d="M8 12h4M8 15h3" />
    </svg>
  )
}

export function CandleIcon({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <rect x="10" y="10" width="4" height="10" rx="1" />
      <path d="M12 10V6" />
      <path d="M12 6c-1-2 0-4 0-4s1 2 0 4" fill="currentColor" opacity="0.3" />
      <path d="M12 6c1-2 0-4 0-4s-1 2 0 4" fill="currentColor" opacity="0.3" />
      <ellipse cx="12" cy="4" rx="1.5" ry="2" fill="currentColor" opacity="0.2" />
    </svg>
  )
}

export function DoveIcon({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <path d="M12 4c-3 0-6 2-6 6 0 2 1 4 3 5l-1 5h4l-1-4" />
      <path d="M12 4c3 0 6 2 6 6 0 2-1 4-3 5" />
      <path d="M12 4l2-2M12 4l-1-1.5" />
      <circle cx="15" cy="6" r="0.5" fill="currentColor" />
    </svg>
  )
}
