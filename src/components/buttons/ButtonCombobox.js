import classNames from "classnames";
import { useState, useEffect, forwardRef } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ButtonCombobox(props) {
  const [isOpen, setIsOpen ] = useState(false);
  const [ selectedValue, setSelectedValue] = useState(undefined);
  const { id, readOnly, inputValidations, defaultValue, choicesList } = props;
  const { register, setFocus, formState: { errors } } = useForm();

  useEffect(() => {
    if (!!defaultValue) setHighlightedChoice(null, defaultValue);
    setSelectedValue(defaultValue);
  }, []);

  // Calculate placeholder text
  const getPlaceholder = () => {
    if (!readOnly) return "Select one...";
    if (!selectedValue) return "Not Defined";
    return "";
  };

  // Removes is-highlighted from previous selected choice and adds it for the new ones
  const setHighlightedChoice = (prevChoice, newChoice) => {
    if (!!prevChoice) document.getElementById(prevChoice).classList.remove("is-highlighted");
    document.getElementById(newChoice).classList.add("is-highlighted");
  };

  // Set selected value and close combobox
  const handleSelectChoice = (item) => {
    setHighlightedChoice(selectedValue, item);
    setSelectedValue(item);
    setIsOpen(false);
    setFocus(id);
  };

  // Close combobox if component is blur
  // Use timeout to execute onBlur event after select a choice
  const handleComboboxOnBlur = () => {
    setTimeout(() => {
      if (document.activeElement.id !== id) setIsOpen(false);
    }, 500);
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
}
