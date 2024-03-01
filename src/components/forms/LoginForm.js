import { forwardRef } from "react";
import { useForm } from "react-hook-form";

const LoginForm = forwardRef(({ handleLogin }, _ref) => {
  const { register } = useForm();
	
  return (
    <>
	  <Form onSubmit={handleSubmit(handleLogin)} className="register-form">
	  </Form>
	</>
  );
});