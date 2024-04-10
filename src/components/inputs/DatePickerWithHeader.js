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
      onFocus={() => alert("abre calendario")}
    />
  );
});

export default function DatePickerWithHeader(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { id } = props;
  
  return (
    <>
      <DatePicker 
        id={id}
        selected={selectedDate} 
        onChange={(date) => setSelectedDate(date)} 
        customInput={<CustomInput />}
      />
    </>
  );
}
