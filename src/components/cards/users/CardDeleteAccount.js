import { Button, Card } from "react-bootstrap";

import { useAlerts } from "../../../hooks/providers/AlertsProvider";
import UsersService from "../../../services/UsersService";

export default function CardDeleteAccount(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = props;
  const { addNewAlert } = useAlerts();

  const handleDeleteAccount = () => {
    isLoading(true);
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
              <div className="w-100">
                <Button 
                  variant="outline-secondary" 
                  className="mb-3 mb-md-0 ms-auto"
                  disabled={isLoading}
                >
                  Deactivate
                </Button>
                <Button 
                  className="bg-gradient-danger mb-0 ms-2" 
                  onClick={() => handleDeleteAccount()} 
                  disabled={isLoading}
                >
                   Delete Account
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
