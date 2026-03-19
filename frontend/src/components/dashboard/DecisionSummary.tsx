export function DecisionSummary({ summary }: { summary: string }) {
  return (
    <div className="glass-card">
      <div className="section-title">Decision summary</div>
      <p className="muted">{summary}</p>
    </div>
  )
}
