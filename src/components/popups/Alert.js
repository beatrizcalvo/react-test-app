import { ToastContainer, Toast } from "react-bootstrap";

export default function Alert(props) {
  return (
    <>
      <ToastContainer position="top-end">
        <Toast>
          <Toast.Body>
            Prueba Alert
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
