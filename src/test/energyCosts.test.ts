import { describe, it, expect } from 'vitest';
import { getChargingCost, getCombustionCostPer100, HOME_KWH_CLP, FAST_KWH_CLP } from '../data/energyCosts';
import { Car } from '../types';

const base: Car = {
  id: 1, brand: 'Test', model: 'X', year: 2026, price: 1000, type: 'suv',
  fuel: 'electrico', traction: '4x2', image_url: '',
} as Car;

describe('energyCosts', () => {
  it('computes charging cost for EV with battery and range', () => {
    const c = getChargingCost({ ...base, battery_kwh: 60, electric_range_km: 400 });
    expect(c).not.toBeNull();
    expect(c!.homeFull).toBe(60 * HOME_KWH_CLP);
    expect(c!.fastFull).toBe(60 * FAST_KWH_CLP);
    expect(c!.homePer100).toBe(Math.round((60 * HOME_KWH_CLP / 400) * 100));
    expect(c!.fastPer100).toBe(Math.round((60 * FAST_KWH_CLP / 400) * 100));
  });

  it('returns null charging cost without battery', () => {
    expect(getChargingCost({ ...base, battery_kwh: undefined })).toBeNull();
  });

  it('returns null charging cost for combustion cars', () => {
    expect(getChargingCost({ ...base, fuel: 'gasolina', battery_kwh: 60 })).toBeNull();
  });

  it('computes combustion cost per 100 km', () => {
    const cost = getCombustionCostPer100({ ...base, fuel: 'gasolina', fuel_consumption_mixed_km_l: 10 });
    expect(cost).toBeGreaterThan(0);
  });

  it('returns null combustion cost for EV', () => {
    expect(getCombustionCostPer100({ ...base, fuel: 'electrico', fuel_consumption_mixed_km_l: 10 })).toBeNull();
  });
});
