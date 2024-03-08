import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

import PerfectScrollbar from "perfect-scrollbar";

import NavbarDashboard from "../navbars/NavbarDashboard";

var ps;

export default function Dashboard(props) {
  const mainPanelRef = useRef();
  const navbarRef = useRef();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("bg-gray-200");

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanelRef.current);
      document.body.classList.toggle("perfect-scrollbar-on");
      mainPanelRef.current.addEventListener("ps-scroll-y", () => console.log("scroll"));
      mainPanelRef.current.addEventListener("ps-scroll-down", () => console.log("scroll down"));
      mainPanelRef.current.addEventListener("ps-y-reach-start", () => console.log("scroll top"));
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
        mainPanelRef.current.removeEventListener("ps-scroll-y");
        mainPanelRef.current.removeEventListener("ps-scroll-down");
        mainPanelRef.current.removeEventListener("ps-y-reach-start");
      }
    };
  });
  
  useEffect(() => {
    mainPanelRef.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  
  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100" ref={mainPanelRef}>
        <NavbarDashboard ref={navbarRef} />
        <Container fluid className="py-4">
          <Outlet />
        </Container>
      </main>
    </>
  );
}
