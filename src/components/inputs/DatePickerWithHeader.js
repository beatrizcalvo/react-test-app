import { useState } from "react";
import DatePicker from "react-datepicker";

export default function DatePickerWithHeader(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  return (
    <>
      <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
    </>
  );
}
