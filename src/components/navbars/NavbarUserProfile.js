import { Nav } from "react-bootstrap";

export default function NavbarUserProfile(props) {
  const { navbarLinks } = props;
  
  return (
    <>
      <Nav as="ul" className="flex-column bg-white border-radius-lg p-3">
       {
          navbarLinks.map((item, index) => {
            return (
              <Nav.Item as="li" 
                {...((index !== 0) ? { className: "pt-2"} : {})}
              >
                <Nav.Link className="text-dark d-flex" href={item.href}>
                  <i className={item.icon + " text-lg me-2"} />
                  <span className="text-sm">{item.title}</span>
                </Nav.Link>
              </Nav.Item>
            );
          })
        }
      </Nav>
    </>
  );
}
