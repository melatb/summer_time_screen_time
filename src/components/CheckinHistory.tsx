import { CheckinEntry } from '../types'

interface Props {
  history: CheckinEntry[]
}

export function CheckinHistory({ history }: Props) {
  if (history.length === 0) return null

  return (
    <div className="history-section">
      <p className="sec-label">Recent check-ins</p>
      {history.map((entry, i) => {
        const isGreat = entry.score >= entry.total - 1
        const isOk = entry.score >= Math.floor(entry.total / 2)
        return (
          <div key={i} className="history-card">
            <div className="history-header">
              <span className="history-date">{entry.date}</span>
              <span
                className="score-badge"
                style={{
                  background: isGreat ? '#EAF3DE' : isOk ? '#FAEEDA' : 'var(--surface)',
                  color: isGreat ? '#27500A' : isOk ? '#633806' : 'var(--text-muted)',
                }}
              >
                {entry.score}/{entry.total}
              </span>
            </div>
            {entry.note && <p className="history-note">"{entry.note}"</p>}
          </div>
        )
      })}
    </div>
  )
}
