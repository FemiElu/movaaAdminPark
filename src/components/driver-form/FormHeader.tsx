
import React from "react";
import { X } from "lucide-react";

interface FormHeaderProps {
  onCancel: () => void;
  title?: string;
  subTitle?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ 
  onCancel, 
  title = "Add A New Driver",
  subTitle = "Please fill the form below with the driver's information"
}) => {
  return (
    <>
      <button 
        onClick={onCancel} 
        className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      
      <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
      <p className="text-gray-600 text-center mb-8">
        {subTitle}
      </p>
    </>
  );
};

export default FormHeader;
