import { forwardRef } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormContext } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

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
  const { setValue, getValues } = useFormContext();
  
  return (
    <>
      <DatePicker 
        id={id}
        readOnly={readOnly}
        minData={}
        maxDate={new Date()}
        dateFormat="dd/MM/yyyy"
        selected={getValues(id)} 
        onChange={(date) => setValue(id, date, { shouldValidate: true, shouldDirty: true, shouldTouch: true})} 
        customInput={<CustomInput inputValidations={inputValidations} />}
      />
    </>
  );
}
