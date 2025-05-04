
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { toast } from "sonner";

interface AddRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRoute: (routeName: string) => void;
}

const AddRouteModal: React.FC<AddRouteModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddRoute 
}) => {
  const [routeName, setRouteName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!routeName.trim()) {
      setError("Route name is required");
      return;
    }

    onAddRoute(routeName);
    toast.success("Route added successfully");
    setRouteName("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Add New Route
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="routeName" className="block text-sm font-medium mb-1">
              Route Name
            </label>
            <Input
              id="routeName"
              placeholder="Enter route name (e.g. Lagos)"
              value={routeName}
              onChange={(e) => {
                setRouteName(e.target.value);
                setError("");
              }}
              className="w-full"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "routeName-error" : undefined}
            />
            {error && (
              <p id="routeName-error" className="text-sm text-red-500 mt-1">
                {error}
              </p>
            )}
          </div>
          
          <DialogFooter className="sm:justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setRouteName("");
                setError("");
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-green-800 hover:bg-green-700">
              Add Route
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRouteModal;
