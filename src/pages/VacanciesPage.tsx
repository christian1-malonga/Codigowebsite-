import { FormEvent, useState } from 'react';
import { vacancies } from '../data/siteContent';
import { OrangeButton } from '../components/SiteShell';
import { EditorialHero } from '../components/PageHeroes';
import { Field, SectionWrap, TextField } from '../components/SectionComponents';

function VacancyCard({ role, index }: { role: typeof vacancies[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return <article className={`vacancy-card ${open ? 'vacancy-card--open' : ''}`}><button className="vacancy-card__trigger" onClick={() => setOpen(value => !value)}><span>{role.title}</span><span className="vacancy-card__tags"><b>{role.area}</b><i>{role.type}</i><strong>{open ? '×' : '+'}</strong></span></button>{open && <div className="vacancy-card__body"><p>{role.copy}</p><div className="vacancy-columns"><div><span className="meta-label">Key requirements</span><ul>{role.requirements.map(item => <li key={item}>{item}</li>)}</ul></div>{role.stack && <div><span className="meta-label">Technology</span><p className="vacancy-stack">{role.stack}</p></div>}</div><OrangeButton href="mailto:hello@codigo.com" className="vacancy-apply">Apply for this role</OrangeButton></div>}</article>;
}

function OpenApplication() {
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); window.alert('Thanks — our team will review your portfolio.'); };
  return <SectionWrap tone="orange" dark watermark="APPLY" className="open-application"><div className="open-application__intro"><div className="open-application__label">GENERAL APPLICATION</div><h2>General Application</h2><p>No matching role? Send your portfolio and tell us about your strengths — we are always interested in capable people. Our clients span many industries and technology stacks</p></div><form className="portfolio-form" onSubmit={submit}><Field label="01 — Name" placeholder="Jane Doe" required /><Field label="02 — Email address" placeholder="you@domain.com" type="email" required /><label className="contact-field"><span>03 — Your discipline</span><select defaultValue=""><option value="" disabled>Choose a discipline</option><option>Developer</option><option>Designer</option><option>QA</option><option>PM</option><option>Other</option></select></label><Field label="04 — Portfolio / GitHub" placeholder="https://" /><TextField label="05 — Preferred type of engagement" placeholder="A short note is enough" /><div className="portfolio-submit-wrap"><OrangeButton type="submit" className="portfolio-submit">Share your portfolio →</OrangeButton></div></form></SectionWrap>;
}

export default function VacanciesPage() {
  return <><EditorialHero label="Careers" wordmark="CAREERS"><h1 className="careers-hero-title"><span>Create products that <em>launch</em></span>{' '}<span><em>for a global audience</em></span></h1><p>We are engineers, designers, and product specialists delivering real products for international clients. Remote-first, long-term engagements, modern technology</p><div className="hero-tags"><span>Remote-first</span><span>North Cyprus &amp; Europe clients</span><span>Long term</span></div></EditorialHero><SectionWrap tone="paper" className="vacancies-list-section"><div className="open-positions-heading"><div className="eyebrow">Available Roles</div><h2>Where you <em>could contribute</em></h2></div><div className="vacancy-list">{vacancies.map((role, index) => <VacancyCard role={role} index={index} key={role.title} />)}</div></SectionWrap><OpenApplication /></>;
}
