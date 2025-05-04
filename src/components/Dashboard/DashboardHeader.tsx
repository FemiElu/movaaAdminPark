
import React from "react";
import SearchBar from "../ui/SearchBar";
import ActionButton from "../ui/ActionButton";

interface DashboardHeaderProps {
  onSearch?: (query: string) => void;
  onAddDriver?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onSearch,
  onAddDriver,
}) => {
  return (
    <header className="flex flex-col md:flex-row gap-4 md:gap-2 justify-end md:items-center mb-5">
      <div className="w-full md:w-auto max-w-lg">
        <SearchBar onSearch={onSearch} placeholder="Search drivers..." />
      </div>
      <ActionButton icon="ti-plus" onClick={onAddDriver}>
        Add Driver
      </ActionButton>
    </header>
  );
};

export default DashboardHeader;
