import { forwardRef, memo, useImperativeHandle, useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";

const LoginForm = forwardRef(({ handleRegister }, _ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(undefined);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // Functions to update state fields from parent
  useImperativeHandle(_ref, () => ({
    updateIsLoading: (value) => {
      setIsLoading(value);
    },
    updateAlertMessage: (message) => {
      setAlertMessage(message);
    },
  }));

  // Input form validations
  const inputValidations = {
    loginEmail: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Please enter a valid email",
      },
    },
    loginPassword: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Username must have at lenght 6 or greater",
      },
    },
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleRegister)}>
        <Form.Group className="input-group input-group-outline mb-3">
          <Form.Control
            type="text"
            placeholder="Email..."
            {...register("loginEmail", inputValidations.email)}
            isInvalid={!!errors.loginEmail}
          />
          <Form.Control.Feedback type="text-xs invalid">
            {errors.loginEmail?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="input-group input-group-outline mb-3">
          <Form.Control
            type="password"
            placeholder="Password..."
            {...register("loginPassword", inputValidations.loginPassword)}
            isInvalid={!!errors.loginPassword}
          />
          <Form.Control.Feedback type="text-xs invalid">
            {errors.loginPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Alert variant="danger" className="text-white" show={!!alertMessage}>
          <i className="fa-solid fa-triangle-exclamation" />
          {" "}
          <span className="alert-text text-xs">
            <strong className="text-uppercase">
              Error!!
            </strong>{" "}
            {alertMessage}
          </span>
        </Alert>
        <Button
          className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
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
});

export default memo(LoginForm);
