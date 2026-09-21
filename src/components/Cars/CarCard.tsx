import { memo } from 'react';
import { Car } from '../../types';
import { formatPrice, getTypeLabel, getFuelLabel, isBrandSoldNewInChile } from '../../data/brands';
import { CarImage } from './CarImage';

interface Props {
  car: Car;
  isFavorite: boolean;
  isComparing: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToCompare: (car: Car) => void;
  onRemoveFromCompare: (id: number) => void;
  onClick?: (car: Car) => void;
}

const fuelColors: Record<string, string> = {
  gasolina: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  diesel: 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200',
  electrico: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  hibrido: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  hibrido_enchufable: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
};

export const CarCard = memo(function CarCard({
  car,
  isFavorite,
  isComparing,
  onToggleFavorite,
  onAddToCompare,
  onRemoveFromCompare,
  onClick,
}: Props) {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => onClick?.(car)}
    >
      <div className="relative h-48 overflow-hidden">
        <CarImage
          carId={car.id}
          brand={car.brand}
          model={car.model}
          type={car.type}
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(car.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white hover:scale-110 shadow-md"
        >
          <svg
            className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 dark:text-gray-500 hover:text-red-400'}`}
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
              : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-white hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          {isComparing ? '✓ Comparando' : '+ Comparar'}
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1.5">
              {car.brand}
              {!isBrandSoldNewInChile(car.brand) && (
                <span
                  title="No se vende oficialmente como auto nuevo en Chile"
                  className="normal-case font-semibold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded"
                >
                  no en Chile
                </span>
              )}
            </p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-0.5">{car.model}</h3>
          </div>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">{car.year}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
            {getTypeLabel(car.type)}
          </span>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${fuelColors[car.fuel] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
            {getFuelLabel(car.fuel)}
          </span>
          <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
            {car.seats} plazas
          </span>
          <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
            {car.transmission === 'automatica' ? 'Automática' : 'Manual'}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">{car.description}</p>

        <div className="flex items-end justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Precio desde</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(car.price)}</p>
          </div>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{car.origin}</span>
        </div>
      </div>
    </div>
  );
});