
import React from "react";
import { Input } from "../ui/input";
import { Car } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface VehicleInfoFieldsProps {
  formData: {
    plateNumber: string;
    carModel: string;
    numberOfSeats: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumberOfSeatsChange: (value: string) => void;
}

const VehicleInfoFields: React.FC<VehicleInfoFieldsProps> = ({ 
  formData, 
  handleChange,
  handleNumberOfSeatsChange
}) => {
  return (
    <>
      {/* Plate Number */}
      <div>
        <label htmlFor="plateNumber" className="block text-sm font-medium mb-2">
          Plate Number
        </label>
        <Input
          type="text"
          id="plateNumber"
          name="plateNumber"
          placeholder="Plate Number"
          value={formData.plateNumber}
          onChange={handleChange}
          className="w-full"
          required
        />
      </div>
      
      {/* Car Model Number */}
      <div>
        <label htmlFor="carModel" className="block text-sm font-medium mb-2">
          Car Model Number
        </label>
        <Input
          type="text"
          id="carModel"
          name="carModel"
          placeholder="Car Model Number"
          value={formData.carModel}
          onChange={handleChange}
          className="w-full"
          required
        />
      </div>
      
      {/* Number of Seats */}
      <div>
        <label htmlFor="numberOfSeats" className="block text-sm font-medium mb-2 flex items-center gap-1">
          <Car className="h-4 w-4" /> Number Of Seats
        </label>
        <Select 
          value={formData.numberOfSeats} 
          onValueChange={handleNumberOfSeatsChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Number Of Seats" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4 Seats</SelectItem>
            <SelectItem value="5">5 Seats</SelectItem>
            <SelectItem value="7">7 Seats</SelectItem>
            <SelectItem value="14">14 Seats</SelectItem>
            <SelectItem value="18">18 Seats</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default VehicleInfoFields;
