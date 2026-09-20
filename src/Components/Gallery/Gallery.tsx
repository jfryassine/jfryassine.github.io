import { useEffect, useRef, useState } from 'react';
import { countForLocation, locations, photos } from './collections';

export default function Gallery() {
  const [location, setLocation] = useState('Everywhere');
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = photos.filter(photo => location === 'Everywhere' || photo.location === location);
  const photo = selected === null ? null : visible[selected];
  const isOpen = selected !== null;
  const move = (step: number) => setSelected(index => index === null ? null : (index + step + visible.length) % visible.length);

  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  return <section className="work-section" id="work" aria-labelledby="work-title">
    <div className="section-heading">
      <div><p className="eyebrow">THE COLLECTION / {photos.length} PHOTOGRAPHS</p><h2 id="work-title">A world of <em>observations.</em></h2></div>
      <p>Different places. The same curiosity.<br />Pick a place, or wander through them all.</p>
    </div>
    <div className="gallery-toolbar location-toolbar">
      <div className="location-toolbar-heading"><span className="eyebrow">EXPLORE BY LOCATION</span><span className="photo-count" role="status">{visible.length} photographs · {location}</span></div>
      <div className="filters location-filters" role="group" aria-label="Filter photographs by location">
        {['Everywhere', ...locations].map(item => <button key={item} onClick={() => setLocation(item)} aria-pressed={location === item}>
          {item}<span className="location-count" aria-hidden="true">{item === 'Everywhere' ? photos.length : countForLocation(item)}</span>
        </button>)}
      </div>
    </div>
    <div className="gallery-grid">{visible.map((item, index) => <figure className="gallery-card" key={item.id}>
      <button className="image-button" aria-label={`View ${item.location}, photograph ${item.number}`} onClick={() => setSelected(index)}>
        <img src={item.preview} srcSet={`${item.preview} 640w, ${item.src} ${item.width}w`} sizes="(max-width: 600px) 44vw, (max-width: 900px) 43vw, (max-width: 1600px) 28vw, 460px" alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
        <span className="image-open" aria-hidden="true">↗</span>
      </button>
      <figcaption><div><h3>{item.location}</h3><span>Travel journal</span></div><span className="image-number">{String(item.number).padStart(2, '0')}</span></figcaption>
    </figure>)}</div>
    <p className="collection-end"><span /> MANY PLACES. ONE WANDERING EYE. <span /></p>
    <dialog ref={dialog} className="lightbox" aria-label="Photograph viewer" onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    }}>
      {photo && <>
        <div className="lightbox-top"><span>{photo.location.toUpperCase()} / {selected! + 1} OF {visible.length}</span><button autoFocus onClick={() => setSelected(null)} aria-label="Close photograph viewer">Close ×</button></div>
        <div className="lightbox-stage"><button className="lightbox-arrow" onClick={() => move(-1)} aria-label="Previous photograph">←</button><img src={photo.src} alt={photo.alt} /><button className="lightbox-arrow" onClick={() => move(1)} aria-label="Next photograph">→</button></div>
        <div className="lightbox-caption"><h3>{photo.title}</h3><p>{photo.alt}</p><p>Use ← → to explore · Esc to close</p></div>
      </>}
    </dialog>
  </section>;
}
