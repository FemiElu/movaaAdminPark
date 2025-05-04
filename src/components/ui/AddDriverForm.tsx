
import React, { useState } from "react";
import { Button } from "./button";
import { Form } from "./form";
import FormHeader from "../driver-form/FormHeader";
import PersonalInfoFields from "../driver-form/PersonalInfoFields";
import VehicleInfoFields from "../driver-form/VehicleInfoFields";
import RegistrationFields from "../driver-form/RegistrationFields";
import { DriverFormData } from "../driver-form/types";
import { useRoutes } from "@/contexts/RouteContext";

interface AddDriverFormProps {
  onSubmit: (driverData: any) => void;
  onCancel: () => void;
}

const AddDriverForm: React.FC<AddDriverFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const { updateDriversCount } = useRoutes();
  
  const [formData, setFormData] = useState<DriverFormData>({
    fullName: "",
    phoneNumber: "",
    route: "",
    plateNumber: "",
    registrationNumber: "",
    nin: "",
    carModel: "",
    driversLicense: null,
    parkRegistrationNumber: "",
    numberOfSeats: "",
  });

  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRouteChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      route: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        driversLicense: file,
      }));
      setSelectedFile(file.name);
    }
  };

  const handleNumberOfSeatsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      numberOfSeats: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Update the routes counts after adding a driver
    setTimeout(() => {
      updateDriversCount();
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl relative">
        <FormHeader onCancel={onCancel} />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Fields */}
            <PersonalInfoFields 
              formData={formData} 
              handleChange={handleChange} 
            />
            
            {/* Vehicle Information Fields */}
            <VehicleInfoFields 
              formData={formData} 
              handleChange={handleChange}
              handleNumberOfSeatsChange={handleNumberOfSeatsChange}
            />
            
            {/* Registration Fields */}
            <RegistrationFields 
              formData={formData} 
              handleChange={handleChange}
              handleRouteChange={handleRouteChange}
              selectedFile={selectedFile}
              handleFileChange={handleFileChange}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-green-800 hover:bg-green-700 text-white py-3 rounded-md mt-6"
          >
            Add Driver
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddDriverForm;
