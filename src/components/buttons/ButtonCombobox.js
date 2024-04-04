import classNames from "classnames";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ButtonCombobox(props) {
  const [isOpen, setIsOpen ] = useState(false);
  const [ selectedValue, setSelectedValue] = useState(undefined);
  const { id, readOnly, mandatory, defaultValue, choicesList } = props;
  const { register, setFocus, formState: { errors } } = useForm();

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, []);

  // Calculate placeholder text
  const getPlaceholder = () => {
    if (!readOnly) return "Select one...";
    if (!selectedValue) return "ND";
    return "";
  };

  // Set selected value and close combobox
  const handleSelectChoice = (item) => {
    console.log("select");
  };
	
  return (
    <>
      <div 
        className={classNames("choices", { "is-open is-focused": isOpen })} 
	role="combobox"
        data-type={readOnly ? "none" : "select-one"} 
        aria-expanded={isOpen} 
      >
        <div 
          {...(!readOnly ? { className: "choices__inner" } : {})}
	  {...(!readOnly ? { onClick: () => setTimeout(() => { console.log("onBlur") }, 500) } : {})} 
	>
          <div {...(!readOnly ? { className: "choices__list choices__list--single" } : {})}>
	    <Form.Control
	      id={id}
	      type="text"
	      readOnly="true"
	      placeholder={getPlaceholder()}
              {...register(id)}
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
