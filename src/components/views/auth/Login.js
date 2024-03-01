import { useRef } from "react";

import LoginForm from "../../forms/LoginForm";

export default function Login(props) {  
  const loginFormRef = useRef();
  
  const handleLogin = async (data) => {
	  
  };

  return (
    <>
      <h4 className="font-weight-bold">Sign In</h4>
	  <h8 className="mb-0">Enter your email and password to sign in</h8>
	  <LoginForm handleLogin={handleLogin} ref={loginFormRef} />
    </>
  );
}
