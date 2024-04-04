import classNames from "classnames";
import { useState, useEffect, forwardRef, memo } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ButtonCombobox = forwardRef((props, _ref) => {
  const [isOpen, setIsOpen ] = useState(false);
  const [ selectedValue, setSelectedValue] = useState(undefined);
	
  const { id, readOnly, inputValidations, defaultValue, choicesList } = props;
  const { register, setFocus, formState: { errors } } = useForm();

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, []);

  // Calculate placeholder text
  const getPlaceholder = () => {
    if (!readOnly) return "Select one...";
    if (!selectedValue) return "Not Defined";
    return "";
  };

  // Set selected value and close combobox
  const handleSelectChoice = (item) => {
    setSelectedValue(item);
    setIsOpen(false);
    setFocus(id);
  };

  // Close combobox if component is blur
  // Use timeout to execute onBlur event after select a choice
  const handleComboboxOnBlur = () => {
    setTimeout(() => {
      if (document.activeElement.id !== id) setIsOpen(false);
    }, 300);
  };
	
  return (
    <>
      <div 
        className={classNames("choices", { "is-open is-focused": isOpen })} 
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
	      id={id}
	      type="text"
	      readOnly="true"
	      placeholder={getPlaceholder()}
              {...register(id, inputValidations)}
	      {...(readOnly ? { plaintext: true, className: "text-sm" } : {})}
              value={selectedValue}
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
		    onClick={() => handleSelectChoice(choice)} 
		    onMouseEnter={() => document.getElementById(idElement).classList.add("is-highlighted")}
      		    onMouseLeave={() => document.getElementById(idElement).classList.remove("is-highlighted")}
		  >
		    {choice}
		  </div>
		);
	      })
	    }
	  </div>
        </div>
      </div>
    </>
  );
});

export default memo(ButtonCombobox);
