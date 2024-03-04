import { forwardRef, memo } from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

const LoginForm = forwardRef(({ handleLogin }, _ref) => {
  const { register, handleSubmit } = useForm();
  
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
        <FormGroup row>
          <Label for="inputEmail">
            Email
          </Label>
          <Input
            id="inputEmail"
            placeholder="Email"
            type="text"
            {...register("email", inputValidations.email)}
          />
        </FormGroup>          
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