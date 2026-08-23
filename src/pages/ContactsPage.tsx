import { Mail } from 'lucide-react';

export default function ContactsPage() {
  return <section className="direct-contact-page"><div className="direct-contact-wordmark" aria-hidden="true">CONTACT</div><div className="direct-contact-inner"><div className="eyebrow">Connect</div><h1>Let's <em>connect</em></h1><div className="direct-contact-grid"><a className="direct-email-card" href="mailto:hello@codigo.com"><span className="direct-email-icon"><Mail size={24} strokeWidth={1.4} /></span><span className="direct-email-label mono">Email</span><strong>hello@codigo.com</strong><span className="direct-email-arrow">→</span></a><div className="office-block"><span className="mono">Studio</span><p>IFZA Business Park,<br />DRC, North Cyprus</p></div></div></div></section>;
}
