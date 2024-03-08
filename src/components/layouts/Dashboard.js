import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import PerfectScrollbar from "perfect-scrollbar";

import NavbarDashboard from "../navbars/NavbarDashboard";

var ps;

export default function Dashboard(props) {

  useEffect(() => {
    document.body.classList.add("bg-gray-200");
  });
  
  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100">
        <NavbarDashboard />
        <Container fluid className="px-4 py-4">
          <Outlet />
        </Container>
      </main>
    </>
  );
}