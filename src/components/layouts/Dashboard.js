import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

import PerfectScrollbar from "perfect-scrollbar";

import NavbarDashboard from "../navbars/NavbarDashboard";

var ps;

export default function Dashboard(props) {
  const mainPanel = useRef();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("bg-gray-200");

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  
  useEffect(() => {
    mainPanel.current.scrollTop = 0;
    mainPanel.current.addEventListener("ps-scroll-y", () => console.log("scroll"));
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  
  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100" ref={mainPanel}>
        <NavbarDashboard id="navbarMain" />
        <Container fluid className="px-4 py-4">
          <Outlet />
        </Container>
      </main>
    </>
  );
}