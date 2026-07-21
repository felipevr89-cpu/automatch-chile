import { useState, useMemo, useCallback } from 'react';
import { carsData } from '../data/brands';
import { Car, Filters } from '../types';

const defaultFilters: Filters = {
  brand: [],
  type: [],
  fuel: [],
  seats: [],
  priceRange: [0, 80000000],
  transmission: [],
  traction: [],
  minAirbags: 0,
  origin_country: [],
  model: [],
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function useCars() {
  const [filters, setFilters] = useState<Filters>(() => loadFromStorage('automatch_filters', defaultFilters));
  const [compareList, setCompareList] = useState<Car[]>(() => loadFromStorage('automatch_compare', []));
  const [favorites, setFavorites] = useState<number[]>(() => loadFromStorage('automatch_favorites', []));
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;

  const filteredCars = useMemo(() => {
    let result = carsData.filter((car) => {
      if (filters.brand.length > 0 && !filters.brand.includes(car.brand)) return false;
      if (filters.model.length > 0 && !filters.model.includes(car.model)) return false;
      if (filters.type.length > 0 && !filters.type.includes(car.type)) return false;
      if (filters.fuel.length > 0 && !filters.fuel.includes(car.fuel)) return false;
      if (filters.seats.length > 0 && !filters.seats.includes(car.seats)) return false;
      if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) return false;
      if (filters.transmission.length > 0 && !filters.transmission.includes(car.transmission)) return false;
      if (filters.traction.length > 0 && !filters.traction.includes(car.traction)) return false;
      if (filters.minAirbags > 0 && (car.airbags ?? 0) < filters.minAirbags) return false;
      if (filters.origin_country.length > 0 && !filters.origin_country.includes(car.origin_country || '')) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match = car.brand.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q) ||
          car.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'brand':
        result.sort((a, b) => a.brand.localeCompare(b.brand) || a.model.localeCompare(b.model));
        break;
    }

    return result;
  }, [filters, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredCars.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedCars = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return filteredCars.slice(start, start + perPage);
  }, [filteredCars, safePage, perPage]);

  const updateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem('automatch_filters', JSON.stringify(next));
      return next;
    });
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setSearchQuery('');
    setCurrentPage(1);
    localStorage.removeItem('automatch_filters');
  }, []);

  const addToCompare = useCallback((car: Car) => {
    setCompareList((prev) => {
      if (prev.length >= 3) return prev;
      if (prev.find((c) => c.id === car.id)) return prev;
      const next = [...prev, car];
      localStorage.setItem('automatch_compare', JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromCompare = useCallback((carId: number) => {
    setCompareList((prev) => {
      const next = prev.filter((c) => c.id !== carId);
      localStorage.setItem('automatch_compare', JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    localStorage.removeItem('automatch_compare');
  }, []);

  const toggleFavorite = useCallback((carId: number) => {
    setFavorites((prev) => {
      const next = prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId];
      localStorage.setItem('automatch_favorites', JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((carId: number) => favorites.includes(carId), [favorites]);

  return {
    cars: paginatedCars,
    allCarsCount: filteredCars.length,
    totalPages,
    currentPage: safePage,
    setCurrentPage,
    allCars: carsData,
    filters,
    updateFilter,
    resetFilters,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    favorites,
    toggleFavorite,
    isFavorite,
  };
}