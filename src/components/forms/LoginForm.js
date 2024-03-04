import { forwardRef, memo } from "react";
import { useForm } from "react-hook-form";
import { Form, FormFeedback, Input, Label, Button } from "reactstrap";

const LoginForm = forwardRef(({ handleLogin }, _ref) => {
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
      }
    }
  };
	
  return (
    <>
      <Form onSubmit={handleSubmit(handleLogin)} className="login-form">
        <Label for="inputEmail">
          Email
        </Label>
        <Input
          id="inputEmail"
          placeholder="Email"
          type="text"
          invalid={!!errors.email}
          {...register("email", inputValidations.email)}
        />
        <FormFeedback>
          {errors.email?.message}
        </FormFeedback>       
        <Label for="inputPassword">
          Password
        </Label>
        <Input
          id="inputPassword"
          placeholder="Password"
          type="password"
          {...register("password", inputValidations.password)}
        />
        <Button
          type="submit"
          color="danger"
          block="true"
          className="btn-round"
        >
          Submit
        </Button>
	  </Form>
	</>
  );
});

export default memo(LoginForm);