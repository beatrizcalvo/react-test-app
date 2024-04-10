import { useState, forwardRef } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormContext } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef((props, ref) => {
  const { id, value, onClick, onChange } = props;

  console.log(props);
  
  return (
    <Form.Control
      id={id}
      type="text"
      readOnly="true"
      //value={value}
      //onChange={(e) => onChange(e.target.value)}
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
        selected={selectedDate} 
        className="form-control"
        onChange={(date) => setSelectedDate(date)} 
        customInput={<CustomInput />}
      />
    </>
  );
}
