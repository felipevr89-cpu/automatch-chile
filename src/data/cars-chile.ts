import { Car } from '../types';

export const carsData: Car[] = [
  // ═══════════════════════════════════════════════════════════════
  // TOYOTA
  // ═══════════════════════════════════════════════════════════════
  { id: 1, brand: 'Toyota', model: 'Yaris', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 14990000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2020_Toyota_Yaris_%28XP210%29_Limited_hatchback_%282020-10-22%29_01.jpg/800px-2020_Toyota_Yaris_%28XP210%29_Limited_hatchback_%282020-10-22%29_01.jpg', description: 'Sedán compacto eficiente y ágil para la ciudad.', origin: 'Japón', versions: [
    { version: '1.5L i MT', price: 14990000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.5L e CVT', price: 17490000, transmission: 'CVT', traction: 'Delantera' },
    { version: '1.5L g HEV', price: 21990000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 2, brand: 'Toyota', model: 'Yaris Cross', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 19790000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/2022_Toyota_Yaris_Cross_%28XP210%29_Limited_wagon_%282022-09-16%29_01.jpg/800px-2022_Toyota_Yaris_Cross_%28XP210%29_Limited_wagon_%282022-09-16%29_01.jpg', description: 'SUV compacto versátil con diseño moderno.', origin: 'Japón', versions: [
    { version: 'XI 1.5L', price: 19790000, transmission: 'Manual', traction: 'Delantera' },
    { version: 'XI 1.5L CVT', price: 20790000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 3, brand: 'Toyota', model: 'Corolla Cross Híbrido', year: 2025, type: 'suv', fuel: 'hibrido', seats: 5, price: 27990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/2022_Toyota_Corolla_Cross_Hybrid_S%2C_Front_9.16.22.jpg/800px-2022_Toyota_Corolla_Cross_Hybrid_S%2C_Front_9.16.22.jpg', description: 'SUV familiar híbrido con excelente relación precio-calidad.', origin: 'Japón', versions: [
    { version: '1.8L XEI', price: 27990000, transmission: 'CVT', traction: 'Delantera' },
    { version: '1.8L SEG', price: 29990000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 4, brand: 'Toyota', model: 'Corolla Híbrido', year: 2025, type: 'sedan', fuel: 'hibrido', seats: 5, price: 24790000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2019_Toyota_Corolla_Hybrid_%28E210%29_Icon_sedan_2019-07-01_01.jpg/800px-2019_Toyota_Corolla_Hybrid_%28E210%29_Icon_sedan_2019-07-01_01.jpg', description: 'Sedán híbrido eficiente con tecnología avanzada.', origin: 'Japón', versions: [
    { version: '1.8L XLI HEV', price: 24790000, transmission: 'CVT', traction: 'Delantera' },
    { version: '1.8L SEG HEV', price: 28290000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 5, brand: 'Toyota', model: 'RAV4', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 28990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/2019_Toyota_RAV4_Hybrid_S%2C_Front_10.18.19.jpg/800px-2019_Toyota_RAV4_Hybrid_S%2C_Front_10.18.19.jpg', description: 'SUV versátil con tecnología avanzada.', origin: 'Japón', versions: [
    { version: '2.0 LE CVT', price: 28990000, transmission: 'CVT', traction: 'Delantera' },
    { version: '2.0 LE AWD CVT', price: 29990000, transmission: 'CVT', traction: 'AWD' },
    { version: '2.0 XLE CVT', price: 32490000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 6, brand: 'Toyota', model: 'Raize', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 16990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Toyota_Raize_G_%28MXPA10%29_01.jpg/800px-Toyota_Raize_G_%28MXPA10%29_01.jpg', description: 'SUV compacto urbano con diseño moderno.', origin: 'Japón', versions: [
    { version: '1.2L E Aut', price: 16990000, transmission: 'Automática CVT', traction: 'Delantera' },
    { version: '1.2L G Aut', price: 18490000, transmission: 'Automática CVT', traction: 'Delantera' }
  ]},
  { id: 7, brand: 'Toyota', model: 'Hilux', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 33790000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Toyota_Hilux_3.0_G_4x4_2007.jpg/800px-Toyota_Hilux_3.0_G_4x4_2007.jpg', description: 'La pick-up más vendida de Chile.', origin: 'Japón', versions: [
    { version: '2.4L DX CD 4x2', price: 33790000, transmission: 'Manual 6V', traction: '4x2' },
    { version: '2.4L SR CD 4x4', price: 41290000, transmission: 'Manual 6V', traction: '4x4' },
    { version: '2.8L SRV CD 4x4 Aut', price: 48590000, transmission: 'Automática 6V', traction: '4x4' }
  ]},
  { id: 8, brand: 'Toyota', model: 'Land Cruiser Prado', year: 2025, type: 'suv', fuel: 'diesel', seats: 7, price: 66990000, transmission: 'automatica', traction: '4x4', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2024_Toyota_Land_Cruiser_250_GXL%2C_Front_1.05.23.jpg/800px-2024_Toyota_Land_Cruiser_250_GXL%2C_Front_1.05.23.jpg', description: 'SUV premium off-road con lujo y capacidad todoterreno.', origin: 'Japón', versions: [
    { version: 'VX', price: 66990000, transmission: 'Automática', traction: '4x4' },
    { version: 'VX-L', price: 72990000, transmission: 'Automática', traction: '4x4' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // HYUNDAI
  // ═══════════════════════════════════════════════════════════════
  { id: 9, brand: 'Hyundai', model: 'Grand i10', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 10490000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Hyundai_Grand_i10_%28AI3%29_Lite_5-Door_Hatchback_20201015_01.jpg/800px-Hyundai_Grand_i10_%28AI3%29_Lite_5-Door_Hatchback_20201015_01.jpg', description: 'Citycar versátil y económico.', origin: 'Corea del Sur', versions: [
    { version: '1.0L Go', price: 10490000, transmission: 'Manual', traction: 'Delantera' },
    { version: '1.2L Plus', price: 11790000, transmission: 'Manual', traction: 'Delantera' }
  ]},
  { id: 10, brand: 'Hyundai', model: 'i20', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 15390000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Hyundai_i20_2020_1.0_T-GDi_%28NC%29_Front.jpg/800px-Hyundai_i20_2020_1.0_T-GDi_%28NC%29_Front.jpg', description: 'Hatchback deportivo con diseño moderno.', origin: 'Corea del Sur', versions: [
    { version: '1.4L Plus', price: 15390000, transmission: 'Manual', traction: 'Delantera' },
    { version: '1.0T Design Aut', price: 19490000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 11, brand: 'Hyundai', model: 'Accent', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 15690000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/2018_Hyundai_Accent_%28HC%29_Premium_sedan_%282018-08-31%29_01.jpg/800px-2018_Hyundai_Accent_%28HC%29_Premium_sedan_%282018-08-31%29_01.jpg', description: 'Sedán confiable con excelente equipamiento.', origin: 'Corea del Sur', versions: [
    { version: 'BN7i 1.5 MT Black', price: 15690000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: 'BN7i 1.5 AT Plus', price: 17290000, transmission: 'Automática', traction: 'Delantera' },
    { version: 'BN7i 1.5 AT Design', price: 20290000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 12, brand: 'Hyundai', model: 'Creta', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 18290000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/2022_Hyundai_Creta_%28NX4%29_Style_1.5_T-GDi_7DCT_5d_wagon_01.jpg/800px-2022_Hyundai_Creta_%28NX4%29_Style_1.5_T-GDi_7DCT_5d_wagon_01.jpg', description: 'SUV compacto con excelente equipamiento.', origin: 'Corea del Sur', versions: [
    { version: 'SU2id 1.5 MT GO FL', price: 18290000, transmission: 'Manual', traction: 'Delantera' },
    { version: 'SU2id 1.5 CVT Design FL', price: 22790000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 13, brand: 'Hyundai', model: 'Grand Creta', year: 2025, type: 'suv', fuel: 'gasolina', seats: 7, price: 20690000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Hyundai_Grand_Creta_%28SU2id%29_Facelift_20230713_01.jpg/800px-Hyundai_Grand_Creta_%28SU2id%29_Facelift_20230713_01.jpg', description: 'SUV familiar con 7 plazas.', origin: 'Corea del Sur', versions: [
    { version: '1.5T GL', price: 20690000, transmission: 'Automática', traction: 'Delantera' },
    { version: '1.5T GLX', price: 24390000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 14, brand: 'Hyundai', model: 'Kona', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 22990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/2021_Hyundai_Kona_%28OX%29_Facelift_1.0T-GDi_sports_wagon_5d_01.jpg/800px-2021_Hyundai_Kona_%28OX%29_Facelift_1.0T-GDi_sports_wagon_5d_01.jpg', description: 'SUV crossover con diseño audaz.', origin: 'Corea del Sur', versions: [
    { version: '2.0L Plus CVT', price: 22990000, transmission: 'CVT', traction: 'Delantera' },
    { version: '1.6T N-Line AWD', price: 35790000, transmission: 'Automática', traction: 'AWD' }
  ]},
  { id: 15, brand: 'Hyundai', model: 'Kona HEV', year: 2025, type: 'suv', fuel: 'hibrido', seats: 5, price: 27590000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/2022_Hyundai_Kona_Hybrid_%28MX%29_N-Line_wagon_5d_01.jpg/800px-2022_Hyundai_Kona_Hybrid_%28MX%29_N-Line_wagon_5d_01.jpg', description: 'SUV híbrido eficiente y moderno.', origin: 'Corea del Sur', versions: [
    { version: '1.6L Plus Aut', price: 27590000, transmission: 'Automática', traction: 'Delantera' },
    { version: '1.6L Design Aut', price: 30190000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 16, brand: 'Hyundai', model: 'Tucson', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 24390000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/2022_Hyundai_Tucson_Limited%2C_Front_8.6.22.jpg/800px-2022_Hyundai_Tucson_Limited%2C_Front_8.6.22.jpg', description: 'SUV familiar con diseño premium.', origin: 'Corea del Sur', versions: [
    { version: 'NX4c 2.0 MT GO FL', price: 24390000, transmission: 'Manual', traction: 'Delantera' },
    { version: 'NX4c 2.0 AT Plus FL', price: 25990000, transmission: 'Automática', traction: 'Delantera' },
    { version: 'NX4c 1.5T AT 4WD PLUS FL', price: 30190000, transmission: 'Automática', traction: '4WD' }
  ]},
  { id: 17, brand: 'Hyundai', model: 'Santa Fe', year: 2025, type: 'suv', fuel: 'gasolina', seats: 7, price: 36090000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/2023_Hyundai_Santa_Fe_Hybrid_Calligraphy%2C_Front_1.13.23.jpg/800px-2023_Hyundai_Santa_Fe_Hybrid_Calligraphy%2C_Front_1.13.23.jpg', description: 'SUV familiar grande y lujosa.', origin: 'Corea del Sur', versions: [
    { version: '2.5L Plus Aut', price: 36090000, transmission: 'Automática 8V', traction: 'Delantera' },
    { version: '2.5L Design AWD Aut', price: 40090000, transmission: 'Automática 8V', traction: 'AWD' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // KIA
  // ═══════════════════════════════════════════════════════════════
  { id: 18, brand: 'Kia', model: 'Soluto', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 10990000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/2021_Kia_Soluto_%28FB7%29_LX_sedan_01.jpg/800px-2021_Kia_Soluto_%28FB7%29_LX_sedan_01.jpg', description: 'Sedán más vendido de Chile.', origin: 'Corea del Sur', versions: [
    { version: '1.4L LX', price: 10990000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.4L EX', price: 11990000, transmission: 'Manual 5V', traction: 'Delantera' }
  ]},
  { id: 19, brand: 'Kia', model: 'Morning', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 13290000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/2017_Kia_Morning_%28JA%29_SI_5-Door_Hatchback_2018-08-17_01.jpg/800px-2017_Kia_Morning_%28JA%29_SI_5-Door_Hatchback_2018-08-17_01.jpg', description: 'Citycar popular y confiable.', origin: 'Corea del Sur', versions: [
    { version: '1.2L EX', price: 13290000, transmission: 'Manual', traction: 'Delantera' },
    { version: '1.2L EX Full', price: 13890000, transmission: 'Manual', traction: 'Delantera' }
  ]},
  { id: 20, brand: 'Kia', model: 'Sonet', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 15690000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/2022_Kia_Sonet_%28QY%29_S%2B_sports_wagon_5d_01.jpg/800px-2022_Kia_Sonet_%28QY%29_S%2B_sports_wagon_5d_01.jpg', description: 'SUV compacto con gran equipamiento.', origin: 'Corea del Sur', versions: [
    { version: '1.5L LX', price: 15690000, transmission: 'Manual', traction: 'Delantera' },
    { version: '1.5L EX Aut', price: 17990000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 21, brand: 'Kia', model: 'Sportage', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 25990000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/2022_Kia_Sportage_X-Line_%28NQ5%29_Wagon_5-Door_5-Seat_%28MY22%29_01.jpg/800px-2022_Kia_Sportage_X-Line_%28NQ5%29_Wagon_5-Door_5-Seat_%28MY22%29_01.jpg', description: 'SUV premium con diseño vanguardista.', origin: 'Corea del Sur', versions: [
    { version: '2.0L LX GSL', price: 25990000, transmission: 'Manual', traction: 'Delantera' },
    { version: '2.0L EX GSL Aut', price: 27790000, transmission: 'Automática', traction: 'Delantera' },
    { version: '1.6T X-Line GSL AWD', price: 37990000, transmission: 'Automática', traction: 'AWD' }
  ]},
  { id: 22, brand: 'Kia', model: 'Sorento', year: 2025, type: 'suv', fuel: 'gasolina', seats: 7, price: 36990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/2022_Kia_Sorento_PHEV_%28MQ4%29_GT-Line_AWD_5-Door_Wagon_%282022-05-16%29_01.jpg/800px-2022_Kia_Sorento_PHEV_%28MQ4%29_GT-Line_AWD_5-Door_Wagon_%282022-05-16%29_01.jpg', description: 'SUV familiar grande con tecnología avanzada.', origin: 'Corea del Sur', versions: [
    { version: '2.5L EX GSL 2WD Aut', price: 36990000, transmission: 'Automática', traction: '2WD' },
    { version: '2.2L EX DSL AWD Aut', price: 41990000, transmission: 'Automática', traction: 'AWD' }
  ]},
  { id: 23, brand: 'Kia', model: 'Niro Híbrido', year: 2025, type: 'suv', fuel: 'hibrido', seats: 5, price: 29990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/2022_Kia_Niro_Hybrid_%28DE%29_Story_wagon_5d_01.jpg/800px-2022_Kia_Niro_Hybrid_%28DE%29_Story_wagon_5d_01.jpg', description: 'SUV híbrido eficiente y espacioso.', origin: 'Corea del Sur', versions: [
    { version: '1.6L LX', price: 29990000, transmission: 'DCT 6V', traction: 'Delantera' },
    { version: '1.6L EX', price: 35490000, transmission: 'DCT 6V', traction: 'Delantera' }
  ]},
  { id: 24, brand: 'Kia', model: 'EV6', year: 2025, type: 'suv', fuel: 'electrico', seats: 5, price: 62990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Kia_EV6_Line_1X7A5890.jpg/800px-Kia_EV6_Line_1X7A5890.jpg', description: 'SUV eléctrico de alto rendimiento.', origin: 'Corea del Sur', versions: [
    { version: 'GT-Line', price: 62990000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 25, brand: 'Kia', model: 'Carnival', year: 2025, type: 'minivan', fuel: 'gasolina', seats: 8, price: 46990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/4th_generation_Kia_Carnival_%28KA4%29_India.jpg/800px-4th_generation_Kia_Carnival_%28KA4%29_India.jpg', description: 'Minivan familiar premium.', origin: 'Corea del Sur', versions: [
    { version: '3.5L EX GSL', price: 46990000, transmission: 'Automática 8V', traction: 'Delantera' },
    { version: '2.2L EX DSL Full Aut', price: 54990000, transmission: 'Automática 8V', traction: 'Delantera' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // CHEVROLET
  // ═══════════════════════════════════════════════════════════════
  { id: 26, brand: 'Chevrolet', model: 'Sail', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 9990000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/2017_Chevrolet_Sail_LT_sedan_2018-03-08_01.jpg/800px-2017_Chevrolet_Sail_LT_sedan_2018-03-08_01.jpg', description: 'Sedán económico y confiable.', origin: 'Estados Unidos', versions: [
    { version: '1.5 LT', price: 9990000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.5 LTZ Aut', price: 11690000, transmission: 'Automática 5V', traction: 'Delantera' }
  ]},
  { id: 27, brand: 'Chevrolet', model: 'Onix', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 13190000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/2022_Chevrolet_Onix_LT_1.2L%2C_Front_9.23.22.jpg/800px-2022_Chevrolet_Onix_LT_1.2L%2C_Front_9.23.22.jpg', description: 'Hatchback moderno con versión turbo RS.', origin: 'Estados Unidos', versions: [
    { version: '1.0T LTZ R', price: 13190000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.0T Premier S Aut', price: 16390000, transmission: 'Automática 6V', traction: 'Delantera' }
  ]},
  { id: 28, brand: 'Chevrolet', model: 'Groove', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 11490000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/2022_Chevrolet_Groove_%28716%29_LTZ_wagon_5d_01.jpg/800px-2022_Chevrolet_Groove_%28716%29_LTZ_wagon_5d_01.jpg', description: 'SUV más vendida de Chile.', origin: 'Estados Unidos', versions: [
    { version: 'LTZ S', price: 11490000, transmission: 'Manual 6V', traction: 'Delantera' },
    { version: '1.5L Premier S', price: 12490000, transmission: 'Manual 6V', traction: 'Delantera' }
  ]},
  { id: 29, brand: 'Chevrolet', model: 'Tracker', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 18490000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/2021_Chevrolet_Tracker_LTZ_1.0T%2C_Front_1.15.21.jpg/800px-2021_Chevrolet_Tracker_LTZ_1.0T%2C_Front_1.15.21.jpg', description: 'SUV compacto con motor turbo eficiente.', origin: 'Estados Unidos', versions: [
    { version: 'LTZ AT 2026', price: 18490000, transmission: 'Automática', traction: 'Delantera' },
    { version: 'Premier AT 2026', price: 19990000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 30, brand: 'Chevrolet', model: 'Montana', year: 2025, type: 'pickup', fuel: 'gasolina', seats: 5, price: 17400000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Chevrolet_Montana_4.jpg/800px-Chevrolet_Montana_4.jpg', description: 'Pick-up compacta versátil.', origin: 'Estados Unidos', versions: [
    { version: 'Premier S 1.2', price: 17400000, transmission: 'Manual', traction: 'Delantera' },
    { version: 'LTZ S 1.2 Aut', price: 21054000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 31, brand: 'Chevrolet', model: 'Silverado', year: 2025, type: 'pickup', fuel: 'gasolina', seats: 5, price: 50807900, transmission: 'automatica', traction: '4x4', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/2022_Chevrolet_Silverado_1500_LT_Crew_Cab%2C_Front_6.15.22.jpg/800px-2022_Chevrolet_Silverado_1500_LT_Crew_Cab%2C_Front_6.15.22.jpg', description: 'Pick-up full-size potente y lujosa.', origin: 'Estados Unidos', versions: [
    { version: '5.3L LT Trailboss 4x4', price: 50807900, transmission: 'Automática', traction: '4x4' },
    { version: '3.0L High Country 4x4', price: 73555900, transmission: 'Automática', traction: '4x4' }
  ]},
  { id: 32, brand: 'Chevrolet', model: 'Captiva EV', year: 2025, type: 'suv', fuel: 'electrico', seats: 7, price: 28990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/2022_Chevrolet_Captiva_%28716%29_LTZ_wagon_5d_02.jpg/800px-2022_Chevrolet_Captiva_%28716%29_LTZ_wagon_5d_02.jpg', description: 'SUV eléctrica familiar con 7 plazas.', origin: 'Estados Unidos', versions: [
    { version: 'Base', price: 28990000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 33, brand: 'Chevrolet', model: 'Equinox EV', year: 2025, type: 'suv', fuel: 'electrico', seats: 5, price: 45990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/2024_Chevrolet_Equinox_EV_2RS%2C_Front_6.15.24.jpg/800px-2024_Chevrolet_Equinox_EV_2RS%2C_Front_6.15.24.jpg', description: 'SUV eléctrica premium.', origin: 'Estados Unidos', versions: [
    { version: 'RS', price: 45990000, transmission: 'Automática', traction: 'Delantera' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // NISSAN
  // ═══════════════════════════════════════════════════════════════
  { id: 34, brand: 'Nissan', model: 'March', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 6390000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/2017_Nissan_March_%28K14%29_1.0_Liter_Front.jpg/800px-2017_Nissan_March_%28K14%29_1.0_Liter_Front.jpg', description: 'Citycar económico ideal para la ciudad.', origin: 'Japón', versions: [
    { version: '1.0 Base', price: 6390000, transmission: 'Manual', traction: 'Delantera' }
  ]},
  { id: 35, brand: 'Nissan', model: 'Versa', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 16380000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/2020_Nissan_Versa_SV%2C_Front_8.23.20.jpg/800px-2020_Nissan_Versa_SV%2C_Front_8.23.20.jpg', description: 'Sedán confiable y eficiente.', origin: 'Japón', versions: [
    { version: '1.6L Sense', price: 16380000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.6L Sense CVT', price: 18100000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 36, brand: 'Nissan', model: 'Sentra', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 21580000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/2020_Nissan_Sentra_SV%2C_Front_12.10.19.jpg/800px-2020_Nissan_Sentra_SV%2C_Front_12.10.19.jpg', description: 'Sedán premium con acabados de lujo.', origin: 'Japón', versions: [
    { version: '2.0L Sense', price: 21580000, transmission: 'Manual 6V', traction: 'Delantera' },
    { version: '2.0L Advance CVT', price: 24900000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 37, brand: 'Nissan', model: 'Kicks Play', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 18540000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/2022_Nissan_Kicks_SV%2C_Front_9.12.22.jpg/800px-2022_Nissan_Kicks_SV%2C_Front_9.12.22.jpg', description: 'SUV crossover con diseño llamativo.', origin: 'Japón', versions: [
    { version: '1.6L Sense', price: 18540000, transmission: 'Manual', traction: 'Delantera' },
    { version: '1.6L Advance CVT', price: 22070000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 38, brand: 'Nissan', model: 'Qashqai', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 33180000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/2022_Nissan_Qashqai_%28J12%29_1.3L_Techna%2C_Front_3.1.23.jpg/800px-2022_Nissan_Qashqai_%28J12%29_1.3L_Techna%2C_Front_3.1.23.jpg', description: 'SUV crossover premium.', origin: 'Japón', versions: [
    { version: 'Advance', price: 33180000, transmission: 'CVT', traction: 'Delantera' },
    { version: 'Exclusive CVT 4x4', price: 35710000, transmission: 'CVT', traction: '4x4' }
  ]},
  { id: 39, brand: 'Nissan', model: 'X-Trail', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 32400000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/2022_Nissan_X-Trail_%28T33%29_Techna%2C_Front_10.2.23.jpg/800px-2022_Nissan_X-Trail_%28T33%29_Techna%2C_Front_10.2.23.jpg', description: 'SUV familiar grande y espaciosa.', origin: 'Japón', versions: [
    { version: '2.5L Sense 2Row', price: 32400000, transmission: 'CVT', traction: 'Delantera' },
    { version: '2.5L Exclusive 3Row 4x4', price: 38940000, transmission: 'CVT', traction: '4x4' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // SUZUKI
  // ═══════════════════════════════════════════════════════════════
  { id: 40, brand: 'Suzuki', model: 'Alto', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 9390000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Suzuki_Alto_KEI.jpg/800px-Suzuki_Alto_KEI.jpg', description: 'Citycar ideal para la ciudad, bajo consumo.', origin: 'Japón', versions: [
    { version: '1.0L GL', price: 9390000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.0L GL Plus', price: 9590000, transmission: 'Manual 5V', traction: 'Delantera' }
  ]},
  { id: 41, brand: 'Suzuki', model: 'Swift Hybrid', year: 2025, type: 'hatchback', fuel: 'hibrido', seats: 5, price: 15090000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/2024_Swift_Hybrid_LX_%28MY24%29_hatchback_20240413_01.jpg/800px-2024_Swift_Hybrid_LX_%28MY24%29_hatchback_20240413_01.jpg', description: 'Hatchback deportivo híbrido.', origin: 'Japón', versions: [
    { version: '1.2 GL', price: 15090000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.2 GLX Aut', price: 17790000, transmission: 'Automática 5V', traction: 'Delantera' }
  ]},
  { id: 42, brand: 'Suzuki', model: 'Fronx', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 17790000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Suzuki_Fronx_%28EB%29_Hybrid_Z_in_Orange%2C_Front_10.11.22.jpg/800px-Suzuki_Fronx_%28EB%29_Hybrid_Z_in_Orange%2C_Front_10.11.22.jpg', description: 'SUV crossover moderno y eficiente.', origin: 'Japón', versions: [
    { version: 'GL', price: 17790000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: 'GLX Aut', price: 20690000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 43, brand: 'Suzuki', model: 'Jimny', year: 2025, type: 'suv', fuel: 'gasolina', seats: 4, price: 17490000, transmission: 'manual', traction: '4x4', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/2018_Suzuki_Jimny_%28JB74W%29_LXi_3-door_wagon_2018-10-25_01.jpg/800px-2018_Suzuki_Jimny_%28JB74W%29_LXi_3-door_wagon_2018-10-25_01.jpg', description: 'SUV off-road legendario.', origin: 'Japón', versions: [
    { version: '1.5 GL', price: 17490000, transmission: 'Manual 5V', traction: '4x4' },
    { version: '1.5 GLX Aut', price: 19490000, transmission: 'Automática 4V', traction: '4x4' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // MAZDA
  // ═══════════════════════════════════════════════════════════════
  { id: 44, brand: 'Mazda', model: 'CX-3', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 19590000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/2020_Mazda_CX-3_Maxx_2.0_%28DK%29_wagon_5d_01.jpg/800px-2020_Mazda_CX-3_Maxx_2.0_%28DK%29_wagon_5d_01.jpg', description: 'SUV subcompacto con estilo deportivo.', origin: 'Japón', versions: [
    { version: '2.0L Core 2WD', price: 19590000, transmission: 'Manual 6V', traction: 'Delantera' },
    { version: '2.0L Core 2WD Aut', price: 20590000, transmission: 'Automática 6V', traction: 'Delantera' }
  ]},
  { id: 45, brand: 'Mazda', model: 'CX-30', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 22690000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/2019_Mazda_CX-30_2.0L_%28DM%29_GS-L_wagon_5d_01.jpg/800px-2019_Mazda_CX-30_2.0L_%28DM%29_GS-L_wagon_5d_01.jpg', description: 'SUV compacto premium.', origin: 'Japón', versions: [
    { version: '2.0L Entry Aut', price: 22690000, transmission: 'Automática 6V', traction: 'Delantera' },
    { version: '2.0L Core Aut 4x4', price: 23990000, transmission: 'Automática 6V', traction: 'AWD' }
  ]},
  { id: 46, brand: 'Mazda', model: 'Mazda3', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 20490000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/2019_Mazda3_Sedan_%28BP%29_G25_AWD_Signature_In_Jet_Black_Mica%2C_Front_8.1.19.jpg/800px-2019_Mazda3_Sedan_%28BP%29_G25_AWD_Signature_In_Jet_Black_Mica%2C_Front_8.1.19.jpg', description: 'Sedán premium con acabados de lujo.', origin: 'Japón', versions: [
    { version: '2.0L Entry', price: 20490000, transmission: 'Manual 6V', traction: 'Delantera' },
    { version: '2.0L Core Aut', price: 23490000, transmission: 'Automática 6V', traction: 'Delantera' }
  ]},
  { id: 47, brand: 'Mazda', model: 'CX-5', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 24990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/2022_Mazda_CX-5_2.2D_AWD_%28KF%29_Maxx_Sports_wagon_5d_01.jpg/800px-2022_Mazda_CX-5_2.2D_AWD_%28KF%29_Maxx_Sports_wagon_5d_01.jpg', description: 'SUV premium con diseño Kodo.', origin: 'Japón', versions: [
    { version: '2.0L Core Aut', price: 24990000, transmission: 'Automática 6V', traction: 'Delantera' },
    { version: '2.0L Core Aut 4x4', price: 27490000, transmission: 'Automática 6V', traction: 'AWD' }
  ]},
  { id: 48, brand: 'Mazda', model: 'BT-50', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 35790000, transmission: 'manual', traction: '4x4', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/2021_Mazda_BT-50_XTR_4x4_%28JS%29_Dual_Cab_Ute_in_Genuine_Blue.jpg/800px-2021_Mazda_BT-50_XTR_4x4_%28JS%29_Dual_Cab_Ute_in_Genuine_Blue.jpg', description: 'Pick-up robusta con motor diésel eficiente.', origin: 'Japón', versions: [
    { version: '3.0L 4x4 Core', price: 35790000, transmission: 'Manual 6V', traction: '4x4' },
    { version: '3.0L 4x4 Core Aut', price: 37490000, transmission: 'Automática 8V', traction: '4x4' },
    { version: '3.0L 4x4 High Plus Aut', price: 43390000, transmission: 'Automática 8V', traction: '4x4' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // FORD
  // ═══════════════════════════════════════════════════════════════
  { id: 49, brand: 'Ford', model: 'Territory', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 22590000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/2020_Ford_Territory_Titanium_%28China%29_1.5T%2C_Front_8.15.20.jpg/800px-2020_Ford_Territory_Titanium_%28China%29_1.5T%2C_Front_8.15.20.jpg', description: 'SUV familiar con diseño elegante.', origin: 'Estados Unidos', versions: [
    { version: '1.5L Trend', price: 22590000, transmission: 'Automática', traction: 'Delantera' },
    { version: '1.5L Titanium', price: 29190000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 50, brand: 'Ford', model: 'Ranger', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 33665100, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2022_Ford_Ranger_XLT_3.0L_Turbo_Diesel_4x4_SuperDuty%2C_Front_9.19.22.jpg/800px-2022_Ford_Ranger_XLT_3.0L_Turbo_Diesel_4x4_SuperDuty%2C_Front_9.19.22.jpg', description: 'Pick-up robusta y versátil.', origin: 'Estados Unidos', versions: [
    { version: '2.0L XL 4x2', price: 33665100, transmission: 'Manual 6V', traction: '4x2' },
    { version: '2.0L XLT 4x4 Aut', price: 45565100, transmission: 'Automática 10V', traction: '4x4' },
    { version: '3.0L Limited 4x4 Aut', price: 50801100, transmission: 'Automática 10V', traction: '4x4' }
  ]},
  { id: 51, brand: 'Ford', model: 'Maverick', year: 2025, type: 'pickup', fuel: 'gasolina', seats: 5, price: 31285100, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/2022_Ford_Maverick_XLT_Hybrid_Front_6.15.22.jpg/800px-2022_Ford_Maverick_XLT_Hybrid_Front_6.15.22.jpg', description: 'Pick-up compacta eficiente y práctica.', origin: 'Estados Unidos', versions: [
    { version: '2.0L XLT', price: 31285100, transmission: 'Automática 8V', traction: '4x2' },
    { version: '2.0L Lariat Black', price: 37235100, transmission: 'Automática 8V', traction: 'AWD' }
  ]},
  { id: 52, brand: 'Ford', model: 'Bronco Sport', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 31990000, transmission: 'automatica', traction: 'awd', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2021_Ford_Bronco_Sport_Badlands%2C_Front_3.23.21.jpg/800px-2021_Ford_Bronco_Sport_Badlands%2C_Front_3.23.21.jpg', description: 'SUV off-road con espíritu aventurero.', origin: 'Estados Unidos', versions: [
    { version: '1.5L Big Bend', price: 31990000, transmission: 'Automática 8V', traction: 'AWD' },
    { version: '2.0L Badlands', price: 37990000, transmission: 'Automática 8V', traction: 'AWD' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // GWM
  // ═══════════════════════════════════════════════════════════════
  { id: 53, brand: 'GWM', model: 'Omoda C5', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 13990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/2022_Omoda_C5_%28T15%29_Ultra_LHF_1.5T%2C_Front_7.14.22.jpg/800px-2022_Omoda_C5_%28T15%29_Ultra_LHF_1.5T%2C_Front_7.14.22.jpg', description: 'SUV con diseño futurista.', origin: 'China', versions: [
    { version: 'Urban', price: 13990000, transmission: 'CVT', traction: 'Delantera' },
    { version: 'Comfort', price: 15990000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 54, brand: 'GWM', model: 'Haval Jolion', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 17690000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/2022_GWM_Haval_Jolion_Hybrid_Ultra_%28MY22%29_wagon_5d_01.jpg/800px-2022_GWM_Haval_Jolion_Hybrid_Ultra_%28MY22%29_wagon_5d_01.jpg', description: 'SUV compacto con equipamiento completo.', origin: 'China', versions: [
    { version: '1.5T Active', price: 17690000, transmission: 'Manual 6V', traction: 'Delantera' },
    { version: '1.5T Deluxe Aut', price: 20990000, transmission: 'DCT 7V', traction: 'Delantera' }
  ]},
  { id: 55, brand: 'GWM', model: 'Haval H6', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 22490000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/2022_GWM_Haval_H6_%28T15%29_Ultra_LHF_1.5T%2C_Front_7.14.22.jpg/800px-2022_GWM_Haval_H6_%28T15%29_Ultra_LHF_1.5T%2C_Front_7.14.22.jpg', description: 'SUV familiar con tecnología avanzada.', origin: 'China', versions: [
    { version: 'Elite', price: 22490000, transmission: 'DCT 7V', traction: 'Delantera' },
    { version: 'Deluxe 4x4', price: 25590000, transmission: 'DCT 7V', traction: 'AWD' }
  ]},
  { id: 56, brand: 'GWM', model: 'H6 Híbrido', year: 2025, type: 'suv', fuel: 'hibrido', seats: 5, price: 27990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/2022_GWM_Haval_H6_%28T15%29_Ultra_LHF_1.5T%2C_Front_7.14.22.jpg/800px-2022_GWM_Haval_H6_%28T15%29_Ultra_LHF_1.5T%2C_Front_7.14.22.jpg', description: 'SUV híbrido eficiente.', origin: 'China', versions: [
    { version: 'Elite', price: 27990000, transmission: 'DHT', traction: 'Delantera' },
    { version: 'Deluxe', price: 29990000, transmission: 'DHT', traction: 'Delantera' }
  ]},
  { id: 57, brand: 'GWM', model: 'Poer', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 24026100, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/GWM_Poer_P%2B_Pickup_%2849760935868%29.jpg/800px-GWM_Poer_P%2B_Pickup_%2849760935868%29.jpg', description: 'Pick-up china más vendida.', origin: 'China', versions: [
    { version: 'Elite', price: 24026100, transmission: 'Automática 8V', traction: '4x2' },
    { version: 'Elite 4x4', price: 25811100, transmission: 'Automática 8V', traction: '4x4' }
  ]},
  { id: 58, brand: 'GWM', model: 'Dargo', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 24390000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/GWM_Dargo_%28A01%29_2.0T_Luxury_4WD_2022-11-05.jpg/800px-GWM_Dargo_%28A01%29_2.0T_Luxury_4WD_2022-11-05.jpg', description: 'SUV off-road con diseño aventurero.', origin: 'China', versions: [
    { version: '4x2 Luxury', price: 24390000, transmission: 'DCT 7V', traction: '4x2' },
    { version: '4x4 Deluxe Plus', price: 30290000, transmission: 'DCT 7V', traction: '4x4' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // CHERY
  // ═══════════════════════════════════════════════════════════════
  { id: 59, brand: 'Chery', model: 'Tiggo 2 Pro', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 11990000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/2022_Cheri_Tiggo_2_Pro_LFZ%2C_Front_3.19.22.jpg/800px-2022_Cheri_Tiggo_2_Pro_LFZ%2C_Front_3.19.22.jpg', description: 'SUV más vendida del segmento chino.', origin: 'China', versions: [
    { version: '1.5L GLS', price: 11990000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.5L GLS Limited', price: 12490000, transmission: 'Manual 5V', traction: 'Delantera' }
  ]},
  { id: 60, brand: 'Chery', model: 'Tiggo 3 Pro', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 15490000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/2021_Cheri_Tiggo_7_Pro_LFZ%2C_Front_3.19.22.jpg/800px-2021_Cheri_Tiggo_7_Pro_LFZ%2C_Front_3.19.22.jpg', description: 'SUV versátil con gran equipamiento.', origin: 'China', versions: [
    { version: 'GLX Turbo', price: 15490000, transmission: 'Manual 6V', traction: 'Delantera' },
    { version: 'GLS CVT', price: 15990000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 61, brand: 'Chery', model: 'Tiggo 7 Pro Max', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 16990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/2021_Cheri_Tiggo_7_Pro_LFZ%2C_Front_3.19.22.jpg/800px-2021_Cheri_Tiggo_7_Pro_LFZ%2C_Front_3.19.22.jpg', description: 'SUV familiar con motor turbo.', origin: 'China', versions: [
    { version: '1.5T GLS', price: 16990000, transmission: 'CVT', traction: 'Delantera' },
    { version: '1.5T GLX', price: 19990000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 62, brand: 'Chery', model: 'Tiggo 8 Pro Max', year: 2025, type: 'suv', fuel: 'gasolina', seats: 7, price: 23990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Chery_Tiggo_8_Pro_%2834940896364%29.jpg/800px-Chery_Tiggo_8_Pro_%2834940896364%29.jpg', description: 'SUV familiar grande con 7 plazas.', origin: 'China', versions: [
    { version: '1.6L GLS', price: 23990000, transmission: 'DCT 7V', traction: 'Delantera' },
    { version: '2.0L GLX AWD', price: 33990000, transmission: 'DCT 7V', traction: 'AWD' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // MG
  // ═══════════════════════════════════════════════════════════════
  { id: 63, brand: 'MG', model: 'MG3', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 12090000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/2022_MG3_Compass_%28MY22%29_hatchback_2022-01-18_01.jpg/800px-2022_MG3_Compass_%28MY22%29_hatchback_2022-01-18_01.jpg', description: 'Hatchback con diseño deportivo.', origin: 'China', versions: [
    { version: '1.5L Com', price: 12090000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.5L Lux Aut', price: 14290000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 64, brand: 'MG', model: 'MG5', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 12290000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/MG_5_%282023%29_front_view.jpg/800px-MG_5_%282023%29_front_view.jpg', description: 'Sedán deportivo con excelente precio.', origin: 'China', versions: [
    { version: '1.5L', price: 12290000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.5L CVT COM', price: 13990000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 65, brand: 'MG', model: 'MG ZS', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 12890000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/2022_MG_ZS_Excite_%28MY22%29_wagon_5d_01.jpg/800px-2022_MG_ZS_Excite_%28MY22%29_wagon_5d_01.jpg', description: 'SUV compacto con excelente equipamiento.', origin: 'China', versions: [
    { version: '1.5L STD', price: 12890000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.5L Comfort', price: 13890000, transmission: 'Manual 5V', traction: 'Delantera' }
  ]},
  { id: 66, brand: 'MG', model: 'MG HS', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 17990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/MG_HS_Plus_EV_%28MY22%29_wagon_5d_01.jpg/800px-MG_HS_Plus_EV_%28MY22%29_wagon_5d_01.jpg', description: 'SUV familiar con motor turbo potente.', origin: 'China', versions: [
    { version: '1.5L Com', price: 17990000, transmission: 'DCT 7V', traction: 'Delantera' },
    { version: '2.0L DCT Trophy AWD', price: 21490000, transmission: 'DCT 7V', traction: 'AWD' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // MITSUBISHI
  // ═══════════════════════════════════════════════════════════════
  { id: 67, brand: 'Mitsubishi', model: 'ASX', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 22990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/2020_Mitsubishi_ASX_XA_2.0L_%28pre-facelift%29_Wagon_5d_01.jpg/800px-2020_Mitsubishi_ASX_XA_2.0L_%28pre-facelift%29_Wagon_5d_01.jpg', description: 'SUV compacto confiable.', origin: 'Japón', versions: [
    { version: 'GL', price: 22990000, transmission: 'CVT', traction: 'Delantera' },
    { version: 'GLX', price: 24990000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 68, brand: 'Mitsubishi', model: 'L-200', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 26990000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/2023_Mitsubishi_L200_Barbarian_X_double_cab_2.4_DiD_4WD_6-speed_Auto_%28MY23%29_01.jpg/800px-2023_Mitsubishi_L200_Barbarian_X_double_cab_2.4_DiD_4WD_6-speed_Auto_%28MY23%29_01.jpg', description: 'Pick-up legendaria.', origin: 'Japón', versions: [
    { version: 'Katana XM 6MT', price: 26990000, transmission: 'Manual 6V', traction: '4x2' },
    { version: 'Dakar XR 6AT', price: 38990000, transmission: 'Automática 6V', traction: '4x4' }
  ]},
  { id: 69, brand: 'Mitsubishi', model: 'Outlander', year: 2025, type: 'suv', fuel: 'gasolina', seats: 7, price: 27990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2022_Mitsubishi_Outlander_ES_%28MY22%29_4WD_wagon_5d_01.jpg/800px-2022_Mitsubishi_Outlander_ES_%28MY22%29_4WD_wagon_5d_01.jpg', description: 'SUV familiar con 7 plazas.', origin: 'Japón', versions: [
    { version: '2.5L GL 4x2 5 Pas', price: 27990000, transmission: 'CVT', traction: '4x2' },
    { version: '2.5L GLS 4x4 7 Pas', price: 34490000, transmission: 'CVT', traction: '4x4' }
  ]},
  { id: 70, brand: 'Mitsubishi', model: 'Montero Sport', year: 2025, type: 'suv', fuel: 'diesel', seats: 7, price: 32990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/2022_Mitsubishi_Montero_Sport_%28KG%29_GLX_2.4_DiD_%28facelift%29_4WD_wagon_5d_02.jpg/800px-2022_Mitsubishi_Montero_Sport_%28KG%29_GLX_2.4_DiD_%28facelift%29_4WD_wagon_5d_02.jpg', description: 'SUV todoterreno familiar.', origin: 'Japón', versions: [
    { version: '2.4L 4x2 Aut', price: 32990000, transmission: 'Automática 8V', traction: '4x2' },
    { version: '2.4L Limited 4x4 Aut', price: 35990000, transmission: 'Automática 8V', traction: '4x4' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // PEUGEOT
  // ═══════════════════════════════════════════════════════════════
  { id: 71, brand: 'Peugeot', model: '208', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 16690000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/2019_Peugeot_208_Active%2C_Front_9.1.19.jpg/800px-2019_Peugeot_208_Active%2C_Front_9.1.19.jpg', description: 'Hatchback francés con diseño premium.', origin: 'Francia', versions: [
    { version: '1.2L Style PureTech 75HP', price: 16690000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.2L Active PureTech 100HP', price: 19190000, transmission: 'Manual 6V', traction: 'Delantera' }
  ]},
  { id: 72, brand: 'Peugeot', model: '2008', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 21090000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/2021_Peugeot_2008_Allure%2C_Front_9.22.21.jpg/800px-2021_Peugeot_2008_Allure%2C_Front_9.22.21.jpg', description: 'SUV crossover con estilo francés.', origin: 'Francia', versions: [
    { version: '1.2L Active', price: 21090000, transmission: 'Manual 6V', traction: 'Delantera' },
    { version: '1.2L Allure', price: 23490000, transmission: 'Manual 6V', traction: 'Delantera' }
  ]},
  { id: 73, brand: 'Peugeot', model: '3008', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 25290000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/2022_Peugeot_3008_%28P84%29_Allure_1.6L_Techno_Automatic%2C_Front_1.6.23.jpg/800px-2022_Peugeot_3008_%28P84%29_Allure_1.6L_Techno_Automatic%2C_Front_1.6.23.jpg', description: 'SUV premium con tecnología avanzada.', origin: 'Francia', versions: [
    { version: '1.2L Active PureTech', price: 25290000, transmission: 'Automática 8V', traction: 'Delantera' }
  ]},
  { id: 74, brand: 'Peugeot', model: '5008', year: 2025, type: 'suv', fuel: 'hibrido_enchufable', seats: 7, price: 35090000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/2021_Peugeot_5008_Allure_%28P84%29_LHD_wagon_5d_02.jpg/800px-2021_Peugeot_5008_Allure_%28P84%29_LHD_wagon_5d_02.jpg', description: 'SUV familiar grande híbrido enchufable.', origin: 'Francia', versions: [
    { version: '1.2L Allure PHEV', price: 35090000, transmission: 'Automática', traction: 'Delantera' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // VOLKSWAGEN
  // ═══════════════════════════════════════════════════════════════
  { id: 75, brand: 'Volkswagen', model: 'Polo', year: 2025, type: 'hatchback', fuel: 'gasolina', seats: 5, price: 16990000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/2021_Volkswagen_Polo_85TSI_Comfortline_%28MK6_AU%29_hatchback_%282021-08-18%29_01.jpg/800px-2021_Volkswagen_Polo_85TSI_Comfortline_%28MK6_AU%29_hatchback_%282021-08-18%29_01.jpg', description: 'Hatchback alemán con calidad premium.', origin: 'Alemania', versions: [
    { version: '1.6L MSi Comfortline', price: 16990000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.0L TSi Comfortline Aut', price: 17990000, transmission: 'Automática 6V', traction: 'Delantera' }
  ]},
  { id: 76, brand: 'Volkswagen', model: 'T-Cross', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 19490000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/2021_Volkswagen_T-Cross_1.5_TSI_ACT%2C_Front_8.1.21.jpg/800px-2021_Volkswagen_T-Cross_1.5_TSI_ACT%2C_Front_8.1.21.jpg', description: 'SUV compacto alemán moderno.', origin: 'Alemania', versions: [
    { version: '1.0L Trendline TSi', price: 19490000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.0L Comfortline TSi Aut', price: 21490000, transmission: 'Automática 6V', traction: 'Delantera' }
  ]},
  { id: 77, brand: 'Volkswagen', model: 'Virtus', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 19890000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/2022_Volkswagen_Virtus_%28BL%29_1.0_TSI_Highline_sedan_2022-11-05.jpg/800px-2022_Volkswagen_Virtus_%28BL%29_1.0_TSI_Highline_sedan_2022-11-05.jpg', description: 'Sedán alemán elegante y espacioso.', origin: 'Alemania', versions: [
    { version: '1.0L Comfortline Plus', price: 19890000, transmission: 'Manual', traction: 'Delantera' },
    { version: '1.0L Highline Aut', price: 21990000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 78, brand: 'Volkswagen', model: 'Taos', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 25790000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/2022_Volkswagen_Taos_%28North_America%29_1.5_TSI_%28facelift%29_2WD_DSG_wagon_5d_01.jpg/800px-2022_Volkswagen_Taos_%28North_America%29_1.5_TSI_%28facelift%29_2WD_DSG_wagon_5d_01.jpg', description: 'SUV familiar con motor turbo eficiente.', origin: 'Alemania', versions: [
    { version: '1.4L Comfortline Aut', price: 25790000, transmission: 'Automática 8V', traction: 'Delantera' },
    { version: '1.4L Highline Aut', price: 29190000, transmission: 'Automática 8V', traction: 'Delantera' }
  ]},
  { id: 79, brand: 'Volkswagen', model: 'Tiguan', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 36490000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/2022_Volkswagen_Tiguan_%28AD%29_NLine_2.0_TSI_4Motion_DSG_wagon_5d_01.jpg/800px-2022_Volkswagen_Tiguan_%28AD%29_NLine_2.0_TSI_4Motion_DSG_wagon_5d_01.jpg', description: 'SUV familiar alemán premium.', origin: 'Alemania', versions: [
    { version: '1.4L TSi Comfortline Aut', price: 36490000, transmission: 'DSG 7V', traction: 'Delantera' },
    { version: '2.0L TSi R-Line 4Motion Aut', price: 39490000, transmission: 'DSG 7V', traction: '4Motion' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // BYD
  // ═══════════════════════════════════════════════════════════════
  { id: 80, brand: 'BYD', model: 'Dolphin', year: 2025, type: 'hatchback', fuel: 'electrico', seats: 5, price: 16990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/BYD_Dolphin_01_China_2022-06-16.jpg/800px-BYD_Dolphin_01_China_2022-06-16.jpg', description: 'Hatchback 100% eléctrico con gran autonomía.', origin: 'China', versions: [
    { version: 'Active', price: 16990000, transmission: 'Automática', traction: 'Delantera' },
    { version: 'Premium', price: 19990000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 81, brand: 'BYD', model: 'Atto 3', year: 2025, type: 'suv', fuel: 'electrico', seats: 5, price: 28990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/BYD_Atto_3_01_China_2022-03-15.jpg/800px-BYD_Atto_3_01_China_2022-03-15.jpg', description: 'SUV eléctrico con diseño innovador.', origin: 'China', versions: [
    { version: 'Active', price: 28990000, transmission: 'Automática', traction: 'Delantera' },
    { version: 'Premium', price: 31990000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 82, brand: 'BYD', model: 'Song Plus DM-i', year: 2025, type: 'suv', fuel: 'hibrido_enchufable', seats: 5, price: 36990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/BYD_Song_Plus_%282021%29.jpg/800px-BYD_Song_Plus_%282021%29.jpg', description: 'SUV híbrido enchufable familiar.', origin: 'China', versions: [
    { version: 'GL', price: 36990000, transmission: 'DHT', traction: 'Delantera' },
    { version: 'GX', price: 39990000, transmission: 'DHT', traction: 'Delantera' }
  ]},
  { id: 83, brand: 'BYD', model: 'Seal', year: 2025, type: 'sedan', fuel: 'electrico', seats: 5, price: 50990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/BYD_Seal_01_China_2022-06-09.jpg/800px-BYD_Seal_01_China_2022-06-09.jpg', description: 'Sedán eléctrico deportivo.', origin: 'China', versions: [
    { version: 'GS', price: 50990000, transmission: 'Automática', traction: 'Delantera' }
  ]},
  { id: 84, brand: 'BYD', model: 'Han EV', year: 2025, type: 'sedan', fuel: 'electrico', seats: 5, price: 62990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/BYD_Han_EV_01_China_2020-08-27.jpg/800px-BYD_Han_EV_01_China_2020-08-27.jpg', description: 'Sedán eléctrico premium.', origin: 'China', versions: [
    { version: 'EV', price: 62990000, transmission: 'Automática', traction: 'Delantera' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // SUBARU
  // ═══════════════════════════════════════════════════════════════
  { id: 85, brand: 'Subaru', model: 'Crosstrek', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 25990000, transmission: 'automatica', traction: 'awd', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/2022_Subaru_Crosstrek_%28G6K%29_2.0i_LFV_wagon_5d_01.jpg/800px-2022_Subaru_Crosstrek_%28G6K%29_2.0i_LFV_wagon_5d_01.jpg', description: 'SUV con tracción integral simétrica.', origin: 'Japón', versions: [
    { version: '2.0i CVT', price: 25990000, transmission: 'CVT', traction: 'AWD' },
    { version: '2.0i CVT Dynamic ES', price: 30090000, transmission: 'CVT', traction: 'AWD' }
  ]},
  { id: 86, brand: 'Subaru', model: 'Forester', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 29990000, transmission: 'automatica', traction: 'awd', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/2022_Subaru_Forester_%28SK%29_2.5i_%28facelift%29_2.5_Limited_wagon_5d_01.jpg/800px-2022_Subaru_Forester_%28SK%29_2.5i_%28facelift%29_2.5_Limited_wagon_5d_01.jpg', description: 'SUV familiar con tracción integral permanente.', origin: 'Japón', versions: [
    { version: '2.5i AWD CVT XS', price: 29990000, transmission: 'CVT', traction: 'AWD' },
    { version: '2.5i Dynamic ES AWD CVT', price: 33990000, transmission: 'CVT', traction: 'AWD' }
  ]},
  { id: 87, brand: 'Subaru', model: 'Outback', year: 2025, type: 'wagon', fuel: 'gasolina', seats: 5, price: 31990000, transmission: 'automatica', traction: 'awd', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/2021_Subaru_Outback_%28MY22%29_Touring_X_wagon_5d_01.jpg/800px-2021_Subaru_Outback_%28MY22%29_Touring_X_wagon_5d_01.jpg', description: 'Station wagon versátil con tracción integral.', origin: 'Japón', versions: [
    { version: '2.5i AWD CVT XS', price: 31990000, transmission: 'CVT', traction: 'AWD' },
    { version: '2.4T AWD CVT Field Edition', price: 40990000, transmission: 'CVT', traction: 'AWD' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // RAM
  // ═══════════════════════════════════════════════════════════════
  { id: 88, brand: 'RAM', model: '700', year: 2025, type: 'pickup', fuel: 'gasolina', seats: 2, price: 16053100, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/2022_RAM_700_Storm_Inspiration_1.3%2C_Front_1.23.23.jpg/800px-2022_RAM_700_Storm_Inspiration_1.3%2C_Front_1.23.23.jpg', description: 'Pick-up compacta americana.', origin: 'Estados Unidos', versions: [
    { version: '1.4L SLT', price: 16053100, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.3L Laramie CVT CD', price: 22003100, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 89, brand: 'RAM', model: '1500', year: 2025, type: 'pickup', fuel: 'gasolina', seats: 5, price: 76148100, transmission: 'automatica', traction: '4x4', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/2021_RAM_1500_Rebel_%28DT%29_Laramie_5.7L_4x4_Crew_Cab_pick_up_%282021-03-16%29_01.jpg/800px-2021_RAM_1500_Rebel_%28DT%29_Laramie_5.7L_4x4_Crew_Cab_pick_up_%282021-03-16%29_01.jpg', description: 'Pick-up full-size premium y potente.', origin: 'Estados Unidos', versions: [
    { version: 'Rebel', price: 76148100, transmission: 'Automática 8V', traction: '4x4' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // CHANGAN
  // ═══════════════════════════════════════════════════════════════
  { id: 90, brand: 'Changan', model: 'Alsvin', year: 2025, type: 'sedan', fuel: 'gasolina', seats: 5, price: 10490000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/2021_Changen_Alsvin_1.5L_DCT_Comfort_in_Red%2C_Front_9.27.21.jpg/800px-2021_Changen_Alsvin_1.5L_DCT_Comfort_in_Red%2C_Front_9.27.21.jpg', description: 'Sedán económico chino.', origin: 'China', versions: [
    { version: 'Comfort', price: 10490000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: 'Elite Aut', price: 12690000, transmission: 'Automática 5V', traction: 'Delantera' }
  ]},
  { id: 91, brand: 'Changan', model: 'CS35 Plus', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 16890000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Changan_CS35_Plus_%28front%29.jpg/800px-Changan_CS35_Plus_%28front%29.jpg', description: 'SUV compacto con equipamiento completo.', origin: 'China', versions: [
    { version: '1.6L Comfort', price: 16890000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.4L Elite Aut', price: 18890000, transmission: 'DCT 7V', traction: 'Delantera' }
  ]},
  { id: 92, brand: 'Changan', model: 'CS55 Plus', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 18590000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Changan_CS55_Plus_%28front%29.jpg/800px-Changan_CS55_Plus_%28front%29.jpg', description: 'SUV familiar con motor turbo.', origin: 'China', versions: [
    { version: '1.5T COMFORT AT', price: 18590000, transmission: 'Automática 7V', traction: 'Delantera' },
    { version: '1.5T ELITE AT', price: 21590000, transmission: 'Automática 7V', traction: 'Delantera' }
  ]},
  { id: 93, brand: 'Changan', model: 'Hunter', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 20890000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Changan_Hunter_Pickup.jpg/800px-Changan_Hunter_Pickup.jpg', description: 'Pick-up china con gran equipamiento.', origin: 'China', versions: [
    { version: 'Comfort', price: 20890000, transmission: 'Manual 6V', traction: '4x2' },
    { version: 'Comfort 4x4', price: 23990000, transmission: 'Manual 6V', traction: '4x4' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // GEELY
  // ═══════════════════════════════════════════════════════════════
  { id: 94, brand: 'Geely', model: 'Coolray', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 16990000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2021_Geely_Coolray_Premium_1.5T_DCT%2C_Front_9.8.21.jpg/800px-2021_Geely_Coolray_Premium_1.5T_DCT%2C_Front_9.8.21.jpg', description: 'SUV con tecnología y diseño competitivo.', origin: 'China', versions: [
    { version: 'GL Comfort', price: 16990000, transmission: 'DCT 7V', traction: 'Delantera' },
    { version: 'GK Exclusive', price: 18490000, transmission: 'DCT 7V', traction: 'Delantera' }
  ]},
  { id: 95, brand: 'Geely', model: 'Okavango', year: 2025, type: 'suv', fuel: 'gasolina', seats: 7, price: 24690000, transmission: 'automatica', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Geely_Okavango_01_China_2022-06-16.jpg/800px-Geely_Okavango_01_China_2022-06-16.jpg', description: 'SUV familiar grande con 7 plazas.', origin: 'China', versions: [
    { version: 'Exclusive', price: 24690000, transmission: 'DCT 7V', traction: 'Delantera' },
    { version: 'Signature', price: 26690000, transmission: 'DCT 7V', traction: 'Delantera' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // DFSK
  // ═══════════════════════════════════════════════════════════════
  { id: 96, brand: 'DFSK', model: 'Glory 500', year: 2025, type: 'suv', fuel: 'gasolina', seats: 5, price: 13590000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/DFSK_Glory_500.jpg/800px-DFSK_Glory_500.jpg', description: 'SUV económico y espacioso.', origin: 'China', versions: [
    { version: '1.5L Comfort', price: 13590000, transmission: 'Manual 5V', traction: 'Delantera' },
    { version: '1.5L Luxury CVT SK', price: 14690000, transmission: 'CVT', traction: 'Delantera' }
  ]},
  { id: 97, brand: 'DFSK', model: 'Glory 580', year: 2025, type: 'suv', fuel: 'gasolina', seats: 7, price: 16890000, transmission: 'manual', traction: '4x2', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/DFSK_Glory_580_%28front%29.jpg/800px-DFSK_Glory_580_%28front%29.jpg', description: 'SUV familiar con 7 plazas económico.', origin: 'China', versions: [
    { version: '1.8L Comfort', price: 16890000, transmission: 'Manual 5V', traction: 'Delantera' }
  ]},

  // ═══════════════════════════════════════════════════════════════
  // KGM (antes SsangYong)
  // ═══════════════════════════════════════════════════════════════
  { id: 98, brand: 'KGM', model: 'Grand Musso', year: 2025, type: 'pickup', fuel: 'diesel', seats: 5, price: 29740000, transmission: 'automatica', traction: '4x4', image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/2022_SsangYong_Korando_Premium_1.5_T-GDi_4WD_5-door_SUV_in_%27Creamy_White%27%2C_Front_9.27.22.jpg/800px-2022_SsangYong_Korando_Premium_1.5_T-GDi_4WD_5-door_SUV_in_%27Creamy_White%27%2C_Front_9.27.22.jpg', description: 'Pick-up coreana con acabados premium.', origin: 'Corea del Sur', versions: [
    { version: '2.2 4x2 Aut', price: 29740000, transmission: 'Automática', traction: '4x2' }
  ]},
];

export const brands = [...new Set(carsData.map(c => c.brand))].sort();
export const carTypes = ['sedan', 'suv', 'pickup', 'hatchback', 'minivan', 'wagon'];
export const fuelTypes = ['gasolina', 'diesel', 'electrico', 'hibrido', 'hibrido_enchufable'];
export const transmissions = ['manual', 'automatica'];
export const tractions = ['4x2', '4x4', 'awd'];

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
    pickup: 'Pick Up',
    hatchback: 'Hatchback',
    minivan: 'Minivan',
    wagon: 'Station Wagon',
  };
  return labels[type] || type;
};

export const getFuelLabel = (fuel: string): string => {
  const labels: Record<string, string> = {
    gasolina: 'Bencina',
    diesel: 'Diésel',
    electrico: 'Eléctrico',
    hibrido: 'Híbrido',
    hibrido_enchufable: 'Híbrido Enchufable',
  };
  return labels[fuel] || fuel;
};
