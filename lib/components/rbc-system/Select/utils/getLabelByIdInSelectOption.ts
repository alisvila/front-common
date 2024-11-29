import {SelectOptionType} from "..";

type Props = {
  id: SelectOptionType['id'];
  options: SelectOptionType[];
}

function getLabelByIdInSelectOption({id, options}: Props) {
  return String(options.find(option => option.id == id)?.name || '')
}

export default getLabelByIdInSelectOption