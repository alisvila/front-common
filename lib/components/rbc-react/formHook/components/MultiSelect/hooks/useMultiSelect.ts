import useBaseMultiSelect from "./useBaseMultiSelect";
import {MultiSelectProps} from "../MultiSelect";
import {useMemo, useRef, useState} from "react";
import useSelectFilteredOptions from "../../../../../rbc-system/Select/hooks/useSelectFilteredOptions";
import useOutsideClicked from "../../../../hooks/useOutsideClicked";
import {SelectOptionType, SelectProps} from "../../../../../rbc-system/Select";

function useMultiSelect(
  {
    errorMessage, items, setItems, options, disabled, loading, tagsMode
  }: Pick<MultiSelectProps, 'errorMessage' | 'items' | 'setItems' | 'options' | 'disabled' | 'loading' | 'tagsMode'>
) {

  const dropDownCantBeOpened = useMemo(() => loading || disabled, [loading, disabled])

  const [extraOptions, setExtraOptions] = useState<SelectProps['options']>([])

  const [inputValue, setInputValue] = useState<string>('')

  const filteredOptions = useSelectFilteredOptions({
    options: [...options, ...extraOptions], tagsMode, query: inputValue
  })

  const {
    wrapperStyles, onRemoveHandler, onKeyDown, onChange
  } = useBaseMultiSelect({
    items, setItems, errorMessage, tagsMode, filteredOptions, inputValue, setInputValue, extraOptions, setExtraOptions,
    options, disabled
  })

  const [dropDownOpen, setDropDownOpen]  = useState<boolean>(false)

  const inputWrapperRef = useRef<HTMLDivElement | null>(null)

  useOutsideClicked(inputWrapperRef, () => setDropDownOpen(false))

  function toggleDropDown() {
    if (dropDownCantBeOpened) return
    setDropDownOpen(open => !open)
  }

  function onSelectOption(optionId:SelectOptionType['id']) {
    const optionIsSelected = items.find(option => option.id === optionId)

    let updatedItems: SelectOptionType[] = [];

    if (optionIsSelected) {
      updatedItems = items.filter(option => option.id !== optionId)
    } else {
      const optionObject = filteredOptions?.find(option => option.id === optionId)
      if (!optionObject) return

      updatedItems = [...items, optionObject]

      const currentOptionExistsInMainOptions = options.find(option => option.id === optionId)

      if (!currentOptionExistsInMainOptions) {
        setExtraOptions(prev => ([...prev, optionObject]))
      }
    }

    setInputValue('')
    setItems(updatedItems)
  }

  function onKeyDownHandler(e:any) {
    if (dropDownCantBeOpened) return
    onKeyDown(e)

    if (dropDownOpen) return
    setDropDownOpen(true)
  }

  return {
    wrapperStyles, onRemoveHandler, onKeyDownHandler, inputValue, onChange, setInputValue,
    inputWrapperRef, toggleDropDown, dropDownOpen, filteredOptions, onSelectOption
  }
}

export default useMultiSelect