import React, { useState } from "react";

interface TripsBreakdownModalProps {
  onClose: () => void;
}

type FilterPeriod = "day" | "week" | "month";

interface TripData {
  period: string;
  count: number;
}

const TripsBreakdownModal: React.FC<TripsBreakdownModalProps> = ({ onClose }) => {
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>("day");

  const dayData: TripData[] = [
    { period: "Monday", count: 32 },
    { period: "Tuesday", count: 28 },
    { period: "Wednesday", count: 35 },
    { period: "Thursday", count: 30 },
    { period: "Friday", count: 40 },
    { period: "Saturday", count: 22 },
    { period: "Sunday", count: 13 },
  ];

  const weekData: TripData[] = [
    { period: "Week 1", count: 52 },
    { period: "Week 2", count: 48 },
    { period: "Week 3", count: 45 },
    { period: "Week 4", count: 55 },
  ];

  const monthData: TripData[] = [
    { period: "January", count: 180 },
    { period: "February", count: 165 },
    { period: "March", count: 190 },
    { period: "April", count: 200 },
  ];

  const getActiveData = () => {
    switch (filterPeriod) {
      case "day":
        return dayData;
      case "week":
        return weekData;
      case "month":
        return monthData;
      default:
        return dayData;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Trips Breakdown</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
            aria-label="Close"
          >
            <i className="ti ti-x text-xl"></i>
          </button>
        </div>
        
        <div className="mb-6 flex flex-wrap gap-2">
          <button 
            onClick={() => setFilterPeriod("day")} 
            className={`px-4 py-2 rounded-md ${filterPeriod === 'day' 
              ? 'bg-[#338333] text-white' 
              : 'bg-gray-100 text-gray-700'}`}
          >
            By Day
          </button>
          <button 
            onClick={() => setFilterPeriod("week")} 
            className={`px-4 py-2 rounded-md ${filterPeriod === 'week' 
              ? 'bg-[#338333] text-white' 
              : 'bg-gray-100 text-gray-700'}`}
          >
            By Week
          </button>
          <button 
            onClick={() => setFilterPeriod("month")} 
            className={`px-4 py-2 rounded-md ${filterPeriod === 'month' 
              ? 'bg-[#338333] text-white' 
              : 'bg-gray-100 text-gray-700'}`}
          >
            By Month
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f9f9f9]">
                <th className="text-left p-3 border-b">{filterPeriod === 'day' ? 'Day' : filterPeriod === 'week' ? 'Week' : 'Month'}</th>
                <th className="text-right p-3 border-b">Number of Trips</th>
              </tr>
            </thead>
            <tbody>
              {getActiveData().map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.period}</td>
                  <td className="p-3 text-right font-medium">{item.count}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#f9f9f9] font-semibold">
                <td className="p-3">Total</td>
                <td className="p-3 text-right">
                  {getActiveData().reduce((sum, item) => sum + item.count, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
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

export default TripsBreakdownModal;
