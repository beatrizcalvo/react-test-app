import { useState, forwardRef } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormContext } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef((props, ref) => {
  const { id, readOnly, onClick, value } = props;

  console.log(props);
  
  return (
    <Form.Control 
      id={id}
      type="text"
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
        className="w-100"
        customInput={<CustomInput props />}
      />
    </>
  );
}
