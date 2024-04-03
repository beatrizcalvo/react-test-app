import classNames from "classnames";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ButtonCombobox(props) {
  const [isOpen, setIsOpen ] = useState(false);
  const [ selectedValue, setSelectedValue] = useState(undefined);
  const { id, readOnly, mandatory, defaultValue, choicesList } = props;
  const { register, formState: { errors } } = useForm();

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, []);

  // Calculate placeholder text
  const getPlaceholder = () => {
    if (!readOnly) return "Select one...";
    if (!selectedValue) return "ND";
    return "";
  };
	
  return (
    <>
      <div 
        className={classNames("choices", { "is-open is-focused": isOpen })} 
	role="combobox"
        data-type={readOnly ? "none" : "select-one"} 
        aria-expanded={isOpen}
	{...(!readOnly ? { onBlur: () => setIsOpen(!isOpen) } : {})}
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
	      {...(readOnly ? { plaintext: true, className: "text-sm" } : {})}
              defaultValue={selectedValue}
	    />
	  </div>
        </div>
        <div className={classNames("choices__list choices__list--dropdown", { "is-active is-focused": isOpen })} aria-expanded={isOpen}>
	  <div className="choices__list" role="listbox">
	    { 
	      choicesList.map((choice, index) => {
	        return (
		  <div 
		    id={"choices--choices-" + id + "-item-choice-" + index} 
		    className="choices__item choices__item--choice choices__item--selectable" 
		    onClick={() => setSelectedValue(choice)}
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
