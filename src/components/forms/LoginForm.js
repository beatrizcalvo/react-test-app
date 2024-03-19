import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { useAuth } from "../../hooks/AuthProvider";

export default function LoginForm(props) {
  const { handleLogin } = props;
  const { loading, error } = useAuth();
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
        <Alert variant="danger" className="text-white" show={!!error}>
          <i className="fa-solid fa-triangle-exclamation" />
          {" "}
          <span className="alert-text text-xs">
            <strong className="text-uppercase">
              Error!!
            </strong>{" "}
            {error}
          </span>
        </Alert>
        <Button
          className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? (
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
