import { useRef } from 'react';
import { getBrandLogo } from '../../lib/images';

interface Props {
  brands: string[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
}

export function BrandScroll({ brands, selectedBrands, onToggleBrand }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={scrollLeft}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {brands.map((brand) => {
            const isSelected = selectedBrands.includes(brand);
            const logo = getBrandLogo(brand);
            
            return (
              <button
                key={brand}
                onClick={() => onToggleBrand(brand)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl transition-all min-w-[90px] ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden ${
                  isSelected ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {logo ? (
                    <img
                      src={logo}
                      alt={brand}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-600'}">${brand.charAt(0)}</span>`;
                        }
                      }}
                    />
                  ) : (
                    <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                      {brand.charAt(0)}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-medium text-center leading-tight ${
                  isSelected ? 'text-white' : 'text-gray-700'
                }`}>
                  {brand}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={scrollRight}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {selectedBrands.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-gray-500">Filtrado:</span>
          <div className="flex flex-wrap gap-2">
            {selectedBrands.map((brand) => (
              <span
                key={brand}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {brand}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBrand(brand);
                  }}
                  className="ml-1 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
