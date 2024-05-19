"use client";
import React from "react";
import QRCode from "qrcode.react";
import Link from "next/link";

const QRCard: React.FC = () => {
  const qrUrls = [
    `/valid?name=username&cardNumber=9445944611516120&isValid=true`,
    `/valid?name=username&cardNumber=2121028790002407&isValid=false`,
  ];

  const cardLabels = [{ number: "0000 0000 " }, { number: "2121 0287" }];

  return (
    <div className="card-container">
      {qrUrls.map((url, index) => (
        <Link href={url} key={index} className="card">
          <div className="qr-code">
            <QRCode value={url} className="qr-img" />
          </div>
          <div className="card-content">
            <h2 style={{marginTop:"50px"}}>Card Number: {cardLabels[index].number}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QRCard;
