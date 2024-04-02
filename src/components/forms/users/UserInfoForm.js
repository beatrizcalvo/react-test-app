import { Row, Col, Form } from "react-bootstrap";

export default function UserInfoForm(props) {
  const { user, readOnly } = props;
  
  return (
    <>
      <Form>
        <Row>
          <Col className="col-4">
            <Form.Group className="input-group input-group-static">
              <label className="font-weight-bold">First Name:</label>
              <Form.Control 
                type="text" 
                placeholder="First Name..."
                plaintext disabled defaultValue={user.firstName}
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
