import classNames from "classnames";
import { subYears, getMonth, getYear } from "date-fns";
import React, { useState, useEffect, forwardRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
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

const CustomHeader = ({ date, minDate, maxDate, changeYear, changeMonth, decreaseMonth, increaseMonth, 
                       prevMonthButtonDisabled, nextMonthButtonDisabled }) => {
  const months = getMonthList("en");
  
  return (  
    <div className="d-flex">
      <span className={classNames("datepicker-prev-month", { "d-none": prevMonthButtonDisabled })}>
        <i className="fa-solid fa-chevron-left fa-lg" onClick={decreaseMonth} />
      </span>
      <div className="datepicker-month">
        <div className="datepicker-current-month">
          <select 
            className="datepicker-monthDropdown-months me-2"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
          >
            { months.map((month, index) => {
              let disabled = (getYear(date) === getYear(minDate)) 
                || ((getYear(date) === getYear(maxDate)) && (index >= getMonth(maxDate)));
              return (<option className="datepicker-monthDropdown-month" value={month} {...(disabled ? { "disabled": "true"} : {})}>{month}</option>);
            })}
          </select>
          
        </div>
      </div>
      <span className={classNames("datepicker-next-month", { "d-none": nextMonthButtonDisabled })}>
        <i className="fa-solid fa-chevron-right fa-lg" onClick={increaseMonth} />
      </span>
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
      { !readOnly && <InputGroup.Text className="fa-regular fa-calendar-days pb-2 me-2" /> }
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

  // Show datepicker on full mode if window with is small
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
            renderCustomHeader={({ 
              date, 
              changeYear, 
              changeMonth, 
              decreaseMonth,
              increaseMonth, 
              prevMonthButtonDisabled, 
              nextMonthButtonDisabled
            }) => (
              <CustomHeader 
                date={date}
                minDate={minDate} 
                maxDate={maxDate} 
                changeYear={changeYear} 
                changeMonth={changeMonth} 
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
                prevMonthButtonDisabled={prevMonthButtonDisabled} 
                nextMonthButtonDisabled={nextMonthButtonDisabled} 
              />
            )}
          />
        )}
      />
    </>
  );
}
