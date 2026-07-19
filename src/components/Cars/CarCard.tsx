import { Car } from '../../types';
import { formatPrice, getTypeLabel, getFuelLabel } from '../../data/cars-chile';

interface Props {
  car: Car;
  isFavorite: boolean;
  isComparing: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToCompare: (car: Car) => void;
  onRemoveFromCompare: (id: number) => void;
  onClick?: (car: Car) => void;
}

export function CarCard({
  car,
  isFavorite,
  isComparing,
  onToggleFavorite,
  onAddToCompare,
  onRemoveFromCompare,
  onClick,
}: Props) {
  const fuelColors: Record<string, string> = {
    gasolina: 'bg-yellow-100 text-yellow-800',
    diesel: 'bg-gray-100 text-gray-800',
    electrico: 'bg-green-100 text-green-800',
    hibrido: 'bg-blue-100 text-blue-800',
    hibrido_enchufable: 'bg-indigo-100 text-indigo-800',
  };

  const typeIcons: Record<string, string> = {
    sedan: '🚗',
    suv: '🚙',
    pickup: '🛻',
    hatchback: '🚘',
    minivan: '🚐',
    wagon: '🚃',
  };

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => onClick?.(car)}
    >
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        {car.image_url ? (
          <img
            src={car.image_url}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<span class="text-6xl">${typeIcons[car.type] || '🚗'}</span>`;
              }
            }}
          />
        ) : (
          <span className="text-6xl">{typeIcons[car.type] || '🚗'}</span>
        )}
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(car.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white hover:scale-110 shadow-md"
        >
          <svg
            className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-400'}`}
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isComparing) {
              onRemoveFromCompare(car.id);
            } else {
              onAddToCompare(car);
            }
          }}
          className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm transition-all shadow-md ${
            isComparing
              ? 'bg-blue-600 text-white'
              : 'bg-white/90 text-gray-700 hover:bg-white hover:text-blue-600'
          }`}
        >
          {isComparing ? '✓ Comparando' : '+ Comparar'}
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{car.brand}</p>
            <h3 className="text-lg font-bold text-gray-900 mt-0.5">{car.model}</h3>
          </div>
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">{car.year}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
            {getTypeLabel(car.type)}
          </span>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${fuelColors[car.fuel] || 'bg-gray-100 text-gray-700'}`}>
            {getFuelLabel(car.fuel)}
          </span>
          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
            {car.seats} plazas
          </span>
          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
            {car.transmission === 'automatica' ? 'Automática' : 'Manual'}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{car.description}</p>

        <div className="flex items-end justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Precio desde</p>
            <p className="text-xl font-bold text-blue-600">{formatPrice(car.price)}</p>
          </div>
          <span className="text-xs font-medium text-gray-400">{car.origin}</span>
        </div>
      </div>
    </div>
  );
}