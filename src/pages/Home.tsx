import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { FilterPanel } from '../components/Filters/FilterPanel';
import { CarGrid } from '../components/Cars/CarGrid';
import { CarRail } from '../components/Cars/CarRail';
import { CarDetail } from '../components/Cars/CarDetail';
import { CreditCalc } from '../components/Calculator/CreditCalc';
import { AutoWizard } from '../components/Wizard/AutoWizard';
import { carsData } from '../data/brands';
import { Filters } from '../types';

interface Props {
  cars: Car[];
  allCarsCount: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (p: number) => void;
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
  allCarsCount,
  totalPages,
  currentPage,
  setCurrentPage,
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
  const [wizardCars, setWizardCars] = useState<Car[] | null>(null);
  const [wizardAnswers, setWizardAnswers] = useState<Record<string, string> | null>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  const isFiltering = useMemo(() => (
    searchQuery.trim() !== '' ||
    filters.brand.length > 0 || filters.type.length > 0 || filters.fuel.length > 0 ||
    filters.seats.length > 0 || filters.transmission.length > 0 || filters.traction.length > 0 ||
    filters.origin_country.length > 0 || filters.model.length > 0 ||
    filters.minAirbags > 0 ||
    filters.priceRange[0] > 0 || filters.priceRange[1] < 80000000
  ), [searchQuery, filters]);

  const rails = useMemo(() => {
    const safe = carsData.filter(c => c.safety_ratings?.some(r => r.stars === 5)).slice(0, 12);
    const autonomy = carsData
      .filter(c => c.fuel === 'electrico' && (c.electric_range_km ?? 0) > 0)
      .sort((a, b) => (b.electric_range_km ?? 0) - (a.electric_range_km ?? 0))
      .slice(0, 12);
    const nuevos = carsData.filter(c => c.year >= 2026).slice(0, 12);
    const economicos = [...carsData].sort((a, b) => a.price - b.price).slice(0, 12);
    return { safe, autonomy, nuevos, economicos };
  }, []);

  const scrollToCatalog = useCallback(() => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const openCar = useCallback((car: Car) => { setSelectedCar(car); setWizardCars(null); }, []);

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
      if (selectedCar && wizardCars) {
        setSelectedCar(null);
        setShowWizard(true);
      } else if (showWizard) {
        setShowWizard(false);
        setWizardAnswers(null);
      } else if (selectedCar) {
        setSelectedCar(null);
      }
    }
  }, [showWizard, selectedCar, wizardCars]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    const hasModal = showWizard || selectedCar;
    document.body.style.overflow = hasModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showWizard, selectedCar]);

  const visibleRange = `${(currentPage - 1) * 15 + 1}-${Math.min(currentPage * 15, allCarsCount)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      {compareToast && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg z-50 text-sm font-medium">
          Solo puedes comparar hasta 3 vehículos
        </div>
      )}

      {!isFiltering && (
        <div className="mb-10">
          <CarRail
            title="Los más seguros"
            icon="🛡️"
            subtitle="Modelos con 5 estrellas en pruebas de choque (NCAP)"
            cars={rails.safe}
            favorites={favorites}
            compareList={compareList}
            onToggleFavorite={onToggleFavorite}
            onAddToCompare={handleAddToCompare}
            onRemoveFromCompare={onRemoveFromCompare}
            onCarClick={openCar}
            onSeeAll={scrollToCatalog}
          />
          <CarRail
            title="Mayor autonomía eléctrica"
            icon="🔋"
            subtitle="Los eléctricos que más kilómetros recorren por carga"
            cars={rails.autonomy}
            favorites={favorites}
            compareList={compareList}
            onToggleFavorite={onToggleFavorite}
            onAddToCompare={handleAddToCompare}
            onRemoveFromCompare={onRemoveFromCompare}
            onCarClick={openCar}
            onSeeAll={() => { updateFilter('fuel', ['electrico']); scrollToCatalog(); }}
          />
          <CarRail
            title="Novedades 2026"
            icon="✨"
            subtitle="Los modelos más nuevos del catálogo"
            cars={rails.nuevos}
            favorites={favorites}
            compareList={compareList}
            onToggleFavorite={onToggleFavorite}
            onAddToCompare={handleAddToCompare}
            onRemoveFromCompare={onRemoveFromCompare}
            onCarClick={openCar}
          />
          <CarRail
            title="Mejor precio"
            icon="💰"
            subtitle="Las opciones más económicas del mercado"
            cars={rails.economicos}
            favorites={favorites}
            compareList={compareList}
            onToggleFavorite={onToggleFavorite}
            onAddToCompare={handleAddToCompare}
            onRemoveFromCompare={onRemoveFromCompare}
            onCarClick={openCar}
          />
        </div>
      )}

      <div ref={catalogRef} className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Explorar todo el catálogo</h2>
        <p className="text-sm text-gray-500 mb-6">Filtra y ordena entre {allCarsCount} vehículos</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-80 flex-shrink-0">
          <FilterPanel
            filters={filters}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
            resultCount={allCarsCount}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </aside>

        <main className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Mostrando {visibleRange} de {allCarsCount} vehículos
            </p>
          </div>

          <CarGrid
            cars={cars}
            favorites={favorites}
            compareList={compareList}
            onToggleFavorite={onToggleFavorite}
            onAddToCompare={handleAddToCompare}
            onRemoveFromCompare={onRemoveFromCompare}
            onCarClick={(car) => { setSelectedCar(car); setWizardCars(null); }}
          />

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Anterior
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                      pageNum === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente →
              </button>
            </div>
          )}
        </main>
      </div>

      {selectedCar && (
        <CarDetail
          car={selectedCar}
          onClose={() => {
            setSelectedCar(null);
            if (wizardCars) {
              setShowWizard(true);
            } else {
              setWizardAnswers(null);
            }
          }}
          isFavorite={favorites.includes(selectedCar.id)}
          onToggleFavorite={onToggleFavorite}
          onPrevCar={() => {
            const list = wizardCars ?? cars;
            const idx = list.findIndex(c => c.id === selectedCar.id);
            if (idx > 0) setSelectedCar(list[idx - 1]);
          }}
          onNextCar={() => {
            const list = wizardCars ?? cars;
            const idx = list.findIndex(c => c.id === selectedCar.id);
            if (idx < list.length - 1) setSelectedCar(list[idx + 1]);
          }}
        >
          <CreditCalc price={selectedCar.price} />
        </CarDetail>
      )}

      {showWizard && (
        <AutoWizard
          onClose={() => { setShowWizard(false); setWizardAnswers(null); setWizardCars(null); }}
          onSelectCar={(car, wCars, answers) => {
            setSelectedCar(car);
            setWizardCars(wCars);
            setWizardAnswers(answers);
            setShowWizard(false);
          }}
          onAddToCompare={handleAddToCompare}
          compareList={compareList}
          initialAnswers={wizardAnswers ?? undefined}
          initialShowResults={!!wizardAnswers}
        />
      )}
    </div>
  );
}