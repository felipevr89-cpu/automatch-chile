import { useState } from 'react';
import { Car } from '../types';
import { FilterPanel } from '../components/Filters/FilterPanel';
import { CarGrid } from '../components/Cars/CarGrid';
import { CarDetail } from '../components/Cars/CarDetail';
import { CreditCalc } from '../components/Calculator/CreditCalc';
import { Filters } from '../types';

interface Props {
  cars: Car[];
  filters: Filters;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  favorites: number[];
  compareList: Car[];
  onToggleFavorite: (id: number) => void;
  onAddToCompare: (car: Car) => void;
  onRemoveFromCompare: (id: number) => void;
}

export function Home({
  cars,
  filters,
  updateFilter,
  resetFilters,
  favorites,
  compareList,
  onToggleFavorite,
  onAddToCompare,
  onRemoveFromCompare,
}: Props) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Encuentra tu <span className="text-blue-600">auto ideal</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Compara precios, especificaciones y encuentra el vehículo perfecto para ti en el mercado chileno
        </p>
      </div>

      {/* Compare bar */}
      {compareList.length > 0 && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-blue-800">
            <strong>{compareList.length}</strong> vehículo{compareList.length !== 1 ? 's' : ''} seleccionado{compareList.length !== 1 ? 's' : ''} para comparar
          </span>
          <a
            href="/compare"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Comparar ahora →
          </a>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <FilterPanel
            filters={filters}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
            resultCount={cars.length}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <CarGrid
            cars={cars}
            favorites={favorites}
            compareList={compareList}
            onToggleFavorite={onToggleFavorite}
            onAddToCompare={onAddToCompare}
            onRemoveFromCompare={onRemoveFromCompare}
          />
        </main>
      </div>

      {/* Car detail modal */}
      {selectedCar && (
        <CarDetail
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          isFavorite={favorites.includes(selectedCar.id)}
          onToggleFavorite={onToggleFavorite}
        >
          <CreditCalc price={selectedCar.price} />
        </CarDetail>
      )}
    </div>
  );
}
