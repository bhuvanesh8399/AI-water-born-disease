import type { ReactNode } from "react";
import clsx from "clsx";
import type { RiskLevel } from "../../types/domain";
import { RISK_LABELS } from "../../types/domain";

type BadgeTone =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "critical";

type Props = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const toneClasses: Record<BadgeTone, string> = {
  default: "bg-white/8 text-slate-200 border border-white/10",
  info: "bg-sky-500/15 text-sky-300 border border-sky-500/25",
  success: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
  warning: "bg-amber-500/15 text-amber-300 border border-amber-500/25",
  danger: "bg-red-500/15 text-red-300 border border-red-500/25",
  critical: "bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/25",
};

const riskTones: Record<RiskLevel, BadgeTone> = {
  LOW: "success",
  MEDIUM: "warning",
  HIGH: "danger",
  CRITICAL: "critical",
};

export default function Badge({
  children,
  tone = "default",
  className,
}: Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <Badge
      tone={riskTones[level]}
      className="gap-2 px-3 py-1 font-semibold tracking-[0.14em] uppercase"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {RISK_LABELS[level]}
    </Badge>
  );
}
