import classNames from "classnames";
import { subYears } from "date-fns";
import { forwardRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(({ id, value, readOnly, onChange, onClick }, ref) => {
  const { formState: { errors } } = useFormContext();
  
  // Calculate placeholder text
  const getPlaceholder = () => {
    if (!readOnly) return "Select one date...";
    if (!value) return "Not Defined";
    return "";
  };
  
  return(
    <>
    <InputGroup>
        <InputGroup.Text className="fa-regular fa-calendar-days" style={{ padding-bottom: .6rem}} />
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    <Form.Control 
      id={id}
      type="text"
      readOnly="true"
      placeholder={getPlaceholder()}
      {...(readOnly ? { plaintext: true, className: "text-sm" } : {})}
      value={value}
      isInvalid={!!errors[id]}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
    />
  </>
  );
});

export default function DatePickerWithHeader({ id, readOnly, inputValidations }) {
  const { control } = useFormContext();
  
  return (
    <>
      <Controller
        name={id}
        control={control} 
        rules={inputValidations}
        render={({ field: { name, value, onChange }, formState: { errors } }) => (
          <DatePicker
            id={name}
            wrapperClassName={classNames({ "is-invalid": !!errors[name] })}
            readOnly={readOnly}
            dateFormat="dd/MM/yyyy"
            minDate={subYears(new Date(), 70)}
            maxDate={subYears(new Date(), 18)}
            selected={value}
            onChange={(date) => onChange(date)}
            customInput={<CustomInput />}
          />
        )}
      />
    </>
  );
}
