import { Card, Row, Col, Form, Button } from "react-bootstrap";

export default function CardProfile(props) {
  const { id, profile } = props;
  
  return (
    <>
      <Card.Body id={id} className="card">
        <Row className="justify-content-center justify-content-lg-start align-items-center">
          <Col sm="auto" className="col-4">
            <div className="avatar avatar-xl position-relative">
              <img src={require("../../../assets/img/default_profile.jpg")} className="w-100 border-radius-lg shadow-sm" />
              <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
              <Form>
                <Form.Control type="file" className="d-none" />
                <Button type="submit" className="position-absolute top-100 start-100 translate-middle badge badge-circle bg-gradient-primary">                
                  <i className="fa-solid fa-camera" />
                </Button>
              </Form>
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
