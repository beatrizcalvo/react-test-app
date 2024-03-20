import { Card, Row, Col } from "react-bootstrap";

export default function CardProfile(props) {
  const { id, profile } = props;
  
  return (
    <>
      <Card.Body id={id}>
        <Row className="justify-content-center align-items-center">
          <Col sm="auto" className="col-4">
            <div className="avatar avatar-xl position-relative">
              <img src={require("../../assets/img/logo-ct.png")} className="w-100 rounded-circle shadow-sm" />
              <span className="position-absolute top-100 start-100 translate-middle p-2 bg-primary border border-light rounded-circle">
                <i className="fa-solid fa-camera"/>
              </span>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
