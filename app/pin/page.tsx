"use client";
import React, { useState } from "react";
import { errorToast, successToast } from "../components/AlertTimer";
const PinPage: React.FC = () => {
  const [pin, setPin] = useState<string>("");

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPin = e.target.value.replace(/\D/g, "").slice(0, 4);

    setPin(newPin);
  };

  const handleConfirm = () => {
    if (pin.length === 4) {
      successToast("Pin confirmed!");
      setTimeout(() => (window.location.href = "/offers"), 2000);
    } else {
      errorToast("Please enter a 4-digit PIN.");
    }
  };

  return (
    <main className="main-page">
      <div className="box">
        <h1>Enter PIN</h1>
        <input
          type="text"
          value={pin}
          onChange={handlePinChange}
          className={"pin-input"}
          minLength={4}
          maxLength={4}
        />
        <button
          onClick={handleConfirm}
          className="successBtn"
          style={{ width: "100%%" }}
        >
          Confirm
        </button>
      </div>
    </main>
  );
};

export default PinPage;
