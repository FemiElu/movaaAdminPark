
import React from "react";
import TurnsHeader from "@/components/turns/TurnsHeader";
import TurnsContent from "@/components/turns/TurnsContent";
import NewTurnModal from "@/components/turns/NewTurnModal";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Turn } from "@/components/turns/types";
import { useRoutes } from "@/contexts/RouteContext";
import { useTurnsState } from "@/hooks/useTurnsState";

// Sample data for demonstration
const SAMPLE_TURNS: Turn[] = [
  {
    id: "1",
    driverId: "driver1",
    driverName: "Tommy Mante",
    phoneNumber: "08162444568",
    route: "Lagos",
    departureDate: "2025-04-10",
    departureTime: "04:00 AM",
    turnNumber: "1st Turn",
    numberOfPassengers: 6
  },
  {
    id: "2",
    driverId: "driver2",
    driverName: "Edgar Windler",
    phoneNumber: "08162444568",
    route: "Lagos",
    departureDate: "2025-04-10",
    departureTime: "04:49 AM",
    turnNumber: "1st Turn",
    numberOfPassengers: 6
  },
  {
    id: "3",
    driverId: "driver3",
    driverName: "Leland Lakin",
    phoneNumber: "08162444568",
    route: "Ibadan",
    departureDate: "2025-04-10",
    departureTime: "11:06 AM",
    turnNumber: "2nd Turn",
    numberOfPassengers: 20
  },
  {
    id: "4",
    driverId: "driver4",
    driverName: "Alexandra Kutch II",
    phoneNumber: "08162444568",
    route: "Ibadan",
    departureDate: "2025-04-10",
    departureTime: "04:19 PM",
    turnNumber: "1st Turn",
    numberOfPassengers: 6
  },
  {
    id: "5",
    driverId: "driver5",
    driverName: "Stephen Jacobs",
    phoneNumber: "08162444568",
    route: "Abuja",
    departureDate: "2025-04-18",
    departureTime: "08:07 AM",
    turnNumber: "3rd Turn",
    numberOfPassengers: 6
  },
  {
    id: "6",
    driverId: "driver6",
    driverName: "Ronald Purdy Jr.",
    phoneNumber: "08162444568",
    route: "Abuja",
    departureDate: "2025-04-20",
    departureTime: "11:06 AM",
    turnNumber: "1st Turn",
    numberOfPassengers: 10
  }
];

const TurnsPage: React.FC = () => {
  const { routes } = useRoutes();
  const {
    date,
    setDate,
    selectedRoute,
    setSelectedRoute,
    isNewTurnModalOpen,
    setIsNewTurnModalOpen,
    groupedTurns,
    handleAddTurn,
  } = useTurnsState({ initialTurns: SAMPLE_TURNS });

  // Get available routes from the routes context
  const availableRoutes = ["All", ...routes.map(route => route.name)];

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <TurnsHeader
          date={date}
          setDate={setDate}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          availableRoutes={availableRoutes}
          onNewTurnClick={() => setIsNewTurnModalOpen(true)}
        />
        
        <TurnsContent groupedTurns={groupedTurns} />

        <NewTurnModal 
          isOpen={isNewTurnModalOpen} 
          onClose={() => setIsNewTurnModalOpen(false)} 
          onAddTurn={handleAddTurn}
          availableRoutes={routes.map(route => route.name)}
        />
      </div>
    </DashboardLayout>
  );
};

export default TurnsPage;
