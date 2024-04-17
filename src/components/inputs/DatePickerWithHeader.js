import classNames from "classnames";
import { subYears } from "date-fns";
import { useState, forwardRef } from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
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

const CustomHeader = ({ date }) => {
  const [ showMonthSelect, setShowMonthSelect ] = useState(false);
  const months = getMonthList("en");
  
  return (
    <Row className="pb-3">
      <Col className="my-auto ms-1 col-5">
        <div className="react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--scroll">
          <div className="react-datepicker__month-read-view">
            <span className="react-datepicker__month-read-view--selected-month form-select text-bold text-sm">
              {months[date.getMonth()]}
            </span>
          </div>
        </div>
      </Col>
      <Col className="my-auto col-5">
        <div className="react-datepicker__year-dropdown-container">
        </div>
      </Col>
      <Col className="my-auto col-1">
        <i className="fa-solid fa-arrow-up fa-2xl" />
      </Col>
      <Col className="my-auto me-4 col-1"> 
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
  const { control } = useFormContext();
  
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
            withPortal
            renderCustomHeader={({ date }) => <CustomHeader date={date} />}
          />
        )}
      />
    </>
  );
}
