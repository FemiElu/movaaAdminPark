
import React, { createContext, useContext, useState, ReactNode } from "react";
import RevenueBreakdownModal from "../components/ui/modals/RevenueBreakdownModal";

interface RevenueModalContextType {
  openRevenueModal: () => void;
  closeRevenueModal: () => void;
}

const RevenueModalContext = createContext<RevenueModalContextType>({
  openRevenueModal: () => {},
  closeRevenueModal: () => {},
});

export const RevenueModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openRevenueModal = () => setIsOpen(true);
  const closeRevenueModal = () => setIsOpen(false);

  return (
    <RevenueModalContext.Provider value={{ openRevenueModal, closeRevenueModal }}>
      {children}
      {isOpen && <RevenueBreakdownModal onClose={closeRevenueModal} />}
    </RevenueModalContext.Provider>
  );
};

export const useRevenueModal = () => useContext(RevenueModalContext);
