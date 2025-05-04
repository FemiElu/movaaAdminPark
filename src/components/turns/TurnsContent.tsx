
import React from "react";
import { RouteGroup } from "./types";
import TurnsTable from "./TurnsTable";

interface TurnsContentProps {
  groupedTurns: RouteGroup[];
}

const TurnsContent: React.FC<TurnsContentProps> = ({ groupedTurns }) => {
  if (groupedTurns.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No turns scheduled for this day/route.</p>
      </div>
    );
  }

  return <TurnsTable groupedTurns={groupedTurns} />;
};

export default TurnsContent;
