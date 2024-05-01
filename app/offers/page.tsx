"use client";
import Image from "next/image";
import Navbar from "../components/navbar";
import CategoryList from "../components/CategoryList";

const ProductsPage: React.FC = () => {
  const products = [
    {
      img: "/xiaomi.png",
      name: "Xiaomi",
      percentage: "10%",
      description: "This is the description of offer 1.",
    },
    {
      img: "/apple.png",
      name: "Apple",
      percentage: "25%",
      description: "This is the description of offer 2.",
    },
    {
      img: "/samsung.png",
      name: "Samsung",
      percentage: "8%",
      description: "This is the description of offer 3.",
    },
    {
      img: "/puma.png",
      name: "Puma",
      percentage: "50%",
      description: "This is the description of offer 4.",
    },
    {
      img: "/adidas.png",
      name: "Adidas",
      percentage: "12%",
      description: "This is the description of offer 5.",
    },
    {
      img: "/nike.png",
      name: "Nike",
      percentage: "15%",
      description: "This is the description of offer 6.",
    },
  ];

  return (
    <div className="offers">
      <Navbar />
      <CategoryList />
      {/* <div className="main-page">
        <div className="card-container">
          {products.map((product, index) => (
            <div key={index} className="card">
              <div className="qr-code">
                <Image
                  className="qr-img"
                  src={product.img}
                  alt={product.name}
                  width={80}
                  height={80}
                />
              </div>
              <div className="card-content">
                <h3>{product.name}</h3>
                <p>percentage: {product.percentage}</p>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ProductsPage;
