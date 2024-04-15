import classNames from "classnames";
import { subYears, format } from "date-fns";
import { forwardRef } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormContext } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const CustomHeader = forwardRef(({ props }, ref) => {
  console.log(props);
  
  return (
    <div></div>
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
  const { setValue, getValues, formState: { errors } } = useFormContext();
  
  return (
    <>
      <DatePicker 
        id={id}
        wrapperClassName={classNames({ "is-invalid": !!errors[id] })}
        readOnly={readOnly}
        minDate={subYears(new Date(), 70)}
        maxDate={subYears(new Date(), 18)}
        selected={getValues(id)} 
        onChange={(date) => {
          console.log(new Date(date));
          setValue(id, format(new Date(date), "dd/MM/yyyy"), { shouldValidate: true, shouldDirty: true, shouldTouch: true });
        }}
        customInput={<CustomInput inputValidations={inputValidations} />}
      />
    </>
  );
}
