import {useEffect} from "react";
import {SelectProps} from "..";
import useSelectFilteredOptions from "./useSelectFilteredOptions";


export type UseSelectProps = {
  query: string;
  havePagination?: boolean;
} & Partial<SelectProps>

function useSelect({name, options, value, onBlur, query, havePagination, getLabelForEachOption}: UseSelectProps) {

  useEffect(function () {
    setSelectedItemNameToInput()
  }, [value, name])

  function setSelectedItemNameToInput() {
    if (onBlur) {
      onBlur()
    }

    if (!name) return
    const inputElement:any = document.getElementById(name)

    if (!inputElement || inputElement?.value == undefined || !value) return
    inputElement.value = String(getLabelForEachOption ? getLabelForEachOption(value) : value?.name || '')
  }

  const filteredOptions = useSelectFilteredOptions({query, options, havePagination})

  return {
    filteredOptions, setSelectedItemNameToInput
  }
}

export default useSelect;