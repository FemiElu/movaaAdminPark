
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RouteCards from "@/components/route/RouteCards";
import RouteDetails from "@/components/route/RouteDetails";
import { useRoutes } from "@/contexts/RouteContext";
import { Driver } from "@/components/driver-form/types";

const RoutesPage = () => {
  const { routes, addRoute, deleteRoute, getAllDriversForRoute } = useRoutes();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [driversForRoute, setDriversForRoute] = useState<Driver[]>([]);

  useEffect(() => {
    if (selectedRoute) {
      const drivers = getAllDriversForRoute(selectedRoute);
      setDriversForRoute(drivers);
    }
  }, [selectedRoute, getAllDriversForRoute]);

  const handleRouteClick = (routeName: string) => {
    setSelectedRoute(routeName);
    const filteredDrivers = getAllDriversForRoute(routeName);
    setDriversForRoute(filteredDrivers);
  };

  const handleBackToRoutes = () => {
    setSelectedRoute(null);
    setDriversForRoute([]);
  };

  const handleAddRoute = (routeName: string) => {
    addRoute(routeName);
  };

  const handleDeleteRoute = (routeName: string): boolean => {
    return deleteRoute(routeName);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {!selectedRoute ? (
          <RouteCards 
            routes={routes} 
            onRouteClick={handleRouteClick} 
            onAddRoute={handleAddRoute}
            onDeleteRoute={handleDeleteRoute}
          />
        ) : (
          <RouteDetails 
            route={selectedRoute} 
            drivers={driversForRoute} 
            onBackClick={handleBackToRoutes}
            totalRevenue={340000}
            totalTurns={200}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default RoutesPage;
