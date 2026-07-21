import { useState } from 'react';

interface GuideSection {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}

const guides: GuideSection[] = [
  {
    id: 'tipos',
    title: '¿Qué tipo de auto necesito?',
    icon: '🚗',
    content: (
      <div className="space-y-3 text-sm text-gray-700">
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="font-semibold text-blue-800">Sedán</p>
          <p className="text-xs text-blue-600">Ideal para: ciudad, familia pequeña, eficiencia de combustible.</p>
          <p className="text-xs text-gray-500 mt-1">Ej: Toyota Corolla, Hyundai Elantra, Kia Cerato</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="font-semibold text-green-800">SUV</p>
          <p className="text-xs text-green-600">Ideal para: familias, terreno mixto, mayor visibilidad.</p>
          <p className="text-xs text-gray-500 mt-1">Ej: Hyundai Tucson, Kia Sportage, MG ZS</p>
        </div>
        <div className="p-3 bg-amber-50 rounded-lg">
          <p className="font-semibold text-amber-800">Pick-up</p>
          <p className="text-xs text-amber-600">Ideal para: trabajo, carga, terreno off-road.</p>
          <p className="text-xs text-gray-500 mt-1">Ej: Toyota Hilux, Mitsubishi L200, Great Wall Poer</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="font-semibold text-purple-800">Hatchback</p>
          <p className="text-xs text-purple-600">Ideal para: ciudad, presupuesto, estacionamiento fácil.</p>
          <p className="text-xs text-gray-500 mt-1">Ej: Suzuki Swift, Hyundai i10, Kia Picanto</p>
        </div>
      </div>
    ),
  },
  {
    id: 'combustible',
    title: 'Combustible: ¿Cuál me conviene?',
    icon: '⛽',
    content: (
      <div className="space-y-3 text-sm text-gray-700">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="font-semibold">Bencina</p>
          <p className="text-xs text-gray-600">Más estaciones, más modelos disponibles. Ideal para uso urbano normal.</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="font-semibold">Diésel</p>
          <p className="text-xs text-gray-600">Mejor rendimiento en carretera. Ideal para pick-ups y SUV grandes.</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="font-semibold text-green-800">Eléctrico (EV)</p>
          <p className="text-xs text-green-600">0 emisiones, menor costo de carga. Requiere carga en casa o pública.</p>
          <p className="text-xs text-amber-600 mt-1">⚠️ Verifique cobertura de electrolineras en su zona</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="font-semibold text-blue-800">Híbrido</p>
          <p className="text-xs text-blue-600">Combina motor eléctrico y bencina. Ahorro sin depender de carga.</p>
        </div>
        <div className="p-3 bg-indigo-50 rounded-lg">
          <p className="font-semibold text-indigo-800">Híbrido enchufable (PHEV)</p>
          <p className="text-xs text-indigo-600">Autonomía eléctrica limitada (40-100 km). Puede cargar en casa.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'credito',
    title: 'Financiamiento: ¿Cómo funciona el crédito?',
    icon: '🏦',
    content: (
      <div className="space-y-3 text-sm text-gray-700">
        <div className="p-3 bg-indigo-50 rounded-lg">
          <p className="font-semibold text-indigo-800">Tasa promedio Chile 2026: ~6.5% anual</p>
          <p className="text-xs text-indigo-600">Varía según banco, perfil crediticio y plazo.</p>
        </div>
        <ul className="space-y-2 text-xs text-gray-600">
          <li>• <strong>Plazo típico:</strong> 36-60 meses</li>
          <li>• <strong>Pie mínimo:</strong> 10-20% del valor del auto</li>
          <li>• <strong>Cuota fija:</strong> Sistema francés (cuota igual durante todo el crédito)</li>
          <li>• <strong>Tip:</strong> A mayor plazo, menor cuota pero más interés total</li>
        </ul>
        <p className="text-xs text-gray-500 italic">
          Use nuestra calculadora TCO para ver el costo real mensual de su auto.
        </p>
      </div>
    ),
  },
  {
    id: 'seguros',
    title: 'Seguros y trámites obligatorios',
    icon: '🛡️',
    content: (
      <div className="space-y-3 text-sm text-gray-700">
        <div className="p-3 bg-red-50 rounded-lg">
          <p className="font-semibold text-red-800">SOAP (obligatorio)</p>
          <p className="text-xs text-red-600">Seguro de Accidentes Personales. Se renueva cada marzo. Costo: $32.000-$85.000/año según valor del auto.</p>
        </div>
        <div className="p-3 bg-amber-50 rounded-lg">
          <p className="font-semibold text-amber-800">Permiso de Circulación</p>
          <p className="text-xs text-amber-600">Impuesto anual. Varía por edad del auto, peso y cilindrada.</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="font-semibold text-blue-800">Seguro completo (opcional)</p>
          <p className="text-xs text-blue-600">Cubre robo, daño propio, responsabilidad civil. ~1.5% del valor del auto al año.</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="font-semibold text-green-800">Revisión técnica</p>
          <p className="text-xs text-green-600">Obligatoria cada 2 años (autos nuevos) o anual (autos antiguos).</p>
        </div>
      </div>
    ),
  },
  {
    id: 'seguridad',
    title: 'Seguridad: ¿Qué es NCAP?',
    icon: '⭐',
    content: (
      <div className="space-y-3 text-sm text-gray-700">
        <p className="text-xs text-gray-600">
          NCAP evalúa la seguridad de los autos en pruebas de choque. En Chile se usa principalmente <strong>Latin NCAP</strong>.
        </p>
        <ul className="space-y-2 text-xs text-gray-600">
          <li>• <strong>5 estrellas:</strong> Máxima protección</li>
          <li>• <strong>4 estrellas:</strong> Buena protección</li>
          <li>• <strong>3 estrellas:</strong> Protección aceptable</li>
          <li>• <strong>Menos de 3:</strong> Protección limitada</li>
        </ul>
        <div className="p-3 bg-yellow-50 rounded-lg">
          <p className="font-semibold text-yellow-800">¿Qué mirar?</p>
          <p className="text-xs text-yellow-600">
            ADAS (frenado autónomo, control de crucero adaptativo), airbags múltiples, structure del habitáculo.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'marcas',
    title: 'Marcas chinas: ¿Son confiables?',
    icon: '🇨🇳',
    content: (
      <div className="space-y-3 text-sm text-gray-700">
        <p className="text-xs text-gray-600">
          Las marcas chinas (GWM, Changan, MG, BYD, Chery) han crecido fuertemente en Chile. Ocupan 4 de los 10 primeros lugares en ventas 2026.
        </p>
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="font-semibold text-green-800">Ventajas</p>
          <ul className="text-xs text-green-600 mt-1 space-y-1">
            <li>• Precio competitivo</li>
            <li>• Mejor equipamiento de serie</li>
            <li>• Garantías extendidas (5-7 años)</li>
          </ul>
        </div>
        <div className="p-3 bg-amber-50 rounded-lg">
          <p className="font-semibold text-amber-800">A considerar</p>
          <ul className="text-xs text-amber-600 mt-1 space-y-1">
            <li>• Resale value puede ser menor</li>
            <li>• Red de concesionarios en crecimiento</li>
            <li>• Disponibilidad de repuestos variable</li>
          </ul>
        </div>
      </div>
    ),
  },
];

export function BuyingGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="mb-6 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📖</span>
        <h3 className="text-base font-bold text-gray-900">Guía para Compradores</h3>
      </div>

      <div className="space-y-2">
        {guides.map((guide) => (
          <div key={guide.id}>
            <button
              onClick={() => setExpanded(expanded === guide.id ? null : guide.id)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>{guide.icon}</span>
                <span className="text-sm font-medium text-gray-800">{guide.title}</span>
              </div>
              <span className="text-gray-400 text-lg">
                {expanded === guide.id ? '−' : '+'}
              </span>
            </button>
            {expanded === guide.id && (
              <div className="mt-2 p-3 bg-white rounded-lg border border-gray-100">
                {guide.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
