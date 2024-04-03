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
          <Col className="col-6 col-md-4">
            <Form.Group className="input-group input-group-static">
              <label className="font-weight-bold">First Name:</label>
              <Form.Control 
                type="text" 
                {...(!readOnly ? { placeholder: "First Name..." } : {})}
                {...register("firstName", inputValidations.firstName)}
                {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
                defaultValue={user.firstName}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="text-xs invalid">
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-6 col-md-4">
            <Form.Group className="input-group input-group-static">
              <label className="font-weight-bold">Last Name:</label>
              <Form.Control 
                type="text" 
                {...(!readOnly ? { placeholder: "Last Name..." } : {})}
                {...register("lastName", inputValidations.lastName)}
                {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
                defaultValue={user.lastName}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="text-xs invalid">
                {errors.lastName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-6 col-md-4">
            <Form.Group className="input-group input-group-static">
              <label className="font-weight-bold">Second Last Name:</label>
              <Form.Control 
                type="text" 
                {...(!readOnly ? { placeholder: "Second Last Name..." } : {})}
                {...register("secondLastName", inputValidations.secondLastName)}
                {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
                defaultValue={user.secondLastName}
                isInvalid={!!errors.secondLastName}
              />
              <Form.Control.Feedback type="text-xs invalid">
                {errors.secondLastName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="col-4">
            <Form.Group className="input-group input-group-static">
              <label className="font-weight-bold">Gender:</label>
              <div className="choices" data-type="select-one">
                <Form.Control 
                  id="choices-gender" 
                  as="select" 
                >
                  <div className="choices__list choices__list--dropdown">
                    {["Male", "Female", "Other"].map(option => {
                      <option key={option}>{option}</option>
                    })}
                  </div>
                </Form.Control>
              </div>
            </Form.Group>
          </Col>
          <Col className="col-8">
            <Form.Group className="input-group input-group-static">
              <label className="font-weight-bold">Birth Date:</label>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}
