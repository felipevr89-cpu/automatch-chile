import { ReactNode } from 'react';
import { Car } from '../../types';
import { formatPrice, getTypeLabel, getFuelLabel, getBrandUrl } from '../../data/brands';
import { getChargingCost, getCombustionCostPer100, HOME_KWH_CLP, FAST_KWH_CLP } from '../../data/energyCosts';
import { getCarImage } from '../../data/carImages';
import { CarImage } from './CarImage';

interface Props {
  car: Car;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onPrevCar?: () => void;
  onNextCar?: () => void;
  children?: ReactNode;
}

function CarImageSection({ car }: { car: Car }) {
  const img = getCarImage(car.id);
  return (
    <div className="-mx-8 -mt-8 mb-6 overflow-hidden">
      <CarImage
        carId={car.id}
        brand={car.brand}
        model={car.model}
        type={car.type}
        className="w-full h-56"
        eager
      />
      {img?.file && img.attribution && (
        <p className="text-[10px] text-gray-400 px-8 pt-1 text-right">
          Foto: {img.attribution}
          {img.license ? ` · ${img.license}` : ''}
          {img.source && (
            <>
              {' · '}
              <a href={img.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
                Wikimedia
              </a>
            </>
          )}
        </p>
      )}
    </div>
  );
}

function NextSteps({ car }: { car: Car }) {
  const q = encodeURIComponent(`${car.brand} ${car.model} ${car.year} Chile`);
  const nuevosUrl = `https://www.chileautos.cl/vehiculos/?q=${encodeURIComponent(car.brand + ' ' + car.model)}`;
  const usadosUrl = `https://www.google.com/search?q=${encodeURIComponent(car.brand + ' ' + car.model + ' usado Chile')}`;
  const preciosUrl = `https://www.google.com/search?q=${q}+precio`;
  const shareText = `Mira el ${car.brand} ${car.model} ${car.year} (${formatPrice(car.price)}) en AutoMatch Chile`;
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' — https://automatchs.pages.dev')}`;

  return (
    <div className="mt-8 mb-2 p-5 bg-blue-50 rounded-2xl">
      <h3 className="text-base font-bold text-gray-900 mb-1">¿Te interesa este auto?</h3>
      <p className="text-sm text-gray-500 mb-4">Estos son tus próximos pasos para comprarlo o cotizarlo.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={getBrandUrl(car.brand)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          <span className="text-xl">🏢</span>
          <span className="text-sm">Cotizar en {car.brand} oficial</span>
        </a>
        <a
          href={nuevosUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-white text-gray-800 rounded-xl font-medium hover:bg-gray-100 border border-gray-200 transition-colors"
        >
          <span className="text-xl">🔎</span>
          <span className="text-sm">Ver disponibilidad (Chileautos)</span>
        </a>
        <a
          href={usadosUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-white text-gray-800 rounded-xl font-medium hover:bg-gray-100 border border-gray-200 transition-colors"
        >
          <span className="text-xl">🚗</span>
          <span className="text-sm">Buscar usados</span>
        </a>
        <a
          href={preciosUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-white text-gray-800 rounded-xl font-medium hover:bg-gray-100 border border-gray-200 transition-colors"
        >
          <span className="text-xl">💲</span>
          <span className="text-sm">Comparar precios reales</span>
        </a>
      </div>
      <a
        href={shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 p-2.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors text-sm"
      >
        <span>💬</span> Compartir por WhatsApp
      </a>
    </div>
  );
}

export function CarDetail({ car, onClose, isFavorite, onToggleFavorite, onPrevCar, onNextCar, children }: Props) {
  const charging = getChargingCost(car);
  const combustionPer100 = getCombustionCostPer100(car);
  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 z-10"
          >
            ×
          </button>

          <CarImageSection car={car} />

          {(onPrevCar || onNextCar) && (
            <div className="flex justify-between items-center -mt-3 mb-4 px-2">
              <button
                onClick={onPrevCar}
                disabled={!onPrevCar}
                className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Anterior
              </button>
              <button
                onClick={onNextCar}
                disabled={!onNextCar}
                className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente →
              </button>
            </div>
          )}

          <div className="mb-6">
            <p className="text-sm text-gray-500">{car.brand}</p>
            <h2 className="text-2xl font-bold text-gray-900">{car.model}</h2>
            <p className="text-gray-600">{car.year}</p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {car.safety_ratings?.some(r => r.stars === 5) && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-1">
                🛡️ 5 ★ en crash tests
              </span>
            )}
            {car.electric_range_km && car.electric_range_km > 500 && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold flex items-center gap-1">
                🚗 Autonomía {car.electric_range_km} km
              </span>
            )}
            {car.battery_kwh && car.battery_kwh > 80 && (
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold flex items-center gap-1">
                🔋 Batería grande {car.battery_kwh} kWh
              </span>
            )}
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
            {car.origin_country && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                🌍 {car.origin_country}
              </span>
            )}
            {car.airbags != null && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                🛡️ {car.airbags} airbags
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{car.description}</p>

          {charging && (
            <div className="mb-6 p-4 bg-green-50 rounded-xl">
              <h3 className="text-sm font-semibold text-green-800 mb-3">💡 Costo de carga estimado</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500">Carga completa en casa</p>
                  <p className="text-lg font-bold text-green-700">{formatPrice(charging.homeFull)}</p>
                  {charging.homePer100 != null && (
                    <p className="text-xs text-gray-500 mt-0.5">≈ {formatPrice(charging.homePer100)} / 100 km</p>
                  )}
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500">Carga rápida pública</p>
                  <p className="text-lg font-bold text-amber-700">{formatPrice(charging.fastFull)}</p>
                  {charging.fastPer100 != null && (
                    <p className="text-xs text-gray-500 mt-0.5">≈ {formatPrice(charging.fastPer100)} / 100 km</p>
                  )}
                </div>
              </div>
              {combustionPer100 == null && charging.homePer100 != null && (
                <p className="text-[11px] text-gray-400 mt-2">
                  Estimación con batería de {charging.batteryKwh} kWh · hogar ${HOME_KWH_CLP}/kWh · carga rápida ${FAST_KWH_CLP}/kWh. Valores referenciales.
                </p>
              )}
            </div>
          )}

          {combustionPer100 != null && (
            <div className="mb-6 p-4 bg-orange-50 rounded-xl flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-orange-800">⛽ Costo de combustible estimado</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Según consumo mixto {car.fuel_consumption_mixed_km_l} km/L. Precio referencial.</p>
              </div>
              <p className="text-lg font-bold text-orange-700 whitespace-nowrap">{formatPrice(combustionPer100)} <span className="text-xs font-normal text-gray-500">/ 100 km</span></p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 mb-6">
            {car.hp != null && (
              <div className="p-3 bg-blue-50 rounded-xl text-center">
                <p className="text-lg">⚡</p>
                <p className="text-xs text-blue-600 font-medium">Potencia</p>
                <p className="text-sm font-bold text-blue-900">{car.hp} HP</p>
              </div>
            )}
            {car.torque_nm != null && (
              <div className="p-3 bg-indigo-50 rounded-xl text-center">
                <p className="text-lg">🔧</p>
                <p className="text-xs text-indigo-600 font-medium">Torque</p>
                <p className="text-sm font-bold text-indigo-900">{car.torque_nm} Nm</p>
              </div>
            )}
            {(car.electric_range_km ?? 0) > 0 && (
              <div className="p-3 bg-green-50 rounded-xl text-center">
                <p className="text-lg">🔋</p>
                <p className="text-xs text-green-600 font-medium">Autonomía</p>
                <p className="text-sm font-bold text-green-900">{car.electric_range_km} km</p>
              </div>
            )}
            {(car.battery_kwh ?? 0) > 0 && (
              <div className="p-3 bg-lime-50 rounded-xl text-center">
                <p className="text-lg">🔌</p>
                <p className="text-xs text-lime-600 font-medium">Batería</p>
                <p className="text-sm font-bold text-lime-900">{car.battery_kwh} kWh</p>
              </div>
            )}
            {(car.fuel_consumption_mixed_km_l ?? 0) > 0 && (
              <div className="p-3 bg-green-50 rounded-xl text-center">
                <p className="text-lg">⛽</p>
                <p className="text-xs text-green-600 font-medium">Consumo mixto</p>
                <p className="text-sm font-bold text-green-900">{car.fuel_consumption_mixed_km_l} km/L</p>
              </div>
            )}
            {(car.fuel_consumption_city_km_l ?? 0) > 0 && (
              <div className="p-3 bg-emerald-50 rounded-xl text-center">
                <p className="text-lg">🏙️</p>
                <p className="text-xs text-emerald-600 font-medium">Consumo ciudad</p>
                <p className="text-sm font-bold text-emerald-900">{car.fuel_consumption_city_km_l} km/L</p>
              </div>
            )}
            {(car.fuel_consumption_highway_km_l ?? 0) > 0 && (
              <div className="p-3 bg-teal-50 rounded-xl text-center">
                <p className="text-lg">🛣️</p>
                <p className="text-xs text-teal-600 font-medium">Consumo carretera</p>
                <p className="text-sm font-bold text-teal-900">{car.fuel_consumption_highway_km_l} km/L</p>
              </div>
            )}
            {car.airbags != null && (
              <div className="p-3 bg-purple-50 rounded-xl text-center">
                <p className="text-lg">🛡️</p>
                <p className="text-xs text-purple-600 font-medium">Airbags</p>
                <p className="text-sm font-bold text-purple-900">{car.airbags}</p>
              </div>
            )}
            {(car.trunk_liters ?? 0) > 0 && (
              <div className="p-3 bg-orange-50 rounded-xl text-center">
                <p className="text-lg">🧳</p>
                <p className="text-xs text-orange-600 font-medium">Baúl</p>
                <p className="text-sm font-bold text-orange-900">{car.trunk_liters} L</p>
              </div>
            )}
            {car.length_mm != null && (
              <div className="p-3 bg-rose-50 rounded-xl text-center">
                <p className="text-lg">📏</p>
                <p className="text-xs text-rose-600 font-medium">Largo</p>
                <p className="text-sm font-bold text-rose-900">{car.length_mm} mm</p>
              </div>
            )}
            {car.wheelbase_mm != null && (
              <div className="p-3 bg-pink-50 rounded-xl text-center">
                <p className="text-lg">📐</p>
                <p className="text-xs text-pink-600 font-medium">Dist. entre ejes</p>
                <p className="text-sm font-bold text-pink-900">{car.wheelbase_mm} mm</p>
              </div>
            )}
            {car.ground_clearance_mm != null && (
              <div className="p-3 bg-fuchsia-50 rounded-xl text-center">
                <p className="text-lg">⬆️</p>
                <p className="text-xs text-fuchsia-600 font-medium">Altura libre</p>
                <p className="text-sm font-bold text-fuchsia-900">{car.ground_clearance_mm} mm</p>
              </div>
            )}
            {(car.fuel_tank_liters ?? 0) > 0 && (
              <div className="p-3 bg-cyan-50 rounded-xl text-center">
                <p className="text-lg">⛽</p>
                <p className="text-xs text-cyan-600 font-medium">Tanque</p>
                <p className="text-sm font-bold text-cyan-900">{car.fuel_tank_liters} L</p>
              </div>
            )}
            {(car.latin_ncap_stars ?? 0) > 0 && (
              <div className="p-3 bg-yellow-50 rounded-xl text-center">
                <p className="text-lg">⭐</p>
                <p className="text-xs text-yellow-600 font-medium">Latin NCAP</p>
                <p className="text-sm font-bold text-yellow-900">{'⭐'.repeat(Math.min(car.latin_ncap_stars!, 5))}</p>
              </div>
            )}
            {car.warranty_years != null && (
              <div className="p-3 bg-sky-50 rounded-xl text-center">
                <p className="text-lg">📜</p>
                <p className="text-xs text-sky-600 font-medium">Garantía</p>
                <p className="text-sm font-bold text-sky-900">{car.warranty_years} años{(car.warranty_km ?? 0) > 0 ? ` / ${(car.warranty_km! / 1000).toFixed(0)} mil km` : ''}</p>
              </div>
            )}
            {car.origin_country && (
              <div className="p-3 bg-gray-50 rounded-xl text-center">
                <p className="text-lg">🌍</p>
                <p className="text-xs text-gray-600 font-medium">País de origen</p>
                <p className="text-sm font-bold text-gray-900">{car.origin_country}</p>
              </div>
            )}
          </div>

          {(car.safety_ratings ?? []).length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Calificaciones de seguridad (crash tests)</h3>
              <div className="space-y-1.5">
                {(car.safety_ratings ?? []).map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-yellow-50 rounded-lg">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{r.program}</p>
                      <p className="text-xs text-gray-500">
                        Evaluación {r.year}
                        {r.note ? ` · ${r.note}` : ''}
                        {' · '}
                        <a
                          href={r.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          fuente
                        </a>
                      </p>
                    </div>
                    <span className="text-sm font-bold text-yellow-700 whitespace-nowrap ml-2">
                      {'★'.repeat(Math.min(r.stars, 5))}
                      <span className="text-yellow-300">{'★'.repeat(Math.max(0, 5 - r.stars))}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(car.adas ?? []).length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Seguridad y ADAS</h3>
              <div className="flex flex-wrap gap-1.5">
                {(car.adas ?? []).map((a, i) => (
                  <span key={i} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">{a}</span>
                ))}
              </div>
            </div>
          )}

          {(car.infotainment ?? []).length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Tecnología</h3>
              <div className="flex flex-wrap gap-1.5">
                {(car.infotainment ?? []).map((t, i) => (
                  <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>
          )}

          {car.versions && car.versions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Versiones disponibles</h3>
              <div className="space-y-2">
                {car.versions.map((v, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{v.version}</p>
                      <p className="text-xs text-gray-500">{v.transmission} · {v.traction}</p>
                    </div>
                    <p className="text-sm font-bold text-blue-600">{formatPrice(v.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm text-gray-500">Precio desde</p>
              <p className="text-3xl font-bold text-blue-600">{formatPrice(car.price)}</p>
              <p className="text-[11px] text-gray-400 mt-1">Precio referencial. Confirmar en el sitio oficial.</p>
            </div>
            <div className="flex gap-2">
              <a
                href={getBrandUrl(car.brand)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                title={`Sitio oficial ${car.brand}`}
              >
                🌐 Sitio oficial {car.brand}
              </a>
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
          </div>

          <NextSteps car={car} />

          {children}
        </div>
      </div>
    </>
  );
}
