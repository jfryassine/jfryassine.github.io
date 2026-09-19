import { useEffect, useRef, useState } from 'react';
import { galleryImages } from './images';
import dimensions from './dimensions.json';

const details = [
  ['A quiet kind of morning', 'The lake at Villa Borghese, framed by autumn trees', 'Architecture'],
  ['After the crowds', 'The Colosseum illuminated against the night sky', 'After dark'],
  ['All roads lead here', 'St. Peter’s Basilica above a busy Roman street', 'Architecture'],
  ['Before the storm', 'Castel Sant’Angelo and its bridge beneath purple storm clouds', 'After dark'],
  ['The golden hour', 'St. Peter’s dome beneath a pink and gold sunset', 'Architecture'],
  ['Between the branches', 'A distant dome framed by silhouetted trees at dusk', 'Architecture'],
  ['Above the everyday', 'A bicycle held above a crowd on a city street', 'Street stories'],
  ['The city, reflected', 'Lights along the Tiber reflected in the river at night', 'After dark'],
  ['Layers of Rome', 'Roman rooftops and domes beyond green trees', 'Architecture'],
  ['Life in passing', 'A pedestrian and passing traffic on a Roman street', 'Street stories'],
  ['Look a little higher', 'An ornate painted ceiling with gilded architectural details', 'Architecture'],
  ['An ordinary afternoon', 'People walking through a square surrounded by pastel buildings', 'Street stories'],
  ['A pause in the city', 'A photographer standing beside a bicycle on a cobbled street', 'Street stories'],
  ['Lines of history', 'A church dome framed by geometric brick architecture', 'Architecture'],
  ['One last light', 'A brightly lit street stall in a dark Roman square', 'After dark'],
  ['A city in motion', 'People carrying flags under autumn trees', 'Street stories'],
];
export const photos = galleryImages.map((src, i) => ({ src, ...dimensions[i], id: i + 1, title: details[i][0], alt: details[i][1], category: details[i][2] }));
const filters = ['All photographs', 'Architecture', 'Street stories', 'After dark'];

export default function Gallery() {
  const [filter, setFilter] = useState(filters[0]);
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = photos.filter(photo => filter === filters[0] || photo.category === filter);
  const photo = selected === null ? null : visible[selected];
  const move = (step: number) => setSelected(index => index === null ? null : (index + step + visible.length) % visible.length);

  useEffect(() => {
    if (selected === null) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previousOverflow; };
  }, [selected === null]);

  return <section className="work-section" id="work" aria-labelledby="work-title">
    <div className="section-heading"><div><p className="eyebrow">THE COLLECTION / 01—16</p><h2 id="work-title">Selected <em>observations.</em></h2></div><p>A wandering eye.<br />Sixteen moments worth keeping.</p></div>
    <div className="gallery-toolbar"><div className="filters" role="group" aria-label="Filter photographs">{filters.map(item => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}{filter === item && <span className="filter-dot" />}</button>)}</div><span className="photo-count" role="status">{String(visible.length).padStart(2, '0')} PHOTOGRAPHS</span></div>
    <div className="gallery-grid">{visible.map((item, index) => <figure className="gallery-card" key={item.id}><button className="image-button" aria-label={`View ${item.title}`} onClick={() => setSelected(index)}><img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" /><span className="image-open" aria-hidden="true">↗</span></button><figcaption><div><h3>{item.title}</h3><span>{item.category}</span></div><span className="image-number">{String(item.id).padStart(2, '0')}</span></figcaption></figure>)}</div>
    <p className="collection-end"><span /> A FEW MOMENTS. A THOUSAND STORIES. <span /></p>
    <dialog ref={dialog} className="lightbox" aria-label="Photograph viewer" onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } }}>
      {photo && <><div className="lightbox-top"><span>JAAFAR YASSINE / {String(selected! + 1).padStart(2, '0')} OF {visible.length}</span><button autoFocus onClick={() => setSelected(null)} aria-label="Close photograph viewer">Close ×</button></div><div className="lightbox-stage"><button className="lightbox-arrow" onClick={() => move(-1)} aria-label="Previous photograph">←</button><img src={photo.src} alt={photo.alt} /><button className="lightbox-arrow" onClick={() => move(1)} aria-label="Next photograph">→</button></div><div className="lightbox-caption"><h3>{photo.title}</h3><p>{photo.category} <span>· Use ← → to explore · Esc to close</span></p></div></>}
    </dialog>
  </section>;
}
