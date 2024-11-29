// import joinObjectValues from "@/utils/joinObjectValues";
import { BadgeColorsType } from "./hooks/useBadgeStyles";

export type BadgeProps = {
  text: string;
  onClose?: (e: any) => void;
  color: BadgeColorsType;
  className?: string;
};

export default function Badge(props: BadgeProps) {

  function onClickHandler(e:any) {
    e.stopPropagation()
    if (props.onClose) {
      props?.onClose(e)
    }
  }

  return (
    <div
      className={`rbc-py-1 rbc-px-2 rbc-rounded-lg rbc-flex rbc-gap-1 rbc-justify-center rbc-items-center rbc-w-auto`}
    >
      {props.onClose && (
          <svg
            className='rbc-cursor-pointer'
            onClick={onClickHandler}
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.931603 0.646447C1.12686 0.451184 1.44345 0.451184 1.63871 0.646447L4.28516 3.29289L6.9316 0.646447C7.12686 0.451184 7.44345 0.451184 7.63871 0.646447C7.83397 0.841709 7.83397 1.15829 7.63871 1.35355L4.99226 4L7.63871 6.64645C7.83397 6.84171 7.83397 7.15829 7.63871 7.35355C7.44345 7.54882 7.12686 7.54882 6.9316 7.35355L4.28516 4.70711L1.63871 7.35355C1.44345 7.54882 1.12686 7.54882 0.931603 7.35355C0.736341 7.15829 0.736341 6.84171 0.931603 6.64645L3.57805 4L0.931603 1.35355C0.736341 1.15829 0.736341 0.841709 0.931603 0.646447Z"
              fill="#1A5F98"
            />
          </svg>
      )}
      {props.text}
    </div>
  );
}
