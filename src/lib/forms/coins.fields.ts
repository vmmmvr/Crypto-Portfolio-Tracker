// Define the form fields for dynamic input generation
export const coinsFomrfields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    format: (value: string) =>
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(), // Capitalize the first letter
  },
  {
    name: "symbol",
    label: "Symbol",
    type: "text",
    format: (value: string) => value.toUpperCase(),
  },
  { name: "quantity", label: "Quantity", type: "number", min: 0 },
];
