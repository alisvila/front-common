import {Combobox} from '@headlessui/react'
import useSelect from "./hooks/useSelect";
import {InputProps} from "../../rbc-react/formHook/components/Input/types/InputProps";
import useSelectContainer from "./hooks/useSelectContainer";
import SelectContainer from "./SelectContainer";
import SelectItemOption from "./SelectItemOption";
import SelectEmptyState from "./SelectEmptyState";
import ScrollPagination from "../../rbc-react/ScrollPagination/ScrollPagination";
import {selectOptionsPerPage} from "./hooks/useGetSelectOptions";

const minimumOptionLengthThatShouldHaveSearch = 10

export type SelectOptionType = {
  id: any;
  name: number | string;
}

export type SelectProps = {
  name: string;
  options: SelectOptionType[];
  onChange: (e: React.ChangeEvent<any>) => void;
  value: SelectOptionType | '';
  inputProps?: Partial<InputProps>;
  onBlur?: InputProps['onBlur'];
  inputRef?: any;
  disable?: boolean
  loading?: boolean
  selectItemOnClick?: () => void;
  required?: InputProps['required'];
  onQuery?: (value: string) => void;
  alwaysShouldHavSearch?: boolean;
  fetchMoreOptions?: (page: number) => void;
  paginationLoading?: boolean;
  allCount?: number;
  currentPage?: number;
  havePagination?: boolean;
  getLabelForEachOption?: (item:any) => string;
  clearValue?: () => void
}

export function Select(
  {
    name, options, inputProps, onChange, value, onBlur, inputRef, disable, loading, selectItemOnClick, required,
    onQuery, alwaysShouldHavSearch, fetchMoreOptions, paginationLoading, allCount, currentPage, havePagination,
    getLabelForEachOption, clearValue
  }: SelectProps
) {

  const {
    query, setQuery, buttonRef, inputOnClickHandler
  } = useSelectContainer({onQuery})

  const {
    filteredOptions, setSelectedItemNameToInput
  } = useSelect({
    options, value, onBlur, name, query, havePagination, getLabelForEachOption
  })

  return (
    <SelectContainer
      name={name} onChange={onChange} {...value && {value}} inputRef={inputRef} inputProps={inputProps}
      buttonRef={buttonRef} inputOnClickHandler={inputOnClickHandler}
      onBlur={setSelectedItemNameToInput} setQuery={setQuery}
      justSelectOnClick={alwaysShouldHavSearch ? false : options?.length < minimumOptionLengthThatShouldHaveSearch}
      disable={Boolean(disable)} loading={Boolean(loading)} required={Boolean(required)}
      clearValue={clearValue}
    >
      <ScrollPagination
        allCount={allCount || 0} dataLength={allCount || 0} currentPage={currentPage || 1} rowsPerPage={selectOptionsPerPage}
        setPage={fetchMoreOptions} loading={Boolean(paginationLoading)}
      >
        {filteredOptions!.length === 0 && query !== '' ? (
          <SelectEmptyState/>
        ) : (
          filteredOptions!.map((item: SelectOptionType, index: number) => (
            <Combobox.Option
              key={index}
              value={item!}
            >
              {() => {
                const selected = value ? value?.id === item?.id : false
                return (
                  <SelectItemOption
                    selected={selected} label={getLabelForEachOption ? getLabelForEachOption(item) : String(item?.name)} onClick={selectItemOnClick}
                  />
                )
              }}
            </Combobox.Option>
          ))
        )}
      </ScrollPagination>
    </SelectContainer>
  )
}
