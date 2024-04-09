import classNames from "classnames";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export default function ButtonCombobox(props) {
  const [isOpen, setIsOpen ] = useState(false);	
  const { id, readOnly, inputValidations, choicesList } = props;
  const { register, getValues, setValue, setFocus, trigger, formState: { errors } } = useFormContext();

  // Set ids for combo controls
  const comboIdCode = id + ".code";
  const comboIdDescription = id + ".description";

  // Calculate placeholder text
  const getPlaceholder = () => {
    if (!readOnly) return "Select one...";
    if (!getValues(comboIdDescription)) return "Not Defined";
    return "";
  };

  // Set selected value and close combobox
  const handleSelectChoice = (code, description) => {
    setValue(comboIdCode, code);
    setValue(comboIdDescription, description);
    setIsOpen(false);
    trigger(comboIdDescription);
    setFocus(comboIdDescription);
  };

  // Close combobox if component is blur
  // Use timeout to execute onBlur event after select a choice
  const handleComboboxOnBlur = () => {
    setTimeout(() => {
      if (document.activeElement.id !== comboIdDescription) setIsOpen(false);
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
          <div {...(!readOnly ? { className: classNames("choices__list--single", { "choices__list": !errors[id] }) } : {})}>
	    <Form.Control
	      id={comboIdDescription}
	      type="text"
	      readOnly="true"
	      placeholder={getPlaceholder()}
              {...register(comboIdDescription, inputValidations)}
	      {...(readOnly ? { plaintext: true, className: "text-sm" } : {})}
	      isInvalid={!!errors[id]}
	    />
            <Form.Control 
              id={comboIdCode}
	      type="hidden"
	      {...register(comboIdCode)}
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
		    onClick={() => handleSelectChoice(choice.code, choice.description)} 
		    onMouseEnter={() => document.getElementById(idElement).classList.add("is-highlighted")}
      		    onMouseLeave={() => document.getElementById(idElement).classList.remove("is-highlighted")}
		  >
		    {choice.description}
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
