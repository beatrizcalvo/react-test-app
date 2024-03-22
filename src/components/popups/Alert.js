import { useState } from "react";
import { ToastContainer, Toast } from "react-bootstrap";

export default function Alert(props) {
  const { show, variant } = props;
  const [showAlert, setShowAlert] = useState(show);
  
  return (
    <>
      <ToastContainer position="top-end">
        <Toast bg={variant} show={showAlert} delay={3000} autohide onClose={() => setShowAlert(false)}>
          <Toast.Body>
            <div className="d-flex gap-4">
              <span><i className="fa-solid fa-circle-check fa-lg" /></span>
              <div className="d-flex flex-grow-1 aling-items-center">
                Prueba Alert
              </div>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
