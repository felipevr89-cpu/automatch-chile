import { useState, useEffect } from 'react';
import { isFirebaseConfigured } from '../lib/firebase';
import { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | null = null;
    let cancelled = false;

    import('firebase/auth').then((mod) => {
      if (cancelled) return;
      const { getAuth, onAuthStateChanged } = mod;
      const authInstance = getAuth();

      unsubscribe = onAuthStateChanged(authInstance, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      // Demo mode: create fake user
      setUser({
        uid: 'demo-user-001',
        displayName: 'Usuario Demo',
        email: 'demo@autolupa.cl',
        photoURL: null,
      });
      return;
    }
    try {
      const { getAuth, signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
      await signInWithPopup(getAuth(), new GoogleAuthProvider());
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    if (!isFirebaseConfigured) {
      setUser(null);
      return;
    }
    try {
      const { getAuth, signOut: signOutFirebase } = await import('firebase/auth');
      await signOutFirebase(getAuth());
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return { user, loading, signInWithGoogle, signOut };
}