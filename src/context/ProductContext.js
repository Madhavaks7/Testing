"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { MOCK_PRODUCTS } from "@/lib/mockData";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const refreshProducts = () => {
    const storedProducts = localStorage.getItem("techfusion_products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem("techfusion_products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(MOCK_PRODUCTS);
      localStorage.setItem("techfusion_products", JSON.stringify(MOCK_PRODUCTS));
    }
    setLoadingProducts(false);

    // Listen to changes from other tabs
    const handleStorage = (e) => {
      if (e.key === "techfusion_products") {
        refreshProducts();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now().toString() };
    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem("techfusion_products", JSON.stringify(updated));
  };

  const toggleStock = (productId, currentStatus) => {
    const updated = products.map(p => 
      p.id === productId ? { ...p, inStock: !currentStatus } : p
    );
    setProducts(updated);
    localStorage.setItem("techfusion_products", JSON.stringify(updated));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, toggleStock, loadingProducts, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
