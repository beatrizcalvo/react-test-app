import classNames from "classnames";
import { subYears, format } from "date-fns";
import { useState, forwardRef } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const CustomHeader = forwardRef(({ id, readOnly, inputValidations }, ref) => {
  const { setValue, getValues, formState: { errors } } = useFormContext();
  
  return (
    <>
      <DatePicker 
        id={id}
        wrapperClassName={classNames({ "is-invalid": !!errors[id] })}
        readOnly={readOnly}
        minDate={subYears(new Date(), 70)}
        maxDate={subYears(new Date(), 18)}
        onChange={(date) => setValue(id, format(date, "dd/MM/yyyy"), { 
          shouldValidate: true, 
          shouldDirty: true, shouldTouch: true 
        })}
        customInput={<CustomInput inputValidations={inputValidations} />}
      />
    </>
  );
});

const CustomInput = forwardRef(({ id, readOnly, inputValidations, onChange, onClick }, ref) => {
  const { register, getValues, formState: { errors }} = useFormContext();
  
  // Calculate placeholder text
  const getPlaceholder = () => {
    if (!readOnly) return "Select one date...";
    if (!getValues(id)) return "Not Defined";
    return "";
  };
  
  return (
    <Form.Control
      id={id}
      type="text"
      readOnly="true"
      placeholder={getPlaceholder()}
      {...(readOnly ? { plaintext: true, className: "text-sm" } : {})}
      {...register(id, inputValidations)}
      isInvalid={!!errors[id]}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
    />
  );
});

export default function DatePickerWithHeader({ id, readOnly, inputValidations }) {
  const [selectedDate, setSelectedDate] = useState();
  const { control, setValue } = useFormContext();

  const handleChange = (dateChange) => {
    setValue("dateOfBirth", dateChange, { shouldDirty: true });
    setSelectedDate(dateChange);
  };
  
  return (
    <>
      <Controller 
        name="dateOfBirth"
        control={control}
        as={
          <DatePicker
            selected={selectedDate}
            placeholderText="Select date"
            onChange={(date) => setSelectedDate(date)}
          />
        }
      />
    </>
  );
}
