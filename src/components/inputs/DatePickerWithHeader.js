import { useState, forwardRef } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormContext } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef((props, ref) => {
  const { value, onClick, onChange } = props;

  console.log(props);
  
  return (
    <Form.Control
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
    />
  );
});

export default function DatePickerWithHeader({ id, readOnly }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  return (
    <>
      <DatePicker 
        id={id}
        selected={selectedDate} 
        className="form-control"
        onChange={(date) => setSelectedDate(date)} 
        //customInput={<CustomInput />}
      />
    </>
  );
}
