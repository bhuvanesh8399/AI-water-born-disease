import type { ReactNode } from "react";
import clsx from "clsx";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export default function GlassCard({
  children,
  className,
  interactive = false,
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        "panel p-4 md:p-5",
        interactive && "panel-hover",
        className
      )}
    >
      {children}
    </div>
  );
}
