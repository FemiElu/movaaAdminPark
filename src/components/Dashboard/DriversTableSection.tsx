
import React from "react";
import DriversTable from "../ui/DriversTable";
import { Driver } from "../driver-form/types";

interface DriversTableSectionProps {
  drivers: Driver[];
  onEdit: (driver: Driver) => void;
  onDelete: (driver: Driver) => void;
  onRowClick: (driver: Driver) => void;
}

const DriversTableSection: React.FC<DriversTableSectionProps> = ({
  drivers,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  return (
    <section>
      <DriversTable
        drivers={drivers}
        onEdit={onEdit}
        onDelete={onDelete}
        onRowClick={onRowClick}
      />
    </section>
  );
};

export default DriversTableSection;
