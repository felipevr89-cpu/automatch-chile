import { useState } from 'react';
import { Filters } from '../../types';
import { brands, carTypes, fuelTypes, transmissions, tractions, getTypeLabel, getFuelLabel } from '../../data/cars-chile';
import { MultiSelectDropdown } from './MultiSelectDropdown';
import { RangeSlider } from './RangeSlider';

interface Props {
  filters: Filters;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  resultCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (s: string) => void;
}

export function FilterPanel({ filters, updateFilter, resetFilters, resultCount, searchQuery, onSearchChange, sortBy, onSortChange }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  const brandOptions = brands.map(b => ({ value: b, label: b }));
  const typeOptions = carTypes.map(t => ({ value: t, label: getTypeLabel(t) }));
  const fuelOptions = fuelTypes.map(f => ({ value: f, label: getFuelLabel(f) }));
  const transmissionOptions = transmissions.map(t => ({
    value: t,
    label: t === 'automatica' ? 'Automática' : 'Manual',
  }));
  const tractionOptions = tractions.map(t => ({ value: t, label: t }));
  const seatsOptions = [
    { value: '4', label: '4 plazas' },
    { value: '5', label: '5 plazas' },
    { value: '7', label: '7 plazas' },
  ];

  const hasActiveFilters =
    filters.brand.length > 0 ||
    filters.type.length > 0 ||
    filters.fuel.length > 0 ||
    filters.transmission.length > 0 ||
    filters.traction.length > 0 ||
    filters.seats.length > 0 ||
    filters.priceRange[0] > 5000000 ||
    filters.priceRange[1] < 80000000;

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Filtros</h2>
              <p className="text-xs text-gray-500">{resultCount} resultado{resultCount !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Limpiar
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Buscar</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Marca, modelo..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ordenar por</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="year-desc">Más reciente</option>
              <option value="brand">Marca</option>
            </select>
          </div>
          <MultiSelectDropdown
            label="Marca"
            options={brandOptions}
            selected={filters.brand}
            onChange={(v) => updateFilter('brand', v)}
            placeholder="Todas las marcas"
          />

          <MultiSelectDropdown
            label="Tipo de vehículo"
            options={typeOptions}
            selected={filters.type}
            onChange={(v) => updateFilter('type', v)}
            placeholder="Todos los tipos"
          />

          <MultiSelectDropdown
            label="Combustible"
            options={fuelOptions}
            selected={filters.fuel}
            onChange={(v) => updateFilter('fuel', v)}
            placeholder="Todos los combustibles"
          />

          <RangeSlider
            label="Rango de precio"
            min={5000000}
            max={80000000}
            value={filters.priceRange}
            onChange={(v) => updateFilter('priceRange', v)}
          />

          <MultiSelectDropdown
            label="Transmisión"
            options={transmissionOptions}
            selected={filters.transmission}
            onChange={(v) => updateFilter('transmission', v)}
            placeholder="Todas"
          />

          <MultiSelectDropdown
            label="Tracción"
            options={tractionOptions}
            selected={filters.traction}
            onChange={(v) => updateFilter('traction', v)}
            placeholder="Todas"
          />

          <MultiSelectDropdown
            label="Plazas"
            options={seatsOptions}
            selected={filters.seats.map(String)}
            onChange={(v) => updateFilter('seats', v.map(Number))}
            placeholder="Cualquier cantidad"
          />
        </div>
      )}
    </div>
  );
}