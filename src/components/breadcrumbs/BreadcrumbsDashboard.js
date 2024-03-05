import { Container, Row } from "react-bootstrap";

export default function BreadcrumbsDashboard(props) {
  const getBrand = () => {
    let brandName = "Dashboard";
    return brandName;
  };

  return (
    <>
      <Container>
        <Row>
        </Row>
        </Row>
          <h6 className="font-weight-bolder mb-0">{getBrand()}</h6>
        </Row>
      </Container>
    </>
  );
}