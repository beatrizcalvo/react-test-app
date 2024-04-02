import { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

import { useAuth } from "../../../hooks/providers/AuthProvider";
import { useAlerts } from "../../../hooks/providers/AlertsProvider";
import UserInfoForm from "../../forms/users/UserInfoForm";

export default function CardBasicInfo(props) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const { id, isActionInProgress, setIsActionInProgress } = props;
  const { user } = useAuth();
  const { addNewAlert } = useAlerts();

  const toggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };
  
  return (
    <>
      <Card id={id} className="mt-4">
        <Card.Header>
          <Row>
            <Col className="col-8">
              <h5>Basic Info</h5>
            </Col>
            {
              if (readOnly) {
                <Col className="col-4 text-end">
                  <a className="text-secondary text-sm" onClick={() => toggleReadOnly()}>
                    <i className="fas fa-user-edit" />
                  </a>
                </Col>
              }
            }            
          </Row>
        </Card.Header>
        <Card.Body className="pt-0">
          <UserInfoForm user={user} readOnly={isReadOnly} />
        </Card.Body>
      </Card>
    </>
  );
}
