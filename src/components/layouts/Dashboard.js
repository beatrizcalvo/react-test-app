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
          <Navbar expand="lg" variant="main" className="px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
            <Container fluid className="py-1 px-3">
              <nav aria-label="breadcrumb">
                <Nav bsPrefix="breadcrumb">
                  <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                  </Nav.Item>				  
                </Nav>
                <h6 class="font-weight-bolder mb-0">Dashboard</h6>
              </nav>			  
            </Container>
          </Navbar>
        </Container>
      </main>
    </>
  );
}
