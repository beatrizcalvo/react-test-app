import { forwardRef, memo, useState, useImperativeHandle } from "react";
import { Container, Navbar, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";

import AuthService from "../../services/AuthService";
import BreadcrumbsDashboard from "../breadcrumbs/BreadcrumbsDashboard";

const NavbarDashboard = forwardRef(({ handleRegister }, _ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [color, setColor] = useState("transparent");

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
    setColor(isOpen ? "transparent" : (isBlur ? "transparent" : "dark"));
    setIsOpen(!isOpen);
  };

  // Functions to update state fields from parent
  useImperativeHandle(_ref, () => ({
    showBlur: (value) => {
      setIsBlur(value);
      setIsOpen(false);
      setColor("transparent");
    }
  }));

  // Add a tooltip in a link
  const LinkTooltip = ({ id, title, children }) => {
    return ({children});
  };
  
  return (
    <>
      <Navbar 
        collapseOnSelect 
        expand="lg" 
        sticky="top" 
        bg={color}
        variant={color === "dark" ? color : "main"}
        className={"mt-4 mx-4 shadow-none border-radius-xl" + ((isBlur) ? " top-2 blur shadow-blur" : "")}
        onToggle={() => toggleNavbar()}
        expanded={isOpen}
      >
        <Container fluid className="py-1 pe-3">
          <BreadcrumbsDashboard className="ps-3" />
          <Navbar.Toggle aria-controls="navbar-dashboard-collapse">
            <i className="fa-solid fa-ellipsis-vertical" />
          </Navbar.Toggle>
          <Navbar.Collapse 
            id="navbar-dashboard-collapse" 
            {...(isOpen ? { className: "pt-3" } : {})}
          >
            <div class="ms-md-auto pe-md-3 d-flex align-items-center" />
            <Nav>
              {
                navbarLinks.map((item) => {
                  return (
                    <Nav.Link
                      {...(item.href ? { href: item.href } : {})}
                      className="d-flex align-items-center icon-md w-100 h-100"
                      {...(item.clickHandler ? { onClick: item.clickHandler } : {})}
                    >
                      <LinkTooltip id={item.id} title={item.title} show={!isOpen}>
                        <i className={ item.icon } />
                      </LinkTooltip>
                      <span className="text-uppercase d-lg-none d-md-block ms-2">
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
});

export default memo(NavbarDashboard);
