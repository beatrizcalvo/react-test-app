import { useState } from "react";

export default function ButtonCombobox(props) {
  const [isOpen, setIsOpen ] = useState(false);
  const { id, readOnly, choicesList } = props;
  
  return (
    <>
      <div className="choices" data-type="select-one">
        
      </div>
    </>
  );
}
