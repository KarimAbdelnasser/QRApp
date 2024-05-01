"use client";
import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header
        style={{
          padding: "20px 0",
          margin: "0 0 10px 0",
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ color: "white", fontSize: "50px" }}>White Card</span>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
