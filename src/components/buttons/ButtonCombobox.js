import classNames from "classnames";
import { useState } from "react";
import { Form } from "react-bootstrap";

export default function ButtonCombobox(props) {
  const [isOpen, setIsOpen ] = useState(false);
  const { id, readOnly, choicesList } = props;
  
  return (
    <>
      <div 
        className={classNames("choices", { "is-open is-focused": isOpen })} 
	role="combobox"
        data-type={readOnly ? "none" : "select-one"} 
        aria-expanded={isOpen}
      >
        <div className="choices__inner" onClick={() => alert("Pulsado")}>
          <div {...(!readOnly ? { className: "choices__list choices__list--single" } : {})}>
	    <Form.Control
	      id={id}
	      type="text"
	      readOnly="true"
	      {...(!readOnly ? { placeholder: "Select one..." } : {})}
	      {...(readOnly ? { plaintext: true, className: "text-sm" } : {})}
	    />
	  </div>
        </div>
        <div className="choices__list choices__list--dropdown" aria-expanded={isOpen}>
	  <div className="choices__list" role="listbox">
	  </div>
        </div>
      </div>
    </>
  );
}
