import type { Car } from '../types';
import { brands as catalogBrands, formatPrice, carsData } from './brands';

export interface QueryIntent {
  budget?: { min?: number; max?: number };
  usage?: 'daily' | 'family' | 'adventure' | 'highway' | 'work';
  fuel?: 'gasolina' | 'diesel' | 'electrico' | 'hibrido' | 'hibrido_enchufable';
  transmission?: 'manual' | 'automatica';
  traction?: '4x2' | '4x4' | 'awd';
  minSeats?: number;
  bodyType?: string;
  priorities: string[];
  brands: string[];
  minYear?: number;
  unknown: string[];
}

export interface Recommendation {
  car: Car;
  affinity: number;
  score: number;
  max: number;
  reasons: string[];
}

export interface RecommendResult {
  intent: QueryIntent;
  list: Recommendation[];
  unclear: boolean;
}

const esc = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const wordRe = (w: string) => `(^|\\W)${esc(w)}(\\W|$)`;

const FUEL_WORDS: Record<string, string[]> = {
  hibrido_enchufable: ['enchufable', 'plug in', 'plug-in', 'phev'],
  electrico: ['electrico', 'electrica', 'cero emisiones', 'ceroemisiones', 'bateria', 'ev'],
  hibrido: ['hibrido', 'hibrida', 'hybrid'],
  diesel: ['diesel', 'gasolero'],
  gasolina: ['gasolina', 'bencina', 'petrol'],
};

const USAGE_WORDS: Record<string, string[]> = {
  daily: ['ciudad', 'urbano', 'urbana', 'diario', 'diaria', 'centro', 'trabajo diario'],
  family: ['familia', 'familiares', 'ninos', 'nino', 'hijos', 'escuela', 'colegio', 'paseo'],
  adventure: ['aventura', 'off road', 'offroad', 'nieve', 'camping', 'cerro', 'tierra', 'barro', 'camino rural'],
  highway: ['carretera', 'ruta', 'autopista', 'viajes', 'viaje largo', 'kilometraje'],
  work: ['carga', 'obra', 'comercio', 'reparto', 'feria', 'pesado', 'utilidad', 'trabajo'],
};

const PRIORITY_WORDS: Record<string, string[]> = {
  performance: ['rendimiento', 'potencia', 'rapido', 'rapida', 'veloz', 'deportivo', 'deportiva', 'aceleracion', 'caballos', 'turbo'],
  safety: ['seguridad', 'seguro', 'segura', 'airbags', 'ncap', 'adas', 'frenos'],
  space: ['espacio', 'espacioso', 'maletero', 'baul', 'capacidad', 'grande', 'amplio'],
  economy: ['economico', 'economica', 'barato', 'barata', 'ahorro', 'eficiente', 'consumo', 'eficiencia'],
  technology: ['tecnologia', 'tecnologico', 'conectividad', 'pantalla', 'moderno', 'moderna'],
};

const BODY_WORDS: Record<string, string[]> = {
  sedan: ['sedan', 'sedanes', 'berlina'],
  suv: ['suv', 'todo terreno', 'todoterreno'],
  pickup: ['pickup', 'pick up', 'camioneta'],
  hatchback: ['hatchback', 'compacto', 'hach', 'hatch'],
  minivan: ['minivan', 'van', 'mpv'],
  wagon: ['wagon', 'rural', 'vagoneta'],
  coupe: ['coupe', 'cup', 'deportivo dos'],
  convertible: ['convertible', 'descapotable'],
};

const TRANSMISSION_WORDS: Record<string, string[]> = {
  automatica: ['automatica', 'automatico', 'cvt'],
  manual: ['manual'],
};

const TRACTION_WORDS: Record<string, string[]> = {
  '4x4': ['4x4', 'awd', 'traccion total', 'doble traccion'],
  '4x2': ['4x2', 'traccion simple'],
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\$/g, ' ')
    .replace(/\n/g, ' ');
}

function toCLP(raw: string, unit?: string): number {
  const base = parseInt(raw.replace(/[^0-9]/g, ''), 10);
  const u = (unit || raw).toLowerCase();
  return /(millones|palos|palo|m)\b/.test(u) ? base * 1e6 : base;
}

