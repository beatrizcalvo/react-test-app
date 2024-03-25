import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container, ToastContainer } from "react-bootstrap";

import PerfectScrollbar from "perfect-scrollbar";

import SidebarDashboard from "../sidebars/SidebarDashboard";
import NavbarDashboard from "../navbars/NavbarDashboard";
import Alert from "../popups/Alert";
import { AlertsProvider } from "../../hooks/providers/AlertsProvider";

var ps;

export default function Dashboard(props) {
  const [alerts, setAlerts] = useState([]);
  
  const mainPanelRef = useRef();
  const navbarRef = useRef();
  const location = useLocation();

  const navbarShowBlur = () => navbarRef.current.showBlur(true);
  const navbarHideBlur = () => navbarRef.current.showBlur(false);

  useEffect(() => {
    document.body.classList.add("g-sidenav-show", "bg-gray-200");
    
    ps = new PerfectScrollbar(mainPanelRef.current);
    document.body.classList.toggle("perfect-scrollbar-on");
    mainPanelRef.current.addEventListener("ps-scroll-y", navbarShowBlur);
    mainPanelRef.current.addEventListener("ps-y-reach-start", navbarHideBlur);  
    
    return () => {
      document.body.classList.remove("g-sidenav-show", "bg-gray-200");

      mainPanelRef.current.addEventListener("ps-scroll-y", navbarShowBlur);
      mainPanelRef.current.addEventListener("ps-y-reach-start", navbarHideBlur);  
      document.body.classList.toggle("perfect-scrollbar-on");
      ps.destroy();
    };
  }, []);

  useEffect(() => {
    mainPanelRef.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (alerts.length !== 0) setAlerts([]);
  }, [location]);

  return (
    <>
      <ToastContainer position="bottom-end" className="px-1 py-3">
        { alerts.map(item => { return <Alert {...item} />; }) }
      </ToastContainer>
      <SidebarDashboard />
      <main className="main-content position-relative max-height-vh-100 h-100" ref={mainPanelRef}>
        <NavbarDashboard ref={navbarRef} />
        <Container fluid className="px-4 py-4">
          <AlertsProvider alerts={alerts} setAlerts={setAlerts}>
            <Outlet />
          </AlertsProvider>
        </Container>
      </main>
    </>
  );
}
