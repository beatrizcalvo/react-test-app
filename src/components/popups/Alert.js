import { ToastContainer, Toast } from "react-bootstrap";

export default function Alert(props) {
  const { show, variant } = props;
  
  return (
    <>
      <ToastContainer position="top-end">
        <Toast bg={variant} show={show} delay={3000} autohide>
          <Toast.Body>
            Prueba Alert
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
