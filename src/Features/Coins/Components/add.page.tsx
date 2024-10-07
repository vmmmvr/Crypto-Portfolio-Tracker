import { Typography } from '@material-tailwind/react'
import { ArrowLeft } from 'react-feather'
import { CustomButton } from '../../../lib/Components'
import { Link,  useNavigate } from 'react-router-dom'
import { Formik, Form, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addNewHolding, InitialStateType } from '../redux/coins.slice';
import { useEffect, useState } from 'react';
import FormInput from '../../../lib/Components/FormInput/FormInput';
import { coinsFomrfields } from '../../../lib/forms/coins.fields';
import { coinValidationSchema } from '../../../lib/validation/coin.schema';
import { missingPorperties } from '../../../lib/utils/utils';
import { FormValues } from '../../../lib/interfaces/coins';



export default function AddHolding() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFormSubmitted, setFormSubmitted] = useState(false);



  const { loading, error } = useSelector((state: any) => state.coins as InitialStateType);
  const handleSubmit =  (  values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>) => {
    dispatch(addNewHolding(values));
    setFormSubmitted(true);
    setSubmitting(false);
  };

  useEffect(() => {
    if (!loading && isFormSubmitted) {
      !error && navigate('/');
      setFormSubmitted(false);
    }
  }, [loading, isFormSubmitted, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void, format: (value: string) => string) => {
    const { name, value } = e.target;
    setFieldValue(name, format ? format(value) : value);
  };
  return (
    <div className="min-h-full w-full p-4 md:p-6 lg:p-10 gap-5 flex flex-col">
      <div className="flex sm:flex-row flex-col gap-5 w-full sm:justify-between sm:items-center">
        <Typography {...missingPorperties} variant="h6" className="text-md font-medium text-primary-text" >
          Add New Holding
        </Typography>
        <Link to="/">
          <CustomButton classes="">
            <ArrowLeft size={18} /> Back
          </CustomButton>
        </Link>
      </div>

      <Formik
        initialValues={{ name: '', symbol: '', quantity: 0}}
        validationSchema={coinValidationSchema}
        onSubmit={handleSubmit}

      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col gap-5 my-5">
            {coinsFomrfields.map(({ name, label, type, format = (str: string) => str, ...rest }) => (
              <FormInput
                key={name}
                name={name}
                label={label}
                type={type}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>,) =>  handleChange(e, setFieldValue,  format)}
                {...rest}
              />
            ))}

            <CustomButton disabled={isSubmitting} type="submit">
              Add
            </CustomButton>
          </Form>
        )}
      </Formik>
    </div>
  );
}