"use client";
import React, { useEffect, useState } from "react";
import { errorToast, successToast } from "../components/AlertTimer";
import { useDispatch, useSelector } from "react-redux";
import { getSelectExists, resetExists, verification } from "../redux/verifySlice";
import { useRouter } from 'next/navigation';
import Loading from "../components/Loading";
const PinPage: React.FC = () => {
  const [pin, setPin] = useState<string>("");
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const isLoading = useSelector((state: any) => state.verify.isLoading);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPin = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPin(newPin);
  };

  let confirmUser = useSelector(getSelectExists)

  const handleConfirm = () => { 
    if (pin.length === 6) {
      dispatch(verification(pin))
    } else {
      errorToast("Please enter a 6-digit PIN.");
    }
  };

  useEffect(()=>{
    if(confirmUser){
      setTimeout(() => {
        router.push('/offers');
        dispatch(resetExists());
      }, 2000);
    }
      
  },[confirmUser])

  return (
    <main className="main-page">
      <div className="box">
        <h1>Enter PIN</h1>
        <input
          type="text"
          value={pin}
          onChange={handlePinChange}
          className={"pin-input"}
          minLength={6}
          maxLength={6}
        />
        <button
          onClick={handleConfirm}
          className="successBtn"
          style={{ width: "100%%" }}
        >
          {!isLoading ? "Confirm" : <Loading Circular={true}></Loading>}
        </button>
      </div>
    </main>
  );
};

export default PinPage;
