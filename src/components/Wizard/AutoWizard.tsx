import { useState, useMemo } from 'react';
import { Car } from '../../types';
import { carsData, formatPrice, getTypeLabel, getFuelLabel } from '../../data/brands';

const typeIcons: Record<string, string> = {
  sedan: '🚗', suv: '🚙', pickup: '🛻', hatchback: '🚘', minivan: '🚐', wagon: '🚃',
  coupe: '🏎️', convertible: '🚙',
};

const brandGradients: Record<string, string> = {
  'BMW': 'from-blue-600 to-blue-800', 'Mercedes-Benz': 'from-gray-700 to-gray-900',
  'Audi': 'from-gray-600 to-gray-800', 'Toyota': 'from-red-500 to-red-700',
  'Ford': 'from-blue-700 to-blue-900', 'Chevrolet': 'from-yellow-500 to-yellow-700',
  'Hyundai': 'from-blue-500 to-blue-700', 'Kia': 'from-red-600 to-red-800',
  'Volkswagen': 'from-blue-600 to-blue-800', 'Nissan': 'from-red-500 to-red-700',
  'Honda': 'from-red-600 to-red-800', 'Mazda': 'from-red-500 to-red-700',
  'Tesla': 'from-gray-700 to-gray-900', 'Porsche': 'from-gray-700 to-gray-900',
  'BYD': 'from-blue-500 to-blue-700', 'Renault': 'from-yellow-500 to-yellow-700',
  'Peugeot': 'from-blue-500 to-blue-700', 'Citroën': 'from-red-500 to-red-700',
  'Fiat': 'from-red-500 to-red-700', 'Jeep': 'from-green-600 to-green-800',
  'Mitsubishi': 'from-red-500 to-red-700', 'Suzuki': 'from-blue-500 to-blue-700',
  'Subaru': 'from-blue-500 to-blue-700', 'GWM': 'from-gray-700 to-gray-900',
  'MG': 'from-red-500 to-red-700', 'Chery': 'from-blue-500 to-blue-700',
  'Changan': 'from-blue-600 to-blue-800', 'JAC': 'from-blue-500 to-blue-700',
  'DFSK': 'from-orange-500 to-orange-700', 'Dongfeng': 'from-blue-600 to-blue-800',
  'Foton': 'from-blue-600 to-blue-800', 'GAC': 'from-red-500 to-red-700',
  'Omoda': 'from-gray-700 to-gray-900', 'Jaecoo': 'from-gray-700 to-gray-900',
  'KGM': 'from-gray-700 to-gray-900', 'Lynk & Co': 'from-blue-500 to-blue-700',
  'Maxus': 'from-blue-600 to-blue-800', 'BAIC': 'from-blue-500 to-blue-700',
  'Exeed': 'from-gray-700 to-gray-900', 'Deepal': 'from-blue-500 to-blue-700',
  'Riddara': 'from-gray-700 to-gray-900', 'Wuling': 'from-red-500 to-red-700',
  'JMC': 'from-blue-600 to-blue-800', 'SWM': 'from-gray-700 to-gray-900',
  'Tank': 'from-gray-700 to-gray-900', 'Mahindra': 'from-red-500 to-red-700',
  'Isuzu': 'from-blue-600 to-blue-800', 'RAM': 'from-gray-700 to-gray-900',
  'Dodge': 'from-red-600 to-red-800', 'Cadillac': 'from-gray-700 to-gray-900',
  'GMC': 'from-blue-600 to-blue-800', 'Lexus': 'from-gray-700 to-gray-900',
  'Jaguar': 'from-gray-700 to-gray-900', 'Land Rover': 'from-green-700 to-green-900',
  'Bentley': 'from-gray-700 to-gray-900', 'Aston Martin': 'from-gray-700 to-gray-900',
  'McLaren': 'from-orange-500 to-orange-700', 'Rolls-Royce': 'from-gray-700 to-gray-900',
  'Lotus': 'from-green-600 to-green-800', 'Ineos': 'from-green-700 to-green-900',
  'Ferrari': 'from-red-600 to-red-800', 'Lamborghini': 'from-yellow-500 to-yellow-700',
  'Maserati': 'from-red-500 to-red-700', 'Alfa Romeo': 'from-red-500 to-red-700',
  'Abarth': 'from-red-500 to-red-700', 'Smart': 'from-cyan-500 to-cyan-700',
  'Cupra': 'from-gray-700 to-gray-900', 'Opel': 'from-blue-500 to-blue-700',
  'Skoda': 'from-green-600 to-green-800', 'SEAT': 'from-red-500 to-red-700',
  'DS': 'from-gray-700 to-gray-900', 'MINI': 'from-red-500 to-red-700',
  'Volvo': 'from-blue-500 to-blue-700', 'Jetour': 'from-gray-700 to-gray-900',
  'Kaiyi': 'from-blue-500 to-blue-700', 'KYC': 'from-gray-700 to-gray-900',
  'Livan': 'from-blue-500 to-blue-700', 'Neta': 'from-blue-600 to-blue-800',
  'Shineray': 'from-gray-700 to-gray-900', 'Soueast': 'from-blue-500 to-blue-700',
  'ZNA': 'from-blue-600 to-blue-800', 'ZX Auto': 'from-gray-700 to-gray-900',
};

