import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../utils/AuthProvider";
import LoginForm from "../../forms/LoginForm";
import AuthService from "../../../services/AuthService";

export default function Login(props) {
  const loginFormRef = useRef();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    const connectionError = "Cannot connect to the user registration server.";
    
    // Disabled all buttons
    loginFormRef.current.updateIsLoading(true);

    AuthService.loginUser(data.email, data.password)
      .then((response) => {
        if (response.data) {
          // If login success then redirect to dashboard home page
          navigate("/");
          window.location.reload();
        } else {
          loginFormRef.current.updateAlertMessage(connectionError);
          loginFormRef.current.updateIsLoading(false);
        }
      })
      .catch((error) => {
        let errorMessage =
          (error.response && 
            error.response.data && 
            (error.response.data.errors[0].message +
              " - " +
              error.response.data.errors[0].description)) || 
          connectionError
        loginFormRef.current.updateAlertMessage(errorMessage);
        loginFormRef.current.updateIsLoading(false);
      });
  };

  return (
    <>
      <div className="card card-plain">
        <div className="card-header text-center">
          <h4 className="font-weight-bolder">Sign In</h4>
          <p className="mb-0">Enter your email and password to sign in</p>
        </div>
        <div className="card-body mt-2">
          <LoginForm handleRegister={handleRegister} ref={loginFormRef} />
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
