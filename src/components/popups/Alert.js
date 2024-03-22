import { ToastContainer, Toast } from "react-bootstrap";

export default function Alert(props) {
  const { show, setShow, variant } = props;

  const alertIcon = () => {
    switch(variant) {
      case "danger":
        return "fa-solid fa-circle-exclamation";
      case "success":
        return "fa-solid fa-circle-check";
      default:
        return "fa-solid fa-thumbs-up";
    }
  };
  
  return (
    <>
      <ToastContainer position="top-end">
        <Toast 
          bg={variant}
          autohide 
          delay={5000}
        >
          <Toast.Body className="d-flex gap-4 text-white">
            <span><i className={alertIcon() + " fa-lg"} /></span>
            Hello, world! This is a toast message.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
