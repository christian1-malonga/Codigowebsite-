import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { OrangeButton } from '../components/SiteShell';
import { PillLink } from '../components/SectionComponents';

type HeroSlide = {
  eyebrow: string;
  shortLabel: string;
  title: string[];
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

const heroSlides: HeroSlide[] = [
  {
    eyebrow: 'International Product Studio',
    shortLabel: 'Studio',
    title: ['Mobile applications', 'Web products', 'AI-powered products'],
    description: 'CODIGO is an international software studio delivering complete product work. We create mobile applications, web products, and customer-facing digital tools, including AI-enabled solutions — for organisations across DRC, North Cyprus, and the rest of the world',
    primary: { label: 'Request an estimate', href: '/contacts' },
    secondary: { label: 'Explore our process', href: '/how-we-work' },
  },
  {
    eyebrow: 'From idea to launch',
    shortLabel: 'Approach',
    title: ['Clear thinking', 'strong products'],
    description: 'We turn an early idea into a focused, useful product through clear decisions, careful design, and dependable engineering from the first conversation to launch.',
    primary: { label: 'See how we work', href: '/how-we-work' },
    secondary: { label: 'Meet the studio', href: '/about' },
  },
  {
    eyebrow: 'What we build',
    shortLabel: 'Capabilities',
    title: ['Digital tools', 'that move work forward'],
    description: 'From mobile experiences and web platforms to practical AI workflows, we build software around the people, processes, and ambitions behind each organisation.',
    primary: { label: 'Explore capabilities', href: '/#services' },
    secondary: { label: 'View our approach', href: '/how-we-work' },
  },
  {
    eyebrow: 'Ready when you are',
    shortLabel: 'Contact',
    title: ['Bring us', 'your next product'],
    description: 'Tell us what you are building, where the challenge sits, and what success should look like. We will help you find the clearest next step.',
    primary: { label: 'Start a conversation', href: '/contacts' },
    secondary: { label: 'Explore Codigo', href: '/about' },
  },
];

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updateFromScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const scrollRange = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-hero.getBoundingClientRect().top / scrollRange, 0), 1);
      const nextSlide = Math.min(heroSlides.length - 1, Math.round(progress * (heroSlides.length - 1)));
      setActiveSlide(current => current === nextSlide ? current : nextSlide);
    };

    updateFromScroll();
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll);
    return () => {
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
    };
  }, []);

  const goToSlide = (index: number) => {
    const hero = heroRef.current;
    if (!hero) return;
    const scrollRange = Math.max(hero.offsetHeight - window.innerHeight, 1);
    const heroStart = window.scrollY + hero.getBoundingClientRect().top;
    const target = heroStart + (scrollRange * index) / (heroSlides.length - 1);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setActiveSlide(index);
    window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return <section ref={heroRef} className="hero-section" aria-label="Codigo studio introduction">
    <div className="hero-stage">
      <video ref={videoRef} className="hero-background-video" autoPlay muted loop playsInline preload="metadata" poster="/codigo-office-background-poster.jpg" aria-hidden="true" onPlay={() => setIsPaused(false)} onPause={() => setIsPaused(true)}>
        <source src="/codigo-office-background.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-scrim" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy hero-copy--slideshow" aria-live="polite">
          {heroSlides.map((slide, index) => <article className={`hero-slide ${index === activeSlide ? 'hero-slide--active' : ''}`} aria-hidden={index !== activeSlide} key={slide.shortLabel}>
            <div className="eyebrow">{slide.eyebrow}</div>
            <h1>{slide.title.map(line => <span key={line}>{line}</span>)}</h1>
            <p>{slide.description}</p>
            <div className="hero-actions">
              <OrangeButton href={slide.primary.href}>{slide.primary.label}</OrangeButton>
              <PillLink href={slide.secondary.href}>{slide.secondary.label}</PillLink>
            </div>
          </article>)}
        </div>
      </div>
      <nav className="hero-slide-nav" aria-label="Hero sections">
        {heroSlides.map((slide, index) => <button className={`hero-slide-dot ${index === activeSlide ? 'hero-slide-dot--active' : ''}`} type="button" aria-label={`Show ${slide.shortLabel} section`} aria-current={index === activeSlide ? 'step' : undefined} onClick={() => goToSlide(index)} key={slide.shortLabel}>
          <span className="hero-slide-dot__circle" aria-hidden="true" />
          <span className="hero-slide-dot__label">{slide.shortLabel}</span>
        </button>)}
      </nav>
      <button className="hero-video-control" type="button" onClick={toggleVideo} aria-label={isPaused ? 'Play background video' : 'Pause background video'}><span className="hero-video-control__icon">{isPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}</span><span>{isPaused ? 'Play film' : 'Pause film'}</span></button>
    </div>
  </section>;
}
