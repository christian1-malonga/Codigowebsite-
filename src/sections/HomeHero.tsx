import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { PillLink } from '../components/SectionComponents';

type HeroSlide = {
  eyebrow: string;
  title: string;
  cta: { label: string; href: string };
};

const heroSlides: HeroSlide[] = [
  {
    eyebrow: '01 / 04',
    title: 'We build mobile experiences made for real life',
    cta: { label: 'Our apps', href: '/#services' },
  },
  {
    eyebrow: '02 / 04',
    title: 'And web products that are fast, simple, built to last',
    cta: { label: 'Our web products', href: '/#services' },
  },
  {
    eyebrow: '03 / 04',
    title: 'Powered by AI that adapts to every user',
    cta: { label: 'AI at work', href: '/#services' },
  },
  {
    eyebrow: '04 / 04',
    title: 'Giving everyone new ways to create and move forward',
    cta: { label: 'Discover more', href: '/about' },
  },
];

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const triggers = triggerRefs.current.filter((trigger): trigger is HTMLSpanElement => Boolean(trigger));
    if (!triggers.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      const visibleEntry = entries.find(entry => entry.isIntersecting);
      if (!visibleEntry) return;
      const nextSlide = Number((visibleEntry.target as HTMLElement).dataset.slideIndex ?? 0);
      setActiveSlide(current => current === nextSlide ? current : nextSlide);
    }, { root: null, rootMargin: '-42% 0px -42% 0px', threshold: 0 });

    triggers.forEach(trigger => observer.observe(trigger));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateFallbackState = () => {
      const hero = heroRef.current;
      if (!hero) return;
      if (typeof IntersectionObserver !== 'undefined') return;
      const scrollRange = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-hero.getBoundingClientRect().top / scrollRange, 0), 1);
      setActiveSlide(Math.min(heroSlides.length - 1, Math.floor(progress * heroSlides.length)));
    };
    updateFallbackState();
    window.addEventListener('scroll', updateFallbackState, { passive: true });
    window.addEventListener('resize', updateFallbackState);
    return () => {
      window.removeEventListener('scroll', updateFallbackState);
      window.removeEventListener('resize', updateFallbackState);
    };
  }, []);

  const goToSlide = (index: number) => {
    const hero = heroRef.current;
    if (!hero) return;
    const heroStart = window.scrollY + hero.getBoundingClientRect().top;
    const target = heroStart + index * window.innerHeight;
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
          {heroSlides.map((slide, index) => <article className={`hero-slide ${index === activeSlide ? 'hero-slide--active' : ''}`} aria-hidden={index !== activeSlide} key={slide.eyebrow}>
            <div className="eyebrow">{slide.eyebrow}</div>
            <h1>{slide.title}</h1>
            <a className="hero-slide-cta" href={slide.cta.href}>
              <span>{slide.cta.label}</span>
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </article>)}
        </div>
      </div>
      <nav className="hero-slide-nav" aria-label="Hero story sections">
        {heroSlides.map((slide, index) => <button className={`hero-slide-dot ${index === activeSlide ? 'hero-slide-dot--active' : ''}`} type="button" aria-label={`Show story ${index + 1}: ${slide.title}`} aria-current={index === activeSlide ? 'step' : undefined} onClick={() => goToSlide(index)} key={slide.eyebrow}>
          <span className="hero-slide-dot__circle" aria-hidden="true" />
          <span className="hero-slide-dot__label">{slide.cta.label}</span>
        </button>)}
      </nav>
      <button className="hero-video-control" type="button" onClick={toggleVideo} aria-label={isPaused ? 'Play background video' : 'Pause background video'}><span className="hero-video-control__icon">{isPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}</span><span>{isPaused ? 'Play film' : 'Pause film'}</span></button>
    </div>
    <div className="hero-scroll-track" aria-hidden="true">
      {heroSlides.map((slide, index) => <span className="hero-step-trigger" data-slide-index={index} ref={node => { triggerRefs.current[index] = node; }} key={slide.eyebrow} />)}
    </div>
  </section>;
}
