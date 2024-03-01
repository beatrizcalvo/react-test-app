import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Input, Label } from "reactstrap";

const LoginForm = forwardRef(({ handleLogin }, _ref) => {
  const { register } = useForm();
	
  return (
    <>
	  <Form onSubmit={handleSubmit(handleLogin)} className="register-form">
		<FormGroup floating>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Email"
            type="email"
          />
          <Label for="exampleEmail">
            Email
          </Label>
        </FormGroup>
	  </Form>
	</>
  );
});