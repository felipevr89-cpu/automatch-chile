import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useCars } from './hooks/useCars';
import { useDocuments } from './hooks/useDocuments';
import { Navbar } from './components/Layout/Navbar';
import { SignatureModal } from './components/Documents/SignatureModal';
import { Home } from './pages/Home';
import { Compare } from './pages/Compare';
import { Favorites } from './pages/Favorites';

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const {
    cars,
    allCars,
    filters,
    updateFilter,
    resetFilters,
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
            <Compare
              compareList={compareList}
              onRemoveFromCompare={removeFromCompare}
              onClearCompare={clearCompare}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              allCars={allCars}
              favorites={favorites}
              compareList={compareList}
              onToggleFavorite={toggleFavorite}
              onAddToCompare={addToCompare}
              onRemoveFromCompare={removeFromCompare}
            />
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
