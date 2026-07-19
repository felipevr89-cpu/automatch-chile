import { useState, useEffect } from 'react';
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase';
import { User } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let onAuthStateChanged: ((...args: any[]) => any) | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let signInWithPopup: ((...args: any[]) => any) | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let signOutFirebase: ((...args: any[]) => any) | null = null;

if (isFirebaseConfigured && auth) {
  import('firebase/auth').then((mod) => {
    onAuthStateChanged = mod.onAuthStateChanged;
    signInWithPopup = mod.signInWithPopup;
    signOutFirebase = mod.signOut;
  });
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth || !onAuthStateChanged) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: { uid: string; displayName: string | null; email: string | null; photoURL: string | null }) => {
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

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !signInWithPopup) {
      // Demo mode: create fake user
      setUser({
        uid: 'demo-user-001',
        displayName: 'Usuario Demo',
        email: 'demo@automatch.cl',
        photoURL: null,
      });
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    if (!isFirebaseConfigured || !auth || !signOutFirebase) {
      setUser(null);
      return;
    }
    try {
      await signOutFirebase(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return { user, loading, signInWithGoogle, signOut };
}
