import { ActivityConfig } from './types'

export const ACTIVITIES: ActivityConfig[] = [
  {
    id: 'art',
    label: 'Digital art',
    tag: 'free flow',
    tagColor: 'green',
    desc: 'Art & creative apps — managed freely, no timer needed.',
    freeFlow: true,
  },
  {
    id: 'pinterest',
    label: 'Pinterest & inspiration',
    tag: 'free flow',
    tagColor: 'green',
    desc: 'Browsing for ideas — set a visible timer to avoid endless scrolling.',
    freeFlow: true,
  },
  {
    id: 'notes',
    label: 'Notes & planning',
    tag: 'free flow',
    tagColor: 'green',
    desc: 'Writing, planning, ideas — always fine, no limit needed.',
    freeFlow: true,
  },
  {
    id: 'games',
    label: 'Games',
    tag: 'my limit',
    tagColor: 'purple',
    desc: "Fun — I'll pay attention to how I'm feeling and set my own timer.",
    freeFlow: false,
    fillLabel: 'I will allow myself',
    placeholder: 'e.g. 30 minutes',
    limitKey: 'gamesLimit',
  },
  {
    id: 'youtube',
    label: 'YouTube & shows',
    tag: 'my limit',
    tagColor: 'pink',
    desc: "Entertainment is fun — I don't want endless scrolling to take over my day.",
    freeFlow: false,
    fillLabel: 'I will allow myself',
    placeholder: 'e.g. after lunch, 30 min',
    limitKey: 'youtubeWindow',
  },
]

export const PRIORITIES = [
  'Reading',
  'Being active',
  'Friends & family',
  'Creative projects',
  'Nourishment',
  'Self-care',
  'Learning new things',
  'Rest',
]

export const CHECKIN_ITEMS = [
  'I spent time being active.',
  'I spent time reading.',
  'I spent time with family or friends.',
  'I worked on something creative.',
  'I nourished my body well.',
  'I took care of myself.',
  'Screens felt fun, not overwhelming.',
  "I wasn't constantly thinking about getting back on a screen.",
]

export const ACTIVITY_CHECKIN_QUESTIONS: Record<string, string> = {
  'Digital art': 'I made time for digital art.',
  'Pinterest & inspiration': 'I used Pinterest for inspiration, not just scrolling.',
  'Notes & planning': 'I used my notes to plan or create something.',
  Games: 'Games felt fun, not compulsive.',
  'YouTube & shows': 'YouTube/shows stayed within my limit.',
}

export const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  green:  { bg: '#d6f5ff', text: '#006080', border: '#5ad8f5' },
  purple: { bg: '#f3eeff', text: '#5030a0', border: '#c9aaff' },
  pink:   { bg: '#ffe0ec', text: '#a02050', border: '#ff8ab0' },
  blue:   { bg: '#d6f5ff', text: '#006080', border: '#5ad8f5' },
  amber:  { bg: '#fff0d6', text: '#904010', border: '#ffb347' },
}
