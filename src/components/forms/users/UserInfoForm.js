import classNames from "classnames";
import { isDate, format } from "date-fns";
import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

import { useAuth } from "../../../hooks/providers/AuthProvider";
import NationalitiesService from "../../../services/NationalitiesService";

import Combobox from "../../inputs/Combobox";
import DatePickerWithHeader from "../../inputs/DatePickerWithHeader";
import ButtonLoading from "../../buttons/ButtonLoading";

export default function UserInfoForm(props) {
  const [nationalitiesList, setNationalitiesList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  
  const { user, readOnly, setReadOnly, isActionInProgress, isLoading, handleUpdateProfile } = props;
  const { logoutUser } = useAuth();

  // Set default values for form
  const formDefaultValues = {
    firstName: user.person.personName.firstName,
    lastName: user.person.personName.lastName,
    secondLastName: user.person.personName.secondLastName,
    gender: { description: user.person.gender },
    birthDate: user.person.birthDate,
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
    birthDate: { required: "Birth date is required" },
    nationality: { required: "Nacionality is required" },
    addressLine1: { 
      required: "Address is required",
      minLength: {
        value: 10,
        message: "Address must have at lenght 10 or greater"
      }
    },
    city: { required: "City is required" },
    zipCode: { 
      required: "ZipCode is required",
      pattern: {
        value: /^[0-9]{5}(?:-[0-9]{4})?$/i,
        message: "Invalid zipCode format"
      }
    },
    country: { required: "Country is required" }
  };

  useEffect(() => {
    // Load nationalities list from server
    NationalitiesService.getNationalities()
      .then(response => {
        const nationalitiesList = [];
        const countriesList = [];
        response.data.nationalities?.map(nationality => {
          nationalitiesList.push({
            code: nationality.nationalityCode,
            description: nationality.nationalityDescription
          });
          countriesList.push({
            code: nationality.nationalityCode,
            description: nationality.nationalityCountry
          });
        });
        setNationalitiesList(nationalitiesList);
        setCountriesList(countriesList);
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

  // Get list (key/value) of modified fields
  const getDirtyValues = (dirtyFields: UnknownArrayOrObject | boolean, allValues: UnknownArrayOrObject): UnknownArrayOrObject => {
    // If *any* item in an array was modified, the entire array must be submitted, because there's no
    // way to indicate "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
    if (dirtyFields === true || Array.isArray(dirtyFields)) {
      // Format date to yyyy-MM-dd
      if (isDate(allValues)) return format(allValues, "yyyy-MM-dd");
      return allValues;
    }
    return Object.fromEntries(Object.keys(dirtyFields).map((key) => [key, getDirtyValues(dirtyFields[key], allValues[key])]));
  };

  // Get only fields updated and submit form
  const onSubmit = (data) => {
    const dataUpdated = getDirtyValues(dirtyFields, data);
    handleUpdateProfile(dataUpdated);
  };
  
  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col className="col-6 col-md-4 mb-3">
              <Form.Group className={classNames("input-group input-group-static", { "required": !readOnly })}>
                <label for="firstName" className="font-weight-bold">First Name</label>
                <Form.Control 
                  id="firstName"
                  type="text" 
                  {...(!readOnly && { placeholder: "First Name..." })}
                  {...register("firstName", inputValidations.firstName)}
                  {...(readOnly && { readOnly: true, plaintext: true, className: "text-sm" })}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="text-xs invalid">
                  {errors.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-6 col-md-4 mb-3">
              <Form.Group className={classNames("input-group input-group-static", { "required": !readOnly })}>
                <label for="lastName" className="font-weight-bold">Last Name</label>
                <Form.Control 
                  id="lastName"
                  type="text" 
                  {...(!readOnly && { placeholder: "Last Name..." })}
                  {...register("lastName", inputValidations.lastName)}
                  {...(readOnly && { readOnly: true, plaintext: true, className: "text-sm" })}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="text-xs invalid">
                  {errors.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className={classNames("col-6 col-md-4 mb-3", { "d-none": readOnly && !user.person.personName.secondLastName })}>
              <Form.Group className="input-group input-group-static">
                <label for="secondLastName" className="font-weight-bold">Second Last Name</label>
                <Form.Control 
                  id="secondLastName"
                  type="text" 
                  {...(!readOnly && { placeholder: "Second Last Name..." })}
                  {...register("secondLastName", inputValidations.secondLastName)}
                  {...(readOnly && { readOnly: true, plaintext: true, className: "text-sm" })}
                  isInvalid={!!errors.secondLastName}
                />
                <Form.Control.Feedback type="text-xs invalid">
                  {errors.secondLastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-6 col-md-4 mb-3">
              <Form.Group className={classNames("input-group input-group-static", { "required": !readOnly })}>
                <label for="gender.description" className="font-weight-bold">Gender</label>
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
            <Col className="col-6 col-md-4 mb-3">
              <Form.Group className={classNames("input-group input-group-static", { "required": !readOnly })}>
                <label for="birthDate" className="font-weight-bold">Birth Date</label>
                <DatePickerWithHeader 
                  id="birthDate"
                  readOnly={readOnly} 
                  inputValidations={inputValidations.birthDate}
                />
                <Form.Control.Feedback type="text-xs invalid" className={classNames({ "d-block": !!errors.birthDate })}>
                  {errors.birthDate?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-6 col-md-4">
              <Form.Group className={classNames("input-group input-group-static", { "required": !readOnly })}>
                <label for="nationality.description" className="font-weight-bold">Nationality</label>
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
          <Row className="mt-4">
            <Col className="col-12 mb-2">
              <h5>Postal Address</h5>
            </Col>
            <Col className="col-12 mb-3">
              <Form.Group className={classNames("input-group input-group-static", { "required": !readOnly })}>
                <label for="addressLine1" className="font-weight-bold">Address Line 1</label>
                <Form.Control 
                  id="addressLine1"
                  type="text" 
                  maxLength="50"
                  {...(!readOnly ? { placeholder: "Address Line 1..." } : { placeholder: "Not Defined"})}
                  {...register("addressLine1", inputValidations.addressLine1)}
                  {...(readOnly && { readOnly: true, plaintext: true, className: "text-sm" })}
                  isInvalid={!!errors.addressLine1}
                />
                <Form.Control.Feedback type="text-xs invalid">
                  {errors.addressLine1?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col> 
            <Col className="col-12 mb-3">
              <Form.Group className="input-group input-group-static">
                <label for="addressLine2" className="font-weight-bold">Address Line 2</label>
                <Form.Control 
                  id="addressLine2"
                  type="text" 
                  maxLength="50"
                  {...(!readOnly ? { placeholder: "Address Line 2..." } : { placeholder: "Not Defined"})}
                  {...register("addressLine2")}
                  {...(readOnly && { readOnly: true, plaintext: true, className: "text-sm" })}
                />
              </Form.Group>
            </Col>
            <Col className="col-6 col-md-4 mb-3">
              <Form.Group className={classNames("input-group input-group-static", { "required": !readOnly })}>
                <label for="city" className="font-weight-bold">City</label>
                <Form.Control 
                  id="city"
                  type="text" 
                  maxLength="80"
                  {...(!readOnly ? { placeholder: "City..." } : { placeholder: "Not Defined"})}
                  {...register("city", inputValidations.city)}
                  {...(readOnly && { readOnly: true, plaintext: true, className: "text-sm" })}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="text-xs invalid">
                  {errors.city?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-6 col-md-4 mb-3">
              <Form.Group className={classNames("input-group input-group-static", { "required": !readOnly })}>
                <label for="zipCode" className="font-weight-bold">ZipCode</label>
                <Form.Control 
                  id="zipCode"
                  type="text" 
                  maxLength="9"
                  {...(!readOnly ? { placeholder: "ZipCode..." } : { placeholder: "Not Defined"})}
                  {...register("zipCode", inputValidations.zipCode)}
                  {...(readOnly && { readOnly: true, plaintext: true, className: "text-sm" })}
                  isInvalid={!!errors.zipCode}
                />
                <Form.Control.Feedback type="text-xs invalid">
                  {errors.zipCode?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="col-6 col-md-4 mb-3">
              <Form.Group className={classNames("input-group input-group-static", { "required": !readOnly })}>
                <label for="country" className="font-weight-bold">Country</label>
                <Combobox 
                  id="country" 
                  readOnly={readOnly} 
                  choicesList={countriesList} 
                  inputValidations={inputValidations.country}
                />
                <Form.Control.Feedback type="text-xs invalid">
                  {errors.countries?.description?.message}
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
