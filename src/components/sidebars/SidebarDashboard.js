import { Container, Navbar, NavbarBrand, Nav } from "react-bootstrap";

export default function SidebarDashboard(props) {
  return (
    <>
      <Navbar
        as="aside"
        expand="xs"
        variant="vertical"
        className="sidenav border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
      >
        <div class="sidenav-header d-flex align-items-center justify-content-center">
          <NavbarBrand 
            as="a" 
            className="m-0"
          >
            <img src={require("../../assets/img/logo-ct.png")} className="navbar-brand-img h-100" />
            <span className="ms-1 font-weight-bold text-white">
              React Test App
            </span>
          </NavbarBrand>
        </div>
        <hr class="horizontal light mt-0 mb-2" />
        <Navbar.Collapse 
          id="sidebar-dashboard-collapse" 
          className="w-auto"
        >
          <Nav as="ul">
            <Nav.Item 
              as="li"
              className="mb-2 mt-0"
            >
              <a 
                clasName="nav-link text-white" 
                data-bs-toggle="collapse"
              >
                Brooklyn Alice
              </a>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
