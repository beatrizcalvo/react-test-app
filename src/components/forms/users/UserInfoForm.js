import { Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function UserInfoForm(props) {
  const { user, readOnly } = props;
  const { register, formState: { errors } } = useForm();

  // Input form validations
  const inputValidations = {
    firstName: {
      required: "First name is required",
      minLength: {
        value: 3,
        message: "First name must have at lenght 3 or greater",
      },
    },
    lastName: {
      required: "Last name is required",
      minLength: {
        value: 3,
        message: "Last name must have at lenght 3 or greater",
      }
  };
  
  return (
    <>
      <Form>
        <Row>
          <Col className="col-4">
            <Form.Group className="input-group input-group-static">
              <label className="font-weight-bold">First Name:</label>
              <Form.Control 
                type="text" 
                placeholder="First Name..."
                {...register("firstName", inputValidations.firstName)}
                {...(readOnly ? { plaintext disabled defaultValue=user.firstName } : {})} 
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="text-xs invalid">
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-4">
          </Col>
          <Col className="col-4">
          </Col>
        </Row>
      </Form>
    </>
  );
}
