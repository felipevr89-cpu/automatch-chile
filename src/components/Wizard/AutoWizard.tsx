import { useState } from 'react';
import { Car } from '../../types';
import { carsData, formatPrice, getTypeLabel, getFuelLabel } from '../../data/cars-chile';

interface Props {
  onClose: () => void;
  onSelectCar: (car: Car) => void;
}

interface WizardStep {
  id: string;
  question: string;
  subtitle?: string;
  options: { value: string; label: string; icon: string; description?: string }[];
}

const wizardSteps: WizardStep[] = [
  {
    id: 'usage',
    question: '¿Para qué usarás tu auto?',
    subtitle: 'Selecciona el uso principal que le darás',
    options: [
      { value: 'daily', label: 'Uso diario', icon: '🏙️', description: 'Ciudad, trabajo, trámites' },
      { value: 'family', label: 'Familiar', icon: '👨‍👩‍👧‍👦', description: 'Paseos, escuela, familia' },
      { value: 'adventure', label: 'Aventura', icon: '🏔️', description: 'Off-road, naturaleza, camping' },
      { value: 'delivery', label: 'Delivery', icon: '📦', description: 'Reparto, entregas, negocio' },
      { value: 'work', label: 'Trabajo', icon: '🔨', description: 'Obra, carga, comercio' },
    ],
  },
  {
    id: 'seats',
    question: '¿Cuántas plazas necesitas?',
    subtitle: 'Piensa en tu familia o quienes viajarán contigo',
    options: [
      { value: '2-4', label: '2-4 plazas', icon: '👤', description: 'Solo o en pareja' },
      { value: '5', label: '5 plazas', icon: '👥', description: 'Familia pequeña' },
      { value: '7+', label: '7+ plazas', icon: '👨‍👩‍👧‍👦', description: 'Familia grande o grupos' },
    ],
  },
  {
    id: 'budget',
    question: '¿Cuál es tu presupuesto?',
    subtitle: 'Rango de inversión para tu auto',
    options: [
      { value: 'economic', label: 'Hasta $12M', icon: '💰', description: 'Opciones accesibles' },
      { value: 'mid', label: '$12M - $20M', icon: '💎', description: 'Relación precio-calidad' },
      { value: 'premium', label: '$20M - $30M', icon: '🏆', description: 'Gama media-alta' },
      { value: 'luxury', label: 'Más de $30M', icon: '👑', description: 'Lo mejorcito' },
    ],
  },
  {
    id: 'fuel',
    question: '¿Qué tipo de combustible prefieres?',
    subtitle: 'Cada tipo tiene sus ventajas',
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
    question: '¿Qué es lo más importante para ti?',
    subtitle: 'Selecciona tu prioridad principal',
    options: [
      { value: 'price', label: 'Precio bajo', icon: '💵', description: 'Ahorrar al máximo' },
      { value: 'consumption', label: 'Bajo consumo', icon: '⛽', description: 'Eficiencia de combustible' },
      { value: 'space', label: 'Espacio', icon: '📦', description: 'Capacidad y practicidad' },
      { value: 'design', label: 'Diseño', icon: '✨', description: 'Estética y estilo' },
      { value: 'power', label: 'Potencia', icon: '🏎️', description: 'Rendimiento y velocidad' },
      { value: 'technology', label: 'Tecnología', icon: '📱', description: 'Última tecnología' },
    ],
  },
];

