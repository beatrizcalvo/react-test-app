import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row, Breadcrumb } from "react-bootstrap";

export default function BreadcrumbsDashboard(props) {
  const location = useLocation();

  const getBrand = () => {
    let brandName = "Dashboard";
    return brandName;
  };
  
  useEffect(() => {
    console.log(location.pathname.split("/");
  }, [location]);

  return (
    <>
      <Col>
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item href="/" className="text-sm">Home</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <h6 className="font-weight-bolder mb-0">{getBrand()}</h6>
        </Row>
      </Col>
    </>
  );
}