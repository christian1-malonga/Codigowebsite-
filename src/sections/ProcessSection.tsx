import { OrangeButton } from '../components/SiteShell';
import { ServiceGrid } from './ServicesSection';
import { SectionHeading, SectionWrap } from '../components/SectionComponents';

const processStages = [
  ['01', 'Discovery', 'We begin with questions, never assumptions', 'We clarify your business goals, user needs, and technical limits before any code is written. You receive a complete project brief — scope, timeline, and budget — agreed in advance.'],
  ['02', 'Design', "Interfaces that prove themselves before build", 'We design in Figma using real content and edge cases. You review and approve every screen before anything moves into development.'],
  ['03', 'Development', 'Sprints, demos, and complete visibility', "Engineering moves in two-week sprints. You see a live preview after each cycle, speak directly with the team, and always know what is being built."],
  ['04', 'Launch & Support', 'We launch — and remain close', 'We manage deployment, store submissions, and go-live. Every engagement includes post-launch support because release is a beginning, not a finish line.'],
] as const;

export function ProcessArtwork({ index }: { index: number }) {
  const common = { width: 220, height: 220, viewBox: '0 0 220 220', fill: 'none', stroke: '#E8471A', strokeWidth: 1.25, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  if (index === 0) return <svg {...common}><circle cx="110" cy="110" r="88" opacity=".35" /><circle cx="110" cy="110" r="58" opacity=".6" /><circle cx="110" cy="110" r="28" /><circle cx="110" cy="110" r="3" fill="#E8471A" stroke="none" /><line x1="110" y1="6" x2="110" y2="40" opacity=".4" /><line x1="110" y1="180" x2="110" y2="214" opacity=".4" /><line x1="6" y1="110" x2="40" y2="110" opacity=".4" /><line x1="180" y1="110" x2="214" y2="110" opacity=".4" /></svg>;
  if (index === 1) return <svg {...common}><rect x="30" y="40" width="120" height="140" rx="6" opacity=".35" /><rect x="60" y="58" width="120" height="140" rx="6" opacity=".7" /><line x1="78" y1="86" x2="160" y2="86" /><line x1="78" y1="106" x2="140" y2="106" opacity=".7" /><line x1="78" y1="126" x2="150" y2="126" opacity=".55" /><circle cx="160" cy="170" r="14" fill="#E8471A" stroke="none" opacity=".85" /></svg>;
  if (index === 2) return <svg {...common}><path d="M40 60 L20 110 L40 160" /><path d="M180 60 L200 110 L180 160" /><line x1="130" y1="40" x2="90" y2="180" /><circle cx="110" cy="110" r="6" fill="#E8471A" stroke="none" /></svg>;
  return <svg {...common}><path d="M30 190 L110 30 L190 190 Z" opacity=".35" /><path d="M70 190 L110 80 L150 190 Z" /><circle cx="110" cy="60" r="7" fill="#E8471A" stroke="none" /><line x1="50" y1="200" x2="170" y2="200" opacity=".4" /></svg>;
}

export function ProcessRows() {
  return <div className="process-rows">{processStages.map(([number, title, heading, copy], index) => <article className="process-row" key={number}><div className="process-row__inner"><div className="process-row__number"><span>{number}</span></div><div className="process-row__copy"><div className="process-row__label"><span className="process-row__dash">—</span><span className="mono orange-text">{number} / {title}</span></div><h2>{heading}</h2><p>{copy}</p></div><div className="process-row__art"><ProcessArtwork index={index} /></div></div></article>)}</div>;
}

export function HowWeWorkContent() {
  return <><SectionWrap tone="paper" watermark="PROCESS" className="process-page"><div className="process-hero-copy"><h1 className="process-hero-title"><span>From concept</span><span>to launch —</span><em className="process-hero-italic">a process shaped<br />for clarity</em></h1></div><ProcessRows /></SectionWrap><SectionWrap tone="soft" className="process-services" watermark="BUILD"><SectionHeading title="Every capability," italic="end to end" intro={<><strong>Six areas of expertise</strong> — from first concept to post-launch care</>} /><ServiceGrid /><div className="consultation-row"><span>Unsure which capability suits your project?</span><OrangeButton href="/contacts">Schedule a free consultation</OrangeButton></div></SectionWrap></>;
}
