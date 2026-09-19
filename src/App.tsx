import Gallery from './Components/Gallery/Gallery';
import hero from './Components/Gallery/optimized/Img5.webp';
import about from './Components/Gallery/optimized/Img13.webp';

export default function App() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header" id="top">
      <a className="wordmark" href="#top" aria-label="Jaafar Yassine home">jy<span>.</span></a>
      <span className="header-name">JAAFAR YASSINE <span>PHOTOGRAPHY</span></span>
      <nav aria-label="Main navigation"><a href="#work">Selected work <span>16</span></a><a href="#about">About</a><a className="contact-link" href="mailto:jaafaryassine.27@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a></nav>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-intro"><p className="eyebrow"><span className="status-dot" /> A PHOTOGRAPHIC JOURNAL</p><span className="hero-coordinate">ROME, ITALY · 41°54′ N 12°29′ E</span></div>
        <div className="hero-heading"><h1 id="hero-title">The art of<br /><em>paying attention.</em></h1><div className="hero-note"><span className="little-star" aria-hidden="true">✳</span><p>Familiar places.<br />Unexpected perspectives.<br />A little of what I see.</p><a href="#work">Explore the journal <span aria-hidden="true">↘</span></a></div></div>
        <figure className="hero-photo"><img src={hero} alt="St. Peter’s Basilica glowing beneath a pink and gold Roman sunset" fetchPriority="high" /><div className="photo-overlay"><span>THE ETERNAL CITY,<br /><em>in a different light.</em></span><a href="#work" aria-label="Explore selected photographs">↓</a></div><figcaption><span>01 / A ROMAN EVENING</span><span>THROUGH THE LENS OF JAAFAR YASSINE</span></figcaption></figure>
      </section>
      <Gallery />
      <section className="about-section" id="about" aria-labelledby="about-title"><div className="about-photo"><img src={about} alt="A photographer pausing beside a bicycle on a Roman street" loading="lazy" /><span>A MOMENT BETWEEN MOMENTS.</span></div><div className="about-copy"><p className="eyebrow">BEHIND THE LENS</p><h2 id="about-title">A city. A camera.<br /><em>Endless stories.</em></h2><p>I’m Jaafar Yassine. These are my photographs — a personal journal of Rome, its streets, and the small details that make you stop and look.</p><p>From the last light on a dome to life unfolding on a street corner, this is an invitation to slow down and see the familiar a little differently.</p><a className="text-link" href="https://www.instagram.com/jfryassine/" target="_blank" rel="noreferrer">Follow the everyday <span aria-hidden="true">↗</span></a></div></section>
      <section className="contact-section" id="contact"><p className="eyebrow">HAVE SOMETHING IN MIND?</p><a href="mailto:jaafaryassine.27@gmail.com">Let’s make a connection.<span aria-hidden="true">↗</span></a><p>For conversations, collaborations, or permission to use a photograph.</p></section>
    </main>
    <footer><div className="footer-top"><a className="wordmark" href="#top" aria-label="Back to top">jy<span>.</span></a><p>Looking a little closer.</p><div className="social-links"><a href="https://www.instagram.com/jfryassine/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.linkedin.com/in/jaafaryassine/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/jfryassine" target="_blank" rel="noreferrer">GitHub ↗</a></div></div><div className="footer-bottom"><span>© 2019–{new Date().getFullYear()} Jaafar Yassine</span><span>All photographs are my own. Written permission required for use.</span><a href="#top">Back to top ↑</a></div></footer>
  </>;
}
