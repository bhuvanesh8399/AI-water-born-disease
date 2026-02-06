import { GlassCard } from "../../components/ui/GlassCard";

export function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-sm text-white/60">Switch mode via env variables (safe for demo).</p>
      </div>

      <GlassCard>
        <div className="space-y-2 text-sm text-white/75">
          <div className="font-semibold text-white/85">Environment Controls</div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div>
              <span className="text-white/60">VITE_DATA_MODE</span> ={" "}
              <span className="font-semibold">MOCK</span> or{" "}
              <span className="font-semibold">API</span>
            </div>
            <div className="mt-1">
              <span className="text-white/60">VITE_API_BASE_URL</span> ={" "}
              <span className="font-semibold">http://localhost:8000</span>
            </div>
          </div>

          <div className="text-white/60">
            In Section 4, we’ll replace mock mode with FastAPI endpoints without changing UI.
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
