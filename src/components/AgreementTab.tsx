import { useState } from 'react'
import { ActivityId, Agreement } from '../types'
import { ACTIVITIES, PRIORITIES, TAG_COLORS } from '../constants'
import { PlanBuilder } from './PlanBuilder'

interface Props {
  agreement: Agreement | null
  onSave: (a: Agreement) => void
  revisitBanner: boolean
}


export function AgreementTab({ agreement, onSave, revisitBanner }: Props) {
  const [selected, setSelected] = useState<Set<ActivityId>>(() => {
    if (!agreement) return new Set()
    const idMap: Record<string, ActivityId> = {
      'Digital art': 'art',
      'Pinterest & inspiration': 'pinterest',
      'Notes & planning': 'notes',
      Games: 'games',
      'YouTube & shows': 'youtube',
    }
    return new Set(agreement.activities.map(l => idMap[l]).filter(Boolean) as ActivityId[])
  })

  const [limits, setLimits] = useState({
    gamesLimit: agreement?.gamesLimit ?? '',
    youtubeWindow: agreement?.youtubeWindow ?? '',
    bedtime: agreement?.bedtime ?? '',
  })

  const [sigKid, setSigKid] = useState(agreement?.sigKid ?? '')
  const [sigParent, setSigParent] = useState(agreement?.sigParent ?? '')
  const [saved, setSaved] = useState(false)

  function toggleActivity(id: ActivityId) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleLimitChange(key: 'gamesLimit' | 'youtubeWindow' | 'bedtime', value: string) {
    setLimits(prev => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    const idToLabel: Record<ActivityId, string> = {
      art: 'Digital art',
      pinterest: 'Pinterest & inspiration',
      notes: 'Notes & planning',
      games: 'Games',
      youtube: 'YouTube & shows',
    }
    const data: Agreement = {
      activities: [...selected].map(id => idToLabel[id]),
      ...limits,
      sigKid,
      sigParent,
      savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    onSave(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 4000)
  }

  return (
    <div className="tab-content">
      {revisitBanner && (
        <div className="banner banner-amber">
          ↺ Revisiting — make your changes and re-sign together.
        </div>
      )}

      {/* What matters most */}
      <div className="card">
        <p className="sec-label">What matters most to me on screen</p>
        <p className="sec-hint">Tap everything that feels like you — your selections shape your plan below.</p>
        <div className="pill-row">
          {ACTIVITIES.map(a => {
            const colors = TAG_COLORS[a.tagColor]
            const on = selected.has(a.id)
            return (
              <button
                key={a.id}
                className={`pill ${on ? 'pill-on' : ''}`}
                style={on ? { background: colors.bg, color: colors.text, borderColor: colors.border } : {}}
                onClick={() => toggleActivity(a.id)}
              >
                {a.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Summer priorities */}
      <div className="card">
        <p className="sec-label">My summer priorities</p>
        <p className="sec-hint">Before worrying about screen time, I want to make sure I still have room for:</p>
        <div className="pri-grid">
          {PRIORITIES.map(p => (
            <div key={p} className="pri-item">
              <span className="pri-dot" />
              {p}
            </div>
          ))}
        </div>
        <p className="italic-hint">If screens start replacing these things, I'll make adjustments.</p>
      </div>

      {/* Plan */}
      <div className="card">
        <p className="sec-label">My screen time plan</p>
        <PlanBuilder selected={selected} limits={limits} onLimitChange={handleLimitChange} />
      </div>

      {/* Commitments */}
      <div className="card">
        <div className="commit-grid">
          <div className="commit-col">
            <p className="commit-label">What I'm committing to</p>
            {[
              "I'll notice how I feel after screen time.",
              "If something starts feeling unhealthy, I'll speak up.",
              "I won't let screens crowd out the things I care about.",
              "I'll be honest during check-ins.",
              "I can ask to revisit this agreement anytime.",
            ].map(c => (
              <div key={c} className="commit-item">
                <span className="commit-dot" />
                {c}
              </div>
            ))}
          </div>
          <div className="commit-col">
            <p className="commit-label">What my parent is committing to</p>
            {[
              "I trust you.",
              "I won't assume more screen time automatically means a problem.",
              "I won't change rules without talking with you first.",
              "I'll listen to your point of view.",
              "If something needs to change, we'll figure it out together.",
            ].map(c => (
              <div key={c} className="commit-item">
                <span className="commit-dot" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Check-in question */}
      <div className="card">
        <p className="sec-label">Our weekly check-in question</p>
        <p className="checkin-q">"Did your screens support the life you want this week, or get in the way of it?"</p>
      </div>

      {/* Signatures */}
      <div className="card">
        <p className="sec-label">Signatures</p>
        <p className="sig-note">Signed once at the start of summer. Revisit together anytime something needs updating.</p>
        <div className="sig-row">
          <div className="sig-block">
            <p className="sig-label">Signed by me</p>
            <input
              type="text"
              className="sig-input"
              placeholder="your name"
              value={sigKid}
              onChange={e => setSigKid(e.target.value)}
            />
          </div>
          <div className="sig-block">
            <p className="sig-label">Signed by my parent</p>
            <input
              type="text"
              className="sig-input"
              placeholder="parent name"
              value={sigParent}
              onChange={e => setSigParent(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button className="save-btn" onClick={handleSave}>
        {agreement ? '↺  Re-sign agreement' : '✎  Sign & save agreement'}
      </button>

      {saved && (
        <div className="banner banner-green">
          ✓ Agreement signed and saved! Head to Weekly check-in each week.
        </div>
      )}

      <p className="trust-note">
        This agreement is based on trust, not perfection. Everyone has off days.<br />
        We care more about patterns than individual days.
      </p>
      <p className="footer-note">Summer 2026 · revisit anytime</p>
    </div>
  )
}
