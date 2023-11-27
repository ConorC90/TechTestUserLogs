import React, { createContext, useContext, ReactNode } from 'react';

interface ModalContextProps {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  location: string | null;
  setLocation: (location: string) => void;
  customerIndex: number | null;
  setCustomerindex: (location: number) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModalContext = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
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
    <ModalContext.Provider
      value={{ modalIsOpen, openModal, closeModal, location, setLocation, customerIndex, setCustomerindex }}
    >
      {children}
    </ModalContext.Provider>
  );
};
