import joinObjectValues from "../../../../rbc-utils/joinObjectValues";
import {InputProps} from "./types/InputProps";
import useInputStyles from "./hooks/useInputStyles";
import InputLabel from "./InputLabel";
import InputErrorMessage from "./InputErrorMessage";
import InputEndAdornment from "./InputEndAdornment";


function Input(
  {
    name, label, placeholder, value, defaultValue, autoCompleteOff, type, inputMode, disabled, wrapperClassName,
    inputClassName, labelClassName, errorMessage, onChange, onBlur, onKeyDown, inputRef, endAdornment, startAdornment,
    hiddenErrorMessageElement, onClick, inputWrapperOnClick, justSelectOnClick, fileInput, endAdornmentAspect,
    labelEndAdornment, labelEndAdornmentOnClick, onKeyPress, rows, required, readOnly, endAdornmentClass,
    endAdornmentPadding,
  }: InputProps
) {

  const {
    wrapperStyles, inputStyles, labelStyles
  } = useInputStyles({
    wrapperClassName, inputClassName, labelClassName, errorMessage, startAdornment
  })

  const inputProps = {
    ...(name && {id: name}),
    ...(inputRef && {ref: inputRef}),
    ...(value != null ? {value} : {}),
    ...(autoCompleteOff && {autoComplete: "password"}),
    ...(defaultValue && {defaultValue}),
    ...onChange && {onChange},
    ...onClick && {onClick},
    ...rows && {rows},
    ...(justSelectOnClick || readOnly) && {readOnly: true},
    placeholder: placeholder || '',
    inputMode: inputMode || 'text',
    type: type || "text",
    disabled: Boolean(disabled),
    className: joinObjectValues(inputStyles),
    onBlur,
    onKeyDown,
    onKeyPress,
  }

  return (
    <div
      className={joinObjectValues(wrapperStyles)}>
      {label && (
        <div className={joinObjectValues(labelStyles)}>
          <InputLabel
            {...{label, name, required}}
          />

          {labelEndAdornment && (
            <button
              onClick={labelEndAdornmentOnClick}
              type='button' className='rbc-text-xs rbc-text-primary rbc-font-medium'
            >
              {labelEndAdornment}
            </button>
          )}
        </div>
      )}

      <div
        {...inputWrapperOnClick && {onClick: inputWrapperOnClick}}
        className='relative'
      >
        {startAdornment && (
          <div
            className={`flex items-center justify-center absolute right-0 inset-y-0 my-auto h-full p-2 w-12`}>
            {startAdornment}
          </div>
        )}

        {rows ? (
          <textarea {...inputProps} />
        ) : <input {...inputProps} />}

        {fileInput || null}

        {endAdornment && (
          <InputEndAdornment
            endAdornment={endAdornment} endAdornmentAspect={endAdornmentAspect} endAdornmentClass={endAdornmentClass}
            endAdornmentPadding={endAdornmentPadding}
          />
        )}

        {justSelectOnClick && (
          <div
            {...typeof justSelectOnClick === 'function' && {onClick: justSelectOnClick}} tabIndex={0}
            className={`rbc-w-full rbc-h-full rbc-absolute rbc-inset-0 rbc-cursor-pointer  rbc-border-1 rbc-rounded-lg rbc-duration-200 focus:rbc-border-primary/50
         ${errorMessage ? `rbc-border-red-500` : `rbc-border-gray-300 hover:rbc-border-gray-400 `}    `}/>
        )}
      </div>

      {!hiddenErrorMessageElement && (
        <InputErrorMessage errorMessage={errorMessage}/>
      )}
    </div>
  );
}

export default Input;