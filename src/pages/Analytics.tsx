import { useMemo } from 'react';
import { SEO } from '../components/SEO';
import { carsData, brands, formatPrice, getFuelLabel, getTypeLabel } from '../data/brands';

export function Analytics() {
  const stats = useMemo(() => {
    const total = carsData.length;
    const brandCounts = brands.map(b => ({
      name: b,
      count: carsData.filter(c => c.brand === b).length,
    })).sort((a, b) => b.count - a.count);

    const fuelCounts = ['gasolina', 'diésel', 'electrico', 'hibrido', 'hibrido_enchufable'].map(f => ({
      name: getFuelLabel(f),
      count: carsData.filter(c => c.fuel === f).length,
      color: f === 'gasolina' ? 'bg-orange-500' : f === 'diésel' ? 'bg-gray-600' : f === 'electrico' ? 'bg-green-500' : f === 'hibrido' ? 'bg-blue-500' : 'bg-purple-500',
    }));

    const typeCounts = ['sedan', 'suv', 'pickup', 'hatchback', 'coupe', 'minivan', 'wagon', 'utility'].map(t => ({
      name: getTypeLabel(t),
      count: carsData.filter(c => c.type === t).length,
    })).filter(t => t.count > 0);

    const prices = carsData.map(c => c.price).sort((a, b) => a - b);
    const avgPrice = prices.reduce((s, p) => s + p, 0) / total;
    const medianPrice = prices[Math.floor(total / 2)];
    const minPrice = prices[0];
    const maxPrice = prices[prices.length - 1];

    const years = [...new Set(carsData.map(c => c.year))].sort((a, b) => b - a);
    const yearCounts = years.map(y => ({
      year: y,
      count: carsData.filter(c => c.year === y).length,
    }));

    const evRange = carsData.filter(c => c.fuel === 'electrico' && c.electric_range_km);
    const avgEvRange = evRange.length > 0 ? Math.round(evRange.reduce((s, c) => s + (c.electric_range_km || 0), 0) / evRange.length) : 0;

    const hpRange = carsData.filter(c => c.hp && c.hp > 0);
    const avgHp = hpRange.length > 0 ? Math.round(hpRange.reduce((s, c) => s + (c.hp || 0), 0) / hpRange.length) : 0;

    return {
      total, brandCounts, fuelCounts, typeCounts,
      avgPrice, medianPrice, minPrice, maxPrice,
      yearCounts, avgEvRange, avgHp, evCount: evRange.length,
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title="Estadísticas del Mercado Automotriz Chileno"
        description={`Datos y estadísticas de ${stats.total} vehículos en Chile: precios, distribución por marca, tipo de combustible y tendencias.`}
      />

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">📊 Estadísticas del Mercado</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl">
          Datos agregados de {stats.total} vehículos disponibles en Chile.
        </p>
      </div>

      {/* Resumen general */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard label="Vehículos" value={stats.total.toString()} icon="🚗" />
        <StatCard label="Marcas" value={brands.length.toString()} icon="🏷️" />
        <StatCard label="Eléctricos" value={stats.evCount.toString()} icon="⚡" />
        <StatCard label="HP Promedio" value={stats.avgHp.toString()} icon="💪" />
      </div>

      {/* Precios */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">💰 Precios</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Precio mínimo</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatPrice(stats.minPrice)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Promedio</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(Math.round(stats.avgPrice))}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Mediana</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{formatPrice(stats.medianPrice)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Precio máximo</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatPrice(stats.maxPrice)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Por marca */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🏷️ Por Marca</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stats.brandCounts.slice(0, 15).map(b => (
              <div key={b.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{b.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(b.count / stats.brandCounts[0].count) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white w-8 text-right">{b.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por combustible */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">⛽ Por Tipo de Combustible</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
          <div className="space-y-3">
            {stats.fuelCounts.map(f => (
              <div key={f.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{f.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div className={`h-full ${f.color} rounded-full`} style={{ width: `${(f.count / stats.total) * 100}%` }} />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white w-12 text-right">
                    {f.count} ({Math.round((f.count / stats.total) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por tipo */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🚙 Por Tipo de Vehículo</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
          <div className="space-y-3">
            {stats.typeCounts.map(t => (
              <div key={t.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{t.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(t.count / stats.total) * 100}%` }} />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white w-12 text-right">
                    {t.count} ({Math.round((t.count / stats.total) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por año */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📅 Por Año</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
          <div className="space-y-2">
            {stats.yearCounts.map(y => (
              <div key={y.year} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{y.year}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(y.count / stats.total) * 100}%` }} />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white w-12 text-right">{y.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Datos EV */}
      {stats.evCount > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Autos Eléctricos</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Autonomía promedio</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.avgEvRange} km</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Modelos eléctricos</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.evCount}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Top 5 por autonomía:</p>
              <div className="space-y-1">
                {carsData
                  .filter(c => c.fuel === 'electrico' && c.electric_range_km)
                  .sort((a, b) => (b.electric_range_km || 0) - (a.electric_range_km || 0))
                  .slice(0, 5)
                  .map(c => (
                    <div key={c.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">{c.brand} {c.model}</span>
                      <span className="font-bold text-gray-900 dark:text-white">{c.electric_range_km} km</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 card-shadow text-center">
      <span className="text-3xl block mb-2">{icon}</span>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div>
  );
}
