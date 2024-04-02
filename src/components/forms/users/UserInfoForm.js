import { Row, Col, Form } from "react-bootstrap";

export default function UserInfoForm(props) {
  const { user, readOnly } = props;
  
  return (
    <>
      <Form>
        <Row>
          <Col className="col-4">
            <Form.Group className="input-group input-group-static">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="First Name..."
                plaintext readOnly defaultValue={user.firstName}
              />
            </Form.Group>
          </Col>
          <Col className="col-4">
          </Col>
          <Col className="col-4">
          </Col>
        </Row>
      </Form>
    </>
  );
}
