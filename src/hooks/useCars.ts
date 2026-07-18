import { useState, useMemo } from 'react';
import { carsData } from '../data/cars-chile';
import { Car, Filters } from '../types';

const defaultFilters: Filters = {
  brand: [],
  type: [],
  fuel: [],
  seats: [],
  priceRange: [0, 50000000],
  yearRange: [2020, 2026],
  transmission: [],
  traction: [],
};

export function useCars() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [compareList, setCompareList] = useState<Car[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredCars = useMemo(() => {
    return carsData.filter((car) => {
      if (filters.brand.length > 0 && !filters.brand.includes(car.brand)) return false;
      if (filters.type.length > 0 && !filters.type.includes(car.type)) return false;
      if (filters.fuel.length > 0 && !filters.fuel.includes(car.fuel)) return false;
      if (filters.seats.length > 0 && !filters.seats.includes(car.seats)) return false;
      if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) return false;
      if (car.year < filters.yearRange[0] || car.year > filters.yearRange[1]) return false;
      if (filters.transmission.length > 0 && !filters.transmission.includes(car.transmission)) return false;
      if (filters.traction.length > 0 && !filters.traction.includes(car.traction)) return false;
      return true;
    });
  }, [filters]);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const addToCompare = (car: Car) => {
    if (compareList.length < 3 && !compareList.find((c) => c.id === car.id)) {
      setCompareList((prev) => [...prev, car]);
    }
  };

  const removeFromCompare = (carId: number) => {
    setCompareList((prev) => prev.filter((c) => c.id !== carId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const toggleFavorite = (carId: number) => {
    setFavorites((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const isFavorite = (carId: number) => favorites.includes(carId);

  return {
    cars: filteredCars,
    allCars: carsData,
    filters,
    updateFilter,
    resetFilters,
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
