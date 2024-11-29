import Loading from "../../rbc-base/Loading/Loading";
import SelectArrowIcon from "../../rbc-icons/SelectArrowIcon";
import CloseInputIcon from "../../rbc-icons/CloseInputIcon";


type Props = {
  loading: boolean,
  hasNotValue: boolean,
  clearValue: () => void;
}

function SelectArrowAndCloseEndAdornment({loading, hasNotValue, clearValue}: Props) {
  return (
      loading && <Loading size="sm"/>
    ) || (
      (hasNotValue) && (
        <SelectArrowIcon />
      )
    )
    ||
    (
      <div
        className="rbc-flex rbc-items-center rbc-cursor-pointer rbc-z-20 rbc-w-full rbc-h-full"
        onClick={(e) => {
          e.stopPropagation()
          clearValue();
        }}
      >
        <CloseInputIcon/>
      </div>
    )
}

export default SelectArrowAndCloseEndAdornment