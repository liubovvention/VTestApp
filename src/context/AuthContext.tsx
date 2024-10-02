import React, {createContext, useContext, useState, ReactNode} from 'react';
import {useAppSelector} from 'hooks/useStore';
import {selectisLoggedIn, selectUser} from 'store/slices/auth/authSlice';
import { IUser } from 'store/slices/auth/types';

interface AuthContextType {
  initialAuth: boolean;
  setInitialAuth: (auth: boolean) => void;
  user: IUser | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const isStoredLoggedIn = useAppSelector(selectisLoggedIn);
  const user = useAppSelector(selectUser);
  const [initialAuth, setInitialAuth] = useState<boolean>(isStoredLoggedIn);

  return (
    <AuthContext.Provider value={{initialAuth, setInitialAuth, user}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
