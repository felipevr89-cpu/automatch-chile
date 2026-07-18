import { Car } from '../../types';
import { CarCard } from './CarCard';

interface Props {
  cars: Car[];
  favorites: number[];
  compareList: Car[];
  onToggleFavorite: (id: number) => void;
  onAddToCompare: (car: Car) => void;
  onRemoveFromCompare: (id: number) => void;
}

export function CarGrid({
  cars,
  favorites,
  compareList,
  onToggleFavorite,
  onAddToCompare,
  onRemoveFromCompare,
}: Props) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron resultados</h3>
        <p className="text-gray-500">Intenta ajustar los filtros para ver más opciones</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isFavorite={favorites.includes(car.id)}
          isComparing={compareList.some((c) => c.id === car.id)}
          onToggleFavorite={onToggleFavorite}
          onAddToCompare={onAddToCompare}
          onRemoveFromCompare={onRemoveFromCompare}
        />
      ))}
    </div>
  );
}
