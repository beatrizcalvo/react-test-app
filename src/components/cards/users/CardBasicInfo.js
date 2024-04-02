import { Card, Row, Col } from "react-bootstrap";

import UserInfoForm from "../../forms/users/UserInfoForm";

export default function CardBasicInfo(props) {
  const { id } = props;
  
  return (
    <>
      <Card id={id} className="mt-4">
        <Card.Header>
          <Row>
            <Col className="col-8">
              <h5>Basic Info</h5>
            </Col>
            <Col className="col-4 text-end">
              <i className="fas fa-user-edit text-secondary text-sm" />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="pt-0">
          <UserInfoForm />
        </Card.Body>
      </Card>
    </>
  );
}
