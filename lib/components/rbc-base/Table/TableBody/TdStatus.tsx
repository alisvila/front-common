import { FC } from "react";
import Badge from "../../Badge/Badge";

interface Props {
  data: any;
  trueLabel: string;
  falseLabel: string
}

const TdStatus: FC<Props> = ({ data, trueLabel,  falseLabel}) => {
  return (data === true || data === false) ? (
    <Badge text={data ? trueLabel: falseLabel} color={data? 'green': 'red'} />
  ) : <>-</>;
};

export default TdStatus;
