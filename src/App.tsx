import Gallery from './Components/Gallery/Gallery';
import Films from './Components/Gallery/Films';
import { featuredPhoto, locations, photos } from './Components/Gallery/collections';

const hero = featuredPhoto('Rome (6).jpg');
const paris = featuredPhoto('Paris (2).jpg');
const iraq = featuredPhoto('Iraq (4).jpg');
const about = featuredPhoto('Rome (13).jpg');

export default function App() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header" id="top">
      <a className="wordmark" href="#top" aria-label="Jaafar Yassine home">jy<span>.</span></a>
      <span className="header-name">JAAFAR YASSINE <span>PHOTOGRAPHY & FILM</span></span>
      <nav aria-label="Main navigation"><a href="#work">Photographs <span>{photos.length}</span></a><a href="#films">In motion</a><a href="#about">About</a><a className="contact-link" href="mailto:jaafaryassine.27@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a></nav>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-intro"><p className="eyebrow"><span className="status-dot" /> A PHOTOGRAPHIC JOURNAL</p><span className="hero-coordinate">MANY PLACES. ONE WANDERING EYE.</span></div>
        <div className="hero-heading"><h1 id="hero-title">The art of<br /><em>paying attention.</em></h1><div className="hero-note"><span className="little-star" aria-hidden="true">✳</span><p>Across cities and borders.<br />Unexpected perspectives.<br />A little of what I see.</p><a href="#work">Explore the journal <span aria-hidden="true">↘</span></a></div></div>
        <div className="hero-triptych">
          <figure className="hero-photo"><img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} fetchPriority="high" /><div className="photo-overlay"><span>NEAR & FAR,<br /><em>a different perspective.</em></span><a href="#work" aria-label="Explore selected photographs">↓</a></div><figcaption><span>01 / ROME</span><span>WHERE THE WANDERING BEGINS</span></figcaption></figure>
          {[paris, iraq].map((photo, index) => <figure className="hero-detail" key={photo.id}><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} /><figcaption>0{index + 2} / {photo.location.toUpperCase()}</figcaption></figure>)}
        </div>
        <div className="journal-stats"><span><strong>{photos.length}</strong> photographs</span><span><strong>{locations.length}</strong> locations</span><a href="#films">The journey <span aria-hidden="true">↗</span></a><span className="journal-signature">Seen by Jaafar Yassine</span></div>
      </section>
      <Films />
      <Gallery />
      <section className="about-section" id="about" aria-labelledby="about-title"><div className="about-photo"><img src={about.preview} alt={about.alt} width={about.width} height={about.height} loading="lazy" /><span>A MOMENT BETWEEN MOMENTS.</span></div><div className="about-copy"><p className="eyebrow">BEHIND THE LENS</p><h2 id="about-title">A camera. A little curiosity.<br /><em>No fixed horizon.</em></h2><p>I’m Jaafar Yassine. These are my photographs and films — a personal journal of places I’ve seen and the small details that made me stop and look.</p><p>From familiar streets in Rome to moments further afield, this collection follows the light, the everyday, and the unexpected. An invitation to slow down, wherever you are.</p><a className="text-link" href="https://www.instagram.com/jfryassine/" target="_blank" rel="noreferrer">Follow the everyday <span aria-hidden="true">↗</span></a></div></section>
      <section className="contact-section" id="contact"><p className="eyebrow">HAVE SOMETHING IN MIND?</p><a href="mailto:jaafaryassine.27@gmail.com">Let’s make a connection.<span aria-hidden="true">↗</span></a><p>For conversations, collaborations, or permission to use a photograph or film.</p></section>
    </main>
    <footer><div className="footer-top"><a className="wordmark" href="#top" aria-label="Back to top">jy<span>.</span></a><p>Looking a little closer.</p><div className="social-links"><a href="https://www.instagram.com/jfryassine/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.linkedin.com/in/jaafaryassine/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/jfryassine" target="_blank" rel="noreferrer">GitHub ↗</a></div></div><div className="footer-bottom"><span>© 2019–{new Date().getFullYear()} Jaafar Yassine</span><span>All photographs and films are my own. Written permission required for use.</span><a href="#top">Back to top ↑</a></div></footer>
  </>;
}
