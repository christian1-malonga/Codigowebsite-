import { ReactNode } from 'react';

export function EditorialHero({ label, wordmark, children, className = '' }: { label: string; wordmark: string; children: ReactNode; className?: string }) {
  return <section className={`page-hero page-hero--${label.toLowerCase().replaceAll(' ', '-')} ${className}`}><div className="page-hero-wordmark" aria-hidden="true">{wordmark}</div><div className="page-hero__inner">{children}</div></section>;
}

export function StandardHero({ label, title, italic, wordmark, copy }: { label: string; title: string; italic: string; wordmark: string; copy: ReactNode }) {
  return <EditorialHero label={label} wordmark={wordmark}><h1><span>{title}</span><span><em>{italic}</em></span></h1>{copy}</EditorialHero>;
}
