
import React, { createContext, useContext, useState, ReactNode } from "react";
import TripsBreakdownModal from "../components/ui/modals/TripsBreakdownModal";

interface TripsModalContextType {
  openTripsModal: () => void;
  closeTripsModal: () => void;
}

const TripsModalContext = createContext<TripsModalContextType>({
  openTripsModal: () => {},
  closeTripsModal: () => {},
});

export const TripsModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openTripsModal = () => setIsOpen(true);
  const closeTripsModal = () => setIsOpen(false);

  return (
    <TripsModalContext.Provider value={{ openTripsModal, closeTripsModal }}>
      {children}
      {isOpen && <TripsBreakdownModal onClose={closeTripsModal} />}
    </TripsModalContext.Provider>
  );
};

export const useTripsModal = () => useContext(TripsModalContext);
