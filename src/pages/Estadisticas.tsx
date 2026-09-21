import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { carsData, formatPrice, brands, getTypeLabel, getFuelLabel } from '../data/brands';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEO } from '../components/SEO';

function BarChart({ data, color }: { data: { label: string; count: number }[]; color: string }) {
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-24 text-sm text-gray-600 dark:text-gray-300 text-right flex-shrink-0 truncate" title={d.label}>{d.label}</span>
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${color}`}
              style={{ width: `${(d.count / max) * 100}%` }}
            />
          </div>
          <span className="w-16 text-sm font-medium text-gray-700 dark:text-gray-300 flex-shrink-0 text-right">{d.count}</span>
        </div>
      ))}
    </div>
  );
}

export function Estadisticas() {
  const stats = useMemo(() => {
    const total = carsData.length;
    const avgPrice = Math.round(carsData.reduce((a, c) => a + c.price, 0) / total);
    const mostExpensive = carsData.reduce((a, c) => a.price > c.price ? a : c);
    const cheapest = carsData.reduce((a, c) => a.price < c.price ? a : c);

    const byType = new Map<string, number>();
    const byFuel = new Map<string, number>();
    const byOrigin = new Map<string, number>();
    const byBrand = new Map<string, number>();

    for (const car of carsData) {
      byType.set(car.type, (byType.get(car.type) || 0) + 1);
      byFuel.set(car.fuel, (byFuel.get(car.fuel) || 0) + 1);
      byOrigin.set(car.origin_country || 'Desconocido', (byOrigin.get(car.origin_country || 'Desconocido') || 0) + 1);
      byBrand.set(car.brand, (byBrand.get(car.brand) || 0) + 1);
    }

    const typeData = Array.from(byType.entries())
      .map(([k, v]) => ({ label: getTypeLabel(k), count: v }))
      .sort((a, b) => b.count - a.count);

    const fuelData = Array.from(byFuel.entries())
      .map(([k, v]) => ({ label: getFuelLabel(k), count: v }))
      .sort((a, b) => b.count - a.count);

    const originData = Array.from(byOrigin.entries())
      .map(([k, v]) => ({ label: k, count: v }))
      .sort((a, b) => b.count - a.count);

    const brandData = Array.from(byBrand.entries())
      .map(([k, v]) => ({ label: k, count: v }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return { total, avgPrice, mostExpensive, cheapest, typeData, fuelData, originData, brandData };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO title="Estadísticas" description="Estadísticas del mercado automotriz chileno: vehículos, marcas, precios promedio y más." />
      <Breadcrumbs items={[{ label: 'Estadísticas' }]} />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Estadísticas del Mercado</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Vehículos</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Marcas</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{brands.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Precio Promedio</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(stats.avgPrice)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Rango de Precios</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(stats.cheapest.price)} – {formatPrice(stats.mostExpensive.price)}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stats.cheapest.brand} {stats.cheapest.model} – {stats.mostExpensive.brand} {stats.mostExpensive.model}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Vehículos por Tipo</h2>
          <BarChart data={stats.typeData} color="bg-blue-500" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Vehículos por Combustible</h2>
          <BarChart data={stats.fuelData} color="bg-green-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Vehículos por País de Origen</h2>
          <BarChart data={stats.originData} color="bg-purple-500" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top 10 Marcas</h2>
          <BarChart data={stats.brandData} color="bg-orange-500" />
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
