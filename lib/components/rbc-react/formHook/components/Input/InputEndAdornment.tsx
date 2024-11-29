import {InputProps} from "./types/InputProps";


type Props = {
  endAdornmentAspect?: InputProps['endAdornmentAspect'],
  endAdornmentClass?: InputProps['endAdornmentClass'],
  endAdornmentPadding?: InputProps['endAdornmentPadding'],
  endAdornment: InputProps['endAdornment'],
}

function InputEndAdornment(
  {
    endAdornmentAspect, endAdornmentClass, endAdornment, endAdornmentPadding
  }: Props
) {
  return (
    <div
      className={`rbc-flex rbc-items-center rbc-absolute rbc-left-0 rbc-inset-y-0 rbc-my-auto rbc-h-full ${endAdornmentAspect || 'rbc-aspect-square'} ${endAdornmentPadding || 'rbc-py-2.5 rbc-px-4'} ${endAdornmentClass || ''}`}>
      {endAdornment}
    </div>
  );
}

export default InputEndAdornment