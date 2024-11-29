import { FC, useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface Props {
  dataLength?: number;
  currentPage?: number;
  rowsPerPage?: number;
  countItem: number[];
  countShowRows: boolean;
  showNumberPages: boolean;
  setCurrentPage?: (page: any) => void;
  setRowsPerPage?: (rows: number) => void;
  paginate: (pageNumber: number) => void;
}

const Pagination: FC<Props> = ({
  dataLength = 0,
  currentPage,
  rowsPerPage,
  countItem,
  setCurrentPage,
  setRowsPerPage,
  paginate,
  countShowRows,
  showNumberPages,
}) => {
  const [minValueArrShowRowInList, setMinValueArrShowRowInList] =
    useState<number>(0);
  const goToPreviousPage = () => {
    if (setCurrentPage) {
     setCurrentPage((prevPage: number) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (setCurrentPage) {
      setCurrentPage((prevPage: number) => prevPage + 1);
    }
  };

  function findMinValue(arr: number[]) {
    let minValue = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < minValue) {
        minValue = arr[i];
      }
    }

    return minValue;
  }
  useEffect(() => {
    setMinValueArrShowRowInList(findMinValue(countItem));
  }, [countItem]);

  return (
    <div className="rbc-ml-2 rbc-my-3 rbc-flex rbc-w-full rbc-justify-end">
      {!showNumberPages ||
      !countShowRows ||
      dataLength < minValueArrShowRowInList ? (
        <></>
      ) : (
        <>
          <span className="rbc-ml-3 rbc-content-center rbc-grid rbc-grid-cols-1">
            تعداد نمایش ردیف در صفحه
          </span>
          <select
            className="rbc-px-3 rbc-border rbc-rounded-lg rbc-bg-white"
            value={rowsPerPage}
            onChange={(e) =>
              setRowsPerPage && setRowsPerPage(parseInt(e.target.value))
            }
          >
            {countItem.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      )}
      {!showNumberPages ||
      !dataLength ||
      !rowsPerPage ||
      dataLength <= rowsPerPage ? (
        <></>
      ) : (
        <div className="rbc-flex rbc-justify-center rbc-mx-4">
          <span className="rbc-ml-3 rbc-content-center rbc-grid rbc-grid-cols-1">
            شماره صفحه
          </span>

          <ul className="rbc-pagination rbc-flex">
            <li>
              <button
                className="rbc-mx-2 rbc-h-10 rbc-w-10 rbc-grid rbc-content-center rbc-text-center rbc-rounded-xl rbc-cursor-pointer rbc-border hover:rbc-bg-primary-50"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <BsChevronRight className="rbc-mx-auto" />
              </button>
            </li>
            {Array(Math.ceil(dataLength / rowsPerPage))
              .fill(null)
              .map((_, index) => {
                if (!currentPage) return;

                if (
                  index === 0 ||
                  index === Math.ceil(dataLength / rowsPerPage) - 1 ||
                  (index >= currentPage - 2 && index <= currentPage)
                ) {
                  return (
                    <li
                      key={index}
                      className={`rbc-mx-2 rbc-h-10 rbc-w-10 rbc-grid rbc-content-center rbc-text-center rbc-rounded-xl rbc-cursor-pointer ${
                        index + 1 === currentPage
                          ? "rbc-bg-primary rbc-text-white"
                          : "rbc-border hover:rbc-bg-primary-50"
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </li>
                  );
                } else if (
                  index === currentPage - 3 ||
                  index === currentPage + 1
                ) {
                  return (
                    <li
                      key={index}
                      className="rbc-mx-2 rbc-h-10 rbc-w-10 rbc-grid rbc-content-center rbc-text-center rbc-rounded-xl rbc-cursor-pointer"
                    >
                      ...
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            <li>
              <button
                className="rbc-mx-2 rbc-h-10 rbc-w-10 rbc-grid rbc-content-center rbc-text-center rbc-rounded-xl rbc-cursor-pointer rbc-border hover:rbc-bg-primary-50"
                onClick={goToNextPage}
                disabled={currentPage === Math.ceil(dataLength / rowsPerPage)}
              >
                <BsChevronLeft className="rbc-mx-auto" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Pagination;
