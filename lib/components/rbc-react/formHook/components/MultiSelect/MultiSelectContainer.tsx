import InputLabel from "../Input/InputLabel";
import joinObjectValues from "../../../../rbc-utils/joinObjectValues";
import Badge from "../../../../rbc-base/Badge/Badge";
import InputErrorMessage from "../Input/InputErrorMessage";
import {InputProps} from "../Input/types/InputProps";
import {SelectOptionType} from "../../../../rbc-system/Select";
import {Types} from "../../../../rbc-icons/rbc-types/types";
import SelectArrowAndCloseEndAdornment from "../../../../rbc-system/Select/SelectArrowAndCloseEndAdornment";
import InputEndAdornment from "../Input/InputEndAdornment";


type Props = {
  items: SelectOptionType[];
  setItems: (items: Props['items']) => void;
  wrapperStyles: Object;
  onRemoveHandler: (itemId: SelectOptionType['id']) => void;
  onKeyDown: (e: any) => void;
  inputValue: string;
  setInputValue: (e: any) => void;
  dropDownOnClick?: () => void;
  children: Types['children'];
  dropDownOpen: boolean;
  inputWrapperOnClick?: () => void;
  inputWrapperRef?: any;
  loading?: boolean;
} & Pick<InputProps, 'name' | 'label' | 'onBlur' | 'inputRef' | 'errorMessage' | 'placeholder' | 'required' | 'disabled'>

function MultiSelectContainer(
  {
    name, label, onBlur, inputRef, errorMessage, placeholder, items, setItems, wrapperStyles, onRemoveHandler,
    onKeyDown, inputValue, setInputValue, dropDownOnClick, children, dropDownOpen, inputWrapperOnClick,
    inputWrapperRef, loading, required, disabled
  }: Props) {
  return (
    <div className='rbc-flex rbc-flex-col rbc-gap-2'>
      <InputLabel {...{label, name, required}}/>

      <div
        {...inputWrapperRef && {ref: inputWrapperRef}}
        className={joinObjectValues(wrapperStyles)}>
        <div
          {...inputWrapperOnClick && {onClick: inputWrapperOnClick}}
          className='rbc-flex rbc-items-center rbc-flex-wrap rbc-w-full rbc-pl-8'
        >
          <div className='rbc-flex rbc-items-center rbc-flex-wrap rbc-w-full'>
            {items.map((tag: SelectOptionType) => (
              <div key={String(tag.id)} className='rbc-p-1'>
                <Badge
                  text={String(tag?.name) || ''} color='primary'
                  {...!disabled && {onClose: () => onRemoveHandler(tag.id)}}
                />
              </div>
            ))}

            <input
              {...{onKeyDown, value: inputValue, onChange: setInputValue, ref: inputRef, onBlur}}
              {...items.length === 0 ? {placeholder} : {}}
              className='rbc-outline-none rbc-flex-1 rbc-px-1 rbc-my-2'
            />
          </div>

          <InputEndAdornment
            endAdornment={disabled ? <></> : (
              <SelectArrowAndCloseEndAdornment
                loading={Boolean(loading)} hasNotValue={items?.length === 0} clearValue={() => setItems([])}
              />
            )}
            endAdornmentAspect='aspect-auto'
          />
        </div>

        <div
          {...dropDownOnClick && {onClick: dropDownOnClick}}
          style={{overflowY: 'auto'}}
          className={`
             rbc-absolute rbc-z-10 rbc-w-full rbc-p-2 rbc-bg-white rbc-shadow rbc-rounded-md rbc-truncate rbc-translate-y-full -rbc-bottom-1.5 rbc-right-0 rbc-left-0
             rbc-duration-200 rbc-origin-top rbc-max-rbc-h-80
             ${dropDownOnClick && 'rbc-cursor-pointer hover:rbc-bg-gray-50'} ${!dropDownOpen ? 'rbc-opacity-0 rbc-scale-[0.99] rbc-pointer-events-none' : ''}
           `}>
          {children}
        </div>
      </div>

      <InputErrorMessage errorMessage={errorMessage}/>
    </div>
  );
}

export default MultiSelectContainer