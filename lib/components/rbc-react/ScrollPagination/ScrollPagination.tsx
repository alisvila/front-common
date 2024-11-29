import useScrollPagination from "../hooks/useScrollPagination";
import {ReactNode} from "react";
import Loading from "../../rbc-base/Loading/Loading";
import type { UseScrollPaginationProps } from "../hooks/useScrollPagination.type";

export const listItemCardClassName = 'list-item-card'

type Props = {
  children: ReactNode;
  fetchPrevPageInMobile?: () => void;
} & UseScrollPaginationProps

function ScrollPagination(
  {
    children, allCount, currentPage, rowsPerPage, setPage,
    loading, dataLength
  }: Props
) {

  const {
    showMoreElementRef, pagesCount
  } = useScrollPagination({
    allCount, rowsPerPage, currentPage, setPage, loading,
    dataLength
  })

  return (
    <>
      {children}

      <div className={`${dataLength ? `rbc-flex rbc-items-center rbc-justify-center ${currentPage < pagesCount && 'rbc-h-4'}` : 'rbc-h-auto'}`}>
        {(loading) && <Loading size='md' />}
      </div>

      <div ref={showMoreElementRef}></div>
    </>
  );
}

export default ScrollPagination;