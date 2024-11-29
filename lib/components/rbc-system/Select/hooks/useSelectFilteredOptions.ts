import {useMemo} from "react";
import {UseSelectProps} from "./useSelect";
import { MultiSelectProps } from "../../../rbc-react/formHook/components/MultiSelect/MultiSelect";

function useSelectFilteredOptions(
  {query, options, tagsMode, havePagination}: Pick<UseSelectProps, 'query' | 'options' | 'havePagination'> & Pick<MultiSelectProps, 'tagsMode'>
) {

  const filteredOptions = useMemo(function () {

    if (query === '' || havePagination) return options

    const filtered = options!.filter((person) =>
      String(person.name).toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, ''))
    ) || []

    if (!tagsMode) return filtered

    const foundItem = options!.find((item:any) => item.name === query)

    return [
      ...foundItem ? [] : [{id: new Date().getTime(), name: query}],
      ...filtered
    ]

  }, [query, options])

  return filteredOptions
}

export default useSelectFilteredOptions