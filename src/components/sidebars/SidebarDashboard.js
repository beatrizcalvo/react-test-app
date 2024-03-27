import { forwardRef, memo, useState, useImperativeHandle } from "react";
import { Link } from "react-router-dom";
import SidebarMenu from 'react-bootstrap-sidebar-menu';

import { useAuth } from "../../hooks/providers/AuthProvider";

function SidebarHeader() {
  return (
    <>
      <SidebarMenu.Header bsPrefix="sidenav-header" className="d-flex align-items-center justify-content-center">
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
          <SidebarMenu.Nav.Title as="span" bsPrefix="nav-link-text" className="ms-2 ps-1">
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

const SidebarDashboard = forwardRef((props, _ref) => {
  const [hide, setHide] = useState(true);
  
  const { user } = useAuth();

  // Links config for sidebar
  const sidebarLinks = [
    {
      id: "profile-nav",
      title: user.fullName,
      className: "mb-2",
      links: [ 
        { href: "/profile", icon: "MP", title: "My Profile" },
        { href: "/settings", icon: "S", title: "Settings" }
      ]
    }
  ];

  // Functions to update state fields from parent
  useImperativeHandle(_ref, () => ({
    showSidebar: () => {
      
    }
  }));

  return (
    <>
      <SidebarMenu 
        bsPrefix="navbar" 
        expand="xs" 
        variant="vertical" 
        hide={hide} 
        className="sidenav border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
      >
        <SidebarHeader />
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
});

export default memo(SidebarDashboard);
