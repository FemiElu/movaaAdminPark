
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Driver } from "@/components/driver-form/types";

export interface RouteWithDrivers {
  name: string;
  driversCount: number;
}

interface RouteContextType {
  routes: RouteWithDrivers[];
  addRoute: (routeName: string) => void;
  deleteRoute: (routeName: string) => boolean;
  updateDriversCount: () => void;
  getAllDriversForRoute: (routeName: string) => Driver[];
}

interface RouteProviderProps {
  children: React.ReactNode;
  initialDrivers: Driver[];
}

// Initial default routes
const DEFAULT_ROUTES: RouteWithDrivers[] = [
  { name: "Lagos", driversCount: 0 },
  { name: "Abuja", driversCount: 0 },
  { name: "Ibadan", driversCount: 0 }
];

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider: React.FC<RouteProviderProps> = ({ children, initialDrivers }) => {
  const [routes, setRoutes] = useState<RouteWithDrivers[]>(() => {
    // Try to load from localStorage first
    const savedRoutes = localStorage.getItem("routes");
    if (savedRoutes) {
      return JSON.parse(savedRoutes);
    }
    return DEFAULT_ROUTES;
  });

  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);

  // Update drivers when initialDrivers changes
  useEffect(() => {
    setDrivers(initialDrivers);
    updateDriversCount();
  }, [initialDrivers]);

  // Save routes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("routes", JSON.stringify(routes));
  }, [routes]);

  const addRoute = useCallback((routeName: string) => {
    if (routeName.trim() === "") return;
    
    // Check if route already exists
    if (routes.some(route => route.name.toLowerCase() === routeName.toLowerCase())) {
      return;
    }
    
    setRoutes(prevRoutes => [...prevRoutes, { name: routeName, driversCount: 0 }]);
  }, [routes]);

  const deleteRoute = useCallback((routeName: string): boolean => {
    // Check if there are drivers assigned to this route
    const driversOnRoute = drivers.filter(driver => driver.route === routeName);
    
    if (driversOnRoute.length > 0) {
      return false; // Cannot delete route with assigned drivers
    }
    
    setRoutes(prevRoutes => prevRoutes.filter(route => route.name !== routeName));
    return true;
  }, [drivers]);

  const updateDriversCount = useCallback(() => {
    // Create a map to count drivers per route
    const routeCounts = new Map<string, number>();
    
    // Count drivers for each route
    drivers.forEach(driver => {
      const routeName = driver.route;
      routeCounts.set(routeName, (routeCounts.get(routeName) || 0) + 1);
    });
    
    // Update routes with new counts and add any missing routes from drivers
    const updatedRoutes = [...routes];
    
    // First update existing routes
    updatedRoutes.forEach(route => {
      route.driversCount = routeCounts.get(route.name) || 0;
    });
    
    // Then add any new routes found in drivers
    drivers.forEach(driver => {
      const routeName = driver.route;
      if (!updatedRoutes.some(r => r.name === routeName)) {
        updatedRoutes.push({
          name: routeName,
          driversCount: routeCounts.get(routeName) || 0
        });
      }
    });
    
    setRoutes(updatedRoutes);
  }, [drivers, routes]);

  const getAllDriversForRoute = useCallback((routeName: string) => {
    return drivers.filter(driver => driver.route === routeName);
  }, [drivers]);

  return (
    <RouteContext.Provider 
      value={{ 
        routes, 
        addRoute, 
        deleteRoute, 
        updateDriversCount, 
        getAllDriversForRoute 
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useRoutes = () => {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error("useRoutes must be used within a RouteProvider");
  }
  return context;
};
