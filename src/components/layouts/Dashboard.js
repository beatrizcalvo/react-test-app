import { useAuth } from "../../hooks/AuthProvider";

export default function Dashboard(props) {
  const { user } = useAuth();

  return (
    <div>
      <p>Hello {user}</p>
    </div>
  );
}
