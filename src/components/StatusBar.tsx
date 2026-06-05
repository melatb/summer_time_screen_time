import { Agreement } from '../types'

interface Props {
  agreement: Agreement | null
  onRevisit: () => void
}

export function StatusBar({ agreement, onRevisit }: Props) {
  if (!agreement) {
    return (
      <div className="status-bar unsigned">
        <span className="status-left">
          <span className="status-icon">○</span>
          Not yet signed — fill out and save to activate
        </span>
      </div>
    )
  }

  const names = [agreement.sigKid, agreement.sigParent].filter(Boolean).join(' & ')

  return (
    <div className="status-bar signed">
      <span className="status-left">
        <span className="status-icon">✓</span>
        Signed{names ? ` by ${names}` : ''} on {agreement.savedAt}
      </span>
      <button className="revisit-btn" onClick={onRevisit}>
        Revisit agreement
      </button>
    </div>
  )
}
