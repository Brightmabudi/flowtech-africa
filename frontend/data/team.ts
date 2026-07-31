// ── Leadership / team page content ───────────────────────────────────────────
// PLACEHOLDER DATA — every profile here is a structural scaffold, not a real
// person. No real names, photos, biographies, LinkedIn URLs, or email
// addresses exist in this file. Replace each entry with real team member
// information before this page is treated as production-ready content.

export type TeamCategory = 'Executive' | 'Project Managers' | 'Developers' | 'Designers' | 'Support Team'

export interface TeamMember {
  id: string
  category: TeamCategory
  roleTitle: string // placeholder role title, e.g. "Chief Executive Officer"
}

export const TEAM_CATEGORIES: { category: TeamCategory; desc: string }[] = [
  { category: 'Executive',         desc: 'Company leadership and strategic direction.' },
  { category: 'Project Managers',  desc: 'Delivery, coordination, and client engagement.' },
  { category: 'Developers',        desc: 'Software, cloud, and platform engineering.' },
  { category: 'Designers',         desc: 'Product, UX, and visual design.' },
  { category: 'Support Team',      desc: '24/7 NOC, helpdesk, and client support.' },
]

export const TEAM: TeamMember[] = [
  { id: 'exec-1', category: 'Executive',        roleTitle: 'Chief Executive Officer' },

  { id: 'pm-1',   category: 'Project Managers',  roleTitle: 'Senior Project Manager' },
  { id: 'pm-2',   category: 'Project Managers',  roleTitle: 'Project Manager' },

  { id: 'dev-1',  category: 'Developers',        roleTitle: 'Full-Stack Developer' },
  { id: 'dev-2',  category: 'Developers',        roleTitle: 'Cloud & DevOps Engineer' },
  { id: 'dev-3',  category: 'Developers',        roleTitle: 'Backend Developer' },

  { id: 'des-1',  category: 'Designers',         roleTitle: 'UX / Product Designer' },
  { id: 'des-2',  category: 'Designers',         roleTitle: 'Visual Designer' },

  { id: 'sup-1',  category: 'Support Team',      roleTitle: 'Support Team Lead' },
  { id: 'sup-2',  category: 'Support Team',      roleTitle: 'NOC Engineer' },
  { id: 'sup-3',  category: 'Support Team',      roleTitle: 'Helpdesk Support Specialist' },
]
