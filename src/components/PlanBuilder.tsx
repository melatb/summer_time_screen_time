import { ActivityId, Agreement } from '../types'
import { ACTIVITIES, TAG_COLORS } from '../constants'

interface Props {
  selected: Set<ActivityId>
  limits: Pick<Agreement, 'gamesLimit' | 'youtubeWindow' | 'bedtime'>
  onLimitChange: (key: 'gamesLimit' | 'youtubeWindow' | 'bedtime', value: string) => void
}

export function PlanBuilder({ selected, limits, onLimitChange }: Props) {
  if (selected.size === 0) {
    return <p className="empty-plan">Tap activities above to build your plan.</p>
  }

  const orderedIds: ActivityId[] = ['art', 'pinterest', 'notes', 'games', 'youtube']
  const rows = ACTIVITIES.filter(a => selected.has(a.id)).sort(
    (a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id)
  )

  return (
    <>
      {rows.map((cfg, i) => {
        const colors = TAG_COLORS[cfg.tagColor]
        return (
          <div key={cfg.id}>
            <div className="plan-row">
              <div className="plan-header">
                <p className="plan-title">{cfg.label}</p>
                <span
                  className="tag"
                  style={{ background: colors.bg, color: colors.text, border: `1.5px solid ${colors.border}` }}
                >
                  {cfg.tag}
                </span>
              </div>
              <p className="plan-desc">{cfg.desc}</p>
              {!cfg.freeFlow && cfg.limitKey && (
                <>
                  <p className="fill-label">{cfg.fillLabel}</p>
                  <input
                    type="text"
                    className="fill-input"
                    placeholder={cfg.placeholder}
                    value={limits[cfg.limitKey]}
                    onChange={e => onLimitChange(cfg.limitKey!, e.target.value)}
                  />
                </>
              )}
            </div>
            {i < rows.length - 1 && <div className="divider" />}
          </div>
        )
      })}

      <div className="divider" />

      <div className="plan-row">
        <div className="plan-header">
          <p className="plan-title">Screens before bed</p>
          <span className="tag" style={{ background: '#fff0d6', color: '#904010', border: '1.5px solid #ffb347' }}>
            one rule
          </span>
        </div>
        <p className="plan-desc">The one thing I agree to no matter what.</p>
        <p className="fill-label">Screens off at</p>
        <input
          type="text"
          className="fill-input"
          placeholder="e.g. 9:00 pm"
          value={limits.bedtime}
          onChange={e => onLimitChange('bedtime', e.target.value)}
        />
      </div>
    </>
  )
}
