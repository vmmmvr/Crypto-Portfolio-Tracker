import { Typography } from '@material-tailwind/react';
import { ArrowLeft } from 'react-feather';
import { CustomButton } from '../../../lib/Components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocalCoins, InitialStateType, updateHolding } from '../redux/coins.slice';
import { useEffect, useState } from 'react';
import FormInput from '../../../lib/Components/FormInput/FormInput';
import { missingPorperties } from '../../../lib/utils/utils';
import { coinsFomrfields } from '../../../lib/forms/coins.fields';
import { coinValidationSchema } from '../../../lib/validation/coin.schema';
import { FormValues } from '../../../lib/interfaces/coins';


export default function EditHolding() {
  const { symbol  } = useParams(); // Get the coin ID from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const { coins} = useSelector((state: any) => state.coins as InitialStateType);

  const [initialValues, setInitialValues] = useState({
    name: '',
    symbol: '',
    quantity: 0
  });
  useEffect(() => {
    coins === null && dispatch(fetchLocalCoins()); 
}, [coins, dispatch]);

  // Find the specific coin based on the ID
  useEffect(() => {
    const coin = coins?.find((coin) => coin.symbol === symbol);
    if (coin) {
        setId(coin?.id);
      setInitialValues({
        name: coin.name,
        symbol: coin.symbol,
        quantity: coin.quantity,
      });
    }
  }, [symbol, coins, dispatch]);

  // Form submission logic
  const handleSubmit = (  values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>) => {
    dispatch(updateHolding({ id, ...values }));
    setSubmitting(false);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void, format: (value: string) => string) => {
    const { name, value } = e.target;
    setFieldValue(name, format ? format(value) : value);
  };

  return (
    <div className="min-h-full w-full p-4 md:p-6 lg:p-10 gap-5 flex flex-col">
      <div className="flex sm:flex-row flex-col gap-5 w-full sm:justify-between sm:items-center">
        <Typography {...missingPorperties} variant="h6" className="text-md font-medium text-primary-text">
          Edit Holding
        </Typography>
        <Link to="/">
          <CustomButton classes="">
            <ArrowLeft size={18} /> Back
          </CustomButton>
        </Link>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={coinValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // Reinitialize form when initialValues change
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col gap-5 my-5">
            {coinsFomrfields.map(({ name, label, type, format = (str: string) => str, ...rest }) => (
              <FormInput
                key={name}
                name={name}
                label={label}
                type={type}
                handleChange={(e) =>  handleChange(e, setFieldValue, format)}
                {...rest}
              />
            ))}

            <CustomButton disabled={isSubmitting} type="submit">
              Update
            </CustomButton>
          </Form>
        )}
      </Formik>
    </div>
  );
}
