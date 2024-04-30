'use client'

import React, { useState } from 'react';
import './pin.css'

const PinPage: React.FC = () => {
  const [pin, setPin] = useState<string>('');

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPin = e.target.value.replace(/\D/g, '').slice(0, 4); 
    
    setPin(newPin);
  };

  const handleConfirm = () => {
    console.log('Pin entered:', pin);
    alert('Pin confirmed!');
window.location.href='/offers'
  };

  return (
    <div className={'container'}>
      <div className={'box'}>
        <h1>Enter PIN</h1>
        <input
          type="text"
          value={pin}
          onChange={handlePinChange}
          className={'pin-input'}
          maxLength={4}
        />
        <button onClick={handleConfirm} className={'pin-button'}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PinPage;
