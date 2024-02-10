'use client';
import { createContext, useContext, ReactNode, useState, useEffect, FunctionComponent } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
  isVendor: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook for components that will update auth (like login component)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Updates state and local storage (allows you to switch between logged in and logged out states)
export const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [isVendor, setIsVendor] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const storedState = localStorage.getItem('isVendor');
    if (storedState !== null) {
      setIsVendor(JSON.parse(storedState));
    }
    setIsLoading(false);
  }, []);

  const login = () => {
    setIsVendor(true);
    localStorage.setItem('isVendor', 'true');
    router.push('/vendor');
  };

  const logout = () => {
    setIsVendor(false);
    localStorage.removeItem('isVendor');
    router.push('/');
  };

  // Provide the state and updater functions to the rest of app
  return (
    <AuthContext.Provider value={{ isVendor, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};