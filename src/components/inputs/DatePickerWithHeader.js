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
      ref={ref}
      type="text"
      onClick={onClick}
    />
  );
});

export default function DatePickerWithHeader(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { id, readOnly } = props;
  
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
