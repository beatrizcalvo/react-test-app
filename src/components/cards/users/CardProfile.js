import { useRef } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

export default function CardProfile(props) {
  const { id, profile } = props;
  const inputFileRef = useRef();

  // Show file browser to select file
  const showFileSearching = () => inputFileRef.current.click();

  // Upload file to server
  const uploadFile = (event) => {
    alert("Carga");
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
                accept="image/*" 
                className="d-none"
                onChange={uploadFile}
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
