import { useState, useRef, forwardRef } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef((props, ref) => {
  const { id } = props;
  
  return (
    <Form.Control 
      id={id}
      type="text"
      {...(!readOnly ? { placeholder: "Select a date..." } : {})}
      {...(readOnly ? { readOnly: true, plaintext: true, className: "text-sm" } : {})}
    />
  );
});

export default function DatePickerWithHeader(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  return (
    <>
      <DatePicker 
        selected={selectedDate} 
        onChange={(date) => setSelectedDate(date)} 
        customInput={<CustomInput />}
      />
    </>
  );
}
