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
    return breadcrumbsLinks.pop();
  };
  
  const isCurrentPageHome = () => {
    return getCurrentPage() === "/";
  };
  
  useEffect(() => {
    location.pathname.split("/").map((item) => {
      console.log(item);
      setBreadcrumbsLinks([
        ...breadcrumbsLinks,
        { 
          page: "/" + item,
          name: (!item) ? "Dashboard" : item.charAt(0).toUpperCase() + item.slice(1)
        }
      ]);
    });
  }, [location]);

  return (
    <>
      <Col>
        <Row>
          <Breadcrumb listProps={{ className: 'mb-0 pb-0 pt-1 px-0 me-sm-6 me-5'}}>
            {
              breadcrumbsLinks.map((item) => {
                <Breadcrumb.Item
                  href={item.page} 
                  className="text-sm text-dark"
                  linkProps={{ className: 'opacity-5' }}
                >
                  {item.name}
                </Breadcrumb.Item>
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