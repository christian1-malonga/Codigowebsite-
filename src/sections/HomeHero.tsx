import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';

type HeroSlide = {
  title: string;
  cta: { label: string; href: string };
};

const heroSlides: HeroSlide[] = [
  {
    title: 'We build mobile experiences made for real life',
    cta: { label: 'Our apps', href: '/#services' },
  },
  {
    title: 'And web products that are fast, simple, built to last',
    cta: { label: 'Our web products', href: '/#services' },
  },
  {
    title: 'We integrate AI into web and mobile products, giving them useful intelligence',
    cta: { label: 'AI at work', href: '/#services' },
  },
  {
    title: 'So everyone has new ways to create and move forward',
    cta: { label: 'Discover more', href: '/about' },
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
      const heroStart = hero.getBoundingClientRect().top + window.scrollY;
      const scrollTravel = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max((window.scrollY - heroStart) / scrollTravel, 0), 1);
      const nextSlide = Math.min(heroSlides.length - 1, Math.floor(progress * heroSlides.length));
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
    const heroStart = window.scrollY + hero.getBoundingClientRect().top;
    const scrollTravel = Math.max(hero.offsetHeight - window.innerHeight, 1);
    const target = heroStart + (scrollTravel * index) / (heroSlides.length - 1);
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
          {heroSlides.map((slide, index) => <article className={`hero-slide ${index === activeSlide ? 'hero-slide--active' : ''}`} aria-hidden={index !== activeSlide} key={slide.title}>
            <h1>{slide.title}</h1>
            <a className="hero-slide-cta" href={slide.cta.href}>
              <span>{slide.cta.label}</span>
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </article>)}
        </div>
      </div>
      <nav className="hero-slide-nav" aria-label="Hero story sections">
        {heroSlides.map((slide, index) => <button className={`hero-slide-dot ${index === activeSlide ? 'hero-slide-dot--active' : ''}`} type="button" aria-label={`Show story: ${slide.title}`} aria-current={index === activeSlide ? 'step' : undefined} onClick={() => goToSlide(index)} key={slide.title}>
          <span className="hero-slide-dot__circle" aria-hidden="true" />
          <span className="hero-slide-dot__label">{slide.cta.label}</span>
        </button>)}
      </nav>
      <button className="hero-video-control" type="button" onClick={toggleVideo} aria-label={isPaused ? 'Play background video' : 'Pause background video'}><span className="hero-video-control__icon">{isPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}</span><span>{isPaused ? 'Play film' : 'Pause film'}</span></button>
    </div>
  </section>;
}
