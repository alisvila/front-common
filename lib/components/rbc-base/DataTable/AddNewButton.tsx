
export default function AddNewButton({children, onClick}) {
  return (
    <button
      onClick={onClick}
      className="rbc-px-4 rbc-py-2 rbc-bg-blue-600 rbc-text-white rbc-rounded-lg hover:rbc-bg-blue-700 focus:rbc-outline-none focus:rbc-ring-2 focus:rbc-ring-blue-500 focus:rbc-ring-offset-2 rbc-transition-all rbc-duration-200"
    >
      {children}
    </button>
  );
}
