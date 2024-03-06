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
      title: "Profile Overview",
      icon: ""
	},
    {
      id: "navbar-2",
      href: "/settings",
      title: "Settings",
      icon: ""
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
			  {
                navbarLinks.map((item) => {
                  return (
                    <Nav.Link></Nav.Link>
                  );
                })
              }              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}