export function parseQuery(text: string, brandList: string[] = catalogBrands): QueryIntent {
  let s = ' ' + normalize(text).split(/\s+/).join(' ') + ' ';
  const intent: QueryIntent = { priorities: [], brands: [], unknown: [] };

  const years = [...s.matchAll(/\b(19|20)\d{2}\b/g)].map(m => parseInt(m[0], 10));
  if (years.length > 0) {
    intent.minYear = Math.max(...years);
    s = s.replace(/\b(19|20)\d{2}\b/g, ' ');
  }

  const swap = (words: string[]) =>
    s.replace(new RegExp('(^|\\W)(' + words.map(esc).join('|') + ')(\\W|$)', 'g'), ' ');

  for (const [key, words] of Object.entries(TRACTION_WORDS)) {
    if (words.some(w => new RegExp(wordRe(w), '').test(s))) {
      intent.traction = intent.traction || (key === '4x4' ? '4x4' : '4x2');
      s = swap(words);
      s = s.replace(/\b4x4\b|\b4x2\b|\bawd\b/g, ' ');
    }
  }

  for (const [key, words] of Object.entries(FUEL_WORDS)) {
    if (words.some(w => new RegExp(wordRe(w), '').test(s))) {
      if (key === 'hibrido_enchufable' && intent.fuel === 'hibrido') intent.fuel = 'hibrido_enchufable';
      else if (!intent.fuel) intent.fuel = key as QueryIntent['fuel'];
      s = swap(words);
    }
  }

  for (const [key, words] of Object.entries(TRANSMISSION_WORDS)) {
    if (words.some(w => new RegExp(wordRe(w), '').test(s))) {
      intent.transmission = key as QueryIntent['transmission'];
      s = swap(words);
    }
  }

  for (const [key, words] of Object.entries(USAGE_WORDS)) {
    if (words.some(w => new RegExp(wordRe(w), '').test(s))) {
      if (!intent.usage && key !== 'work') intent.usage = key as QueryIntent['usage'];
      else if (!intent.usage && key === 'work' && !hasWorkRemainder(s)) intent.usage = 'work';
      s = swap(words);
    }
  }

  for (const [key, words] of Object.entries(BODY_WORDS)) {
    if (words.some(w => new RegExp(wordRe(w), '').test(s))) {
      if (!intent.bodyType) intent.bodyType = key;
      s = swap(words);
    }
  }

  for (const [key, words] of Object.entries(PRIORITY_WORDS)) {
    if (words.some(w => new RegExp(wordRe(w), '').test(s))) {
      intent.priorities.push(key);
      s = swap(words);
    }
  }

  const seatMatch = s.match(/\b(\d{1,2})\s*(plazas|asientos|pasajeros|plaza)\b/);
  if (seatMatch) {
    const n = parseInt(seatMatch[1], 10);
    if (n >= 7) intent.minSeats = 7;
    else intent.minSeats = n;
    s = s.replace(new RegExp(`\\b${n}\\s*(plazas|asientos|pasajeros|plaza)\\b`, 'g'), ' ');
  }

  const units = '(?:\\s*(millones|palos|palo|m))?';
  const num = '([0-9][0-9.]*)';
  const range = s.match(new RegExp(`entre\\s+${num}${units}\\s*(?:y|a)\\s+${num}${units}`));
  if (range) {
    const [full, loRaw, loU, hiRaw, hiU] = range;
    const u = loU || hiU;
    intent.budget = { min: toCLP(loRaw, u), max: toCLP(hiRaw, u) };
    s = s.replace(full.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), ' ');
  } else {
    const maxRe = new RegExp(`(?:hasta|menos de|maximo|no pasar de|no por encima de)\\s+${num}${units}`);
    const maxM = s.match(maxRe);
    if (maxM) {
      const [full, raw, u] = maxM;
      intent.budget = { ...intent.budget, max: toCLP(raw, u) };
      s = s.replace(full.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), ' ');
    }
    const minRe = new RegExp(`(?:desde|mas de|sobre|por sobre|minimo)\\s+${num}${units}`);
    const minM = s.match(minRe);
    if (minM) {
      const [full, raw, u] = minM;
      intent.budget = { ...intent.budget, min: toCLP(raw, u) };
      s = s.replace(full.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), ' ');
    }
  }

  if (!intent.budget) {
    const withDots = s.match(/\b\d{1,3}(?:\.\d{3}){1,2}(?:\.\d{3})?\b/);
    if (withDots) {
      intent.budget = { max: toCLP(withDots[0]) };
      s = s.replace(withDots[0].replace(/\./g, '\\.'), ' ');
    } else {
      const withUnit = s.match(/\b(\d+)\s*(millones|palos|palo|m)\b/);
      if (withUnit) {
        intent.budget = { max: toCLP(withUnit[1], withUnit[2]) };
        s = s.replace(withUnit[0].replace(/\./g, '\\.'), '');
      }
    }
  }

  const byLen = [...new Set(brandList)].sort((a, b) => b.length - a.length);
  for (const b of byLen) {
    const re = new RegExp(wordRe(b.toLowerCase()), '');
    if (re.test(s)) {
      intent.brands.push(b);
      s = s.replace(new RegExp(`${esc(b.toLowerCase())}`, 'g'), ' ');
    }
  }

  intent.unknown = [...new Set(s.split(/\s+/).map(t => t.replace(/[^A-Za-z0-9]/g, '')).filter(w => w.length > 2 && !/^[0-9]+$/.test(w)))];

  return intent;
}

