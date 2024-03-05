import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row, Breadcrumb } from "react-bootstrap";

export default function BreadcrumbsDashboard(props) {
  const [breadcrumbsLinks, setBreadcrumbsLinks] = useState([]);
  const location = useLocation();

  const getBrand = () => {
    let brandName = "Dashboard";
    return brandName;
  };
  
  const getCurrentPage = () => {
    return breadcrumbsLinks[breadcrumbsLinks.length - 1];
  };
  
  const isCurrentPageHome = () => {
    console.log(getCurrentPage());
    return getCurrentPage().href === "/";
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
                    active="false"
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
          <h6 className="font-weight-bolder mb-0">{breadcrumbsLinks[breadcrumbsLinks.length - 1].name}</h6>
        </Row>
      </Col>
    </>
  );
}