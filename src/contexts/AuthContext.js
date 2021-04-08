import React, { useContext } from 'react';
import { auth } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, loading] = useAuthState(auth);

  return (
    <AuthContext.Provider value={user}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
