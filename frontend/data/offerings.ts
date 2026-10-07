// ── Offerings catalogue ──────────────────────────────────────────────────────
// Source: "FlowTech Africa Offerings" brochure. Rendered by components/Offerings.tsx.
// Icon names are resolved against the ICONS map in that component.

export interface OfferingItem { name: string; desc: string }
export interface OfferingCategory {
  title: string
  icon: string
  color: string
  image?: string
  items: OfferingItem[]
}

export const OFFERINGS: OfferingCategory[] = [
  {
    title: 'Artificial Intelligence & Analytics', icon: 'Brain', color: '#8B5CF6', image: '/images/ai-chip.webp',
    items: [
      { name: '4AI Suite (Finance, Operations, Customer, HR)', desc: 'Pre-built AI modules that deliver instant insights and automation across every department.' },
      { name: '4cast Predictive Analytics', desc: 'Forecast demand, risks and opportunities with South African-tuned machine-learning models.' },
      { name: 'Microsoft Power BI & Fabric', desc: 'Turn raw data into beautiful, real-time dashboards accessible from any device.' },
      { name: 'Azure AI & Machine Learning', desc: 'Build and deploy custom AI models without needing a PhD in data science.' },
      { name: 'Copilot for Microsoft 365', desc: 'Your everyday AI assistant inside Word, Excel, Teams and Outlook.' },
      { name: 'Data Warehousing & ETL', desc: 'Collect, clean and centralise all your data in one secure, high-speed lake.' },
      { name: 'Real-time Dashboards & Reporting', desc: 'Live visuals and automated reports that update the moment numbers change.' },
    ],
  },
  {
    title: 'Cloud Platforms & Infrastructure', icon: 'Cloud', color: '#0EA5E9', image: '/images/cloud.webp',
    items: [
      { name: 'Microsoft Azure (IaaS, PaaS, SaaS)', desc: "Pay-as-you-go cloud that scales instantly, hosted in Microsoft's Johannesburg and Cape Town data centres." },
      { name: 'Azure Virtual Desktop', desc: 'Full Windows experience on any device, anywhere in South Africa.' },
      { name: 'Azure Stack HCI', desc: 'Run Azure services on-premises for ultimate control and compliance.' },
      { name: 'Hybrid & Multi-Cloud Solutions', desc: 'Seamlessly connect Azure, AWS, on-prem and private clouds.' },
      { name: 'Cloud Migration & Modernisation', desc: 'Move legacy systems to the cloud with zero downtime and full local support.' },
      { name: 'High-Performance Computing (HPC)', desc: 'Massive parallel processing power for research, simulations and big analytics.' },
    ],
  },
  {
    title: 'Modern Workplace & Productivity', icon: 'LayoutGrid', color: '#5B35D5', image: '/images/workplace.webp',
    items: [
      { name: 'Microsoft 365 (Teams, Exchange, SharePoint, OneDrive)', desc: 'The complete productivity suite with enterprise-grade security and local data residency.' },
      { name: 'Microsoft Copilot', desc: 'AI that writes emails, summarises meetings and creates presentations in seconds.' },
      { name: 'Windows 365 Cloud PC', desc: 'Your own Windows desktop streamed from the cloud to any device.' },
      { name: 'Intune Device Management', desc: 'Centrally manage and secure every phone, tablet and laptop in your business.' },
      { name: 'Viva Employee Experience Platform', desc: 'Insights, wellbeing tools and learning, all inside Microsoft Teams.' },
      { name: 'Power Platform (Power Apps, Power Automate, Power Virtual Agents)', desc: 'Build custom apps, automate workflows and deploy chatbots with no coding required.' },
    ],
  },
  {
    title: 'Cybersecurity & Compliance', icon: 'ShieldCheck', color: '#E8401A',
    items: [
      { name: 'Microsoft Sentinel', desc: 'Cloud-native SIEM + SOAR that finds and stops threats before they spread.' },
      { name: 'Microsoft Defender Suite', desc: 'Complete protection for endpoints, identities, email and cloud workloads.' },
      { name: 'Acronis Cyber Protect Cloud', desc: 'Backup + next-generation antivirus + endpoint management in one solution.' },
      { name: 'Backup & Disaster Recovery', desc: 'Rapid, tested recovery of systems and data, guaranteeing business continuity.' },
      { name: 'Zero-Trust Architecture', desc: 'Verify every user and device, every time: the modern security standard.' },
      { name: 'POPIA & GDPR Compliance Solutions', desc: 'Tools and processes to keep you 100% compliant with South African and international laws.' },
      { name: 'Penetration Testing & Vulnerability Management', desc: 'Find and fix weaknesses before the hackers do, performed by certified local experts.' },
    ],
  },
  {
    title: 'Networking & Connectivity', icon: 'Network', color: '#10B981', image: '/images/network.webp',
    items: [
      { name: 'Cisco Meraki Cloud-Managed Networks', desc: 'Wi-Fi, switching and security managed from a single dashboard.' },
      { name: 'SD-WAN & SASE', desc: 'Intelligent, secure connectivity that prioritises critical traffic anywhere in SA.' },
      { name: 'Fortinet Next-Gen Firewalls', desc: 'High-performance threat protection for branches, data centres and cloud.' },
      { name: 'Secure Remote Access (VPN & ZTNA)', desc: 'Safe, fast access for remote and hybrid workers, with no complexity.' },
      { name: 'Zero-Trust Architecture', desc: 'Verify every user and device, every time: the modern security standard.' },
      { name: 'Wi-Fi 6E & Private 5G', desc: 'Ultra-fast, reliable wireless for warehouses, campuses and large offices.' },
    ],
  },
  {
    title: 'Data Centre & Infrastructure', icon: 'Server', color: '#06B6D4',
    items: [
      { name: 'Dell Technologies PowerEdge & Storage', desc: 'Industry-leading servers and storage optimised for South African workloads.' },
      { name: 'HPE ProLiant & Alletra', desc: 'Reliable, high-density infrastructure with built-in predictive analytics.' },
      { name: 'Nutanix Hyper-Converged Infrastructure', desc: 'Simplify your data centre: compute, storage and networking in one platform.' },
      { name: 'VMware & Hyper-V Virtualisation', desc: 'Run multiple virtual servers on a single physical box with maximum efficiency.' },
      { name: 'Veeam Backup & Replication', desc: 'The gold standard in backup: fast, verified and ransomware-proof.' },
    ],
  },
  {
    title: 'Licensing & Procurement', icon: 'KeyRound', color: '#F59E0B',
    items: [
      { name: 'Microsoft CSP Licensing', desc: 'Flexible, month-to-month licensing with FlowTech as your trusted local partner.' },
      { name: 'Adobe, Autodesk, Veeam, Acronis', desc: 'Genuine software licences at competitive prices with expert advice.' },
      { name: 'Software Asset Management (SAM)', desc: 'Full visibility and control of every licence in your organisation.' },
      { name: 'Cost-Optimisation Reviews', desc: 'Free audit that typically saves clients 15–30% on software spend.' },
    ],
  },
  {
    title: 'Professional Services', icon: 'Briefcase', color: '#EC4899',
    items: [
      { name: 'Discovery Workshops', desc: 'Half-day sessions to map your exact needs and priorities.' },
      { name: 'Solution Architecture & Design', desc: 'Detailed technical blueprints tailored to your environment.' },
      { name: 'Project Management', desc: 'PRINCE2/PMBOK-certified delivery with zero surprises.' },
      { name: 'Implementation & Migration', desc: 'Smooth, low-risk rollouts with full knowledge transfer.' },
      { name: 'Change Management & Training', desc: 'Custom programmes so your team embraces the new tools from day one.' },
      { name: 'Ongoing Support & Optimisation', desc: 'Dedicated Pretoria-based help desk and proactive account management.' },
    ],
  },
]
