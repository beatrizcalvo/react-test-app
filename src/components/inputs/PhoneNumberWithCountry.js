import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";

export default function PhoneNumberWithCountry({ id, readOnly, inputValidations }) {  
  const [value, setValue] = useState();
  const { control } = useFormContext();
  
  return (
    <>
      <Controller
        name={id}
        control={control} 
        rules={inputValidations}
        render={({ field: { name, value, onChange } }) => (
          <PhoneInput 
            id={name}
            readOnly={readOnly}
            onChange={(phone) => onChange(phone)}
          />
        )}
      />
      <PhoneInput
        placeholder="Phone number..."
        readOnly={readOnly}
        value={value}
        onChange={setValue}
        countries={["FR", "ES"]}
        countryCallingCodeEditable={false}
      />
    </>
  );
}
