import { useFormContext, Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";

export default function PhoneNumberWithCountry({ id, readOnly, inputValidations, countries }) {  
  const { register, control } = useFormContext();
  
  return (
    <>
      { readOnly && (
          <Form.Control 
            id={id} 
            type="text" 
            {...register(id)}
          />
        ) || (
          <Controller />
        )
      }
              
      /*<Controller
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
      />*/
    </>
  );
}
