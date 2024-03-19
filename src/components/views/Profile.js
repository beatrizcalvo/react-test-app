import { Container } from "react-bootstrap";

import { useAuth } from "./AuthProvider";

export default function Profile(props) {
  const { user } = useAuth();
  
  return (
    <>
      <Container>
        { JSON.stringify(user) }
      </Container>
    </>
  );
}
