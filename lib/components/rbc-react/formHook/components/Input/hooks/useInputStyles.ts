import {InputProps} from "../types/InputProps";

function useInputStyles(
  {
    wrapperClassName, errorMessage, inputClassName, labelClassName, startAdornment
  }: Pick<InputProps, 'wrapperClassName' | 'errorMessage' | 'inputClassName' | 'labelClassName' | 'startAdornment'>
) {

  const wrapperStyles = {
    default: "rbc-flex rbc-flex-col rbc-gap-2 rbc-text-base rbc-text-custom-black rbc-mb-2",
    ...wrapperClassName,
  };

  const inputStyles = {
    default: ` ${
      errorMessage ? `rbc-border-red-500` : `rbc-border-gray-300 hover:rbc-border-gray-400 focus:rbc-border-primary/50`
    } rbc-outline-none rbc-block w-full rbc-rounded-lg rbc-border-1 rbc-appearance-none rbc-duration-200`,
    fontSize: `rbc-text-sm`,
    padding: `${startAdornment ? 'rbc-pl-4 rbc-pr-12' : 'rbc-px-4'} rbc-py-3`,
    ...inputClassName,
  };

  const labelStyles = {
    default: 'rbc-flex rbc-items-center rbc-justify-between',
    ...labelClassName,
  };

  return {
    wrapperStyles, inputStyles, labelStyles
  }
}

export default useInputStyles;