import { Car } from '../../types';
import { formatPrice, getTypeLabel, getFuelLabel } from '../../data/cars-chile';

interface Props {
  cars: Car[];
  onRemove: (id: number) => void;
}

export function CompareTable({ cars, onRemove }: Props) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">⚖️</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Sin vehículos para comparar</h3>
        <p className="text-gray-500">Selecciona hasta 3 vehículos desde la página principal</p>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const specs: { label: string; key: keyof Car; format?: (v: any) => string }[] = [
    { label: 'Marca', key: 'brand' },
    { label: 'Modelo', key: 'model' },
    { label: 'Año', key: 'year' },
    { label: 'Tipo', key: 'type', format: getTypeLabel },
    { label: 'Combustible', key: 'fuel', format: getFuelLabel },
    { label: 'Plazas', key: 'seats' },
    { label: 'Transmisión', key: 'transmission', format: (v: string) => v === 'automatica' ? 'Automática' : 'Manual' },
    { label: 'Tracción', key: 'traction' },
    { label: 'Origen', key: 'origin' },
    { label: 'Precio', key: 'price', format: formatPrice },
  ];

  // Find best values for highlighting
  const prices = cars.map((c) => c.price);
  const minPrice = Math.min(...prices);
  const seats = cars.map((c) => c.seats);
  const maxSeats = Math.max(...seats);

  const getBestClass = (car: Car, key: string) => {
    if (key === 'price' && car.price === minPrice) return 'text-green-600 font-bold';
    if (key === 'seats' && car.seats === maxSeats) return 'text-green-600 font-bold';
    return '';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-2xl overflow-hidden card-shadow">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left p-4 bg-gray-50 text-sm font-semibold text-gray-600 w-40">
              Característica
            </th>
            {cars.map((car) => (
              <th key={car.id} className="p-4 bg-gray-50 text-center relative">
                <button
                  onClick={() => onRemove(car.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-xs transition-colors"
                >
                  ×
                </button>
                <div className="text-lg font-bold text-gray-900">{car.brand}</div>
                <div className="text-sm text-gray-600">{car.model}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specs.map((spec) => (
            <tr key={spec.key} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="p-4 text-sm font-medium text-gray-600">{spec.label}</td>
              {cars.map((car) => {
                const value = car[spec.key as keyof Car];
                const display = spec.format ? spec.format(value as string) : String(value);
                return (
                  <td key={car.id} className={`p-4 text-center text-sm ${getBestClass(car, spec.key)}`}>
                    {display}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            <td className="p-4 text-sm font-medium text-gray-600">Descripción</td>
            {cars.map((car) => (
              <td key={car.id} className="p-4 text-xs text-gray-500 text-center">
                {car.description}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
