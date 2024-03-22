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
        <Toast bg="info">
          <Toast.Header>
            <span><i className={alertIcon() + " fa-lg"} /></span>
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
