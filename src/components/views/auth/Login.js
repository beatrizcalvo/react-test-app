import { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

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
		<Container>
		  <Row>
		    <Col className="ml-auto mr-auto" lg="4">
		      <h1>Hello from Login!</h1>
			</Col>
		  </Row>
		</Container>
	  </div>
    </>
  );
}