function hasWorkRemainder(s: string): boolean {
  const workSuffix = /(carga|obra|feria|reparto)/.test(s);
  return workSuffix && /diario|diaria|ciudad|urbano/.test(s);
}

function getFuelLabelFor(fuel: string): string {
  const map: Record<string, string> = {
    gasolina: 'gasolina',
    diesel: 'diésel',
    electrico: 'eléctrico',
    hibrido: 'híbrido',
    hibrido_enchufable: 'híbrido enchufable',
  };
  return map[fuel] || fuel;
}

interface Part {
  score: number;
  max: number;
  reasons: string[];
}

function scoreBudget(car: Car, b: QueryIntent['budget']): Part {
  if (!b) return { score: 0, max: 0, reasons: [] };
  const price = car.price;
  const inRange = (b.max === undefined || price <= b.max) && (b.min === undefined || price >= b.min);
  let score: number;
  let reasons: string[];
  if (inRange) {
    score = 20;
    reasons = b.min !== undefined
      ? [`Precio ${formatPrice(price)} dentro de tu rango`]
      : [`Precio ${formatPrice(price)} bajo tu tope de ${formatPrice(b.max!)}`];
  } else if (b.min !== undefined && price < b.min) {
    score = 10;
    reasons = [`Precio ${formatPrice(price)}, bajo tu mínimo de ${formatPrice(b.min)}`];
  } else if (b.max !== undefined && price <= b.max * 1.3) {
    score = 8;
    reasons = [`Precio ${formatPrice(price)}, sobre tu tope de ${formatPrice(b.max)} por poco`];
  } else {
    score = 3;
    reasons = [`Precio ${formatPrice(price)}, por encima de tu presupuesto`];
  }
  return { score, max: 20, reasons };
}

function scoreUsage(car: Car, u: QueryIntent['usage']): Part {
  if (!u) return { score: 0, max: 0, reasons: [] };
  let score = 0;
  const reasons: string[] = [];
  switch (u) {
    case 'daily':
      if (car.type === 'sedan' || car.type === 'hatchback') reasons.push('Compacto, fácil en ciudad');
      if (car.fuel === 'hibrido' || car.fuel === 'hibrido_enchufable' || car.fuel === 'electrico') { score += 10; reasons.push('Consumo urbano eficiente'); }
      if ((car.type === 'sedan' || car.type === 'hatchback')) score += 5;
      if (car.traction === '4x2') score += 5;
      break;
    case 'family':
      if (car.seats >= 5) score += 8;
      if (car.seats >= 7) { score += 4; reasons.push('Siete plazas'); }
      if (car.type === 'suv' || car.type === 'minivan' || car.type === 'wagon') { score += 5; reasons.push(`Formato ${car.type === 'suv' ? 'SUV' : car.type}`); }
      if ((car.airbags ?? 0) >= 6) score += 3;
      break;
    case 'adventure':
      if (car.traction === '4x4' || car.traction === 'awd') { score += 10; reasons.push('Tracción 4x4/awd'); }
      if (car.type === 'suv' || car.type === 'pickup') { score += 6; reasons.push('Apto para terrenos'); }
      if (car.ground_clearance_mm && car.ground_clearance_mm >= 200) { score += 4; reasons.push(`${car.ground_clearance_mm} mm de despeje`); }
      break;
    case 'highway': {
      const cons = car.fuel_consumption_mixed_km_l;
      if (cons && cons >= 14) { score += 8; reasons.push(`Consumo mixto ${cons} km/L`); }
      if (car.fuel === 'diesel') score += 3;
      if (car.transmission === 'automatica') score += 3;
      if (car.electric_range_km && car.electric_range_km >= 400) { score += 4; reasons.push(`Autonomía ${car.electric_range_km} km`); }
      break;
    }
    case 'work':
      if (car.type === 'pickup') { score += 8; reasons.push('Pick-up, efectiva para carga'); }
      if (car.type === 'minivan') score += 3;
      if (car.fuel === 'diesel') { score += 4; reasons.push('Diésel'); }
      if (car.torque_nm && car.torque_nm >= 300) { score += 4; reasons.push(`${car.torque_nm} Nm de torque`); }
      break;
  }
  return { score, max: 20, reasons };
}

