'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';


const Navbar: React.FC= () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <header style={{ 
        backgroundColor: ' black', 
        padding: '30px 30px',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        opacity: isVisible ? 1 : 0, 
        transition: 'opacity 0.3s ease-in-out', 
        
      }}>
        <nav style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          <span style={{ color: 'white', fontSize: '60px' ,marginBottom:'3px'}}>
          QR App
          </span>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;