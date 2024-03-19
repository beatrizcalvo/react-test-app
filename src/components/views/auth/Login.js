import { Link } from "react-router-dom";

import { useAuth } from "../../../hooks/AuthProvider";
import LoginForm from "../../forms/LoginForm";

export default function Login(props) {
  const { loginUser } = useAuth();
  
  function handleLogin() {
    loginUser("aaa", "bbbb");
  };
  
  return (
    <>
      <div className="card card-plain">
        <div className="card-header text-center">
          <h4 className="font-weight-bolder">Sign In</h4>
          <p className="mb-0">Enter your email and password to sign in</p>
        </div>
        <div className="card-body mt-2">
          <LoginForm handleLogin={handleLogin} />
        </div>
        <div className="card-footer text-center pt-0 px-lg-2 px-1">
          <p className="mb-4 text-sm mx-auto">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary text-gradient font-weight-bold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
