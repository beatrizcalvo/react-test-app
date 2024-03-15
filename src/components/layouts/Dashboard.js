import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

import PerfectScrollbar from "perfect-scrollbar";

import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import SidebarDashboard from "../sidebars/SidebarDashboard";
import NavbarDashboard from "../navbars/NavbarDashboard";

var ps;

export default function Dashboard(props) {
  const [userData, setUserData] = useState(undefined);
  const mainPanelRef = useRef();
  const navbarRef = useRef();
  const location = useLocation();

  const navbarShowBlur = () => navbarRef.current.showBlur(true);
  const navbarHideBlur = () => navbarRef.current.showBlur(false);

  // Get current user data from token save in localStorage
  const getCurrentUserData = () => {
    UserService.loggedUser()
      .then(response => {
        setUserData(response.data);
      })
      .catch((error) => {
        AuthService.logoutUser();
        window.location.reload();
      });
  };

  useEffect(() => {
    // Add dynamically css
    document.body.classList.add("g-sidenav-show", "bg-gray-200");

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanelRef.current);
      document.body.classList.toggle("perfect-scrollbar-on");
      mainPanelRef.current.addEventListener("ps-scroll-y", navbarShowBlur);
      mainPanelRef.current.addEventListener("ps-y-reach-start", navbarHideBlur);
    }    
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
        mainPanelRef.current.removeEventListener("ps-scroll-y", navbarShowBlur);
        mainPanelRef.current.removeEventListener("ps-y-reach-start", navbarHideBlur);
      }
    };
  });
  
  useEffect(() => {
    mainPanelRef.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    getCurrentUserData();
    console.log((new Date()).toLocaleTimeString() + " - update location");
  }, [location]);
  
  return (
    <>
      <SidebarDashboard userData={userData} />
      <main className="main-content position-relative max-height-vh-100 h-100" ref={mainPanelRef}>
        <NavbarDashboard ref={navbarRef} />
        <Container fluid className="py-4">
          <Outlet />
        </Container>
      </main>
    </>
  );
}
