import {FC} from "react";
import TdStatus from "./TdStatus";
import TdTag from "./TdTag";
import TdLink from "./TdLink";
import {ColumnsRenderTypes, ColumnsType, DataTableType} from "../../../rbc-icons/rbc-types/TableType";
import RENDER_TYPES from "../../../const/renderTypes";

interface Props {
  data: DataTableType[];
  columns: ColumnsType[];
  handleEditRow?: (data: DataTableType) => void;
  handleDeleteRow?: (id: DataTableType["id"], item_id: number) => void;
  indexOfFirstRow: number;
  indexOfLastRow: number;
  actionTable: boolean;
}

interface PropsTd {
  tData: any;
  accessor: string;
  renderType?: ColumnsRenderTypes
  trueLabel?: string;
  falseLabel?: string;
}

const TableTd: FC<PropsTd> = ({tData, trueLabel, falseLabel, renderType}) => {

  if (renderType === RENDER_TYPES.tag) {
    return <TdTag data={tData}/>;
  } else if (renderType === RENDER_TYPES.status && trueLabel && falseLabel) {
    return <TdStatus data={tData} trueLabel={trueLabel} falseLabel={falseLabel}/>;
  } else if (renderType === RENDER_TYPES.link) {
    return <TdLink data={tData.value} href={tData.href}/>;
  } else {
    return <span>{tData}</span>;
  }
};

const TableBody: FC<Props> = (
  {
    data, columns, handleDeleteRow, handleEditRow,
    indexOfFirstRow, actionTable,
  }
) => {

  if (data.length == 0) {
    return (
      <tfoot className="  rbc-text-gray-900 rbc-font-normal ">
      <tr className="">
        <td
          colSpan={columns.length + 2}
          className="rbc-text-center rbc-py-4 rbc-text-base"
        >
          هیچ داده ای وجود ندارد
        </td>
      </tr>
      </tfoot>
    );
  }
  return (
    <tbody className=" rbc-bg-white rbc-overflow-x-auto">
    {data.map((data, index) => (
      <tr key={data.id}>
        <td className=" rbc-py-3">
          <div className="rbc-border-l-2 rbc-border-primary-gray-200 rbc-text-gray-900 rbc-pr-3 rbc-pl-4 rbc-text-right">
            {indexOfFirstRow + index + 1}
          </div>
        </td>

        {columns.map(({accessor, trueLabel, falseLabel, renderType}, index) => {
          const tData = (data[accessor] == null || data[accessor] === '') ? "-" : data[accessor]

          return (
            <td key={accessor} className=" py-3">
              <div className={`rbc-flex rbc-justify-between rbc-text-base rbc-font-normal rbc-text-gray-900  rbc-text-right `}>

                <div className='rbc-px-3'>
                  <TableTd
                    accessor={accessor}
                    {...trueLabel && {trueLabel}}
                    {...falseLabel && {falseLabel}}
                    {...renderType && {renderType}}
                    tData={tData}
                  />
                </div>
                <div
                  className={`rbc-w-1 rbc-h-6 rbc-self-center ${
                    !actionTable && columns.length - 1 === index
                      ? ""
                      : "rbc-border-l-2  rbc-border-primary-gray-200 "
                  }`}></div>
              </div>
            </td>
          );
        })}
        {actionTable && (
          <td className=" rbc-py-3">
            <div className="rbc-flex rbc-items-center rbc-pr-3 rbc-pl-4 rbc-text-right">
              {handleEditRow && (
                <button
                  className="rbc-duration-200 rbc-text-primary hover:rbc-bg-primary/5 rbc-rounded-md rbc-font-medium rbc-py-2 rbc-px-4 rbc-mr-2"
                  onClick={() => handleEditRow && handleEditRow(data)}
                >
                  ویرایش
                </button>
              )}

              {handleDeleteRow && (
                <button
                  className="rbc-duration-200 rbc-text-primary-red hover:rbc-bg-primary-red/5 rbc-rounded-md rbc-font-medium rbc-py-2 rbc-px-4"
                  onClick={() => handleDeleteRow && handleDeleteRow(data.id, data?.item_id)}
                >
                  حذف
                </button>
              )}
            </div>
          </td>
        )}
      </tr>
    ))}
    </tbody>
  );
};

export default TableBody;
