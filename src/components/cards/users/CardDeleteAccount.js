import { Button } from "react-bootstrap";

export default function CardDeleteAccount(props) {
  const { id } = props;

  return (
    <>
      <Card.Body id={id} className="card">
        <div className="d-flex align-items-center mb-sm-0 mb-4">
          <div className="w-50">
            <h5>Delete Account</h5>
            <p className="text-sm mb-0">Once you delete your account, there is no going back. Please be certain.</p>
          </div>
          <div className="w-50 text-end">
    
          </div>
        </div>
      </Card.Body>
    </>
  );
}
