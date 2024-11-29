import { useController, useFormContext } from "react-hook-form";
import {Select, SelectOptionType, SelectProps} from ".";
import { FormInputProps } from "../../rbc-icons/rbc-types/FormInputProps";
import React, { forwardRef, useImperativeHandle } from "react";
import useGetSelectOptions from "./hooks/useGetSelectOptions";

export type SelectFormProps = {
  options?: SelectOptionType[];
  apiAddress?: string;
  disable?: boolean;
  selectItemOnClick?: () => void;
  alwaysShouldHavSearch?: SelectProps['alwaysShouldHavSearch'];
  havePagination?: boolean;
  getLabelForEachOption?: SelectProps['getLabelForEachOption'];
} & FormInputProps;

export type SelectFormRefType = {
  fetchOptions: () => void;
};

const SelectForm: React.ForwardRefRenderFunction<
  SelectFormRefType,
  SelectFormProps
> = (
  {
    options,
    rules,
    fieldName,
    inputProps,
    apiAddress,
    disable,
    selectItemOnClick,
    alwaysShouldHavSearch,
    havePagination,
    getLabelForEachOption
  }: SelectFormProps,
  ref
) => {
  const { control } = useFormContext();

  const {
    field: { onChange, onBlur, name, value, ref: hookRef },
  } = useController({
    name: fieldName,
    control,
    rules,
    defaultValue: "",
  })

  const {
    loading, options: selectOptions, fetchOptions, fetchMoreOptions, paginationLoading, allCount, currentPage, onQuery
  } = useGetSelectOptions({ url: apiAddress, defaultOptions: options, havePagination });

  useImperativeHandle(ref, () => ({
    fetchOptions,
  }))

  return (
    <Select
      onBlur={onBlur}
      name={name}
      options={options?.length ? (options || selectOptions) :  selectOptions}
      onChange={onChange}
      value={value}
      inputRef={hookRef}
      disable={Boolean(disable)}
      loading={loading}
      {...(inputProps ? { inputProps } : {})}
      selectItemOnClick={selectItemOnClick}
      required={rules.required}
      alwaysShouldHavSearch={Boolean(alwaysShouldHavSearch)}
      fetchMoreOptions={fetchMoreOptions}
      paginationLoading={paginationLoading}
      allCount={allCount}
      currentPage={currentPage}
      havePagination={havePagination}
      getLabelForEachOption={getLabelForEachOption}
      {...onQuery && {onQuery}}
    />
  );
};

export default forwardRef(SelectForm);
