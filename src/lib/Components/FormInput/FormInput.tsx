// src/components/FormInput.tsx
import React from 'react';
import { Input } from '@material-tailwind/react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { missingPorperties } from '../../utils/utils';

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => void;
}

const FormInput: React.FC<FormInputProps> = ({ name, label, type = "text", handleChange }) => {
  return (
    <div>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <Input
         {...field}
          type={type}
          label={label}
          size="lg"
          onChange={(e) => handleChange(e, form.setFieldValue)}
          error={!!(form.errors[name] && form.touched[name])}
          {...missingPorperties}     crossOrigin={undefined}       />
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default FormInput;
