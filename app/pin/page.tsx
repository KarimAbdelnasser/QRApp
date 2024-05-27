'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { errorToast, successToast } from '../components/AlertTimer';
import { verification } from '../redux/pinSlice';

import { useRouter } from 'next/navigation';
import { IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
const PinPage: React.FC = () => {
  const [pin, setPin] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.pin);
  const router = useRouter();

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPin = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPin(newPin);
  };

  const handleConfirm = async () => {
    try {
      setErrorMessage('');
      if (pin) {
        const response = await dispatch(verification({ pin }));
        successToast(response.payload.responseMessage);
        setTimeout(() => {
          router.push('/offers'); 
        }, 2750);
      } else {
        setErrorMessage('الرجاء إدخال الأرقام');
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.responseMessage) {
        errorToast(error.response.data.responseMessage);
      }
    }
  };

  return (
    <main className='main-page'>
      <div className='box'>
        <h1>
            PIN
          <Tooltip title="الرقم السري مكون من 6 ارقام" arrow>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
      
        </h1>
        <input
          type='password'
          value={pin}
          onChange={handlePinChange}
          className={'pin-input'}
          maxLength={6}
        />
        {errorMessage && <p style={{ color: 'white' }}>{errorMessage}</p>}
        <button
          onClick={handleConfirm}
          className={`successBtn${isLoading ? ' loading' : ''}`}
          style={{ width: '100%' }}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Confirm'}
        </button>
      </div>
    </main>
  );
};

export default PinPage;
