import classNames from "classnames";
import { subYears, getMonth, getYear } from "date-fns";
import { useState, useEffect, forwardRef } from "react";
import { Form, InputGroup, Dropdown } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

// Get list of month depending on locale and format
const getMonthList = (locales?: string | string[], format: "long" | "short" = "long"): string[] => {
  const year = new Date().getFullYear();
  const monthList = [...Array(12).keys()];
  const formatter = new Intl.DateTimeFormat(locales, { month: format });
  const getMonthName = (monthIndex: number) => formatter.format(new Date(year, monthIndex));
  return monthList.map(getMonthName);
};

const CustomHeaderToggle = forwardRef(({ children, onClick }, ref) => (
  <a href="" ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

const CustomHeader = ({ date }) => {
  
  return (  
    <div className="d-flex justify-content-center">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          Custom toggle
        </Dropdown.Toggle>
      </Dropdown>
    </div>
  );
};

const CustomInput = forwardRef(({ id, value, readOnly, onChange, onClick }, ref) => {
  const { formState: { errors } } = useFormContext();
  
  // Calculate placeholder text
  const getPlaceholder = () => {
    if (!readOnly) return "Select one date...";
    if (!value) return "Not Defined";
    return "";
  };
  
  return (
    <InputGroup>
      { !readOnly && <InputGroup.Text className="fa-regular fa-calendar-days pb-2" /> }
      <Form.Control 
        id={id}
        type="text"
        readOnly="true"
        placeholder={getPlaceholder()}
        {...(readOnly ? { plaintext: true, className: "text-sm" } : {})}
        value={value}
        isInvalid={!!errors[id]}
        onChange={(e) => onChange(e.target.value)}
        onClick={onClick}
      />
    </InputGroup>
  );
});

export default function DatePickerWithHeader({ id, readOnly, inputValidations }) {
  const [ showPortal, setShowPortal ] = useState(false);
  const { control } = useFormContext();
  const minDate = subYears(new Date(), 70);
  const maxDate = subYears(new Date(), 18);

useEffect(() => {
  const handleResize = () => { setShowPortal(window.innerWidth < 768); };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
  
  return (
    <>
      <Controller
        name={id}
        control={control} 
        rules={inputValidations}
        render={({ field: { name, value, onChange }, formState: { errors } }) => (
          <DatePicker
            id={name}
            wrapperClassName={classNames({ "is-invalid": !!errors[name] })}
            readOnly={readOnly}
            calendarStartDay={1}
            formatWeekDay={nameOfDay => nameOfDay.substring(0,2).toUpperCase()}
            dateFormat="dd/MM/yyyy"
            minDate={minDate}
            maxDate={maxDate}
            selected={value}
            onChange={(date) => onChange(date)} 
            customInput={<CustomInput />}
            {...showPortal ? { withPortal: true } : {}}
            renderCustomHeader={({ date }) => { <CustomHeader date={date} />}}
          />
        )}
      />
    </>
  );
}
