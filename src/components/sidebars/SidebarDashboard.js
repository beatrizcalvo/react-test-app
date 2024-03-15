import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SidebarMenu from 'react-bootstrap-sidebar-menu';

var ps;

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

function SidebarItemCollapsable({ id, title, className, icon, links }) {
  return (
    <>
      <SidebarMenu.Sub as="li" bsPrefix="nav-item" className={"mt-0 " + className} >
        <SidebarMenu.Sub.Toggle as="a" bsPrefix="nav-link" className="text-white" aria-controls={id} data-bs-toggle="collapse" aria-expanded="false">
          <SidebarMenu.Nav.Icon bsPrefix="avatar">
          
          </SidebarMenu.Nav.Icon>
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
                    <SidebarMenu.Nav.Link bsPrefix="nav-link" className="text-white" href={item.href}>
                      <SidebarMenu.Nav.Icon as="span" bsPrefix="sidenav-mini-icon">
                        {item.icon}
                      </SidebarMenu.Nav.Icon>
                      <SidebarMenu.Nav.Title as="span" bsPrefix="sidenav-normal" className="ms-3 ps-1">
                        {item.title}
                      </SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav.Link>
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
  const sidebarRef = useRef();
  const location = useLocation();
  
  const sidebarLinks = [
    {
      id: "profile-nav",
      title: "aaa",
      className: "mb-2",
      icon: null,
      links: [ 
        { href: "/profile", icon: "MP", title: "My Profile" },
        { href: "/settings", icon: "S", title: "Settings" }
      ]
    }
  ];

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanelRef.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
    console.log(props.userData);
  });

  useEffect(() => {
    sidebarRef.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  
  return (
    <>
      <SidebarMenu 
        ref={sidebarRef}
        bsPrefix="navbar" expand="xs" variant="vertical" 
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
};
