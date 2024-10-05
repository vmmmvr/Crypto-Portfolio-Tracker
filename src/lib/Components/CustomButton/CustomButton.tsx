import { Button } from '@material-tailwind/react'
import React from 'react';

type CustomButtonProps = {
  children: React.ReactNode;
  onClick: () => void; 
  disabled?: boolean;
  classes?: string
}

export default function CustomButton({children, onClick, disabled = false, classes}: CustomButtonProps) {
  return (
    <Button className={`bg-primary-main flex items-center justify-center gap-1 capitalize text-sm font-normal ${classes}`} onClick={onClick} disabled={disabled} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >{children}</Button>
  )
}
