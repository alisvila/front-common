import {UseFormGetValues} from "react-hook-form";


type Props = {
  getValues: UseFormGetValues<any>;
  index?: number;
}

function rerenderReactHookForm({getValues, index}: Props) {
  const values = getValues()
  const firstItem = Object.keys(values)[index || 0]
  document.getElementById(firstItem)?.focus()
  setTimeout(function () {
    document.getElementById(firstItem)?.blur()
  }, 100)
}

export default rerenderReactHookForm