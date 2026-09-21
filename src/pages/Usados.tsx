import { useState, useEffect, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { formatPrice } from '../data/brands';

export interface UsedCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  price: number;
  fuel: string;
  transmission: string;
  color: string;
  region: string;
  description: string;
  phone: string;
  photos: string[];
  createdAt: string;
}

const STORAGE_KEY = 'autolupa_usados';
const REGIONS = [
  'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
  'Valparaíso', 'Metropolitana', 'O\'Higgins', 'Maule', 'Ñuble',
  'Biobío', 'Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes',
];

const FUEL_OPTIONS = ['Gasolina', 'Diésel', 'Eléctrico', 'Híbrido', 'Híbrido enchufable'];
const TRANS_OPTIONS = ['Automática', 'Manual'];

function loadUsados(): UsedCar[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

function saveUsados(usados: UsedCar[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usados));
}

function PublishForm({ onPublished }: { onPublished: () => void }) {
  const [form, setForm] = useState({
    brand: '', model: '', year: new Date().getFullYear(), km: 0,
    price: 0, fuel: 'Gasolina', transmission: 'Automática',
    color: '', region: 'Metropolitana', description: '', phone: '',
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).slice(0, 5).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotos(prev => [...prev, ev.target?.result as string].slice(0, 5));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.brand || !form.model || !form.phone) return;
    const used: UsedCar = {
      ...form,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      photos,
      createdAt: new Date().toISOString(),
    };
    const existing = loadUsados();
    saveUsados([used, ...existing]);
    setSuccess(true);
    onPublished();
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <p className="text-6xl mb-4">✅</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">¡Publicación creada!</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Tu auto ya está visible en el mercado de usados.</p>
        <button onClick={() => { setSuccess(false); setForm({ ...form, brand: '', model: '', km: 0, price: 0, description: '', phone: '' }); setPhotos([]); }} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
          Publicar otro auto
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marca *</label>
          <input required value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} placeholder="Ej: Toyota" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Modelo *</label>
          <input required value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} placeholder="Ej: Corolla" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Año</label>
          <input type="number" value={form.year} onChange={e => setForm({ ...form, year: +e.target.value })} min={1990} max={new Date().getFullYear() + 1} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kilometraje</label>
          <input type="number" value={form.km} onChange={e => setForm({ ...form, km: +e.target.value })} min={0} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio (CLP) *</label>
          <input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} min={0} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
          <input value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} placeholder="Ej: Blanco" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Combustible</label>
          <select value={form.fuel} onChange={e => setForm({ ...form, fuel: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
            {FUEL_OPTIONS.map(f => <option key={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transmisión</label>
          <select value={form.transmission} onChange={e => setForm({ ...form, transmission: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
            {TRANS_OPTIONS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Región</label>
          <select value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
            {REGIONS.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WhatsApp *</label>
          <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+56 9 1234 5678" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Estado del auto, accesorios, mantenciones al día..." className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fotos (máx. 5)</label>
        <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="w-full text-sm text-gray-500 dark:text-gray-400" />
        {photos.length > 0 && (
          <div className="flex gap-2 mt-2">
            {photos.map((p, i) => (
              <img key={i} src={p} alt="" className="w-16 h-16 object-cover rounded-lg" />
            ))}
          </div>
        )}
      </div>
      <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-colors">
        📢 Publicar mi auto gratis
      </button>
      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">Publicación gratuita. Sin comisiones. Los compradores te contactan directo por WhatsApp.</p>
    </form>
  );
}

function UsedCarCard({ car }: { car: UsedCar }) {
  const waText = encodeURIComponent(`Hola, vi tu ${car.brand} ${car.model} ${car.year} en AutoLupa. ¿Sigue disponible?`);
  const waUrl = `https://wa.me/${car.phone.replace(/[^0-9]/g, '')}?text=${waText}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden card-shadow hover:shadow-xl transition-all">
      {car.photos.length > 0 ? (
        <div className="h-48 overflow-hidden">
          <img src={car.photos[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
          <span className="text-4xl">🚗</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{car.brand}</p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{car.model}</h3>
          </div>
          <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{car.year}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{car.fuel}</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{car.transmission}</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{car.km.toLocaleString('es-CL')} km</span>
          {car.color && <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">{car.color}</span>}
        </div>
        {car.description && <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{car.description}</p>}
        <div className="flex items-end justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Precio</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(car.price)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">📍 {car.region}</p>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors">
              💬 Contactar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Usados() {
  const [usados, setUsados] = useState<UsedCar[]>([]);
  const [showPublish, setShowPublish] = useState(false);
  const [filterRegion, setFilterRegion] = useState('');
  const [filterBrand, setFilterBrand] = useState('');

  useEffect(() => { setUsados(loadUsados()); }, []);

  const filtered = useMemo(() => {
    return usados.filter(u => {
      if (filterRegion && u.region !== filterRegion) return false;
      if (filterBrand && !u.brand.toLowerCase().includes(filterBrand.toLowerCase())) return false;
      return true;
    });
  }, [usados, filterRegion, filterBrand]);

  const uniqueBrands = [...new Set(usados.map(u => u.brand))].sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO title="Autos Usados" description="Compra y vende autos usados gratis en Chile. Publica tu auto sin comisiones y contacta directo por WhatsApp." />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">🚗 Autos Usados</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-6">
          Marketplace gratuito: publica tu auto o contacta al vendedor directo por WhatsApp. Sin comisiones, sin intermediarios.
        </p>
        <button
          onClick={() => setShowPublish(!showPublish)}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
        >
          {showPublish ? '← Volver a listado' : '📢 Publicar mi auto gratis'}
        </button>
      </div>

      {showPublish ? (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Publicar vehículo</h2>
          <PublishForm onPublished={() => setUsados(loadUsados())} />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-3 mb-6">
            <select value={filterRegion} onChange={e => setFilterRegion(e.target.value)} className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
              <option value="">Todas las regiones</option>
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </select>
            {uniqueBrands.length > 0 && (
              <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)} className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                <option value="">Todas las marcas</option>
                {uniqueBrands.map(b => <option key={b}>{b}</option>)}
              </select>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 self-center">{filtered.length} publicacion{filtered.length !== 1 ? 'es' : ''}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No hay publicaciones aún</h3>
              <p className="text-gray-500 dark:text-gray-400">Sé el primero en publicar tu auto</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(car => <UsedCarCard key={car.id} car={car} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
