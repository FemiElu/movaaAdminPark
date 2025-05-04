
import React from "react";
import { format, addDays, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TurnsHeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  selectedRoute: string;
  setSelectedRoute: (route: string) => void;
  availableRoutes: string[];
  onNewTurnClick: () => void;
}

const TurnsHeader: React.FC<TurnsHeaderProps> = ({
  date,
  setDate,
  selectedRoute,
  setSelectedRoute,
  availableRoutes,
  onNewTurnClick,
}) => {
  const handlePreviousDay = () => {
    setDate(subDays(date, 1));
  };

  const handleNextDay = () => {
    setDate(addDays(date, 1));
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={handlePreviousDay} aria-label="Previous day">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="min-w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "MMMM d, yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
        
        <Button variant="outline" size="icon" onClick={handleNextDay} aria-label="Next day">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
        <div className="flex overflow-x-auto gap-2 pb-2 max-w-full flex-grow">
          {availableRoutes.map(route => (
            <Button
              key={route}
              variant={selectedRoute === route ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRoute(route)}
              className="whitespace-nowrap"
            >
              {route}
            </Button>
          ))}
        </div>
        <Button 
          onClick={onNewTurnClick}
          className="bg-[#2E7D32] hover:bg-[#1B5E20] ml-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Turn
        </Button>
      </div>
    </div>
  );
};

export default TurnsHeader;
