import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";

export default function NavbarDashboard(props) {
  const [color, setColor] = useState("transparent");
  const location = useLocation();

  return (
    <>
      <Container fluid>
        <Navbar 
          collapseOnSelect 
          expand="lg" 
          variant={color} 
          className="mx-4 shadow-none"
        >
          <Container>
            <Navbar.Brand className="font-weight-bolder mb-0">
              Dashboard
            </Navbar.Brand>
          </Container>
        </Navbar>
      </Container>
    </>
  );
}