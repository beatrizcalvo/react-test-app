import { useState } from "react";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";

export default function PhoneNumberWithCountry({ id, readOnly, inputValidations }) {  
  const [value, setValue] = useState()
  
  return (
    <>
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        onChange={setValue}
        countries=["FR", "ES"]
      />
    </>
  );
}
