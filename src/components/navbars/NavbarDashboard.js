import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Navbar, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";

import BreadcrumbsDashboard from "../breadcrumbs/BreadcrumbsDashboard";

export default function NavbarDashboard(props) {
  const [color, setColor] = useState("transparent");
  const location = useLocation();
  
  const navbarLinks = [
    {
      id: "navbar-1",
      href: "/profile",
	},
    {
      id: "navbar-2",
      href: "/settings"
    }
  ];
  
  const prueba = () => {console.log("pulsado")};
    
  useEffect(() => {
    if (window.innerWidth < 993) {
      console.log("ventaña pequeña");
    } else {
      console.log("ventana grande");
    }
  }, [location]);
  
  // Add a tooltip in a link
  const LinkTooltip = ({ id, title, children }) => (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id={id}>{title}</Tooltip>}>
		{children}
    </OverlayTrigger>
  );
  
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
              <Nav.Link 
                href="/profile" 
                className="d-flex align-items-center icon-md"
              >
                <LinkTooltip id="menu-1" title="Profile">
                <i className="text-body fa-solid fa-user-circle" />
                </LinkTooltip>
                <span className="text-uppercase d-lg-none d-md-block">Profile</span>
              </Nav.Link>
              <Nav.Link 
                href="#pricing"
                className="d-flex align-items-center icon-md"
              >
                <i className="text-body fa-solid fa-gear"/>
                <span className="text-uppercase d-lg-none d-md-block">Settings</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}