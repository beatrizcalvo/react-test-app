import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row, Breadcrumb } from "react-bootstrap";

export default function BreadcrumbsDashboard(props) {
  const [breadcrumbsLinks, setBreadcrumbsLinks] = useState("black");
  const location = useLocation();

  const getBrand = () => {
    let brandName = "Dashboard";
    return brandName;
  };
  
  const getCurrentPage = () => {
    return breadcrumbsLinks.pop();
  };
  
  const isCurrentPageHome = () => {
    return getCurrentPage() === "";
  };
  
  useEffect(() => {
    setBreadcrumbsLinks(location.pathname.substring(1).split("/"));
  }, [location]);

  return (
    <>
      <Col>
        <Row>
          <Breadcrumb listProps={{ className: 'mb-0 pb-0 pt-1 px-0 me-sm-6 me-5'}}>
            <Breadcrumb.Item 
              href="/" 
              className="text-sm text-dark" 
              linkProps={{ className: 'opacity-5' }} 
              active={!isCurrentPageHome}
            >
              <i className="fa-solid fa-house" />
            </Breadcrumb.Item>
            {
              breadcrumbsLinks.map();
            }
          </Breadcrumb>
        </Row>
        <Row>
          <h6 className="font-weight-bolder mb-0">{getBrand()}</h6>
        </Row>
      </Col>
    </>
  );
}