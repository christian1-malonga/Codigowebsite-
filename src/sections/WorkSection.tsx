import { cases } from '../data/siteContent';

import { SectionHeading, SectionWrap, Tags } from '../components/SectionComponents';

type CaseItem = typeof cases[number];

export function CaseCard({ item }: { item: CaseItem }) {
  return <article className="case-card"><div className="case-top"><span className="mono orange-text">{item.number} / Project</span><span className="case-category">{item.category}</span></div><h3>{item.title}</h3><div className="case-copy"><div><span className="meta-label">Challenge</span><p>{item.task}</p></div><div><span className="meta-label">Approach</span><p>{item.solution}</p></div></div><div className="case-bottom"><div><span className="meta-label">Technology</span><Tags items={item.tags} /></div><div className="duration"><span className="meta-label">Timeline</span><strong>{item.duration}</strong></div></div></article>;
}

export function WorkSection() {
  return <SectionWrap tone="paper" watermark="WORK" className="work-section" reveal><SectionHeading title="Selected" italic="work" intro={<><strong>Five recent engagements</strong> spanning logistics, retail operations, AI, SaaS, and marketplaces — client names kept private under NDA</>} /><div className="case-grid">{cases.map(item => <CaseCard item={item} key={item.number} />)}</div></SectionWrap>;
}
