import { Card, Row, Col, Form } from "react-bootstrap";

export default function CardProfile(props) {
  const { id, profile } = props;

  const uploadFile = (value) = {
    console.log(JSON.stringify(value));
  };
  
  return (
    <>
      <Card.Body id={id} className="card">
        <Row className="justify-content-center justify-content-lg-start align-items-center">
          <Col sm="auto" className="col-4">
            <div className="avatar avatar-xl position-relative">
              <img src={require("../../../assets/img/default_profile.jpg")} className="w-100 border-radius-lg shadow-sm" />
              <Form.Group className="position-absolute top-100 start-100 translate-middle badge badge-circle bg-gradient-primary">
                <Form.Control as="i" type="file" className="fa-solid fa-camera" onChange={uploadFile()} />
              </Form.Group>
            </div>
          </Col>
          <Col sm="auto" className="col-8 my-auto">
            <div className="h-100">
              <h5 class="mb-1 font-weight-bolder">
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
