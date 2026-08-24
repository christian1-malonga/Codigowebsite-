import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { OrangeButton } from '../components/SiteShell';
import { PillLink } from '../components/SectionComponents';

export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return <section className="hero-section">
    <video ref={videoRef} className="hero-background-video" autoPlay muted loop playsInline preload="metadata" poster="/codigo-office-background-poster.jpg" aria-hidden="true" onPlay={() => setIsPaused(false)} onPause={() => setIsPaused(true)}>
      <source src="/codigo-office-background.mp4" type="video/mp4" />
    </video>
    <div className="hero-video-scrim" aria-hidden="true" />
    <div className="hero-inner">
      <div className="hero-copy">
        <div className="eyebrow">International Product Studio</div>
        <h1>Mobile applications<span>Web products</span><span>AI-powered products</span></h1>
        <p>CODIGO is an international software studio delivering complete product work. We create mobile applications, web products, and customer-facing digital tools, including AI-enabled solutions — for organisations across DRC, North Cyprus, and the rest of the world</p>
        <div className="hero-actions"><OrangeButton href="/contacts">Request an estimate</OrangeButton><PillLink href="/how-we-work">Explore our process</PillLink></div>
      </div>
    </div>
    <button className="hero-video-control" type="button" onClick={toggleVideo} aria-label={isPaused ? 'Play background video' : 'Pause background video'}><span className="hero-video-control__icon">{isPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}</span><span>{isPaused ? 'Play film' : 'Pause film'}</span></button>
  </section>;
}
