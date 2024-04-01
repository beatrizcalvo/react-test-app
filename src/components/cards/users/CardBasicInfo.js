import { Card } from "react-bootstrap";

export default function CardBasicInfo(props) {
  const { id } = props;
  
  return (
    <>
      <Card id={id} className="mt-4">
        <Card.Header>
          <h5>Basic Info</h5>
        </Card.Header>
        <Card.Body className="pt-0">
        </Card.Body>
      </Card>
    </>
  );
}
