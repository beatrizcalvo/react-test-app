import { Card, Row } from "react-bootstrap";

export default function CardBasicInfo(props) {
  const { id } = props;
  
  return (
    <>
      <Card id={id} className="mt-4">
        <Card.Header>
          <h5>Basic Info</h5>
          <i className="fas fa-user-edit text-secondary text-sm" />
        </Card.Header>
        <Card.Body className="pt-0">
          <Row>
            
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
