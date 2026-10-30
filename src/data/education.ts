import { Award, BookOpenCheck, Medal, Trophy } from 'lucide-react'
import type { Achievement, Education } from '../types'

export const education: Education[] = [
  {
    institution: 'International Institute of Information Technology, Hyderabad',
    short: 'IIIT Hyderabad',
    degree: 'M.Tech',
    field: 'Computer Science and Information Security',
    start: 'July 2023',
    end: 'May 2025',
    location: 'Hyderabad, Telangana',
    grade: 'CGPA 7.52 / 10',
    note: "Dean's List, Monsoon 2024",
  },
  {
    institution: 'Shri Vaishnav Vidyapeeth Vishwavidyalaya',
    short: 'SVVV Indore',
    degree: 'B.Tech',
    field: 'Computer Science and Engineering',
    start: 'July 2018',
    end: 'May 2022',
    location: 'Indore, Madhya Pradesh',
    grade: 'CGPA 8.5 / 10',
  },
]

export const achievements: Achievement[] = [
  { value: '96.79', title: 'GATE CS 2023', detail: 'Percentile in the national Graduate Aptitude Test in Engineering, Computer Science.', icon: Trophy },
  { value: 'Top 100', title: 'PGEE 2023', detail: "Ranked in the top 100 in IIIT Hyderabad's postgraduate entrance examination.", icon: Medal },
  { value: 'Qualified', title: 'BARC OCES/DGFS 2023', detail: 'Qualified the Bhabha Atomic Research Centre OCES/DGFS selection.', icon: Award },
  { value: "Dean's List", title: 'IIIT Hyderabad', detail: "Named to the Dean's List for academic performance, Monsoon 2024.", icon: BookOpenCheck },
]
