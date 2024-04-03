import classNames from "classnames";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

export default function ButtonCombobox(props) {
  const [isOpen, setIsOpen ] = useState(false);
  const [ selectedValue, setSelectedValue] = useState(undefined);
  const { id, readOnly, defaultValue, choicesList } = props;

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
	      choicesList.map(choice => {
	        return (
		  <div>1</div>
		);
	      })
	    }
	  </div>
        </div>
      </div>
    </>
  );
}
