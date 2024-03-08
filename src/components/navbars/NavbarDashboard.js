import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Navbar, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";

import AuthService from "../../services/AuthService";
import BreadcrumbsDashboard from "../breadcrumbs/BreadcrumbsDashboard";

export default function NavbarDashboard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("transparent");
  const location = useLocation();
  
  const navbarLinks = [
    {
      id: "navbar-1",
      href: "/profile",
      title: "Profile Overview",
      icon: "fa-solid fa-user-circle"
	},
    {
      id: "navbar-2",
      href: "/settings",
      title: "Settings",
      icon: "fa-solid fa-gear"
    },
    {
      id: "navbar-3",
      title: "Logout",
      clickHandler: () => handleLogout(),
      icon: "fa-solid fa-right-from-bracket"	  
    }
  ];
  
  // Logout user from App
  const handleLogout = () => {
    AuthService.logoutUser();
    window.location.reload();
  };
  
  // Change color dark/transparent when collapse navbar
  const toggleNavbar = () => {
    setColor((isOpen) ? "transparent" : "dark");
    setIsOpen(!isOpen);
  };
    
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
        bg={color}
        variant={color === "dark" ? color : "main"}
        className="mt-4 mx-4 shadow-none border-radius-xl"
        onToggle={() => toggleNavbar()}
      >
        <Container fluid className="py-1 pe-3">
          <BreadcrumbsDashboard className="ps-3" />
          <Navbar.Toggle aria-controls="main-navbar">
            <i className="fa-solid fa-ellipsis-vertical" />
          </Navbar.Toggle>
          <Navbar.Collapse id="main-navbar">
            <div className="ms-md-auto pe-md-3 d-flex align-items-center" />
            <Nav className="justify-content-end">
              {
                navbarLinks.map((item) => {
                  return (
                    <Nav.Link
                      {...(item.href ? { href: item.href } : {})}
                      className="d-flex align-items-center icon-md w-100 h-100"
                      {...(item.clickHandler ? { onClick: item.clickHandler } : {})}
                    >
                      <LinkTooltip id={item.id} title={item.title}>
                        <i className={ item.icon } />
                      </LinkTooltip>
                      <span className="text-uppercase d-lg-none d-md-block ms-3">
                        {item.title}
                      </span>
                    </Nav.Link>
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