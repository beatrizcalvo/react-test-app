import { Link } from "react-router-dom";

import { useAuth } from "../../../hooks/AuthProvider";
import RegisterForm from "../../forms/RegisterForm";

export default function Register(props) {
  const { registerUser } = useAuth();

  const handleRegister = () => {
    registerUser();
  };

  return (
    <>
      <div className="card card-plain">
        <div className="card-header text-center">
          <h4 className="font-weight-bolder">Sign Up</h4>
          <p className="mb-0">Enter your email and password to register</p>
        </div>
        <div className="card-body mt-2">
          <RegisterForm handleRegister={handleRegister} />
        </div>
        <div className="card-footer text-center pt-0 px-lg-2 px-1">
          <p className="mb-4 text-sm mx-auto">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary text-gradient font-weight-bold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
