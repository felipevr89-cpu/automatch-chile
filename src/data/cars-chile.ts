import { Car } from '../types';

export const carsData: Car[] = [
  // TOYOTA
  { id: 1, brand: 'Toyota', model: 'Hilux', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 22990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'La pick-up más vendida de Chile. Robusta, confiable y con gran capacidad de carga.', origin: 'Japón' },
  { id: 2, brand: 'Toyota', model: 'Yaris', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 13490000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Sedán compacto eficiente y ágil para la ciudad.', origin: 'Japón' },
  { id: 3, brand: 'Toyota', model: 'Corolla Cross', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 19990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV familiar con excelente relación precio-calidad.', origin: 'Japón' },
  { id: 4, brand: 'Toyota', model: 'RAV4', year: 2025, type: 'suv', fuel: 'hibrido', seats: 5, price: 27990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'SUV híbrido con tecnología avanzada y gran autonomía.', origin: 'Japón' },
  { id: 5, brand: 'Toyota', model: 'Raize', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 14990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV compacto urbano con diseño moderno.', origin: 'Japón' },
  { id: 6, brand: 'Toyota', model: 'Land Cruiser Prado', year: 2025, type: 'suv', fuel: 'diesel', seats: 7, price: 42990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'SUV premium off-road con lujo y capacidad todoterreno.', origin: 'Japón' },

  // HYUNDAI
  { id: 7, brand: 'Hyundai', model: 'Grand i10', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 9990000, transmission: 'manual', traction: '4x2', image_url: '', description: 'Citycar versátil y económico para la ciudad.', origin: 'Corea del Sur' },
  { id: 8, brand: 'Hyundai', model: 'Accent', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 13990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Sedán confiable con excelente equipamiento de serie.', origin: 'Corea del Sur' },
  { id: 9, brand: 'Hyundai', model: 'Tucson', year: 2025, type: 'suv', fuel: 'hibrido', seats: 5, price: 24990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'SUV híbrido con diseño audaz y tecnología punta.', origin: 'Corea del Sur' },
  { id: 10, brand: 'Hyundai', model: 'Creta', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 16990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV compacto con excelente equipamiento.', origin: 'Corea del Sur' },
  { id: 11, brand: 'Hyundai', model: 'Kona', year: 2025, type: 'suv', fuel: 'electrico', seats: 5, price: 29990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV 100% eléctrico con 305 km de autonomía.', origin: 'Corea del Sur' },
  { id: 12, brand: 'Hyundai', model: 'Santa Fe', year: 2025, type: 'suv', fuel: 'hibrido', seats: 7, price: 34990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'SUV familiar grande con motor híbrido turbo.', origin: 'Corea del Sur' },

  // SUZUKI
  { id: 13, brand: 'Suzuki', model: 'Baleno', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 10990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Hatchback más vendido de Chile. Eficiente y espacioso.', origin: 'Japón' },
  { id: 14, brand: 'Suzuki', model: 'Swift', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 12990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Deportivo y ágil, microhíbrido de última generación.', origin: 'Japón' },
  { id: 15, brand: 'Suzuki', model: 'Celerio', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 8490000, transmission: 'manual', traction: '4x2', image_url: '', description: 'El auto más económico del mercado con gran rendimiento.', origin: 'Japón' },
  { id: 16, brand: 'Suzuki', model: 'Fronx', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 15990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV crossover con diseño moderno y eficiente.', origin: 'Japón' },
  { id: 17, brand: 'Suzuki', model: 'Alto', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 4, price: 7490000, transmission: 'manual', traction: '4x2', image_url: '', description: 'Citycar ideal para la ciudad, bajo consumo.', origin: 'Japón' },

  // KIA
  { id: 18, brand: 'Kia', model: 'Soluto', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 9990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Sedán más vendido de Chile. Relación precio-calidad imbatible.', origin: 'Corea del Sur' },
  { id: 19, brand: 'Kia', model: 'Morning', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 8990000, transmission: 'manual', traction: '4x2', image_url: '', description: 'Citycar popular y confiable.', origin: 'Corea del Sur' },
  { id: 20, brand: 'Kia', model: 'Sportage', year: 2025, type: 'suv', fuel: 'hibrido', seats: 5, price: 26990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'SUV premium con motor híbrido y diseño vanguardista.', origin: 'Corea del Sur' },
  { id: 21, brand: 'Kia', model: 'Sonet', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 14990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV compacto con gran equipamiento.', origin: 'Corea del Sur' },
  { id: 22, brand: 'Kia', model: 'Sorento', year: 2025, type: 'suv', fuel: 'hibrido', seats: 7, price: 32990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'SUV familiar grande con tecnología híbrida.', origin: 'Corea del Sur' },

  // CHEVROLET
  { id: 23, brand: 'Chevrolet', model: 'Sail', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 10990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Sedán económico y confiable para la familia.', origin: 'Estados Unidos' },
  { id: 24, brand: 'Chevrolet', model: 'Groove', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 14990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV más vendida de Chile. Diseño y equipamiento premium.', origin: 'Estados Unidos' },
  { id: 25, brand: 'Chevrolet', model: 'Captiva', year: 2025, type: 'suv', fuel: 'gasolina', seats: 7, price: 19990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV familiar con 7 plazas y gran espacio.', origin: 'Estados Unidos' },
  { id: 26, brand: 'Chevrolet', model: 'Silverado', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 34990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'Pick-up full-size potente y lujosa.', origin: 'Estados Unidos' },
  { id: 27, brand: 'Chevrolet', model: 'Montana', year: 2025, type: 'pickup', fuel: 'gasolina', seats: 5, price: 16990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Pick-up compacta versátil para trabajo y ciudad.', origin: 'Estados Unidos' },
  { id: 28, brand: 'Chevrolet', model: 'Onix', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 11990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Sedán moderno con versión turbo RS.', origin: 'Estados Unidos' },

  // FORD
  { id: 29, brand: 'Ford', model: 'Ranger', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 25990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'Pick-up robusta y versátil para todo terreno.', origin: 'Estados Unidos' },
  { id: 30, brand: 'Ford', model: 'Territory', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 18990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV familiar con diseño elegante.', origin: 'Estados Unidos' },
  { id: 31, brand: 'Ford', model: 'F-150', year: 2025, type: 'pickup', fuel: 'hibrido', seats: 5, price: 42990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'Pick-up full-size icónica con versión híbrida.', origin: 'Estados Unidos' },
  { id: 32, brand: 'Ford', model: 'Maverick', year: 2025, type: 'pickup', fuel: 'hibrido', seats: 5, price: 22990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Pick-up compacta híbrida, eficiente y práctica.', origin: 'Estados Unidos' },

  // GWM
  { id: 33, brand: 'GWM', model: 'Poer', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 19990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'Pick-up china más vendida. Gran relación precio-calidad.', origin: 'China' },
  { id: 34, brand: 'GWM', model: 'Haval Jolion', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 15990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV compacto con equipamiento completo.', origin: 'China' },
  { id: 35, brand: 'GWM', model: 'Haval H6', year: 2025, type: 'suv', fuel: 'hibrido', seats: 5, price: 22990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'SUV híbrido con tecnología avanzada.', origin: 'China' },

  // CHERY
  { id: 36, brand: 'Chery', model: 'Tiggo 2', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 11990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV más vendida del segmento chino.', origin: 'China' },
  { id: 37, brand: 'Chery', model: 'Tiggo 3 Pro', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 14990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'SUV versátil con tracción 4x4.', origin: 'China' },

  // MG
  { id: 38, brand: 'MG', model: 'MG3', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 8990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Hatchback con diseño deportivo y precio accesible.', origin: 'China' },
  { id: 39, brand: 'MG', model: 'MG ZS', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 13990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV compacto con excelente equipamiento.', origin: 'China' },

  // MITSUBISHI
  { id: 40, brand: 'Mitsubishi', model: 'L-200', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 21990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'Pick-up legendaria, la más vendida históricamente.', origin: 'Japón' },

  // PEUGEOT
  { id: 41, brand: 'Peugeot', model: '208', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 12990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Hatchback francés con diseño premium.', origin: 'Francia' },
  { id: 42, brand: 'Peugeot', model: '2008', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 16990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV crossover con estilo francés.', origin: 'Francia' },
  { id: 43, brand: 'Peugeot', model: 'Partner', year: 2025, type: 'commercial', fuel: 'diesel', seats: 2, price: 15990000, transmission: 'manual', traction: '4x2', image_url: '', description: 'Comercial versátil para trabajo.', origin: 'Francia' },

  // CITROEN
  { id: 44, brand: 'Citroën', model: 'C3', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 10990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Hatchback cómodo y con diseño único.', origin: 'Francia' },
  { id: 45, brand: 'Citroën', model: 'Celysee', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 11990000, transmission: 'manual', traction: '4x2', image_url: '', description: 'Sedán económico y espacioso.', origin: 'Francia' },

  // CHANGAN
  { id: 46, brand: 'Changan', model: 'Hunter', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 16990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'Pick-up china con gran equipamiento.', origin: 'China' },
  { id: 47, brand: 'Changan', model: 'Alsvin', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 8990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Uno de los sedanes más baratos de Chile.', origin: 'China' },

  // NISSAN
  { id: 48, brand: 'Nissan', model: 'Versa', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 12990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Sedán confiable y eficiente.', origin: 'Japón' },
  { id: 49, brand: 'Nissan', model: 'Kicks', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 16990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV crossover con diseño llamativo.', origin: 'Japón' },

  // MAZDA
  { id: 50, brand: 'Mazda', model: 'CX-5', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 24990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'SUV premium con diseño Kodo y gran conducción.', origin: 'Japón' },
  { id: 51, brand: 'Mazda', model: 'Mazda3', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 19990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Sedán premium con acabados de lujo.', origin: 'Japón' },
  { id: 52, brand: 'Mazda', model: 'BT-50', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 23990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'Pick-up robusta con motor diésel eficiente.', origin: 'Japón' },

  // MAXUS
  { id: 53, brand: 'Maxus', model: 'T60', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 18990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'Pick-up china con excelente equipamiento.', origin: 'China' },

  // FOTON
  { id: 54, brand: 'Foton', model: 'G7', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 17990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'Pick-up confiable para trabajo pesado.', origin: 'China' },

  // OMODA
  { id: 55, brand: 'Omoda', model: 'C5', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 16990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV con diseño futurista y tecnología avanzada.', origin: 'China' },

  // JMC
  { id: 56, brand: 'JMC', model: 'Grand Avenue', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 19990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'Pick-up con acabados premium.', origin: 'China' },

  // RAM
  { id: 57, brand: 'RAM', model: '700', year: 2025, type: 'pickup', fuel: 'gasolina', seats: 5, price: 17990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Pick-up compacta americana.', origin: 'Estados Unidos' },

  // BYD
  { id: 58, brand: 'BYD', model: 'Dolphin', year: 2025, type: 'hatchback', fuel: 'electrico', seats: 5, price: 19990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'Hatchback 100% eléctrico con gran autonomía.', origin: 'China' },
  { id: 59, brand: 'BYD', model: 'Atto 3', year: 2025, type: 'suv', fuel: 'electrico', seats: 5, price: 26990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV eléctrico con diseño innovador.', origin: 'China' },

  // SUBARU
  { id: 60, brand: 'Subaru', model: 'Crosstrek', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 21990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'SUV con tracción integral simétrica.', origin: 'Japón' },

  // Volkswagen
  { id: 61, brand: 'Volkswagen', model: 'T-Cross', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 16990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV compacto alemán con diseño moderno.', origin: 'Alemania' },

  // SMART
  { id: 62, brand: 'Smart', model: '#1', year: 2025, type: 'suv', fuel: 'electrico', seats: 5, price: 29990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV eléctrico premium de nueva generación.', origin: 'Alemania' },

  // GEELY
  { id: 63, brand: 'Geely', model: 'Coolray', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 14990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV con tecnología y diseño competitivo.', origin: 'China' },

  // DFSK
  { id: 64, brand: 'DFSK', model: ' Glory 500', year: 2025, type: 'suv', fuel: 'gasolina', seats: 7, price: 15990000, transmission: 'automatica', traction: '4x2', image_url: '', description: 'SUV familiar con 7 plazas económico.', origin: 'China' },

  // SsangYong / KGM
  { id: 65, brand: 'KGM', model: 'Grand Musso', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 20990000, transmission: 'automatica', traction: '4x4', image_url: '', description: 'Pick-up coreana con acabados premium.', origin: 'Corea del Sur' },
];

export const brands = [...new Set(carsData.map(c => c.brand))].sort();
export const carTypes = ['sedan', 'suv', 'pickup', 'hatchback', 'commercial'];
export const fuelTypes = ['gasolina', 'diesel', 'electrico', 'hibrido'];
export const transmissions = ['manual', 'automatica'];
export const tractions = ['4x2', '4x4'];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(price);
};

export const getTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    sedan: 'Sedán',
    suv: 'SUV',
    pickup: 'Pick-up',
    hatchback: 'Hatchback',
    commercial: 'Comercial',
  };
  return labels[type] || type;
};

export const getFuelLabel = (fuel: string): string => {
  const labels: Record<string, string> = {
    gasolina: 'Gasolina',
    diesel: 'Diésel',
    electrico: 'Eléctrico',
    hibrido: 'Híbrido',
  };
  return labels[fuel] || fuel;
};
