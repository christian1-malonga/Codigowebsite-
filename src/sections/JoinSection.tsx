import { OrangeButton } from '../components/SiteShell';
import { SectionWrap } from '../components/SectionComponents';

const joinCards = [['01 // INTERNAL', 'Core Team Member', 'Help shape our studio culture and long-term product direction'], ['02 // EXTERNAL', 'Client Project Placement', 'Join leading international teams on meaningful, high-impact initiatives'], ['03 // FLEX', 'Remote / Hybrid', 'Work from wherever you are, aligned with core client time zones']] as const;

export function JoinSection() {
  return <SectionWrap tone="orange" dark watermark="JOIN" className="join-section" reveal><div className="join-grid"><div className="join-copy"><h2>Join our team<em>building for global clients</em></h2><p>We partner with organisations across <strong>North Cyprus, Europe</strong> and beyond. Engineers, designers, and product specialists who value quality — we're always glad to connect</p><div className="join-tags"><span>Remote-first</span><span>North Cyprus &amp; Europe clients</span><span>Long term</span></div><OrangeButton href="/vacancies" className="join-open-button">See open roles</OrangeButton></div><div className="join-cards">{joinCards.map(([label, title, copy], index) => <article className={`join-card join-card--${index}`} key={label}><span className="mono">Message</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></SectionWrap>;
}
