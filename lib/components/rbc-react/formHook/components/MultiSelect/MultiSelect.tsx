import useMultiSelect from "./hooks/useMultiSelect";
import {SelectProps} from "../../../../rbc-system/Select";
import {InputProps} from "../Input/types/InputProps";
import MultiSelectContainer from "./MultiSelectContainer";
import SelectItemOption from "../../../../rbc-system/Select/SelectItemOption";
import SelectEmptyState from "../../../../rbc-system/Select/SelectEmptyState";

export type MultiSelectProps = {
  items: SelectProps['options'],
  setItems: (items: MultiSelectProps['items']) => void;
  options: SelectProps['options'];
  loading?: boolean;
  tagsMode?: boolean
} & Pick<InputProps, 'name' | 'label' | 'onBlur' | 'inputRef' | 'errorMessage' | 'placeholder' | 'disabled' | 'required'>

function MultiSelect(
  {
    name, label, onBlur, inputRef, errorMessage, placeholder, items, setItems, options, loading, disabled, required,
    tagsMode
  }: MultiSelectProps
) {

  const {
    wrapperStyles, onRemoveHandler, onKeyDownHandler, inputValue, onChange,
    inputWrapperRef, toggleDropDown, dropDownOpen, filteredOptions, onSelectOption
  } = useMultiSelect({
    errorMessage, items, setItems, options, disabled, loading, tagsMode
  })

  return (
    <MultiSelectContainer
      items={items} setItems={setItems} wrapperStyles={wrapperStyles} onRemoveHandler={onRemoveHandler}
      onKeyDown={onKeyDownHandler} disabled={disabled}
      inputValue={inputValue} setInputValue={onChange} inputWrapperRef={inputWrapperRef}
      inputWrapperOnClick={toggleDropDown}
      {...label && {label}} {...name && {name}} {...onBlur && {onBlur}} inputRef={inputRef}
      {...errorMessage && {errorMessage}} {...placeholder && {placeholder}} dropDownOpen={dropDownOpen}
      {...loading != undefined && {loading: Boolean(loading)}} required={Boolean(required)}
    >
      <>
        {filteredOptions?.length === 0 ? <SelectEmptyState text={(inputValue === '' && tagsMode) ? 'برای افزودن تگ تایپ کنید' : ''}/> : filteredOptions && filteredOptions.map(option => {

          const isSelected = items.find(item => item.id === option.id)

          return (
            <SelectItemOption
              key={option.id} selected={Boolean(isSelected)} label={String(option.name)}
              onClick={() => onSelectOption(option?.id)}
            />
          )
        })}
      </>
    </MultiSelectContainer>
  );
}

export default MultiSelect