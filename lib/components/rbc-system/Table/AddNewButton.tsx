import Button from "../../rbc-base/Button";

export default function AddNewButton({ children, onClick }) {
  return (
    <Button variant="primary" onClick={onClick}>
      {children}
    </Button>
  );
}
