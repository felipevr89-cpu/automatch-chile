import { Car } from '../types';

export const HOME_KWH_CLP = 150;
export const FAST_KWH_CLP = 350;
export const GASOLINE_CLP_PER_L = 1300;
export const DIESEL_CLP_PER_L = 1150;

export interface ChargingCost {
  batteryKwh: number;
  homeFull: number;
  fastFull: number;
  rangeKm?: number;
  homePer100: number | null;
  fastPer100: number | null;
}

export function getChargingCost(car: Car): ChargingCost | null {
  const batteryKwh = car.battery_kwh ?? 0;
  if (batteryKwh <= 0) return null;
  if (car.fuel !== 'electrico' && car.fuel !== 'hibrido_enchufable') return null;

  const homeFull = Math.round(batteryKwh * HOME_KWH_CLP);
  const fastFull = Math.round(batteryKwh * FAST_KWH_CLP);
  const rangeKm = car.electric_range_km && car.electric_range_km > 0 ? car.electric_range_km : undefined;

  return {
    batteryKwh,
    homeFull,
    fastFull,
    rangeKm,
    homePer100: rangeKm ? Math.round((homeFull / rangeKm) * 100) : null,
    fastPer100: rangeKm ? Math.round((fastFull / rangeKm) * 100) : null,
  };
}

export function getCombustionCostPer100(car: Car): number | null {
  const kml = car.fuel_consumption_mixed_km_l ?? 0;
  if (kml <= 0) return null;
  if (car.fuel !== 'gasolina' && car.fuel !== 'diesel') return null;
  const pricePerL = car.fuel === 'diesel' ? DIESEL_CLP_PER_L : GASOLINE_CLP_PER_L;
  const litersPer100 = 100 / kml;
  return Math.round(litersPer100 * pricePerL);
}
