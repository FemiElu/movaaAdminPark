
import React, { useState } from "react";
import { Route, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import AddRouteModal from "./AddRouteModal";
import { toast } from "sonner";
import { RouteWithDrivers } from "@/contexts/RouteContext";

interface RouteCardsProps {
  routes: RouteWithDrivers[];
  onRouteClick: (routeName: string) => void;
  onAddRoute: (routeName: string) => void;
  onDeleteRoute: (routeName: string) => boolean;
}

const RouteCards: React.FC<RouteCardsProps> = ({ 
  routes, 
  onRouteClick, 
  onAddRoute,
  onDeleteRoute
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent, routeName: string) => {
    e.stopPropagation(); // Stop propagation to prevent route click
    setRouteToDelete(routeName);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (routeToDelete) {
      const success = onDeleteRoute(routeToDelete);
      
      if (success) {
        toast.success(`Route "${routeToDelete}" deleted successfully`);
      } else {
        toast.error(`Cannot delete route "${routeToDelete}" because it has assigned drivers`);
      }
      
      setRouteToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Routes</h1>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-800 hover:bg-green-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Route
        </Button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {routes.map((route) => (
          <div
            key={route.name}
            onClick={() => onRouteClick(route.name)}
            className="bg-white rounded-lg p-6 shadow-md cursor-pointer hover:shadow-lg transition-shadow relative group"
          >
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-2 rounded-full mb-4">
                <Route className="h-6 w-6 text-green-800" />
              </div>
              <p className="font-medium mb-3">Route: {route.name}</p>
              <p className="text-sm text-gray-600">
                {route.driversCount} {route.driversCount === 1 ? 'Driver' : 'Drivers'}
              </p>
            </div>
            
            <button
              onClick={(e) => handleDeleteClick(e, route.name)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-red-50"
              aria-label={`Delete ${route.name} route`}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>
      
      {/* Add Route Modal */}
      <AddRouteModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddRoute={onAddRoute}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Route</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the route "{routeToDelete}"? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RouteCards;
