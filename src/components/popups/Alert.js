import { ToastContainer, Toast } from "react-bootstrap";

export default function Alert(props) {
  const { show, setShow, variant } = props;

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
      <ToastContainer position="top-end">
        <Toast 
          bg={variant}
          show={show}
          autohide 
          delay={5000}
          onClose={() => setShow(false)}
        >
          <Toast.Body className="d-flex gap-4 text-white">
            <span><i className={alertIcon() + " fa-lg"} /></span>
            <div className="d-flex flex-grow-1 aling-items-center">
              <span className="fw-semibold">
                { (variant === "danger") ? "Error!! " : "Success!! " }
              </span>
              Hello, world! This is a toast message.
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
