import { Form, Row, Col, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { useAuth } from "../../hooks/providers/AuthProvider";
import ButtonLoading from "../../buttons/ButtonLoading";

export default function RegisterForm(props) {
  const connectionError = "Cannot connect to the user registration server.";

  const { handleRegister } = props;
  const { loadingAuth, errorAuth, successAuth } = useAuth();
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
        message: "Password must have at lenght 6 or greater",
      },
    },
    password2: {
      validate: (value) =>
        value === getValues("password") || "Passwords don't match",
    },
  };

  const getAlertType = () => {
    return (!!successAuth) ? "success" : "danger";
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleRegister)}>
        <Row className="mb-3">
          <Form.Group as={Col} className="input-group input-group-outline">
            <Form.Control
              type="text"
              placeholder="First Name..."
              {...register("firstName", inputValidations.firstName)}
              isInvalid={!!errors.firstName}
            ></Form.Control>
            <Form.Control.Feedback type="text-xs invalid">
              {errors.firstName?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="input-group input-group-outline">
            <Form.Control
              type="text"
              placeholder="Last Name..."
              {...register("lastName", inputValidations.lastName)}
              isInvalid={!!errors.lastName}
            ></Form.Control>
            <Form.Control.Feedback type="text-xs invalid">
              {errors.lastName?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
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
        <Form.Group className="input-group input-group-outline mb-3">
          <Form.Control
            type="password"
            placeholder="Confirm password..."
            {...register("password2", inputValidations.password2)}
            isInvalid={!!errors.password2}
          />
          <Form.Control.Feedback type="text-xs invalid">
            {errors.password2?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Alert variant={getAlertType()} className="text-white" show={!!errorAuth || !! successAuth}>
          <i
            className={
              getAlertType() === "success"
                ? "fa-solid fa-circle-check"
                : "fa-solid fa-triangle-exclamation"
            }
          />{" "}
          <span className="alert-text text-xs">
            <strong className="text-uppercase">
              {getAlertType() === "success" ? "Success!!" : "Error!!"}
            </strong>{" "}
            {
              (!!successAuth) 
                ? "Create user with email " + getValues("email") 
                : (errorAuth && errorAuth.response && errorAuth.response.data && errorAuth.response.data.errors && 
                     errorAuth.response.data.errors[0].description.includes("E11000") && 
                     errorAuth.response.data.errors[0].message + " - Already exists a user with email: " + getValues("email")) 
                  || connectionError
            }
          </span>
        </Alert>
        <ButtonLoading 
          variant="primary" 
          type="submit" 
          className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" 
          titleButton="Submit" 
          isLoading={loadingAuth}
        />
      </Form>
    </>
  );
}
