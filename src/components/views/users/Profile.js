import { Container } from "react-bootstrap";

import { useAuth } from "../../../hooks/AuthProvider";

export default function Profile(props) {
  const { user } = useAuth();

  return (
    <Container fluid className="px-2 px-md-4">
    </Container>
    <div>
      <p>Profile Page</p>
      <p>Hello {JSON.stringify(user)}</p>
    </div>
  );
}
