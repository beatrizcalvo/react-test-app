import { useAuth } from "../../../hooks/AuthProvider";

export default function Login(props) {
  const { login } = useAuth();
  
  function handleSubmit(event) {
    event.preventDefault();
    login("aaa", "bbbb");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <label htmlFor="email">
        Email
        <input id="email" name="email" />
      </label>

      <label htmlFor="password">
        Password
        <input id="password" name="password" type="password" />
      </label>

      <button type="submit">
        Submit
      </button>
    </form>
  );
}
