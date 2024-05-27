"use client";
import React from "react";
import Navbar from "../components/navbar";
import CategoryList from "../components/CategoryList";
import "../style/style.scss";

const ProductsPage: React.FC = () => {
  return (
    <div className="offers">
      <Navbar />

      <CategoryList />
    </div>
  );
};

export default ProductsPage;
