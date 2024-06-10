import { useFormContext } from "react-hook-form";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"

import "react-phone-number-input/style.css";

export default function PhoneNumberWithCountry({ id, readOnly, inputValidations }) {  
  const { control } = useFormContext();
  
  return (
    <>
      { readOnly ? (
        
      ) 
        : (
          <PhoneInputWithCountry
            name={id}
            control={control}
            rules={inputValidations}
            placeholder="Phone number..."
          />
        ) 
      }
    </>
  );
}
