import classNames from "classnames";
import { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

import { useAuth } from "../../../hooks/providers/AuthProvider";
import { useAlerts } from "../../../hooks/providers/AlertsProvider";
import UsersService from "../../../services/UsersService";

import LinkTooltip from "../../popups/LinkTooltip";
import UserInfoForm from "../../forms/users/UserInfoForm";

export default function CardBasicInfo(props) {
  const connectionError = "Cannot connect to the user registration server.";
  
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const { id, isActionInProgress, setIsActionInProgress } = props;
  const { user, setUser } = useAuth();
  const { addNewAlert } = useAlerts();

  // Submit format and update profile if input fields has not errors
  const handleUpdateProfile = (data) => {
    setIsActionInProgress(true);
    setIsLoading(true);

    UsersService.updateCurrentUser(data)
      .then(() => {
        setIsReadOnly(true);
        addNewAlert("success", "Updated user info");
      })
      .catch(error => {
        const errorMessage = (error.response && error.response.data && error.response.data.errors && 
                              error.response.data.errors[0].description) 
          || connectionError;
        addNewAlert("danger", "Updating User Info - " + errorMessage);
      })
      .finally(() => {
        setIsActionInProgress(false);
        setIsLoading(false);
      });
  };
  
  return (
    <>
      <Card id={id} className="mt-4">
        <Card.Header>
          <Row>
            <Col className="col-8">
              <h5>Basic Info</h5>
            </Col>   
            <Col className={classNames("col-4 text-end", { "d-none": !isReadOnly || isActionInProgress })}>
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
            isLoading={isLoading}
            handleUpdateProfile={handleUpdateProfile} 
          />
        </Card.Body>
      </Card>
    </>
  );
}
