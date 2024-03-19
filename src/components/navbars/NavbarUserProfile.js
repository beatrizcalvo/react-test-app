import { Nav } from "react-bootstrap";

export default function NavbarUserProfile(props) {

  const navbarLinks = [
    {}
  ];
  
  return (
    <>
      <Nav as="ul" className="flex-column bg-white border-radius-lg p-3">
       {
          navbarLinks.map((item, index) => {
            return (
              <Nav.Item as="li">
                <Nav.Link></Nav.Link>
              </Nav.Item>
            );
          })
        }
      </Nav>
    </>
  );
}
