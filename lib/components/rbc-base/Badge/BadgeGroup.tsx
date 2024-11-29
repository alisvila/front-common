import { BadgeColorsType } from "./hooks/useBadgeStyles";
import Badge from "./Badge";
import {SelectOptionType} from "../../rbc-system/Select";

type Props = {
  text: SelectOptionType[];
  color: BadgeColorsType;
  className?: string;
  flexWrap?: boolean;
};

function BadgesGroup({ text, color, className, flexWrap }: Props) {
  return (
    <div className={`${flexWrap && 'rbc-flex-wrap'} rbc-flex rbc-gap-[10px]`}>
      {text.length === 0 || text === null ? '-' : text.map((item, index) => {
        if(!item.name) return '-'
        return (
         
            <Badge
              text={String(item.name)}
              key={index}
              color={color}
              {...className && {className}}
            />
          
        );
      })}
    </div>
  );
}

export default BadgesGroup;
