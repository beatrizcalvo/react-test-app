import { ToastContainer, Toast, Button } from "react-bootstrap";

export default function Alert(props) {
  const { show, setShow, variant, message } = props;

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
          delay={10000}
          onClose={() => setShow(false)}
        >
          <Toast.Body className="d-flex gap-3 text-white">
            <span><i className={alertIcon() + " fa-lg"} /></span>
            <div className="d-flex flex-grow-1 aling-items-center">
              <span>
                <strong>{ (variant === "danger") ? "ERROR!!" : "SUCCESS!!" }</strong>
                <p><small>{message}</small></p>
              </span>
              <Button 
                bsPrefix="btn-close" 
                className="text-white btn-close-sm ms-auto" 
                onClick={() => setShow(false)}
              >
                <i className="fa-solid fa-xmark"/>
              </Button>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
