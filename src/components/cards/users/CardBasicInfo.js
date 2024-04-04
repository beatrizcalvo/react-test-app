import classNames from "classnames";
import { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

import { useAuth } from "../../../hooks/providers/AuthProvider";
import { useAlerts } from "../../../hooks/providers/AlertsProvider";

import LinkTooltip from "../../popups/LinkTooltip";
import UserInfoForm from "../../forms/users/UserInfoForm";

export default function CardBasicInfo(props) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const { id, isActionInProgress, setIsActionInProgress } = props;
  const { user } = useAuth();
  const { addNewAlert } = useAlerts();

  // Submit format and update profile if input fields has not errors
  const handleUpdateProfile = (data) => {
    console.log(JSON.stringify(data));
  };
  
  return (
    <>
      <Card id={id} className="mt-4">
        <Card.Header>
          <Row>
            <Col className="col-8">
              <h5>Basic Info</h5>
            </Col>   
            <Col className={classNames("col-4 text-end", { "d-none": !isReadOnly && !isActionInProgress })}>
              <LinkTooltip id="update-profile" title="Update Profile" showTooltip="true">
                <a className="text-secondary text-sm" onClick={() => setIsReadOnly(!isReadOnly)}>
                  <i className="fas fa-user-edit" />
                </a>
              </LinkTooltip>
            </Col> 
          </Row>
        </Card.Header>
        <Card.Body className="pt-0">
          <UserInfoForm 
            user={user} 
            readOnly={isReadOnly} 
            setReadOnly={setIsReadOnly}
            isActionInProgress={isActionInProgress} 
            setIsActionInProgress={setIsActionInProgress}
            handleUpdateProfile={handleUpdateProfile} 
          />
        </Card.Body>
      </Card>
    </>
  );
}