const defaultGradient = 'from-gray-100 to-gray-200';

interface Props {
  onClose: () => void;
  onSelectCar: (car: Car, wizardCars: Car[], answers: Record<string, string>) => void;
  initialAnswers?: Record<string, string>;
  initialShowResults?: boolean;
  onAddToCompare?: (car: Car) => void;
  compareList?: Car[];
}

interface StepDef {
  id: string;
  question: string;
  subtitle?: string;
  options: { value: string; label: string; icon: string; description?: string }[];
}

const steps: StepDef[] = [
  {
    id: 'budget',
    question: '¿Cuál es tu presupuesto?',
    subtitle: 'Selecciona el rango de inversión para tu auto',
    options: [
      { value: 'economic', label: 'Hasta $12M', icon: '💰', description: 'Opciones accesibles' },
      { value: 'mid', label: '$12M - $20M', icon: '💎', description: 'Relación precio-calidad' },
      { value: 'premium', label: '$20M - $30M', icon: '🏆', description: 'Gama media-alta' },
      { value: 'luxury', label: 'Más de $30M', icon: '👑', description: 'Lo mejorcito' },
    ],
  },
  {
    id: 'usage',
    question: '¿Para qué usarás tu auto?',
    subtitle: 'El uso principal definirá el tipo de vehículo ideal',
    options: [
      { value: 'daily', label: 'Uso diario', icon: '🏙️', description: 'Ciudad, trabajo, trámites' },
      { value: 'family', label: 'Familiar', icon: '👨‍👩‍👧‍👦', description: 'Paseos, escuela, familia' },
      { value: 'adventure', label: 'Aventura', icon: '🏔️', description: 'Off-road, naturaleza, camping' },
      { value: 'work', label: 'Trabajo', icon: '🔨', description: 'Carga, obra, comercio' },
    ],
  },
  {
    id: 'fuel',
    question: '¿Qué combustible prefieres?',
    subtitle: 'Cada tipo tiene ventajas distintas',
    options: [
      { value: 'any', label: 'Cualquiera', icon: '⛽', description: 'Sin preferencia' },
      { value: 'gasolina', label: 'Gasolina', icon: '⛽', description: 'Más estaciones, versátil' },
      { value: 'diesel', label: 'Diésel', icon: '🛢️', description: 'Más torque, menor consumo' },
      { value: 'electrico', label: 'Eléctrico', icon: '⚡', description: 'Cero emisiones, silencioso' },
      { value: 'hibrido', label: 'Híbrido', icon: '🔋', description: 'Lo mejor de ambos mundos' },
    ],
  },
  {
    id: 'priority',
    question: '¿Qué es más importante para ti?',
    subtitle: 'Esto ayuda a ordenar los resultados por afinidad',
    options: [
      { value: 'performance', label: 'Rendimiento', icon: '🏎️', description: 'Potencia, velocidad, eficiencia' },
      { value: 'safety', label: 'Seguridad', icon: '🛡️', description: 'Airbags, NCAP, ADAS' },
      { value: 'space', label: 'Espacio', icon: '📦', description: 'Capacidad y practicidad' },
      { value: 'technology', label: 'Tecnología', icon: '📱', description: 'Eléctrico, conectividad' },
    ],
  },
];

const stepLabels: Record<string, string> = {
  budget: 'Presupuesto',
  usage: 'Uso',
  fuel: 'Combustible',
  priority: 'Prioridad',
};

