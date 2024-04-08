import classNames from "classnames";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export default function ButtonCombobox(props) {
  const [isOpen, setIsOpen ] = useState(false);	
  const { id, readOnly, inputValidations, choicesList } = props;
  const { register, getValues, setValue, setFocus, trigger, formState: { errors } } = useFormContext();

  // Set ids for combo controls
  const comboIdValue = id + ".value";
  const comboIdKey = id + ".key";

  // Calculate placeholder text
  const getPlaceholder = () => {
    if (!readOnly) return "Select one...";
    if (!getValues(comboIdValue)) return "Not Defined";
    return "";
  };

  // Set selected value and close combobox
  const handleSelectChoice = (key, value) => {
    setValue(comboIdValue, value);
    setIsOpen(false);
    trigger(comboIdValue);
    setFocus(comboIdValue);
  };

  // Close combobox if component is blur
  // Use timeout to execute onBlur event after select a choice
  const handleComboboxOnBlur = () => {
    setTimeout(() => {
      if (document.activeElement.id !== comboIdValue) setIsOpen(false);
    }, 300);
  };
	
  return (
    <>
      <div 
        className={classNames("choices", { "is-open is-focused": isOpen, "is-invalid": !!errors[id] })} 
	role="combobox"
        data-type={readOnly ? "none" : "select-one"} 
        aria-expanded={isOpen} 
	{...(!readOnly ? { onBlur: () => handleComboboxOnBlur() } : {})} 
      >
        <div 
          {...(!readOnly ? { className: "choices__inner" } : {})}
	  {...(!readOnly ? { onClick: () => setIsOpen(!isOpen) } : {})} 
	>
          <div {...(!readOnly ? { className: "choices__list choices__list--single" } : {})}>
	    <Form.Control
	      id={comboIdValue}
	      type="text"
	      readOnly="true"
	      placeholder={getPlaceholder()}
              {...register(comboIdValue, inputValidations)}
	      {...(readOnly ? { plaintext: true, className: "text-sm" } : {})}
	      isInvalid={!!errors[id]}
	    />
            <Form.Control 
	      type="hidden"
	    />
	  </div>
        </div>
        <div className={classNames("choices__list choices__list--dropdown", { "is-active is-focused": isOpen })} aria-expanded={isOpen}>
	  <div className="choices__list" role="listbox">
	    { 
	      choicesList.map((choice, index) => {
		const idElement = "choices--choices-" + id + "-item-choice-" + index;
	        return (
		  <div 
		    id={idElement} 
		    className="choices__item choices__item--choice choices__item--selectable" 
		    onClick={() => handleSelectChoice(choice.key, choice.value)} 
		    onMouseEnter={() => document.getElementById(idElement).classList.add("is-highlighted")}
      		    onMouseLeave={() => document.getElementById(idElement).classList.remove("is-highlighted")}
		  >
		    {choice.value}
		  </div>
		);
	      })
	    }
	  </div>
        </div>
      </div>
    </>
  );
};
