
import React from "react";
import AddDriverForm from "../ui/AddDriverForm";
import EditDriverForm from "../ui/EditDriverForm";
import DeleteConfirmation from "../ui/DeleteConfirmation";
import { Driver } from "../driver-form/types";

interface FormModalsProps {
  showAddForm: boolean;
  showEditForm: boolean;
  showDeleteConfirm: boolean;
  selectedDriver: Driver | null;
  onAddDriverSubmit: (driverData: any) => void;
  onEditDriverSubmit: (updatedDriver: Driver) => void;
  onDeleteConfirm: () => void;
  onAddFormCancel: () => void;
  onEditFormCancel: () => void;
  onDeleteCancel: () => void;
}

const FormModals: React.FC<FormModalsProps> = ({
  showAddForm,
  showEditForm,
  showDeleteConfirm,
  selectedDriver,
  onAddDriverSubmit,
  onEditDriverSubmit,
  onDeleteConfirm,
  onAddFormCancel,
  onEditFormCancel,
  onDeleteCancel,
}) => {
  return (
    <>
      {showAddForm && (
        <AddDriverForm
          onSubmit={onAddDriverSubmit}
          onCancel={onAddFormCancel}
        />
      )}

      {showEditForm && selectedDriver && (
        <EditDriverForm
          driver={selectedDriver}
          onSubmit={onEditDriverSubmit}
          onCancel={onEditFormCancel}
        />
      )}

      {showDeleteConfirm && selectedDriver && (
        <DeleteConfirmation
          message={`Are you sure you want to delete ${selectedDriver.fullName}?`}
          onConfirm={onDeleteConfirm}
          onCancel={onDeleteCancel}
        />
      )}
    </>
  );
};

export default FormModals;
