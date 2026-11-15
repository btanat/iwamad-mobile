export type CampusEvent = { id: number; title: string; date: string; place: string; seats: number }

export const events: CampusEvent[] = [
  { id: 1, title: 'React study night', date: '2026-11-05', place: 'Room 302', seats: 20 },
  { id: 2, title: 'Git and GitHub workshop', date: '2026-11-12', place: 'Lab 215', seats: 15 },
  { id: 3, title: 'Go language meetup', date: '2026-11-19', place: 'Room 118', seats: 12 },
  { id: 4, title: 'Portfolio review session', date: '2026-11-26', place: 'Library hall', seats: 3 },
]