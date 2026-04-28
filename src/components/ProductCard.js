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

  return (
    <div className="group flex flex-col bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.05)] border border-gray-100 dark:border-zinc-800 transition-all duration-300 transform hover:-translate-y-1 min-h-[320px]">
      
      {/* Premium Content Box */}
      <div className="p-6 flex flex-col flex-grow relative">
        {!product.inStock && (
          <div className="absolute top-4 right-4 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Out of Stock
          </div>
        )}

        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full mb-3">
            {product.category}
          </span>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{product.description}</p>
        </div>
        
        {/* Dynamic Dropdowns */}
        {product.options && Object.keys(product.options).length > 0 && (
          <div className="space-y-3 mb-6 mt-2 flex-grow">
            {Object.entries(product.options).map(([key, values]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
                  {key}
                </label>
                <select 
                  value={selectedOptions[key] || ""}
                  onChange={(e) => handleOptionChange(key, e.target.value)}
                  className="w-full text-sm bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block px-3 py-2.5 transition-colors cursor-pointer outline-none"
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
        <div className="mt-auto pt-5 border-t border-gray-100 dark:border-zinc-800">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Price</p>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">₹{parseFloat(product.price).toFixed(2)}</span>
            </div>
            
            {/* Quantity Counter */}
            <div className="flex items-center bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-1">
              <button 
                onClick={handleDecrement}
                disabled={!product.inStock}
                className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">{quantity}</span>
              <button 
                onClick={handleIncrement}
                disabled={!product.inStock}
                className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 font-bold ${
              product.inStock 
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-[0.98]" 
                : "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart size={18} />
            {product.inStock ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}
