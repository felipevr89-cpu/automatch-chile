import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useCars } from './hooks/useCars';
import { useDocuments } from './hooks/useDocuments';
import { Navbar } from './components/Layout/Navbar';
import { SignatureModal } from './components/Documents/SignatureModal';
import { Home } from './pages/Home';

const Compare = lazy(() => import('./pages/Compare').then(m => ({ default: m.Compare })));
const Favorites = lazy(() => import('./pages/Favorites').then(m => ({ default: m.Favorites })));

function LoadingSpinner() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const {
    cars,
    allCars,
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
  } = useCars();

  const {
    showModal,
    sign,
    decline,
    privacyContent,
    responsibilityContent,
    status,
    loading: docsLoading,
  } = useDocuments(user?.uid || null);

  if (authLoading || docsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {showModal && (
        <SignatureModal
          type={showModal}
          version={showModal === 'privacy' ? status?.privacyPolicy.version || '1.0' : status?.responsibility.version || '1.0'}
          content={showModal === 'privacy' ? privacyContent : responsibilityContent}
          onSign={sign}
          onDecline={decline}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              cars={cars}
              filters={filters}
              updateFilter={updateFilter}
              resetFilters={resetFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              favorites={favorites}
              compareList={compareList}
              onToggleFavorite={toggleFavorite}
              onAddToCompare={addToCompare}
              onRemoveFromCompare={removeFromCompare}
            />
          }
        />
        <Route
          path="/compare"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Compare
                compareList={compareList}
                onRemoveFromCompare={removeFromCompare}
                onClearCompare={clearCompare}
              />
            </Suspense>
          }
        />
        <Route
          path="/favorites"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Favorites
                allCars={allCars}
                favorites={favorites}
                compareList={compareList}
                onToggleFavorite={toggleFavorite}
                onAddToCompare={addToCompare}
                onRemoveFromCompare={removeFromCompare}
              />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
