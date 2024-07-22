import { useFormContext, Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";

export default function PhoneNumberWithCountry({ id, readOnly, inputValidations, countries }) {  
  const { control } = useFormContext();
  
  return (
    <>
      <Controller 
        name={id}
        control={control}
        rules={inputValidations}
        render={({ field }) => (
          <PhoneInput 
            {...field}
            name={field.name}
            readOnly={readOnly}
            placeholder="Phone number..."
            onChange={(value: string) => field.onChange(value)}
            countries={["FR", "ES"]}
            numberInputProps={{ className: (readOnly ? "text-sm form-control-plaintext" : "form-control") }}
          />
        )}
      />
    </>
  );
}
