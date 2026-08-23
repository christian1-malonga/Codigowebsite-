import { OrangeButton } from '../components/SiteShell';
import { PillLink } from '../components/SectionComponents';

export function HomeHero() {
  return <section className="hero-section"><div className="hero-inner"><div className="hero-copy"><div className="eyebrow">International Product Studio</div><h1>Mobile applications<span>Web products</span><span>AI-powered products</span></h1><p>CODIGO is an international software studio delivering complete product work. We create mobile applications, web products, and customer-facing digital tools, including AI-enabled solutions — for organisations across DRC, North Cyprus, and the rest of the world</p><div className="hero-actions"><OrangeButton href="/contacts">Request an estimate</OrangeButton><PillLink href="/how-we-work">Explore our process</PillLink></div></div><div className="hero-phone-wrap"><img className="hero-phone" src="/phone-mockup-transparent.png" alt="Codigo mobile app preview" /></div></div></section>;
}
