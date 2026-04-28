"use client";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CartPage() {
  const { cartItems: cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    try {
      // 1. Create order on our backend
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to create order");
      
      // 2. Configure Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: Math.round(cartTotal * 100),
        currency: "INR",
        name: "Techfusion",
        description: "Stationery Order",
        order_id: data.orderId,
        handler: async function (response) {
          // Payment successful
          const paymentId = response.razorpay_payment_id;
          
          try {
            await addDoc(collection(db, "orders"), {
              orderId: paymentId,
              items: cart,
              totalAmount: cartTotal,
              userEmail: user?.email || "Guest",
              status: "Paid",
              createdAt: serverTimestamp()
            });
          } catch (err) {
            console.error("Error saving order:", err);
          }

          setOrderId(paymentId);
          setOrderComplete(true);
          clearCart();
          setIsCheckingOut(false);
        },
        prefill: {
          email: user?.email || "",
        },
        theme: {
          color: "#2563eb"
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        alert("Payment failed: " + response.error.description);
        setIsCheckingOut(false);
      });
      
      rzp.open();
      
    } catch (error) {
      console.error(error);
      alert("Checkout error. Ensure valid Razorpay keys are configured.");
      setIsCheckingOut(false);
    }
  };

  if (loading || !user) return null;

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Order Confirmed!</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
          Thank you for shopping at Techfusion. Your payment ID is <span className="font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200">{orderId}</span>
        </p>
        <Link href="/dashboard" className="inline-flex items-center justify-center py-3 px-8 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-16 text-center border border-gray-100 dark:border-zinc-800 shadow-sm transition-colors">
            <div className="w-24 h-24 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Looks like you haven't added any stationery to your cart yet.</p>
            <Link href="/dashboard" className="inline-flex items-center justify-center py-3 px-8 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm transition-colors">
                  <div className="relative w-full sm:w-32 h-32 bg-gray-50 dark:bg-zinc-800 rounded-xl overflow-hidden shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">No Image</div>
                    )}
                  </div>
                  
                  <div className="flex-grow w-full">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                      </div>
                      <p className="text-lg font-black text-gray-900 dark:text-white">₹{parseFloat(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-gray-50 dark:bg-zinc-800 rounded-lg p-1 border border-gray-200 dark:border-zinc-700">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition-colors text-gray-600 dark:text-gray-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition-colors text-gray-600 dark:text-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <Trash2 size={18} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm sticky top-24 transition-colors">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4 text-gray-600 dark:text-gray-400 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{parseFloat(cartTotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-100 dark:border-zinc-800 pt-4 mt-4 flex justify-between items-end">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                      ₹{parseFloat(cartTotal).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || cartTotal <= 0}
                  className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Pay with Razorpay <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
