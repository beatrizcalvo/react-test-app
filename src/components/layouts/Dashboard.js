import { useEffect } from "react";
import { Container, Navbar, Breadcrumb } from "react-bootstrap";

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
              <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                  Library
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
			  </Breadcrumb>
            </Container>
          </Navbar>
        </Container>
      </main>
    </>
  );
}
