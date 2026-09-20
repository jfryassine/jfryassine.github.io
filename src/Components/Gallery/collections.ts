import { media } from './media';

const locationCounts = new Map<string, number>();
export const photos = media.filter(item => item.kind === 'photo').map(item => {
  const number = (locationCounts.get(item.location) ?? 0) + 1;
  locationCounts.set(item.location, number);
  return { ...item, number, title: `${item.location} / ${String(number).padStart(2, '0')}` };
});
export const locations = [...locationCounts.keys()].sort((a, b) => a.localeCompare(b));
export const films = media.filter(item => item.kind === 'video');
export const countForLocation = (location: string) => locationCounts.get(location) ?? 0;
export const featuredPhoto = (filename: string) => photos.find(item => item.filename === filename) ?? photos[0];
