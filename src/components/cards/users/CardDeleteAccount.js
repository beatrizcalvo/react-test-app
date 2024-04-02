import { useState } from "react";
import { Card } from "react-bootstrap";

import { useAlerts } from "../../../hooks/providers/AlertsProvider";
import { useAuth } from "../../../hooks/providers/AuthProvider";
import UsersService from "../../../services/UsersService";
import ButtonLoading from "../../buttons/ButtonLoading";

export default function CardDeleteAccount(props) {
  const connectionError = "Cannot connect to the user registration server.";
  
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingDeactivate, setIsLoadingDeactivate] = useState(false);
  const { id, isActionInProgress, setIsActionInProgress } = props;
  const { logoutUser } = useAuth();
  const { addNewAlert } = useAlerts();

  // Deactivate account from server
  const handleDeactivateAccount = () => {
    setIsActionInProgress(true);
    setIsLoadingDeactivate(true);
    UsersService.deactivateCurrentUser()
      .then(response => logoutUser())
      .catch(error => {
        const errorMessage = (error.response && error.response.data && error.response.data.errors && 
                              error.response.data.errors[0].description) 
          || connectionError;
        addNewAlert("danger", "Deactivating Account - " + errorMessage);
      })
      .finally(() => {
        setIsActionInProgress(false);
        setIsLoadingDeactivate(false)
      });
  };

  // Delete account from server
  const handleDeleteAccount = () => {
    setIsActionInProgress(true);
    setIsLoadingDelete(true);
    UsersService.deleteCurrentUser()
      .then(response => logoutUser())
      .catch(error => {
        const errorMessage = (error.response && error.response.data && error.response.data.errors && 
                              error.response.data.errors[0].description) 
          || connectionError;
        addNewAlert("danger", "Deleting Account - " + errorMessage);
      })
      .finally(() => {
        setIsActionInProgress(false);
        setIsLoadingDelete(false)
      });
  };

  return (
    <>
      <Card id={id} className="mt-4">
        <Card.Body>
          <div className="d-flex align-items-center mb-sm-0 mb-4">
            <div className="w-50">
              <h5>Delete Account</h5>
              <p className="text-sm mb-0">Once you delete your account, there is no going back. Please be certain.</p>
            </div>
            <div className="w-50 text-end">
              <ButtonLoading 
                variant="outline-secondary"
                type="button" 
                className="mb-3 mb-md-0 ms-auto"
                titleButton="Deactivate" 
                isLoading={isLoadingDeactivate}
                disabled={isActionInProgress} 
                handleOnClick={() => handleDeactivateAccount()}
              />
              <ButtonLoading
                variant="primary"
                type="button"
                className="bg-gradient-danger mb-0 ms-2"
                titleButton="Delete Account" 
                isLoading={isLoadingDelete}
                disabled={isActionInProgress} 
                handleOnClick={() => handleDeleteAccount()}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
