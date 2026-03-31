import type { ReactNode } from 'react'

export function StatusPill({ children, level = 'neutral' }: { children: ReactNode; level?: 'neutral' | 'low' | 'medium' | 'high' }) {
  return <span className={`pill ${level}`}>{children}</span>
}
