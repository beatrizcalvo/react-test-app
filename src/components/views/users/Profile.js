import { Container, Row, Col, Card, Nav } from "react-bootstrap";

import { useAuth } from "../../../hooks/AuthProvider";

export default function Profile(props) {
  const { user } = useAuth();

  return (
    <>
      <Row className="mb-5">
        <Col lg="3">
          <Card className="position-sticky top-1">
            <Nav as="ul" className="flex-column bg-white border-radius-lg p-3">
              <Nav.Item></Nav.Item>
            </Nav>
          </Card>
        </Col>
      </Row>
    </>
  );
}