function scoreFuel(car: Car, f: QueryIntent['fuel']): Part {
  if (!f) return { score: 0, max: 0, reasons: [] };
  let score = 0;
  const reasons: string[] = [];
  if (car.fuel === f) {
    score = 15;
    reasons.push(`Motor ${getFuelLabelFor(car.fuel)}`);
  } else if (f === 'hibrido' && car.fuel === 'hibrido_enchufable') {
    score = 10;
    reasons.push('Híbrido enchufable, una variante de híbrido');
  } else if (f === 'electrico' && car.fuel === 'hibrido_enchufable') {
    score = 8;
    reasons.push('Enchufable, cerca de lo eléctrico');
  } else if (f === 'gasolina' && car.fuel === 'hibrido') {
    score = 8;
    reasons.push('Híbrido (usa bencina)');
  }
  return { score, max: 15, reasons };
}

function scorePriority(car: Car, priorities: string[]): Part {
  if (priorities.length === 0) return { score: 0, max: 0, reasons: [] };
  let score = 0;
  const reasons: string[] = [];
  for (const p of priorities) {
    if (p === 'performance') {
      if (car.hp) { score += Math.min((car.hp / 600) * 6, 6); reasons.push(`${car.hp} hp`); }
      if (car.torque_nm) score += Math.min(car.torque_nm / 1000 * 3, 3);
      if (car.fuel === 'electrico' || car.fuel === 'hibrido') score += 2;
      if (car.traction === '4x4' || car.traction === 'awd') score += 2;
      if (car.transmission === 'automatica') score += 2;
    } else if (p === 'safety') {
      score += ((car.airbags ?? 0) / 10) * 5;
      const best = car.safety_ratings?.length ? Math.max(...car.safety_ratings.map(r => r.stars)) : 0;
      if (best >= 5) { score += 5; reasons.push(`Calificación ${best} estrellas ${car.safety_ratings![0].program}`); }
      if (car.adas && car.adas.length >= 3) { score += 3; reasons.push(`${car.adas.length} asistencias ADAS`); }
      if (car.isofix) score += 2;
    } else if (p === 'space') {
      if (car.trunk_liters && car.trunk_liters >= 450) { score += 6; reasons.push(`Maletero ${car.trunk_liters} L`); }
      if (car.seats >= 5) { score += 5; reasons.push(`${car.seats} plazas`); }
      if (car.type === 'suv' || car.type === 'minivan' || car.type === 'wagon') score += 4;
    } else if (p === 'economy') {
      if (car.fuel === 'electrico' || car.fuel === 'hibrido' || car.fuel === 'hibrido_enchufable') { score += 4; reasons.push('Bajo costo por kilómetro'); }
      if (car.electric_range_km && car.electric_range_km >= 300) score += 2;
      if (car.fuel_consumption_mixed_km_l && car.fuel_consumption_mixed_km_l >= 14) { score += 5; reasons.push(`Consumo mixto ${car.fuel_consumption_mixed_km_l} km/L`); }
      if (car.price <= 15000000) score += 4;
    } else if (p === 'technology') {
      if (car.fuel === 'electrico' || car.fuel === 'hibrido_enchufable') { score += 6; reasons.push('Electrificado'); }
      if (car.infotainment && car.infotainment.length >= 4) { score += 4; reasons.push('Conectividad completa'); }
      if (car.adas && car.adas.length >= 4) { score += 5; reasons.push(`${car.adas.length} asistencias ADAS`); }
    }
  }
  return { score: Math.min(score, 15), max: 15, reasons };
}

