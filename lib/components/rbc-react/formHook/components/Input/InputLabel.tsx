import {InputProps} from "./types/InputProps";

function InputLabel({label, name, required}: Pick<InputProps, 'label' | 'name' | 'required'>) {
  return (
    <label {...(name && {htmlFor: name})}>
      {label}
      {required && <span className='rbc-text-primary-red rbc-text-xs rbc-font-medium mr-1'>*</span>}
    </label>
  );
}

export default InputLabel