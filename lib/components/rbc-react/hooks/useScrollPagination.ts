import {useMemo} from "react";
import useCallFunctionAfterVisitingElement from "./useCallFunctionAfterVisitingElement";
import type { UseScrollPaginationProps } from "./useScrollPagination.type";

function useScrollPagination(
  {
    allCount, rowsPerPage, currentPage, setPage, loading, dataLength
  }: UseScrollPaginationProps
) {

  const pagesCount = useMemo(function () {
    console.log(allCount, rowsPerPage)
    return Math.ceil(allCount / rowsPerPage)
  }, [allCount, rowsPerPage])

  const showMoreElementRef = useCallFunctionAfterVisitingElement(function () {
    console.log(currentPage , pagesCount , loading)
    if (currentPage >= pagesCount || loading) return
    setPage(currentPage + 1)
  }, [currentPage, pagesCount, loading])

  const showFetchPrevPageElement = useMemo(function () {
    if (dataLength === 0 || !dataLength) return

    if (currentPage >= pagesCount) {
      return dataLength !== allCount
    }

    return ((dataLength !== currentPage * rowsPerPage))
  }, [allCount, dataLength, currentPage, pagesCount])

  return {
    showFetchPrevPageElement, showMoreElementRef, pagesCount
  }
}

export default useScrollPagination;