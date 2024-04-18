import classNames from "classnames";
import { subYears, getMonth, getYear } from "date-fns";
import { useState, useEffect, forwardRef } from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

import Combobox from "./Combobox";

// Get list of month depending on locale and format
const getMonthList = (locales?: string | string[], format: "long" | "short" = "long"): string[] => {
  const year = new Date().getFullYear();
  const monthList = [...Array(12).keys()];
  const formatter = new Intl.DateTimeFormat(locales, { month: format });
  const getMonthName = (monthIndex: number) => formatter.format(new Date(year, monthIndex));
  return monthList.map(getMonthName);
};

const CustomHeader = ({ date, increaseMonth }) => {
  const [ showMonthSelect, setShowMonthSelect ] = useState(false);
  const [ showYearSelect, setShowYearSelect ] = useState(false);
  const months = getMonthList("en");
  
  return (  
    <Row className="pb-3 w-100">
      <Col className="my-auto col-5 me-0">
        <div className="react-datepicker__month-dropdown-container">
          { showMonthSelect && (
            <div className="react-datepicker__month-dropdown">
	      { months.map((month) => {
		return (
		  <div className="react-datepicker__month-option">{month}</div>
		);
	      })}
			<div class="react-datepicker__month-option react-datepicker__month-option--selected_month" aria-selected="true">
				<span class="react-datepicker__month-option--selected">✓</span>
				November
			</div>
            </div>
          )}
          <div 
            className={classNames("react-datepicker__month-read-view", { "d-none": showMonthSelect })}
            onClick={() => setShowMonthSelect(true)}
          >
            <span className="react-datepicker__month-read-view--selected-month">
              <span className="react-datepicker__month-read-view--down-arrow mt-1"></span>
	      <span className="react-datepicker__month-read-view--selected-month text-bold text-sm">
                { months[getMonth(date)] }
              </span>
	    </span>
          </div>
        </div>
	<Combobox id="month-select" readOnly={false} choicesList={months} />
      </Col>
      <Col className="my-auto col-4 me-2">
        <div className="react-datepicker__year-dropdown-container">
          <div 
            className={classNames("react-datepicker__year-read-view", { "d-none": showYearSelect })}
            onClick={() => setShowYearSelect(true)}
          >
            <span className="react-datepicker__year-read-view--selected-year text-bold text-sm">
              <span className="react-datepicker__year-read-view--down-arrow mt-1"></span>
	      <span className="react-datepicker__year-read-view--selected-year text-bold text-sm">
                { getYear(date) }
              </span>
	    </span>
          </div>
        </div>
      </Col>
      <Col className="my-auto col-1">
        <i className="fa-solid fa-arrow-up fa-2xl" />
      </Col>
      <Col className="my-auto col-1">
        <i className="fa-solid fa-arrow-down fa-2xl" />
      </Col>
    </Row>
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
            minDate={subYears(new Date(), 70)}
            maxDate={subYears(new Date(), 18)}
            selected={value}
            onChange={(date) => onChange(date)} 
            customInput={<CustomInput />}
            {...showPortal ? { withPortal: true } : {}}
            renderCustomHeader={({ 
              date, 
              increaseMonth }) => 
                <CustomHeader date={date} increaseMonth={increaseMonth} />
            }
          />
        )}
      />
    </>
  );
}
