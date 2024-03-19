import { Card } from "react-bootstrap";

export default function CardProfile(props) {
  const { id, profile } = props;
  
  return (
    <>
      <Card.Body id={id}>
      </Card.Body>
    </>
  );
}
