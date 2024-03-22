import { useRef, useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

import Alert from "../../popups/Alert";

const MAX_SIZE_MB = 1;

export default function CardProfile(props) {
  const [showAlert, setShowAlert] = useState(false);  
  const [alertConfig, setAlertConfig] = useState(undefined);
  
  const { id, profile } = props;
  const inputFileRef = useRef();

  // Show file browser to select file
  const showFileSearching = () => inputFileRef.current.click();

  // Upload file to server
  const uploadFile = (event) => {
    const fileToUpload = event.target.files[0];
    console.log(fileToUpload);
    if (fileToUpload.size > MAX_SIZE_MB * 1000 * 1024) {
      const errorMessage = "The file ${fileToUpload.name} is larger then ${MAX_SIZE_MB}Mb";
      setAlertConfig({variant: "danger", message: errorMessage});
      setShowAlert(true);
      return false;
    }
      setAlertConfig({variant: "success", message: event.target.files[0].fileName});
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
                onChange={(e) => uploadFile(e)}
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
