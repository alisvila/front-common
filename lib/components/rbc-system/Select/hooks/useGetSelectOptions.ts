import {useEffect, useMemo, useState} from "react";
// import {SelectOptionType} from "@/components/Form/Select/Select";
import useCallFuncWithDelayAfterOnChange from "../../../rbc-react/hooks/useCallFuncByDelayAfterOnChange";
import useAxios from "@lib/components/rbc-react/hooks/useAxios";


export const selectOptionsPerPage = 20

type Props = {
  url?: string;
  defaultOptions?: any;
  shouldJsonParsed?: boolean;
  havePagination?: boolean;
}

function useGetSelectOptions({url, defaultOptions, shouldJsonParsed, havePagination}: Props) {
  const [options, setSelectOptions] = useState<any>(defaultOptions || []);
  const [loading, setLoading] = useState<boolean>(false)
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  const [optionsResponse, getOptions] = useAxios()

  const allCount = useMemo(() => optionsResponse?.data?.count, [optionsResponse])

  const onQuery = useCallFuncWithDelayAfterOnChange({
    callAfterTypingHandler: setSearchFilter, time: 1000
  })

  const fetchOptions = async () => {
    if (!url) return;
    const isFirstPage = currentPage === 1
    if (isFirstPage) {
      setSelectOptions([])
    }
    setLoading(true);

    const params = {
      ...havePagination && {
        "count_per_page": selectOptionsPerPage,
        "page": currentPage,
        search: searchValue
      }
    }

    const res = await getOptions({url, params});
    const data = shouldJsonParsed ? JSON.parse(res.data) : res.data || [];

    setSelectOptions((prev:any) => shouldJsonParsed ? data : [...isFirstPage ? [] : prev, ...data]);
    setLoading(false)
    setPaginationLoading(false)
  }

  function fetchMoreOptions(page: number) {
    if (!allCount) return
    setPaginationLoading(true)
    setCurrentPage(page)
  }

  function setSearchFilter(value: string) {
    setCurrentPage(1)
    setSearchValue(value)
  }


  useEffect(() => {
    fetchOptions().then()
  }, [url, currentPage, searchValue]);

  return {
    loading, options, fetchOptions, fetchMoreOptions, paginationLoading, allCount, currentPage, onQuery: havePagination && onQuery
  };
}

export default useGetSelectOptions;
