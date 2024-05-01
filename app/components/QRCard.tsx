"use client";
import React from "react";
import QRCode from "qrcode.react";
import Link from "next/link";

const QRCard: React.FC = () => {
  const qrUrls = [
    `https://cardnames.vercel.app/valid?name=username&cardNumber=2121028790002407&isValid=true`,
    `https://cardnames.vercel.app/valid?name=username&cardNumber=9445944611516120&isValid=false`,
    `https://cardnames.vercel.app/valid?name=username&cardNumber=6859093107986957&isValid=true`,
    `https://cardnames.vercel.app/valid?name=username&cardNumber=1431580449321734&isValid=false`,
    `https://cardnames.vercel.app/valid?name=username&cardNumber=9758377599758158&isValid=true`,
    `https://cardnames.vercel.app/valid?name=username&cardNumber=4411620538763908&isValid=false`,
  ];

  const cardLabels = [
    { name: "Eyad Hamed", number: "2121 02879 0002 407" },
    { name: "Mohamed Ali", number: "9445 94461 1516 120" },
    { name: "Youssef Osama", number: "6859 0931 07986 957" },
    { name: "Ziad Ahmed", number: "1431 5804 4932 1734" },
    { name: "Saif Ashraf", number: "9758 3775 9975 8158" },
    { name: "Omar Mostafa", number: "4411 6205 3876 3908" },
  ];

  return (
    <div className="card-container">
      {qrUrls.map((url, index) => (
        <Link href={url} key={index} className="card">
          <div className="qr-code">
            <QRCode value={url} className="qr-img" />
          </div>
          <div className="card-content">
            <h2>Offer Card</h2>
            <h4>Name: {cardLabels[index].name}</h4>
            <h5>Card Number: {cardLabels[index].number}</h5>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QRCard;
