import { useState, useRef, forwardRef } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormContext } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef((props, ref) => {
  const { value, onClick, onChange } = props;

  console.log(props);
  
  return (
    <input
      type="text"
      value={value}
      ref={ref}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
    />
  );
});

export default function DatePickerWithHeader({ id, readOnly }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const inputRef = useRef(null);
  
  return (
    <>
      <DatePicker 
        id={id}
        selected={selectedDate} 
        onChange={(date) => setSelectedDate(date)} 
        customInput={<CustomInput inputRef={inputRef} />}
      />
    </>
  );
}
