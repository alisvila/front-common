import { ReactNode } from "react";

const PageLayout = ({
  header,
  sidebar,
  headerHeight,
  children,
  gap = 12,
}: {
  header: ReactNode;
  sidebar: ReactNode;
  headerHeight: number;
  children: ReactNode;
  gap?: number;
}) => {
  return (
    <div style={{ direction: "rtl" }} className="rbc-h-dvh">
      <header className={`rbc-block rbc-h-[${headerHeight}px]`}>
        {header}
      </header>
      <div
        style={{ height: `calc(100% - ${headerHeight}px)` }}
        className={`rbc-flex rbc-pt-[${gap}px] rbc-gap-[${gap}px]`}
      >
        {sidebar}
        <main className="rbc-w-full rbc-overflow-y-auto rbc-transition-all rbc-duration-300 ">
          {children}
        </main>
      </div>
    </div>
  );
};
export default PageLayout;
