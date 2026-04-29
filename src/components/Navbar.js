"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { LogOut, ShoppingCart, Settings, Moon, Sun, User as UserIcon, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Navbar() {
  const { user, role, loading, logout } = useAuth();
  const { cartCount } = useCart();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user && role !== "admin") {
      const q = query(
        collection(db, "orders"),
        where("userEmail", "==", user.email),
        where("status", "==", "Order Completed")
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCompletedOrders(orders);
      });

      return () => unsubscribe();
    }
  }, [user, role]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform relative">
                <ShoppingCart size={16} className="text-white" />
                <div className="absolute -top-1.5 -right-1.5 bg-yellow-400 rounded-full p-0.5 shadow-sm">
                  <GraduationCap size={10} className="text-indigo-900" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                CampusCart
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {!loading && user && (
              <>
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                  Shop
                </Link>
                {role === "admin" && (
                  <Link href="/admin" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-1">
                    <Settings size={18} />
                    Admin
                  </Link>
                )}

                <Link href="/profile" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                  <UserIcon size={20} />
                </Link>

                <Link href="/cart" className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Notifications Bar */}
      {completedOrders.length > 0 && (
        <div className="bg-green-500 text-white px-4 py-2 text-center text-sm font-semibold shadow-md animate-in slide-in-from-top-2">
          🎉 Good news! You have {completedOrders.length} order(s) completed and ready to be taken. (Latest: {completedOrders[0].orderId})
        </div>
      )}
    </nav>
  );
}
