import {InputProps} from "./types/InputProps";

type Props = {
  errorMessage: InputProps['errorMessage'];
}

function InputErrorMessage({errorMessage}: Props) {
  return (
    <p className='rbc-text-red-500 rbc-h-4 rbc-text-xs rbc-font-medium'>
      {errorMessage || ''}
    </p>
  )
}

export default InputErrorMessage