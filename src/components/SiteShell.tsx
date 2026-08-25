import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Chatbot } from './Chatbot';

const navigation = [
  ['Start', '/'],
  ['Capabilities', '/#services'],
  ['Studio', '/about'],
  ['Our Process', '/how-we-work'],
  ['Open Roles', '/vacancies'],
  ['Get in Touch', '/contacts'],
] as const;

export function Brand({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  const logoSrc = compact || light ? '/codigo-logo-white.png' : '/codigo-logo.png';
  return <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`}>
    <img className="brand-symbol" src={logoSrc} alt="" aria-hidden="true" />
    <span>Codigo</span>
  </span>;
}

export function OrangeButton({ children, href = '#', type = 'button', className = '', onClick }: { children: ReactNode; href?: string; type?: 'button' | 'submit'; className?: string; onClick?: () => void }) {
  const content = <><span>{children}</span><span className="button-arrow"><ArrowUpRight size={14} strokeWidth={1.8} /></span></>;
  if (href !== '#') return <a className={`orange-button ${className}`} href={href}>{content}</a>;
  return <button type={type} onClick={onClick} className={`orange-button ${className}`}>{content}</button>;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [orangeContext, setOrangeContext] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const updateBackgroundContext = () => {
      const header = document.querySelector('.site-header');
      const headerHeight = header?.getBoundingClientRect().height ?? 104;
      const orangeSurfaces = [...document.querySelectorAll<HTMLElement>('.page-section--orange, .site-footer')];
      const isOrangeUnderHeader = orangeSurfaces.some(surface => {
        const rect = surface.getBoundingClientRect();
        return rect.top < headerHeight && rect.bottom > 0;
      });
      setOrangeContext(isOrangeUnderHeader);
    };
    updateBackgroundContext();
    window.addEventListener('scroll', updateBackgroundContext, { passive: true });
    window.addEventListener('resize', updateBackgroundContext);
    return () => {
      window.removeEventListener('scroll', updateBackgroundContext);
      window.removeEventListener('resize', updateBackgroundContext);
    };
  }, []);
  const isHome = window.location.pathname === '/';
  return <header className={`site-header ${isHome ? 'site-header--home' : ''} ${scrolled ? 'site-header--scrolled' : ''} ${orangeContext ? 'site-header--orange-context' : ''}`}>
    <div className="site-header__inner">
      <a href="/" aria-label="Codigo homepage"><Brand light={orangeContext} /></a>
      <nav className="site-nav" aria-label="Main navigation">
        {navigation.map(([label, href], index) => <a className="site-nav__link" style={{ '--nav-delay': `${index * 45}ms` } as CSSProperties} href={href} key={label}>{label}</a>)}
      </nav>
      <OrangeButton href="/contacts">Begin a project</OrangeButton>
      <button className="menu-toggle" aria-label={open ? 'Hide menu' : 'Show menu'} aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
    </div>
    <div className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`}>
      {navigation.map(([label, href]) => <a href={href} onClick={() => setOpen(false)} key={label}>{label}</a>)}
      <OrangeButton href="/contacts">Begin a project</OrangeButton>
    </div>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-rule" />
    <div className="footer-grid">
      <div><Brand compact /><p className="footer-legal">© 2026 CODIGO SOFTWARE SERVICES - FZCO<br />Registration number 77300, trade license 79050<br />TRN: 105400079700001<br /><span className="footer-address">IFZA Business Park, DDP, PO Box 342001, DRC, North Cyprus</span></p></div>
      <div className="footer-links"><a href="/legal/privacy-policy">Privacy Notice</a><a href="/legal/terms-of-service">Service Terms</a><a href="/legal/cookie-policy">Cookie Notice</a><a href="/legal/trust-security">Trust &amp; Safety</a><a href="/legal/dpa">Data Processing Terms (DPA)</a><a href="/legal/sub-processors">Sub-Processor List</a></div>
    </div>
    <div className="footer-bottom"><span>All rights retained</span><span>Created in DRC · Software for the world</span></div>
  </footer>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return <div className="site-shell"><SiteHeader /><main className="page-transition">{children}</main><SiteFooter /><Chatbot /></div>;
}
