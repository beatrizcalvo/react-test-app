import classNames from "classnames";
import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import { useAuth } from "../../../hooks/providers/AuthProvider";
import UsersService from "../../../services/UsersService";

import Combobox from "../../inputs/Combobox";
import DatePickerWithHeader from "../../inputs/DatePickerWithHeader";
import ButtonLoading from "../../buttons/ButtonLoading";

export default function UserInfoForm(props) {
  const [nationalitiesList, setNationalitiesList] = useState([]);
  
  const { user, readOnly, setReadOnly, isActionInProgress, isLoading, handleUpdateProfile } = props;
  const { logoutUser } = useAuth();

  // Set default values for form
  const formDefaultValues = {
    firstName: user.person.personName.firstName,
    lastName: user.person.personName.lastName,
    secondLastName: user.person.personName.secondLastName,
    gender: { description: user.person.gender },
    nationality: user.person.firstNationality
  };
  
  const methods = useForm({ defaultValues: formDefaultValues });
  const { register, handleSubmit, reset, setFocus, formState: { errors, dirtyFields } } = methods;

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
    },
    gender: { required: "Gender is required" },
    birthdayDate: { required: "Birthday Date is required" },
    nationality: { required: "Nacionality is required" }
  };

  useEffect(() => {
    // Load nationalities list from server
    UsersService.getNationalities()
      .then(response => {
        const itemsList = [];
        response.data.nationalities?.map(nationality => {
          itemsList.push({
            code: nationality.nationalityCode,
            description: nationality.nationalityDescription
          });
        });
        setNationalitiesList(itemsList);
      })
      .catch(() => logoutUser());
  }, []);

  useEffect(() => {
    if (!readOnly) setFocus("firstName");
  }, [readOnly]);

  // Reset form and close edit mode
  const handleCancel = () => {
    reset();
    setReadOnly(!readOnly);
  };

  const getDirtyValues = (dirtyFields: UnknownArrayOrObject | boolean, allValues: UnknownArrayOrObject): UnknownArrayOrObject => {
    // If *any* item in an array was modified, the entire array must be submitted, because there's no
    // way to indicate "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
    if (dirtyFields === true || Array.isArray(dirtyFields)) {
      return allValues;
    }
    return Object.fromEntries(Object.keys(dirtyFields).map((key) => [key, getDirtyValues(dirtyFields[key], allValues[key])]));
  };

  // Get only fields updated and submit form
  const onSubmit = (data) => {
    console.log(JSON.stringify(dirtyFields));
    const dataUpdated = getDirtyValues(dirtyFields, data);
    console.log(JSON.stringify(dataUpdated));
  };
  
  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col className="col-6 col-md-4 mb-4">
              <Form.Group className="input-group input-group-static">
                <label for="firstName" className="font-weight-bold">First Name:</label>
                <Form.Control 
                  id="firstName"
                  type="text" 
                  {...(!readOnly ? { placeholder: "First Name..." } : {})}
                  {...register("firstName", inputValidations.firstName)}
                  {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="text-xs invalid">
                  {errors.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-6 col-md-4 mb-4">
              <Form.Group className="input-group input-group-static">
                <label for="lastName" className="font-weight-bold">Last Name:</label>
                <Form.Control 
                  id="lastName"
                  type="text" 
                  {...(!readOnly ? { placeholder: "Last Name..." } : {})}
                  {...register("lastName", inputValidations.lastName)}
                  {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="text-xs invalid">
                  {errors.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className={classNames("col-6 col-md-4 mb-4", { "d-none": readOnly && !user.person.personName.secondLastName })}>
              <Form.Group className="input-group input-group-static">
                <label for="secondLastName" className="font-weight-bold">Second Last Name:</label>
                <Form.Control 
                  id="secondLastName"
                  type="text" 
                  {...(!readOnly ? { placeholder: "Second Last Name..." } : {})}
                  {...register("secondLastName", inputValidations.secondLastName)}
                  {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
                  isInvalid={!!errors.secondLastName}
                />
                <Form.Control.Feedback type="text-xs invalid">
                  {errors.secondLastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-6 col-md-4">
              <Form.Group className="input-group input-group-static">
                <label for="gender" className="font-weight-bold">Gender:</label>
                <Combobox 
                  id="gender" 
                  readOnly={readOnly} 
                  choicesList={[{code: "f", description: "Female"}, {code: "m", description: "Male"}]} 
                  inputValidations={inputValidations.gender}
                />
                <Form.Control.Feedback type="text-xs invalid">
                  {errors.gender?.description?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-6 col-md-4">
              <Form.Group className="input-group input-group-static">
                <label for="birthdayDate" className="font-weight-bold">Birthday Date:</label>
                <DatePickerWithHeader 
                  id="birthdayDate"
                  readOnly={readOnly} 
                />
              </Form.Group>
            </Col>
            <Col className="col-6 col-md-4">
              <Form.Group className="input-group input-group-static">
                <label for="nationality" className="font-weight-bold">Nationality:</label>
                <Combobox 
                  id="nationality" 
                  readOnly={readOnly} 
                  choicesList={nationalitiesList} 
                  inputValidations={inputValidations.nationality}
                />
                <Form.Control.Feedback type="text-xs invalid">
                  {errors.nationality?.description?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className={!readOnly ? "mt-5" : "d-none"}>
            <Col lg="8" className="col-12 text-end ms-auto">
              <Button 
                type="button"
                variant="outline-dark"
                className="mb-0" 
                disabled={isActionInProgress || isLoading}
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
              <ButtonLoading
                variant="primary"
                type="submit"
                className="bg-gradient-dark mb-0 ms-3" 
                titleButton="Save Changes"
                disabled={isActionInProgress}
                isLoading={isLoading}
              />
            </Col>
          </Row>
        </Form>
      </FormProvider>
    </>
  );
}
