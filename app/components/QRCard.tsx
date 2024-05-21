"use client";
import React, { useEffect } from "react";
import QRCode from "qrcode.react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchQrCodes, getQRs } from "../redux/getAllQrSlice";
import Loading from "./Loading";

const QRCard: React.FC = () => {
  const dispatch = useDispatch();
  const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjRjYjIzZGM1MTFmOWFjMDljNDFhYWEiLCJpc1ZlcmlmaWVkIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJjYXJkTnVtYmVyIjoiMDAwMDAwMDAiLCJpYXQiOjE3MTYzMDI1Mzd9.JB7VDN_kdQ3FT5NX9f-batzH6CrQci_GrnzUoKlpc5w";
  useEffect(() => {
    dispatch(fetchQrCodes(adminToken) as any);
  }, [dispatch]);
  
  const isLoading = useSelector((state: any) => state.QRCode.isLoading);

  const getQRsData = useSelector(getQRs);

  const link = (qrValue:any) => {
    // console.log(qrValue.replace("https://cardnames.vercel.app", "http://localhost:3000"))
    return qrValue
  }

  return (
    <div className="card-container">
      {!isLoading ? getQRsData.map((data: any, index: any) => (
        <Link href={link(data.url)} key={index} className="card">
          <div className="qr-code">
            <img
              src={`data:image/jpeg;base64,${data.qrValue}`}
              alt="QR Code"
              className="qr-img"
            />
          </div>
          <div className="card-content">
            <h2>Offer Card</h2>
            <h5>{data.cardNumber}</h5>
          </div>
        </Link>
      )): <Loading Circular={true}></Loading>}
    </div>
  );
};

export default QRCard;
