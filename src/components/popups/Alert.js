import { ToastContainer, Toast, Button } from "react-bootstrap";

export default function Alert(props) {
  const { show, setShow, variant } = props;
  
  return (
    <>
      <ToastContainer position="top-end" className="px-1">
        <Toast bg={variant} show={show} delay={3000} autohide onClose={() => setShow(false)}>
          <Toast.Header />
          <Toast.Body>
            <div className="d-flex gap-4 text-white">
              
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
