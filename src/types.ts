export type ActivityId = 'art' | 'pinterest' | 'notes' | 'games' | 'youtube'

export interface ActivityConfig {
  id: ActivityId
  label: string
  tag: string
  tagColor: 'green' | 'purple' | 'pink' | 'blue' | 'amber'
  desc: string
  freeFlow: boolean
  fillLabel?: string
  placeholder?: string
  limitKey?: 'gamesLimit' | 'youtubeWindow'
}

export interface Agreement {
  activities: string[]
  gamesLimit: string
  youtubeWindow: string
  bedtime: string
  sigKid: string
  sigParent: string
  savedAt: string
}

export interface CheckinEntry {
  date: string
  score: number
  total: number
  note: string
}

export type TabId = 'agreement' | 'checkin'
