import { useFormContext, Controller } from "react-hook-form";
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
            placeholder="Phone number..." 
            readOnly={readOnly}
            onChange={(value: string) => field.onChange(value)}
            countries={countries}
            international={true}
            countryCallingCodeEditable={false}
          />
        )}
      />
    </>
  );
}
