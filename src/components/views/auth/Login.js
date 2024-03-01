import { useEffect } from "react";

export default function Login(props) {
  useEffect(() => {
    document.body.classList.add("register-page");
	return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });	  
	  
  return (
    <>
	  <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
	    <div className="filter" />
        <h1>Hello from Login!</h1>
	  </div>
    </>
  );
}
