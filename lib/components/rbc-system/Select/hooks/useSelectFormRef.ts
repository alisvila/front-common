import {useRef} from "react";
import {SelectFormRefType} from "../SelectForm";

function useSelectFormRef() {
  const selectFormRef = useRef<SelectFormRefType | null>(null);

  return selectFormRef
}

export default useSelectFormRef