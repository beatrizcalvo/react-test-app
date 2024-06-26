import { Link } from "react-router-dom";
import SidebarMenu from 'react-bootstrap-sidebar-menu';

import { useAuth } from "../../hooks/providers/AuthProvider";

function SidebarHeader(props) {
  const { toggleSidebar } = props;
  
  return (
    <>
      <SidebarMenu.Header bsPrefix="sidenav-header" className="d-flex align-items-center justify-content-center">
        <a className="p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-xl-none" onClick={toggleSidebar}>
          <i className="fas fa-times" />
        </a>
        <Link to="/" className="navbar-brand m-0">
          <img src={require("../../assets/img/logo-ct.png")} className="navbar-brand-img h-100" />
          <span className="ms-1 font-weight-bold text-white">
            React Test App
          </span>
        </Link>
      </SidebarMenu.Header>
    </>
  );
};

function SidebarItemCollapsable({ id, title, className, links }) {
  return (
    <>
      <SidebarMenu.Sub as="li" bsPrefix="nav-item" className={"mt-0 " + className} >
        <SidebarMenu.Sub.Toggle as="a" bsPrefix="nav-link" className="text-white" aria-controls={id} data-bs-toggle="collapse" aria-expanded="false">
          <SidebarMenu.Nav.Icon as="img" bsPrefix="avatar" src={require("../../assets/img/default_profile.jpg")} />
          <SidebarMenu.Nav.Title as="span" bsPrefix="nav-link-text" className="ms-2 ps-1 text-wrap">
            {title}
          </SidebarMenu.Nav.Title>
        </SidebarMenu.Sub.Toggle>
        <SidebarMenu.Sub.Collapse id={id}>
          <SidebarMenu.Nav as="ul" bsPrefix="nav">
            {
              links.map((item) => {
                return (
                  <SidebarMenu.Nav.Item as="li" bsPrefix="nav-item">
                    <Link to={item.href} className="nav-link text-white">
                      <span class="sidenav-mini-icon">{item.icon}</span>
                      <span class="ms-3 ps-1 sidenav-normal">{item.title}</span>
                    </Link>
                  </SidebarMenu.Nav.Item>
                );
              })
            }
          </SidebarMenu.Nav>
        </SidebarMenu.Sub.Collapse>
      </SidebarMenu.Sub>
    </>
  );
};

export default function SidebarDashboard(props) {  
  const { user } = useAuth();

  // Links config for sidebar
  const sidebarLinks = [
    {
      id: "profile-nav",
      title: user.person.personName.fullName,
      className: "mb-2",
      links: [ 
        { href: "/profile", icon: "MP", title: "My Profile" },
        { href: "/settings", icon: "S", title: "Settings" }
      ]
    }
  ];

  return (
    <>
      <SidebarMenu 
        bsPrefix="navbar" 
        variant="vertical"
        expand="xs"
        className="sidenav border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
      >
        <SidebarHeader {...props} />
        <hr class="horizontal light mt-0 mb-2" />
        <SidebarMenu.Collapse bsPrefix="navbar-collapse" className="w-auto">
          <SidebarMenu.Nav as="ul" bsPrefix="navbar-nav">
            {
              sidebarLinks.map((item) => {
                if (item.id === "profile-nav") {
                  return (
                    <>
                      <SidebarItemCollapsable {...item} />
                      <hr class="horizontal light mt-0" />
                    </>
                  );
                } else {
                  return <li/>
                }
              })
            }
          </SidebarMenu.Nav>
        </SidebarMenu.Collapse>
      </SidebarMenu>
    </>
  );
};
