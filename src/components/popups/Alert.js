import { Toast, Button } from "react-bootstrap";

import { useAlerts } from "../../hooks/providers/AlertsProvider";

export default function Alert(props) {
  const { id, variant, message } = props;
  const { removeAlert } = useAlerts();

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
        autohide
        delay={10000} 
        onClose={() => removeAlert(id)}
      >
        <Toast.Body className="d-flex gap-2 text-white">
          <span><i className={alertIcon() + " fa-lg"} /></span>
          <div className="d-flex flex-grow-1 aling-items-center">
            <span>
              <strong>{ (variant === "danger") ? "ERROR!!" : "SUCCESS!!" }</strong>
              <br/>
              <span className="text-xs">{message}</span>
            </span>
            <Button 
              bsPrefix="btn-close" 
              className="text-white btn-close-sm ms-auto"
              onClick={() => removeAlert(id)}
            >
              <i className="fa-solid fa-xmark"/>
            </Button>
          </div>
        </Toast.Body>
      </Toast>
    </>
  );
}
