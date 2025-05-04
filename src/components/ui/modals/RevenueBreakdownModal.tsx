
import React from "react";

interface RevenueBreakdownModalProps {
  onClose: () => void;
}

const RevenueBreakdownModal: React.FC<RevenueBreakdownModalProps> = ({ onClose }) => {
  const revenueData = {
    totalRevenue: "34,00000",
    monthlyDues: "18,50000",
    tripCommission: "15,50000",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Revenue Breakdown</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <i className="ti ti-x text-xl"></i>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-[#f9f9f9] p-4 rounded-md">
            <div className="text-sm text-gray-600">Total Revenue</div>
            <div className="text-2xl font-semibold">₦ {revenueData.totalRevenue}</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-[#f0ffe0] p-4 rounded-md">
              <div className="text-sm text-gray-600">Monthly Dues</div>
              <div className="text-xl font-semibold">₦ {revenueData.monthlyDues}</div>
            </div>
            
            <div className="flex-1 bg-[#e0f2ff] p-4 rounded-md">
              <div className="text-sm text-gray-600">Trip Commission</div>
              <div className="text-xl font-semibold">₦ {revenueData.tripCommission}</div>
            </div>
          </div>
          
          <div className="bg-[#f9f9f9] p-4 rounded-md">
            <div className="flex justify-between">
              <span className="text-sm">Monthly Growth</span>
              <span className="text-green-500 font-medium">+12.5%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-[#338333] text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevenueBreakdownModal;
