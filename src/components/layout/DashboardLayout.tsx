
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <div className="max-w-none flex flex-col md:flex-row mx-auto max-sm:max-w-screen-sm">
        <Sidebar />
        <main className="flex-1 bg-[#F9F9F9] p-5 md:p-5 sm:p-4 max-sm:p-3 min-h-screen pb-20 md:pb-5">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
