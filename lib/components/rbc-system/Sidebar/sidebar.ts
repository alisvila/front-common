import { ReactNode } from "react";

interface BaseMenuItem {
  title: string;
  id: string;
  icon?: ReactNode;
  hasBorder?: boolean;
}

interface MenuItemWithLink extends BaseMenuItem {
  link: string;
  clickHandle?: never;
  children?: never;
}

interface MenuItemWithClickHandle extends BaseMenuItem {
  clickHandle: () => void;
  link?: never;
  children?: never;
}

interface MenuItemWithChildren extends BaseMenuItem {
  children?: MenuItem[];
  link?: never;
  clickHandle?: never;
}

export type MenuItem = MenuItemWithLink | MenuItemWithClickHandle | MenuItemWithChildren;
