import { Link } from 'react-router-dom';
import { Car } from '../types';
import { CarCard } from '../components/Cars/CarCard';

interface Props {
  allCars: Car[];
  favorites: number[];
  compareList: Car[];
  onToggleFavorite: (id: number) => void;
  onAddToCompare: (car: Car) => void;
  onRemoveFromCompare: (id: number) => void;
}

export function Favorites({
  allCars,
  favorites,
  compareList,
  onToggleFavorite,
  onAddToCompare,
  onRemoveFromCompare,
}: Props) {
  const favoriteCars = allCars.filter((car) => favorites.includes(car.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mis Favoritos</h1>
        <p className="text-gray-600 mt-1">
          {favoriteCars.length} vehículo{favoriteCars.length !== 1 ? 's' : ''} guardado{favoriteCars.length !== 1 ? 's' : ''}
        </p>
      </div>

      {favoriteCars.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💝</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Sin favoritos aún</h3>
          <p className="text-gray-500 mb-6">Guarda vehículos que te gusten haciendo clic en el corazón</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Explorar vehículos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favoriteCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite={true}
              isComparing={compareList.some((c) => c.id === car.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCompare={onAddToCompare}
              onRemoveFromCompare={onRemoveFromCompare}
            />
          ))}
        </div>
      )}
    </div>
  );
}
