import { Container } from "react-bootstrap";

import { useAuth } from "../../hooks/AuthProvider";

export default function Profile(props) {
  const { user } = useAuth();

  return (
    <div>
      <p>Profile Page</p>
      <p>Hello {JSON.stringify(user)}</p>
    </div>
  );
}
