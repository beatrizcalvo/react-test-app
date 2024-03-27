import { forwardRef, memo, useState, useEffect, useImperativeHandle } from "react";
import { Container, Navbar, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from "../../hooks/providers/AuthProvider";
import BreadcrumbsDashboard from "../breadcrumbs/BreadcrumbsDashboard";

// Add a tooltip in a link
function LinkTooltip({ id, title, showTooltip, children }) {
  if (!showTooltip) return children;    
  return (
    <>
      <OverlayTrigger placement="bottom" overlay={<Tooltip id={id}>{title}</Tooltip>}>
        {children}
      </OverlayTrigger>
    </>
  );
};

const NavbarDashboard = forwardRef(({ handleRegister }, _ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [color, setColor] = useState("transparent");
  const { logoutUser } = useAuth();
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
      clickHandler: () => logoutUser(),
      icon: "fa-solid fa-right-from-bracket"	  
    }
  ];

  // Change color dark/transparent when collapse navbar
  const toggleNavbar = () => {
    setColor(isOpen ? "transparent" : (isBlur ? "transparent" : "dark"));
    setIsOpen(!isOpen);
  };
  
  // Adds color dark/transparent to the navbar on resize
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen && !isBlur) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  
  useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });

  // Reset expanded navbar
  useEffect(() => {
    if (isOpen) toggleNavbar();
  }, [location]);

  // Functions to update state fields from parent
  useImperativeHandle(_ref, () => ({
    showBlur: (value) => {
      setIsBlur(value);
      setIsOpen(false);
      setColor("transparent");
    }
  }));

  return (
    <>
      <Navbar 
        expand="lg" 
        sticky="top" 
        bg={color}
        variant={color === "dark" ? color : "main"}
        className={"mt-4 mx-4 shadow-none border-radius-xl" + ((isBlur) ? " top-2 blur shadow-blur" : "")}
        onToggle={() => toggleNavbar()} 
        expanded={isOpen}
      >
        <Container fluid className="py-1 pe-3">
          <div class="sidenav-toggler sidenav-toggler-inner d-xl-none">
            <a class="nav-link text-body p-0">
              <i class="fa-solid fa-bars" />
            </a>
          </div>
          <BreadcrumbsDashboard className="ps-3" />
          <div className="col" />
        </Container>
      </Navbar>
    </>
  );
});

export default memo(NavbarDashboard);
