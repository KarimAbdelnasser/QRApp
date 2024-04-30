'use client'
import React from "react";
import QRCode from "qrcode.react";
import "./card.css";
import Link from "next/link";

const Card: React.FC = () => {
  const qrUrls = [
    `http://localhost:3000/valid?name=username&cardNumber=2121028790002407&isValid=true`,
    `http://localhost:3000/valid?name=username&cardNumber=9445944611516120&isValid=false`,
    `http://localhost:3000/valid?name=username&cardNumber=6859093107986957&isValid=true`,
    `http://localhost:3000/valid?name=username&cardNumber=1431580449321734&isValid=false`,
    `http://localhost:3000/valid?name=username&cardNumber=9758377599758158&isValid=true`,
    `http://localhost:3000/valid?name=username&cardNumber=4411620538763908&isValid=false`,
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
    <div className="container">
      {qrUrls.map((url, index) => (
        <div className="national-card" key={index}>
          <div className="card-header">
            <h2>National Card</h2>
          </div>
          <div className="card-body">
            <div className="card-name">
              <label>Name: {cardLabels[index].name}</label>
            </div>
            <div className="card-number">
              <label>Card Number: {cardLabels[index].number}</label>
            </div>
          </div>
          <Link href={url}>
            <div className="qr-code">
              <QRCode value={url} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Card;
