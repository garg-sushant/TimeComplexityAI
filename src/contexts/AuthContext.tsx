import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({ user: null, loading: false });

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
        const [{ onAuthStateChanged }, { auth, db }, firestore] = await Promise.all([
          import('firebase/auth'),
          import('../lib/firebase'),
          import('firebase/firestore'),
        ]);

        unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);

          if (currentUser) {
            const userRef = firestore.doc(db, 'users', currentUser.uid);
            const userSnap = await firestore.getDoc(userRef);

            if (!userSnap.exists()) {
              try {
                await firestore.setDoc(userRef, {
                  displayName: currentUser.displayName,
                  email: currentUser.email,
                  photoURL: currentUser.photoURL,
                  createdAt: firestore.serverTimestamp(),
                });
              } catch (error) {
                console.error('Error creating user document', error);
              }
            }
          }

          setLoading(false);
        });
      } catch (error) {
        console.error('Failed to initialize auth context', error);
        setLoading(false);
      }
    };

    setupAuth();

    return () => unsubscribe();
  }, [isBrowser]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
