import { useState } from "react";
import { MenuItem } from "./sidebar";
import { IoIosArrowDown } from "react-icons/io";
import SideBarLink from "./SideBarLink";

const SidebarItem = ({
  menuItem,
  isOpen,
  component,
}: {
  menuItem: MenuItem;
  isOpen: boolean;
  component: string;
}) => {
  const [showChild, setShowChild] = useState(true);
  return (
    <>
      <li key={menuItem.title} title={menuItem.title}>
        <>
          {menuItem.children ? (
            <>
              <div
                className={`rbc-flex rbc-items-center rbc-transition-all rbc-flex-row rbc-rounded-lg rbc-px-3 rbc-gap-x-2 rbc-my-2 rbc-py-3
                                rbc-w-full hover:rbc-bg-secondary-2/[0.8] hover:!rbc-text-primary rbc-cursor-pointer ${
                                  isOpen ? "justify-between" : "justify-center"
                                }`}
                data-testid={menuItem.id}
                onClick={() => {
                  setShowChild(!showChild);
                }}
              >
                <span
                  className="rbc-linkItem rbc-flex rbc-justify-start rbc-items-center"
                  title={menuItem.title}
                >
                  {menuItem.icon && menuItem.icon}
                  {isOpen && <span className="mr-2">{menuItem.title}</span>}
                </span>
                {isOpen && (
                  <span
                    className={`rbc-transition-all ${
                      showChild ? "rbc-rotate-180" : "rbc-rotate-0"
                    }`}
                  >
                    <IoIosArrowDown />
                  </span>
                )}
              </div>
              <ul
                className={`${isOpen && "rbc-pr-4"} ${
                  showChild ? "rbc-block" : "rbc-hidden"
                }`}
              >
                {menuItem.children.map((item) => {
                  return (
                    <SidebarItem
                      key={item.title}
                      menuItem={item}
                      isOpen={isOpen}
                      component={component}
                    />
                  );
                })}
              </ul>
            </>
          ) : menuItem.link ? (
            <SideBarLink
              href={menuItem.link ? menuItem.link : "/"}
              dataTestID={menuItem.id}
              className={`rbc-linkItem transition-all rbc-flex rbc-flex-row rbc-items-center rbc-rounded-lg px-3 ${
                isOpen ? "rbc-justify-start" : "rbc-justify-center"
              } rbc-gap-x-2 rbc-my-2 rbc-py-3 rbc-w-full
                            hover:rbc-bg-secondary-2/[0.8] hover:!rbc-text-primary rbc-cursor-pointer`}
              component={component}
            >
              <>
                {menuItem.icon && menuItem.icon}
                {isOpen && menuItem.title}
              </>
            </SideBarLink>
          ) : (
            <div>salammmm</div>
          )}
        </>
      </li>
      {menuItem.hasBorder && <hr className="rbc-w-full" />}
    </>
  );
};
export default SidebarItem;
