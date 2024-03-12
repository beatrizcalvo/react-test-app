import SidebarMenu from 'react-bootstrap-sidebar-menu';

export default function SidebarDashboard(props) {
  return (
    <>
      <SidebarMenu
        bsPrefix="navbar" 
        expand="xs"
        variant="vertical"
        className="sidenav border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
      >
        <SidebarMenu.Header 
          bsPrefix="sidenav-header"
          className="d-flex align-items-center justify-content-center"
        >
          <SidebarMenu.Brand
            as="a" 
            bsPrefix="navbar-brand" 
            className="m-0"
          >
            <img src={require("../../assets/img/logo-ct.png")} className="navbar-brand-img h-100" />
            <span className="ms-1 font-weight-bold text-white">
              React Test App
            </span>
          </SidebarMenu.Brand>
        </SidebarMenu.Header>
        <hr class="horizontal light mt-0 mb-2" />
        <SidebarMenu.Body>
        </SidebarMenu.Body>
      </SidebarMenu>
    </>
  );
};
