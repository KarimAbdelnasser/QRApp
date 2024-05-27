"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchQrCodes,QrCode } from "../redux/gerAllQrSlice";
import LoadingSpinner from "../loadingSpinner/loading";

const QRCard: React.FC = () => {
  const dispatch = useDispatch<any>();
  const isLoading = useSelector((state: any) => state.QRCode.isLoading);
  const QRsData = useSelector(QrCode);
  const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjRjYjIzZGM1MTFmOWFjMDljNDFhYWEiLCJpc1ZlcmlmaWVkIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJjYXJkTnVtYmVyIjoiMDAwMDAwMDAiLCJpYXQiOjE3MTYzMDI1Mzd9.JB7VDN_kdQ3FT5NX9f-batzH6CrQci_GrnzUoKlpc5w";
  
  useEffect(() => {
    dispatch(fetchQrCodes(adminToken) as any);
  }, [dispatch]);
  

  return (
    <div className="card-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        QRsData?.map((data: any, index: number) => (
          <Link 
          href={data.url.replace("https://cardnames.vercel.app/", "http://localhost:3000/")}


            key={index} 
            className="card"
          >
            <div className="qr-code">
              <img
                src={`data:image/jpeg;base64,${data.qrValue}`}
                alt="QR Code"
                className="qr-img"
              />
            </div>
            <div className="card-content">
           <h3>Offer Card</h3>
              <h5>Card Number: {data.cardNumber}</h5>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default QRCard;