function scoreSeats(car: Car, min: QueryIntent['minSeats']): Part {
  if (!min) return { score: 0, max: 0, reasons: [] };
  const reasons = car.seats >= min ? [`${car.seats} plazas`] : [`${car.seats} plazas, menos de ${min}`];
  return { score: car.seats >= min ? 10 : 2, max: 10, reasons };
}

function scoreTransmission(car: Car, t: QueryIntent['transmission']): Part {
  if (!t) return { score: 0, max: 0, reasons: [] };
  const match = car.transmission === t;
  return {
    score: match ? 8 : 0,
    max: 8,
    reasons: match ? ['Transmisión ' + (t === 'automatica' ? 'automática' : 'manual')] : [],
  };
}

function scoreTraction(car: Car, t: QueryIntent['traction']): Part {
  if (!t) return { score: 0, max: 0, reasons: [] };
  let score = 0;
  const reasons: string[] = [];
  if (t === '4x4') {
    if (car.traction === '4x4' || car.traction === 'awd') { score = 7; reasons.push('Tracción 4x4/awd'); }
    else if (car.traction === '4x2') score = 2;
  } else if (car.traction === t) {
    score = 7;
    reasons.push(`Tracción ${t}`);
  } else if (car.traction === 'awd') {
    score = 3;
  }
  return { score, max: 7, reasons };
}

function scoreBody(car: Car, b: QueryIntent['bodyType']): Part {
  if (!b) return { score: 0, max: 0, reasons: [] };
  const match = car.type === b;
  return { score: match ? 5 : 0, max: 5, reasons: match ? [`Formato ${b.toUpperCase()}`] : [] };
}

export function scoreRecommendation(car: Car, intent: QueryIntent): { score: number; max: number; reasons: string[] } {
  const parts: Part[] = [
    scoreBudget(car, intent.budget),
    scoreUsage(car, intent.usage),
    scoreFuel(car, intent.fuel),
    scorePriority(car, intent.priorities),
    scoreSeats(car, intent.minSeats),
    scoreTransmission(car, intent.transmission),
    scoreTraction(car, intent.traction),
    scoreBody(car, intent.bodyType),
  ];
  let score = 0;
  let max = 0;
  const reasons: string[] = [];
  for (const p of parts) {
    score += p.score;
    max += p.max;
    for (const r of p.reasons) if (!reasons.includes(r)) reasons.push(r);
  }
  return { score, max: Math.max(max, 1), reasons };
}

export function recommend(text: string, cars: Car[] = carsData, brandList: string[] = catalogBrands): RecommendResult {
  const intent = parseQuery(text, brandList);
  const hasSignal =
    !!intent.budget || !!intent.usage || !!intent.fuel || !!intent.transmission ||
    !!intent.traction || !!intent.minSeats || !!intent.bodyType ||
    intent.priorities.length > 0 || intent.brands.length > 0 || !!intent.minYear;
  if (!hasSignal) return { intent, list: [], unclear: true };

  let filtered = cars;
  const { bodyType, minYear, minSeats } = intent;
  const intentBrands = intent.brands;
  if (bodyType) filtered = filtered.filter(c => c.type === bodyType);
  if (intentBrands.length > 0) filtered = filtered.filter(c => intentBrands.includes(c.brand));
  if (minYear) filtered = filtered.filter(c => c.year >= minYear);
  if (minSeats && minSeats >= 6) filtered = filtered.filter(c => c.seats >= minSeats);

  const scored = filtered.map(car => {
    const { score, max, reasons } = scoreRecommendation(car, intent);
    return { car, score, max, affinity: Math.round((score / max) * 100), reasons };
  });
  scored.sort((a, b) => b.score - a.score || a.car.price - b.car.price);

  return {
    intent,
    unclear: false,
    list: scored.map(s => ({
      car: s.car,
      affinity: s.affinity,
      score: s.score,
      max: s.max,
      reasons: s.reasons.slice(0, 4),
    })),
  };
}