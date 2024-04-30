"use client";
import Navbar from "../components/navbar";

const ProductsPage: React.FC = () => {
  const products = [
    {
      name: "Town Team",
      percentage: "10%",
      description: "This is the description of offer 1.",
    },
    {
      name: "El-Ezaby",
      percentage: "25%",
      description: "This is the description of offer 2.",
    },
    {
      name: "pizza",
      percentage: "8%",
      description: "This is the description of offer 3.",
    },
    {
      name: "Zara",
      percentage: "50%",
      description: "This is the description of offer 4.",
    },
    {
      name: "Addidas",
      percentage: "12%",
      description: "This is the description of offer 5.",
    },
    {
      name: "Nike",
      percentage: "15%",
      description: "This is the description of offer 6.",
    },
  ];

  return (
    <div className="offers">
      <Navbar />
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Your offers</h1>
      <div className="main-page">
        <div className="card-container">
          {products.map((product, index) => (
            <div key={index} className="card">
              <h2>{product.name}</h2>
              <p>percentage: {product.percentage}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
