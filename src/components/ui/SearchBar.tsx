
import React, { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search",
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // Allow real-time filtering as the user types
    if (onSearch) {
      onSearch(newQuery);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-[#F0F1F0] p-2.5 rounded-[5px] w-full"
    >
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 mr-2.5 border-[none] bg-transparent outline-none w-full"
        value={query}
        onChange={handleChange}
      />
      <button type="submit" aria-label="Search">
        <i className="ti ti-search" />
      </button>
    </form>
  );
};

export default SearchBar;
