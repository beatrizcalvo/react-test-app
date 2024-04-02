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
    },
    secondLastName: {
      minLength: {
        value: 3,
        message: "Second last name must have at lenght 3 or greater",
      }
    }
  };
  
  return (
    <>
      <Form>
        <Row>
          <Form.Group as={Col} className="col-4 input-group input-group-static">
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
          <Form.Group as={Col} className="col-4 input-group input-group-static">
            <label className="font-weight-bold">Last Name:</label>
            <Form.Control 
              type="text" 
              placeholder="Last Name..."
              {...register("lastName", inputValidations.lastName)}
              {...(readOnly ? { plaintext disabled defaultValue=user.lastName } : {})} 
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="text-xs invalid">
              {errors.lastName?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="col-4 input-group input-group-static">
            <label className="font-weight-bold">Second Last Name:</label>
            <Form.Control 
              type="text" 
              placeholder="Second Last Name..."
              {...register("secondLastName", inputValidations.secondLastName)}
              {...(readOnly ? { plaintext disabled defaultValue=user.secondLastName } : {})} 
              isInvalid={!!errors.secondLastName}
            />
            <Form.Control.Feedback type="text-xs invalid">
              {errors.secondLastName?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          
        </Row>
      </Form>
    </>
  );
}
