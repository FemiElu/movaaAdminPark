import React from "react";
import DriverDetailsModal from "../ui/modals/DriverDetailsModal";
import RevenueBreakdownModal from "../ui/modals/RevenueBreakdownModal";
import TripsBreakdownModal from "../ui/modals/TripsBreakdownModal";
import { Driver } from "../driver-form/types"; // Import the correct Driver type

interface DriverModalsProps {
  showDriverDetails: boolean;
  selectedDriver: Driver | null;
  onDriverDetailsClose: () => void;
}

const DriverModals: React.FC<DriverModalsProps> = ({
  showDriverDetails,
  selectedDriver,
  onDriverDetailsClose,
}) => {
  return (
    <>
      {showDriverDetails && selectedDriver && (
        <DriverDetailsModal 
          driver={selectedDriver}
          onClose={onDriverDetailsClose}
        />
      )}
    </>
  );
};

export default DriverModals;
