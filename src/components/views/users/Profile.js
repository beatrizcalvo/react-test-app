import { Container, Row, Col, Card } from "react-bootstrap";

import { useAuth } from "../../../hooks/AuthProvider";
import NavbarUserProfile from "../../navbars/NavbarUserProfile";
import CardUserProfile from "../../cards/CardUserProfile";

export default function Profile(props) {
  const { user } = useAuth();

  const navbarLinks = [
    {
      href: "#profile",
      title: "Profile",
      icon: "fa-solid fa-user",
      component: CardUserProfile
    },
    {
      href: "#basic-info",
      title: "Basic Info",
      icon: "fa-regular fa-id-card",
      component: null
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
        <Col lg="9" className="mt-lg-0 mt-4">
          
        </Col>
      </Row>
    </>
  );
}
