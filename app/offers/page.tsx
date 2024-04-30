'use client'

import React from 'react';
import './offers.css'
import Navbar from '../home/navbar';

const ProductsPage: React.FC = () => {

  const products = [
    {
      name: 'Town Team',
      percentage: '10%',
      description: 'This is the description of offer 1.',
    },
    {
      name: 'El-Ezaby',
      percentage: '25%',
      description: 'This is the description of offer 2.',
    },
    {
      name: 'pizza',
      percentage: '8%',
      description: 'This is the description of offer 3.',
    },
    {
        name: 'Zara',
        percentage: '50%',
        description: 'This is the description of offer 4.',
      },
      {
        name: 'Addidas',
        percentage: '12%',
        description: 'This is the description of offer 5.',
      },
      {
        name: 'Nike',
        percentage: '15%',
        description: 'This is the description of offer 6.',
      },
  ];

  return (
    <>
    <Navbar/>
   
    <div className={'container'}>
     
      <h1 className={'title'}>Your offers</h1>
      <div className={'productList'}>
        {products.map((product, index) => (
          <div key={index} className={'product'}>
            <h2 className={'productName'}>{product.name}</h2>
            <p className={'productPrice'}>percentage: {product.percentage}</p>
            <p className={'productDescription'}>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ProductsPage;