const priceRanges: Record<string, [number, number]> = {
  economic: [0, 12000000],
  mid: [12000000, 20000000],
  premium: [20000000, 30000000],
  luxury: [30000000, Infinity],
};

function scoreCar(car: Car, answers: Record<string, string>): number {
  let score = 0;

  const budget = answers.budget;
  if (budget && priceRanges[budget]) {
    const [min, max] = priceRanges[budget];
    if (car.price >= min && car.price <= max) score += 30;
    else {
      const mid = (min + (max === Infinity ? min * 2 : max)) / 2;
      const diff = Math.abs(car.price - mid) / mid;
      if (diff <= 0.5) score += 15;
      else if (diff <= 1) score += 5;
    }
  }

  const usage = answers.usage;
  if (usage === 'daily') {
    if (car.type === 'sedan' || car.type === 'hatchback') score += 20;
    if (car.fuel === 'hibrido' || car.fuel === 'hibrido_enchufable' || car.fuel === 'electrico') score += 10;
    if (car.traction === '4x2') score += 5;
  } else if (usage === 'family') {
    if (car.seats >= 5) score += 20;
    if (car.seats >= 7) score += 10;
    if (car.type === 'suv' || car.type === 'minivan') score += 10;
    if ((car.airbags ?? 0) >= 6) score += 5;
  } else if (usage === 'adventure') {
    if (car.traction === '4x4' || car.traction === 'awd') score += 25;
    if (car.type === 'suv' || car.type === 'pickup') score += 15;
    if (car.ground_clearance_mm && car.ground_clearance_mm >= 200) score += 10;
  } else if (usage === 'work') {
    if (car.type === 'pickup') score += 25;
    if (car.type === 'minivan') score += 15;
    if (car.fuel === 'diesel') score += 10;
  }

  const fuel = answers.fuel;
  if (fuel && fuel !== 'any') {
    if (car.fuel === fuel) score += 30;
    if (fuel === 'hibrido' && car.fuel === 'hibrido_enchufable') score += 20;
  } else {
    score += 5;
  }

  const priority = answers.priority;
  if (priority === 'performance') {
    if (car.hp) score += Math.min(car.hp / 600 * 15, 15);
    if (car.torque_nm) score += Math.min(car.torque_nm / 1000 * 10, 10);
    if (car.fuel_consumption_city_km_l && car.fuel_consumption_city_km_l < 15) score += 5;
    if (car.fuel === 'electrico') score += 10;
    if (car.transmission === 'automatica') score += 5;
    if (car.traction === '4x4' || car.traction === 'awd') score += 5;
  } else if (priority === 'safety') {
    score += ((car.airbags ?? 0) / 8) * 15;
    score += ((car.latin_ncap_stars ?? 0) / 5) * 10;
    if (car.adas && car.adas.length > 0) score += Math.min(car.adas.length * 3, 15);
    if (car.isofix) score += 5;
  } else if (priority === 'space') {
    score += ((car.seats - 2) / 6) * 15;
    if (car.trunk_liters) score += Math.min(car.trunk_liters / 1000 * 15, 15);
    if (car.type === 'suv' || car.type === 'minivan' || car.type === 'wagon') score += 10;
  } else if (priority === 'technology') {
    if (car.fuel === 'electrico') score += 20;
    if (car.fuel === 'hibrido' || car.fuel === 'hibrido_enchufable') score += 10;
    if (car.infotainment) score += Math.min(car.infotainment.length * 3, 15);
    if (car.adas) score += Math.min(car.adas.length * 2, 10);
  }

  return Math.round(score);
}

