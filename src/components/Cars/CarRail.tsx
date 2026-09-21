import { ReactNode } from 'react';
import { Car } from '../../types';
import { CarCard } from './CarCard';

interface Props {
  title: string;
  icon: ReactNode;
  subtitle?: string;
  cars: Car[];
  favorites: number[];
  compareList: Car[];
  onToggleFavorite: (id: number) => void;
  onAddToCompare: (car: Car) => void;
  onRemoveFromCompare: (id: number) => void;
  onCarClick: (car: Car) => void;
  onSeeAll?: () => void;
}

export function CarRail({
  title,
  icon,
  subtitle,
  cars,
  favorites,
  compareList,
  onToggleFavorite,
  onAddToCompare,
  onRemoveFromCompare,
  onCarClick,
  onSeeAll,
}: Props) {
  if (cars.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span aria-hidden="true">{icon}</span> {title}
          </h2>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 whitespace-nowrap"
          >
            Ver todos →
          </button>
        )}
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scroll-smooth">
        {cars.map((car) => (
          <div key={car.id} className="w-72 sm:w-80 flex-shrink-0 snap-start">
            <CarCard
              car={car}
              isFavorite={favorites.includes(car.id)}
              isComparing={compareList.some((c) => c.id === car.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCompare={onAddToCompare}
              onRemoveFromCompare={onRemoveFromCompare}
              onClick={onCarClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
