import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { auth, db, signInWithGoogle, logOut } from '../lib/firebase';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<any>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signInWithGoogle: async () => {},
  logOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isBrowser = typeof window !== 'undefined';
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isBrowser);

  useEffect(() => {
    if (!isBrowser) {
      return undefined;
    }

    let unsubscribe = () => {};

    const setupAuth = async () => {
      try {
        const [{ onAuthStateChanged, getRedirectResult }, firestore] = await Promise.all([
          import('firebase/auth'),
          import('firebase/firestore'),
        ]);

        if (auth) {
          getRedirectResult(auth)
            .then((credential) => {
              if (credential?.user) {
                setUser(credential.user);
              }
            })
            .catch((err) => {
              console.warn('Redirect auth result notice:', err);
            });

          unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser && db) {
              try {
                const userRef = firestore.doc(db, 'users', currentUser.uid);
                const userSnap = await firestore.getDoc(userRef);

                if (!userSnap.exists()) {
                  await firestore.setDoc(userRef, {
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    createdAt: firestore.serverTimestamp(),
                  });
                }
              } catch (error) {
                console.warn('Firestore user profile sync notice:', error);
              }
            }
          });
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to initialize auth context', error);
        setLoading(false);
      }
    };

    setupAuth();

    return () => unsubscribe();
  }, [isBrowser]);

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
