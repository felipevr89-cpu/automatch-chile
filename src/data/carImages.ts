import manifest from './carImages.json';

export interface CarImageEntry {
  file: string | null;
  attribution?: string | null;
  license?: string | null;
  source?: string | null;
}

const map = manifest as Record<string, CarImageEntry | null>;

export function getCarImage(id: number): CarImageEntry | null {
  return map[String(id)] ?? null;
}
