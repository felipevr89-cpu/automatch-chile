import { Car } from '../../types';
import { formatPrice, getTypeLabel, getFuelLabel } from '../../data/cars-chile';

interface Props {
  car: Car;
  isFavorite: boolean;
  isComparing: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToCompare: (car: Car) => void;
  onRemoveFromCompare: (id: number) => void;
}

export function CarCard({
  car,
  isFavorite,
  isComparing,
  onToggleFavorite,
  onAddToCompare,
  onRemoveFromCompare,
}: Props) {
  const fuelColors: Record<string, string> = {
    gasolina: 'bg-yellow-100 text-yellow-800',
    diesel: 'bg-gray-100 text-gray-800',
    electrico: 'bg-green-100 text-green-800',
    hibrido: 'bg-blue-100 text-blue-800',
  };

  const typeIcons: Record<string, string> = {
    sedan: '🚗',
    suv: '🚙',
    pickup: '🛻',
    hatchback: '🚘',
    commercial: '🚐',
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden card-shadow card-hover">
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <span className="text-6xl">{typeIcons[car.type] || '🚗'}</span>
        <button
          onClick={() => onToggleFavorite(car.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center transition-colors hover:bg-white"
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <button
          onClick={() => isComparing ? onRemoveFromCompare(car.id) : onAddToCompare(car)}
          className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur transition-colors ${
            isComparing
              ? 'bg-blue-600 text-white'
              : 'bg-white/80 text-gray-700 hover:bg-white'
          }`}
        >
          {isComparing ? '✓ Comparando' : '+ Comparar'}
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 font-medium">{car.brand}</p>
            <h3 className="text-lg font-bold text-gray-900">{car.model}</h3>
          </div>
          <span className="text-xs text-gray-500">{car.year}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
            {getTypeLabel(car.type)}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${fuelColors[car.fuel]}`}>
            {getFuelLabel(car.fuel)}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
            {car.seats} plazas
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
            {car.transmission === 'automatica' ? 'Automática' : 'Manual'}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{car.description}</p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500">Precio desde</p>
            <p className="text-xl font-bold text-blue-600">{formatPrice(car.price)}</p>
          </div>
          <span className="text-xs text-gray-400">{car.origin}</span>
        </div>
      </div>
    </div>
  );
}
