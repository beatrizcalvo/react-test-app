import { useRef, useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

import { useAuth } from "../../../hooks/providers/AuthProvider";
import { useAlerts } from "../../../hooks/providers/AlertsProvider";

export default function CardProfile(props) {
  const MAX_SIZE_MB = 1;

  const [isLoading, setIsLoading] = useState(false);      
  const { id } = props;
  const { user } = useAuth();
  const { addNewAlert } = useAlerts();
  const inputFileRef = useRef();

  // Show file browser to select file
  const showFileSearching = () => { if(!isLoading) inputFileRef.current.click() };

  // Upload file to server
  const uploadFile = (event) => {
    setIsLoading(true);
    const fileToUpload = event.target.files[0];
    
    // Check file size
    if (fileToUpload.size > MAX_SIZE_MB * 1000 * 1024) {
      const errorMessage = "The file " + fileToUpload.name + " is larger than " + MAX_SIZE_MB + "Mb";
      alert(errorMessage);
      setIsLoading(false);
      return false;
    }
    alert("OK");
    setIsLoading(false);
  };
  
  return (
    <>
      <Card.Body id={id} className="card">
        <Row className="justify-content-center justify-content-sm-start align-items-center px-2">
          <Col sm="auto" className="col-4">
            <div 
              className="avatar avatar-xl position-relative" 
              onClick={() => showFileSearching()}
            >
              <img src={require("../../../assets/img/default_profile.jpg")} className="w-100 border-radius-lg shadow-sm" />
              <span className="position-absolute top-100 start-100 translate-middle badge badge-circle bg-gradient-primary">
                <i className="fa-solid fa-camera" />
              </span>
              <Form.Control 
                ref={inputFileRef} 
                type="file" 
                accept=".jpg,.jpeg,.png" 
                className="d-none"
                onChange={(e) => uploadFile(e)}
              />
            </div>
          </Col>
          <Col sm="auto" className="col-8 my-auto">
            <div className="h-100">
              <h5 className="mb-1 font-weight-bolder">
                { user.fullName }
              </h5>
              <p className="mb-0 font-weight-normal text-sm">
                { user.typeDescription }
              </p>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
