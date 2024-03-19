import { Container, Row, Col, Card } from "react-bootstrap";

import { useAuth } from "../../../hooks/AuthProvider";

export default function Profile(props) {
  const { user } = useAuth();

  return (
    <>
      <Row className="mb-5">
        <Col lg="3">
          <Card className="position-sticky top-1">
            
          </Card>
        </Col>
      </Row>
    </>
  );
}
