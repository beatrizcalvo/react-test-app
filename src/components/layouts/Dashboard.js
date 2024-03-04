import { useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

export default function Dashboard(props) {
  useEffect(() => {
    document.body.classList.add("g-sidenav-show", "bg-gray-200");
  }, []);
  
  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y">
        <Container fluid className="py-4">
          <Navbar expand="lg">
            <Container fluid className="py-1 px-3">
              <Nav role="breadcrumb">
                <Nav.Item>
                  <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <h6 class="font-weight-bolder mb-0">Dashboard</h6>
              </Nav>
            </Container>
          </Navbar>
        </Container>
      </main>
    </>
  );
}
