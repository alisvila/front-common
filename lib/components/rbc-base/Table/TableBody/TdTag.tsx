import { FC } from "react";
import BadgesGroup from "../../Badge/BadgeGroup";
import {SelectOptionType} from "../../../rbc-system/Select";

interface Props {
  data: SelectOptionType[];
}

const TdTag: FC<Props> = ({ data }) => {
  
  return (
    <div className="rbc-flex rbc-gap-[10px]">
      <BadgesGroup text={data.slice(0, 3)} color="primary"/>
      {data.length > 3 && <span >...</span>}
    </div>
   
  );
};

export default TdTag;
