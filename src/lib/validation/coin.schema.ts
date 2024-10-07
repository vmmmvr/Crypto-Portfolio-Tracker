import * as Yup from "yup";

// Define validation schema using Yup
export const coinValidationSchema = Yup.object({
  name: Yup.string().required("Name required"),
  symbol: Yup.string().required("Symbol is required"),
  quantity: Yup.number()
    .min(0, "Quantity must be at least 0")
    .required("Quantity is required"),
});
