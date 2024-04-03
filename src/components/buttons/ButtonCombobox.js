import { useState } from "react";

export default function ButtonCombobox(props) {
  const [isOpen, setIsOpen ] = useState(false);
  const { id, readOnly, choicesList } = props;
  
  return (
    <>
      <div 
        className="choices" 
        data-type={readOnly ? "none" : "select-one"} 
        aria-expanded={isOpen}
      >
        <div class="choices__inner">
          <div class="choices__list choices__list--single">
			      <div class="choices__item choices__item--selectable">
				      English
			      </div>
		      </div>
        </div>
        <div class="choices__list choices__list--dropdown" aria-expanded={isOpen}>
        </div>
      </div>
    </>
  );
}
