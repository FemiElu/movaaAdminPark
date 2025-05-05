import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Driver {
  id: string | number;
  fullName: string;
  phoneNumber: string;
  route: string;
  plateNumber: string;
  registrationNumber: string;
  parkRegistrationNumber?: string;
  nin?: string;
  carModel?: string;
  driversLicense?: string;
  totalRevenue?: {
    monthly: number;
    daily: number[];
    yearly: number;
  };
  totalTrips?: {
    monthly: number;
    weekly: number;
    yearly: number;
  };
  turnNumber?: number;
  monthlyDue?: {
    current: number;
    history: { month: string; amount: number }[];
  };
}

interface DriverDetailsModalProps {
  driver: Driver | null;
  onClose: () => void;
}

const DriverDetailsModal: React.FC<DriverDetailsModalProps> = ({ driver, onClose }) => {
  const [revenueFilter, setRevenueFilter] = useState<"daily" | "monthly" | "yearly">("monthly");
  const [tripsFilter, setTripsFilter] = useState<"weekly" | "monthly" | "yearly">("monthly");
  const [showMonthlyDues, setShowMonthlyDues] = useState(false);

  if (!driver) return null;

  const getRevenueValue = () => {
    if (!driver.totalRevenue) return "N/A";
    
    switch (revenueFilter) {
      case "daily":
        return `₦ ${driver.totalRevenue.daily[new Date().getDay()].toLocaleString()}`;
      case "monthly":
        return `₦ ${driver.totalRevenue.monthly.toLocaleString()}`;
      case "yearly":
        return `₦ ${driver.totalRevenue.yearly.toLocaleString()}`;
      default:
        return `₦ ${driver.totalRevenue.monthly.toLocaleString()}`;
    }
  };

  const getTripsValue = () => {
    if (!driver.totalTrips) return "N/A";
    
    switch (tripsFilter) {
      case "weekly":
        return driver.totalTrips.weekly;
      case "monthly":
        return driver.totalTrips.monthly;
      case "yearly":
        return driver.totalTrips.yearly;
      default:
        return driver.totalTrips.monthly;
    }
  };

  return (
    <Dialog open={!!driver} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className=" max-w-[550px] md:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">{driver.fullName}</h2>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Total Revenue Card */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm text-gray-600">Total Revenue</h3>
                <div className="flex gap-1 text-xs">
                  <button 
                    className={`px-2 py-1 rounded ${revenueFilter === 'daily' ? 'bg-[#338333] text-white' : 'bg-gray-100'}`}
                    onClick={() => setRevenueFilter("daily")}
                  >
                    Daily
                  </button>
                  <button 
                    className={`px-2 py-1 rounded ${revenueFilter === 'monthly' ? 'bg-[#338333] text-white' : 'bg-gray-100'}`}
                    onClick={() => setRevenueFilter("monthly")}
                  >
                    Monthly
                  </button>
                  <button 
                    className={`px-2 py-1 rounded ${revenueFilter === 'yearly' ? 'bg-[#338333] text-white' : 'bg-gray-100'}`}
                    onClick={() => setRevenueFilter("yearly")}
                  >
                    Yearly
                  </button>
                </div>
              </div>
              <div className="text-xl font-semibold">{getRevenueValue()}</div>
              <div className="w-8 h-8 bg-[#FFE5C3] rounded-full flex items-center justify-center mt-2">
                <i className="ti ti-cash text-[#F08E0D]"></i>
              </div>
            </div>

            {/* Total Trips Card */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm text-gray-600">Total No Of Trip</h3>
                <div className="flex gap-1 text-xs">
                  <button 
                    className={`px-2 py-1 rounded ${tripsFilter === 'weekly' ? 'bg-[#338333] text-white' : 'bg-gray-100'}`}
                    onClick={() => setTripsFilter("weekly")}
                  >
                    Weekly
                  </button>
                  <button 
                    className={`px-2 py-1 rounded ${tripsFilter === 'monthly' ? 'bg-[#338333] text-white' : 'bg-gray-100'}`}
                    onClick={() => setTripsFilter("monthly")}
                  >
                    Monthly
                  </button>
                  <button 
                    className={`px-2 py-1 rounded ${tripsFilter === 'yearly' ? 'bg-[#338333] text-white' : 'bg-gray-100'}`}
                    onClick={() => setTripsFilter("yearly")}
                  >
                    Yearly
                  </button>
                </div>
              </div>
              <div className="text-xl font-semibold">{getTripsValue()}</div>
              <div className="w-8 h-8 bg-[#F5D6F2] rounded-full flex items-center justify-center mt-2">
                <i className="ti ti-route text-[#EA13D5]"></i>
              </div>
            </div>

            {/* Turn Number Card */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-sm text-gray-600">Turn Number</h3>
              <div className="text-xl font-semibold">{driver.turnNumber || "N/A"}</div>
              <div className="w-8 h-8 bg-[#F5D6F2] rounded-full flex items-center justify-center mt-2">
                <i className="ti ti-turn-right text-[#EA13D5]"></i>
              </div>
            </div>

            {/* Monthly Due Card */}
            <div className="bg-white rounded-lg p-4 shadow-sm cursor-pointer" onClick={() => setShowMonthlyDues(!showMonthlyDues)}>
              <h3 className="text-sm text-gray-600">Monthly Due</h3>
              <div className="text-xl font-semibold">₦ {driver.monthlyDue?.current.toLocaleString() || "N/A"}</div>
              <div className="w-8 h-8 bg-[#D2C8FF] rounded-full flex items-center justify-center mt-2">
                <i className="ti ti-calendar text-[#461DF9]"></i>
              </div>
            </div>
          </div>

          {/* Monthly Dues History */}
          {showMonthlyDues && driver.monthlyDue && (
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
              <h3 className="font-semibold mb-2">Monthly Dues History</h3>
              <div className="max-h-48 overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Month</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {driver.monthlyDue.history.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{item.month}</td>
                        <td className="py-2 text-right">₦ {item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Driver Details */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-4">Driver Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-medium">{driver.phoneNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Park Registration Number</p>
                <p className="font-medium">{driver.parkRegistrationNumber || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Plate Number</p>
                <p className="font-medium">{driver.plateNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">NIN</p>
                <p className="font-medium">{driver.nin || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Car Model</p>
                <p className="font-medium">{driver.carModel || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Registration Number</p>
                <p className="font-medium">{driver.registrationNumber}</p>
              </div>
            </div>

            {driver.driversLicense && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Driver's License</p>
                <div className="mt-1 p-2 border border-dashed border-gray-300 rounded-md text-center">
                  <i className="ti ti-file-text mr-2"></i>
                  <span>{driver.driversLicense}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DriverDetailsModal;
