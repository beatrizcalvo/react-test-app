import { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import PerfectScrollbar from "perfect-scrollbar";

import NavbarDashboard from "../navbars/NavbarDashboard";

var ps;

export default function Dashboard(props) {
  const mainPanel = useRef();

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
    }
  });
  
  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100" ref={mainPanel}>
        <NavbarDashboard />
        
      </main>
    </>
  );
}