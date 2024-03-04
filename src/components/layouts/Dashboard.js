import { useEffect } from "react";
import { Container, Row, Navbar, Nav, Breadcrumb } from "react-bootstrap";

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
              <div className="col-md-auto">
                <Row>
                  <Breadcrumb listProps={{ className: 'bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5' }}>
                    <Breadcrumb.Item href="/" className="text-sm" linkProps={{ className: 'opacity-5 text-dark' }}>Pages</Breadcrumb.Item>
                    <Breadcrumb.Item href="/test" className="text-sm text-dark" active>Dashboard</Breadcrumb.Item>
	          </Breadcrumb>
                </Row>
                <Row>
                  <h6 className="font-weight-bolder mb-0">Dashboard</h6>
                </Row>
              </div>
              <Navbar.Collapse id="navbar" className="mt-sm-0 mt-2 me-md-0 me-sm-4">
                <div className="ms-md-auto pe-md-3 d-flex align-items-center" />
                <Nav className="justify-content-end">
                  <Nav.Item>
                    <Nav.Link href="/profile" className="text-body p-0">
                      <i className="fa-solid fa-circle-user me-sm-1"/>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="px-2">
                    <Nav.Link href="/profile" className="text-body p-0">
                      <i className="fa-solid fa-bars me-sm-1"/>
                    </Nav.Link>
                  </Nav.Item>
	          <Nav.Item className="px-2">
	            <Nav.Link href="/settings" className="text-body p-0">
	              <i className="fa-solid fa-gear me-sm-1"/>
	            </Nav.Link>
	          </Nav.Item>
	          <Nav.Item>
	            <Nav.Link className="text-body p-0">
	              <i className="fa-solid fa-right-from-bracket"/>
	            </Nav.Link>
	          </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
      </main>
    </>
  );
}
