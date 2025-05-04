
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Turn, RouteGroup } from "@/components/turns/types";
import { useToast } from "./use-toast";

export interface UseTurnsStateProps {
  initialTurns: Turn[];
}

export function useTurnsState({ initialTurns }: UseTurnsStateProps) {
  const [turns, setTurns] = useState<Turn[]>(initialTurns);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedRoute, setSelectedRoute] = useState<string>("All");
  const [isNewTurnModalOpen, setIsNewTurnModalOpen] = useState(false);
  const [groupedTurns, setGroupedTurns] = useState<RouteGroup[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Filter turns by the selected date and route
    const filteredByDate = turns.filter(turn => {
      // Compare only the date part
      return turn.departureDate === format(date, "yyyy-MM-dd");
    });

    const filtered = selectedRoute === "All" 
      ? filteredByDate 
      : filteredByDate.filter(turn => turn.route === selectedRoute);

    // Group by route
    const groupedByRoute: { [key: string]: Turn[] } = {};
    filtered.forEach(turn => {
      if (!groupedByRoute[turn.route]) {
        groupedByRoute[turn.route] = [];
      }
      groupedByRoute[turn.route].push(turn);
    });

    // Sort turns within each route by departure time
    Object.keys(groupedByRoute).forEach(route => {
      groupedByRoute[route].sort((a, b) => {
        return a.departureTime.localeCompare(b.departureTime);
      });
    });

    // Convert to array format for easier rendering
    const result: RouteGroup[] = Object.keys(groupedByRoute).map(route => ({
      route,
      turns: groupedByRoute[route]
    }));

    setGroupedTurns(result);
  }, [turns, date, selectedRoute]);

  const handleAddTurn = (newTurn: Turn) => {
    // Check for duplicate turn
    const isDuplicate = turns.some(
      turn => 
        turn.driverId === newTurn.driverId &&
        turn.departureDate === newTurn.departureDate &&
        turn.departureTime === newTurn.departureTime
    );

    if (isDuplicate) {
      toast({
        title: "Error",
        description: `${newTurn.driverName} already has a turn at ${newTurn.departureTime} on ${format(new Date(newTurn.departureDate), "MMM d, yyyy")}`,
        variant: "destructive"
      });
      return false;
    }

    setTurns(prevTurns => [...prevTurns, newTurn]);
    toast({
      title: "Success",
      description: "Turn has been successfully added"
    });
    return true;
  };

  return {
    turns,
    date,
    setDate,
    selectedRoute,
    setSelectedRoute,
    isNewTurnModalOpen,
    setIsNewTurnModalOpen,
    groupedTurns,
    handleAddTurn,
  };
}
