import { Navbar, NavbarBrand, Nav } from "react-bootstrap";

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
              <Navbar.Toggle 
                as="a"
                aria-controls="profile-nav" 
                bsPrefix="nav-link" 
                className="text-white"
              >
                <span className="nav-link-text ms-2 ps-1">
                  Brooklyn Alice
                </span>
                ::after
              </Navbar.Toggle>
              <Navbar.Collapse id="profile-nav">
                <Nav as="ul"></Nav>
              </Navbar.Collapse>
            </Nav.Item>
            <hr class="horizontal light mt-0" />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
