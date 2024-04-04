import classNames from "classnames";
import { useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

import ButtonCombobox from "../../buttons/ButtonCombobox";
import ButtonLoading from "../../buttons/ButtonLoading";

export default function UserInfoForm(props) {
  const { user, readOnly, handleUpdateProfile } = props;
  const { register, handleSubmit, setFocus, formState: { errors } } = useForm();

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

  useEffect(() => {
    if (!readOnly) setFocus("firstName");
  }, [readOnly]);
  
  return (
    <>
      <Form onSubmit={handleSubmit(handleUpdateProfile)}>
        <Row>
          <Col className="col-6 col-md-4 mb-3">
            <Form.Group className="input-group input-group-static">
              <label for="firstName" className="font-weight-bold">First Name:</label>
              <Form.Control 
                id="firstName"
                type="text" 
                {...(!readOnly ? { placeholder: "First Name..." } : {})}
                {...register("firstName", inputValidations.firstName)}
                {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
                defaultValue={user.person.personName.firstName}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="text-xs invalid">
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className="col-6 col-md-4 mb-3">
            <Form.Group className="input-group input-group-static">
              <label for="lastName" className="font-weight-bold">Last Name:</label>
              <Form.Control 
                id="lastName"
                type="text" 
                {...(!readOnly ? { placeholder: "Last Name..." } : {})}
                {...register("lastName", inputValidations.lastName)}
                {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
                defaultValue={user.person.personName.lastName}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="text-xs invalid">
                {errors.lastName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col className={classNames("col-6 col-md-4 mb-3", { "d-none": readOnly && !user.person.personName.secondLastName })}>
            <Form.Group className="input-group input-group-static">
              <label for="secondLastName" className="font-weight-bold">Second Last Name:</label>
              <Form.Control 
                id="secondLastName"
                type="text" 
                {...(!readOnly ? { placeholder: "Second Last Name..." } : {})}
                {...register("secondLastName", inputValidations.secondLastName)}
                {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
                defaultValue={user.person.personName.secondLastName}
                isInvalid={!!errors.secondLastName}
              />
              <Form.Control.Feedback type="text-xs invalid">
                {errors.secondLastName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-6 col-md-4">
            <Form.Group className="input-group input-group-static">
              <label for="gender" className="font-weight-bold">Gender:</label>
              <ButtonCombobox 
                id="gender" 
                readOnly={readOnly} 
                registerInputForm={register("gender")}
                defaultValue={user.person.genderDescription} 
                choicesList={["Female", "Male"]} 
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className={classNames("mt-5", { "d-none": readOnly })}>
          <Col lg="8" className="col-12 text-end ms-auto">
            <Button 
              type="button"
              variant="outline-dark"
              className="mb-0"
            >
              Cancel
            </Button>
            <button class="btn bg-gradient-dark mb-0 ms-2" type="submit">Save Changes</button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
