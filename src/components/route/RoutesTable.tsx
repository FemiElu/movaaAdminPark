
import React, { useState } from "react";
import { Driver } from "../driver-form/types";
import { Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RoutesTableProps {
  drivers: Driver[];
  onRowClick?: (driver: Driver) => void;
  onEdit?: (driver: Driver) => void;
  onDelete?: (driver: Driver) => void;
}

type SortOption = "none" | "nameAsc" | "nameDesc" | "turnAsc" | "seatsAsc";

const RoutesTable: React.FC<RoutesTableProps> = ({
  drivers,
  onRowClick,
  onEdit,
  onDelete,
}) => {
  const [sortOption, setSortOption] = useState<SortOption>("none");

  const getSortedDrivers = () => {
    let sortedDrivers = [...drivers];
    
    switch (sortOption) {
      case "nameAsc":
        return sortedDrivers.sort((a, b) => a.fullName.localeCompare(b.fullName));
      case "nameDesc":
        return sortedDrivers.sort((a, b) => b.fullName.localeCompare(a.fullName));
      case "turnAsc":
        return sortedDrivers.sort((a, b) => {
          const turnA = a.turnNumber || 0;
          const turnB = b.turnNumber || 0;
          return turnA - turnB;
        });
      case "seatsAsc":
        return sortedDrivers.sort((a, b) => {
          const seatsA = parseInt(a.numberOfSeats || "0");
          const seatsB = parseInt(b.numberOfSeats || "0");
          return seatsA - seatsB;
        });
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
          Driver's Name
        </div>
        <div className="flex-1 text-center text-base font-medium">
          Phone Number
        </div>
        <div className="flex-1 text-center text-base font-medium">
          Plate Number
        </div>
        <div className="flex-1 text-center text-base font-medium">
          Turn For The Day
        </div>
        <div className="flex-1 text-center text-base font-medium">
          No Of Seat
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
                <SelectItem value="nameAsc">Name (A-Z)</SelectItem>
                <SelectItem value="nameDesc">Name (Z-A)</SelectItem>
                <SelectItem value="turnAsc">Turn (First to Last)</SelectItem>
                <SelectItem value="seatsAsc">Seats (Low to High)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Table Body */}
      <div className="overflow-y-auto max-h-[60vh]">
        {sortedDrivers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No drivers found for this route</div>
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
                {driver.plateNumber}
              </div>
              <div className="flex-1 text-center text-base text-[black]">
                {driver.turnNumber ? `${driver.turnNumber}st Turn` : 'N/A'}
              </div>
              <div className="flex-1 text-center text-base text-[black]">
                {driver.numberOfSeats || 'N/A'}
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
              <p><span className="font-medium">Plate:</span> {driver.plateNumber}</p>
              <p><span className="font-medium">Turn:</span> {driver.turnNumber ? `${driver.turnNumber}st Turn` : 'N/A'}</p>
              <p><span className="font-medium">Seats:</span> {driver.numberOfSeats || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutesTable;
