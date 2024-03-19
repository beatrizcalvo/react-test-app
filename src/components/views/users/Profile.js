import { Container, Row, Col, Card } from "react-bootstrap";

import { useAuth } from "../../../hooks/AuthProvider";
import NavbarUserProfile from "../../navbars/NavbarUserProfile";

export default function Profile(props) {
  const { user } = useAuth();

  const navbarLinks = [
    {
      href: "#profile",
      title: "Profile",
      icon: "fa-solid fa-user"
    },
    {
      href: "#basic-info",
      title: "Basic Info",
      icon: "fa-regular fa-id-card"
    }
  ];

  return (
    <>
      <Row className="mb-5">
        <Col lg="3">
          <Card className="position-sticky top-1">
            <NavbarUserProfile navbarLinks={navbarLinks} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
