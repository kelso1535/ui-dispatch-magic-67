
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/hooks/useDispatchRecords';

interface UserContextType {
  currentUser: User | null;
  handleUserLogin: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleUserLogin = (user: User) => {
    setCurrentUser(user);
    toast({
      title: "Logged In",
      description: `Welcome ${user.name} (${user.callsign})`,
      variant: "default",
    });
  };

  return (
    <UserContext.Provider value={{ currentUser, handleUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
