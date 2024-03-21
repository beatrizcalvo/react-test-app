import { useRef } from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function CardProfile(props) {
  const { id, profile } = props;
  const inputFileRef = useRef();

  // Show file browser to select file
  const showFileSearching = () => {
    
  };

  // Upload file to server
  const uploadFile = () => {
    
  };
  
  return (
    <>
      <Card.Body id={id} className="card">
        <Row className="justify-content-center justify-content-sm-start align-items-center px-2">
          <Col sm="auto" className="col-4">
            <div className="avatar avatar-xl position-relative">
              <img src={require("../../../assets/img/default_profile.jpg")} className="w-100 border-radius-lg shadow-sm">
                <span className="position-absolute top-100 start-100 translate-middle badge badge-circle bg-gradient-primary">
                  <i className="fa-solid fa-camera" />
                </span>
              </img>
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
