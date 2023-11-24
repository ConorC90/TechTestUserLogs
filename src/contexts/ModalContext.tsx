import React, { createContext, useContext, ReactNode } from 'react';

interface ModalContextProps {
  modalIsOpen: boolean;
  openModal: (location: string) => void;
  closeModal: () => void;
  location: string | null;
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

  const openModal = (location: string) => {
    setModalIsOpen(true);
    setLocation(location);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setLocation(null);
  };

  return (
    <ModalContext.Provider value={{ modalIsOpen, openModal, closeModal, location }}>{children}</ModalContext.Provider>
  );
};
