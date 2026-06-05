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
    </div>
  )
}
