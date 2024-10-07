import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearError, clearMessage } from '../../Features/Coins/redux/coins.slice';

export const useTemporaryError = (duration = 3000) : [string[], (error: string) => void] => {
    const dispatch = useDispatch();
  const [errors, setErrors] = useState<string[]>([]);

  const triggerError = (error: string) => {

    setErrors([...errors, error]);

    setTimeout(() => {
        errors.shift()
        setErrors(errors);
        if(error.length === 0) {
            dispatch(clearError())
        }
    }, duration);
  };

  return [errors, triggerError];
};

export const useTemporaryMessages = (duration = 3000) : [string[], (error: string) => void]=> {
    const dispatch = useDispatch();
  const [messages, setMessages] = useState<string[]>([]);

  const triggerMessage= (message: string) => {

    setMessages([...messages, message]);

    setTimeout(() => {
        messages.shift()
        setMessages(messages);
        if(messages.length === 0) {
            dispatch(clearMessage())
        }
    }, duration);
  };

  return [messages, triggerMessage];
};

