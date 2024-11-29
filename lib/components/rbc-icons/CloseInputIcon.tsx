import { MdOutlineClose } from "react-icons/md";

type Props = {
  onClick?: (e:React.MouseEvent<SVGAElement>) => void
}

function CloseInputIcon({onClick}: Props) {
  return (
    <MdOutlineClose
      {...onClick && {onClick}}
      className="-rbc-rotate-90 text-gray-400 hover:text-gray-500 duration-200 cursor-pointer w-4 h-4"
    />
  );
}

export default CloseInputIcon;
