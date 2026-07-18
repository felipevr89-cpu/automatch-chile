import { Filters } from '../../types';
import { brands, carTypes, fuelTypes, transmissions, tractions, getTypeLabel, getFuelLabel } from '../../data/cars-chile';

interface Props {
  filters: Filters;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  resultCount: number;
}

export function FilterPanel({ filters, updateFilter, resetFilters, resultCount }: Props) {
  const toggleArrayFilter = (key: 'brand' | 'type' | 'fuel' | 'seats' | 'transmission' | 'traction', value: string | number) => {
    const current = filters[key] as (string | number)[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated as never);
  };

  return (
    <div className="bg-white rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filtros</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Limpiar todo
        </button>
      </div>

      <div className="space-y-6">
        {/* Marcas */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Marca</h3>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => toggleArrayFilter('brand', brand)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filters.brand.includes(brand)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de vehículo */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Tipo de Vehículo</h3>
          <div className="flex flex-wrap gap-2">
            {carTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleArrayFilter('type', type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filters.type.includes(type)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getTypeLabel(type)}
              </button>
            ))}
          </div>
        </div>

        {/* Combustible */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Combustible</h3>
          <div className="flex flex-wrap gap-2">
            {fuelTypes.map((fuel) => (
              <button
                key={fuel}
                onClick={() => toggleArrayFilter('fuel', fuel)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filters.fuel.includes(fuel)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getFuelLabel(fuel)}
              </button>
            ))}
          </div>
        </div>

        {/* Rango de precio */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Precio: ${(filters.priceRange[0] / 1000000).toFixed(0)}M - ${(filters.priceRange[1] / 1000000).toFixed(0)}M CLP
          </h3>
          <div className="space-y-2">
            <input
              type="range"
              min={5000000}
              max={50000000}
              step={1000000}
              value={filters.priceRange[0]}
              onChange={(e) => updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])}
              className="w-full"
            />
            <input
              type="range"
              min={5000000}
              max={50000000}
              step={1000000}
              value={filters.priceRange[1]}
              onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>

        {/* Transmisión */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Transmisión</h3>
          <div className="flex flex-wrap gap-2">
            {transmissions.map((trans) => (
              <button
                key={trans}
                onClick={() => toggleArrayFilter('transmission', trans)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                  filters.transmission.includes(trans)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {trans === 'automatica' ? 'Automática' : 'Manual'}
              </button>
            ))}
          </div>
        </div>

        {/* Tracción */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Tracción</h3>
          <div className="flex flex-wrap gap-2">
            {tractions.map((trac) => (
              <button
                key={trac}
                onClick={() => toggleArrayFilter('traction', trac)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filters.traction.includes(trac)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {trac}
              </button>
            ))}
          </div>
        </div>

        {/* Plazas */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Plazas</h3>
          <div className="flex flex-wrap gap-2">
            {[4, 5, 7].map((seat) => (
              <button
                key={seat}
                onClick={() => toggleArrayFilter('seats', seat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filters.seats.includes(seat)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {seat} plazas
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          {resultCount} vehículo{resultCount !== 1 ? 's' : ''} encontrado{resultCount !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
