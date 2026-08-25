import { services } from '../data/siteContent';

import { OrangeButton } from '../components/SiteShell';
import { SectionHeading, SectionWrap, ServiceIcon, Tags } from '../components/SectionComponents';

export function ServiceGrid() {
  return <div className="service-grid">{services.map(service => <article className="service-card" key={service.number}><div className="card-top"><span className="mono orange-text">{service.number} / Capability</span><ServiceIcon name={service.icon} /></div><h3>{service.title}</h3><p>{service.copy}</p><div className="card-meta"><span>{service.label}</span><Tags items={service.tags} /></div></article>)}</div>;
}

export function ServicesSection() {
  return <SectionWrap id="services" tone="soft" watermark="BUILD" className="services-section" reveal><SectionHeading title="What we" italic="create with you" intro={<><strong>Six practical disciplines</strong> that guide digital products from first concept through launch and continued evolution</>} /><ServiceGrid /><div className="consultation-row"><span>Unsure which capability suits your project?</span><OrangeButton href="/contacts">Schedule a free consultation</OrangeButton></div></SectionWrap>;
}

export function BuildServicesSection() {
  return <SectionWrap tone="soft" className="process-services" watermark="BUILD"><SectionHeading title="Every capability," italic="end to end" intro={<><strong>Six areas of expertise</strong> — from first concept to post-launch care</>} /><ServiceGrid /><div className="consultation-row"><span>Unsure which capability suits your project?</span><OrangeButton href="/contacts">Schedule a free consultation</OrangeButton></div></SectionWrap>;
}

