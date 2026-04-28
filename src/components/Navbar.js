"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { LogOut, ShoppingCart, Settings, Moon, Sun, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, role, loading, logout } = useAuth();
  const { cartCount } = useCart();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Techfusion
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
    </nav>
  );
}
