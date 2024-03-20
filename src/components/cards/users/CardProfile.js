import { Card, Row, Col } from "react-bootstrap";

export default function CardProfile(props) {
  const { id, profile } = props;
  
  return (
    <>
      <Card.Body id={id} className="card">
        <Row className="justify-content-center align-items-center">
          <Col sm="auto" className="col-4">
            <div className="avatar avatar-xl position-relative">
              <img src={require("../../../assets/img/default_profile.jpg")} className="w-100 rounded-circle shadow-sm" />
              <span className="position-absolute top-100 start-100 translate-middle bg-primary p-3 border border-light rounded-circle fs-6">
                <i className="fa-solid fa-camera"/>
              </span>
            </div>
          </Col>
          <Col sm="auto" className="col-8 my-auto">
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
