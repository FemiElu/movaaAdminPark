
import React, { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor: string;
  onClick?: () => void;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBgColor,
  onClick,
  className = "",
}) => {
  return (
    <div 
      className={`bg-[white] flex flex-col items-start gap-2.5 p-5 rounded-[10px] ${className}`}
      onClick={onClick}
    >
      <div className="text-xl text-[black]">{title}</div>
      <div className="text-[32px] text-[black]">{value}</div>
      <div
        className={`${iconBgColor} w-[34px] h-[34px] flex items-center justify-center rounded-[17px]`}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
