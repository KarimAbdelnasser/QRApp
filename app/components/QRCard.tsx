"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { url } from "inspector";
import QRCode from "qrcode.react";

const QRCard: React.FC = () => {
  const qrData = [
    {
      url: `https://cardnames.vercel.app/valid?name=username&cardNumber=9445944611516120&isValid=true`,
      imageSrc: "/qr_valid.png",
      label: "0000 0000",
    },
    {
      url: `https://cardnames.vercel.app/valid?name=username&cardNumber=2121028790002407&isValid=false`,
      imageSrc: "/qr_invalid.png",
      label: "2121 0287",
    },
  ];

  return (


    <div className="card-container">
    {qrData.map((url, index) => (
      <Link href={qrData[index].url} key={index} className="card">
        <div className="qr-code">
          <QRCode value={qrData[index].url} className="qr-img" />
        </div>
        <div className="card-content">
          <h2 style={{marginTop:"50px"}}>Card Number: {qrData[index].label}</h2>
        </div>
      </Link>
    ))}
  </div>
    
  );
};

export default QRCard;
