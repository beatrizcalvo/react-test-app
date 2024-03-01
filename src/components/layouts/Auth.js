import { Outlet } from "react-router-dom";
import { Container, Row, Col, Card } from "reactstrap";

export default function Auth(props) {
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
			  <Card className="card-register ml-auto mr-auto">
	            <Outlet />
			  </Card>
			</Col>
		  </Row>
		</Container>
	  </div>
    </>
  );
}
