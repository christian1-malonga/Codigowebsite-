import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { models } from '../data/siteContent';

import { SectionHeading, SectionWrap } from '../components/SectionComponents';

export function EngageSection() {
  const [active, setActive] = useState(1);
  return <SectionWrap tone="soft" watermark="ENGAGE" className="engage-section" reveal><SectionHeading title="How we" italic="collaborate" intro={<>We adapt to your project format and choose the <strong>model that matches</strong> your goals and timeline</>} /><div className="engage-accordion">{models.map((model, index) => <article className={`model-card ${index === active ? 'model-card--open' : 'model-card--closed'}`} key={model.number}><button className={`model-card__collapsed-layer ${index === active ? 'is-hidden' : ''}`} onClick={() => setActive(index)} aria-label={`View ${model.title}`}><span className="mono">{model.number}</span><strong>{model.title}</strong><span className="model-open">View →</span></button><div className={`model-card__content ${index === active ? 'is-visible' : ''}`}><div className="model-card__meta"><span className="mono">{model.number} // MODEL</span><span className="mono">{index + 1} / 3</span></div><h3>{model.title}</h3><em>{model.subtitle}</em><p>{model.copy}</p><ul>{model.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><div className="model-best">{model.bestFor}</div><button className="model-close" onClick={() => setActive((index + 1) % models.length)}>Collapse <ArrowUpRight size={14} /></button></div></article>)}</div></SectionWrap>;
}
