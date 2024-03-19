export default function LoginForm(props) {
  const { handleLogin } = props;
  
  return (
    <form onSubmit={handleLogin}>
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
