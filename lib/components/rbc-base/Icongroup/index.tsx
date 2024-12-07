import React from "react";
import { LucideIcon } from "lucide-react";
import Button from "../Button";

interface IconButtonProps {
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
  tooltip?: string;
}

interface IconGroupItem {
  icon: LucideIcon;
  value: string;
  tooltip?: string;
}

interface IconGroupProps {
  items: IconGroupItem[];
  value?: string;
  onChange?: (value: string) => void;
  direction?: "row" | "row-reverse";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const IconButton = ({
  icon: Icon,
  isActive,
  onClick,
  tooltip,
}: IconButtonProps) => {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size="icon"
      onClick={onClick}
      title={tooltip}
      className="rbc-rounded-lg"
      icon={<Icon className="rbc-w-5 rbc-h-5" />}
    />
  );
};

const IconGroup = ({
  items,
  value,
  onChange,
  direction = "row",
  size = "md",
  className = "",
}: IconGroupProps) => {
  const handleClick = (itemValue: string) => {
    onChange?.(itemValue);
  };

  return (
    <div
      className={`rbc-bg-white rbc-flex rbc-items-center rbc-gap-1 rbc-bg-primary rbc-p-1 rbc-rounded-lg ${
        direction === "row-reverse" ? "rbc-flex-row-reverse" : "rbc-flex-row"
      } ${className}`}
      style={{background: 'var(--rbc-bg-primary)'}}
    >
      {items.map((item, index) => (
        <IconButton
          key={index}
          icon={item.icon}
          isActive={value === item.value}
          onClick={() => handleClick(item.value)}
          tooltip={item.tooltip}
        />
      ))}
    </div>
  );
};

export default IconGroup;
