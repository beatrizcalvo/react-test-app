import { useRef } from "react";

import LoginForm from "../../forms/LoginForm";

export default function Login(props) {  
  const loginFormRef = useRef();
  
  const handleLogin = async (data) => {
	  
  };

  return (
    <>
	  <div className="card-title">
	    <h4 className="fw-bold text-uppercase">Sign In</h4>
		<h8>Enter your email and password to sign in</h8>
	  </div>      	  
	  <LoginForm handleLogin={handleLogin} ref={loginFormRef} />
    </>
  );
}
