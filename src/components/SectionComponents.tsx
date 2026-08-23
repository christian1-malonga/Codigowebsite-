import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LineIcon } from './IconLibrary';

export function Grain() { return <div className="grain-layer" aria-hidden="true" />; }
export function Watermark({ children, className = '' }: { children: ReactNode; className?: string }) { return <div className={`watermark ${className}`} aria-hidden="true">{children}</div>; }
export function SectionHeading({ title, italic, intro, dark = false }: { title: string; italic: string; intro?: ReactNode; dark?: boolean }) {
  return <div className={`section-heading-row ${dark ? 'section-heading-row--dark' : ''} ${intro ? '' : 'section-heading-row--solo'}`}><div><h2 className="section-title">{title}{' '}<em>{italic}</em></h2></div>{intro && <div className="section-intro">{intro}</div>}</div>;
}
export function Tags({ items, active = false }: { items: readonly string[]; active?: boolean }) { return <div className="tags">{items.map(item => <span className={`tag ${active ? 'tag--active' : ''}`} key={item}>{item}</span>)}</div>; }
export function SectionWrap({ children, className = '', tone = 'paper', watermark, dark = false, id, reveal = true }: { children: ReactNode; className?: string; tone?: 'paper' | 'soft' | 'orange'; watermark?: ReactNode; dark?: boolean; id?: string; reveal?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(!reveal);
  useEffect(() => {
    if (!reveal) return;
    const node = sectionRef.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setIsVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reveal]);
  return <section ref={sectionRef} id={id} className={`page-section page-section--${tone} ${dark ? 'page-section--dark' : ''} ${reveal ? `reveal-section ${isVisible ? 'reveal-section--visible' : ''}` : ''} ${className}`}>{tone !== 'orange' && <Grain />}{watermark && <Watermark className={tone === 'orange' ? 'watermark--light' : ''}>{watermark}</Watermark>}<div className="section-inner">{children}</div></section>;
}
export function ServiceIcon({ name }: { name: string }) { return <div className="service-icon"><LineIcon name={name} size={40} /></div>; }
export function ArrowLink({ children, href = '#' }: { children: ReactNode; href?: string }) { return <a className="arrow-link" href={href}>{children}<ArrowUpRight size={15} /></a>; }
export function PillLink({ children, href = '#' }: { children: ReactNode; href?: string }) { return <a className="pill-link" href={href}><span>{children}</span><span className="button-arrow"><ArrowUpRight size={12} strokeWidth={1.7} /></span></a>; }

export function Field({ label, placeholder, type = 'text', required = false }: { label: string; placeholder: string; type?: string; required?: boolean }) { return <div className="contact-field"><label>{label}</label><input type={type} placeholder={placeholder} required={required} /></div>; }
export function TextField({ label, placeholder }: { label: string; placeholder: string }) { return <div className="contact-field contact-field--wide"><label>{label}</label><textarea placeholder={placeholder} rows={3} required /></div>; }