export function AutoWizard({ onClose, onSelectCar }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Car[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    const step = wizardSteps[currentStep];
    const newAnswers = { ...answers, [step.id]: value };
    setAnswers(newAnswers);

    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const filteredCars = filterCars(newAnswers);
      setResults(filteredCars);
      setShowResults(true);
    }
  };

  const filterCars = (answers: Record<string, string>): Car[] => {
    let filtered = [...carsData];

    // Filtrar por plazas
    if (answers.seats === '2-4') {
      filtered = filtered.filter(car => car.seats <= 4);
    } else if (answers.seats === '5') {
      filtered = filtered.filter(car => car.seats === 5);
    } else if (answers.seats === '7+') {
      filtered = filtered.filter(car => car.seats >= 7);
    }

    // Filtrar por presupuesto
    if (answers.budget === 'economic') {
      filtered = filtered.filter(car => car.price <= 12000000);
    } else if (answers.budget === 'mid') {
      filtered = filtered.filter(car => car.price > 12000000 && car.price <= 20000000);
    } else if (answers.budget === 'premium') {
      filtered = filtered.filter(car => car.price > 20000000 && car.price <= 30000000);
    } else if (answers.budget === 'luxury') {
      filtered = filtered.filter(car => car.price > 30000000);
    }

    // Filtrar por combustible
    if (answers.fuel !== 'any') {
      filtered = filtered.filter(car => car.fuel === answers.fuel);
    }

    // Filtrar por uso
    if (answers.usage === 'daily') {
      filtered = filtered.filter(car => car.type === 'sedan' || car.type === 'hatchback');
    } else if (answers.usage === 'family') {
      filtered = filtered.filter(car => car.seats >= 5);
    } else if (answers.usage === 'adventure') {
      filtered = filtered.filter(car => car.traction === '4x4' || car.traction === 'awd' && (car.type === 'suv' || car.type === 'pickup'));
    } else if (answers.usage === 'delivery') {
      filtered = filtered.filter(car => car.type === 'pickup' || car.type === 'minivan' || (car.type === 'hatchback' && car.price <= 12000000));
    } else if (answers.usage === 'work') {
      filtered = filtered.filter(car => car.type === 'pickup' || car.type === 'minivan');
    }

    // Ordenar por prioridad
    if (answers.priority === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (answers.priority === 'consumption') {
      // Priorizar eléctricos e híbridos
      filtered.sort((a, b) => {
        const fuelOrder = { electrico: 0, hibrido: 1, hibrido_enchufable: 2, gasolina: 3, diesel: 4 };
        return fuelOrder[a.fuel] - fuelOrder[b.fuel];
      });
    } else if (answers.priority === 'space') {
      filtered.sort((a, b) => b.seats - a.seats);
    } else if (answers.priority === 'design') {
      // Priorizar marcas premium
      const premiumBrands = ['Mazda', 'Subaru', 'Volkswagen', 'Kia', 'Hyundai'];
      filtered.sort((a, b) => {
        const aIsPremium = premiumBrands.includes(a.brand) ? 0 : 1;
        const bIsPremium = premiumBrands.includes(b.brand) ? 0 : 1;
        return aIsPremium - bIsPremium;
      });
    } else if (answers.priority === 'power') {
      // Priorizar 4x4 y pick-ups
      filtered.sort((a, b) => {
        const aScore = (a.traction === '4x4' ? 10 : 0) + (a.type === 'pickup' ? 5 : 0);
        const bScore = (b.traction === '4x4' ? 10 : 0) + (b.type === 'pickup' ? 5 : 0);
        return bScore - aScore;
      });
    } else if (answers.priority === 'technology') {
      // Priorizar eléctricos e híbridos
      filtered.sort((a, b) => {
        const fuelOrder = { electrico: 0, hibrido: 1, hibrido_enchufable: 2, gasolina: 3, diesel: 4 };
        return fuelOrder[a.fuel] - fuelOrder[b.fuel];
      });
    }

    // Retornar top 5
    return filtered.slice(0, 5);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
          <div className="p-6 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">¡Encontramos tu auto ideal!</h2>
                <p className="text-gray-500 mt-1">
                  Basado en tus respuestas, estos son los mejores options
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-1 min-h-0">
            {results.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No encontramos coincidencias exactas</h3>
                <p className="text-gray-500 mb-4">Intenta ajustar tus preferencias</p>
                <button
                  onClick={restart}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Intentar de nuevo
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((car, index) => (
                  <div
                    key={car.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer border-2 border-transparent hover:border-blue-200"
                    onClick={() => onSelectCar(car)}
                  >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    
                    <div className="w-20 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      {car.image_url ? (
                        <img
                          src={car.image_url}
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">🚗</div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{car.brand}</span>
                        <span className="font-bold text-gray-900">{car.model}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">{getTypeLabel(car.type)}</span>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded">{getFuelLabel(car.fuel)}</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">{car.seats} plazas</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">{car.traction}</span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-sm text-gray-500">Desde</p>
                      <p className="text-lg font-bold text-blue-600">{formatPrice(car.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {results.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
                <button
                  onClick={restart}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  ← Volver a empezar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const step = wizardSteps[currentStep];
  const progress = ((currentStep + 1) / wizardSteps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🤖</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">AutoMatch IA</h2>
                <p className="text-sm text-gray-500">Paso {currentStep + 1} de {wizardSteps.length}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.question}</h3>
          {step.subtitle && (
            <p className="text-gray-500 mb-6">{step.subtitle}</p>
          )}

          {/* Options */}
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
                  {option.description && (
                    <p className="text-sm text-gray-500">{option.description}</p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Back button */}
          {currentStep > 0 && (
            <button
              onClick={goBack}
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
