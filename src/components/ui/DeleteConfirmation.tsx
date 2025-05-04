
import React from "react";

interface DeleteConfirmationProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen?: boolean;
  title?: string;
  description?: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  message,
  onConfirm,
  onCancel,
  isOpen = true,
  title = "Confirm Deletion",
  description,
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{description || message}</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
