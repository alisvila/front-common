import { ReactNode, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MenuItem } from "./sidebar";
import SidebarItem from "./sidebarItem";

export const Sidebar = ({
  className,
  header,
  footer,
  list,
  component
}: {
  list: MenuItem[];
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
  component: string
}) => {
  const [open, setOpen] = useState(true);
  const [hovered, setHovered] = useState(false);
  const handleHover = (isHovered: boolean) => {
    if (!open) {
      setHovered(isHovered);
    }
  };

  return (
    <aside
      className={`${
        open || hovered ? "rbc-w-1/5" : "rbc-w-[50px]"
      } rbc-max-w-[320px] rbc-bg-[#FCFCFC] rbc-shadow-[0px_0px_2px_0px_#00000040] rbc-rounded-sm rbc-p-1 rbc-relative rbc-transition-all rbc-duration-300 ${className}`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}>
      <span
        className={`rbc-shadow-[0px_0px_1px_0px_#00000040] rbc-absolute rbc-top-0 rbc-left-0 rbc-flex rbc-justify-center rbc-items-center rbc-w-[20px] rbc-h-[39px] rbc-bg-[#F3F4F6] rbc-rounded-sm rbc-cursor-pointer`}
        onClick={() => {
          setOpen((prev) => !prev);
          setHovered(false);
        }}>
        <span
          className={`${
            open || hovered ? "rbc-rotate-[0deg]" : "rbc-rotate-[180deg]"
          }`}>
          <IoIosArrowForward />
        </span>
      </span>
      <div className="rbc-h-full rbc-flex rbc-flex-col">
        {header && <div>{header}</div>}
        <div className="rbc-h-full rbc-overflow-y-auto">
          <ul>
            {list.map((item) => {
              return (
                <SidebarItem key={item.title} menuItem={item} isOpen={open} component={component}/>
              );
            })}
          </ul>
        </div>
        {footer && <div>{footer}</div>}
      </div>
    </aside>
  );
};
