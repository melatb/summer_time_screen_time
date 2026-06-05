import { useState } from 'react'
import { Agreement, CheckinEntry, TabId } from './types'
import { useLocalStorage } from './hooks/useStorage'
import { StatusBar } from './components/StatusBar'
import { AgreementTab } from './components/AgreementTab'
import { CheckinTab } from './components/CheckinTab'

export default function App() {
  const [agreement, setAgreement] = useLocalStorage<Agreement | null>('sca-agreement-v1', null)
  const [history, setHistory] = useLocalStorage<CheckinEntry[]>('sca-checkin-history-v1', [])
  const [activeTab, setActiveTab] = useState<TabId>('agreement')
  const [revisitBanner, setRevisitBanner] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  function handleSaveAgreement(data: Agreement) {
    setAgreement(data)
    setRevisitBanner(false)
  }

  function handleRevisit() {
    setActiveTab('agreement')
    setRevisitBanner(true)
    setTimeout(() => setRevisitBanner(false), 5000)
  }

  function handleSaveCheckin(entry: CheckinEntry) {
    setHistory(prev => [entry, ...prev].slice(0, 12))
  }

  function handleReset() {
    setAgreement(null)
    setHistory([])
    setShowResetConfirm(false)
    setActiveTab('agreement')
  }

  return (
    <div className="app">
      <div className="app-header">
        <p className="app-title">my screen time — my choice</p>
        <p className="app-subtitle">an agreement I made with myself (and my parent) this summer</p>
      </div>

      <div className="wave-strip" />

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'agreement' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('agreement')}
        >
          our agreement
        </button>
        <button
          className={`tab ${activeTab === 'checkin' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('checkin')}
        >
          weekly check-in
        </button>
      </div>

      <StatusBar agreement={agreement} onRevisit={handleRevisit} />

      {activeTab === 'agreement' && (
        <AgreementTab
          agreement={agreement}
          onSave={handleSaveAgreement}
          revisitBanner={revisitBanner}
        />
      )}

      {activeTab === 'checkin' && (
        <CheckinTab
          agreement={agreement}
          history={history}
          onSaveEntry={handleSaveCheckin}
          onGoToAgreement={() => setActiveTab('agreement')}
        />
      )}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            style={{
              fontFamily: 'var(--font)',
              fontSize: '11px',
              color: 'var(--text-hint)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '4px',
            }}
          >
            start fresh / clear all data
          </button>
        ) : (
          <div style={{
            background: 'white',
            border: '1px solid var(--border-med)',
            borderRadius: 'var(--radius)',
            padding: '1rem 1.25rem',
            maxWidth: '320px',
            margin: '0 auto',
          }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              This will delete the agreement and all check-in history. Are you sure?
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                onClick={handleReset}
                style={{
                  fontFamily: 'var(--font)',
                  fontSize: '13px',
                  padding: '6px 16px',
                  borderRadius: '10px',
                  border: '1px solid #ffb347',
                  background: '#fff0d6',
                  color: '#904010',
                  cursor: 'pointer',
                }}
              >
                Yes, start fresh
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                style={{
                  fontFamily: 'var(--font)',
                  fontSize: '13px',
                  padding: '6px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-med)',
                  background: 'white',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                Cancel
          </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
