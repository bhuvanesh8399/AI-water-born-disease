import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-blue-500 text-white hover:bg-blue-400 shadow-[0_8px_24px_rgba(59,130,246,0.28)]",
  secondary:
    "bg-white/8 text-slate-100 border border-white/10 hover:bg-white/12",
  ghost:
    "bg-transparent text-slate-300 hover:bg-white/8 hover:text-white",
  danger:
    "bg-red-500/90 text-white hover:bg-red-500 shadow-[0_8px_24px_rgba(239,68,68,0.22)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-xl",
  md: "h-10 px-4 text-sm rounded-xl",
  lg: "h-11 px-5 text-sm md:text-base rounded-2xl",
};

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        "focus:outline-none focus:ring-2 focus:ring-blue-400/50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
