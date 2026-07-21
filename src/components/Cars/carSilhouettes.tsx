import { memo } from 'react';

type CarType =
  | 'sedan'
  | 'suv'
  | 'pickup'
  | 'hatchback'
  | 'minivan'
  | 'wagon'
  | 'coupe'
  | 'convertible';

interface SilhouetteProps {
  className?: string;
}

const paths: Record<CarType, string> = {
  sedan:
    'M2 34c0-2 1-3 3-3h1l3-8c1-2 3-4 6-4h20c3 0 5 1 7 3l6 6 8 2c3 1 5 3 5 6v3c0 2-1 3-3 3h-4a5 5 0 01-10 0H23a5 5 0 01-10 0H5c-2 0-3-1-3-3v-5z',
  suv:
    'M2 33c0-2 1-3 3-3l3-10c1-2 3-3 5-3h26c2 0 4 1 5 3l4 9 6 2c3 1 5 3 5 6v3c0 2-1 3-3 3h-4a5 5 0 01-10 0H23a5 5 0 01-10 0H5c-2 0-3-1-3-3v-6z',
  pickup:
    'M2 34c0-2 1-3 3-3l2-8c1-2 3-4 6-4h13c2 0 4 1 5 3l4 8h20c2 0 3 1 3 3v6c0 2-1 3-3 3h-4a5 5 0 01-10 0H23a5 5 0 01-10 0H5c-2 0-3-1-3-3v-5z',
  hatchback:
    'M2 34c0-2 1-3 3-3l3-8c1-2 3-4 6-4h18c3 0 5 1 6 4l5 8c3 0 5 2 5 5v1c0 2-1 3-3 3h-4a5 5 0 01-10 0H21a5 5 0 01-10 0H5c-2 0-3-1-3-3v-3z',
  minivan:
    'M2 33c0-2 1-3 3-3l2-11c1-2 3-3 5-3h30c2 0 4 1 5 3l3 11c2 0 3 1 3 3v6c0 2-1 3-3 3h-4a5 5 0 01-10 0H23a5 5 0 01-10 0H5c-2 0-3-1-3-3v-6z',
  wagon:
    'M2 34c0-2 1-3 3-3l3-9c1-2 3-3 5-3h32c2 0 3 1 3 3v9c2 0 3 1 3 3v5c0 2-1 3-3 3h-4a5 5 0 01-10 0H21a5 5 0 01-10 0H5c-2 0-3-1-3-3v-5z',
  coupe:
    'M2 35c0-2 1-3 3-3l6-9c2-3 5-5 9-5h14c3 0 5 1 7 4l6 8 8 2c2 1 4 3 4 5v3c0 2-1 3-3 3h-4a5 5 0 01-10 0H23a5 5 0 01-10 0H5c-2 0-3-1-3-3v-5z',
  convertible:
    'M2 35c0-2 1-3 3-3l5-7c2-3 5-4 8-4h16c3 0 6 1 8 4l5 7 8 2c2 1 4 3 4 5v3c0 2-1 3-3 3h-4a5 5 0 01-10 0H23a5 5 0 01-10 0H5c-2 0-3-1-3-3v-7z',
};

export const CarSilhouette = memo(function CarSilhouette({
  type,
  className,
}: SilhouetteProps & { type: string }) {
  const d = paths[(type as CarType)] || paths.sedan;
  return (
    <svg
      viewBox="0 0 68 44"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      role="presentation"
    >
      <path d={d} />
      <circle cx="18" cy="37" r="5" fill="rgba(0,0,0,0.35)" />
      <circle cx="18" cy="37" r="2.2" fill="currentColor" />
      <circle cx="48" cy="37" r="5" fill="rgba(0,0,0,0.35)" />
      <circle cx="48" cy="37" r="2.2" fill="currentColor" />
    </svg>
  );
});
