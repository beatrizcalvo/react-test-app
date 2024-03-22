import { useRef, useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

import Alert from "../../popups/Alert";

export default function CardProfile(props) {
  const [showAlert, setShowAlert] = useState(false);  
  const [alertConfig, setAlertConfig] = useState(undefined);
  const { id, profile } = props;
  const inputFileRef = useRef();

  // Alert config when upload file was success
  const alertSuccess = {
    variant: "success"
  };

  // Alert config when upload file has an error
  const alertError = {
    variant: "danger"
  };

  // Show file browser to select file
  const showFileSearching = () => inputFileRef.current.click();

  // Upload file to server
  const uploadFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 1 * 1000 * 1024) {
        setAlertConfig(alertError);
        setShowAlert(true);
        return false;
      }
      setAlertConfig(alertSuccess);
      setShowAlert(true);
    }
  };
  
  return (
    <>
      <Alert show={showAlert} setShow={setShowAlert} {...alertConfig} />
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
                onChange={() => uploadFile()}
              />
            </div>
          </Col>
          <Col sm="auto" className="col-8 my-auto">
            <div className="h-100">
              <h5 className="mb-1 font-weight-bolder">
                { profile.fullName }
              </h5>
              <p className="mb-0 font-weight-normal text-sm">
                { profile.typeDescription }
              </p>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
