
import React from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { IdCard } from "lucide-react";

interface PersonalInfoFieldsProps {
  formData: {
    fullName: string;
    phoneNumber: string;
    nin: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ 
  formData, 
  handleChange 
}) => {
  return (
    <>
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <Input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full"
          required
        />
      </div>
      
      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
          Phone Number
        </label>
        <div className="flex gap-2">
          <div className="w-1/4">
            <Select defaultValue="+234">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="+234" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+234">+234</SelectItem>
                <SelectItem value="+1">+1</SelectItem>
                <SelectItem value="+44">+44</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-3/4">
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
        </div>
      </div>
      
      {/* NIN */}
      <div>
        <label htmlFor="nin" className="block text-sm font-medium mb-2 flex items-center gap-1">
          <IdCard className="h-4 w-4" /> NIN
        </label>
        <Input
          type="text"
          id="nin"
          name="nin"
          placeholder="NIN"
          value={formData.nin}
          onChange={handleChange}
          className="w-full"
          required
        />
      </div>
    </>
  );
};

export default PersonalInfoFields;
