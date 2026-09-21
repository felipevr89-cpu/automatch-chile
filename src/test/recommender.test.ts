import { describe, it, expect } from 'vitest';
import { parseQuery, recommend, scoreRecommendation } from '../data/recommender';
import { Car } from '../types';

const base = (over: Partial<Car>): Car => ({
  id: 1,
  brand: 'Toyota',
  model: 'Corolla',
  year: 2026,
  type: 'sedan',
  fuel: 'hibrido',
  seats: 5,
  price: 15000000,
  transmission: 'automatica',
  traction: '4x2',
  image_url: '',
  description: '',
  origin: 'chileno',
  versions: [],
  ...over,
});

const cars: Car[] = [
  base({ id: 1, brand: 'Toyota', model: 'Corolla', type: 'sedan', price: 15000000, fuel: 'hibrido', fuel_consumption_mixed_km_l: 18, airbags: 6, safety_ratings: [{ program: 'Euro NCAP', stars: 5, year: 2024, source: 'x' }], transmission: 'automatica', traction: '4x2' }),
  base({ id: 2, brand: 'Toyota', model: 'RAV4', type: 'suv', price: 24000000, fuel: 'hibrido', traction: '4x4', fuel_consumption_mixed_km_l: 15, ground_clearance_mm: 200, adas: ['A', 'B', 'C', 'D'], transmission: 'automatica' }),
  base({ id: 3, brand: 'Toyota', model: 'Camry', type: 'sedan', price: 30500000, fuel: 'gasolina', hp: 160, traction: '4x2', transmission: 'automatica' }),
  base({ id: 4, brand: 'Jeep', model: 'Wrangler', type: 'suv', price: 36500000, fuel: 'gasolina', traction: '4x4', ground_clearance_mm: 250, hp: 200, torque_nm: 400, transmission: 'manual' }),
  base({ id: 5, brand: 'Kia', model: 'Sorento', type: 'suv', price: 30000000, fuel: 'diesel', traction: '4x4', seats: 7, torque_nm: 400, transmission: 'automatica' }),
  base({ id: 6, brand: 'Mazda', model: 'Mazda 3', type: 'hatchback', price: 19000000, fuel: 'gasolina', traction: '4x2', transmission: 'manual' }),
  base({ id: 7, brand: 'Hyundai', model: 'IONIQ 5', type: 'suv', price: 38500000, fuel: 'electrico', traction: '4x2', electric_range_km: 450, battery_kwh: 74, transmission: 'automatica' }),
  base({ id: 8, brand: 'Toyota', model: 'Yaris Cross', type: 'suv', price: 14500000, fuel: 'gasolina', traction: '4x2', transmission: 'automatica' }),
];

const brands = ['Toyota', 'Jeep', 'Kia', 'Mazda', 'Hyundai'];

describe('parseQuery', () => {
  it('parses body, fuel and budget cap', () => {
    const i = parseQuery('suv hibrida de menos de 15 millones', brands);
    expect(i.bodyType).toBe('suv');
    expect(i.fuel).toBe('hibrido');
    expect(i.budget?.max).toBe(15000000);
  });

  it('parses budget range', () => {
    const i = parseQuery('auto entre 12 y 20 millones', brands);
    expect(i.budget).toEqual({ min: 12000000, max: 20000000 });
  });

  it('parses budget min with palos', () => {
    const i = parseQuery('mas de 30 palos', brands);
    expect(i.budget?.min).toBe(30000000);
  });

  it('parses CLP with dots', () => {
    const i = parseQuery('$25.000.000 maximo', brands);
    expect(i.budget?.max).toBe(25000000);
  });

  it('sets fuel electrcio over bencina mention', () => {
    const i = parseQuery('auto electrico, cero bencina', brands);
    expect(i.fuel).toBe('electrico');
  });

  it('maps usage family', () => {
    const i = parseQuery('para la familia con dos niños', brands);
    expect(i.usage).toBe('family');
  });

  it('maps usage adventure and traction', () => {
    const i = parseQuery('para el campo y la nieve', brands);
    expect(i.usage).toBe('adventure');
  });

  it('parses transmission, seats and traction together', () => {
    const i = parseQuery('automatica, 7 asientos, 4x4', brands);
    expect(i.transmission).toBe('automatica');
    expect(i.minSeats).toBe(7);
    expect(i.traction).toBe('4x4');
  });

  it('detects multiple priorities', () => {
    const i = parseQuery('necesito seguridad y harto espacio', brands);
    expect(i.priorities).toContain('safety');
    expect(i.priorities).toContain('space');
  });

  it('detects brand and body', () => {
    const i = parseQuery('un toyota suv', brands);
    expect(i.brands).toContain('Toyota');
    expect(i.bodyType).toBe('suv');
  });

  it('detects year', () => {
    const i = parseQuery('suv del año 2025', brands);
    expect(i.minYear).toBe(2025);
  });

  it('leaves unknown words', () => {
    const i = parseQuery('quiero un auto qurintolelo de 5 plazas', brands);
    expect(i.unknown.length).toBeGreaterThan(0);
  });
});

describe('recommend', () => {
  it('flags unclear query without signal', () => {
    const r = recommend('dame un auto', cars, brands);
    expect(r.unclear).toBe(true);
    expect(r.list).toHaveLength(0);
  });

  it('filters by brand and body', () => {
    const r = recommend('toyota suv', cars, brands);
    expect(r.list.length).toBeGreaterThan(0);
    for (const rec of r.list) {
      expect(rec.car.brand).toBe('Toyota');
      expect(rec.car.type).toBe('suv');
    }
  });

  it('ranks cheaper suv above expensive suv on budget', () => {
    const r = recommend('suv de menos de 15 millones', cars, brands);
    expect(r.list.length).toBeGreaterThan(0);
    expect(r.list[0].car.model).toBe('Yaris Cross');
    const cheap = r.list.find(x => x.car.price <= 15000000);
    const expensive = r.list.find(x => x.car.price > 15000000);
    expect(cheap && expensive).toBeTruthy();
    expect(cheap!.score).toBeGreaterThan(expensive!.score);
  });

  it('hard-filters 7-seater when required', () => {
    const r = recommend('quiero 7 plazas diesel', cars, brands);
    expect(r.list.length).toBe(1);
    expect(r.list[0].car.model).toBe('Sorento');
  });

  it('ranks EV on top for electrico', () => {
    const r = recommend('auto electrico', cars, brands);
    expect(r.list[0].car.fuel).toBe('electrico');
  });

  it('favors 4x4/awd for adventure 4x4', () => {
    const r = recommend('un 4x4 para aventura', cars, brands);
    expect(r.list.slice(0, 3).every(x => x.car.traction === '4x4' || x.car.traction === 'awd')).toBe(true);
  });

  it('produces at least one reason for top pick', () => {
    const r = recommend('suv segura de menos de 20 millones', cars, brands);
    expect(r.list[0].reasons.length).toBeGreaterThan(0);
  });

  it('scores are bounded and normalized', () => {
    const r = recommend('suv segura de menos de 20 millones', cars, brands);
    for (const rec of r.list) {
      expect(rec.max).toBeGreaterThan(0);
      expect(rec.affinity).toBeGreaterThanOrEqual(0);
      expect(rec.affinity).toBeLessThanOrEqual(100);
    }
  });
});

describe('scoreRecommendation', () => {
  it('rewards budget fit', () => {
    const intent = parseQuery('menos de 15 millones', brands);
    const a = scoreRecommendation(cars[0], intent);
    const b = scoreRecommendation(cars[2], intent);
    expect(a.score).toBeGreaterThan(b.score);
  });
});