import React, { ReactElement } from "react";

interface SideBarLinkProps {
  href: string;
  dataTestID: string;
  className: string;
  children: ReactElement;
  component?: string;
}

export default function SideBarLink({
  component,
  children,
  ...props
}: SideBarLinkProps) {
  if (component) {
    return React.createElement(component, { ...props }, children);
  }
  return (
    <a {...props} data-testid={props.dataTestID}>
      {children}
    </a>
  );
}
