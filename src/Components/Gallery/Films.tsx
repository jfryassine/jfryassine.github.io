import { useEffect, useRef, useState } from 'react';
import { films } from './collections';

export default function Films({ closing = false }: { closing?: boolean }) {
  const film = films.find(item => item.location === (closing ? 'Iraq' : 'Vienna'));
  const titleId = closing ? 'closing-title' : 'journey-title';
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [nearby, setNearby] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(!document.hidden);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    const visibility = () => setVisible(!document.hidden);
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => setNearby(entry.isIntersecting), { threshold: 0.1 });
    if (section.current) observer.observe(section.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  const mounted = nearby && !reduced && !failed;
  useEffect(() => {
    const player = video.current;
    if (!player) return;
    if (!paused && visible) {
      player.muted = true;
      void player.play().catch(() => setPlaying(false));
    } else player.pause();
    return () => { player.pause(); };
  }, [mounted, paused, visible]);

  if (!film) return null;
  return <section ref={section} className={`journey-section${closing ? ' closing-film' : ''}`} id={closing ? 'contact' : 'films'} aria-labelledby={titleId}>
    <img className="journey-background" src={film.preview} alt="" loading="lazy" />
    {mounted && <video ref={video} className="journey-background journey-video" muted loop playsInline preload="none" poster={film.preview} aria-hidden="true" tabIndex={-1} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }}>
      <source src={film.src} type="video/mp4" onError={() => { setFailed(true); setPlaying(false); }} />
    </video>}
    <div className="journey-shade" />
    {closing ? <div className="journey-content closing-copy"><p className="eyebrow">ONE LAST POSTCARD / IRAQ</p><h2 id={titleId}>A little closer.<br /><em>A little longer.</em></h2><p>There’s always another story to share.</p><a href="mailto:jaafaryassine.27@gmail.com">Let’s make a connection <span aria-hidden="true">↗</span></a><p className="closing-contact-note">For conversations, collaborations, or permission to use a photograph or film.</p></div> : <div className="journey-content"><p className="eyebrow">FIELD NOTES / IN BETWEEN PLACES</p><h2 id={titleId}>The journey is<br /><em>part of the story.</em></h2><p>A window seat. A passing landscape.<br />Sometimes, the best view is on the way.</p><a href="#work">See where it leads <span aria-hidden="true">↘</span></a></div>}
    <div className="journey-footer"><span>{closing ? <>IRAQ <span aria-hidden="true">—</span> A MOMENT IN MOTION</> : <>VIENNA, AUSTRIA <span aria-hidden="true">—</span> THROUGH A TRAIN WINDOW</>}</span>{!reduced && !failed && <button onClick={() => {
      if (playing) { setPaused(true); video.current?.pause(); }
      else { setPaused(false); void video.current?.play().catch(() => setPlaying(false)); }
    }} aria-label={playing ? 'Pause background video' : 'Play background video'}>{playing ? 'Ⅱ Pause motion' : '▷ Play motion'}</button>}</div>
  </section>;
}
