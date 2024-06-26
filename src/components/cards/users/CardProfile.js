import { useRef, useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

import { useAuth } from "../../../hooks/providers/AuthProvider";
import { useAlerts } from "../../../hooks/providers/AlertsProvider";

import LinkTooltip from "../../popups/LinkTooltip";

export default function CardProfile(props) {
  const MAX_SIZE_MB = 1;

  const [isLoading, setIsLoading] = useState(false);      
  const { id, isActionInProgress, setIsActionInProgress } = props;
  const { user } = useAuth();
  const { addNewAlert } = useAlerts();
  const inputFileRef = useRef();

  // Show file browser to select file
  const showFileSearching = () => { if(!isLoading && !isActionInProgress) inputFileRef.current.click() };

  // Upload file to server
  const uploadFile = (event) => {
    setIsActionInProgress(true);
    setIsLoading(true);
    const fileToUpload = event.target.files[0];

    // Check file size
    if (fileToUpload.size > MAX_SIZE_MB * 1000 * 1024) {
      const errorMessage = "The file " + fileToUpload.name + " is larger than " + MAX_SIZE_MB + "Mb";
      addNewAlert("danger", errorMessage);
      event.target.value = null;
      setIsActionInProgress(false);
      setIsLoading(false);
      return false;
    }

    alert("Upload file");
    event.target.value = null;
    setIsActionInProgress(false);
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
                <LinkTooltip id="upload-avatar" title="Upload Avatar" showTooltip={!isActionInProgress}>
                  <i className="fa-solid fa-camera" />
                </LinkTooltip>             
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
                { user.person.personName.fullName }
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
