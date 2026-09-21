import { useState } from 'react';
import { formatPrice } from '../../data/brands';

interface Props {
  price: number;
}

const CAE_ANNUAL = 0.12;
const PLAZOS = [12, 24, 36, 48, 60];

export function CreditCalc({ price }: Props) {
  const [piePercent, setPiePercent] = useState(20);
  const [plazo, setPlazo] = useState(36);

  const pie = Math.round(price * (piePercent / 100));
  const monto = price - pie;
  const tasa = CAE_ANNUAL / 12;
  const cuota = monto * (tasa * Math.pow(1 + tasa, plazo)) / (Math.pow(1 + tasa, plazo) - 1);
  const totalPagar = cuota * plazo;
  const costoTotal = totalPagar + pie;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-blue-100 dark:border-gray-600">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        Calculadora de Crédito
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300 mb-2 block">
            Pie inicial: {piePercent}% ({formatPrice(pie)})
          </label>
          <input
            type="range"
            min={10}
            max={50}
            step={5}
            value={piePercent}
            onChange={(e) => setPiePercent(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300 mb-2 block">Plazo:</label>
          <div className="flex gap-2">
            {PLAZOS.map((p) => (
              <button
                key={p}
                onClick={() => setPlazo(p)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  plazo === p
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-500'
                }`}
              >
                {p}m
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-600 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Cuota mensual</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(Math.round(cuota))}</p>
        </div>
        <div className="bg-white dark:bg-gray-600 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total a pagar</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{formatPrice(Math.round(costoTotal))}</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">
        *Estimación con CAE {CAE_ANNUAL * 100}% anual. Valores referenciales.
      </p>
    </div>
  );
}
