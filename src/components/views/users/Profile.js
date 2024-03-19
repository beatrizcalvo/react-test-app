import { Container } from "react-bootstrap";

import { useAuth } from "../../../hooks/AuthProvider";

export default function Profile(props) {
  const { user } = useAuth();

  return (
    <Container fluid className="px-2 px-md-4">
      <div className="page-header min-height-300 border-radius-xl mt-4" style={{background-image: require("../../assets/img/profile_header.png")}}>
      </div>
    </Container>
    <div>
      <p>Profile Page</p>
      <p>Hello {JSON.stringify(user)}</p>
    </div>
  );
}
