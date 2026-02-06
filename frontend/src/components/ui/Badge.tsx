import type { RiskLevel } from "../../types/domain";
import { cn } from "../../utils/cn";

const styles: Record<RiskLevel, string> = {
  LOW: "bg-emerald-500/15 text-emerald-200 border-emerald-400/20",
  MEDIUM: "bg-sky-500/15 text-sky-200 border-sky-400/20",
  HIGH: "bg-amber-500/15 text-amber-200 border-amber-400/20",
  CRITICAL: "bg-rose-500/15 text-rose-200 border-rose-400/20",
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        styles[level]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {level}
    </span>
  );
}
