import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-white/10 to-white/5",
        "border border-white/15 backdrop-blur-xl",
        "shadow-[0_20px_50px_rgba(0,0,0,0.6)]",
        "transition hover:scale-[1.01] hover:shadow-2xl",
        className
      )}
    >
      <div className="relative p-6">{children}</div>
    </motion.div>
  );
}
