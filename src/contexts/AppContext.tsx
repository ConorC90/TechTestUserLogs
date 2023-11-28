import React, { createContext, useContext, ReactNode } from 'react';

interface AppContextProps {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  location: string | null;
  setLocation: (location: string) => void;
  customerIndex: number | null;
  setCustomerindex: (location: number) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [location, setLocation] = React.useState<string | null>(null);
  const [customerIndex, setCustomerindex] = React.useState<number | null>(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setLocation(null);
    setCustomerindex(null);
  };

  return (
    <AppContext.Provider
      value={{ modalIsOpen, openModal, closeModal, location, setLocation, customerIndex, setCustomerindex }}
    >
      {children}
    </AppContext.Provider>
  );
};
