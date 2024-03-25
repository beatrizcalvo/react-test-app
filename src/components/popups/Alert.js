import { Toast } from "react-bootstrap";

export default function Alert(props) {
  const { variant, message } = props;

  // Get icon depending on variant value
  const alertIcon = () => {
    switch(variant) {
      case "danger":
        return "fa-solid fa-circle-exclamation";
      default:
        return "fa-solid fa-circle-check";
    }
  };
  
  return (
    <>
      <Toast 
        bg={variant}
      >
        <Toast.Body className="d-flex gap-3 text-white">
          <span><i className={alertIcon() + " fa-lg"} /></span>
          <div className="d-flex flex-grow-1 aling-items-center">
            <span>
              <strong>{ (variant === "danger") ? "ERROR!!" : "SUCCESS!!" }</strong>
              <p className="text-xs">{message}</p>
            </span>
          </div>
        </Toast.Body>
      </Toast>
    </>
  );
}
