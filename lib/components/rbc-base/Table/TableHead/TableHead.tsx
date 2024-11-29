import { FC } from "react";
import { ColumnsType } from "../../../rbc-icons/rbc-types/TableType";

interface Props {
  columns: ColumnsType[];
  actionTable: boolean;
}

const TableHead: FC<Props> = ({ columns, actionTable }) => {
  return (
    <thead>
      <tr className="rbc-h-14 rbc-bg-tertiary">
        <th className={`rbc-h-full`}>
          <div
            className={`rbc-pl-4 rbc-pr-3 rbc-text-white  rbc-text-base rbc-font-medium rbc-text-right`}
          >
            {"ردیف"}
          </div>
        </th>
        {columns.map(({ label, accessor }) => {
          return (
            <th key={accessor} className={`rbc-h-full`}>
              <div className='rbc-flex rbc-items-center'>
                <div className={`rbc-h-6 rbc-self-center rbc-border-r-2  rbc-border-tertiary-400 rbc-translate-x-[4px]`}></div>
                <div
                  className={`rbc-pl-4 rbc-pr-3 rbc-text-white rbc-font-medium  rbc-text-right `}
                >
                  {label}
                </div>
              </div>
            </th>
          );
        })}
        {actionTable && (
          <th className={`rbc-h-full`}>
            <div
              className={`rbc-pl-4 rbc-pr-3 rbc-text-white rbc-text-base   rbc-text-base rbc-font-medium  rbc-text-right`}
            >
              {"عملیات"}
            </div>
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHead;
