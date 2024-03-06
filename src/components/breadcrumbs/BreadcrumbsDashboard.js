import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row, Breadcrumb } from "react-bootstrap";

export default function BreadcrumbsDashboard(props) {
  const [breadcrumbsLinks, setBreadcrumbsLinks] = useState([]);
  const location = useLocation();
  
  const getCurrentPage = () => {
    return breadcrumbsLinks.slice(-1)[0];
  };
  
  const getBrand = () => {
    console.log(breadcrumbsLinks.length);
    console.log(getCurrentPage().valueOf());
    return "Dashboard";
  }; 
  
  useEffect(() => {
    const newBreadcrumbsLinks = location.pathname.split("/").map((page) => {
      return {
        href: "/" + page,
        name: (!page) ? "Dashboard" : page.charAt(0).toUpperCase() + page.slice(1)
      };
    });
    setBreadcrumbsLinks(newBreadcrumbsLinks);
  }, [location]);

  return (
    <>
      <Col>
        <Row>
          <Breadcrumb listProps={{ className: 'mb-0 pb-0 pt-1 px-0 me-sm-6 me-5'}}>
            {
              breadcrumbsLinks.map((breadcrumb, index) => {
                return (
                  <Breadcrumb.Item
                    href={breadcrumb.href}
                    className="text-sm text-dark"
                    linkProps={{ className: 'opacity-5' }}
                    active={(index === breadcrumbsLinks.length - 1) ? true : false}
                  >
                    { 
                      (breadcrumb.name === "Dashboard" && index === 0) ? 
                        <i className="fa-solid fa-house" />
                      : breadcrumb.name 
                    }
                  </Breadcrumb.Item>
                );
              })
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
