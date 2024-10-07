import { Alert } from '@material-tailwind/react';

type ToastType = {
    text: string, 
    color: "red" | "green" 
}

const Toasts = ({ errors = [], messages = [] }: {errors: string[], messages: string[]}) => {
  const alerts : ToastType[] = [
    ...errors.map((error) => ({ text: error, color: "red" as const })),
    ...messages.map((message) => ({ text: message, color: "green" as const })),
  ];

  return (
    <div className="absolute top-5 w-full flex flex-col items-center px-4 space-y-2">
      {alerts.map((alert, index) => (
        <Alert key={index} className="max-w-md" color={alert.color}>
          {alert.text}
        </Alert>
      ))}
    </div>
  );
};

export default Toasts;
