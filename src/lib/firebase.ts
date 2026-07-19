import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
const googleProvider = new GoogleAuthProvider();

try {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'demo-api-key') {
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
  }
} catch {
  console.warn('Firebase no configurado. Modo demo activo.');
}

export const isFirebaseConfigured = !!authInstance;
export const auth = authInstance;
export { googleProvider };
