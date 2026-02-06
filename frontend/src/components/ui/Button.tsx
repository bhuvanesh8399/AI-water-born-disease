import { cn } from "../../utils/cn";

export function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "rounded-xl px-4 py-2 text-sm font-semibold",
        "bg-gradient-to-r from-sky-500/90 to-cyan-400/80 text-white shadow-glow",
        "hover:opacity-95 active:scale-[0.99] transition",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}
