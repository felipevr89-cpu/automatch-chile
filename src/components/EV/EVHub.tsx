import { Car } from '../../types';
import { formatPrice } from '../../data/brands';
import { getChargingCost, HOME_KWH_CLP, FAST_KWH_CLP, GASOLINE_CLP_PER_L } from '../../data/energyCosts';

interface Props {
  car: Car;
  comparisonCar?: Car;
}

function getSavingsData(car: Car, comparisonCar?: Car) {
  const charging = getChargingCost(car);
  if (!charging || !charging.homePer100) return null;

  const avgGasolineCar = comparisonCar;
  const gasolinePer100 = avgGasolineCar?.fuel_consumption_mixed_km_l
    ? Math.round((GASOLINE_CLP_PER_L / avgGasolineCar.fuel_consumption_mixed_km_l))
    : null;

  return {
    electricPer100: charging.homePer100,
    gasolinePer100,
    savingsPer100: gasolinePer100 ? gasolinePer100 - charging.homePer100 : null,
    homeFull: charging.homeFull,
    fastFull: charging.fastFull,
    batteryKwh: charging.batteryKwh,
  };
}

export function EVHub({ car, comparisonCar }: Props) {
  if (car.fuel !== 'electrico' && car.fuel !== 'hibrido_enchufable') return null;

  const savings = getSavingsData(car, comparisonCar);
  if (!savings) return null;

  const isPHEV = car.fuel === 'hibrido_enchufable';
  const range = car.electric_range_km ?? 0;

  return (
    <div className="mb-6 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">⚡</span>
        <h3 className="text-base font-bold text-gray-900">
          {isPHEV ? '🔋 Plug-in Hybrid' : '⚡ Vehículo Eléctrico'}
        </h3>
      </div>

      {/* Autonomía */}
      {range > 0 && (
        <div className="mb-4 p-3 bg-white rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Autonomía eléctrica</p>
              <p className="text-2xl font-bold text-green-700">{range} km</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Batería</p>
              <p className="text-sm font-semibold text-gray-700">{car.battery_kwh} kWh</p>
            </div>
          </div>
          {range >= 400 && (
            <p className="text-xs text-green-600 mt-2 font-medium">
              ✅ Suficiente para trayectos largos Santiago-Valparaíso (~120 km)
            </p>
          )}
          {range < 200 && (
            <p className="text-xs text-amber-600 mt-2 font-medium">
              ⚠️ Ideal para uso urbano. Para viajes largos considere carga rápida.
            </p>
          )}
        </div>
      )}

      {/* Ahorro vs bencina */}
      <div className="mb-4 p-3 bg-white rounded-xl">
        <p className="text-xs text-gray-500 mb-2">Costo por 100 km</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <p className="text-[10px] text-green-600 font-medium">⚡ Eléctrico (hogar)</p>
            <p className="text-lg font-bold text-green-700">{formatPrice(savings.electricPer100)}</p>
          </div>
          {savings.gasolinePer100 && (
            <div className="p-2 bg-red-50 rounded-lg">
              <p className="text-[10px] text-red-600 font-medium">⛽ Bencina promedio</p>
              <p className="text-lg font-bold text-red-700">{formatPrice(savings.gasolinePer100)}</p>
            </div>
          )}
        </div>
        {savings.savingsPer100 && savings.savingsPer100 > 0 && (
          <div className="mt-2 p-2 bg-green-100 rounded-lg text-center">
            <p className="text-sm font-bold text-green-800">
              Ahorras {formatPrice(savings.savingsPer100)} cada 100 km
            </p>
            <p className="text-[10px] text-green-600">
              En 15.000 km/año: {formatPrice(Math.round(savings.savingsPer100 * 150))} al año
            </p>
          </div>
        )}
      </div>

      {/* Costos de carga */}
      <div className="mb-4 p-3 bg-white rounded-xl">
        <p className="text-xs text-gray-500 mb-2">Costo carga completa</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <p className="text-[10px] text-green-600">🟢 Carga hogar</p>
            <p className="text-sm font-bold text-green-700">{formatPrice(savings.homeFull)}</p>
            <p className="text-[10px] text-gray-500">${HOME_KWH_CLP}/kWh</p>
          </div>
          <div className="p-2 bg-amber-50 rounded-lg">
            <p className="text-[10px] text-amber-600">🟠 Carga rápida</p>
            <p className="text-sm font-bold text-amber-700">{formatPrice(savings.fastFull)}</p>
            <p className="text-[10px] text-gray-500">${FAST_KWH_CLP}/kWh</p>
          </div>
        </div>
      </div>

      {/* Tips específicos Chile */}
      <div className="p-3 bg-white rounded-xl">
        <p className="text-xs text-gray-500 mb-2">💡 Tips para EV en Chile</p>
        <ul className="space-y-1.5">
          <li className="text-xs text-gray-700 flex items-start gap-1.5">
            <span className="text-green-500 mt-0.5">•</span>
            <span>Carga nocturna en casa: tarifa hora valle ~$60/kWh vs hora punta ~$150/kWh</span>
          </li>
          <li className="text-xs text-gray-700 flex items-start gap-1.5">
            <span className="text-green-500 mt-0.5">•</span>
            <span>Exento de restricción vehicular en Santiago</span>
          </li>
          <li className="text-xs text-gray-700 flex items-start gap-1.5">
            <span className="text-green-500 mt-0.5">•</span>
            <span>Permiso de circulación con descuento hasta 2027</span>
          </li>
          <li className="text-xs text-gray-700 flex items-start gap-1.5">
            <span className="text-green-500 mt-0.5">•</span>
            <span>60% de comunas aún sin carga pública — verifique cobertura en su zona</span>
          </li>
          {isPHEV && (
            <li className="text-xs text-gray-700 flex items-start gap-1.5">
              <span className="text-amber-500 mt-0.5">•</span>
              <span>Como PHEV, puede funcionar en modo eléctrico para trayectos cortos y combustible para largos</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
