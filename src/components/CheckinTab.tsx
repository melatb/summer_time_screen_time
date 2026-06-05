import { useState } from 'react'
import { Agreement, CheckinEntry } from '../types'
import { CHECKIN_ITEMS, ACTIVITY_CHECKIN_QUESTIONS } from '../constants'
import { CheckinHistory } from './CheckinHistory'

interface Props {
  agreement: Agreement | null
  history: CheckinEntry[]
  onSaveEntry: (entry: CheckinEntry) => void
  onGoToAgreement: () => void
}

export function CheckinTab({ agreement, history, onSaveEntry, onGoToAgreement }: Props) {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const [activityChecked, setActivityChecked] = useState<Set<number>>(new Set())
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  if (!agreement) {
    return (
      <div className="tab-content">
        <div className="card locked-card">
          <div className="lock-icon">✎</div>
          <p className="lock-text">Sign the agreement first, then come back here each week.</p>
          <button className="save-btn btn-inline" onClick={onGoToAgreement}>
            Go to agreement
          </button>
        </div>
      </div>
    )
  }

  const total = CHECKIN_ITEMS.length
  const score = checked.size
  const isGreat = score >= total - 1
  const isOk = score >= Math.floor(total / 2)

  function toggleChecked(i: number, isActivity = false) {
    if (isActivity) {
      setActivityChecked(prev => {
        const next = new Set(prev)
        if (next.has(i)) { next.delete(i) } else { next.add(i) }
        return next
      })
    } else {
      setChecked(prev => {
        const next = new Set(prev)
        if (next.has(i)) { next.delete(i) } else { next.add(i) }
        return next
      })
    }
  }

  function handleSave() {
    const entry: CheckinEntry = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      score,
      total,
      note,
    }
    onSaveEntry(entry)
    setChecked(new Set())
    setActivityChecked(new Set())
    setNote('')
    setSaved(true)
    setTimeout(() => setSaved(false), 4000)
  }

  const activityQuestions = agreement.activities
    .map(a => ACTIVITY_CHECKIN_QUESTIONS[a])
    .filter(Boolean)

  return (
    <div className="tab-content">
      {/* Weekly checklist */}
      <div className="card">
        <div className="checkin-header">
          <p className="sec-label" style={{ margin: 0 }}>This week's check-in</p>
          <span
            className="score-pill"
            style={{
              background: isGreat ? '#EAF3DE' : isOk ? '#FAEEDA' : 'var(--surface)',
              color: isGreat ? '#27500A' : isOk ? '#633806' : 'var(--text-muted)',
            }}
          >
            {score} / {total}
          </span>
        </div>
        <p className="sec-hint">At the end of this week, I can honestly say:</p>
        <div className="check-grid">
          {CHECKIN_ITEMS.map((item, i) => (
            <button
              key={i}
              className={`check-item ${checked.has(i) ? 'checked' : ''}`}
              onClick={() => toggleChecked(i)}
            >
              <span className="cbox">{checked.has(i) ? '✓' : ''}</span>
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Activity-specific questions */}
      {activityQuestions.length > 0 && (
        <div className="card">
          <p className="sec-label">My screen activities this week</p>
          <p className="sec-hint">Based on what matters to you — did these stay in balance?</p>
          <div className="check-grid">
            {activityQuestions.map((q, i) => (
              <button
                key={i}
                className={`check-item ${activityChecked.has(i) ? 'checked' : ''}`}
                onClick={() => toggleChecked(i, true)}
              >
                <span className="cbox">{activityChecked.has(i) ? '✓' : ''}</span>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Agreed limits reminder */}
      <div className="card">
        <p className="sec-label">My agreed limits</p>
        <div className="limits-list">
          <div className="limit-row">
            <span>Games</span>
            <span className="limit-value">{agreement.gamesLimit || '—'}</span>
          </div>
          <div className="limit-row">
            <span>YouTube & shows</span>
            <span className="limit-value">{agreement.youtubeWindow || '—'}</span>
          </div>
          <div className="limit-row last">
            <span>Screens off at</span>
            <span className="limit-value">{agreement.bedtime || '—'}</span>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="card">
        <p className="sec-label">Anything to talk about?</p>
        <p className="italic-hint">"Did your screens support the life you want this week, or get in the way of it?"</p>
        <textarea
          className="note-input"
          rows={3}
          placeholder="Good week, hard week, something that felt off, something that felt great..."
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      </div>

      <button className="save-btn" onClick={handleSave}>
        ✓  Save this week's check-in
      </button>

      {saved && (
        <div className="banner banner-green">
          ✓ Week saved! {score}/{total} priorities checked.
        </div>
      )}

      <CheckinHistory history={history} />
    </div>
  )
}
