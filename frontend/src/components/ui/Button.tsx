import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '../../lib/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({ children, variant = 'primary', className, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button className={cn('button', variant, className)} {...props}>
      {children}
    </button>
  )
}
