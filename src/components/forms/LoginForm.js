import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { useAuth } from "../../hooks/providers/AuthProvider";

export default function LoginForm(props) {
  const connectionError = "Cannot connect to the user registration server.";
  
  const { handleLogin } = props;
  const { loadingAuth, errorAuth } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Input form validations
  const inputValidations = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Please enter a valid email",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Username must have at lenght 6 or greater",
      },
    },
  };
  
  return (
    <>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <Form.Group className="input-group input-group-outline mb-3">
          <Form.Control
            type="text"
            placeholder="Email..."
            {...register("email", inputValidations.email)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="text-xs invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="input-group input-group-outline mb-3">
          <Form.Control
            type="password"
            placeholder="Password..."
            {...register("password", inputValidations.password)}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="text-xs invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Alert variant="danger" className="text-white" show={!!errorAuth}>
          <i className="fa-solid fa-triangle-exclamation" />
          {" "}
          <span className="alert-text text-xs">
            <strong className="text-uppercase">
              Error!!
            </strong>{" "}
            { 
              (errorAuth && errorAuth.response && errorAuth.response.data && errorAuth.response.data.errors && 
                errorAuth.response.data.errors[0].message + " - " + errorAuth.response.data.errors[0].description)
              || connectionError
            }
          </span>
        </Alert>
        <Button
          className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
          variant="primary"
          type="submit"
          disabled={loadingAuth}
        >
          {loadingAuth ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </>
  );
}
