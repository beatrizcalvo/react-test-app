import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";

export default function NavbarDashboard(props) {
  const [color, setColor] = useState("transparent");
  const location = useLocation();
  
  const getBrand = () => {
    let brandName = "Dashboard";
    return brandName;
  };

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
            <Navbar.Brand>
              <h6 className="font-weight-bolder mb-0">{getBrand()}</h6>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </Container>
    </>
  );
}