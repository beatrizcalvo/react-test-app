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
        <Toast bg={variant} show={show} delay={5000} autohide onClose={() => setShow(false)}>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" />
          </Toast.Header>
          <Toast.Body>
            <div className="d-flex gap-4 text-white">
              <span><i className={alertIcon() + " fa-lg"} /></span>
              <div className="d-flex flex-grow-1 aling-items-center">
                <span className="fw-semibold">Prueba Alert</span>
              </div>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
