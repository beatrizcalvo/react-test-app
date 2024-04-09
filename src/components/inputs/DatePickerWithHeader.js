import { useState, useRef, forwardRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef((props: any, ref) => {
  return <button className="example-custom-input" onClick={props.onClick} ref={ref}>{props.value}</button>;
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
