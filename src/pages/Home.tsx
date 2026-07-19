import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { FilterPanel } from '../components/Filters/FilterPanel';
import { CarGrid } from '../components/Cars/CarGrid';
import { CarDetail } from '../components/Cars/CarDetail';
import { CreditCalc } from '../components/Calculator/CreditCalc';
import { AutoWizard } from '../components/Wizard/AutoWizard';
import { Filters } from '../types';

interface Props {
  cars: Car[];
  filters: Filters;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
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
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  favorites,
  compareList,
  onToggleFavorite,
  onAddToCompare,
  onRemoveFromCompare,
}: Props) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [compareToast, setCompareToast] = useState(false);

  const handleAddToCompare = useCallback((car: Car) => {
    if (compareList.length >= 3) {
      setCompareToast(true);
      setTimeout(() => setCompareToast(false), 3000);
      return;
    }
    onAddToCompare(car);
  }, [compareList.length, onAddToCompare]);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (showWizard) setShowWizard(false);
      else if (selectedCar) setSelectedCar(null);
    }
  }, [showWizard, selectedCar]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    const hasModal = showWizard || selectedCar;
    document.body.style.overflow = hasModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showWizard, selectedCar]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Encuentra tu <span className="text-blue-600">auto ideal</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Compara precios, especificaciones y encuentra el vehículo perfecto para ti en el mercado chileno
        </p>
        
        <button
          onClick={() => setShowWizard(true)}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span className="text-2xl">🤖</span>
          <span>Encuentra tu auto ideal con IA</span>
        </button>
        <p className="text-sm text-gray-500 mt-2">Responde preguntas y te recomendamos las mejores opciones</p>
      </div>

      {/* Compare bar */}
      {compareList.length > 0 && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-blue-800">
            <strong>{compareList.length}</strong> vehículo{compareList.length !== 1 ? 's' : ''} seleccionado{compareList.length !== 1 ? 's' : ''} para comparar
          </span>
          <Link
            to="/compare"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Comparar ahora →
          </Link>
        </div>
      )}

      {/* Compare toast */}
      {compareToast && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg z-50 text-sm font-medium">
          Solo puedes comparar hasta 3 vehículos
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-80 flex-shrink-0">
          <FilterPanel
            filters={filters}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
            resultCount={cars.length}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </aside>

        <main className="flex-1">
          <CarGrid
            cars={cars}
            favorites={favorites}
            compareList={compareList}
            onToggleFavorite={onToggleFavorite}
            onAddToCompare={handleAddToCompare}
            onRemoveFromCompare={onRemoveFromCompare}
            onCarClick={setSelectedCar}
          />
        </main>
      </div>

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

      {showWizard && (
        <AutoWizard
          onClose={() => setShowWizard(false)}
          onSelectCar={(car) => {
            setSelectedCar(car);
            setShowWizard(false);
          }}
        />
      )}
    </div>
  );
}