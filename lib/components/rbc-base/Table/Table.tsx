import { useEffect } from "react";
import TableBody from "./TableBody/TableBody";
import TableHead from "./TableHead/TableHead";
import Pagination from "../Pagination/Pagination";
import { ColumnsType, DataTableType } from "../../rbc-icons/rbc-types/TableType";
import OverContainerLoading from "../Loading/OverContainerLoading";

interface Props {
  data: DataTableType[];
  actionTable?: boolean;
  columns: ColumnsType[];
  countItem?: number[];
  countShowRows?: boolean;
  showNumberPages?: boolean;
  handleEditRow?: (data: DataTableType) => void;
  handleDeleteRow?: (id: DataTableType["id"],item_id: number) => void;
  rowsPerPage?: number;
  setRowsPerPage?: (num: number) => void;
  dataLength?: number;
  currentPage?: number;
  setCurrentPage?: (num: number) => void;
  loading?: boolean;
}

const Table = ({
  data,
  columns,
  handleEditRow,
  handleDeleteRow,
  countItem,
  actionTable,
  countShowRows,
  showNumberPages,
  rowsPerPage = data.length,
  setRowsPerPage,
  currentPage = 1,
  setCurrentPage,
  dataLength = data.length,
  loading
}: Props) => {

  useEffect(() => {
    if (!showNumberPages && setRowsPerPage) {
      setRowsPerPage(data.length);
    }
  }, [data]);

  const arrayCountItem = [10, 20, 30];
  // Calculate indexes of the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // Change page

  const paginate = (pageNumber: number) =>
    setCurrentPage && setCurrentPage(pageNumber);
  return (
    <div>
      <div className="rbc-relative rbc-rounded-2xl rbc-overflow-x-auto rbc-w-full rbc-border ">
        <table className=" rbc-w-full rbc-h-min rbc-overflow-hidden rbc-rounded-2xl">
          <TableHead columns={columns} actionTable={actionTable || false} />
          <TableBody
            columns={columns}
            data={data}
            {...handleEditRow && {handleEditRow}}
            {...handleDeleteRow && {handleDeleteRow}}
            indexOfFirstRow={indexOfFirstRow}
            indexOfLastRow={indexOfLastRow}
            actionTable={actionTable || false}
          />
        </table>

        <OverContainerLoading loading={Boolean(loading)} />
      </div>
      <Pagination
        {...dataLength && {dataLength}}
        {...currentPage && {currentPage}}
        {...rowsPerPage && {rowsPerPage}}
        {...setRowsPerPage && {setRowsPerPage}}
        {...setCurrentPage && {setCurrentPage}}
        paginate={paginate}
        countShowRows={countShowRows || false}
        countItem={countItem || arrayCountItem}
        showNumberPages={showNumberPages || false}
      />
    </div>
  );
};

export default Table;
