import { useRef } from "react";
import { Link } from "react-router-dom";

import RegisterForm from "../../forms/RegisterForm";
import { useAuth } from "../../../utils/AuthProvider";

export default function Register(props) {
  const registerFormRef = useRef();
  const { registerUser } = useAurh();

  const handleRegister = async (data) => {
    const connectionError = "Cannot connect to the user registration server.";
    
    // Disabled all buttons
    registerFormRef.current.updateIsLoading(true);

    registerUser(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
    )
      .then((response) => {
        if (response.data) {
          let successMessage = "Create user with email " + data.email;
          registerFormRef.current.updateAlertMessage("success", successMessage);
          registerFormRef.current.updateIsLoading(false);
        } else {
          registerFormRef.current.updateAlertMessage("danger", connectionError);
          registerFormRef.current.updateIsLoading(false);
        }
      })
      .catch((error) => {
        let errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.errors[0].description.includes("E11000") &&
            error.response.data.errors[0].message +
              " - Already exists a user with email: " +
              data.email) ||
          connectionError;
        registerFormRef.current.updateAlertMessage("danger", errorMessage);
        registerFormRef.current.updateIsLoading(false);
      });
  };

  return (
    <>
      <div className="card card-plain">
        <div className="card-header text-center">
          <h4 className="font-weight-bolder">Sign Up</h4>
          <p className="mb-0">Enter your email and password to register</p>
        </div>
        <div className="card-body mt-2">
          <RegisterForm handleRegister={handleRegister} ref={registerFormRef} />
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
