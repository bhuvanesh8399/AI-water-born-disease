import type { PropsWithChildren } from 'react'
import { cn } from '../../lib/cn'

export function Badge({ children, tone }: PropsWithChildren<{ tone: string }>) {
  return <span className={cn('badge', tone)}>{children}</span>
}
