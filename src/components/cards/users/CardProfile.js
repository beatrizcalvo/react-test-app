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
            </div>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
