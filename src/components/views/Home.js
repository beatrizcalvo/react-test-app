import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/AuthProvider";

export default function Home(props) {
  const { user } = useAuth();

  return (
    <div>
      <p>Home Page</p>
      <p>Hello {user}</p>
      <Link to="/profile">Profile</Link>
    </div>
  );
}
