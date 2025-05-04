
import React, { useState } from "react";
import { Driver } from "@/components/driver-form/types";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import RoutesTable from "./RoutesTable";
import DriverDetailsModal from "@/components/ui/modals/DriverDetailsModal";
import EditDriverForm from "@/components/ui/EditDriverForm";
import DeleteConfirmation from "@/components/ui/DeleteConfirmation";
import { toast } from "sonner";

interface RouteDetailsProps {
  route: string;
  drivers: Driver[];
  onBackClick: () => void;
  totalRevenue: number;
  totalTurns: number;
}

const RouteDetails: React.FC<RouteDetailsProps> = ({
  route,
  drivers,
  onBackClick,
  totalRevenue,
  totalTurns,
}) => {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleRowClick = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsEditModalOpen(true);
  };

  const handleDelete = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateDriver = (updatedDriver: Driver) => {
    // In a real app, this would update the driver in a database
    console.log("Updated driver:", updatedDriver);
    toast.success("Driver updated successfully");
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // In a real app, this would delete the driver from a database
    console.log("Deleted driver:", selectedDriver);
    toast.success("Driver deleted successfully");
    setIsDeleteModalOpen(false);
  };

  const formattedRevenue = new Intl.NumberFormat().format(totalRevenue);

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={onBackClick}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Routes
      </Button>

      <Tabs defaultValue="revenue" className="mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="revenue">{route} Total Revenue</TabsTrigger>
          <TabsTrigger value="turns">No Of Turns</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue">
          <Card className="p-6">
            <div className="text-3xl font-bold">{formattedRevenue}</div>
          </Card>
        </TabsContent>
        <TabsContent value="turns">
          <Card className="p-6">
            <div className="text-3xl font-bold">{totalTurns}</div>
          </Card>
        </TabsContent>
      </Tabs>

      <h2 className="text-xl font-semibold mb-4">Route: {route}</h2>

      <RoutesTable
        drivers={drivers}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Driver Details Modal */}
      {selectedDriver && isDetailsModalOpen && (
        <DriverDetailsModal
          driver={selectedDriver}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}

      {/* Edit Driver Modal */}
      {selectedDriver && isEditModalOpen && (
        <EditDriverForm
          driver={selectedDriver}
          onSubmit={handleUpdateDriver}
          onCancel={() => setIsEditModalOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {selectedDriver && isDeleteModalOpen && (
        <DeleteConfirmation
          message={`Are you sure you want to delete ${selectedDriver.fullName}?`}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default RouteDetails;
