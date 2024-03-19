import { Form, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { useAuth } from "../../hooks/AuthProvider";

export default function RegisterForm(props) {
  const connectionError = "Cannot connect to the user registration server.";

  const { handleRegister } = props;
  const { loadingAuth, errorAuth } = useAuth();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  // Input form validations
  const inputValidations = {
    firstName: {
      required: "First name is required",
      minLength: {
        value: 3,
        message: "First name must have at lenght 3 or greater",
      },
    },
    lastName: {
      required: "Last name is required",
      minLength: {
        value: 3,
        message: "Last name must have at lenght 3 or greater",
      },
    },
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
    password2: {
      validate: (value) =>
        value === getValues("password") || "Passwords don't match",
    },
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleRegister)}>
      </Form>
    </>
  );
}
