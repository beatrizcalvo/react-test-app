import { createElement } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import NavbarUserProfile from "../../navbars/NavbarUserProfile";
import CardProfile from "../../cards/users/CardProfile";
import CardDeleteAccount from "../../cards/users/CardDeleteAccount";

export default function Profile(props) {
  // Links config for profile navbar
  const navbarLinks = [
    { href: "#profile-info", title: "Profile", icon: "fa-solid fa-user", component: CardProfile },
    { href: "#basic-info", title: "Basic Info", icon: "fa-regular fa-id-card" },
    { href: "#change-password", title: "Change Password", icon: "fa-solid fa-lock" },
    { href: "#delete-account", title: "Delete Account", icon: "fa-solid fa-trash", component: CardDeleteAccount }
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
          {
            navbarLinks.map(item => {
              if (typeof item.component !== "undefined") {
                return createElement(item.component, { id: item.href.substring(1) });
              }
            })
          }
        </Col>
      </Row>
    </>
  );
}
