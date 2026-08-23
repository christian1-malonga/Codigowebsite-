import { legalPages } from '../data/legalContent';
import { SectionWrap } from '../components/SectionComponents';
import { StandardHero } from '../components/PageHeroes';

export default function LegalPage({ path }: { path: string }) {
  const key = path.split('/').pop() || 'privacy-policy';
  const page = legalPages[key] || legalPages['privacy-policy'];
  return <><StandardHero label={page.label} title={page.title} italic={page.italic} wordmark={page.label} copy={<p>{page.intro}</p>} /><SectionWrap tone="paper"><div className="legal-copy"><div className="legal-meta">Last Updated: {page.updated} · CODIGO SOFTWARE SERVICES - FZCO</div>{page.sections.map(([heading, copy]) => <section className="legal-block" key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}</div></SectionWrap></>;
}
