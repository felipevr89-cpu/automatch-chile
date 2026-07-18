import { ReactNode } from 'react';
import { Car } from '../../types';
import { formatPrice, getTypeLabel, getFuelLabel } from '../../data/cars-chile';

interface Props {
  car: Car;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  children?: ReactNode;
}

export function CarDetail({ car, onClose, isFavorite, onToggleFavorite, children }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
        >
          ×
        </button>

        <div className="mb-6">
          <p className="text-sm text-gray-500">{car.brand}</p>
          <h2 className="text-2xl font-bold text-gray-900">{car.model}</h2>
          <p className="text-gray-600">{car.year}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {getTypeLabel(car.type)}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {getFuelLabel(car.fuel)}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {car.seats} plazas
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {car.transmission === 'automatica' ? 'Automática' : 'Manual'}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {car.traction}
          </span>
        </div>

        <p className="text-gray-600 mb-6">{car.description}</p>

        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="text-sm text-gray-500">Precio</p>
            <p className="text-3xl font-bold text-blue-600">{formatPrice(car.price)}</p>
          </div>
          <button
            onClick={() => onToggleFavorite(car.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isFavorite
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isFavorite ? '❤️ Guardado' : '🤍 Guardar'}
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
