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
                <Nav bsPrefix="breadcrumb" as="ol" className="bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">

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
