import { useLocation } from "react-router-dom";
import { Container, Row, Breadcrumb } from "react-bootstrap";

export default function BreadcrumbsDashboard(props) {
  const location = useLocation();

  const getBrand = () => {
    let brandName = "Dashboard";
    return brandName;
  };

  return (
    <>
      <Container>
        <Row>
          <h6 className="font-weight-bolder mb-0">{getBrand()}</h6>
        </Row>
      </Container>
    </>
  );
}