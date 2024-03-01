import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col, Card } from "reactstrap";

export default function Auth(props) {
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
        style={{ backgroundImage: "url(" + require("../../assets/img/login-image.jpg") + ")" }}
      >
		<div className="filter" />
		<Container className="d-flex justify-content-center">
		  <Row>
		    <Col>
			  <Card className="card-register text-center">
	            <Outlet />
			  </Card>
			</Col>
		  </Row>
		</Container>
	  </div>
    </>
  );
}
