
import { useState, useEffect } from "react";
import { Driver } from "../components/driver-form/types";
import { useRoutes } from "../contexts/RouteContext";

export const useDashboardState = (initialDrivers: Driver[]) => {
  const { updateDriversCount } = useRoutes();
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>(initialDrivers);
  const [showDriverDetails, setShowDriverDetails] = useState(false);

  // Update route counts when drivers change
  useEffect(() => {
    updateDriversCount();
  }, [drivers, updateDriversCount]);

  // Update the filtered drivers whenever the search query or drivers change
  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, drivers]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Enhanced filter logic for better searching
    if (query.trim() === "") {
      setFilteredDrivers(drivers);
    } else {
      const lowercaseQuery = query.toLowerCase();
      const filtered = drivers.filter(
        (driver) =>
          driver.fullName.toLowerCase().includes(lowercaseQuery) ||
          driver.phoneNumber.includes(query) ||
          driver.route.toLowerCase().includes(lowercaseQuery) ||
          driver.plateNumber.toLowerCase().includes(lowercaseQuery) ||
          driver.registrationNumber.includes(query),
      );
      setFilteredDrivers(filtered);
    }
  };

  const handleAddDriver = () => {
    setShowAddForm(true);
  };

  const handleAddDriverSubmit = (driverData: any) => {
    // Process file if it exists
    let driversLicenseValue: string | File | null = null;
    
    // If driversLicense is a File object, convert it to a filename string for storage
    if (driverData.driversLicense && driverData.driversLicense instanceof File) {
      driversLicenseValue = driverData.driversLicense;
    }

    const newDriver: Driver = {
      ...driverData,
      id: Date.now(), // Generate a unique ID
      driversLicense: driversLicenseValue,
      // Add default values for the additional fields in the driver details view
      totalRevenue: {
        monthly: Math.floor(Math.random() * 200000) + 100000,
        daily: Array(7).fill(0).map(() => Math.floor(Math.random() * 10000) + 5000),
        yearly: Math.floor(Math.random() * 2000000) + 1000000,
      },
      totalTrips: {
        monthly: Math.floor(Math.random() * 20) + 30,
        weekly: Math.floor(Math.random() * 5) + 8,
        yearly: Math.floor(Math.random() * 200) + 300,
      },
      turnNumber: Math.floor(Math.random() * 10) + 1,
      monthlyDue: {
        current: 25000,
        history: [
          { month: "January", amount: 25000 },
          { month: "February", amount: 25000 },
          { month: "March", amount: 25000 },
          { month: "April", amount: 25000 },
        ]
      }
    };
    
    const updatedDrivers = [...drivers, newDriver];
    setDrivers(updatedDrivers);
    setFilteredDrivers(updatedDrivers);
    setShowAddForm(false);
  };

  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowEditForm(true);
  };

  const handleEditDriverSubmit = (updatedDriver: Driver) => {
    const updatedDrivers = drivers.map((driver) =>
      driver.id === updatedDriver.id ? updatedDriver : driver,
    );
    setDrivers(updatedDrivers);
    setFilteredDrivers(updatedDrivers);
    setShowEditForm(false);
    setSelectedDriver(null);
  };

  const handleDeleteDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedDriver) {
      const updatedDrivers = drivers.filter((d) => d.id !== selectedDriver.id);
      setDrivers(updatedDrivers);
      setFilteredDrivers(updatedDrivers);
      setShowDeleteConfirm(false);
      setSelectedDriver(null);
    }
  };

  const handleRowClick = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowDriverDetails(true);
  };

  return {
    drivers,
    filteredDrivers,
    searchQuery,
    showAddForm,
    showEditForm,
    showDeleteConfirm,
    selectedDriver,
    showDriverDetails,
    handleSearch,
    handleAddDriver,
    handleAddDriverSubmit,
    handleEditDriver,
    handleEditDriverSubmit,
    handleDeleteDriver,
    handleDeleteConfirm,
    handleRowClick,
    setShowAddForm,
    setShowEditForm,
    setShowDeleteConfirm,
    setShowDriverDetails,
    setSelectedDriver,
  };
};
