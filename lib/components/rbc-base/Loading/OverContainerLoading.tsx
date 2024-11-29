import Loading from "./Loading";

type Props = {
  loading: boolean
}

function OverContainerLoading({loading}: Props) {
  return (
    <div className={`rbc-flex rbc-items-center rbc-justify-center rbc-absolute rbc-inset-0 rbc-w-full rbc-h-full rbc-bg-black/50 rbc-duration-200 ${loading ? '' : 'rbc-opacity-0 rbc-pointer-events-none'}`}>
      <Loading />
    </div>
  );
}

export default OverContainerLoading