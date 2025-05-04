
import React, { useState, useEffect } from "react";
import { Button } from "./button";
import FormHeader from "../driver-form/FormHeader";
import PersonalInfoFields from "../driver-form/PersonalInfoFields";
import VehicleInfoFields from "../driver-form/VehicleInfoFields";
import RegistrationFields from "../driver-form/RegistrationFields";
import { Driver } from "../driver-form/types";
import { useRoutes } from "@/contexts/RouteContext";

interface EditDriverFormProps {
  driver: Driver;
  onSubmit: (driverData: Driver) => void;
  onCancel: () => void;
}

const EditDriverForm: React.FC<EditDriverFormProps> = ({
  driver,
  onSubmit,
  onCancel,
}) => {
  const { updateDriversCount } = useRoutes();
  const [formData, setFormData] = useState<Driver>(driver);
  const [selectedFile, setSelectedFile] = useState<string | null>(
    typeof formData.driversLicense === 'string' ? formData.driversLicense : null
  );

  useEffect(() => {
    setFormData(driver);
    if (typeof driver.driversLicense === 'string') {
      setSelectedFile(driver.driversLicense);
    }
  }, [driver]);

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
    
    // Update the routes counts after editing a driver
    setTimeout(() => {
      updateDriversCount();
    }, 100);
  };

  // Ensure all required fields have default values
  const personalInfoData = {
    fullName: formData.fullName || "",
    phoneNumber: formData.phoneNumber || "",
    nin: formData.nin || "",
  };

  const vehicleInfoData = {
    plateNumber: formData.plateNumber || "",
    carModel: formData.carModel || "",
    numberOfSeats: formData.numberOfSeats || "",
  };

  const registrationData = {
    registrationNumber: formData.registrationNumber || "",
    parkRegistrationNumber: formData.parkRegistrationNumber || "",
    route: formData.route || "",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl relative">
        <FormHeader onCancel={onCancel} title="Edit Driver" subTitle="Update the driver's information below" />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Fields */}
            <PersonalInfoFields 
              formData={personalInfoData} 
              handleChange={handleChange} 
            />
            
            {/* Vehicle Information Fields */}
            <VehicleInfoFields 
              formData={vehicleInfoData} 
              handleChange={handleChange}
              handleNumberOfSeatsChange={handleNumberOfSeatsChange}
            />
            
            {/* Registration Fields */}
            <RegistrationFields 
              formData={registrationData} 
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
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditDriverForm;
