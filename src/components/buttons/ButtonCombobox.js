import { useState } from "react";

export default function ButtonCombobox(props) {
  const [isOpen, setIsOpen ] = useState(false);
  const { id, readOnly, choicesList } = props;
  
  return (
    <>
      <div 
        className="choices" 
	role="combobox"
        data-type={readOnly ? "none" : "select-one"} 
        aria-expanded={isOpen}
      >
        <div className="choices__inner">
          <div className="choices__list choices__list--single">
	    <div className="choices__item choices__item--selectable">
	      English
	    </div>
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
