
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteGroup } from "./types";
import { ChevronDown, ChevronRight } from "lucide-react";

interface TurnsTableProps {
  groupedTurns: RouteGroup[];
}

const TurnsTable: React.FC<TurnsTableProps> = ({ groupedTurns }) => {
  const [expandedRoutes, setExpandedRoutes] = useState<Record<string, boolean>>({});

  const toggleRouteExpansion = (route: string) => {
    setExpandedRoutes(prev => ({
      ...prev,
      [route]: !prev[route]
    }));
  };

  return (
    <div className="w-full overflow-auto">
      {/* Desktop View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Turn</TableHead>
              <TableHead>Driver's Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>No Of Passengers</TableHead>
              <TableHead>Departure Date</TableHead>
              <TableHead>Departure Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupedTurns.map(group => (
              <React.Fragment key={group.route}>
                <TableRow className="bg-gray-100">
                  <TableCell colSpan={7} className="font-medium py-2">
                    Route: {group.route}
                  </TableCell>
                </TableRow>
                {group.turns.map((turn) => (
                  <TableRow key={turn.id}>
                    <TableCell className="font-medium">{turn.turnNumber}</TableCell>
                    <TableCell>{turn.driverName}</TableCell>
                    <TableCell>{turn.phoneNumber}</TableCell>
                    <TableCell>{turn.route}</TableCell>
                    <TableCell>{turn.numberOfPassengers}</TableCell>
                    <TableCell>{turn.departureDate}</TableCell>
                    <TableCell>{turn.departureTime}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {groupedTurns.map(group => (
          <div key={group.route} className="border rounded-lg overflow-hidden">
            <div 
              className="bg-gray-100 p-4 font-medium flex justify-between items-center cursor-pointer"
              onClick={() => toggleRouteExpansion(group.route)}
            >
              <span>Route: {group.route}</span>
              {expandedRoutes[group.route] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            
            {expandedRoutes[group.route] && group.turns.map(turn => (
              <div key={turn.id} className="p-4 border-t">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium text-gray-500">Turn</div>
                  <div>{turn.turnNumber}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Driver</div>
                  <div>{turn.driverName}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Phone</div>
                  <div>{turn.phoneNumber}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Passengers</div>
                  <div>{turn.numberOfPassengers}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Departure</div>
                  <div>{turn.departureDate} at {turn.departureTime}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TurnsTable;
