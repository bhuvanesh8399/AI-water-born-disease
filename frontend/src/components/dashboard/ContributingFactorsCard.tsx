export function ContributingFactorsCard({ factors }: { factors: string[] }) {
  return (
    <div className="glass-card">
      <div className="section-title">Contributing factors</div>
      <ul>
        {factors.map((factor) => (
          <li key={factor}>{factor}</li>
        ))}
      </ul>
    </div>
  )
}
