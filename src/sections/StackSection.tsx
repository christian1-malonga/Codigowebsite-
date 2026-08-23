import { useState } from 'react';
import { stackCategories } from '../data/siteContent';
import { SectionHeading, SectionWrap } from '../components/SectionComponents';
import { StackIcon } from '../components/IconLibrary';

export function StackSection() {
  const [active, setActive] = useState(0);
  const selected = stackCategories[active];
  return <SectionWrap tone="soft" watermark="STACK" className="stack-section" reveal><SectionHeading title="The tools we" italic="work with" intro={<><strong>Proven technology</strong> for digital products designed to scale</>} /><div className="stack-label mono">Categories — {String(active + 1).padStart(2, '0')} / 07</div><div className="stack-tabs">{stackCategories.map((category, index) => <button className={index === active ? 'stack-tab stack-tab--active' : 'stack-tab'} onClick={() => setActive(index)} key={category.name}><span><span className="tab-icon"><StackIcon name={category.icon} /></span>{category.name}</span></button>)}</div><div className="stack-tools"><div><span className="mono orange-text">/ {selected.name}</span><span className="mono muted-text">{selected.tools.length} tools</span></div><div className="tool-pills">{selected.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div></SectionWrap>;
}
