import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

export default function BreadcrumbsDashboard(props) {
  const [breadcrumbsLinks, setBreadcrumbsLinks] = useState([]);
  const location = useLocation();
  
  const getCurrentPage = () => {
    const lastUrl = breadcrumbsLinks.slice(-1);
    return (lastUrl) ? lastUrl[0] : undefined;
  };
  
  const getCurrentPageName = () => {
    const currentPage = getCurrentPage();
    return (currentPage) ? currentPage.name : "Undefined";
  }; 
  
  useEffect(() => {
    const newBreadcrumbsLinks = location.pathname.split("/").map((page) => {
      return {
        href: "/" + page,
        name: (!page) ? "Dashboard" : page.charAt(0).toUpperCase() + page.slice(1)
      };
    });
    setBreadcrumbsLinks(newBreadcrumbsLinks);
  }, [location]);

  return (
    <>
      <Breadcrumb 
        listProps={{ className: 'bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5'}}
        {...props}
      >
        {
          breadcrumbsLinks.map((breadcrumb, index) => {
            const isActive = breadcrumb.name === getCurrentPageName();
            const getLinkContent = (breadcrumb.name === "Dashboard" && index === 0) 
              ? (<i className="fa-solid fa-house" />) 
              : ({breadcrumb.name});
            
            return (
              <li className={ "breadcrumb-item text-sm" + (isActive ? " active" : "") }>
                {
                  (isActive) 
                    ? getLinkContent() 
                    : <Link className="opacity-5" to={breadcrumb.href}>getLinkContent()</Link>                               
                }
              </li>
            );
          })
        }
        <h6 className="breadcrumb-title font-weight-bolder mb-0 w-100">{getCurrentPageName()}</h6>
      </Breadcrumb>
    </>
  );
}
