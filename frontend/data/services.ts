// ── Service page content ─────────────────────────────────────────────────────
// Single source of truth for all /services/[slug] detail pages. Rendered by
// frontend/components/ServicePageTemplate.tsx. Icon names are looked up
// against the ICONS map in that file (kept as strings here so this stays a
// plain data module).
//
// Case studies are representative/illustrative engagements only — no client
// names, logos, or attributed outcomes, per the site's confidentiality policy
// (see FeaturedProjects.tsx for the equivalent homepage-level treatment).

export interface ServiceBenefit { title: string; desc: string }
export interface ServiceProcessStep { step: string; title: string; desc: string }
export interface ServiceCaseStudy { title: string; category: string; desc: string; scope: string[] }
export interface ServiceFAQ { q: string; a: string }

export interface ServiceDefinition {
  slug: string
  navTitle: string
  title: string
  tagline: string
  icon: string
  color: string
  overview: { heading: string; paragraphs: string[] }
  benefits: ServiceBenefit[]
  technologies: string[]
  process: ServiceProcessStep[]
  caseStudies: ServiceCaseStudy[]
  faq: ServiceFAQ[]
}

export const SERVICES: ServiceDefinition[] = [
  {
    slug: 'software-development',
    navTitle: 'Software Development',
    title: 'Software Development',
    tagline: 'Secure, tailor-made software that adapts to how your business actually works.',
    icon: 'Code',
    color: '#5B35D5',
    overview: {
      heading: 'Custom software, built around your business — not the other way around',
      paragraphs: [
        'Off-the-shelf platforms force your business to adapt to their limitations. We build custom software — from internal business systems to client-facing applications — designed around your actual workflows, integrated with the systems you already run.',
        'Every engagement starts with understanding your requirements before writing a line of code. The result is software that streamlines operations, automates manual workflows, and scales with you, without the restrictive licensing fees typical of large enterprise vendors.',
      ],
    },
    benefits: [
      { title: 'Built for your workflows', desc: 'No forcing your business processes into a generic template — we design around how your teams actually work.' },
      { title: 'No licensing lock-in', desc: 'Own your platform outright. No per-seat fees, no vendor lock-in, no surprise renewal costs.' },
      { title: 'Secure by design', desc: 'Security architecture is built in from day one, not bolted on after a breach.' },
      { title: 'Seamless integration', desc: 'Connects cleanly with your existing ERP, CRM, and operational systems.' },
    ],
    technologies: ['TypeScript', 'React & Next.js', 'Node.js', '.NET', 'PostgreSQL', 'REST & GraphQL APIs', 'CI/CD', 'Docker'],
    process: [
      { step: '01', title: 'Discovery', desc: 'We map your current processes, pain points, and integration requirements before proposing anything.' },
      { step: '02', title: 'Design & Architecture', desc: 'Solution architecture, data modelling, and UX design signed off before development starts.' },
      { step: '03', title: 'Build & Iterate', desc: 'Agile development with regular demos, so you see progress and can redirect early.' },
      { step: '04', title: 'Deploy & Support', desc: 'Production rollout with ongoing support, monitoring, and iteration as your business evolves.' },
    ],
    caseStudies: [
      { title: 'Internal Operations Platform Build', category: 'Business Systems', desc: 'A custom internal platform replacing a patchwork of spreadsheets and manual approval chains with a single automated workflow system.', scope: ['Requirements mapping', 'Custom build', 'Staff onboarding'] },
      { title: 'Client-Facing Portal Development', category: 'Web Application', desc: 'A secure client portal giving customers self-service access to documents, billing, and support — reducing inbound support volume.', scope: ['UX design', 'Secure authentication', 'API integration'] },
    ],
    faq: [
      { q: 'Do you build on our existing systems or start from scratch?', a: 'Both — most engagements integrate with systems you already run (ERP, CRM, accounting) rather than replacing them outright, unless a full rebuild genuinely serves you better.' },
      { q: 'Who owns the code once the project is complete?', a: 'You do. There’s no licensing lock-in — the platform and its source code belong to your business.' },
      { q: 'How do you handle ongoing changes after launch?', a: 'Our support model includes iteration post-launch, not just bug fixes — your platform should evolve as your business does.' },
      { q: 'Can you work with our in-house development team?', a: 'Yes — many engagements are collaborative, augmenting an existing internal team rather than replacing it.' },
    ],
  },
  {
    slug: 'ai-solutions',
    navTitle: 'AI Solutions',
    title: 'AI Solutions',
    tagline: 'Practical AI that removes manual work — not hype for its own sake.',
    icon: 'Sparkles',
    color: '#8B5CF6',
    overview: {
      heading: 'AI that solves real operational problems',
      paragraphs: [
        'We deploy AI where it removes genuine friction — intelligent document processing, predictive maintenance, automated workflows, and decision-support tooling — rather than chasing AI for its own sake.',
        'Every AI deployment is grounded in your actual data and constraints, with clear guardrails around accuracy, cost, and data governance. The goal is measurable operational efficiency, not a proof-of-concept that never reaches production.',
      ],
    },
    benefits: [
      { title: 'Grounded in real data', desc: 'Models are built and validated against your actual operational data, not generic benchmarks.' },
      { title: 'Human-in-the-loop by default', desc: 'AI augments decision-making — critical workflows keep a human checkpoint where it matters.' },
      { title: 'Clear cost governance', desc: 'Transparent modelling of inference costs before deployment, not surprise bills after.' },
      { title: 'Production-focused', desc: 'We build for deployment and maintenance, not just a demo that never ships.' },
    ],
    technologies: ['Python', 'LLM APIs', 'Vector Databases', 'Intelligent Document Processing', 'Predictive Analytics', 'RPA', 'MLOps'],
    process: [
      { step: '01', title: 'Use-Case Assessment', desc: 'We identify where AI genuinely reduces manual effort or improves decisions — and where it doesn’t.' },
      { step: '02', title: 'Data Readiness', desc: 'Assess and prepare the data your use case depends on before any model work begins.' },
      { step: '03', title: 'Build & Validate', desc: 'Iterative model development with accuracy and cost benchmarks agreed upfront.' },
      { step: '04', title: 'Deploy & Monitor', desc: 'Production deployment with ongoing monitoring for drift, cost, and accuracy over time.' },
    ],
    caseStudies: [
      { title: 'Intelligent Document Processing Rollout', category: 'Process Automation', desc: 'Automated extraction and classification of high-volume incoming documents, cutting manual data-capture time significantly.', scope: ['Document classification', 'Data extraction', 'Workflow integration'] },
      { title: 'Predictive Maintenance Pilot', category: 'Operational AI', desc: 'A predictive model flagging equipment maintenance needs ahead of failure, reducing unplanned downtime.', scope: ['Sensor data pipeline', 'Predictive modelling', 'Alerting integration'] },
    ],
    faq: [
      { q: 'Do we need our own data science team to work with you?', a: 'No — we handle the modelling and MLOps. Your team’s role is providing domain context and validating outputs.' },
      { q: 'How do you keep AI costs predictable?', a: 'We model expected inference volumes and costs before deployment, and monitor spend continuously afterward.' },
      { q: 'Will AI replace our staff’s roles?', a: 'Our deployments are designed to remove repetitive manual work, not decision-making authority — human oversight stays in the loop for consequential decisions.' },
      { q: 'What if our data isn’t clean enough for AI yet?', a: 'Data readiness assessment is part of our process — we’ll tell you honestly if data preparation needs to happen first.' },
    ],
  },
  {
    slug: 'cloud-computing',
    navTitle: 'Cloud Computing',
    title: 'Cloud Computing',
    tagline: 'Scalable cloud infrastructure built for African bandwidth realities.',
    icon: 'Cloud',
    color: '#5B35D5',
    overview: {
      heading: 'Cloud environments designed for how Africa actually connects',
      paragraphs: [
        'Generic cloud migrations designed for European or North American bandwidth conditions routinely underperform when deployed across African infrastructure. We design hybrid, multi-cloud, and full-cloud environments around the connectivity and latency realities of the markets you actually operate in.',
        'Whether it’s a phased migration from legacy on-premise infrastructure or a cloud-native build from day one, the focus is cost-optimised, resilient infrastructure — not just "lift and shift" for its own sake.',
      ],
    },
    benefits: [
      { title: 'Built for African connectivity', desc: 'Architecture accounts for bandwidth and latency realities other providers overlook.' },
      { title: 'Zero-downtime migration', desc: 'Phased cutover planning designed to keep production systems live throughout.' },
      { title: 'Cost-optimised by design', desc: 'Right-sized infrastructure from the start — not over-provisioned and left to sprawl.' },
      { title: 'Vendor-agnostic', desc: 'AWS, Azure, or GCP — we design around what suits your workload, not a single vendor relationship.' },
    ],
    technologies: ['AWS', 'Microsoft Azure', 'Google Cloud Platform', 'Kubernetes', 'Docker', 'Terraform', 'Private Cloud', 'Hybrid Architecture'],
    process: [
      { step: '01', title: 'Workload Assessment', desc: 'Full audit of current infrastructure, dependencies, and what actually needs to move.' },
      { step: '02', title: 'Architecture Design', desc: 'Target-state architecture designed around cost, resilience, and bandwidth realities.' },
      { step: '03', title: 'Phased Migration', desc: 'Staged cutover minimising risk to production systems, with rollback plans at every stage.' },
      { step: '04', title: 'Optimise & Support', desc: 'Ongoing cost and performance optimisation once workloads are live.' },
    ],
    caseStudies: [
      { title: 'Enterprise Hybrid Cloud Migration', category: 'Cloud Migration', desc: 'A phased migration of on-premise workloads to a hybrid cloud environment, designed around zero-downtime cutover.', scope: ['Workload assessment', 'Phased cutover', 'Cost optimisation'] },
      { title: 'Multi-Cloud Disaster Recovery Build', category: 'Resilience', desc: 'A cross-provider disaster recovery architecture reducing recovery time objectives for mission-critical systems.', scope: ['DR architecture', 'Failover testing', 'Runbook documentation'] },
    ],
    faq: [
      { q: 'Which cloud provider do you recommend?', a: 'It depends on your workload, existing licensing, and data residency needs — we design around what fits, not a single preferred vendor.' },
      { q: 'Can you migrate us without downtime?', a: 'Most migrations are designed for zero-downtime cutover using phased migration and parallel-running strategies.' },
      { q: 'Do you manage the cloud environment after migration?', a: 'Yes — ongoing cost optimisation, monitoring, and management are part of our managed cloud offering.' },
      { q: 'Is a full cloud migration the right move for every business?', a: 'No — hybrid approaches are often more cost-effective. We’ll tell you honestly if full migration doesn’t make sense yet.' },
    ],
  },
  {
    slug: 'cyber-security',
    navTitle: 'Cyber Security',
    title: 'Cyber Security',
    tagline: 'Enterprise-grade protection built on zero-trust, not perimeter assumptions.',
    icon: 'Shield',
    color: '#E8401A',
    overview: {
      heading: 'Security architected in from day one — not bolted on after an incident',
      paragraphs: [
        'Every solution we deliver is architected with zero-trust principles from the start. That means SOC-as-a-Service monitoring, threat intelligence, and 24/7 incident response, backed by certified analysts who understand African threat landscapes specifically.',
        'Security isn’t a checkbox exercise — it’s baked into every layer of the stack we build or manage, from network edge to application code.',
      ],
    },
    benefits: [
      { title: 'Zero-trust by default', desc: 'No implicit trust based on network location — every access request is verified.' },
      { title: '24/7 SOC monitoring', desc: 'Continuous threat monitoring and incident response, not business-hours-only coverage.' },
      { title: 'Rapid response times', desc: 'Certified analysts on call around the clock to contain and remediate incidents fast.' },
      { title: 'Compliance-ready', desc: 'Security posture aligned to ISO 27001 and relevant regulatory frameworks from the outset.' },
    ],
    technologies: ['SOC-as-a-Service', 'SIEM', 'Zero Trust Architecture', 'Penetration Testing', 'Threat Intelligence', 'Endpoint Detection & Response', 'ISO 27001'],
    process: [
      { step: '01', title: 'Security Assessment', desc: 'Full audit of your current security posture, gaps, and exposure across the estate.' },
      { step: '02', title: 'Architecture & Hardening', desc: 'Zero-trust architecture design and remediation of identified vulnerabilities.' },
      { step: '03', title: 'SOC Deployment', desc: 'Continuous monitoring deployed across endpoints, network, and cloud environments.' },
      { step: '04', title: '24/7 Response', desc: 'Ongoing monitoring with certified analysts ready to contain and respond to incidents.' },
    ],
    caseStudies: [
      { title: '24/7 Managed Security Operations', category: 'SOC Deployment', desc: 'Continuous SOC monitoring and incident response deployed to bring mean-time-to-respond down across a distributed enterprise estate.', scope: ['SOC deployment', 'Threat monitoring', 'Incident response'] },
      { title: 'Post-Incident Zero-Trust Rebuild', category: 'Security Architecture', desc: 'A full zero-trust architecture rebuild following a security incident, closing the access-control gaps that enabled it.', scope: ['Incident review', 'Architecture redesign', 'Staff security training'] },
    ],
    faq: [
      { q: 'What does "zero trust" actually mean in practice?', a: 'No user or device is trusted by default, even inside the network perimeter — every access request is verified against policy.' },
      { q: 'Do you offer SOC monitoring as a standalone service?', a: 'Yes — SOC-as-a-Service can be deployed independently of other engagements, covering endpoints, network, and cloud.' },
      { q: 'How fast is your incident response time?', a: 'Our certified analysts operate 24/7 specifically to minimise the gap between detection and containment.' },
      { q: 'Can you help us achieve ISO 27001 compliance?', a: 'Yes — compliance alignment is built into our security architecture work, not treated as a separate exercise.' },
    ],
  },
  {
    slug: 'managed-it-services',
    navTitle: 'Managed IT Services',
    title: 'Managed IT Services',
    tagline: 'Full-stack IT operations, so your team can focus on growth, not tickets.',
    icon: 'Settings',
    color: '#0EA5E9',
    overview: {
      heading: 'Your IT operations, fully managed',
      paragraphs: [
        'From monitoring and patching to helpdesk and lifecycle management, we run the full operational stack so your internal team isn’t buried in day-to-day ticket resolution.',
        'Our NOC and helpdesk teams operate around the clock, with proactive monitoring designed to catch issues before they become outages — not just react once something has already broken.',
      ],
    },
    benefits: [
      { title: 'Proactive, not reactive', desc: 'Monitoring designed to catch problems before they become downtime.' },
      { title: '24/7 NOC & helpdesk', desc: 'Real engineers on call around the clock, with average first response under 15 minutes.' },
      { title: 'Predictable costs', desc: 'Fixed-scope managed services replace unpredictable break-fix billing.' },
      { title: 'Frees your internal team', desc: 'Your staff focus on strategic work, not routine IT operations and firefighting.' },
    ],
    technologies: ['NOC Monitoring', 'Remote Support', 'ITSM', 'Patch Management', 'Endpoint Management', 'Backup & Recovery', 'Helpdesk Platforms'],
    process: [
      { step: '01', title: 'Environment Audit', desc: 'Full inventory and health assessment of your current IT environment.' },
      { step: '02', title: 'Onboarding & Baseline', desc: 'Monitoring and management tooling deployed, baseline established for your estate.' },
      { step: '03', title: 'Proactive Management', desc: 'Ongoing patching, monitoring, and maintenance to prevent issues before they occur.' },
      { step: '04', title: 'Reporting & Optimisation', desc: 'Regular reporting on system health, with continuous optimisation recommendations.' },
    ],
    caseStudies: [
      { title: 'Full-Estate IT Operations Handover', category: 'Managed Services', desc: 'A complete handover of day-to-day IT operations, freeing an internal team to focus on strategic projects instead of ticket queues.', scope: ['Environment audit', 'NOC deployment', 'Helpdesk transition'] },
      { title: 'Legacy Environment Stabilisation', category: 'IT Operations', desc: 'Stabilisation of an under-maintained legacy IT environment, cutting recurring outage incidents through proactive patching and monitoring.', scope: ['Health assessment', 'Patch remediation', 'Ongoing monitoring'] },
    ],
    faq: [
      { q: 'Do you replace our internal IT team or work alongside them?', a: 'Most engagements augment an existing internal team, taking routine operations off their plate so they can focus on strategic work.' },
      { q: 'What are your support response times?', a: 'Our NOC and helpdesk teams average under 15 minutes for first response, operating 24/7.' },
      { q: 'Is managed IT billed per-incident or a fixed fee?', a: 'Fixed-scope managed services, giving you predictable monthly costs instead of unpredictable break-fix billing.' },
      { q: 'Can you take over an environment you didn’t originally set up?', a: 'Yes — environment audits at the start of engagement are specifically designed to onboard existing, unfamiliar infrastructure.' },
    ],
  },
  {
    slug: 'networking',
    navTitle: 'Networking',
    title: 'Networking & Connectivity',
    tagline: 'High-performance connectivity across African markets, with guaranteed SLAs.',
    icon: 'Network',
    color: '#10B981',
    overview: {
      heading: 'Connectivity that actually holds up across borders',
      paragraphs: [
        'High-performance SD-WAN, MPLS, and fibre connectivity, deployed and centrally managed across multiple African countries — with guaranteed SLAs, not best-effort promises.',
        'Legacy point-to-point links that worked for a single-country footprint routinely fail to scale cleanly across a multi-country retail, branch, or site network. We design for that reality from the outset.',
      ],
    },
    benefits: [
      { title: 'Multi-country delivery', desc: 'Consistent connectivity architecture deployed across borders, not single-country point solutions.' },
      { title: 'Guaranteed SLAs', desc: 'Contracted uptime and performance commitments, not best-effort connectivity.' },
      { title: 'Centralised management', desc: 'Single pane of glass visibility across every site, regardless of location.' },
      { title: 'Resilient by design', desc: 'Automatic failover between links keeps sites online through local outages.' },
    ],
    technologies: ['SD-WAN', 'MPLS', 'Fibre', '5G', 'Network Monitoring', 'Firewall Management', 'Load Balancing'],
    process: [
      { step: '01', title: 'Site Survey', desc: 'Connectivity assessment across every site in scope, including local infrastructure constraints.' },
      { step: '02', title: 'Network Design', desc: 'SD-WAN and link architecture designed for resilience and centralised management.' },
      { step: '03', title: 'Rollout', desc: 'Phased deployment across sites, minimising disruption to day-to-day operations.' },
      { step: '04', title: 'Monitor & Support', desc: 'Ongoing SLA-backed monitoring and support across the full network estate.' },
    ],
    caseStudies: [
      { title: 'Multi-Site Network Modernisation', category: 'SD-WAN Rollout', desc: 'SD-WAN rollout across a large multi-country store and branch network, replacing legacy MPLS links with resilient, centrally-managed connectivity.', scope: ['SD-WAN rollout', 'Multi-country delivery', 'Centralised monitoring'] },
      { title: 'Branch Network Failover Redesign', category: 'Network Resilience', desc: 'A resilience redesign introducing automatic failover across branch sites, cutting connectivity-related downtime.', scope: ['Failover architecture', 'Link redundancy', 'SLA monitoring'] },
    ],
    faq: [
      { q: 'Can you manage connectivity across multiple African countries?', a: 'Yes — multi-country delivery with centralised management is a core part of our network offering.' },
      { q: 'What happens if a site’s primary link goes down?', a: 'Our resilient architecture includes automatic failover between links to keep sites online through local outages.' },
      { q: 'Do you offer guaranteed uptime commitments?', a: 'Yes — our network services are delivered against contracted SLAs, not best-effort connectivity.' },
      { q: 'Can you replace our existing MPLS network with SD-WAN?', a: 'Yes — this is one of our most common engagements, typically delivered as a phased rollout to minimise disruption.' },
    ],
  },
  {
    slug: 'microsoft-solutions',
    navTitle: 'Microsoft Solutions',
    title: 'Microsoft Solutions',
    tagline: 'Licensing, deployment, and management across the Microsoft ecosystem.',
    icon: 'Boxes',
    color: '#EC4899',
    overview: {
      heading: 'Microsoft 365, Azure, and Dynamics — deployed and managed properly',
      paragraphs: [
        'As a Microsoft technology partner, we design, deploy, and manage across the full Microsoft ecosystem — Microsoft 365, Azure, Dynamics 365, and Teams — with licensing optimisation built in, not left as an afterthought.',
        'Most organisations are significantly over-licensed or under-configured on Microsoft platforms. We audit what you actually use, then design a deployment that matches real usage, not default templates.',
      ],
    },
    benefits: [
      { title: 'Licensing optimisation', desc: 'Right-size your Microsoft licensing to actual usage, cutting unnecessary spend.' },
      { title: 'Certified deployment', desc: 'Deployed by certified specialists, not generic IT generalists learning on the job.' },
      { title: 'Security-hardened by default', desc: 'Microsoft 365 and Azure environments configured against security best practice from day one.' },
      { title: 'Ongoing management', desc: 'Continuous administration and optimisation, not a one-time deployment left to drift.' },
    ],
    technologies: ['Microsoft 365', 'Microsoft Azure', 'Dynamics 365', 'Microsoft Teams', 'SharePoint', 'Entra ID', 'Intune'],
    process: [
      { step: '01', title: 'Licensing Audit', desc: 'Full review of current Microsoft licensing against actual usage patterns.' },
      { step: '02', title: 'Design & Configuration', desc: 'Environment design covering security, identity, and collaboration configuration.' },
      { step: '03', title: 'Deployment & Migration', desc: 'Certified deployment with staged user migration to minimise disruption.' },
      { step: '04', title: 'Manage & Optimise', desc: 'Ongoing administration, security monitoring, and licensing optimisation.' },
    ],
    caseStudies: [
      { title: 'Microsoft 365 Licensing Optimisation', category: 'Cost Optimisation', desc: 'A licensing audit and re-configuration that eliminated significant over-provisioned licensing spend across the organisation.', scope: ['Licensing audit', 'Tier re-alignment', 'Ongoing management'] },
      { title: 'Teams & SharePoint Modernisation', category: 'Collaboration', desc: 'A modernisation of a legacy file-share and email-only environment into a structured Teams and SharePoint collaboration platform.', scope: ['Information architecture', 'Migration', 'User adoption training'] },
    ],
    faq: [
      { q: 'Are you an official Microsoft partner?', a: 'Yes — deployments are delivered by certified Microsoft technology specialists.' },
      { q: 'Can you help us reduce our Microsoft licensing costs?', a: 'Licensing optimisation is typically the first thing we assess — most organisations are over-licensed relative to actual usage.' },
      { q: 'Do you handle security configuration, or just deployment?', a: 'Both — Microsoft 365 and Azure environments are security-hardened as part of deployment, not left at default settings.' },
      { q: 'Can you manage our existing Microsoft environment, not just deploy a new one?', a: 'Yes — ongoing management and optimisation of existing environments is a core part of this offering.' },
    ],
  },
  {
    slug: 'data-analytics',
    navTitle: 'Data Analytics',
    title: 'Data Analytics',
    tagline: 'Turn fragmented data into boardroom-ready decisions.',
    icon: 'BarChart3',
    color: '#F5C842',
    overview: {
      heading: 'From raw data to strategic decisions',
      paragraphs: [
        'Most organisations have data scattered across disconnected systems — ERP, CRM, spreadsheets, legacy databases — with no single reliable view of the business. We consolidate that into BI dashboards, data lakes, and real-time analytics that leadership can actually act on.',
        'The goal isn’t data for its own sake — it’s decision-ready reporting, delivered through platforms your team will actually use.',
      ],
    },
    benefits: [
      { title: 'Single source of truth', desc: 'Consolidate fragmented data sources into one reliable reporting layer.' },
      { title: 'Real-time visibility', desc: 'Live dashboards instead of static month-end reports that are already outdated.' },
      { title: 'Self-service reporting', desc: 'Teams can build their own views without waiting on IT for every new report.' },
      { title: 'AI-powered insights', desc: 'Predictive and prescriptive analytics layered on top of core reporting.' },
    ],
    technologies: ['Power BI', 'Databricks', 'SQL', 'Data Lakes', 'ETL Pipelines', 'AI / ML', 'Real-Time Analytics'],
    process: [
      { step: '01', title: 'Data Audit', desc: 'Map every data source in scope and assess quality, structure, and access constraints.' },
      { step: '02', title: 'Architecture & Pipeline', desc: 'Design the consolidation pipeline and reporting architecture around your data reality.' },
      { step: '03', title: 'Dashboard Build', desc: 'Build boardroom-ready dashboards and self-service reporting tools.' },
      { step: '04', title: 'Adopt & Extend', desc: 'Team training and ongoing extension as new data needs emerge.' },
    ],
    caseStudies: [
      { title: 'Enterprise BI & Analytics Platform', category: 'Business Intelligence', desc: 'A boardroom-ready business intelligence platform consolidating fragmented data sources into a single real-time reporting layer.', scope: ['Data consolidation', 'Real-time dashboards', 'Self-service reporting'] },
      { title: 'Cross-System Reporting Consolidation', category: 'Data Engineering', desc: 'A consolidation pipeline unifying reporting across previously siloed ERP and CRM systems into one dashboard suite.', scope: ['ETL pipeline build', 'Data warehouse design', 'Dashboard delivery'] },
    ],
    faq: [
      { q: 'Our data is spread across several disconnected systems — is that a problem?', a: 'That’s the typical starting point for most engagements — consolidating fragmented sources is exactly what the data audit and pipeline phases are for.' },
      { q: 'Can our own teams update dashboards without IT involvement?', a: 'Yes — self-service reporting is a core design goal, so teams aren’t dependent on IT for every new view.' },
      { q: 'Do you only work with Power BI?', a: 'Power BI is common, but the platform choice depends on your existing stack and team familiarity.' },
      { q: 'How current is the data in the dashboards?', a: 'Real-time or near-real-time reporting is standard, replacing static month-end exports.' },
    ],
  },
  {
    slug: 'digital-transformation',
    navTitle: 'Digital Transformation',
    title: 'Digital Transformation',
    tagline: 'End-to-end enablement, from process automation to a mobile-first workforce.',
    icon: 'Lightbulb',
    color: '#5B35D5',
    overview: {
      heading: 'Transformation that starts with your business outcomes, not the technology',
      paragraphs: [
        'Digital transformation done badly means new technology bolted onto old processes. Done properly, it starts with the business outcome you actually need, then works backward to process automation, ERP modernisation, and mobile-first tooling that gets you there.',
        'This is a cross-cutting engagement, often drawing on our cloud, data, and software development capability together — not a single point solution.',
      ],
    },
    benefits: [
      { title: 'Outcome-driven', desc: 'Transformation roadmapped around business outcomes, not technology for its own sake.' },
      { title: 'Process automation', desc: 'Manual, error-prone processes replaced with automated workflows.' },
      { title: 'ERP modernisation', desc: 'Legacy ERP systems modernised or replaced without disrupting operations.' },
      { title: 'Mobile-first delivery', desc: 'Workforce tooling designed for how your teams actually work today.' },
    ],
    technologies: ['RPA', 'ERP Modernisation', 'Low-Code Platforms', 'Change Management', 'Process Mining', 'Mobile-First Design'],
    process: [
      { step: '01', title: 'Outcome Mapping', desc: 'Define the business outcomes transformation needs to achieve, before any technology decisions.' },
      { step: '02', title: 'Roadmap & Prioritise', desc: 'Sequence initiatives by impact and feasibility into a realistic delivery roadmap.' },
      { step: '03', title: 'Deliver in Phases', desc: 'Phased delivery with visible wins early, rather than a multi-year big-bang rollout.' },
      { step: '04', title: 'Embed & Sustain', desc: 'Change management and training to make sure transformation sticks after go-live.' },
    ],
    caseStudies: [
      { title: 'Manual Process Automation Programme', category: 'Process Automation', desc: 'An RPA-led automation programme removing manual data-entry work across several core business processes.', scope: ['Process mining', 'RPA deployment', 'Staff redeployment planning'] },
      { title: 'Legacy ERP Modernisation', category: 'ERP Transformation', desc: 'A phased modernisation of a legacy ERP system, delivered without disrupting day-to-day operations.', scope: ['Current-state audit', 'Phased migration', 'Change management'] },
    ],
    faq: [
      { q: 'Where should transformation actually start?', a: 'With the business outcome, not the technology — outcome mapping is deliberately the first step, before any platform decisions.' },
      { q: 'Will this disrupt our day-to-day operations?', a: 'Phased delivery is designed specifically to avoid big-bang disruption, with visible wins delivered early.' },
      { q: 'Does transformation mean replacing our ERP entirely?', a: 'Not necessarily — modernisation and replacement are both options, chosen based on what actually serves the business outcome.' },
      { q: 'How do you make sure the changes actually stick?', a: 'Change management and training are built into the roadmap, not treated as an afterthought once the technology ships.' },
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICES.find(s => s.slug === slug)
}
