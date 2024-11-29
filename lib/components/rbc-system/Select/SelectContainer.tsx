import {Combobox, ComboboxButton, Transition} from "@headlessui/react";
import Input from "../../rbc-react/formHook/components/Input/Input";
import {Fragment, Ref} from "react";
import {SelectProps} from ".";
import {Types} from "../../rbc-icons/rbc-types/types";
import {InputProps} from "../../rbc-react/formHook/components/Input/types/InputProps";
import {useEffect} from "react";
import SelectArrowAndCloseEndAdornment from "./SelectArrowAndCloseEndAdornment";

type Props = {
  children: Types["children"];
  buttonRef: Ref<HTMLButtonElement>;
  onBlur: () => void;
  inputOnClickHandler: () => void;
  setQuery?: (value: string) => void;
  justSelectOnClick?: boolean;
  value?: any;
  disable?: boolean;
  loading?: boolean;
  required?: InputProps["required"];
  multiSelect?: boolean;
  clearValue?: any;
} & Pick<SelectProps, "name" | "onChange" | "inputRef" | "inputProps"> &
  Pick<InputProps, "label" | "placeholder">;

function SelectContainer(
  {
    name, value, onChange, inputRef, inputProps, children, label, placeholder, buttonRef, onBlur, inputOnClickHandler,
    setQuery, justSelectOnClick, disable, loading, required, multiSelect, clearValue
  }: Props
) {

  useEffect(function () {
    const inputElement: HTMLInputElement | null = document.querySelector(`#${name}`)

    if (!inputElement?.value) return

    inputElement.value = String(value?.name || '')
  }, [value])

  return (
    <div className="rbc-w-full" style={{direction: "rtl"}}>
      <Combobox
        name={name}
        value={value!}
        onChange={onChange}
        disabled={Boolean(disable)}
      >
        {() => (
          <div className="rbc-relative">
            <ComboboxButton
              ref={buttonRef}
              className="rbc-absolute rbc-top-0 rbc-right-0"
            ></ComboboxButton>

            <Input
              name={name}
              required={Boolean(required)}
              // value={value?.name || ""}
              inputWrapperOnClick={inputOnClickHandler}
              inputRef={inputRef}
              onBlur={onBlur}
              {...(label && {label})}
              {...(placeholder && {placeholder})}
              {...(setQuery
                ? {onChange: (event) => setQuery!(event.target.value)}
                : {})}
              {...(setQuery && !justSelectOnClick
                ? {}
                : {justSelectOnClick: inputOnClickHandler})}
              wrapperClassName={{extra: "rbc-w-full"}}
              endAdornment={(
                <SelectArrowAndCloseEndAdornment
                  loading={Boolean(loading)} hasNotValue={value == undefined || (multiSelect ? value.length === 0 : value === "")}
                  clearValue={clearValue}
                />
              )}
              autoCompleteOff
              {...(inputProps || {})}
            />

            <Transition
              as={Fragment}
              leave="rbc-transition rbc-ease-in rbc-duration-100"
              leaveFrom="rbc-opacity-100"
              leaveTo="rbc-opacity-0"
              {...(setQuery ? {afterLeave: () => setQuery!("")} : {})}
            >
              <ComboboxButton
                className="rbc-absolute rbc-z-30 rbc-top-20 rbc-mt-1 rbc-max-h-80 rbc-w-full rbc-overflow-auto rbc-rounded-md rbc-bg-white rbc-p-2 rbc-text-base rbc-shadow-lg rbc-ring-1 rbc-ring-black rbc-ring-opacity-5 focus:rbc-outline-none sm:rbc-text-sm">
                {children}
              </ComboboxButton>
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
  );
}

export default SelectContainer;
