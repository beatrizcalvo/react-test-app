import SidebarMenu from 'react-bootstrap-sidebar-menu';

function SidebarHeader(props) {
  return (
    <>
      <SidebarMenu.Header bsPrefix="sidenav-header" className="d-flex align-items-center justify-content-center">
        <SidebarMenu.Brand as="a" bsPrefix="navbar-brand" className="m-0">
          <img src={require("../../assets/img/logo-ct.png")} className="navbar-brand-img h-100" />
          <span className="ms-1 font-weight-bold text-white">
            React Test App
          </span>
        </SidebarMenu.Brand>
      </SidebarMenu.Header>
    </>
  );
};

function SidebarItemCollapsable({ id, title, className }) {
  return (
    <>
      <SidebarMenu.Sub as="li" bsPrefix="nav-item" className={"mt-0 " + className} >
        <SidebarMenu.Sub.Toggle as="a" bsPrefix="nav-link" className="text-white" aria-controls={id}>
          <SidebarMenu.Nav.Title as="span" bsPrefix="nav-link-text" className="ms-2 ps-1">
            {title}
          </SidebarMenu.Nav.Title>
        </SidebarMenu.Sub.Toggle>
        <SidebarMenu.Sub.Collapse id={id}>
              
        </SidebarMenu.Sub.Collapse>
      </SidebarMenu.Sub>
    </>
  );
};

export default function SidebarDashboard(props) {
  const sidebarLinks = [
    {
      id: "profile-nav",
      title: "Brooklyn Alice",
      className: "mb-2"
    }
  ];
  
  return (
    <>
      <SidebarMenu bsPrefix="navbar" expand="xs" variant="vertical" className="sidenav border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark">
        <SidebarHeader />
        <hr class="horizontal light mt-0 mb-2" />
        <SidebarMenu.Collapse bsPrefix="navbar-collapse" className="w-auto">
          <SidebarMenu.Nav as="ul" bsPrefix="navbar-nav">
            {
              sidebarLinks.map((item) => {
                <SidebarItemCollapsable id="profile-nav" title="Brooklyn Alice" className="mb-2" />
              })
            }
            <hr class="horizontal light mt-0" />
          </SidebarMenu.Nav>
        </SidebarMenu.Collapse>
      </SidebarMenu>
    </>
  );
};
