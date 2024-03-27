import { Button, Card } from "react-bootstrap";

export default function CardDeleteAccount(props) {
  const { id } = props;

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
              <Button 
                className="btn-outline-secondary mb-3 mb-md-0 ms-auto"
              >
                Deactivate
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
