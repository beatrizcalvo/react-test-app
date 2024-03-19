import { useAuth } from "../../hooks/AuthProvider";

export default function Home(props) {
  const { user } = useAuth();

  return (
    <div>
      <p>Home Page</p>
      <p>Hello {user}</p>
    </div>
  );
}
