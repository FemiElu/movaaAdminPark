import React, { ReactNode } from "react";

interface ActionButtonProps {
  icon?: string;
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  children,
  onClick,
  variant = "primary",
}) => {
  const getButtonClass = () => {
    switch (variant) {
      case "primary":
        return "bg-[#338333] text-[white]";
      case "secondary":
        return "bg-[#f0f0f0] text-[black]";
      case "danger":
        return "bg-[#d32f2f] text-[white]";
      default:
        return "bg-[#338333] text-[white]";
    }
  };

  return (
    <button
      className={`flex items-center cursor-pointer px-5 py-2.5 rounded-[5px] border-[none] ${getButtonClass()}`}
      onClick={onClick}
    >
      {icon && <i className={`ti ${icon} mr-2`} />}
      <span>{children}</span>
    </button>
  );
};

export default ActionButton;
