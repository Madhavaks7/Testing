"use client";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  // Initialize state for dynamically selected options
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);

  // Set default options on mount
  useEffect(() => {
    if (product.options) {
      const defaults = {};
      Object.keys(product.options).forEach((key) => {
        defaults[key] = product.options[key][0];
      });
      setSelectedOptions(defaults);
    }
  }, [product.options]);

  const handleOptionChange = (key, value) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    // Generate a descriptive name based on selected options
    let detailedName = product.name;
    if (Object.keys(selectedOptions).length > 0) {
      const optionValues = Object.values(selectedOptions).join(", ");
      detailedName = `${product.name} (${optionValues})`;
    }
    
    addToCart({ ...product, name: detailedName, selectedOptions }, quantity);
    
    // Reset quantity after adding
    setQuantity(1);
  };

  const isOutOfStock = !product.inStock;

  return (
    <div 
      className={`group flex flex-col rounded-3xl overflow-hidden shadow-sm border transition-all duration-500 transform min-h-[320px] ${
        isOutOfStock 
          ? "bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50 opacity-90 cursor-not-allowed" 
          : "bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200 dark:hover:border-blue-900/50"
      }`}
    >
      
      {/* Premium Content Box */}
      <div className={`p-6 flex flex-col flex-grow relative ${isOutOfStock ? "grayscale-[0.5]" : ""}`}>
        {isOutOfStock && (
          <div className="absolute top-4 right-4 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 text-xs font-bold px-3 py-1 rounded-full shadow-sm ring-1 ring-red-200 dark:ring-red-800 animate-pulse">
            Out of Stock
          </div>
        )}

        <div className="mb-4">
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
            isOutOfStock 
              ? "bg-red-100/50 text-red-600 dark:bg-red-900/20 dark:text-red-400" 
              : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
          }`}>
            {product.category}
          </span>
          <h3 className={`text-xl font-extrabold mb-2 ${
            isOutOfStock ? "text-red-900/80 dark:text-red-200/80" : "text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
          }`}>
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{product.description}</p>
        </div>
        
        {/* Dynamic Dropdowns */}
        {product.options && Object.keys(product.options).length > 0 && (
          <div className="space-y-3 mb-6 mt-2 flex-grow">
            {Object.entries(product.options).map(([key, values]) => (
              <div key={key} className="relative">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
                  {key}
                </label>
                <select 
                  value={selectedOptions[key] || ""}
                  onChange={(e) => handleOptionChange(key, e.target.value)}
                  disabled={isOutOfStock}
                  className={`w-full text-sm block px-3 py-2.5 rounded-xl transition-all outline-none ${
                    isOutOfStock 
                      ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30 text-red-800 dark:text-red-300 cursor-not-allowed opacity-70"
                      : "bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer group-hover:bg-white dark:group-hover:bg-zinc-800"
                  }`}
                >
                  {values.map(val => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {!product.options && <div className="flex-grow"></div>}

        {/* Bottom Action Area */}
        <div className={`mt-auto pt-5 border-t ${
          isOutOfStock ? "border-red-100 dark:border-red-900/30" : "border-gray-100 dark:border-zinc-800"
        }`}>
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Price</p>
              <span className={`text-2xl font-black tracking-tight ${
                isOutOfStock ? "text-red-900/70 dark:text-red-300/70" : "text-gray-900 dark:text-white"
              }`}>
                ₹{parseFloat(product.price).toFixed(2)}
              </span>
            </div>
            
            {/* Quantity Counter */}
            <div className={`flex items-center rounded-xl border p-1 transition-colors ${
              isOutOfStock 
                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30 opacity-70"
                : "bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700"
            }`}>
              <button 
                onClick={handleDecrement}
                disabled={isOutOfStock}
                className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 transition-colors disabled:cursor-not-allowed"
              >
                <Minus size={16} />
              </button>
              <span className={`w-8 text-center text-sm font-bold ${
                isOutOfStock ? "text-red-800 dark:text-red-300" : "text-gray-900 dark:text-white"
              }`}>{quantity}</span>
              <button 
                onClick={handleIncrement}
                disabled={isOutOfStock}
                className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 transition-colors disabled:cursor-not-allowed"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 font-bold ${
              !isOutOfStock 
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-[0.98] group-hover:shadow-blue-500/25" 
                : "bg-red-100 dark:bg-red-900/30 text-red-400 dark:text-red-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart size={18} className={!isOutOfStock ? "group-hover:animate-bounce" : ""} />
            {!isOutOfStock ? "Add to Cart" : "Currently Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}
