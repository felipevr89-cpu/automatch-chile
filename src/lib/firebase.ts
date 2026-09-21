// Configuración de Firebase. No se importa firebase aquí para no inflar el
// bundle inicial: los módulos de firebase se cargan dinámicamente cuando hay
// credenciales configuradas (ver hooks/useAuth.ts y hooks/useCars.ts).
function getFirebaseConfig() {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  return config.apiKey && config.apiKey !== 'demo-api-key' ? config : null;
}

export const firebaseConfig = getFirebaseConfig();
export const isFirebaseConfigured = !!firebaseConfig;