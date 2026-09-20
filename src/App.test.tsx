import { render, screen, within, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { photos, locations } from './Components/Gallery/collections';
import { media } from './Components/Gallery/media';
import settings from './Components/Gallery/media-settings.json';

let intersections: ((visible: boolean) => void)[];
beforeEach(() => {
  intersections = [];
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  vi.stubGlobal('IntersectionObserver', class {
    callback: (visible: boolean) => void;
    constructor(callback: IntersectionObserverCallback) { this.callback = visible => callback([{ isIntersecting: visible } as IntersectionObserverEntry], this as unknown as IntersectionObserver); intersections.push(this.callback); }
    observe() { this.callback(true); }
    disconnect() {}
  });
});
const viewName = (photo: typeof photos[number]) => `View ${photo.location}, photograph ${photo.number}`;

describe('worldwide photography journal', () => {
  it('includes every source photo and video in the generated collection', () => {
    const originals = Object.keys(import.meta.glob('./Components/Gallery/imgs/*')).filter(name => /\.(jpe?g|png|webp|mov|mp4)$/i.test(name)).map(path => path.split('/').at(-1)!);
    expect(media.map(item => item.filename).sort()).toEqual(originals.filter(name => !(settings.excludedFiles as string[]).includes(name)).sort());
    expect(new Set(media.map(item => item.id)).size).toBe(media.length);
    expect(photos.every(item => item.width > 0 && item.height > 0)).toBe(true);
  });
  it('shows all photographs and working section destinations', () => {
    render(<App />);
    expect(screen.getAllByRole('button', { name: /^View / })).toHaveLength(photos.length);
    expect(document.querySelectorAll('video')).toHaveLength(2);
    for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) expect(document.querySelector(link.hash)).not.toBeNull();
  });
  it('filters by every location and restores the complete collection', async () => {
    const user = userEvent.setup(); render(<App />);
    for (const location of locations) {
      await user.click(screen.getByRole('button', { name: location }));
      expect(screen.getAllByRole('button', { name: /^View / })).toHaveLength(photos.filter(photo => photo.location === location).length);
      expect(screen.getByRole('status')).toHaveTextContent(location);
    }
    await user.click(screen.getByRole('button', { name: 'Everywhere' }));
    expect(screen.getAllByRole('button', { name: /^View / })).toHaveLength(photos.length);
  });
  it('navigates only the filtered photos, wraps, and restores scrolling', async () => {
    const user = userEvent.setup(); render(<App />);
    await user.click(screen.getByRole('button', { name: 'Paris' }));
    const paris = photos.filter(photo => photo.location === 'Paris');
    await user.click(screen.getByRole('button', { name: viewName(paris[0]) }));
    const viewer = screen.getByRole('dialog');
    expect(document.body.style.overflow).toBe('hidden');
    await user.click(within(viewer).getByRole('button', { name: 'Previous photograph' }));
    expect(within(viewer).getByRole('heading')).toHaveTextContent(paris.at(-1)!.title);
    fireEvent.keyDown(viewer, { key: 'ArrowRight' });
    expect(within(viewer).getByRole('heading')).toHaveTextContent(paris[0].title);
    await user.click(within(viewer).getByRole('button', { name: 'Close photograph viewer' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
  it('supports native Escape cancellation', async () => {
    const user = userEvent.setup(); render(<App />);
    await user.click(screen.getByRole('button', { name: viewName(photos[0]) }));
    fireEvent(screen.getByRole('dialog'), new Event('cancel'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
  it('plays both films independently and unloads them outside the viewport', async () => {
    const user = userEvent.setup(); render(<App />);
    const video = document.querySelector('video')!;
    expect(video.muted).toBe(true);
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
    expect(video.querySelector('source')?.src).toContain('film-vienna');
    const closing = document.querySelector('footer video')!;
    expect(closing.querySelector('source')?.src).toContain('film-iraq');
    expect(closing).toHaveAttribute('loop');
    expect(closing).toHaveAttribute('playsinline');
    expect((closing as HTMLVideoElement).muted).toBe(true);
    fireEvent.play(video);
    await user.click(screen.getByRole('button', { name: 'Pause background video' }));
    expect(video.pause).toHaveBeenCalled();
    act(() => intersections[0](false));
    expect(document.querySelector('footer video')).toBe(closing);
    act(() => intersections[1](false));
    expect(document.querySelector('video')).toBeNull();
  });
  it('shows a still frame without loading video for reduced motion', () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList);
    render(<App />);
    expect(document.querySelector('video')).toBeNull();
    expect(document.querySelector('.journey-background')).toHaveAttribute('src');
    expect(screen.queryByRole('button', { name: /background video/ })).not.toBeInTheDocument();
  });
  it('retains the still backdrop when playback fails', () => {
    render(<App />);
    for (const video of document.querySelectorAll('video')) fireEvent.error(video);
    expect(document.querySelector('video')).toBeNull();
    expect(document.querySelector('.journey-background')).toHaveAttribute('src');
  });
});
