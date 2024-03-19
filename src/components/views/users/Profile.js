import { Container, Row } from "react-bootstrap";

import { useAuth } from "../../../hooks/AuthProvider";

export default function Profile(props) {
  const { user } = useAuth();

  return (
    <>
      <Row className="mb-5">
        <Col lg="3">
        </Col>
      </Row>
    </>
  );
}
