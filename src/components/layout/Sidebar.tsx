
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-[250px] bg-[#2E7D32] text-[white] p-5 max-md:w-full max-md:fixed max-md:bottom-0 max-md:left-0 max-md:z-10 max-md:p-2 max-md:h-auto max-md:bg-opacity-95">
      <div className="text-2xl mb-5 max-md:hidden">Movaa</div>
      <nav className="flex flex-col gap-2.5 max-md:flex-row max-md:justify-around">
        <Link
          to="/dashboard"
          className={`flex items-center gap-2.5 cursor-pointer p-2.5 rounded-[5px] hover:bg-[#3b8a3f] hover:text-[#ffffff] ${
            currentPath === "/dashboard" ? "bg-[#ffffff] text-[#3b8a3f]" : ""
          } max-md:flex-col max-md:text-xs max-md:p-1.5`}
        >
          <i className="ti ti-dashboard" />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/routes"
          className={`flex items-center gap-2.5 cursor-pointer p-2.5 rounded-[5px] hover:bg-[#3b8a3f] hover:text-[#ffffff] ${
            currentPath === "/routes" ? "bg-[#ffffff] text-[#3b8a3f]" : ""
          } max-md:flex-col max-md:text-xs max-md:p-1.5`}
        >
          <i className="ti ti-route" />
          <span>Route</span>
        </Link>
        <Link
          to="/"
          className={`flex items-center gap-2.5 cursor-pointer p-2.5 rounded-[5px] hover:bg-[#3b8a3f] hover:text-[#ffffff] ${
            currentPath === "/" ? "bg-[#ffffff] text-[#3b8a3f]" : ""
          } max-md:flex-col max-md:text-xs max-md:p-1.5`}
        >
          <i className="ti ti-users" />
          <span>Drivers</span>
        </Link>
        <Link
          to="/turns"
          className={`flex items-center gap-2.5 cursor-pointer p-2.5 rounded-[5px] hover:bg-[#3b8a3f] hover:text-[#ffffff]${
            currentPath === "/turns" ? "bg-[#ffffff] text-[#3b8a3f]" : ""
          } max-md:flex-col max-md:text-xs max-md:p-1.5`}
        >
          <i className="ti ti-rotate-clockwise" />
          <span>Turns</span>
        </Link>
        <Link
          to="/finances"
          className={`flex items-center gap-2.5 cursor-pointer p-2.5 rounded-[5px] hover:bg-[#3b8a3f] hover:text-[#ffffff] ${
            currentPath === "/finances" ? "bg-[#ffffff] text-[#3b8a3f]" : ""
          } max-md:flex-col max-md:text-xs max-md:p-1.5`}
        >
          <i className="ti ti-cash" />
          <span>Finances</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
