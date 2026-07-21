import { Car } from '../types';
import { HOME_KWH_CLP, GASOLINE_CLP_PER_L, DIESEL_CLP_PER_L } from './energyCosts';

/** Chilean loan rate (avg 2026) */
const LOAN_RATE_ANNUAL = 0.065;
const LOAN_RATE_MONTHLY = LOAN_RATE_ANNUAL / 12;

/** SOAP 2026 (varies by vehicle value, simplified) */
function getSoapAnual(vehiclePrice: number): number {
  if (vehiclePrice <= 8_000_000) return 32_000;
  if (vehiclePrice <= 15_000_000) return 48_000;
  if (vehiclePrice <= 25_000_000) return 65_000;
  return 85_000;
}

/** Permiso de circulación 2026 (simplified by age and engine) */
function getPermisoCirculacion(_price: number, year: number): number {
  const age = new Date().getFullYear() - year;
  const base = 85_000;
  const discount = age > 10 ? 0.3 : age > 5 ? 0.15 : 0;
  return Math.round(base * (1 - discount));
}

/** Estimated annual insurance (1.5% of vehicle value for full coverage) */
function getInsuranceAnual(price: number): number {
  return Math.round(price * 0.015);
}

/** Annual maintenance cost estimate */
function getMaintenanceAnual(car: Car): number {
  if (car.fuel === 'electrico') return 200_000;
  if (car.fuel === 'hibrido' || car.fuel === 'hibrido_enchufable') return 400_000;
  if (car.fuel === 'diesel') return 550_000;
  return 500_000;
}

/** Monthly fuel cost for combustion/hybrid */
function getMonthlyFuelCost(car: Car, kmPerMonth: number): number {
  const consumption = car.fuel_consumption_mixed_km_l;
  if (!consumption || consumption <= 0) return 0;
  const pricePerL = car.fuel === 'diesel' ? DIESEL_CLP_PER_L : GASOLINE_CLP_PER_L;
  const litersPerMonth = kmPerMonth / consumption;
  return Math.round(litersPerMonth * pricePerL);
}

/** Monthly charging cost for EV/PHEV */
function getMonthlyChargingCost(car: Car, kmPerMonth: number): number {
  const range = car.electric_range_km;
  const battery = car.battery_kwh;
  if (!range || !battery || range <= 0) return 0;
  const chargingPerKm = battery / range;
  const kwhPerMonth = kmPerMonth * chargingPerKm;
  return Math.round(kwhPerMonth * HOME_KWH_CLP);
}

export interface TCOResult {
  price: number;
  monthlyLoan: number;
  loanMonths: number;
  loanRate: number;
  soapAnual: number;
  permisoCirculacion: number;
  insuranceAnual: number;
  maintenanceAnual: number;
  fuelOrChargeMonthly: number;
  totalMonthly: number;
  totalAnnual: number;
  total5Years: number;
  breakdown: { label: string; monthly: number; icon: string }[];
}

export function calculateTCO(
  car: Car,
  loanMonths: number = 48,
  kmPerMonth: number = 1000
): TCOResult {
  const price = car.price;

  // Monthly loan payment (French system: fixed payment)
  const monthlyLoan =
    loanMonths > 0
      ? Math.round(
          (price * LOAN_RATE_MONTHLY * Math.pow(1 + LOAN_RATE_MONTHLY, loanMonths)) /
            (Math.pow(1 + LOAN_RATE_MONTHLY, loanMonths) - 1)
        )
      : 0;

  const soapAnual = getSoapAnual(price);
  const permisoCirculacion = getPermisoCirculacion(price, car.year);
  const insuranceAnual = getInsuranceAnual(price);
  const maintenanceAnual = getMaintenanceAnual(car);

  let fuelOrChargeMonthly = 0;
  if (car.fuel === 'electrico' || car.fuel === 'hibrido_enchufable') {
    fuelOrChargeMonthly = getMonthlyChargingCost(car, kmPerMonth);
  } else if (car.fuel === 'hibrido') {
    // Hybrid: 50% electric + 50% combustion
    const electricPart = getMonthlyChargingCost(car, kmPerMonth * 0.5);
    const combustionPart = getMonthlyFuelCost(car, kmPerMonth * 0.5);
    fuelOrChargeMonthly = electricPart + combustionPart;
  } else {
    fuelOrChargeMonthly = getMonthlyFuelCost(car, kmPerMonth);
  }

  const monthlySoap = Math.round(soapAnual / 12);
  const monthlyPermiso = Math.round(permisoCirculacion / 12);
  const monthlyInsurance = Math.round(insuranceAnual / 12);
  const monthlyMaintenance = Math.round(maintenanceAnual / 12);

  const totalMonthly =
    monthlyLoan + monthlySoap + monthlyPermiso + monthlyInsurance + monthlyMaintenance + fuelOrChargeMonthly;

  const totalAnnual = totalMonthly * 12;
  const total5Years = totalAnnual * 5;

  const breakdown = [
    { label: 'Cuota crédito', monthly: monthlyLoan, icon: '🏦' },
    { label: 'SOAP', monthly: monthlySoap, icon: '🛡️' },
    { label: 'Permiso circulación', monthly: monthlyPermiso, icon: '📋' },
    { label: 'Seguro', monthly: monthlyInsurance, icon: '🔒' },
    { label: 'Mantención', monthly: monthlyMaintenance, icon: '🔧' },
    {
      label: car.fuel === 'electrico' || car.fuel === 'hibrido_enchufable' || car.fuel === 'hibrido'
        ? 'Carga eléctrica'
        : 'Combustible',
      monthly: fuelOrChargeMonthly,
      icon: car.fuel === 'electrico' || car.fuel === 'hibrido_enchufable' ? '⚡' : '⛽',
    },
  ];

  return {
    price,
    monthlyLoan,
    loanMonths,
    loanRate: LOAN_RATE_ANNUAL,
    soapAnual,
    permisoCirculacion,
    insuranceAnual,
    maintenanceAnual,
    fuelOrChargeMonthly,
    totalMonthly,
    totalAnnual,
    total5Years,
    breakdown,
  };
}
