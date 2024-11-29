import {AiOutlineCheck} from "react-icons/ai";
import { SelectItemOptionProps } from "./select.types";


function SelectItemOption({selected, label, onClick}: SelectItemOptionProps) {
  return (
    <div
      {...onClick && {onClick}}
      className='rbc-flex rbc-items-center rbc-relative rbc-cursor-pointer rbc-select-none rbc-py-2 rbc-pr-10 rbc-duration-200 rbc-rounded rbc-pl-4 rbc-text-gray-900 hover:rbc-bg-primary/10 hover:rbc-text-primary'>
        <span
          className={`rbc-block rbc-truncate ${
            selected ? 'rbc-font-medium' : 'rbc-font-normal'
          }`}
        >
          {label}
        </span>

        {selected ? (
          <span
            className={`rbc-absolute rbc-inset-y-0 rbc-right-0 rbc-flex rbc-items-center rbc-pr-3 rbc-text-primary`}
          >
            <AiOutlineCheck className="rbc-h-5 rbc-w-5" aria-hidden="true"/>
          </span>
        ) : null}
    </div>
  );
}

export default SelectItemOption