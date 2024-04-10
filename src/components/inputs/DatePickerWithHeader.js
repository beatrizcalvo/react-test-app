import { useState, forwardRef } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormContext } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(({ id, readOnly, onChange, onClick }, ref) => {
  const { register, getValues } = useFormContext();

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
      //value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
    />
  );
});

export default function DatePickerWithHeader({ id, readOnly }) {
  const [selectedDate, setSelectedDate] = useState(undefined);
  
  return (
    <>
      <DatePicker 
        id={id}
        readOnly={readOnly}
        selected={selectedDate} 
        onChange={(date) => setSelectedDate(date)} 
        customInput={<CustomInput />}
      />
    </>
  );
}
