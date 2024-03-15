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
  const [userData, setUserData] = useState(false);
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
    console.log("ejecuta 1");
  });

  useEffect(() => {
    console.log("ejecuta 3");
    getCurrentUserData();
    console.log(userData);
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