export function AutoWizard({ onClose, onSelectCar, initialAnswers, initialShowResults, onAddToCompare, compareList }: Props) {
  const [currentStep, setCurrentStep] = useState(initialShowResults ? 0 : 0);
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers ?? {});
  const [showResults, setShowResults] = useState(initialShowResults ?? false);
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const allResults = useMemo(() => {
    const keys = Object.keys(answers);
    if (keys.length < 4) return [];

    const scored = carsData.map(car => ({
      car,
      score: scoreCar(car, answers),
    }));

    scored.sort((a, b) => b.score - a.score);
    const maxScore = scored[0]?.score || 100;

    return scored.map(({ car, score }) => ({
      car,
      affinity: Math.round((score / Math.max(maxScore, 1)) * 100),
    }));
  }, [answers]);

  const results = useMemo(
    () => (showAll ? allResults : allResults.slice(0, 10)),
    [allResults, showAll]
  );

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [steps[currentStep].id]: value };
    setAnswers(newAnswers);

    if (editingStep !== null) {
      setEditingStep(null);
      setShowResults(true);
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const goToStep = (idx: number) => {
    setEditingStep(idx);
    setCurrentStep(idx);
    setShowResults(false);
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setEditingStep(null);
    setShowAll(false);
  };

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
          <div className="p-6 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Tus mejores opciones</h2>
                <p className="text-gray-500 mt-1">
                  {showAll
                    ? `${allResults.length} autos ordenados por afinidad`
                    : 'Top 10 ordenados por afinidad según tus respuestas'}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar asistente"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {steps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => goToStep(idx)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 rounded-lg text-xs font-medium text-gray-600 hover:text-blue-700 transition-colors"
                >
                  {stepLabels[step.id]}: <span className="text-gray-900">{step.options.find(o => o.value === answers[step.id])?.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-1 min-h-0">
            {results.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No encontramos coincidencias</h3>
                <p className="text-gray-500 mb-4">Intenta cambiar tus preferencias</p>
                <button onClick={restart} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Intentar de nuevo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map(({ car, affinity }, index) => (
                  <div
                    key={car.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer border-2 border-transparent hover:border-blue-200"
                    onClick={() => onSelectCar(car, results.map(r => r.car), answers)}
                  >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                      {index + 1}
                    </div>

                    <div className="w-20 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <div className={`w-full h-full bg-gradient-to-br ${brandGradients[car.brand] || defaultGradient} flex items-center justify-center`}>
                        <span className="text-white text-lg">{typeIcons[car.type] || '🚗'}</span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{car.brand}</span>
                        <span className="font-bold text-gray-900">{car.model}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">{getTypeLabel(car.type)}</span>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded">{getFuelLabel(car.fuel)}</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">{car.seats} plazas</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">{car.traction}</span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-sm text-gray-500">Desde</p>
                      <p className="text-lg font-bold text-blue-600">{formatPrice(car.price)}</p>
                      <div
                        className="flex items-center gap-1 mt-1 justify-end group/affinity relative cursor-help"
                        title={`Afinidad ${affinity}%: qué tan bien coincide este auto con tu presupuesto, uso, combustible y prioridad.`}
                      >
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${affinity >= 80 ? 'bg-green-500' : affinity >= 60 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                            style={{ width: `${affinity}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-500">{affinity}%</span>
                        <div className="absolute bottom-full right-0 mb-2 w-52 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/affinity:opacity-100 pointer-events-none transition-opacity z-10 shadow-lg">
                          <span className="font-semibold">Afinidad {affinity}%</span> — coincidencia con tu presupuesto, uso, combustible y prioridad.
                        </div>
                      </div>
                    </div>

                    {onAddToCompare && (
                      <button
                        type="button"
                        aria-label={compareList?.some(c => c.id === car.id) ? `Quitar ${car.brand} ${car.model} de la comparación` : `Agregar ${car.brand} ${car.model} a la comparación`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCompare(car);
                        }}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          compareList?.some(c => c.id === car.id)
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                        }`}
                      >
                        {compareList?.some(c => c.id === car.id) ? '✓ Comparando' : '+ Comparar'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap justify-center items-center gap-4">
              <button onClick={restart} className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors">
                ← Volver a empezar
              </button>
              {allResults.length > 10 && (
                <button
                  onClick={() => setShowAll(v => !v)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {showAll ? 'Ver solo top 10' : `Ver todos los resultados (${allResults.length})`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🤖</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">AutoMatch IA</h2>
                <p className="text-sm text-gray-500">Paso {currentStep + 1} de {steps.length}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar asistente"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 min-h-0">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.question}</h3>
          {step.subtitle && <p className="text-gray-500 mb-6">{step.subtitle}</p>}

          <div className="grid grid-cols-1 gap-3">
            {step.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all hover:border-blue-200 border-2 border-transparent text-left"
              >
                <span className="text-3xl">{option.icon}</span>
                <div>
                  <p className="font-bold text-gray-900">{option.label}</p>
                  {option.description && <p className="text-sm text-gray-500">{option.description}</p>}
                </div>
              </button>
            ))}
          </div>

          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="mt-4 text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              ← Atrás
            </button>
          )}
        </div>
      </div>
    </div>
  );
}