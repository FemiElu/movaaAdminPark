
import React from "react";
import { Input } from "../ui/input";
import { FileText, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRoutes } from "@/contexts/RouteContext";

interface RegistrationFieldsProps {
  formData: {
    registrationNumber: string;
    parkRegistrationNumber: string;
    route: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRouteChange?: (value: string) => void;
  selectedFile: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegistrationFields: React.FC<RegistrationFieldsProps> = ({ 
  formData, 
  handleChange,
  handleRouteChange,
  selectedFile,
  handleFileChange
}) => {
  const { routes } = useRoutes();
  
  return (
    <>
      {/* Upload Driver's License */}
      <div>
        <label htmlFor="driversLicense" className="block text-sm font-medium mb-2 flex items-center gap-1">
          <FileText className="h-4 w-4" /> Upload Driver's License
        </label>
        <div className="flex items-center border rounded-md overflow-hidden">
          <div className="flex-1 px-3 py-2 text-sm text-gray-500 truncate">
            {selectedFile ? selectedFile : "Tap to Upload"}
            <p className="text-xs text-gray-400">PDF, PNG, JPG | 10MB max.</p>
          </div>
          <label htmlFor="license-upload" className="bg-blue-500 text-white px-4 py-2 cursor-pointer">
            <Upload className="h-4 w-4" />
          </label>
          <input
            type="file"
            id="license-upload"
            name="driversLicense"
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
          />
        </div>
      </div>
      
      {/* Park Registration Number */}
      <div>
        <label htmlFor="parkRegistrationNumber" className="block text-sm font-medium mb-2">
          Park Registration Number
        </label>
        <Input
          type="text"
          id="parkRegistrationNumber"
          name="parkRegistrationNumber"
          placeholder="Park Registration Number"
          value={formData.parkRegistrationNumber}
          onChange={handleChange}
          className="w-full"
          required
        />
      </div>
      
      {/* Route - Now as a dropdown */}
      <div className="md:col-span-2">
        <label htmlFor="route" className="block text-sm font-medium mb-2">
          Driver's Route
        </label>
        <Select
          value={formData.route}
          onValueChange={(value) => {
            if (handleRouteChange) {
              handleRouteChange(value);
            }
          }}
        >
          <SelectTrigger id="route" className="w-full">
            <SelectValue placeholder="Select a route" />
          </SelectTrigger>
          <SelectContent>
            {routes && routes.length > 0 ? (
              routes.map((route) => (
                <SelectItem key={route.name} value={route.name}>
                  {route.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-routes" disabled>
                No routes available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default RegistrationFields;
