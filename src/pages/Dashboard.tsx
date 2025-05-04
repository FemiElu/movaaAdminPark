
import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import StatCards from "../components/ui/StatCards";
import DriversTableSection from "../components/Dashboard/DriversTableSection";
import FormModals from "../components/Dashboard/FormModals";
import DriverModals from "../components/Dashboard/DriverModals";
import { RevenueModalProvider } from "../hooks/useRevenueModal";
import { TripsModalProvider } from "../hooks/useTripsModal";
import { useDashboardState } from "../hooks/useDashboardState";
import { sampleDrivers } from "../data/sampleDrivers";

const Dashboard: React.FC = () => {
  const {
    filteredDrivers,
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
  } = useDashboardState(sampleDrivers);

  return (
    <RevenueModalProvider>
      <TripsModalProvider>
        <DashboardLayout>
          <DashboardHeader onSearch={handleSearch} onAddDriver={handleAddDriver} />
          <StatCards />
          
          <DriversTableSection
            drivers={filteredDrivers}
            onEdit={handleEditDriver}
            onDelete={handleDeleteDriver}
            onRowClick={handleRowClick}
          />

          <FormModals
            showAddForm={showAddForm}
            showEditForm={showEditForm}
            showDeleteConfirm={showDeleteConfirm}
            selectedDriver={selectedDriver}
            onAddDriverSubmit={handleAddDriverSubmit}
            onEditDriverSubmit={handleEditDriverSubmit}
            onDeleteConfirm={handleDeleteConfirm}
            onAddFormCancel={() => setShowAddForm(false)}
            onEditFormCancel={() => {
              setShowEditForm(false);
              setSelectedDriver(null);
            }}
            onDeleteCancel={() => {
              setShowDeleteConfirm(false);
              setSelectedDriver(null);
            }}
          />

          <DriverModals
            showDriverDetails={showDriverDetails}
            selectedDriver={selectedDriver}
            onDriverDetailsClose={() => {
              setShowDriverDetails(false);
              setSelectedDriver(null);
            }}
          />
        </DashboardLayout>
      </TripsModalProvider>
    </RevenueModalProvider>
  );
};

export default Dashboard;
