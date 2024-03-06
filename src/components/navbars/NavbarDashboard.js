import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

import BreadcrumbsDashboard from "../breadcrumbs/BreadcrumbsDashboard";

export default function NavbarDashboard(props) {
  const [color, setColor] = useState("transparent");
  const location = useLocation();
  
  // Adds color dark/transparent to the navbar on resize
  const updateColor = () => {};
  
  useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  
  return (
    <>
      <Navbar 
        collapseOnSelect 
        expand="lg" 
        sticky="top" 
        variant={color} 
        className="mt-4 mx-4 shadow-none"
      >
        <Container fluid className="py-1 px-3">
          <BreadcrumbsDashboard />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse 
            id="responsive-navbar-nav" 
			className="mt-sm-0 mt-2 me-md-0 me-sm-4"
		  >
            <div className="ms-md-auto pe-md-3 d-flex align-items-center" />
            <Nav className="justify-content-end">
              <Nav.Item className="d-flex align-items-center">
                <Nav.Link href="/profile" 
                  className="text-body"
                >
                  <i className="fa-solid fa-user-circle" />
                  <span className="text-uppercase d-lg-none d-md-block">
                    Profile
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}