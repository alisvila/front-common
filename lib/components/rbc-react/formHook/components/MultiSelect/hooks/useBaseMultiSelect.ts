import useInputStyles from "../../Input/hooks/useInputStyles";
import {SelectOptionType} from "../../../../../rbc-system/Select";
import {InputProps} from "../../Input/types/InputProps";
import {MultiSelectProps} from "../MultiSelect";
import {SetStateType} from "../../../../../rbc-icons/rbc-types/SetStateType";


type Props = {
  items: SelectOptionType[];
  setItems: (items: Props['items']) => void;
  onKeyDownExtraAction?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  tagsMode?: MultiSelectProps["tagsMode"];
  filteredOptions?: MultiSelectProps["options"];
  inputValue: string;
  setInputValue: SetStateType<string>;
  options: MultiSelectProps['options'];
  extraOptions: MultiSelectProps['options'];
  setExtraOptions: SetStateType<MultiSelectProps['options']>;
} & Pick<InputProps, 'errorMessage' | 'disabled'>

function useBaseMultiSelect(
  {
    items, setItems, errorMessage, onKeyDownExtraAction, tagsMode, filteredOptions = [], inputValue, setInputValue,
    options, extraOptions, setExtraOptions, disabled
  }: Props
) {

  const {inputStyles} = useInputStyles({errorMessage})

  const wrapperStyles = {
    'initial': `rbc-bg-white rbc-min-h-[46px] rbc-flex rbc-items-center rbc-relative ${disabled ? 'rbc-pointer-events-none' : ''}`,
    ...inputStyles,
    padding: 'rbc-py-0.5 rbc-px-4'
  }

  function addInputValueToItemsList() {
    const value = inputValue?.trim()
    if (value == '') return

    const foundOption = filteredOptions?.find(item => item.name === value)
    const foundOptionInItems = items?.find(item => item.name === value)

    if (!foundOption || foundOptionInItems) return

    const itemsInstance = [...items, foundOption]
    setItems(itemsInstance)
    setInputValue('')

    const currentOptionExistsInMainOptions = options.find(option => option.id === foundOption.id)

    if (!currentOptionExistsInMainOptions) {
      setExtraOptions(prev => ([...prev, foundOption]))
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const keyCode = Number(e.code)

    const isBackspaceKey = keyCode === 8
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = e.target.value?.trim()
    const isValidValue = value !== ''

    if (isBackspaceKey && !isValidValue) {
      const idOfLastIndex = items[items.length - 1]?.id
      onRemoveHandler(idOfLastIndex)
      setInputValue('')
    }

    const isEnterKey = keyCode === 13
    if (isEnterKey && isValidValue && tagsMode) {
      addInputValueToItemsList()
      e.preventDefault()
    }

    if (onKeyDownExtraAction) {
      onKeyDownExtraAction(e)
    }
  }

  function onRemoveHandler(tagId: SelectOptionType['id']) {
    const tagsInstance = items.filter(item => item.id !== tagId)
    setItems(tagsInstance)

    const isExistsInExtraOptions = extraOptions?.find(item => item.id === tagId)
    if (!isExistsInExtraOptions) return
    setExtraOptions(prev => {
      const filtered = prev?.filter(item => item.id !== tagId)
      return filtered
    })
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  return {
    wrapperStyles, onRemoveHandler, onKeyDown, inputValue, setInputValue, onChange, extraOptions, setExtraOptions
  }
}

export default useBaseMultiSelect