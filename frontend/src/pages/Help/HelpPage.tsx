import { HelpCircle, Sparkles } from "lucide-react";

export function HelpPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/12 bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-white/12 bg-black/20 p-2">
            <HelpCircle className="h-5 w-5 text-amber-200" />
          </div>
          <div>
            <div className="text-xl font-extrabold">Help & Guidance</div>
            <div className="text-sm text-white/60">
              Quick notes for DHO / PHC users (demo).
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/12 bg-black/20 p-5">
            <div className="text-sm font-bold">How to use Alerts</div>
            <ul className="mt-2 space-y-2 text-sm text-white/70">
              <li>• Review severity (High/Critical) first</li>
              <li>• Acknowledge within 24 hours</li>
              <li>• Escalated alerts indicate non-response</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/12 bg-black/20 p-5">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Sparkles className="h-4 w-4 text-sky-200" />
              Explainable AI
            </div>
            <p className="mt-2 text-sm text-white/70">
              The system shows “why risk increased” using trend signals. It does not diagnose individuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
