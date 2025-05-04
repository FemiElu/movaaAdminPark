
import React, { useState } from "react";
import { Driver } from "../driver-form/types";
import { Filter, ArrowDownAZ, ArrowDownZA } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface DriversTableProps {
  drivers: Driver[];
  onEdit?: (driver: Driver) => void;
  onDelete?: (driver: Driver) => void;
  onRowClick?: (driver: Driver) => void;
}

type SortOption = "none" | "nameAsc" | "nameDesc" | "registrationAsc" | "routeAsc";

const DriversTable: React.FC<DriversTableProps> = ({
  drivers,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  const [sortOption, setSortOption] = useState<SortOption>("none");

  const getSortedDrivers = () => {
    let sortedDrivers = [...drivers];
    
    switch (sortOption) {
      case "nameAsc":
        return sortedDrivers.sort((a, b) => a.fullName.localeCompare(b.fullName));
      case "nameDesc":
        return sortedDrivers.sort((a, b) => b.fullName.localeCompare(a.fullName));
      case "registrationAsc":
        return sortedDrivers.sort((a, b) => {
          // Convert IDs to strings if they're numbers for proper comparison
          const idA = a.id.toString();
          const idB = b.id.toString();
          return idA.localeCompare(idB);
        });
      case "routeAsc":
        return sortedDrivers.sort((a, b) => a.route.localeCompare(b.route));
      default:
        return sortedDrivers;
    }
  };

  const sortedDrivers = getSortedDrivers();

  return (
    <div className="bg-[white] overflow-x-auto rounded-[10px] shadow">
      {/* Table Header with Filter */}
      <div className="flex items-center bg-[#3B883B] text-[white] p-2.5 min-w-[800px]">
        <div className="flex-1 text-center text-base font-medium">
          Full Name
        </div>
        <div className="flex-1 text-center text-base font-medium">
          Phone Number
        </div>
        <div className="flex-1 text-center text-base font-medium">
          Driver's Route
        </div>
        <div className="flex-1 text-center text-base font-medium">
          Plate Number
        </div>
        <div className="flex-1 text-center text-base font-medium">
          Registration Number
        </div>
        <div className="flex-1 flex items-center justify-center gap-2">
          <span className="text-base font-medium">Actions</span>
          <div className="relative">
            <Select 
              value={sortOption} 
              onValueChange={(value) => setSortOption(value as SortOption)}
            >
              <SelectTrigger className="w-auto bg-transparent border-none text-white hover:bg-green-700 p-1 h-auto" aria-label="Filter">
                <Filter className="h-5 w-5" />
              </SelectTrigger>
              <SelectContent align="end" className="bg-white z-50">
                <SelectItem value="none">Default Order</SelectItem>
                <SelectItem value="nameAsc" className="flex items-center gap-2">
                  <ArrowDownAZ className="h-4 w-4" /> Name (A-Z)
                </SelectItem>
                <SelectItem value="nameDesc" className="flex items-center gap-2">
                  <ArrowDownZA className="h-4 w-4" /> Name (Z-A)
                </SelectItem>
                <SelectItem value="registrationAsc">Registration (First to Last)</SelectItem>
                <SelectItem value="routeAsc">Route (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Table Body */}
      <div className="overflow-y-auto max-h-[60vh]">
        {sortedDrivers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No drivers found</div>
        ) : (
          sortedDrivers.map((driver) => (
            <div 
              key={driver.id} 
              className="flex p-3 min-w-[800px] border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onRowClick && onRowClick(driver)}
            >
              <div className="flex-1 text-center text-base text-[black]">
                {driver.fullName}
              </div>
              <div className="flex-1 text-center text-base text-[black]">
                {driver.phoneNumber}
              </div>
              <div className="flex-1 text-center text-base text-[black]">
                {driver.route}
              </div>
              <div className="flex-1 text-center text-base text-[black]">
                {driver.plateNumber}
              </div>
              <div className="flex-1 text-center text-base text-[black]">
                {driver.registrationNumber}
              </div>
              <div className="flex-1 flex justify-center items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete && onDelete(driver);
                  }}
                  className="p-2 rounded-full hover:bg-red-50 transition-colors"
                  aria-label="Delete driver"
                >
                  <i className="ti ti-trash text-red-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit && onEdit(driver);
                  }}
                  className="p-2 rounded-full hover:bg-blue-50 transition-colors"
                  aria-label="Edit driver"
                >
                  <i className="ti ti-edit text-blue-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Mobile View - Responsive cards for small screens */}
      <div className="md:hidden">
        {sortedDrivers.map((driver) => (
          <div 
            key={`mobile-${driver.id}`}
            className="block md:hidden p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
            onClick={() => onRowClick && onRowClick(driver)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{driver.fullName}</h3>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete && onDelete(driver);
                  }}
                  className="p-1.5 rounded-full hover:bg-red-50"
                  aria-label="Delete driver"
                >
                  <i className="ti ti-trash text-red-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit && onEdit(driver);
                  }}
                  className="p-1.5 rounded-full hover:bg-blue-50"
                  aria-label="Edit driver"
                >
                  <i className="ti ti-edit text-blue-500" />
                </button>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <p><span className="font-medium">Phone:</span> {driver.phoneNumber}</p>
              <p><span className="font-medium">Route:</span> {driver.route}</p>
              <p><span className="font-medium">Plate:</span> {driver.plateNumber}</p>
              <p><span className="font-medium">Registration:</span> {driver.registrationNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriversTable;
